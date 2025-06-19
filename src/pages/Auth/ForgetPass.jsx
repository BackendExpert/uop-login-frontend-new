import React, { useEffect, useState } from 'react'
import secureLocalStorage from 'react-secure-storage'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DefultInput from '../../components/Forms/DefultInput'
import Defaultbtn from '../../components/Button/Defaultbtn'

const ForgetPass = () => {
    const navigate = useNavigate()

    const [forgepassdata, setforgepassdata] = useState({
        action: 'forgetpass',
        email: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setforgepassdata((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // Log the data being sent for debugging
            console.log(forgepassdata)

            // Send POST request with JSON payload
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/auth.php`,
                forgepassdata,
                {
                    headers: {
                        'Content-Type': 'application/json', // Ensure the correct content type is set
                    }
                }
            )

            if (res.data.status === "Success") {
                alert(res.data.message)
                secureLocalStorage.setItem('auth', forgepassdata.email) // Store the email in secure local storage
                setTimeout(() => {
                    navigate('/VerfyPassOTP', { replace: true }) 
                }, 1000)
            } else {
                alert(res.data.Error || "Invalid credentials")
                console.log("Response:", res.data)
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong")
            console.error(err)
        }
    }

    return (
        <div className="xl:w-1/2 mt-40 md:mx-28 mx-4">
            <h2 className="text-2xl font-semibold mb-4 text-[#560606]">Forget Password</h2>

            <form onSubmit={handleSubmit}>
                <DefultInput
                    type="email"
                    name="email"
                    value={forgepassdata.email}
                    onChange={handleInputChange}
                    required={true}
                    placeholder="Enter Email"
                />

                <div className="mt-4">
                    <Defaultbtn
                        btnvalue={'Get OTP'}
                        type={'submit'}
                    />
                </div>
            </form>
        </div>
    )
}

export default ForgetPass
