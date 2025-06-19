import axios from 'axios';
import React, { useState } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import DefultInput from '../../components/Forms/DefultInput';
import Defaultbtn from '../../components/Button/Defaultbtn';


const PassUpdate = () => {

    const EmailUser = secureLocalStorage.getItem('email');

    const [updatepass, setupdatepass] = useState({
        action: 'updatepassviadash',
        oldpass: '',
        newpass: '',
        updateUser: EmailUser
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setupdatepass((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdatePass = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/auth.php`, updatepass, {
                headers: { 'Content-Type': 'application/json' },
            });
           

            if (res.data.Status === "Success") {
                alert("Password updated successfully");
                localStorage.clear()
                window.location.reload()
            } else {
                console.error("Error Details:", res.data);
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Axios Error:", err);
            alert(err.response?.data?.error || "Request failed");
        }
    };

    return (
        <div className="mt-4 p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold mb-4">Update Password</h2>
            <form onSubmit={handleUpdatePass}>
                <div className="my-2">
                    <h1 className="">Old Password</h1>
                    <DefultInput
                        type={'password'}
                        required={true}
                        placeholder={"Enter old password"}
                        name={'oldpass'}
                        value={updatepass.oldpass}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="my-2">
                    <h1 className="">New Password</h1>
                    <DefultInput
                        type={'password'}
                        required={true}
                        placeholder={"Enter new password"}
                        name={'newpass'}
                        value={updatepass.newpass}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="">
                    <Defaultbtn
                        type={'submit'}
                        btnvalue={"Update Password"}
                    />
                </div>
            </form>
        </div>
    );
};

export default PassUpdate;
