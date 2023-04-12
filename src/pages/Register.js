
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../assets/profile.png"
import toast, { Toaster } from "react-hot-toast"
import { useFormik } from 'formik'
import { validateRegisterForm } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import { registerUser } from '../utils/handleApi'

const Register = () => {

  const [file, setFile] = useState("");
  const navigate = useNavigate();
  /**formik library doesnot support file upload so we have to use an handler */

  async function handleUpload(event){
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64);

  }

  const formik = useFormik({
    initialValues: {
      email: "hello@example.com",
      userName: "john",
      password: "admin12"
    },
    validate: validateRegisterForm,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, {profile: file || ""});
      // console.log(values);
      let registerPromise = registerUser(values);
        toast.promise(registerPromise, {
            loading:"creating",
            success: <b>Register Sucessfully</b>,
            error: <b>Couldn't Register</b>
        })
      navigate("/");
    }
  })
  return (
    <div className="container mt-8 h-screen">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex items-center justify-center">
        <div className="glass">
          <div className="flex justify-center items-center flex-col">
            <h4 className="text-3xl font-bold">Register</h4>
            <span className="py-1 w-2/3 text-lg text-gray-500 text-center">
              We are Happy to Join Us
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center items-center py-1">
              <label htmlFor="profile">
                <img src={file || avatar} className="border-4 border-gray-100 w-[7.5rem] shadow-sm rounded-full hover:border-gray-200 cursor-pointer" alt="avatar" />

                <input onChange={handleUpload} style={{ display: "none" }} type="file" id="profile" name="profile" />
              </label>

            </div>
            <div className="flex items-center gap-2 flex-col">
              <input {...formik.getFieldProps("email")} type="email" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Email' />
              <input {...formik.getFieldProps("userName")} type="text" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Username' />
              <input {...formik.getFieldProps("password")} type="password" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Password' />
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 w-3/4 py-4 text-white rounded-lg">Register</button>
            </div>
            <div className="text-center py-4">
              <span>Already Sign Up? <Link className="text-red-700" to="/">Login</Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>


  )
}

export default Register