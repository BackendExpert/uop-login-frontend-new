import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import secureLocalStorage from 'react-secure-storage';


const FAQ = () => {
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [faqdata, setfaqdata] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/faq.php', {
            params: { action: "getallfaqs" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                console.log(res.data);
                if (res.data.Result) {
                    setfaqdata(res.data.Result);
                } else {
                    setfaqdata([]);
                }
            })
            .catch(err => {
                console.log(err);
                setfaqdata([]);
            });
    }, []);


    const headleDelete = async (id) => {
        console.log(id)
        const formData = new FormData();
        formData.append("action", "deletefaq");
        formData.append("FAQID", id);

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/faq.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("FAQ Deleted Successfully");
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
                    <div className="">
                        <div className="inline-block p-2 bg-[#560606] rounded">
                            <FaQuestionCircle className='h-6 w-auto fill-white' />
                        </div>
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">FAQ Management</h1>
                    </div>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/CreateFAQ">
                        <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                            Create New FAQ
                        </button>
                    </a>
                </div>

                <div className="mt-4">
                    <div className="md:grid grid-cols-3 gap-3">
                        {
                            faqdata.map((data, index) => {
                                return (
                                    <div className="bg-white p-6 rounded-xl shadow-xl" key={index}>
                                        <div className="">
                                            <h1 className="text-lg text-gray-500 font-semibold">
                                                {data.question}
                                            </h1>

                                            <p className="mt-2 text-gray-500">
                                                {data.answer}
                                            </p>

                                            <div className="flex justify-between mt-4">
                                                <p className="">
                                                    <a href={`${data.link}`} target='_blank' className='text-blue-500 font-semibold duration-500 hover:underline'>More Info</a>
                                                </p>
                                                <button onClick={() => headleDelete(data.id)} className='text-red-500 font-semibold duration-500 hover:underline'>
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

export default FAQ