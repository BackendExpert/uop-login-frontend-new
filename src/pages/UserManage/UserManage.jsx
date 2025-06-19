import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsPeople } from 'react-icons/bs'
import secureLocalStorage from 'react-secure-storage';


const UserManage = () => {
    const [allusers, setallusers] = useState([])
    const EmailUser = secureLocalStorage.getItem('email');
    const RoleUser = secureLocalStorage.getItem('role');
    const UserName = secureLocalStorage.getItem('username');

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/auth.php', {
            params: { action: "getallusers" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                console.log('API Response:', res.data); // Log API response
                if (res.data.Status === "Success" && Array.isArray(res.data.Result)) {
                    setallusers(res.data.Result);
                } else {
                    setallusers([]);
                }
            })
            .catch(err => {
                console.log('API Error:', err);
                setallusers([]);
            });
    }, []);


    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className='mt-4'>
                <div className="flex">
                    <div className="">
                        <div className="inline-block p-2 bg-[#560606] rounded">
                            <BsPeople className='h-6 w-auto fill-white' />
                        </div>
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">User Management</h1>
                    </div>
                </div>

                <div className="bg-white mt-4 p-8 rounded-xl shadow-md">
                    <table className='w-full'>
                        <thead>
                            <tr className='h-12 border-b border-gray-300'>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Faculty</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(allusers) && allusers.length > 0 ? (
                                allusers.map((data, index) => {
                                    return (
                                        <tr key={index} className="text-center text-gray-500 h-12 border-b border-gray-300">
                                            <td className='font-semibold'>{data.username}</td>
                                            <td>{data.email}</td>
                                            <td>{data.Faculty ? data.Faculty : "N/A"}</td>
                                            <td className='uppercase font-semibold'>{data.role}</td>
                                            <td>
                                                {
                                                    data.is_active === "1" ?
                                                        <div className="text-green-500 font-semibold">Active</div>
                                                        :
                                                        <div className="text-red-500 font-semibold">Deactive</div>
                                                }
                                            </td>
                                            <td>
                                                {
                                                    (() => {
                                                        if (data.email === EmailUser) {
                                                            return (
                                                                <p className="">Cannot Update Current User</p>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <a href={`/Dashboard/UserProfile/${data.email}`} className='text-blue-500 font-semibold'>View</a>
                                                            )
                                                        }
                                                    })()
                                                }

                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
    else {
        useEffect(() => {
            localStorage.clear()
            window.location.reload()
        }, [])
    }

}

export default UserManage