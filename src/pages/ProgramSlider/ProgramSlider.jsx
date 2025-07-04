import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdEventNote } from "react-icons/md";
import secureLocalStorage from "react-secure-storage";

const ProgramSlider = () => {
    const [imagedata, setimagedata] = useState([])
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");
    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/programsilder.php', {
            params: { action: "getallImages" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                console.log(res.data);
                if (res.data.Result) {
                    setimagedata(res.data.Result);
                } else {
                    setimagedata([]);
                }
            })
            .catch(err => {
                console.log(err);
                setimagedata([]);
            });
    }, []);

    const headleDelete = async (id) => {
        console.log(id)
        const formData = new FormData();
        formData.append("action", "deleteimg");
        formData.append("Imgeid", id);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/programsilder.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("Image Deleted Successfully");
                window.location.reload();
            } else {
                alert(res.data.error || "An error occurred");
            }
        } catch (error) {
            console.error("Delete request failed:", error);
            alert("Failed to delete image");
        }
    }


    const headleAcceptandRefuse = async (value) => {
        console.log(value)
        const formData = new FormData();
        formData.append("action", "acceptorrefuse");
        formData.append("ProID", value);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/programsilder.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("Program Updated Success");
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
                <div className="">
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <MdEventNote className='h-6 w-auto fill-white' />
                    </div>
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Latest Programme Management</h1>
                </div>
            </div>
            <div className="mt-4">
                <a href="/Dashboard/AddPSilderImge">
                    <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                        Add Programme Images
                    </button>
                </a>
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-3">
                {
                    imagedata.map((image, index) => {
                        if (RoleUser === 'dvc' || RoleUser === 'admin') {
                            return (
                                <div className="bg-white p-4 rounded shadow-md my-4" key={index}>
                                    <div className="">
                                        <div className="">
                                            <img src={`${import.meta.env.VITE_APP_API}/${image.img}`} alt="" className='rounded-xl h-28 w-auto' />
                                        </div>
                                        <div className="ml-4">
                                            <h1 className="text-xl font-semibold">{image.title}</h1>
                                            <p className="pt-2">{image.pdesc}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        {
                                            RoleUser === "dvc" ? (
                                                Number(image.is_accepted) === 1 ? (
                                                    <span className='px-4 mr-2 text-white rounded py-1 bg-green-500 font-semibold'>Accepted</span>
                                                ) : Number(image.is_accepted) === 0 ? (
                                                    <span className='px-4 mr-2 text-white rounded py-1 bg-red-500 font-semibold'>Refused</span>
                                                ) : null
                                            ) : null
                                        }

                                        {
                                            RoleUser === "dvc" ? (
                                                Number(image.is_accepted) === 0 ? (
                                                    <button onClick={() => headleAcceptandRefuse(image.id)} className='mr-2 text-green-500 font-semibold'>Accept</button>
                                                ) : Number(image.is_accepted) === 1 ? (
                                                    <button onClick={() => headleAcceptandRefuse(image.id)} className='mr-2 text-red-500 font-semibold'>Refuse</button>
                                                ) : null
                                            ) : null
                                        }
                                        <div className="">
                                            <button onClick={() => headleDelete(image.id)} className='bg-red-500 text-white py-2 px-4 rounded mt-4'>
                                                Delete
                                            </button>
                                            <a href={`/Dashboard/UpdatePSlider/${image.id}`}>
                                                <button className='ml-2 bg-blue-500 text-white py-2 px-4 rounded mt-4'>
                                                    Edit
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else if (RoleUser === 'user') {
                            if (image.addby === EmailUser) {
                                return (
                                    <div className="bg-white p-4 rounded shadow-md my-4" key={index}>
                                        <div className="">
                                            <div className="">
                                                <img src={`${import.meta.env.VITE_APP_API}/${image.img}`} alt="" className='rounded-xl h-28 w-auto' />
                                            </div>
                                            <div className="ml-4">
                                                <h1 className="text-xl font-semibold">{image.title}</h1>
                                                <p className="pt-2">{image.pdesc}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            {
                                                RoleUser === "dvc" ? (
                                                    Number(image.is_accepted) === 1 ? (
                                                        <span className='px-4 mr-2 text-white rounded py-1 bg-green-500 font-semibold'>Accepted</span>
                                                    ) : Number(image.is_accepted) === 0 ? (
                                                        <span className='px-4 mr-2 text-white rounded py-1 bg-red-500 font-semibold'>Refused</span>
                                                    ) : null
                                                ) : null
                                            }

                                            {
                                                RoleUser === "dvc" ? (
                                                    Number(image.is_accepted) === 0 ? (
                                                        <button onClick={() => headleAcceptandRefuse(image.id)} className='mr-2 text-green-500 font-semibold'>Accept</button>
                                                    ) : Number(image.is_accepted) === 1 ? (
                                                        <button onClick={() => headleAcceptandRefuse(image.id)} className='mr-2 text-red-500 font-semibold'>Refuse</button>
                                                    ) : null
                                                ) : null
                                            }
                                            <div className="">
                                                <button onClick={() => headleDelete(image.id)} className='bg-red-500 text-white py-2 px-4 rounded mt-4'>
                                                    Delete
                                                </button>
                                                <a href={`/Dashboard/UpdatePSlider/${image.id}`}>
                                                    <button className='ml-2 bg-blue-500 text-white py-2 px-4 rounded mt-4'>
                                                        Edit
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }

                    })
                }
            </div>
        </div>
    )
}

export default ProgramSlider