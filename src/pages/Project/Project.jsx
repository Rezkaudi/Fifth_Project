import { Outlet } from 'react-router-dom'
import './Project.css'
import ProjectSidebar from '../../component/ProjectSidebar/ProjectSidebar'
import { useLocation, useParams } from 'react-router-dom'
import NewModelModal from "../../component/NewModelModal/NewModelModal"
import ModelsTable from '../../component/ModelsTable/ModelsTable'

const Project = () => {
    const location = useLocation()
    const { projectName } = useParams()

    return (
        <div className='projectDash'>
            <ProjectSidebar />
            <div className="default">
                {location.pathname === `/account/${projectName}` ?
                    <div className='px-2 lg:px-5 pt-4'>
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