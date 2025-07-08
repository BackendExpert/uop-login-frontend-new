import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateVideo = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('action', 'createVideo');
            formData.append('title', title);
            formData.append('vidoe_url', videoUrl);
            formData.append('short_desc', shortDesc);

            const response = await axios.post(
                import.meta.env.VITE_APP_API + '/video.php',
                formData
            );

            if (response.data.Status === "Success") {
                alert("Video Created Successful")
                navigate('/Dashboard/Videos')
            } else {
                console.error("Failed to add video:", response.data);
            }
        } catch (err) {
            console.error("Error adding video:", err);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">YouTube Video URL</label>
                    <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Short Description</label>
                    <input
                        type="text"
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                        maxLength={99}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Adding...' : 'Add Video'}
                </button>
            </form>
        </div>
    );
};

export default CreateVideo;
