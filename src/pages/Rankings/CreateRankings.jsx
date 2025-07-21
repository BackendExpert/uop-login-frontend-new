import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRankings = () => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear() -1 ;

    const initialFormData = {
        year: currentYear,
        theur_islandrank: '',
        theur_asianrank: '',
        theur_worldrank: '',

        their_islandrank: '',
        their_asianrank: '',
        their_worldrank: '',

        usnw_islandrank: '',
        usnw_asianrank: '',
        usnw_worldrank: '',

        qsur_islandrank: '',
        qsur_asianrank: '',
        qsur_worldrank: '',

        wrwu_islandrank: '',
        wrwu_asianrank: '',
        wrwu_worldrank: '',

        uig_islandrank: '',
        uig_asianrank: '',
        uig_worldrank: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
                alert("Adding Success");
                navigate('/Dashboard/Rankings');
                setFormData(initialFormData);
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

    const rankingSystems = {
        theur: 'Times Higher Education University',
        their: 'Times Higher Education Impact',
        usnw: 'U.S. News & World Report',
        qsur: 'QS University',
        wrwu: 'Webometrics Ranking of World Universities',
        uig: 'UI GreenMetric World University'
    };

    const rankTypes = {
        islandrank: 'Island Rank',
        asianrank: 'Asian Rank',
        worldrank: 'World Rank'
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-4">
                <a href="/Dashboard/Rankings">
                    <button className="bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-6 py-2 text-white rounded duration-500">
                        Back
                    </button>
                </a>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow">
                {Object.entries(rankingSystems).map(([systemKey, systemLabel]) => (
                    <div key={systemKey} className="col-span-1 md:col-span-2 border-b pb-2 mt-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{systemLabel}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {Object.entries(rankTypes).map(([rankKey, rankLabel]) => {
                                const inputName = `${systemKey}_${rankKey}`;
                                return (
                                    <div key={inputName}>
                                        <label className="block mb-1 text-sm font-semibold">{rankLabel}</label>
                                        <input
                                            type="text"
                                            name={inputName}
                                            value={formData[inputName]}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                <div className="col-span-1 md:col-span-2 text-center mt-6">
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
