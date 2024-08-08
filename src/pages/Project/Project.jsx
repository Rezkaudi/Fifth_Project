import { Outlet } from 'react-router-dom'
import './Project.css'
import ProjectSidebar from '../../component/ProjectSidebar/ProjectSidebar'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import NewModelModal from "../../component/NewModelModal/NewModelModal"
import ModelsTable from '../../component/ModelsTable/ModelsTable'

const Project = () => {
    const location = useLocation()
    const { projectName } = useParams()

    useEffect(() => {
        console.log(location.pathname);
    }, [location])

    return (
        <div className='projectDash'>
            <ProjectSidebar />
            <div className="default">
                {location.pathname === `/account/${projectName}` ?
                    <div className='px-5'>
                        <header className='modelHeader  mb-10'>
                            <div className="left">
                                <span className="modelName">{"All Models"}</span>
                                {/* <div className="path">{path}</div> */}
                            </div>
                            <div className="right">
                                <NewModelModal projectName={projectName} />
                            </div>
                        </header>
                        <ModelsTable projectName={projectName} />
                    </div> :
                    <Outlet />
                }
            </div>
        </div>
    )
}

export default Project 