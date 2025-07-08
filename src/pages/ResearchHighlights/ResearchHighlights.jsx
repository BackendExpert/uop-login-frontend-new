import React, { useEffect, useState } from 'react';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResearchHighlights = () => {
    const [highlights, setHighlights] = useState([]);
    const [filteredHighlights, setFilteredHighlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_API + '/research.php', {
            params: { action: "getResearchHeightlight" }
        })
            .then(res => {
                if (res.data.Status === "Success") {
                    setHighlights(res.data.Result);
                    setFilteredHighlights(res.data.Result);
                } else {
                    setHighlights([]);
                    setFilteredHighlights([]);
                    setError("No research highlights found");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching research highlights");
                setLoading(false);
            });
    }, []);

    // Extract unique years for dropdown options
    const uniqueYears = React.useMemo(() => {
        const yearsSet = new Set(highlights.map(h => h.year));
        return Array.from(yearsSet).sort((a, b) => b.localeCompare(a)); // descending order
    }, [highlights]);

    // Handle year filter change
    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);

        if (year === 'all') {
            setFilteredHighlights(highlights);
        } else {
            setFilteredHighlights(highlights.filter(item => item.year === year));
        }
    };

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

            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <a href="/Dashboard/CreateResearchStats">
                    <button className='bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] px-8 py-2 text-white rounded duration-500'>
                        Create New Highlight
                    </button>
                </a>

                <div>
                    <label htmlFor="yearFilter" className="mr-2 font-semibold text-gray-700">Filter by Year:</label>
                    <select
                        id="yearFilter"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="border rounded px-3 py-1"
                    >
                        <option value="all">All</option>
                        {uniqueYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            <table className='w-full bg-white mt-4'>
                <thead>
                    <tr className='h-12 text-gray-500 border-b border-gray-200'>
                        <th>Year</th>
                        <th>Column Title</th>
                        <th>Data Column</th>
                        <th>Active</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr>
                    ) : error ? (
                        <tr><td colSpan="5" className="text-center py-4 text-red-500">{error}</td></tr>
                    ) : filteredHighlights.length === 0 ? (
                        <tr><td colSpan="5" className="text-center py-4">No research highlights available</td></tr>
                    ) : (
                        filteredHighlights.map((item, index) => (
                            <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                <td className='border px-3 py-2'>{item.year}</td>
                                <td className='border px-3 py-2'>{item.column_title}</td>
                                <td className='border px-3 py-2'>{item.data_column}</td>
                                <td className='border px-3 py-2'>{item.is_active ? "Yes" : "No"}</td>
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
