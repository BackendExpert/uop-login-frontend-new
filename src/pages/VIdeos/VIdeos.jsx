import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VIdeos = () => {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_API + '/video.php?action=getallvideos');
                if (response.data.Status === "Success") {
                    setVideos(response.data.Result);
                }
            } catch (err) {
                console.error("Error fetching videos:", err);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">All Videos</h2>
                <button
                    onClick={() => navigate('/Dashboard/CreateVideo')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Create Video
                </button>
            </div>

            {videos.length === 0 ? (
                <p className="text-center text-gray-500">No videos found.</p>
            ) : (
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Short Desc</th>
                            <th className="px-4 py-2 border">Video URL</th>
                            <th className="px-4 py-2 border">Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {videos.map((video, index) => (
                            <tr key={video.id} className="text-center hover:bg-gray-50">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border">{video.title}</td>
                                <td className="px-4 py-2 border">{video.short_desc}</td>
                                <td className="px-4 py-2 border">
                                    <a
                                        href={video.video_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        {video.video_url}
                                    </a>
                                </td>
                                <td className="px-4 py-2 border">{video.add_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VIdeos;
