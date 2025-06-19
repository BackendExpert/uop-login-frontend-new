import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaQuestionCircle } from 'react-icons/fa'
import secureLocalStorage from 'react-secure-storage';
import Defaultbtn from '../../components/Button/Defaultbtn';
import DefultInput from '../../components/Forms/DefultInput';
import { useNavigate } from 'react-router-dom';


const CreateFAQ = () => {
    const navigate = useNavigate()
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");


    const [faqdata, setfaqdat] = useState({
        action: 'createfaq',
        question: '',
        answer: '',
        link: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setfaqdat((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const headleCreateFAQ = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/faq.php`, faqdata, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });


            if (res.data.Status === "Success") {
                alert("New FAQ Created Successfully");
                navigate('/Dashboard/FAQ');
            } else {
                console.error("Error Details:", res.data); // Detailed error log
                alert(res.data.error || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Axios Error:", err);
            alert(err.response?.data?.error || "Request failed");
        }
    };


    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className='mt-4'>
                <div className="flex">
                    <div className="">
                        <div className="inline-block p-2 bg-[#560606] rounded">
                            <FaQuestionCircle className='h-6 w-auto fill-white' />
                        </div>
                    </div>
                    <div className="pl-4">
                        <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Create New FAQ</h1>
                    </div>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/FAQ">
                        <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                            Back
                        </button>
                    </a>
                </div>


                <div className="bg-white p-8 mt-4 shadow-xl rounded-md">
                    <form onSubmit={headleCreateFAQ} className="space-y-4">
                        <DefultInput
                            label="Question"
                            name="question"
                            value={faqdata.question}
                            onChange={handleInputChange}
                            placeholder="Enter Question"
                        />

                        <DefultInput
                            label="Answer"
                            name="answer"
                            value={faqdata.answer}
                            onChange={handleInputChange}
                            placeholder="Enter Answer"
                        />

                        <DefultInput
                            label="Link"
                            name="link"
                            value={faqdata.link}
                            onChange={handleInputChange}
                            placeholder="Enter Link"
                        />

                        <div className="">
                            <Defaultbtn
                                type={'submit'}
                                btnvalue={"Create New FAQ"}
                            />
                        </div>

                    </form>
                </div>
            </div>
        )
    }
    else {
        useEffect(() => {
            localStorage.clear()
            window.location.reload()
        }, [])
    }

}

export default CreateFAQ