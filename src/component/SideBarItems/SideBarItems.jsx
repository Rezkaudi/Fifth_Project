import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState,useCallback } from 'react'
import { isActiveLink } from '../../utils'
import './SideBarItems.css'


const SideBarModel = ({ to, modelName }) => {

    const location = useLocation()

    return (
        <li title={modelName} className={isActiveLink(location,to) ? "model active overflow-hidden" : "model overflow-hidden"}>
            <Link className='truncate overflow-hidden' to={to}>{modelName}</Link>
        </li>
    )
}

const SideBarItem = ({ to, itemName, icon }) => {

    const [activeItem, setActiveItem] = useState(false)
    const location = useLocation()


    const handleActiveItem = useCallback(() => {
        if (location.pathname.includes(to)) {
            setActiveItem(true);
        } else {
            setActiveItem(false);
        }
    }, [location, to]); 

    useEffect(() => {
        handleActiveItem()
    }, [handleActiveItem])

    return (
        <li className={activeItem ? "active" : ""}>
            <i><img src={icon} alt={itemName} /></i>
            <Link className='' onClick={handleActiveItem} to={to}>{itemName}</Link>
        </li>
    )
}

const DashSideBarModel = ({ to, modelName }) => {

    const [activeModel, setActiveModel] = useState(false)
    const location = useLocation()


    const handleActiveModel = useCallback(() => {
        if (location.pathname.includes(to)) {
            setActiveModel(true);
        } else {
            setActiveModel(false);
        }
    }, [location, to]);

    const handleActiveDelModel=()=>{
        console.log("del");
    }
    useEffect(() => {
        handleActiveModel()
    }, [handleActiveModel])

    return (
        <li className={activeModel ? "model active" : "model"} onClick={handleActiveModel}>
            <Link to={to}>{modelName}</Link>
            <i className='trash' onClick={() => { handleActiveDelModel(modelName) }}></i>
        </li>
    )
}



export { SideBarModel, SideBarItem, DashSideBarModel }