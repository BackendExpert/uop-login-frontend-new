import React, { useEffect, useState } from 'react';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import axios from 'axios';

const Rankings = () => {
    const [rankings, setRankings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch rankings from backend
    useEffect(() => {
        const fetchRankings = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_APP_API}/rankings.php?action=getallrankings`
                );
                if (res.data.Status === 'Success') {
                    setRankings(res.data.Result);
                } else {
                    setError('Failed to fetch rankings');
                }
            } catch (err) {
                setError('Error fetching rankings');
            } finally {
                setLoading(false);
            }
        };
        fetchRankings();
    }, []);

    const formatRank = (island, asian, world) => {
        return `${island || '-'} / ${asian || '-'} / ${world || '-'}`;
    };

    return (
        <div className="mt-6 px-4 max-w-7xl mx-auto font-sans">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#560606] rounded-full shadow-md">
                    <BsJournalBookmarkFill className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-[#560606] uppercase">
                    University Rankings
                </h1>
            </div>

            {/* Create Rankings Button */}
            <div className="mb-6">
                <a href="/Dashboard/CreateRankings">
                    <button className="bg-gradient-to-r from-[#ff7e60] to-[#ffc27c] text-white px-6 py-2 rounded shadow hover:scale-105 transition-transform duration-300">
                        ➕ Create Rankings
                    </button>
                </a>
            </div>

            {/* Loading/Error */}
            {loading && (
                <p className="text-center text-gray-500">Loading rankings...</p>
            )}
            {error && <p className="text-center text-red-500">{error}</p>}

            {/* Rankings Table */}
            {!loading && !error && rankings.length === 0 && (
                <p className="text-center text-gray-600">No rankings found.</p>
            )}

            {!loading && !error && rankings.length > 0 && (
                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-600 font-semibold text-left">
                            <tr>
                                <th className="px-4 py-3">Year</th>
                                <th className="px-4 py-3">THE University</th>
                                <th className="px-4 py-3">THE Impact</th>
                                <th className="px-4 py-3">U.S. News</th>
                                <th className="px-4 py-3">QS</th>
                                <th className="px-4 py-3">Webometrics</th>
                                <th className="px-4 py-3">UI GreenMetric</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rankings.map((r) => (
                                <tr key={r.id} className="hover:bg-orange-50 transition">
                                    <td className="px-4 py-3 font-semibold text-gray-700">{r.year || '-'}</td>
                                    <td className="px-4 py-3">{formatRank(r.theur_islandrank, r.theur_asianrank, r.theur_worldrank)}</td>
                                    <td className="px-4 py-3">{formatRank(r.their_islandrank, r.their_asianrank, r.their_worldrank)}</td>
                                    <td className="px-4 py-3">{formatRank(r.usnw_islandrank, r.usnw_asianrank, r.usnw_worldrank)}</td>
                                    <td className="px-4 py-3">{formatRank(r.qsur_islandrank, r.qsur_asianrank, r.qsur_worldrank)}</td>
                                    <td className="px-4 py-3">{formatRank(r.wrwu_islandrank, r.wrwu_asianrank, r.wrwu_worldrank)}</td>
                                    <td className="px-4 py-3">{formatRank(r.uig_islandrank, r.uig_asianrank, r.uig_worldrank)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Rankings;
