import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsBagFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import DefultInput from '../../components/Forms/DefultInput';
import Defaultbtn from '../../components/Button/Defaultbtn';
import FileInput from '../../components/Forms/FileInput';

const CreateWorkshops = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("role");

    const [wsdata, setwsdata] = useState({
        action: 'createWorkshopandShortCourse',
        name: '',
        desc: '',
        link: '',
        fuclty: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setwsdata((prev) => ({ ...prev, [name]: value }));
    };

    const headleCreateWs = async (e) => {
        e.preventDefault();


        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/workshops.php`, wsdata, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });


            if (res.data.Status === "Success") {
                alert("New Workshop & Short Course Created Successfully");
                navigate('/Dashboard/WorkshopsSc');
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
        <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
                <BsBagFill className="text-indigo-500" /> Create Workshop / Short Course
            </h2>

            <form onSubmit={headleCreateWs} className="space-y-5">
                <DefultInput
                    label="Workshop Name"
                    name="name"
                    value={wsdata.name}
                    onChange={handleInputChange}
                    placeholder="Enter workshop or course title"
                    required
                />

                <DefultInput
                    label="Description"
                    name="desc"
                    value={wsdata.desc}
                    onChange={handleInputChange}
                    placeholder="Brief description about the workshop"
                    required
                />

                <DefultInput
                    label="External Link"
                    name="link"
                    value={wsdata.link}
                    onChange={handleInputChange}
                    placeholder="Optional: Add a registration or info link"
                />

                <DefultInput
                    label="Faculty"
                    name="fuclty"
                    value={wsdata.fuclty}
                    onChange={handleInputChange}
                    placeholder="Enter faculty name (e.g. Science, Arts)"
                    required
                />

                <div className="pt-4">
                    <Defaultbtn type="submit" btnvalue="Create Workshop" />
                </div>
            </form>
        </div>
    )
}

export default CreateWorkshops