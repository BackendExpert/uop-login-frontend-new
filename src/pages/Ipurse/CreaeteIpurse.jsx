import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateIpurse = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        image: null,
        link: '',
        year: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg('');
        setErrorMsg('');

        const data = new FormData();
        data.append('action', 'createIpurse');
        data.append('image', formData.image);
        data.append('link', formData.link);
        data.append('year', formData.year);

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/ipurse.php`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (res.data.Status === 'Success') {
                setSuccessMsg('iPurse created successfully!');
                navigate('/Dashboard/Ipurse')
            } else {
                setErrorMsg(res.data.error || 'Failed to create iPurse');
            }
        } catch (err) {
            console.error(err);
            setErrorMsg('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create iPurse</h2>

            {successMsg && <div className="mb-3 p-2 bg-green-100 text-green-700 rounded">{successMsg}</div>}
            {errorMsg && <div className="mb-3 p-2 bg-red-100 text-red-700 rounded">{errorMsg}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="block w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Link</label>
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Year</label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="2025"
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Submitting...' : 'Create iPurse'}
                </button>
            </form>
        </div>
    );
};

export default CreateIpurse;
