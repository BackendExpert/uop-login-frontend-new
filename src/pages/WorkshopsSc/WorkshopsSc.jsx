import React, { useEffect, useState } from 'react';
import { FaGraduationCap } from 'react-icons/fa6';
import axios from 'axios';
import { BsEye } from 'react-icons/bs';
import secureLocalStorage from 'react-secure-storage';

const WorkshopsSc = () => {
    const RoleUser = secureLocalStorage.getItem("role");
    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/workshops.php', {
            params: { action: "getallworkshops" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                if (res.data.Result) {
                    setWorkshops(res.data.Result);
                } else {
                    setWorkshops([]);
                }
            })
            .catch(err => {
                console.error("Error fetching workshops:", err);
                setWorkshops([]);
            });
    }, []);

    return (
        <div className='mt-4'>
            <div className="flex">
                <div className="inline-block p-2 bg-[#560606] rounded">
                    <FaGraduationCap className='h-6 w-auto fill-white' />
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">
                        Manage Short Courses and Workshops
                    </h1>
                </div>
            </div>

            <a href="/Dashboard/CreateWorkshops">
                <button className='bg-blue-500 mt-4 text-white px-4 py-2 rounded'>
                    Create Short Courses and Workshops
                </button>
            </a>

            <div className="bg-white p-4 mt-4 rounded-xl shadow-xl">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 h-12 text-left">
                            <th className='font-semibold'>#</th>
                            <th>Course Name</th>
                            <th>Link</th>
                            <th>Faculty</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(workshops) && workshops.length > 0 ? (
                            workshops.map((item, index) => (
                                <tr key={index} className='h-16 border-b border-gray-200'>
                                    <td>{index + 1}</td>
                                    <td>{item.course_name}</td>
                                    <td>
                                        {item.course_link ? (
                                            <a href={item.course_link} target='_blank' className='text-blue-600 underline'>
                                                Link
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td>{item.fuclty}</td>
                                    <td>
                                        {item.is_active === 1 ? (
                                            <span className="text-green-600 font-semibold">Active</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">Inactive</span>
                                        )}
                                    </td>
                                    <td>
                                        <a href={`/Dashboard/ViewWorkshop/${item.id}`}>
                                            <button className='text-[#560606] font-semibold flex items-center gap-1'>
                                                <BsEye className='inline-block' /> View
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">No workshops available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkshopsSc;
