import React, { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import DefultInput from '../../components/Forms/DefultInput';
import FileInput from '../../components/Forms/FileInput';
import DashTextArea from '../../components/Forms/DashTextArea';
import Defaultbtn from '../../components/Button/Defaultbtn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from "react-secure-storage";

const CreateNewEvent = () => {
    const navigate = useNavigate();
    const EmailUser = secureLocalStorage.getItem("email");

    const [newsdata, setnewsdata] = useState({
        action: 'createNEWS',
        newsName: '',
        newsImg: null,
        img2: null,
        img3: null,
        newsDesc: '',
        newsLink: '',
        newsDate: '',
        newsAddby: EmailUser || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnewsdata(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e, imageField) => {
        const file = e.target.files[0];
        setnewsdata(prev => ({
            ...prev,
            [imageField]: file,
        }));
    };

    const headleCreateNews = async (e) => {
        e.preventDefault();

        // Prepare form data
        const formData = new FormData();

        // Append all fields properly (including files)
        formData.append('action', newsdata.action);
        formData.append('newsName', newsdata.newsName);
        formData.append('newsDesc', newsdata.newsDesc);
        formData.append('newsLink', newsdata.newsLink);
        formData.append('newsDate', newsdata.newsDate);
        formData.append('newsAddby', newsdata.newsAddby);

        if (newsdata.newsImg) formData.append('newsImg', newsdata.newsImg);
        if (newsdata.img2) formData.append('newsImg2', newsdata.img2);
        if (newsdata.img3) formData.append('newsImg3', newsdata.img3);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/news.php`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            if (res.data.Status === "Success") {
                alert("New NEWS Created Successfully");
                navigate('/Dashboard/NEWS');
            } else {
                alert(res.data.error || "Unknown error occurred");
                console.error("Server response error:", res.data);
            }
        } catch (err) {
            alert(err.response?.data?.error || "Request failed");
            console.error("Axios error:", err);
        }
    };

    return (
        <div className="mt-4">
            <div className="flex">
                <div>
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <BsPlus className="h-6 w-auto fill-white" />
                    </div>
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Create New NEWS</h1>
                </div>
            </div>

            <div className="mt-4">
                <a href="/Dashboard/NEWS">
                    <button className="bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500">
                        Back
                    </button>
                </a>
            </div>

            <div className="my-8">
                <form onSubmit={headleCreateNews} method="post">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p>NEWS Name</p>
                            <DefultInput
                                type="text"
                                name="newsName"
                                value={newsdata.newsName}
                                onChange={handleInputChange}
                                required
                                placeholder="NEWS Name"
                            />
                        </div>
                        <div>
                            <p>NEWS Image</p>
                            <FileInput
                                name="newsImg"
                                accept="image/*"
                                required
                                onChange={(e) => handleImageChange(e, "newsImg")}
                            />
                        </div>
                        <div>
                            <p>Image 2</p>
                            <FileInput
                                name="img2"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "img2")}
                            />
                        </div>
                        <div>
                            <p>Image 3</p>
                            <FileInput
                                name="img3"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "img3")}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <p>NEWS Description</p>
                        <DashTextArea
                            name="newsDesc"
                            value={newsdata.newsDesc}
                            required
                            placeholder="NEWS Description"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p>NEWS Link</p>
                            <DefultInput
                                type="text"
                                name="newsLink"
                                value={newsdata.newsLink}
                                onChange={handleInputChange}
                                required
                                placeholder="NEWS Link"
                            />
                        </div>
                        <div>
                            <p>NEWS Date</p>
                            <DefultInput
                                type="date"
                                name="newsDate"
                                value={newsdata.newsDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <Defaultbtn
                            btnvalue="Create New NEWS"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewEvent;
