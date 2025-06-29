import React, { useEffect, useState } from 'react';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResearchHighlights = () => {
    const [highlights, setHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/research.php', {
            params: { action: "getResearchStats" }
        })
            .then(res => {
                if (res.data.Status === "Success") {
                    setHighlights(res.data.Result);
                } else {
                    setHighlights([]);
                    setError("No research highlights found");
                }
                setLoading(false);
            })
            .catch(err => {
                setError("Error fetching research highlights");
                setLoading(false);
            });
    }, []);

    const handleView = (id) => {
        navigate(`/Dashboard/ResearchStats/${id}`);
    };

    return (
        <div className='mt-4'>
            <div className="flex">
                <div>
                    <div className="inline-block p-2 bg-[#560606] rounded">
                        <BsJournalBookmarkFill className='h-6 w-auto fill-white' />
                    </div>
                </div>
                <div className="pl-4">
                    <h1 className="text-[#560606] text-xl pt-1 font-semibold uppercase">Research Highlights</h1>
                </div>
            </div>

            <div className="mt-4">
                <a href="/Dashboard/CreateResearchStats">
                    <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                        Create New Highlights
                    </button>
                </a>
            </div>

            <table className='w-full bg-white mt-4'>
                <thead>
                    <tr className='h-12 text-gray-500 border-b border-gray-200'>
                        <th>Year</th>
                        <th>Research Journals</th>
                        <th>Research Publications</th>
                        <th>Citations</th>
                        <th>Research Ranking</th>
                        <th>Top 2% Researchers</th>
                        <th>Annual Conferences</th>
                        <th>Collaborations</th>
                        <th>Awards & Recognitions</th>
                        <th>Workshops/Seminars</th>
                        <th>Capital Grants</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="12" className="text-center py-4">Loading...</td></tr>
                    ) : error ? (
                        <tr><td colSpan="12" className="text-center py-4 text-red-500">{error}</td></tr>
                    ) : highlights.length === 0 ? (
                        <tr><td colSpan="12" className="text-center py-4">No research highlights available</td></tr>
                    ) : (
                        highlights.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className='border px-3 py-2'>{item.year}</td>
                                <td className='border px-3 py-2'>{item.research_journals}</td>
                                <td className='border px-3 py-2'>{item.research_publications}</td>
                                <td className='border px-3 py-2'>{item.citations}</td>
                                <td className='border px-3 py-2'>{item.research_ranking}</td>
                                <td className='border px-3 py-2'>{item.number_of_researchers_top2_percent}</td>
                                <td className='border px-3 py-2'>{item.annual_research_conferences}</td>
                                <td className='border px-3 py-2'>{item.annual_research_collaborations}</td>
                                <td className='border px-3 py-2'>{item.research_awards_and_recognitions}</td>
                                <td className='border px-3 py-2'>{item.annual_workshops_seminars}</td>
                                <td className='border px-3 py-2'>{item.capital_grants_for_research}</td>
                                <td className='border px-3 py-2'>
                                    <button
                                        onClick={() => handleView(item.id)}
                                        className='bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 duration-300'
                                    >
                                        View
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

export default ResearchHighlights;
