import axios from 'axios';
import React, { useEffect, useState } from 'react';
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from 'react-router-dom';
import DefultInput from '../../components/Forms/DefultInput';
import Defaultbtn from '../../components/Button/Defaultbtn';
import { FaBook } from 'react-icons/fa6';


const CreateDiploma = () => {
    const navigate = useNavigate();
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [dipdata, setdipdata] = useState({
        action: 'creatediploma',
        image: null,
        title: '',
        decription: '',
        link: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setdipdata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setdipdata((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleCreateDiploma = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(dipdata).forEach((key) => {
            formData.append(key, dipdata[key]);
        });

        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/diploma.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log("Server Response:", res.data);

            if (res.data.Status === "Success") {
                alert("New Diploma Created Successfully");
                navigate('/Dashboard/Diploma');
            } else {
                console.error("Error Details:", res.data);
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Axios Error:", err);
            alert(err.response?.data?.error || "Request failed");
        }
    };

    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className="mt-4">
                <div className="flex">
                    <div className="">
                        <div className="inline-block p-2 bg-[#560606] rounded">
                            <FaBook className='h-6 w-auto fill-white' />
                        </div>
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Diploma Create</h1>
                    </div>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/Diploma">
                        <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                            Back
                        </button>
                    </a>
                </div>
                <div className="p-6 bg-white mt-4 rounded-xl shadow-md">
                    <form onSubmit={handleCreateDiploma} className="space-y-4">
                        <DefultInput
                            label="Title"
                            name="title"
                            value={dipdata.title}
                            onChange={handleInputChange}
                            placeholder="Enter Diploma Title"
                        />

                        <DefultInput
                            label="Description"
                            name="decription"
                            value={dipdata.decription}
                            onChange={handleInputChange}
                            placeholder="Enter Description"
                        />

                        <DefultInput
                            label="Link"
                            name="link"
                            value={dipdata.link}
                            onChange={handleInputChange}
                            placeholder="Enter Link"
                        />

                        <DefultInput
                            label="Image"
                            name="image"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <div className="">
                            <Defaultbtn
                                type={'submit'}
                                btnvalue={"Create Diploma Course"}
                            />
                        </div>

                    </form>
                </div>
            </div>

        );
    }
    else {
        useEffect(() => {
            localStorage.clear()
            window.location.reload()
        }, [])
    }


};

export default CreateDiploma;
