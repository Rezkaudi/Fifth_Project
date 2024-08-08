import { useEffect } from 'react'
import Sidbar from '../../component/Sidbar/Sidbar'
import './Account.css'
import NewProjectModal from "../../component/NewProjectModal/NewProjectModal"
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ProjectsTable from '../../component/ProjectsTable/ProjectsTable'
import { getUserData } from '../../features/user/handleRequests'
import { getAllUserProjects } from '../../features/allProjects/handleRequests'
import { getAllUserModels } from '../../features/allModels/handleRequests'
import { getUserTokens } from '../../features/user/handleRequests'
import { useLocation } from 'react-router-dom'
const Account = () => {
    const dispatch = useDispatch()
    const location = useLocation()

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


    useEffect(() => {
        console.log(location.pathname);
    }, [location])
    
    return (
        <div className="account">
            <Sidbar />
            <div className="bg-c4 rounded flex-1 h-full">
                {location.pathname === "/account" ?
                    <div className='px-5'>
                        <header className='modelHeader '>
                            <div className="left">
                                <span className="modelName">{"All Projects"}</span>
                                {/* <div className="path">{path}</div> */}
                            </div>
                            <div className="right ">
                                <NewProjectModal />
                            </div>
                        </header>
                        <ProjectsTable />
                    </div> :
                    <Outlet />
                }

            </div>
        </div>
    )
}

export default Account