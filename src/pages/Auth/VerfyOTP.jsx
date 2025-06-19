import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DefultInput from '../../components/Forms/DefultInput'
import Defaultbtn from '../../components/Button/Defaultbtn'

const VerfyOTP = () => {
    const navigate = useNavigate()
    const [useremail, setUseremail] = useState(null)

    const [otpdata, setotpdata] = useState({
        action: 'verifyEmailOTP',
        otp: '',
        email: ''
    })

    useEffect(() => {
        const email = secureLocalStorage.getItem('email')
        if (!email) {
            localStorage.clear()
            navigate('/Register', { replace: true })
        } else {
            setUseremail(email)
            setotpdata((prev) => ({ ...prev, email }))
        }
    }, [navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setotpdata((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/auth.php`, otpdata)
    
            if (res.data.status === "Success") {
                alert(res.data.message)
                setTimeout(() => {
                    navigate('/', { replace: true }) 
                }, 1000)
            } else {
                alert(res.data.error || "Invalid credentials")
                console.log("Response:", res.data)
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong")
            console.error(err)
        }
    }
    

    return (
        <div className="xl:w-1/2 mt-40 md:mx-28 mx-4">
            <h2 className="text-2xl font-semibold mb-4 text-[#560606]">Verify OTP</h2>
            <p className="mb-4">
                <span className='text-red-500 font-semibold'>IMPORTANT: </span>
                <span className='text-gray-500'>
                    After successful registration, you will be redirected to the <span className='font-bold'>Verify OTP</span> page.
                    This page is only accessible immediately after registration.
                    Please verify your email address at this stage.
                    <span className='font-bold'> If you choose not to verify now, you will not be able to verify your account later.</span>
                </span>
            </p>

            <form onSubmit={handleSubmit}>
                <DefultInput
                    type="text"
                    name="otp"
                    value={otpdata.otp}
                    onChange={handleInputChange}
                    required={true}
                    placeholder="Enter OTP"
                />

                <div className="mt-4">
                    <Defaultbtn
                        btnvalue={'Verify'}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    )
}

export default VerfyOTP
