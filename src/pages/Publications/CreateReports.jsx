import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateReports = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        pub_name: '',
        desc: '',
        year: '',
        file: null,
        pub_type: '',
        coverimge: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('action', 'createPublication');
        formDataToSend.append('pub_name', formData.pub_name);
        formDataToSend.append('desc', formData.desc);
        formDataToSend.append('year', formData.year);
        formDataToSend.append('pub_type', formData.pub_type);
        formDataToSend.append('file', formData.file);
        formDataToSend.append('coverimge', formData.coverimge);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/publications.php`,
                formDataToSend,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            if (res.data.Status === "Success") {
                alert("New Publication Created Successfully");
                navigate('/Dashboard/Publication');
            } else {
                console.error("Error Details:", res.data);
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            console.error(err);
            alert('Upload failed');
        }
    };

    return (
        <div className="max-w-8xl mx-auto p-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6 border">
                <h2 className="text-2xl font-bold text-gray-800">Add New Publication</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="2024"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Publication Type</label>
                    <select
                        name="pub_type"
                        value={formData.pub_type}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    >
                        <option value="" disabled>Select type</option>
                        <option value="Annual Reports">Annual Reports</option>
                        <option value="Journals">Journals</option>
                        <option value="Newsletters">Newsletters</option>
                        <option value="Sustainability Reports">Sustainability Reports</option>
                        <option value="Statistical Handbooks">Statistical Handbooks</option>
                        <option value="Digital Library">Digital Library</option>
                        <option value="University Calendar">University Calendar</option>
                        <option value="Centenary Development Plan">Centenary Development Plan</option>
                        <option value="Action Plan">Action Plan</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Publication Name</label>
                    <input
                        type="text"
                        name="pub_name"
                        value={formData.pub_name}
                        onChange={handleChange}
                        placeholder="Enter publication title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="desc"
                        value={formData.desc}
                        onChange={handleChange}
                        placeholder="Brief description"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                        rows={4}
                    ></textarea>
                </div>



                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload File (PDF)</label>
                    <input
                        type="file"
                        name="file"
                        accept="application/pdf"
                        onChange={handleChange}
                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white p-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Upload Cover Image</label>
                    <input
                        type="file"
                        name="coverimge"
                        accept="image/*"
                        onChange={handleChange}
                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white p-2"
                    />
                </div>

                <div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Submit Publication
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateReports;
