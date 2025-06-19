import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa6';
import secureLocalStorage from "react-secure-storage";
import DefultInput from '../../components/Forms/DefultInput';
import Defaultbtn from '../../components/Button/Defaultbtn';
import { useNavigate } from 'react-router-dom';

const CreateSociety = () => {
    const navigate = useNavigate();
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [scoietydata, setscoietydata] = useState({
        action: 'createSociety',
        name: '',
        image: null,
        link: '',
        faculty: '',
    });

    const faculties = [
        "Common Societies",
        "Faculty of Agriculture",
        "Faculty of Allied Health Sciences",
        "Faculty of Arts",
        "Faculty of Dental Sciences",
        "Faculty of Engineering",
        "Faculty of Medicine",
        "Faculty of Science",
        "Faculty of Veterinary Medicine and Animal Science",
        "Faculty of Management"
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setscoietydata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setscoietydata((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleCreateDiploma = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(scoietydata).forEach((key) => {
            formData.append(key, scoietydata[key]);
        });

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/society.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log("Server Response:", res.data);

            if (res.data.Status === "Success") {
                alert("New Society Created Successfully");
                navigate('/Dashboard/Societies');
            } else {
                console.error("Error Details:", res.data);
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Axios Error:", err);
            alert(err.response?.data?.error || "Request failed");
        }
    };

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
                            Create Society
                        </h1>
                    </div>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/Societies">
                        <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                            Back
                        </button>
                    </a>
                </div>

                <div className="bg-white mt-4 rounded-xl shadow-xl p-8">
                    <form onSubmit={handleCreateDiploma} className="space-y-4">
                        <DefultInput
                            label="Name of Society"
                            name="name"
                            value={scoietydata.name}
                            onChange={handleInputChange}
                            placeholder="Enter Name"
                        />

                        <DefultInput
                            label="Link"
                            name="link"
                            value={scoietydata.link}
                            onChange={handleInputChange}
                            placeholder="Enter Link"
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Faculty
                            </label>
                            <select
                                name="faculty"
                                value={scoietydata.faculty}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#560606]"
                                required
                            >
                                <option value="">-- Select Faculty --</option>
                                {faculties.map((faculty, index) => (
                                    <option key={index} value={faculty}>{faculty}</option>
                                ))}
                            </select>
                        </div>

                        <DefultInput
                            label="Image"
                            name="image"
                            type="file"
                            onChange={handleImageChange}
                        />

                        <div>
                            <Defaultbtn
                                type={'submit'}
                                btnvalue={"Create Society"}
                            />
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
    }
};

export default CreateSociety;
