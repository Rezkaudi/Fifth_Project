import { useEffect } from 'react'
import Sidbar from '../../component/Sidbar/Sidbar'
import './Account.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getUserData } from '../../features/user/handleRequests'
import { getAllUserProjects } from '../../features/allProjects/handleRequests'
import { getAllUserModels } from '../../features/allModels/handleRequests'
import { getUserTokens } from '../../features/user/handleRequests'
const Account = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllUserModels());
                await dispatch(getUserData());
                await dispatch(getAllUserProjects());
                await dispatch(getUserTokens())
                console.log("all");
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Handle the error appropriately, maybe show a notification or update the state to reflect the error
            }
        };
    
        fetchData();
    }, [dispatch]);
    return (
        <div className="account">
            <Sidbar />
            <Outlet />
        </div>
    )
}

export default Account