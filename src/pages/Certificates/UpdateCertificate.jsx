import axios from 'axios';
import React, { useEffect, useState } from 'react'
import secureLocalStorage from "react-secure-storage";
import Defaultbtn from '../../components/Button/Defaultbtn';
import DefultInput from '../../components/Forms/DefultInput';


const UpdateCertificate = ({ CertificateID }) => {
    const EmailUser = secureLocalStorage.getItem("email");
    const RoleUser = secureLocalStorage.getItem("role");
    const UserName = secureLocalStorage.getItem("username");

    const [dipupdatedata, setdipupdatedata] = useState({
        action: 'updateCertificate',
        description: '',
        image: null,
        link: '',
        Dipid: CertificateID
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setdipupdatedata((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setdipupdatedata((prevData) => ({
            ...prevData,
            image: file,
        }));
    };

    const handleUpdateDiploma = async (e) => {
        e.preventDefault();
        const formData = new FormData();
    
        // Append all fields including eventID
        Object.keys(dipupdatedata).forEach((key) => {
            if (key === "image" && dipupdatedata[key]) {
                formData.append(key, dipupdatedata[key]);
            } else {
                formData.append(key, dipupdatedata[key]);
            }
        });
    
        try {
            const res = await axios.post(`${import.meta.env.VITE_APP_API}/cirtificate.php`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            console.log("Server Response:", res.data); // Detailed log
    
            if (res.data.Status === "Success") {
                alert("Cirtificate Updated Successfully");
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
    

    if (RoleUser === 'dvc' || RoleUser === 'admin') {
        return (
            <div className='bg-white p-8 mt-4 rounded-xl shadow-xl'>
                <form onSubmit={handleUpdateDiploma} className="space-y-4">
                    <DefultInput
                        label="Description"
                        name="description"
                        value={dipupdatedata.description}
                        onChange={handleInputChange}
                        placeholder="Enter Description"
                    />

                    <DefultInput
                        label="Link"
                        name="link"
                        value={dipupdatedata.link}
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
                            btnvalue={"Update Diploma Course"}
                        />
                    </div>

                </form>
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

export default UpdateCertificate