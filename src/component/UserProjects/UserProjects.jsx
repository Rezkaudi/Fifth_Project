import { Link, useLocation } from 'react-router-dom'
import { isActiveLink } from '../../utils';

const UserProjects = ({projectName }) => {

    const location = useLocation(); 

    // useEffect(() => {
    //     const getAllProjectModels = (projectid) => {
    //         let projectModels = userModels?.filter((item) => {
    //             return item.project === projectid;
    //         });
    //         return projectModels
    //     }
    //     setUserProjectModels(getAllProjectModels(id))
    // }, [id, userModels])

    return (
        <li className="project">
            <div title={projectName} className={isActiveLink(location,`/account/${projectName}`) ? 'projectContainer active' : 'projectContainer'}>
                <Link className='truncate' to={`/account/${projectName}`} >{projectName}</Link>
            </div>
        </li>
    )
}

export default UserProjects