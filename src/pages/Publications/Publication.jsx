import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Defaultbtn from '../../components/Button/Defaultbtn';

const Publication = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPublications = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_APP_API}/publications.php?action=getPublications`);
            if (res.data.Status === "Success") {
                setPublications(res.data.Result);
            } else {
                console.error('Failed to fetch publications');
            }
        } catch (err) {
            console.error('Error fetching publications:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublications();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">All Publications</h2>
                <Link to={'/Dashboard/CreateReports'}>
                    <Defaultbtn
                        type={'button'}
                        btnvalue={'Create Reports'}
                    />
                </Link>
            </div>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Year</th>
                                <th className="py-3 px-4 text-left">Type</th>
                                <th className="py-3 px-4 text-left">File</th>
                                <th className="py-3 px-4 text-left">Uploaded At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {publications.map((pub, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-100 transition duration-150"
                                >
                                    <td className="py-2 px-4">{pub.pub_name}</td>
                                    <td className="py-2 px-4">{pub.year}</td>
                                    <td className="py-2 px-4">{pub.pub_type}</td>
                                    <td className="py-2 px-4">
                                        {pub.file ? (
                                            <a
                                                href={`${import.meta.env.VITE_APP_API}/${pub.file}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                Download
                                            </a>
                                        ) : (
                                            'No File'
                                        )}
                                    </td>
                                    <td className="py-2 px-4 text-sm text-gray-500">
                                        {new Date(pub.upload_at).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {publications.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-4 px-4 text-center text-gray-500">
                                        No publications found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Publication;
