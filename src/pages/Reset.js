
import React from 'react'
import toast, { Toaster } from "react-hot-toast"
import { useFormik } from 'formik'
import { resetPasswordOfUser } from '../helper/validate'
import { resetPassword } from '../utils/handleApi'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../state/store'
import useFetch from '../customHooks/fetch.hook'

const Reset = () => {
    const {userName} = useAuthStore(state => state.auth);
    const [{isLoading, status, serverError }] = useFetch("createResetSession");
    const navigate = useNavigate();
const formik = useFormik({
    initialValues: {
        password: "john@123",
        confirmpwd: "john@123"
    },
    validate: resetPasswordOfUser,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
        // console.log(values);
        const resetPromise = resetPassword({userName, password: values.password});
        toast.promise(resetPromise, {
            loading: "Updating",
            success: <b>Password is updated Successfully</b>,
            error: <b>Couldn't updated</b>
        });
        resetPromise.then((data) => {
            navigate("/password");
        })
    }
})

if(isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
if(serverError) return <h1 className="text-2xl text-red-500">{serverError.message}</h1>;
if(status && status !== 200) return <Navigate to={"/password"} replace={true}></Navigate>
    return (
        <div className="container mt-8 h-screen">
        <Toaster position='top-center' reverseOrder={false} />
<div className="flex items-center justify-center">
            <div className="glass">
                <div className="flex justify-center items-center flex-col">
                    <h4 className="text-3xl font-bold">Reset</h4>
                    <span className="py-2 w-2/3 text-xl text-gray-500 text-center">Enter New Password</span>
                </div>
                <form className="py-20" onSubmit={formik.handleSubmit}>
                    <div className="flex items-center gap-3 flex-col">
                        <input {...formik.getFieldProps("password")}type="password" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder=' New Password' />
                        <input {...formik.getFieldProps("confirmpwd")}type="password" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Confirm Password' />
                        <button type="submit" className="bg-purple-600 hover:bg-purple-700 w-3/4 py-4 text-white rounded-lg">Submit</button>
                    </div>
                </form>
            </div>

        </div>
        </div>
        

    )
}

export default Reset