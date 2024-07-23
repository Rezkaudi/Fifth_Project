import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const DashModel = ({ to, modelName }) => {

    const [isActiveModel, setIsActiveModel] = useState(false)
    const location = useLocation()

    const handleActiveModel = () => {

        if (location.pathname.includes(to)) {

            setIsActiveModel(true)
        }
        else {
            setIsActiveModel(false)
        }
    }

    // useEffect(() => {
    //     handleActiveModel()
    // }, [])

    return (
        <li className={isActiveModel ? "model active" : "model"} onClick={handleActiveModel}>
            <Link to={to}>{modelName}</Link>
        </li>
    )
}

export default DashModel