import './Model.css'
import { useParams } from 'react-router-dom'

const Model = () => {
    const { model } = useParams()
    return (
        <div>{model}</div>
    )
}

export default Model