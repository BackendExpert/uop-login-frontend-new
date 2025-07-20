import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRankings = () => {
    const navigate = useNavigate()
    const currentYear = new Date().getFullYear();

    const [formData, setFormData] = useState({
        island: '',
        asian: '',
        world: '',
        year: currentYear,
        theur: '',
        their: '',
        usnw: '',
        qsur: '',
        wrwu: '',
        uig: ''
    });

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const form = new FormData();
            form.append('action', 'createRankings');
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            const res = await axios.post(`${import.meta.env.VITE_APP_API}/rankings.php`, form);

            console.log('🟡 Backend response:', res.data);

            if (res.data.Status === 'Success') {
                setStatus('✅ Successfully added ranking.');
                alert("Adding Success")
                navigate('/Dashboard/Rankings')
                setFormData({
                    island: '',
                    asian: '',
                    world: '',
                    year: currentYear,
                    theur: '',
                    their: '',
                    usnw: '',
                    qsur: '',
                    wrwu: '',
                    uig: ''
                });
            } else if (res.data.error === 'Duplicate entry') {
                setStatus('⚠️ Ranking for this year already exists.');
            } else if (res.data.error) {
                setStatus(`❌ Error: ${res.data.error}`);
                console.error('🔴 Backend error details:', res.data.details || 'No details');
            } else {
                setStatus('❌ Failed to add ranking. Unknown response.');
            }

        } catch (err) {
            console.error('🔥 Network/Server error:', err);
            if (err.response && err.response.data) {
                console.error('🔴 Backend error response:', err.response.data);
                setStatus(`❌ Server Error: ${err.response.data.error || 'Unknown server error'}`);
            } else {
                setStatus('⚠️ A network error occurred. Please try again.');
            }
        }
    };



    const fieldLabels = {
        island: 'Island Rank',
        asian: 'Asian Rank',
        world: 'World Rank',
        theur: 'Times Higher Education University',
        their: 'Times Higher Education Impact',
        usnw: 'U.S. News & World Report University',
        qsur: 'QS University',
        wrwu: 'Webometrics Ranking of World Universities',
        uig: 'UI GreenMetric World University'
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="mb-4">
                <a href="/Dashboard/Rankings">
                    <button className="bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-6 py-2 text-white rounded duration-500">
                        Back
                    </button>
                </a>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
                {Object.keys(fieldLabels).map((field) => (
                    <div key={field}>
                        <label className="block mb-1 text-sm font-semibold">{fieldLabels[field]}</label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                ))}
                <div className="col-span-1 md:col-span-2 text-center mt-4">
                    <button
                        type="submit"
                        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 duration-300"
                    >
                        Create Ranking ({currentYear})
                    </button>
                </div>
            </form>

            {status && (
                <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
            )}
        </div>
    );
};

export default CreateRankings;
