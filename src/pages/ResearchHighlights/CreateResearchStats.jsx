import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFlask } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Defaultbtn from '../../components/Button/Defaultbtn';
import DefultInput from '../../components/Forms/DefultInput';

const CreateResearchStats = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("role");

    const [data, setData] = useState({
        action: 'createResearchHeightlight',
        year: '',
        column_title: '',
        data_column: '',
        is_active: 1,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!data.year || !data.column_title || !data.data_column) {
            alert("Year, Column Title, and Data Column are required");
            return;
        }

        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));

            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/research.php`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (res.data.Status === "Success") {
                alert("Research highlight added successfully");
                navigate('/Dashboard/ResearchHighlights');
            } else {
                alert(res.data.error || "Failed to add data");
            }
        } catch (err) {
            alert(err.response?.data?.error || "Request failed");
        }
    };

    if (RoleUser === 'admin' || RoleUser === 'dvc') {
        return (
            <div className='mt-4'>
                <div className="flex items-center gap-2">
                    <div className="inline-block p-2 bg-[#065606] rounded">
                        <FaFlask className='h-6 w-auto fill-white' />
                    </div>
                    <h1 className="text-[#065606] text-xl font-semibold uppercase">Add Research Highlight</h1>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/ResearchHighlights">
                        <button className='bg-gradient-to-r from-green-500 to-green-300 px-8 py-2 text-white rounded duration-500'>
                            Back
                        </button>
                    </a>
                </div>

                <div className="p-6 bg-white mt-4 rounded-xl shadow-md max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">

                        <DefultInput
                            label="Year *"
                            name="year"
                            type="text"
                            value={data.year}
                            onChange={handleInputChange}
                            placeholder="Enter year"
                            required
                        />

                        <DefultInput
                            label="Column Title *"
                            name="column_title"
                            type="text"
                            value={data.column_title}
                            onChange={handleInputChange}
                            placeholder="Column Title"
                            required
                        />

                        <DefultInput
                            label="Data Column *"
                            name="data_column"
                            type="text"
                            value={data.data_column}
                            onChange={handleInputChange}
                            placeholder="Data Column"
                            required
                        />

                        <div className="flex items-center col-span-full">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                checked={!!data.is_active}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label htmlFor="is_active">Is Active</label>
                        </div>

                        <div className="col-span-full flex justify-end">
                            <Defaultbtn type="submit" btnvalue="Add Research Highlight" />
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

export default CreateResearchStats;
