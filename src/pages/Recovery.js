import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast"
import { useAuthStore } from '../state/store'
import { generateOTP, verifyOTP } from '../utils/handleApi';
import { useNavigate } from 'react-router-dom';

const Recovery = () => {
    const { userName } = useAuthStore(state => state.auth);
    const [OTP, setOTP] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        generateOTP(userName).then((code) => {
            // console.log(code);
            if (code) return toast.success("OTP has been sent to your email");
            return toast.error("Problem while generating OTP");
        })
    }, [userName]
    );

    function handleChange(event) {
        const { value } = event.target;
        setOTP(value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { status } = await verifyOTP({ userName, code: OTP });

            if (status === 201) {
                toast.success("Verified successfully");
                return navigate("/reset");
            }


        } catch (error) {
            return toast.error("wrong OTP! Check your email");
        }
    }

    function handleResendOTP() {
        const sendPromise = generateOTP(userName);
        toast.promise(sendPromise, {
            loading: "Sending",
            success: <b>OTP has been sent to your email</b>,
            error: <b>Problem while generating OTP</b>
        });

        // sendPromise.then((code) => {
        //     console.log(code);
        // })
    }

    return (
        <div className="container mt-8 h-screen">
            <Toaster position='top-center' reverseOrder={false} />
            <div className="flex items-center justify-center">
                <div className="glass">
                    <div className="flex justify-center items-center flex-col">
                        <h4 className="text-3xl font-bold">Recover</h4>
                        <span className="py-2 w-2/3 text-lg text-gray-500 text-center">
                            Enter OTP to Recovery Password
                        </span>
                    </div>
                    <form className="py-20" onSubmit={handleSubmit}>
                        <div className="flex items-center gap-3 flex-col">
                            <span className="w-2/3 text-xs text-gray-500 text-center">
                                Enter 6 digits OTP that sent to your email
                            </span>
                            <input onChange={handleChange} type="text" className="border border-slate-300 shadow-sm px-5 py-2 rounded-xl
                        focus:outline-none focus:border-sky-500 focus:ring-1 w-3/4" placeholder='OTP' />
                            <button type="submit" className="bg-purple-600 hover:bg-purple-700 w-3/4 py-4 text-white rounded-lg">Verify OTP</button>
                        </div>

                    </form>
                    <div className="text-center py-4">
                        <span>Can't get OTP? <button onClick={handleResendOTP} className="text-red-700">Resend</button></span>
                    </div>
                </div>

            </div>
        </div>


    )

}
export default Recovery