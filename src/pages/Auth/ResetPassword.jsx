import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'
import DefultInput from '../../components/Forms/DefultInput'
import Defaultbtn from '../../components/Button/Defaultbtn'

const ResetPassword = () => {
    const navigate = useNavigate()

    const [passwordData, setPasswordData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    useEffect(() => {
        const storedEmail = secureLocalStorage.getItem('auth')
        if (!storedEmail) {
            alert("No email found. Please request OTP again.")
            navigate('/ForgetPass', { replace: true })
        } else {
            setPasswordData((prev) => ({ ...prev, email: storedEmail }))
        }
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordData.password !== passwordData.confirmPassword) {
            alert("Passwords do not match!")
            return
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/auth.php`, {
                action: 'updatePassword', // Make sure this matches your PHP logic
                email: passwordData.email,
                password: passwordData.password,
            })

            if (res.data.status === "Success") {
                alert(res.data.message)
                secureLocalStorage.removeItem('auth') // Clear email after use
                navigate('/', { replace: true })
            } else {
                alert(res.data.error || "Something went wrong!")
                console.log("Response:", res.data)
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong")
            console.error(err)
        }
    }

    return (
        <div className="xl:w-1/2 mt-40 md:mx-28 mx-4">
            <h2 className="text-2xl font-semibold mb-4 text-[#560606]">Update Password</h2>
            <form onSubmit={handleSubmit}>
                <DefultInput
                    type="password"
                    name="password"
                    value={passwordData.password}
                    onChange={handleInputChange}
                    required={true}
                    placeholder="Enter New Password"
                />
                <DefultInput
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleInputChange}
                    required={true}
                    placeholder="Confirm New Password"
                />
                <div className="mt-4">
                    <Defaultbtn
                        btnvalue="Update Password"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    )
}

export default ResetPassword
