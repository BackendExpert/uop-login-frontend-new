import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const ResearchStats = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
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
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch data by ID
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/research.php`, {
            params: { action: "getResearchStatsById", id }
        })
            .then(res => {
                if (res.data.Status === "Success") {
                    setFormData(res.data.Result)
                } else {
                    setError("Not found")
                }
                setLoading(false)
            })
            .catch(() => {
                setError("Error fetching data")
                setLoading(false)
            })
    }, [id])

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    // Submit update
    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = new FormData()
        postData.append('action', 'updateResearchStats')
        postData.append('id', id)
        for (let key in formData) {
            postData.append(key, formData[key])
        }

        axios.post(`${import.meta.env.VITE_APP_API}/research.php`, postData)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Research stats updated successfully!")
                    navigate("/Dashboard/ResearchHighlights")
                } else {
                    alert(res.data.error || "Update failed")
                }
            })
            .catch(() => alert("Error updating data"))
    }

    if (loading) return <div className="p-4">Loading...</div>
    if (error) return <div className="p-4 text-red-500">{error}</div>

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded mt-8">
            <h1 className="text-2xl font-bold mb-4">
                Update Research Stats for Year {formData.year}
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(formData).map((field, index) => (
                    <div key={index}>
                        <label className="block text-sm font-medium capitalize mb-1">
                            {field.replace(/_/g, ' ')}
                        </label>
                        <input
                            type={field === 'capital_grants_for_research' ? "number" : "number"}
                            step={field === 'capital_grants_for_research' ? "0.01" : "1"}
                            name={field}
                            value={formData[field] || ''}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                            required={field === 'year'}
                        />
                    </div>
                ))}
                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResearchStats
