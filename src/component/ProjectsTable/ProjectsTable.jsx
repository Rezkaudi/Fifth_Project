import './ProjectsTable.css'
import DeleteProjectModal from "../DeleteProjectModal/DeleteProjectModal";
import { useSelector } from "react-redux";
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"
import { useNavigate } from "react-router-dom";
const ProjectsTable = () => {

    const { userProjects } = useSelector((state) => state.allProjects)
    const navigate = useNavigate()
    // useEffect(() => {
    //     console.log("modelData", modelData);
    //     console.log("modelFields", modelFields);
    // }, [modelFields, modelData])

    return (
        <div className="projectsTable">
            <div className="modelTableData">
                <div className="tableContainer">
                    {userProjects ?
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" className="relative px-2 py-1 border-r border-c2">
                                        <span className="sr-only">index</span>
                                    </th>
                                    <th scope="col" className="col">
                                        Project ID
                                    </th>
                                    <th scope="col" className="col">
                                        Project Name
                                    </th>
                                    <th scope="col" className="relative px-6 py-1">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userProjects?.length === 0 ?
                                    <tr>
                                        <td colSpan={4} className="cell text-center">no data</td>
                                    </tr>
                                    : userProjects?.map((item, index) => (

                                        <tr key={index} onClick={() => navigate(`/account/${item.name}`)}>
                                            <td className="cursor-pointer index">{index + 1}</td>

                                            <td className="cursor-pointer cell max-w-20 overflow-x-hidden break-words">
                                                <span>{item.id}</span>
                                            </td>
                                            <td className="cursor-pointer cell max-w-20 overflow-x-hidden break-words">
                                                <span>{item.name}</span>
                                            </td>
                                            <td name="delete" className="cell cellBtn">
                                                <DeleteProjectModal projectId={item.id} projectName={item.name} />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        : <PrimaryLoading />
                    }
                </div>

            </div>
        </div>
    );
};

export default ProjectsTable;