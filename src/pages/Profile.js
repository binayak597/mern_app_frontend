
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from "../assets/profile.png"
import { Toaster, toast } from "react-hot-toast"
import { useFormik } from 'formik'
import { validateProfile } from '../helper/validate'
import convertToBase64 from '../helper/convert'
import useFetch from '../customHooks/fetch.hook'
import { updateUser } from '../utils/handleApi'

const Profile = () => {

  const [file, setFile] = useState("");
  const [{isLoading, apiData, serverError}] = useFetch();
  const navigate = useNavigate();
  /**formik library doesnot support file upload so we have to use an handler */

  async function handleUpload(event){
    const base64 = await convertToBase64(event.target.files[0]);
    setFile(base64);

  }

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName:apiData?.lastName || "",
      mobileNo: apiData?.mobile || "",
      email: apiData?.email || "",
      address: apiData?.address || ""
    },
    enableReinitialize: true,
    validate: validateProfile,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, {profile: apiData?.profile || file || ""});
      // console.log(values);
      const updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Updating",
        success: <b>Update is completed</b>,
        error: <b>Couldn't complete</b>
      });
    }
  })

  function userLogout(){
    localStorage.removeItem("token");
    navigate("/");
  }

  if(isLoading) return <h1 className="text-2xl font-bold" >isLoading</h1>
  if(serverError) return <h1 className="text-2xl text-red-500">{serverError.message}</h1>
  return (
    <div className="container mt-8 h-screen">
      <Toaster position='top-center' reverseOrder={false} />
      <div className="flex items-center justify-center">
        <div className="glass">
          <div className="flex justify-center items-center flex-col">
            <h4 className="text-3xl font-bold">Profile</h4>
            <span className="py-1 w-2/3 text-lg text-gray-500 text-center">
              Update Your Details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="flex justify-center items-center py-1">
              <label htmlFor="profile">
                <img src={ apiData?.profile || file || avatar} className="border-4 border-gray-100 w-[7.5rem] shadow-sm rounded-full hover:border-gray-200 cursor-pointer" alt="avatar" />

                <input onChange={handleUpload} style={{ display: "none" }} type="file" id="profile" name="profile" />
              </label>

            </div>
            <div className="flex gap-2 flex-col items-center">
            <div className="flex gap-3 px-10">
            <input {...formik.getFieldProps("firstName")} type="text" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='First Name' />
              <input {...formik.getFieldProps("lastName")} type="text" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Last Name' />
            </div>
            <div className="flex gap-3 px-10">
            <input {...formik.getFieldProps("mobileNo")} type="text" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Mobile No' />
              <input {...formik.getFieldProps("email")} type="email" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='Email' />
            </div>
            <div className="flex gap-3">
            <input {...formik.getFieldProps("address")} type="text" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl 
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-[100%]" placeholder='Address' />
            </div>
            
              <button type="submit" className="bg-purple-600 hover:bg-purple-700 w-[60%] py-3 text-white rounded-lg">Update</button>
              
            </div>
            <div onClick={userLogout} className="text-center py-4">
              <span>Come Back Later?<Link className="text-red-700" to="/">Logout</Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>


  )
}

export default Profile