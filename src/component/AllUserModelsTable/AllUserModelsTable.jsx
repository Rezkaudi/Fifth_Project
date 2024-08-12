import './AllUserModelsTable.css'
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"
import { Link } from "react-router-dom";
import Eye from "../../assets/images/icon _eye.svg"

const AllUserModelsTable = ({userModels,userProjects}) => {

    const getProjectNamePyId = (id) => {
        const projectName = userProjects?.find(item => item.id === id)
        return projectName.name
    }

    return (
        <div className="AllUserModelsTable">
            <div className="tableContainer">
                {userModels && userProjects ?
                    <table>
                        <thead>
                            <tr>
                                <th scope="col" className="relative px-2 py-1 border-r border-c2">
                                    <span className="sr-only">index</span>
                                </th>
                                <th scope="col" className="col">
                                    Model ID
                                </th>
                                <th scope="col" className="col">
                                    Model Name
                                </th>
                                <th scope="col" className="col">
                                    project Name
                                </th>
                                <th scope="col" className="relative px-6 py-1">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userModels?.length === 0 ?
                                <tr>
                                    <td colSpan={4} className="cell text-center">no models</td>
                                </tr>
                                : userModels?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="cursor-pointer index">
                                            <Link className="w-full h-full inline-block" to={`/account/${item.modelname}`}>
                                                {index + 1}
                                            </Link>
                                        </td>

                                        <td className="cursor-pointer cell max-w-20 truncate">
                                            <Link className="w-full h-full inline-block" to={`/account/schema/${item.modelname}`}>
                                                <span>{item.id}</span>
                                            </Link>
                                        </td>
                                        <td className="cursor-pointer cell max-w-20 truncate">
                                            <Link className="w-full h-full inline-block" to={`/account/schema/${item.modelname}`}>
                                                <span>{item.modelname}</span>
                                            </Link>
                                        </td>
                                        <td className="cursor-pointer cell max-w-20 truncate">
                                            <Link className="w-full h-full inline-block" to={`/account/schema/${item.modelname}`}>
                                                <span>{getProjectNamePyId(item.project)}</span>
                                            </Link>
                                        </td>
                                        <td className="cell w-20">
                                            <Link to={`/account/schema/${item.modelname}`}>
                                                <button className='tableBtn' title="show data">
                                                    <img src={Eye} alt="show data" />
                                                </button>
                                            </Link>
                                        </td>


                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    : <PrimaryLoading />
                }
            </div>

        </div>
    );
};

export default AllUserModelsTable;