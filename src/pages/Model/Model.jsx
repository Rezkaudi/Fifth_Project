import { useEffect } from 'react'
import './Model.css'
import { useParams, useLocation } from 'react-router-dom'

const Model = () => {
    // const { model } = useParams()
    const location = useLocation()

    var model = location.pathname
    model=model.replace("/account/models/","")

    
    useEffect(() => {
        console.log(model);
        
    }, [])

    return (
        <div>{model}</div>
    )
}

export default Model