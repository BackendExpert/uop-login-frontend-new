import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUsers } from 'react-icons/fa6';
import secureLocalStorage from "react-secure-storage";


const Societies = () => {
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [allsocieties, setallsocieties] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/society.php', {
            params: { action: "getallsocieties" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                console.log('API Response:', res.data); // Log API response
                if (res.data.Status === "Success" && Array.isArray(res.data.Result)) {
                    setallsocieties(res.data.Result);
                } else {
                    setallsocieties([]);
                }
            })
            .catch(err => {
                console.log('API Error:', err);
                setallsocieties([]);
            });
    }, []);

    const headleDeleteSociety = async (id) => {
        const formData = new FormData();
        formData.append("action", "deletesociety");
        formData.append("SocietyID", id);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/society.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("Socienty Deleted Successfully");
                window.location.reload();
            } else {
                alert(res.data.error || "An error occurred");
            }
        } catch (error) {
            console.error("Delete request failed:", error);
            alert("Failed to delete image");
        }
    }


    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className='mt-4'>
                <div className="flex">
                    <div>
                        <div className="inline-block p-2 bg-[#560606] rounded">
                            <FaUsers className='h-6 w-auto fill-white' />
                        </div>
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">
                            Societies Management
                        </h1>
                    </div>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/CreateSociety">
                        <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                            Create New Society
                        </button>
                    </a>
                </div>


                <div className="md:grid grid-cols-3 gap-4 mt-4">
                    {
                        allsocieties.map((data, index) => {
                            return (
                                <div className="bg-white p-4 rounded-md shadow-xl" key={index}>
                                    <div className="">
                                        <img src={`${import.meta.env.VITE_APP_API}/${data.image}`} alt="" className='rounded-xl h-28 w-auto' />
                                    </div>
                                    <div className="mt-4">
                                        <h1 className="text-gray-500 text-xl font-semibold">
                                            {data.name}
                                        </h1>

                                        <a href={`${data.link}`} target='_blank' className='text-blue-500 duration-500 hover:underline'>
                                            Click More
                                        </a>

                                        <div className="">
                                            <button onClick={() => headleDeleteSociety(data.id)} className='bg-red-500 text-white py-2 px-4 duration-500 hover:bg-red-600 rounded-xl mt-4'>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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

export default Societies