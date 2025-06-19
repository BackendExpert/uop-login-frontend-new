import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsCalendar3EventFill } from "react-icons/bs";
import secureLocalStorage from "react-secure-storage";

const EventsManage = () => {
    const [eventdata, setdataevet] = useState([])
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/event.php', {
            params: { action: "getallEvents" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                console.log(res.data);
                if (res.data.Result) {
                    setdataevet(res.data.Result);
                } else {
                    setdataevet([]);
                }
            })
            .catch(err => {
                console.log(err);
                setdataevet([]);
            });
    }, []);

    const headleDelete = async (id) => {
        console.log(id)
        const formData = new FormData();
        formData.append("action", "deleteEvent");
        formData.append("Imgeid", id);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/event.php', formData, {
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
        formData.append("action", "acceptorrefuseEvent");
        formData.append("EventID", value);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/event.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("event Updated Success");
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
                        <BsCalendar3EventFill className='h-6 w-auto fill-white' />
                    </div>
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Event Management</h1>
                </div>
            </div>

            <div className="mt-4">
                <a href="/Dashboard/CreateEvent">
                    <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                        Create New Notice
                    </button>
                </a>
            </div>


            <table className='w-full bg-white mt-4'>
                <thead>
                    <tr className='h-12 w-full text-gray-500 border-b border-gray-200'>
                        <th>#</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(eventdata) && eventdata.length > 0 ? (
                            eventdata.map((event, index) => {
                                if (RoleUser === 'dvc' || RoleUser === 'admin') {
                                    return (
                                        <tr key={index} className='w-full h-16 text-center'>
                                            <td>{index + 1}</td>
                                            <td>{event.event_title}</td>
                                            <td>{event.event_date}</td>
                                            <td>
                                                {
                                                    RoleUser === "dvc" ? (
                                                        Number(event.is_accepted) === 1 ? (
                                                            <div className='mr-2 text-white rounded py-1 bg-green-500 font-semibold'>Accepted</div>
                                                        ) : Number(event.is_accepted) === 0 ? (
                                                            <div className='mr-2 text-white rounded py-1 bg-red-500 font-semibold'>Refused</div>
                                                        ) : null
                                                    ) : null
                                                }

                                                {
                                                    RoleUser === "dvc" ? (
                                                        Number(event.is_accepted) === 0 ? (
                                                            <button onClick={() => headleAcceptandRefuse(event.event_id)} className='mr-2 text-green-500 font-semibold'>Accept</button>
                                                        ) : Number(event.is_accepted) === 1 ? (
                                                            <button onClick={() => headleAcceptandRefuse(event.event_id)} className='mr-2 text-red-500 font-semibold'>Refuse</button>
                                                        ) : null
                                                    ) : null
                                                }
                                                <button onClick={() => headleDelete(event.event_id)} className='text-red-500 font-semibold mr-2'>Delete</button>
                                                <a href={`/Dashboard/ViewEvent/${event.event_id}`}><button className='text-[#560606] font-semibold'>Edit</button></a>
                                            </td>
                                        </tr>
                                    )
                                }
                                else if (RoleUser === 'user') {
                                    if (event.add_by === EmailUser) {
                                        return (
                                            <tr key={index} className='w-full h-16 text-center'>
                                                <td>{index + 1}</td>
                                                <td>{event.event_title}</td>
                                                <td>{event.event_date}</td>
                                                <td>
                                                    {
                                                        RoleUser === "dvc" ? (
                                                            Number(event.is_accepted) === 1 ? (
                                                                <div className='mr-2 text-white rounded py-1 bg-green-500 font-semibold'>Accepted</div>
                                                            ) : Number(event.is_accepted) === 0 ? (
                                                                <div className='mr-2 text-white rounded py-1 bg-red-500 font-semibold'>Refused</div>
                                                            ) : null
                                                        ) : null
                                                    }

                                                    {
                                                        RoleUser === "dvc" ? (
                                                            Number(event.is_accepted) === 0 ? (
                                                                <button onClick={() => headleAcceptandRefuse(event.event_id)} className='mr-2 text-green-500 font-semibold'>Accept</button>
                                                            ) : Number(event.is_accepted) === 1 ? (
                                                                <button onClick={() => headleAcceptandRefuse(event.event_id)} className='mr-2 text-red-500 font-semibold'>Refuse</button>
                                                            ) : null
                                                        ) : null
                                                    }
                                                    <button onClick={() => headleDelete(event.event_id)} className='text-red-500 font-semibold mr-2'>Delete</button>
                                                    <a href={`/Dashboard/ViewEvent/${event.event_id}`}><button className='text-[#560606] font-semibold'>Edit</button></a>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No events available</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

export default EventsManage