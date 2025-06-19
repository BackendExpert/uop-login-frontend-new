import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsBagFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'


const Vacancies = () => {
    const navigate = useNavigate()
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [jobdata, setjobdata] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/vacancies.php', {
            params: { action: "getallVacancies" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                console.log(res.data);
                if (res.data.Result) {
                    setjobdata(res.data.Result);
                } else {
                    setjobdata([]);
                }
            })
            .catch(err => {
                console.log(err);
                setjobdata([]);
            });
    }, []);


    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className='mt-4'>
                <div className="flex">
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <BsBagFill className='h-6 w-auto fill-white' />
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Vacancies Management</h1>
                    </div>
                </div>

                <a href="/Dashboard/CreateVacancies">
                    <button className='bg-blue-500 mt-4 text-white px-4 py-2 rounded'>
                        Create Vacancies
                    </button>
                </a>

                <div className="bg-white p-4 mt-4 rounded-xl shadow-xl">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200 h-12">
                                <th className='font-semibold'>#</th>
                                <th>Title</th>
                                <th>Closing Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(jobdata) && jobdata.length > 0 ? (
                                    jobdata.map((data, index) => {
                                        if (RoleUser === 'dvc' || RoleUser === 'admin') {
                                            return (
                                                <tr key={index} className='w-full h-16 text-center border-b border-gray-200'>
                                                    <td>{index + 1}</td>
                                                    <td>{data.title}</td>
                                                    <td>{data.closingdate}</td>
                                                    <td>
                                                        {/* <button onClick={() => headleDelete(data.id)} className='text-red-500 font-semibold mr-4'>Delete</button> */}
                                                        <a href={`/Dashboard/ViewVacancy/${data.id}`}><button className='text-[#560606] font-semibold'>Edit</button></a>
                                                    </td>
                                                </tr>
                                            )
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

export default Vacancies