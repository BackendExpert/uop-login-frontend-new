import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdMiscellaneousServices } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const ServicesQuicklinks = () => {
    const navigate = useNavigate();
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [sqdata, setsqdata] = useState([]);

    const fetchSQData = () => {
        axios.get(import.meta.env.VITE_APP_API + '/serviceq.php', {
            params: { action: "getallsq" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                if (res.data.Result) {
                    setsqdata(res.data.Result);
                    console.log("Fetched data:", res.data.Result); // Debugging
                } else {
                    setsqdata([]);
                }
            })
            .catch(err => {
                console.log("Fetch failed:", err);
                setsqdata([]);
            });
    };

    useEffect(() => {
        fetchSQData();
    }, []);

    const handleDelete = async (id) => {
        const formData = new FormData();
        formData.append("action", "deleteSQ");
        formData.append("SQID", id);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/serviceq.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("Service and Quick Link Deleted Successfully");
                setsqdata(prev => prev.filter(item => item.id !== id));
            } else {
                alert(res.data.error || "An error occurred");
            }
        } catch (error) {
            console.error("Delete request failed:", error);
            alert("Failed to delete");
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = Number(currentStatus) === 1 ? 0 : 1;
        const formData = new FormData();
        formData.append("action", "toggleStatus");
        formData.append("SQID", id);
        formData.append("status", newStatus);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/serviceq.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert(newStatus === 1 ? "Activated successfully" : "Deactivated successfully");
                fetchSQData(); // Refresh list from backend
            } else {
                alert(res.data.error || "Toggle failed");
            }
        } catch (error) {
            console.error("Toggle failed:", error);
            alert("Toggle status failed");
        }
    };

    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className='mt-4'>
                <div className="flex">
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <MdMiscellaneousServices className='h-6 w-auto fill-white' />
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">ServicesQuicklinks Management</h1>
                    </div>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/CreateSQ">
                        <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                            Create New Services & Quicklinks
                        </button>
                    </a>
                </div>

                <div className="mt-4">
                    <div className="md:grid grid-cols-2 gap-3">
                        {/* Left Column: Services */}
                        <div>
                            <div className="text-xl font-semibold mb-2">Services</div>
                            {sqdata.filter(item => item.main_type === "Services").map((data, index) => (
                                <div className="bg-white rounded-xl p-6 shadow-xl mb-4" key={index}>
                                    <h1 className="text-lg font-medium">{data.name}</h1>
                                    <div className="flex justify-between mt-4 items-center">
                                        <div className="space-x-4">
                                            <a href={data.link} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>
                                                View
                                            </a>

                                            <button
                                                onClick={() => handleToggleStatus(data.id, data.is_active)}
                                                className={`font-semibold hover:underline ${Number(data.is_active) === 1 ? 'text-yellow-600' : 'text-gray-500'}`}
                                            >
                                                {Number(data.is_active) === 1 ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                        <button onClick={() => handleDelete(data.id)} className='text-red-500 font-semibold hover:underline'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column: QuickLinks */}
                        <div>
                            <div className="text-xl font-semibold mb-2">QuickLinks</div>
                            {sqdata.filter(item => item.main_type === "QuickLinks").map((data, index) => (
                                <div className="bg-white rounded-xl p-6 shadow-xl mb-4" key={index}>
                                    <h1 className="text-lg font-medium">{data.name}</h1>
                                    <div className="flex justify-between mt-4 items-center">
                                        <div className="space-x-4">
                                            <a href={data.link} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>
                                                View
                                            </a>
                                            <button
                                                onClick={() => handleToggleStatus(data.id, data.is_active)}
                                                className={`font-semibold hover:underline ${Number(data.is_active) === 1 ? 'text-yellow-600' : 'text-gray-500'}`}
                                            >
                                                {Number(data.is_active) === 1 ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                        <button onClick={() => handleDelete(data.id)} className='text-red-500 font-semibold hover:underline'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        );
    } else {
        useEffect(() => {
            localStorage.clear();
            window.location.reload();
        }, []);
        return null;
    }
};

export default ServicesQuicklinks;
