import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import './SideBarItems.css'


const SideBarModel = ({ to, modelName }) => {

    // const [activeDelModel, setActiveDelModel] = useState(false)
    const [activeModel, setActiveModel] = useState(false)
    const location = useLocation()


    let handleActiveModel = () => {
        if (location.pathname.includes(to)) {
            setActiveModel(true)
        }
        else {
            setActiveModel(false)
        }
    }

    useEffect(() => {
        handleActiveModel()
    }, [location, activeModel,modelName])

    return (
        <li className={activeModel ? "model active" : "model"}>
            <Link to={to} onClick={handleActiveModel}>{modelName}</Link>
            {/* <i className='trash' onClick={() => { handleActiveDelModel(modelName) }}></i> */}
        </li>
    )
}

const SideBarItem = ({ to, itemName, icon }) => {

    const [activeItem, setActiveItem] = useState(false)
    const location = useLocation()


    let handleActiveItem = () => {
        if (location.pathname.includes(to)) {
            setActiveItem(true)
        }
        else {
            setActiveItem(false)
        }
    }

    useEffect(() => {
        handleActiveItem()
    }, [location, activeItem])

    return (
        <li className={activeItem ? "active" : ""}>
            <i><img src={icon} alt={itemName} /></i>
            <Link onClick={handleActiveItem} to={to}>{itemName}</Link>
        </li>
    )
}

const DashSideBarModel = ({ to, modelName }) => {

    const [activeDelModel, setActiveDelModel] = useState(false)
    const [activeModel, setActiveModel] = useState(false)
    const location = useLocation()


    let handleActiveModel = () => {
        if (location.pathname.includes(to)) {
            setActiveModel(true)
        }
        else {
            setActiveModel(false)
        }
    }

    const handleActiveDelModel=()=>{
        console.log("del");
    }
    useEffect(() => {
        handleActiveModel()
    }, [location, activeModel])

    return (
        <li className={activeModel ? "model active" : "model"} onClick={handleActiveModel}>
            <Link to={to}>{modelName}</Link>
            <i className='trash' onClick={() => { handleActiveDelModel(modelName) }}></i>
        </li>
    )
}



export { SideBarModel, SideBarItem, DashSideBarModel }