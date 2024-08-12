import { Link, useLocation } from 'react-router-dom'

const DashModel = ({ to, modelName }) => {

    // const [isActiveModel, setIsActiveModel] = useState(false)
    const location = useLocation()

    // const handleActiveModel = () => {

    //     if (location.pathname === to) {
    //         setIsActiveModel(true)
    //     }
    //     else {
    //         setIsActiveModel(false)
    //     }
    // }

    // useEffect(() => {
    //     handleActiveModel()
    // }, [])

    return (
        <li className={location.pathname === to ? "model active" : "model"}>
            <Link to={to}>{modelName}</Link>
        </li>
    )
}

export default DashModel