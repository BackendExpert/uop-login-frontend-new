import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DefultInput from '../../components/Forms/DefultInput';
import Defaultbtn from '../../components/Button/Defaultbtn';

const VerfyPassOTP = () => {
    const navigate = useNavigate();
    const [otpData, setOtpData] = useState({
        otp: '',
        email: ''
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOtpData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle OTP verification form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send OTP and email to the backend for verification
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/auth.php`, {
                action: 'verifyEmailOTP',
                email: otpData.email,
                otp: otpData.otp
            });

            if (res.data.status === "Success") {
                alert(res.data.message);
                // Redirect to password reset page after successful OTP verification
                setTimeout(() => {
                    navigate('/ResetPassword', { replace: true });
                }, 1000);
            } else {
                alert(res.data.error || "Invalid OTP");
                console.log("Response:", res.data);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong");
            console.error(err);
        }
    };

    return (
        <div className="xl:w-1/2 mt-40 md:mx-28 mx-4">
            <h2 className="text-2xl font-semibold mb-4 text-[#560606]">Verify OTP for Password Reset</h2>
            <p className="mb-4">
                <span className='text-red-500 font-semibold'>IMPORTANT: </span>
                <span className='text-gray-500'>
                    Please enter the OTP you received in your email to reset your password.
                </span>
            </p>

            <form onSubmit={handleSubmit}>
                <DefultInput
                    type="email"
                    name="email"
                    value={otpData.email}
                    onChange={handleInputChange}
                    required={true}
                    placeholder="Enter your email"
                />
                <DefultInput
                    type="text"
                    name="otp"
                    value={otpData.otp}
                    onChange={handleInputChange}
                    required={true}
                    placeholder="Enter OTP"
                />

                <div className="mt-4">
                    <Defaultbtn
                        btnvalue={'Verify OTP'}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    );
};

export default VerfyPassOTP;
