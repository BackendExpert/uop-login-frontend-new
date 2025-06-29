import React from 'react'
import { useParams } from 'react-router-dom'

const ResearchStats = () => {
    const {id} = useParams()
    return (
        <div>ResearchStats {id}</div>
    )
}

export default ResearchStats