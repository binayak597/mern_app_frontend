
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../assets/profile.png"
import { Toaster } from "react-hot-toast"
import { useFormik } from 'formik'
import { validateUserName } from '../helper/validate'
import { useAuthStore } from '../state/store'






const Login = () => {
const navigate = useNavigate();
const setUserName = useAuthStore(state => state.setUserName);
const formik = useFormik({
    initialValues: {
        userName: "john"
    },
    validate: validateUserName,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        setUserName(values.userName);
        navigate("/password");
        // const data = await getUser(values.userName);
        // console.log(data);
        
    }
})
    return (
        <div className="container mt-8 h-screen">
        <Toaster position='top-center' reverseOrder={false} />
<div className="flex items-center justify-center">
            <div className="glass">
                <div className="flex justify-center items-center flex-col">
                    <h4 className="text-3xl font-bold">Hello Again</h4>
                    <span className="py-2 w-2/3 text-xl text-gray-500 text-center">Explore More By Connecting with Us</span>
                </div>
                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="flex justify-center items-center py-2">
                        <img src={avatar} className="border-4 border-gray-100 w-36 shadow-sm rounded-full hover:border-gray-200 cursor-pointer" alt="avatar" />
                    </div>
                    <div className="flex items-center gap-3 flex-col">
                        <input {...formik.getFieldProps("userName")}type="text" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='username' />
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 w-3/4 py-4 text-white rounded-lg">Enter</button>
                    </div>
                    <div className="text-center py-4">
                        <span>Not a Member? <Link className="text-red-700" to="/register">Register Now</Link></span>
                    </div>
                </form>
            </div>

        </div>
        </div>
        

    )
}

export default Login