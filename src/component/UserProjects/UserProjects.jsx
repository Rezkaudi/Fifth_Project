import { useState, useEffect } from 'react'

import { SideBarModel } from '../SideBarItems/SideBarItems'
import { useSelector } from 'react-redux'

const UserProjects = ({ id, projectName }) => {


    const [activeProject, setActiveProject] = useState()
    const [userProjectModels, setUserProjectModels] = useState(null)
    const { userModels } = useSelector((state) => state.allModels)

    let handleActiveProject = () => {
        setActiveProject(pre => !pre)
    }



    useEffect(() => {
        const getAllProjectModels = (projectid) => {
            let projectModels = userModels?.filter((item) => {
                return item.project === projectid;
            });
            return projectModels
        }
        setUserProjectModels(getAllProjectModels(id))
    }, [id, userModels])

    return (
        <li className="project">
            <div className={activeProject ? 'projectContainer active' : 'projectContainer'} onClick={handleActiveProject}>
                <span className='projectName'>{projectName}</span>
                <span className="arrow">{activeProject ? '-' : '+'}</span>
            </div>
            <ul className={activeProject ? 'dropDown active' : 'dropDown'}>
                {
                    userModels && userProjectModels && userProjectModels.length > 0 ?
                        userProjectModels.map(item =>
                            <SideBarModel key={item.id} to={`/account/${projectName}/${item.modelname}`} modelName={item.modelname} />
                        )
                        : userModels && userProjectModels && userProjectModels.length === 0 ? // Corrected condition
                            <div className="text-gray-600 text-sm">No models found for this project.</div>

                            : <div className="loading">loading ...</div>
                }
            </ul>
        </li>
    )
}

export default UserProjects