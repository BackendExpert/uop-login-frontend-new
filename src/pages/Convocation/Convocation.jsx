import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Convocation = () => {
    const [convocations, setConvocations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConvocations = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/convocation.php?action=getallconvocation`);
                setConvocations(res.data?.Result || []);
            } catch (err) {
                setError('Failed to load convocations');
            }
        };

        fetchConvocations();
    }, []);

    return (
        <div className='mt-4'>

            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#560606] rounded-full shadow-md" />
                <h1 className="text-2xl font-bold text-[#560606] uppercase">
                    Convocations
                </h1>
            </div>

            <div className="mb-6">
                <a href="/Dashboard/CreateConvocation">
                    <button className="bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] text-white px-6 py-2 rounded shadow hover:scale-105 transition-transform duration-300">
                        Create Convocation
                    </button>
                </a>
            </div>

            {error ? (
                <div className="bg-red-100 text-red-700 px-4 py-3 rounded shadow mb-4">{error}</div>
            ) : convocations.length === 0 ? (
                <div className="text-center text-gray-500">No convocations found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
                        <thead className="bg-[#560606] text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Year</th>
                                <th className="py-3 px-4 text-left">VC Message</th>
                                <th className="py-3 px-4 text-left">Title Name</th>
                                <th className="py-3 px-4 text-left">VC Image</th>
                                <th className="py-3 px-4 text-left">Notice</th>
                                <th className="py-3 px-4 text-left">Schedule</th>
                            </tr>
                        </thead>
                        <tbody>
                            {convocations.map((conv, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="py-3 px-4">{conv.year}</td>
                                    <td className="py-3 px-4 whitespace-pre-line max-w-xs">{conv.vc_message}</td>
                                    <td className="py-3 px-4">{conv.vs_title_name}</td>
                                    <td className="py-3 px-4">
                                        {conv.vc_img && (
                                            <img
                                                src={`${import.meta.env.VITE_APP_API}/${conv.vc_img}`}
                                                alt="VC"
                                                className="w-14 h-14 rounded-full object-cover border"
                                            />
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        {conv.notice_Graduands && (
                                            <a
                                                href={`${import.meta.env.VITE_APP_API}/${conv.notice_Graduands}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                View
                                            </a>
                                        )}
                                    </td>
                                    <td className="py-3 px-4">
                                        {conv.Convocation_schedule && (
                                            <a
                                                href={`${import.meta.env.VITE_APP_API}/${conv.Convocation_schedule}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:underline"
                                            >
                                                View
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Convocation;
