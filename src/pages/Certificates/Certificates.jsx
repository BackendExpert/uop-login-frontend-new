import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Certificates = () => {
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_API + '/cirtificate.php', {
                    params: { action: 'getallcirtificate' },
                });
                if (response.data.Status === "Success") {
                    setCertificates(response.data.Result);
                } else {
                    alert("Failed to load certificates");
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
                alert("Error fetching certificates");
            }
        };

        fetchCertificates();
    }, []);

    const handleToggleStatus = async (id, currentStatus) => {
        const formData = new FormData();
        formData.append("action", "toggleCertificateStatus"); // exact backend action
        formData.append("id", id); // backend expects "id"
        formData.append("status", currentStatus === "0" ? "1" : "0"); // backend expects "status"

        try {
            const res = await axios.post(import.meta.env.VITE_APP_API + '/cirtificate.php', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (res.data.Status === "Success") {
                alert("Certificate Status Updated Successfully");
                setCertificates(prev =>
                    prev.map(c => c.id === id ? { ...c, is_active: formData.get("status") } : c)
                );
            } else {
                alert(res.data.error || "An error occurred");
            }
        } catch (error) {
            console.error("Toggle status request failed:", error);
            alert("Failed to update certificate status");
        }
    };

    return (
        <div className='p-4'>
            <div className="mt-4">
                <a href="/Dashboard/CreateCertificate">
                    <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                        Create New Certificate
                    </button>
                </a>
            </div>
            
            <h2 className='text-2xl font-bold mb-4'>Certificates</h2>
            <table className='w-full border-collapse border border-gray-300'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='border border-gray-300 p-2'>Title</th>
                        <th className='border border-gray-300 p-2'>Description</th>
                        <th className='border border-gray-300 p-2'>Image</th>
                        <th className='border border-gray-300 p-2'>Link</th>
                        <th className='border border-gray-300 p-2'>Status</th>
                        <th className='border border-gray-300 p-2'>Toggle Status</th>
                    </tr>
                </thead>
                <tbody>
                    {certificates.length === 0 ? (
                        <tr>
                            <td colSpan={6} className='text-center p-4'>
                                No certificates found.
                            </td>
                        </tr>
                    ) : (
                        certificates.map(cert => (
                            <tr key={cert.id} className='hover:bg-gray-100'>
                                <td className='border border-gray-300 p-2'>{cert.title}</td>
                                <td className='border border-gray-300 p-2'>{cert.description}</td>
                                <td className='border border-gray-300 p-2'>
                                    {cert.image ? (
                                        <img
                                            src={import.meta.env.VITE_APP_API + "/" + cert.image}
                                            alt={cert.title}
                                            className='max-w-[100px] max-h-[60px]'
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td className='border border-gray-300 p-2'>
                                    <a
                                        href={cert.link}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='text-blue-600 underline'
                                    >
                                        Link
                                    </a>
                                </td>
                                <td className='border border-gray-300 p-2'>
                                    {cert.is_active === "1" ? (
                                        <span className='inline-block px-2 py-1 bg-green-500 text-white rounded font-semibold'>
                                            Accepted
                                        </span>
                                    ) : (
                                        <span className='inline-block px-2 py-1 bg-red-500 text-white rounded font-semibold'>
                                            Refused
                                        </span>
                                    )}
                                </td>
                                <td className='border border-gray-300 p-2'>
                                    <button
                                        onClick={() => handleToggleStatus(cert.id, cert.is_active)}
                                        className='px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700'
                                    >
                                        {cert.is_active === "1" ? "Set Refused" : "Set Accepted"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Certificates;
