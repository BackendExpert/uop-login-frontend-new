import React, { useState } from 'react';
import DefultInput from '../../components/Forms/DefultInput';
import FileInput from '../../components/Forms/FileInput';
import DashTextArea from '../../components/Forms/DashTextArea';
import Defaultbtn from '../../components/Button/Defaultbtn';
import axios from 'axios';

const UpdateNEWS = ({ NEWSid }) => {
    const [updatenewsdata, setupdatenewsdata] = useState({
        action: 'updateNEWS',
        newsName: '',
        newsImg: null,
        newsImg2: null, // New image field
        newsImg3: null, // New image field
        newsDesc: '',
        newsLink: '',
        newsDate: '',
        NEWSid: NEWSid, // Ensure eventID is correctly passed here
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setupdatenewsdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        setupdatenewsdata((prevData) => ({
            ...prevData,
            [name]: file,
        }));
    };

    const handleUpdateNEWS = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append all fields including eventID
        Object.keys(updatenewsdata).forEach((key) => {
            if (key === "newsImg" || key === "newsImg2" || key === "newsImg3") {
                if (updatenewsdata[key]) {
                    formData.append(key, updatenewsdata[key]);
                }
            } else {
                formData.append(key, updatenewsdata[key]);
            }
        });

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/news.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log("Server Response:", res.data); // Detailed log

            if (res.data.Status === "Success") {
                alert("NEWS Updated Successfully");
                window.location.reload();
            } else {
                console.error("Error Details:", res.data); // Detailed error log
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Axios Error:", err);
            alert(err.response?.data?.error || "Request failed");
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdateNEWS} method="post">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p>NEWS Name</p>
                        <DefultInput
                            type="text"
                            name="newsName"
                            value={updatenewsdata.newsName}
                            onChange={handleInputChange}                            
                            placeholder="NEWS Name"
                        />
                    </div>
                    <div>
                        <p className='mb-2'>NEWS Image 1</p>
                        <FileInput
                            name="newsImg"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p>NEWS Description</p>
                    <DashTextArea
                        name="newsDesc"
                        value={updatenewsdata.newsDesc}                        
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
                            value={updatenewsdata.newsLink}
                            onChange={handleInputChange}                            
                            placeholder="NEWS Link"
                        />
                    </div>
                    <div>
                        <p>NEWS Date</p>
                        <DefultInput
                            type="date"
                            name="newsDate"
                            value={updatenewsdata.newsDate}
                            onChange={handleInputChange}                            
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <p className='mb-2'>NEWS Image 2</p>
                    <FileInput
                        name="newsImg2"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mt-4">
                    <p className='mb-2'>NEWS Image 3</p>
                    <FileInput
                        name="newsImg3"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="mt-8">
                    <Defaultbtn
                        btnvalue="Update NEWS Data"
                        type="Submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default UpdateNEWS;
