import React, { useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import axios from 'axios'

const Staticties = () => {
    const [statistics, setStatistics] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/statistics.php', {
            params: { action: "getStatistics" }
        })
            .then(res => {
                if (res.data.Status === "Success" && Array.isArray(res.data.Result)) {
                    setStatistics(res.data.Result)
                } else {
                    setStatistics([])
                }
            })
            .catch(err => {
                console.error("Error fetching statistics:", err)
                setStatistics([])
            })
    }, [])

    return (
        <div className='mt-4'>
            <div className="flex">
                <div className="inline-block p-2 bg-[#560606] rounded">
                    <BsEye className='h-6 w-auto fill-white' />
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">
                        Manage Statistics
                    </h1>
                </div>
            </div>

            <a href="/Dashboard/CreateStatistics">
                <button className='bg-blue-500 mt-4 text-white px-4 py-2 rounded'>
                    Create New Statistic
                </button>
            </a>

            <div className="bg-white p-4 mt-4 rounded-xl shadow-xl">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200 h-12 text-left">
                            <th className='font-semibold'>#</th>
                            <th>Title</th>
                            <th>Count Data</th>
                            <th>Visible</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statistics.length > 0 ? (
                            statistics.map((item, index) => (
                                <tr key={item.id} className='h-16 border-b border-gray-200'>
                                    <td>{index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.countData}</td>
                                    <td>
                                        {parseInt(item.visibale) === 1 ? (
                                            <span className="text-green-600 font-semibold">Visible</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">Hidden</span>
                                        )}
                                    </td>
                                    <td>
                                        <a href={`/Dashboard/ViewStatistic/${item.id}`}>
                                            <button className='text-[#560606] font-semibold flex items-center gap-1'>
                                                <BsEye className='inline-block' /> View
                                            </button>
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4">No statistics available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Staticties
