
import './ProjectSidebar.css'

import Search from '../../assets/images/icon _search.svg'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectModels } from '../../features/allProjects/handleRequests'
import PrimaryLoading from '../PrimaryLoading/PrimaryLoading'
import { SideBarModel } from '../SideBarItems/SideBarItems'
import { Link } from 'react-router-dom'

const ProjectSidebar = () => {
    const dispatch = useDispatch()
    const { userProjects, userProjectModels } = useSelector((state) => state.allProjects);
    const [activeSearch, setActiveSearch] = useState(false)
    const [projectId, setProjectId] = useState(null)
    const { projectName } = useParams()
    const [activeSideBare, setActiveSideBare] = useState(true)

    useEffect(() => {
        const getProjectId = (projectName) => {
            let pId = userProjects?.find((item) => {
                return item.name === projectName;
            });
            let pi = pId?.id
            return pi
        }
        setProjectId(getProjectId(projectName))
    }, [projectName, userProjects])

    useEffect(() => {
        if (projectId) {
            dispatch(getProjectModels(projectId))
        }
    }, [projectId, dispatch])

    const handelActiceSearch = () => {
        setActiveSearch(pre => !pre)
    }

    let handleActiveSideBare = () => {
        setActiveSideBare(pre => !pre)
    }

    return (
        <>
            <aside className={activeSideBare ? "ProjectSidebar active" : "ProjectSidebar unActive"}>
                <div className="projectsTop">
                    <Link className='z-10' to={`/account/${projectName}`}>
                        <span> &#x25c0; Models</span>
                    </Link>
                    <i className='search'>
                        <img src={Search} alt="Search" onClick={handelActiceSearch} />
                        <input className={activeSearch ? "activeSearch" : ""} type="search" />
                    </i>
                </div>

                <ul className="projects">
                    {
                        userProjectModels && userProjectModels.length > 0 ?
                            userProjectModels.map(item =>
                                <SideBarModel key={item.id} to={`/account/${projectName}/${item.modelname}`} modelName={item.modelname} />
                            )
                            : userProjectModels && userProjectModels.length === 0 ? // Corrected condition
                                <div className="text-gray-200 text-sm">
                                    No models found for this project.
                                </div>
                                : <PrimaryLoading />
                    }
                </ul>
            </aside>
            <div className={activeSideBare ? "menuBtn active" : "menuBtn unActive"} onClick={handleActiveSideBare}>
                <span>+</span>
            </div>
        </>
    )
}

export default ProjectSidebar