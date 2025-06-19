import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsBagFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import DefultInput from '../../components/Forms/DefultInput';
import Defaultbtn from '../../components/Button/Defaultbtn';
import FileInput from '../../components/Forms/FileInput';

const CreateVacancies = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("role");

    const [vacdata, setvacdata] = useState({
        action: 'createVacancies',
        title: '',
        notice: null,
        application: null,
        closingdate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setvacdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setvacdata((prev) => ({ ...prev, [name]: files[0] }));
        }
    };

    const handleCreateVacancies = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('action', vacdata.action);
        formData.append('title', vacdata.title);
        formData.append('closingdate', vacdata.closingdate);

        if (vacdata.notice) {
            formData.append('notice', vacdata.notice);
        }
        if (vacdata.application) {
            formData.append('application', vacdata.application);
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/vacancies.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("New Vacancy Created Successfully");
                navigate('/Dashboard/Vacancies');
            } else {
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            alert(err.response?.data?.error || "Request failed");
        }
    };

    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className='mt-4'>
                <div className="flex">
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <BsBagFill className='h-6 w-auto fill-white' />
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Create Vacancies</h1>
                    </div>
                </div>

                <a href="/Dashboard/Vacancies">
                    <button className='bg-blue-500 mt-4 text-white px-4 py-2 rounded'>Back</button>
                </a>

                <div className="p-6 bg-white mt-4 rounded-xl shadow-md">
                    <form onSubmit={handleCreateVacancies} method="post">
                        <div className='mt-4'>
                            <p>Vacancy Title</p>
                            <DefultInput
                                type="text"
                                name="title"
                                value={vacdata.title}
                                onChange={handleInputChange}
                                required
                                placeholder="Vacancy Title"
                            />
                        </div>

                        <div className='mt-4'>
                            <p>Vacancy Notice (Upload file)</p>
                            <FileInput
                                name="notice"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div className='mt-4'>
                            <p>Vacancy Application (Upload file)</p>
                            <FileInput
                                name="application"
                                onChange={handleFileChange}
                                required
                            />
                        </div>

                        <div className='mt-4'>
                            <p>Vacancy Closing Date</p>
                            <input
                                type="date"
                                name="closingdate"
                                value={vacdata.closingdate}
                                onChange={handleInputChange}
                                required
                                className='
                                    w-full h-12
                                    pl-2 mt-2
                                    border border-gray-300
                                    rounded
                                    duration-500 
                                    focus:outline-none 
                                    focus:border-[#560606]
                                    placeholder:text-[#560606]
                                '
                            />
                        </div>

                        <div className="mt-8">
                            <Defaultbtn btnvalue="Create New Vacancy" type="submit" />
                        </div>
                    </form>
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

export default CreateVacancies;
