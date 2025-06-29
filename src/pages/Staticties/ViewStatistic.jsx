import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ViewStatistic = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        countData: '',
        visibale: 0
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch statistic by ID
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_APP_API}/statistics.php`, {
            params: { action: 'getStatisticById', id }
        })
            .then(res => {
                if (res.data.Status === 'Success') {
                    setFormData(res.data.Result)
                } else {
                    setError('Statistic not found')
                }
                setLoading(false)
            })
            .catch(() => {
                setError('Error fetching statistic')
                setLoading(false)
            })
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = new FormData()
        postData.append('action', 'updateStatistic')
        postData.append('id', id)
        postData.append('title', formData.title)
        postData.append('countData', formData.countData)
        postData.append('visibale', formData.visibale)

        axios.post(`${import.meta.env.VITE_APP_API}/statistics.php`, postData)
            .then(res => {
                if (res.data.Status === 'Success') {
                    alert('Statistic updated successfully!')
                    navigate('/Dashboard/Statistics') // adjust as needed
                } else {
                    alert(res.data.error || 'Update failed')
                }
            })
            .catch(() => alert('Error updating statistic'))
    }

    if (loading) return <div className="p-4">Loading...</div>
    if (error) return <div className="p-4 text-red-600">{error}</div>

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-8">
            <h1 className="text-2xl font-bold mb-4">Update Statistic (ID: {id})</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        required
                        maxLength={45}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Count Data</label>
                    <input
                        type="text"
                        name="countData"
                        value={formData.countData}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                        required
                        maxLength={45}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Visible</label>
                    <select
                        name="visibale"
                        value={formData.visibale}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
                    >
                        <option value={0}>Hidden</option>
                        <option value={1}>Visible</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default ViewStatistic
