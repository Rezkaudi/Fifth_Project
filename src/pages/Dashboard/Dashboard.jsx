import './Dashboard.css'
import AllUserModelsTable from '../../component/AllUserModelsTable/AllUserModelsTable'
import { useLocation, Outlet } from 'react-router-dom'
import {useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterModelsByProjectName } from '../../features/allModels/allModelsSlice'

const Dashboard = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const { filteredUserModels } = useSelector((state) => state.allModels);
    const { userProjects } = useSelector((state) => state.allProjects);
    const [selectedProject, setSelectedProject] = useState('all');

    useEffect(()=>{
        dispatch(filterModelsByProjectName(selectedProject))
    },[dispatch,selectedProject])

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        console.log(event.target.value);
        dispatch(filterModelsByProjectName(event.target.value))

    };


    return (

        <div className="dasboard">
            {location.pathname === `/account/schema` ?
                <div className='px-2 lg:px-5 w-full overflow-x-hidden pt-4'>
                    <header className='modelHeader'>
                        <div className="left">
                            <span className="modelName">{"All Projects"}</span>
                        </div>
                        <div className="right">
                            <select className='outline-none bg-c5 w-32 border-2 overflow-hidden border-c2 rounded p-1 ' name="projectName" id="projectName" value={selectedProject} onChange={handleProjectChange}>
                                <option value={"all"}>All</option>
                                {userProjects?.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </header>
                    <AllUserModelsTable userModels={filteredUserModels} userProjects={userProjects} />
                </div> :
                <Outlet />
            }

        </div>

    )
}

export default Dashboard