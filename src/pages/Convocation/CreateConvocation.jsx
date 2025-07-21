import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateConvocation = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        year: '',
        vc_message: '',
        vs_title_name: ''
    });

    const [files, setFiles] = useState({
        vc_img: null,
        notice_Graduands: null,
        Convocation_schedule: null
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFiles({ ...files, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('action', 'createconvocation');
        data.append('year', formData.year);
        data.append('vc_message', formData.vc_message);
        data.append('vs_title_name', formData.vs_title_name);
        data.append('vc_img', files.vc_img);
        data.append('notice_Graduands', files.notice_Graduands);
        data.append('Convocation_schedule', files.Convocation_schedule);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_APP_API}/convocation.php`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            const result = response.data;
            if (result.Status === 'Success') {
                alert('Convocation created successfully!')
                navigate('/Dashboard/Convocation', { replace: true })
            } else {
                setMessage(result.error || 'Something went wrong.');
            }
        } catch (error) {
            setMessage('Failed to connect to the server.');
        }
    };

    return (
        <div className="mt-4">
            <div className="mb-4">
                <a href="/Dashboard/Convocation">
                    <button className="bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-6 py-2 text-white rounded duration-500">
                        Back
                    </button>
                </a>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Create Convocation</h2>

            {message && (
                <div className="mb-4 p-3 rounded bg-gray-100 text-sm text-gray-800 border border-gray-300">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="Year"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="vs_title_name"
                    value={formData.vs_title_name}
                    onChange={handleChange}
                    placeholder="Vice Chancellor Title"
                    className="w-full p-2 border rounded"
                />
                <textarea
                    name="vc_message"
                    value={formData.vc_message}
                    onChange={handleChange}
                    placeholder="Vice Chancellor Message"
                    className="w-full p-2 border rounded"
                    rows={5}
                ></textarea>

                <div>
                    <label className="block mb-1 font-medium">Upload VC Image</label>
                    <input
                        type="file"
                        name="vc_img"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        accept="image/*"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Upload Notice for Graduands</label>
                    <input
                        type="file"
                        name="notice_Graduands"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        accept=".pdf,.jpg,.png"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Upload Convocation Schedule</label>
                    <input
                        type="file"
                        name="Convocation_schedule"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        accept=".pdf,.jpg,.png"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#34D399] to-[#10B981] px-6 py-2 text-white rounded duration-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateConvocation;
