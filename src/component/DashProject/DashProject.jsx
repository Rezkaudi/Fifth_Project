import { useState, useEffect } from 'react'
import DashModel from '../DashModel/DashModel'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const DashProject = ({ projectId, projectName }) => {

    const [isActiveDrobdown, setIsActiveDrobdown] = useState(false)
    const [userProjectModels, setUserProjectModels] = useState(null)
    const { userModels } = useSelector((state) => state.allModels)
    const location = useLocation()

    const handelActiveDrobdown = () => {
        setIsActiveDrobdown(pre => !pre)
    }

    useEffect(() => {
        const getAllProjectModels = (projectid) => {
            let projectModels = userModels?.filter((item) => {
                return item.project === projectid;
            });
            return projectModels
        }
        setUserProjectModels(getAllProjectModels(projectId))
    }, [projectId, userModels])

    return (
        <li className="project">

            <div className={location.pathname.includes(`/account/${projectName}`) ? "projectContainer1 active" : "projectContainer1"}>
                <Link style={{ padding: 0 }} to={`/account/${projectName}`}>
                    <div className="flex items-center justify-start gap-1 whitespace-nowrap">
                        <span className="projectName">{projectName}</span>
                    </div>
                </Link>
                <span onClick={handelActiveDrobdown} className="arrow" >{isActiveDrobdown ? '-' : '+'}</span>
            </div>

            <div className={isActiveDrobdown ? "drobDown active" : "drobDown"}>
                <ul className="models">
                    {
                        userProjectModels && userProjectModels.length > 0 ?
                            userProjectModels.map(item =>
                                <DashModel key={item.id} to={`/account/${projectName}/${item.modelname}`} modelName={item.modelname} />
                            )
                            : userProjectModels && userProjectModels.length === 0 ? // Corrected condition
                                <div className="text-gray-300 text-xs">No models found for this project.</div>

                                : <div className="loading">loading ...</div>
                    }
                </ul>
            </div>
        </li>
    )
}

export default DashProject