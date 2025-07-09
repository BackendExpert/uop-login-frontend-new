import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Ipurse = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_API}/ipurse.php`, {
                    params: { action: "getallipurse" },
                    headers: { "Content-Type": "application/json" }
                });

                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    setData([]);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">iPurse Records</h1>
                <Link
                    to="/Dashboard/CreaeteIpurse"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create iPurse
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Image</th>
                                <th className="py-2 px-4 border-b">Link</th>
                                <th className="py-2 px-4 border-b">Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b text-center">{item.id}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        {item.img ? (
                                            <img
                                                src={`${import.meta.env.VITE_APP_API}/${item.img}`}
                                                alt="ipurse"
                                                className="h-16 mx-auto"
                                            />
                                        ) : (
                                            <span>No image</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                            {item.link}
                                        </a>
                                    </td>
                                    <td className="py-2 px-4 border-b text-center">{item.year}</td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-4 text-center text-gray-500">No records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Ipurse;
