import React, { useState } from 'react'
import DefultInput from '../../components/Forms/DefultInput'
import Defaultbtn from '../../components/Button/Defaultbtn'
import axios from 'axios'
import secureLocalStorage from 'react-secure-storage'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [signup, setsignup] = useState({
        action: 'register',
        username: '',
        Faculty: '',
        email: '',
        password: '',
        ConfirmPass: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setsignup((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/auth.php`, signup);

            if (res.data.status === "Success") {
                alert(res.data.message);
                secureLocalStorage.setItem('email', signup.email)
                setTimeout(() => {
                    navigate('/VerifyOTP', { replace: true });
                }, 1000);
            } else {
                alert(res.data.error || "Invalid credentials");
                console.log("Response:", res.data);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Something went wrong");
            console.error(err);
        }
    }

    return (
        <div className='mt-40 md:mx-28 mx-4'>
            <div className="">
                <h1 className="text-2xl font-semibold text-[#560606]">Staff Register</h1>
            </div>

            <div className="xl:w-1/2">
                <form onSubmit={headleSubmit} method="post">
                    <div className="my-2">
                        <h1 className="">Username</h1>
                        <DefultInput
                            type={'text'}
                            required={true}
                            placeholder={"Username"}
                            name={'username'}
                            value={signup.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <h1 className="">Email</h1>
                        <DefultInput
                            type={'email'}
                            required={true}
                            placeholder={"Email Address"}
                            name={'email'}
                            value={signup.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <h1 className="">Faculty/Center/Division</h1>
                        <DefultInput
                            type={'text'}
                            required={true}
                            placeholder={"Faculty/Center/Division"}
                            name={'Faculty'}
                            value={signup.Faculty}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <h1 className="">Password</h1>
                        <DefultInput
                            type={'password'}
                            required={true}
                            placeholder={"Password"}
                            name={"password"}
                            value={signup.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="my-2">
                        <h1 className="">Confirm Password</h1>
                        <DefultInput
                            type={'password'}
                            required={true}
                            placeholder={"Confirm Password"}
                            name={"ConfirmPass"}
                            value={signup.ConfirmPass}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="">
                        <Defaultbtn
                            type={'submit'}
                            btnvalue={"Register as Member"}
                        />
                    </div>
                </form>

                <a href="/">
                    <p className="mt-4 text-blue-600 font-semibold duration-500 hover:text-blue-700">Already have account</p>
                </a>
            </div>
        </div>
    )
}

export default Register