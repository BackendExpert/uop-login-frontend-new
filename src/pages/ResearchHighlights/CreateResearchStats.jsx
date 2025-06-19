import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFlask } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Defaultbtn from '../../components/Button/Defaultbtn';
import DefultInput from '../../components/Forms/DefultInput';

const CreateResearchStats = () => {
    const navigate = useNavigate();
    const RoleUser = secureLocalStorage.getItem("role");

    const [data, setData] = useState({
        action: 'createResearchStats',
        year: '',
        research_journals: '',
        research_publications: '',
        citations: '',
        research_ranking: '',
        number_of_researchers_top2_percent: '',
        annual_research_conferences: '',
        annual_research_collaborations: '',
        research_awards_and_recognitions: '',
        annual_workshops_seminars: '',
        capital_grants_for_research: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for required fields
        if (!data.year) {
            alert("Year is required");
            return;
        }

        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => formData.append(key, data[key]));

            const res = await axios.post(
                `${import.meta.env.VITE_APP_API}/research.php`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            if (res.data.Status === "Success") {
                alert("Research statistics added successfully");
                navigate('/Dashboard/ResearchHighlights');
            } else {
                alert(res.data.error || "Failed to add data");
            }
        } catch (err) {
            alert(err.response?.data?.error || "Request failed");
        }
    };

    if (RoleUser === 'admin' || RoleUser === 'dvc') {
        return (
            <div className='mt-4'>
                <div className="flex items-center gap-2">
                    <div className="inline-block p-2 bg-[#065606] rounded">
                        <FaFlask className='h-6 w-auto fill-white' />
                    </div>
                    <h1 className="text-[#065606] text-xl font-semibold uppercase">Add Research Statistics</h1>
                </div>

                <div className="mt-4">
                    <a href="/Dashboard/ResearchHighlights">
                        <button className='bg-gradient-to-r from-green-500 to-green-300 px-8 py-2 text-white rounded duration-500'>
                            Back
                        </button>
                    </a>
                </div>

                <div className="p-6 bg-white mt-4 rounded-xl shadow-md max-w-4xl">
                    <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">

                        <DefultInput
                            label="Year *"
                            name="year"
                            type="number"
                            min="1900"
                            max="2099"
                            value={data.year}
                            onChange={handleInputChange}
                            placeholder="Enter year"
                            required
                        />
                        <DefultInput
                            label="Research Journals"
                            name="research_journals"
                            type="number"
                            value={data.research_journals}
                            onChange={handleInputChange}
                            placeholder="Research Journals"
                        />
                        <DefultInput
                            label="Research Publications"
                            name="research_publications"
                            type="number"
                            value={data.research_publications}
                            onChange={handleInputChange}
                            placeholder="Research Publications"
                        />
                        <DefultInput
                            label="Citations"
                            name="citations"
                            type="number"
                            value={data.citations}
                            onChange={handleInputChange}
                            placeholder="Citations"
                        />
                        <DefultInput
                            label="Research Ranking"
                            name="research_ranking"
                            type="number"
                            value={data.research_ranking}
                            onChange={handleInputChange}
                            placeholder="Research Ranking"
                        />
                        <DefultInput
                            label="Researchers in Top 2% (2023)"
                            name="number_of_researchers_top2_percent"
                            type="number"
                            value={data.number_of_researchers_top2_percent}
                            onChange={handleInputChange}
                            placeholder="Researchers in Top 2% (2023)"
                        />
                        <DefultInput
                            label="Annual Research Conferences"
                            name="annual_research_conferences"
                            type="number"
                            value={data.annual_research_conferences}
                            onChange={handleInputChange}
                            placeholder="Annual Research Conferences"
                        />
                        <DefultInput
                            label="Annual Research Collaborations"
                            name="annual_research_collaborations"
                            type="number"
                            value={data.annual_research_collaborations}
                            onChange={handleInputChange}
                            placeholder="Annual Research Collaboration"
                        />
                        <DefultInput
                            label="Research Awards and Recognitions"
                            name="research_awards_and_recognitions"
                            type="number"
                            value={data.research_awards_and_recognitions}
                            onChange={handleInputChange}
                            placeholder="Research Awards and Recognitions"
                        />
                        <DefultInput
                            label="Annual Workshops/Seminars"
                            name="annual_workshops_seminars"
                            type="number"
                            value={data.annual_workshops_seminars}
                            onChange={handleInputChange}
                            placeholder="Annual Workshops/Seminars"
                        />
                        <DefultInput
                            label="Capital Grants for Research"
                            name="capital_grants_for_research"
                            type="number"
                            step="0.01"
                            value={data.capital_grants_for_research}
                            onChange={handleInputChange}
                            placeholder="Capital Grants for Research"
                        />

                        <div className="col-span-full flex justify-end">
                            <Defaultbtn type="submit" btnvalue="Add Research Stats" />
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        useEffect(() => {
            localStorage.clear();
            window.location.reload();
        }, []);
        return null;
    }
};

export default CreateResearchStats;
