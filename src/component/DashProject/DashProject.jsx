import { useState, useEffect } from 'react'
import DashModel from '../DashModel/DashModel'
import NewModelModal from '../NewModelModal/NewModelModal'
import DeleteProjectModal from '../DeleteProjectModal/DeleteProjectModal'
import { useSelector } from 'react-redux'


const DashProject = ({ projectId, projectName }) => {

    const [isActiveDrobdown, setIsActiveDrobdown] = useState(false)
    const [userProjectModels, setUserProjectModels] = useState(null)
    const { userModels } = useSelector((state) => state.allModels)

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
            <div className={isActiveDrobdown ? "projectContainer active" : "projectContainer"} onClick={handelActiveDrobdown}>
                <div className="flex items-center justify-start gap-1">
                    <DeleteProjectModal projectId={projectId} projectName={projectName} />
                    <span className="projectName">{projectName}</span>
                </div>
                <span className="arrow" >{isActiveDrobdown ? '-' : '+'}</span>
            </div>

            <div className={isActiveDrobdown ? "drobDown active" : "drobDown"}>
                <ul className="models">
                    {
                        userProjectModels && userProjectModels.length > 0 ?
                            userProjectModels.map(item =>
                                <DashModel key={item.id} to={`/account/dashboard/${projectName}/${item.modelname}`} modelName={item.modelname} />
                            )
                            : userProjectModels && userProjectModels.length === 0 ? // Corrected condition
                                <div className="text-gray-300 text-xs">No models found for this project.</div>

                                : <div className="loading">loading ...</div>
                    }
                </ul>
                <NewModelModal projectName={projectName} projectId={projectId} userProjectModels={userProjectModels} />
            </div>
        </li>
    )
}

export default DashProject