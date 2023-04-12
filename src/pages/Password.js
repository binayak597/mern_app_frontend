import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../assets/profile.png"
import toast, { Toaster } from "react-hot-toast"
import { useFormik } from 'formik'
import {validatePassword } from '../helper/validate'
import { useAuthStore } from '../state/store'
import useFetch from '../customHooks/fetch.hook';
import { loginUser } from '../utils/handleApi'

const Password = () => {
const { userName } = useAuthStore(state => state.auth);
const [{isLoading, apiData, serverError}] = useFetch(`username/${userName}`);
const navigate = useNavigate();
const formik = useFormik({
    initialValues: {
        password: "admin@12"
    },
    validate: validatePassword,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        // console.log(values);
        const loginPromise = loginUser({userName, password: values.password});
        toast.promise(loginPromise, {
            loading: "Checking",
            success: <b>Login is Successful</b>,
            error: <b>Password didn't match</b>
        });

        loginPromise
        .then((res) => {
            const {token} = res.data;
            localStorage.setItem('token', token);
            navigate("/profile");
        })

    }
   
});
if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
if(serverError) return <h1 className="text-2xl text-red-500">{serverError.message}</h1>;
    return (
        <div className="container mt-8 h-screen">
        <Toaster position='top-center' reverseOrder={false} />
<div className="flex items-center justify-center">
            <div className="glass">
                <div className="flex justify-center items-center flex-col">
                    <h4 className="text-3xl font-bold">Hello {apiData?.firstName || apiData?.userName}</h4>
                    <span className="py-2 w-2/3 text-xl text-gray-500 text-center">Explore More By Connecting with Us</span>
                </div>
                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="flex justify-center items-center py-2">
                        <img src={apiData?.profile || avatar} className="border-4 border-gray-100 w-36 shadow-sm rounded-full hover:border-gray-200 cursor-pointer" alt="avatar" />
                    </div>
                    <div className="flex items-center gap-3 flex-col">
                        <input {...formik.getFieldProps("password")}type="password" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Password' />
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 w-3/4 py-4 text-white rounded-lg">Enter</button>
                    </div>
                    <div className="text-center py-4">
                        <span>Forgot Password? <Link className="text-red-700" to="/recovery">Recovery Now</Link></span>
                    </div>
                </form>
            </div>

        </div>
        </div>
        

    )
}

export default Password