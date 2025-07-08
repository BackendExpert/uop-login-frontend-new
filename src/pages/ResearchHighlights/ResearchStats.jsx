import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const ResearchStats = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        year: '',
        column_title: '',
        data_column: '',
        is_active: 1,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch data by ID
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/research.php`, {
            params: { action: "getResearchHeightlightById", id }
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
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
        }))
    }

    // Submit update
    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = new FormData()
        postData.append('action', 'updateResearchHeightlight')
        postData.append('id', id)
        for (let key in formData) {
            postData.append(key, formData[key])
        }

        axios.post(`${import.meta.env.VITE_APP_API}/research.php`, postData)
            .then(res => {
                if (res.data.Status === "Success") {
                    alert("Research highlight updated successfully!")
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
                Update Research Highlight for Year {formData.year}
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium capitalize mb-1">
                        Year *
                    </label>
                    <input
                        type="text"
                        name="year"
                        value={formData.year ?? ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium capitalize mb-1">
                        Column Title *
                    </label>
                    <input
                        type="text"
                        name="column_title"
                        value={formData.column_title ?? ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium capitalize mb-1">
                        Data Column *
                    </label>
                    <input
                        type="text"
                        name="data_column"
                        value={formData.data_column ?? ''}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={!!formData.is_active}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label htmlFor="is_active" className="select-none">Is Active</label>
                </div>

                <div className="md:col-span-2 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResearchStats
