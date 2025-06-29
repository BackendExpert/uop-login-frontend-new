import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateStatistics = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        countData: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        if (!formData.title.trim() || !formData.countData.trim()) {
            setError('Title and Count Data are required.')
            setLoading(false)
            return
        }

        try {
            const postData = new FormData()
            postData.append('action', 'createStatistic')
            postData.append('title', formData.title)
            postData.append('countData', formData.countData)

            const response = await axios.post(`${import.meta.env.VITE_APP_API}/statistics.php`, postData)

            if (response.data.Status === 'Success') {
                alert('Statistic created successfully!')
                navigate('/Dashboard/Statistics')
            } else {
                setError(response.data.error || 'Failed to create statistic.')
            }
        } catch (err) {
            setError('Error creating statistic.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded shadow mt-8">
            <h1 className="text-xl font-bold mb-4">Create New Statistic</h1>
            {error && <p className="mb-4 text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium" htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        required
                        maxLength={45}
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium" htmlFor="countData">Count Data</label>
                    <input
                        id="countData"
                        name="countData"
                        type="text"
                        value={formData.countData}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
                        required
                        maxLength={45}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                >
                    {loading ? 'Creating...' : 'Create Statistic'}
                </button>
            </form>
        </div>
    )
}

export default CreateStatistics
