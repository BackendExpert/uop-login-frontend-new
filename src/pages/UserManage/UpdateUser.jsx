import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUserPen } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const UpdateUser = () => {
    const { email } = useParams();
    const navigate = useNavigate();

    const EmailUser = secureLocalStorage.getItem('email');
    const RoleUser = secureLocalStorage.getItem('role');

    const [userdata, setuserdata] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch user data
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_API + '/auth.php', {
                params: {
                    action: 'getuserbyemail',
                    userID: email,
                },
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                if (res.data.Result) {
                    setuserdata(res.data.Result);
                } else {
                    setuserdata(null);
                }
            })
            .catch((err) => {
                console.error(err);
                setError('Failed to load user data');
                setuserdata(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [email]);

    // Redirect unauthorized roles
    useEffect(() => {
        if (RoleUser !== 'dvc' && RoleUser !== 'admin') {
            localStorage.clear();
            window.location.reload();
        }
    }, [RoleUser]);

    // Prevent updating own user
    useEffect(() => {
        if (userdata?.email === EmailUser) {
            navigate('/Dashboard/UserManagement');
            window.location.reload();
        }
    }, [userdata, EmailUser, navigate]);

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!userdata) return <div className="p-4">No user found.</div>;


    const headleAcceptandRefuse = async (value) => {
        const formData = new FormData();
        formData.append("action", "acceptrefuseaccount");
        formData.append("UserEmail", value);

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/auth.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("User Account Updated Success");
                window.location.reload();
            } else {
                alert(res.data.error || "An error occurred");
            }
        } catch (error) {
            console.error("Update request failed:", error);
            alert("Failed to delete image");
        }
    }

    return (
        <div className='mt-4'>
            <div className="flex">
                <div className="inline-block p-2 bg-[#560606] rounded">
                    <FaUserPen className='h-6 w-auto fill-white' />
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">User Update: {email}</h1>
                </div>
            </div>

            <a href="/Dashboard/UserManagement">
                <button className='bg-blue-500 mt-4 text-white px-4 py-2 rounded'>
                    Back
                </button>
            </a>

            <div className="bg-white p-8 mt-4 rounded-xl shadow-md">
                <table className='w-full'>
                    <tbody>
                        <tr className='border-b border-gray-200 h-12 text-gray-500'>
                            <td className='font-semibold'>Username</td>
                            <td>{userdata?.username || 'N/A'}</td>
                        </tr>
                        <tr className='border-b border-gray-200 h-12 text-gray-500'>
                            <td className='font-semibold'>Email</td>
                            <td>{userdata?.email || 'N/A'}</td>
                        </tr>
                        <tr className='border-b border-gray-200 h-12 text-gray-500'>
                            <td className='font-semibold'>Faculty</td>
                            <td>{userdata?.Faculty || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-8 mt-4 rounded-xl shadow-md">
                <table className='w-full'>
                    <tbody>
                        <tr className='border-b border-gray-200 h-12 text-gray-500'>
                            <td className='font-semibold'>Email</td>
                            <td>{userdata?.email || 'N/A'}</td>
                        </tr>
                        <tr className='border-b border-gray-200 h-12 text-gray-500'>
                            <td className='font-semibold'>Account Status</td>
                            <td >
                                {
                                    RoleUser === "dvc" ? (
                                        Number(userdata.is_active) === 1 ? (
                                            <span className='mr-2 text-green-500 font-semibold'>Accepted</span>
                                        ) : Number(userdata.is_active) === 0 ? (
                                            <span className='mr-2 text-red-500 font-semibold'>Refused</span>
                                        ) : null
                                    ) : null
                                }
                            </td>
                        </tr>

                        <tr className='border-b border-gray-200 h-12 text-gray-500'>
                            <td className='font-semibold'>Toggle Account Status</td>
                            <td>
                                {
                                    RoleUser === "dvc" ? (
                                        Number(userdata.is_active) === 0 ? (
                                            <button onClick={() => headleAcceptandRefuse(email)} className='mr-2 text-white py-1 px-4 rounded bg-green-500 font-semibold'>Accept</button>
                                        ) : Number(userdata.is_active) === 1 ? (
                                            <button onClick={() => headleAcceptandRefuse(email)} className='mr-2 text-white py-1 px-4 rounded bg-red-500 font-semibold'>Refuse</button>
                                        ) : null
                                    ) : null
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UpdateUser;
