import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa6';
import secureLocalStorage from "react-secure-storage";

const Diploma = () => {
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [dipdata, setDipData] = useState([]);

    useEffect(() => {
        if (RoleUser !== 'dvc' && RoleUser !== 'admin') {
            localStorage.clear();
            window.location.reload();
            return;
        }

        axios.get(import.meta.env.VITE_APP_API + '/diploma.php', {
            params: { action: "getalldips" },
        })
        .then(res => {
            console.log("Diplomas from API:", res.data.Result);  // Check data type here
            if (res.data?.Result) {
                setDipData(res.data.Result);
            } else {
                setDipData([]);
            }
        })
        .catch(err => {
            console.error(err);
            setDipData([]);
        });
    }, [RoleUser]);

    if (RoleUser !== 'dvc' && RoleUser !== 'admin') {
        return null; // While reloading or unauthorized
    }

    const toggleStatus = async (id, currentStatus) => {
        try {
            const formData = new FormData();
            formData.append("action", "toggleDiplomaStatus");
            formData.append("id", id);
            formData.append("status", Number(currentStatus) === 1 ? "0" : "1");

            const res = await axios.post(import.meta.env.VITE_APP_API + '/diploma.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("Status updated successfully");
                setDipData(prev =>
                    prev.map(dip =>
                        dip.id === id ? { ...dip, is_active: Number(currentStatus) === 1 ? 0 : 1 } : dip
                    )
                );
            } else {
                alert(res.data.error || "Failed to update status");
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            alert("Failed to update status");
        }
    };

    return (
        <div className='mt-4'>
            <div className="flex">
                <div>
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <FaBook className='h-6 w-auto fill-white' />
                    </div>
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">
                        Diploma Management
                    </h1>
                </div>
            </div>

            <div className="mt-4">
                <a href="/Dashboard/CreateDiploma">
                    <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                        Create New Diploma
                    </button>
                </a>
            </div>

            <div className="bg-white p-8 mt-4">
                <table className="w-full">
                    <thead>
                        <tr className='h-12 border-b border-gray-300'>
                            <th className='font-semibold'>#</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dipdata.length > 0 ? (
                            dipdata.map((data, index) => (
                                <tr key={data.id} className="border-b border-gray-300 h-12 text-center">
                                    <td className='font-semibold'>{index + 1}</td>
                                    <td>{data.title}</td>
                                    <td>
                                        {Number(data.is_active) === 1 ? (
                                            <span className="inline-block px-2 py-1 bg-green-500 text-white rounded font-semibold">
                                                Accepted
                                            </span>
                                        ) : (
                                            <span className="inline-block px-2 py-1 bg-red-500 text-white rounded font-semibold">
                                                Refused
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => toggleStatus(data.id, data.is_active)}
                                            className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700'
                                        >
                                            {Number(data.is_active) === 1 ? "Set Refused" : "Set Accepted"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 py-4">
                                    No diplomas available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Diploma;
