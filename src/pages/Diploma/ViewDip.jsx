import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa6';
import { useParams, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import UpdateDip from './UpdateDip';

const ViewDip = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [dipdata, setDipdata] = useState(null);

    useEffect(() => {
        if (RoleUser !== 'dvc' && RoleUser !== 'admin') {
            localStorage.clear();
            navigate(0); // Reloads the page
            return;
        }

        axios.get(import.meta.env.VITE_APP_API + '/diploma.php', {
            params: { action: "getalldips" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => {
            if (res.data.Result) {
                console.log(res.data.Result)
                const filtered = res.data.Result.find(dip => String(dip.id) === String(id));
                setDipdata(filtered || null);
            } else {
                setDipdata(null);
            }
        })
        .catch(err => {
            console.error(err);
            setDipdata(null);
        });
    }, [id, RoleUser, navigate]);

    if (RoleUser !== 'dvc' && RoleUser !== 'admin') {
        return null; // Avoid rendering anything until redirect
    }

    return (
        <div className='mt-4'>
            <div className="flex">
                <div>
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <FaBook className='h-6 w-auto fill-white' />
                    </div>
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">
                        Diploma View
                    </h1>
                </div>
            </div>

            <div className="mt-4">
                <a href="/Dashboard/Diploma">
                    <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                        Back
                    </button>
                </a>
            </div>

            {dipdata ? (
                <div className="mt-6 p-4 bg-white rounded-lg shadow-xl">
                    <img src={`${import.meta.env.VITE_APP_API}/${dipdata.image}`} alt="" className='h-40 w-auto mt-2'/>
                    <h2 className="text-lg font-semibold text-gray-700">Title: {dipdata.title}</h2>
                    <p className="text-gray-600 mt-2">Description: {dipdata.description}</p>
                    <p className="text-gray-600 mt-2">Link: <a href={dipdata.link} target='_blank' className='text-blue-500 font-semibold'>Click More</a></p>
                </div>
            ) : (
                <p className="text-red-500 mt-6">No diploma found with the specified ID.</p>
            )}


            <div className="mt-4">
                <UpdateDip DipID={id} />
            </div>
        </div>
    );
};

export default ViewDip;
