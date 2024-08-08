
import './DashSidebar.css'
import { useState } from 'react'

import Search from '../../assets/images/icon _search.svg'
import DashProject from '../DashProject/DashProject'
import NewProjectModal from '../NewProjectModal/NewProjectModal'
import { useSelector } from 'react-redux'

const DashSidebar = () => {
    const { userProjects } = useSelector((state) => state.allProjects);
    const [activeSearch, setActiveSearch] = useState(false)

    const handelActiceSearch = () => {
        setActiveSearch(pre => !pre)
    }
    return (
        <aside className='dashSidebar active'>
            <div className="projectsTop">
                <span>Projects</span>
                <i className='search'>
                        <img src={Search} alt="Search" onClick={handelActiceSearch} />
                        <input className={activeSearch ? "activeSearch" : ""} type="search" />
                    </i>
            </div>

            <ul className="projects">
                {
                    userProjects && userProjects.length > 0 ?
                        userProjects.map(item =>
                            <DashProject key={item.id} projectId={item.id} projectName={item.name} />
                        )
                        : userProjects && userProjects.length === 0 ? // Corrected condition
                            <div className="text-gray-200 text-sm">
                                No models found for this project.
                            </div>
                            : <div className="loading">loading ...</div>
                }
            </ul>
            <NewProjectModal />
        </aside>
    )
}

export default DashSidebar