import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BsBagFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const ViewVacancy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [datavac, setdatavac] = useState(null);
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [noticeFile, setNoticeFile] = useState(null);
    const [applicationFile, setApplicationFile] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        if (RoleUser !== 'dvc' && RoleUser !== 'admin') {
            localStorage.clear();
            window.location.reload();
            return;
        }

        axios.get(import.meta.env.VITE_APP_API + '/vacancies.php', {
            params: { action: "getallVacancies" },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
            .then(res => {
                if (res.data.Result) {
                    const filteredVacancy = res.data.Result.find(vac => vac.id === id || vac.id === Number(id));
                    if (filteredVacancy) {
                        setdatavac(filteredVacancy);
                        setTitle(filteredVacancy.title || '');
                        setClosingDate(filteredVacancy.closingdate ? new Date(filteredVacancy.closingdate).toISOString().substring(0, 10) : '');
                    } else {
                        setdatavac(null);
                    }
                } else {
                    setdatavac(null);
                }
            })
            .catch(err => {
                console.error(err);
                setdatavac(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, RoleUser]);

    const handleNoticeChange = (e) => {
        setNoticeFile(e.target.files[0]);
    };

    const handleApplicationChange = (e) => {
        setApplicationFile(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const formData = new FormData();
            formData.append('action', 'updateVacancy');
            formData.append('id', datavac.id);
            formData.append('title', title);
            formData.append('closingdate', closingDate);
            if (noticeFile) formData.append('notice', noticeFile);
            if (applicationFile) formData.append('application', applicationFile);

            const response = await axios.post(import.meta.env.VITE_APP_API + '/vacancies.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.Status === "Success") {
                alert('Vacancy updated successfully!');
                window.location.reload()
            } else {
                alert(response.data.message || 'Failed to update vacancy.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during update.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <div className="mt-4 text-center">Loading vacancy details...</div>;
    }

    if (!datavac) {
        return <div className="mt-4 text-center text-red-600">Vacancy not found.</div>;
    }

    return (
        <div className='mt-4'>
            {/* View Section */}
            <div className="flex">
                <div className="inline-block p-2 bg-[#560606] rounded">
                    <BsBagFill className='h-6 w-auto fill-white' />
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">View Vacancy: {datavac.title}</h1>
                </div>
            </div>

            <button
                onClick={() => navigate("/Dashboard/Vacancies")}
                className='bg-blue-500 mt-4 text-white px-4 py-2 rounded'
            >
                Back
            </button>

            <div className="bg-white p-8 mt-4 rounded-xl shadow-xl">
                <table className='w-full'>
                    <tbody>
                        <tr className='h-12 border-b border-gray-200'>
                            <td className='font-semibold w-1/4 text-gray-500'>Vacancy Title</td>
                            <td>{datavac.title}</td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200'>
                            <td className='font-semibold w-1/4 text-gray-500'>Vacancy Notice</td>
                            <td>
                                {datavac.notice ? (
                                    <a
                                        href={`${import.meta.env.VITE_APP_API}/${datavac.notice}`}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className='text-blue-500 duration-500 hover:underline'
                                    >
                                        View Notice
                                    </a>
                                ) : (
                                    "No Notice file available"
                                )}
                            </td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200'>
                            <td className='font-semibold w-1/4 text-gray-500'>Closing Date</td>
                            <td>{new Date(datavac.closingdate).toLocaleDateString()}</td>
                        </tr>
                        <tr className='h-12 border-b border-gray-200'>
                            <td className='font-semibold w-1/4 text-gray-500'>Application</td>
                            <td>
                                {datavac.application ? (
                                    <a
                                        href={`${import.meta.env.VITE_APP_API}/${datavac.application}`}
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        className='text-blue-500 duration-500 hover:underline'
                                    >
                                        View Application
                                    </a>
                                ) : (
                                    "No application file available"
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Edit Section */}
            <div className="bg-white p-8 mt-8 rounded-xl shadow-xl">
                <h2 className="text-[#560606] text-xl font-semibold mb-4 uppercase">Edit Vacancy</h2>

                <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                        <label className="block font-semibold mb-1" htmlFor="title">Vacancy Title</label>
                        <input
                            id="title"
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="closingDate">Closing Date</label>
                        <input
                            id="closingDate"
                            type="date"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={closingDate}
                            onChange={e => setClosingDate(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="noticeFile">Vacancy Notice (Upload new to replace)</label>
                        <input
                            id="noticeFile"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleNoticeChange}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-1" htmlFor="applicationFile">Application (Upload new to replace)</label>
                        <input
                            id="applicationFile"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleApplicationChange}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={updating}
                            className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 duration-300 ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {updating ? 'Updating...' : 'Update Vacancy'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewVacancy;
