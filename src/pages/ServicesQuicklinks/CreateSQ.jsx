import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdMiscellaneousServices } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Defaultbtn from '../../components/Button/Defaultbtn';
import DefultInput from '../../components/Forms/DefultInput';

const CreateSQ = () => {
    const navigate = useNavigate();
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [servicedata, setServicedata] = useState({
        action: 'createService',
        name: '',
        link: '',
        main_type: '',
        service_type: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setServicedata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCreateServiceQ = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/serviceq.php`, servicedata, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("New Service Quicklink Created Successfully");
                navigate('/Dashboard/ServicesQuicklinks');
            } else {
                console.error("Error Details:", res.data);
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Axios Error:", err);
            alert(err.response?.data?.error || "Request failed");
        }
    };

    // Hook for unauthorized users
    useEffect(() => {
        if (RoleUser !== 'admin' && RoleUser !== 'dvc') {
            localStorage.clear();
            window.location.reload();
        }
    }, [RoleUser]);

    if (RoleUser === 'admin' || RoleUser === 'dvc') {
        return (
            <div className='mt-4'>
                <div className="flex">
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <MdMiscellaneousServices className='h-6 w-auto fill-white' />
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Create New Services Quicklinks</h1>
                    </div>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/ServicesQuicklinks">
                        <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                            Back
                        </button>
                    </a>
                </div>

                <div className="bg-white p-8 mt-4 rounded-xl shadow-xl">
                    <form onSubmit={handleCreateServiceQ} className="space-y-4">
                        <DefultInput
                            label="Name"
                            name="name"
                            value={servicedata.name}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                        />

                        <DefultInput
                            label="Link"
                            name="link"
                            value={servicedata.link}
                            onChange={handleInputChange}
                            placeholder="Enter Link"
                        />

                        {/* Dropdown for main_type */}
                        <div>
                            <select
                                name="main_type"
                                value={servicedata.main_type}
                                onChange={handleInputChange}
                                className="w-full h-12 pl-2 mt-2 border border-gray-300 rounded duration-500 focus:outline-none focus:border-[#560606] placeholder:text-[#560606]"
                            >
                                <option value="">Select Main Type</option>
                                <option value="Services">Services</option>
                                <option value="QuickLinks">Quick Links</option>
                            </select>
                        </div>

                        {/* Dropdown for service_type */}
                        <div>
                            <select
                                name="service_type"
                                value={servicedata.service_type}
                                onChange={handleInputChange}
                                className="w-full h-12 pl-2 mt-2 border border-gray-300 rounded duration-500 focus:outline-none focus:border-[#560606] placeholder:text-[#560606]"
                            >
                                <option value="">Select Service Type</option>
                                <option value="PublicServices">Public Services</option>
                                <option value="StudentServices">Student Services</option>
                                <option value="StaffServices">Staff Services</option>
                            </select>
                        </div>


                        <div className="">
                            <Defaultbtn
                                type={'submit'}
                                btnvalue={"Create Service and Quick Link"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return null;
};

export default CreateSQ;
