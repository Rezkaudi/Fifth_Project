import './ModelsTable.css'
import DeleteModelModal from "../DeleteModelModal/DeleteModelModal";
import { useSelector } from "react-redux";
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"
import { Link } from "react-router-dom";

const ModelsTable = ({ projectName }) => {

    const { userProjectModels } = useSelector((state) => state.allProjects);
    // useEffect(() => {
    //     console.log("modelData", modelData);
    //     console.log("modelFields", modelFields);
    // }, [modelFields, modelData])

    return (
        <div className="modelTableData1">
            <div className="tableContainer">
                {userProjectModels ?
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
                                <th scope="col" className="relative px-6 py-1">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userProjectModels?.length === 0 ?
                                <tr>
                                    <td colSpan={4} className="cell text-center">no data</td>
                                </tr>
                                // onClick={() => navigate(`/account/${projectName}/${item.modelname}`)}
                                : userProjectModels?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="cursor-pointer index">
                                            <Link className="w-full h-full inline-block" to={`/account/${projectName}/${item.modelname}`}>
                                                {index + 1}
                                            </Link>
                                        </td>

                                        <td className="cursor-pointer cell max-w-20 overflow-x-hidden break-words">
                                            <Link className="w-full h-full inline-block" to={`/account/${projectName}/${item.modelname}`}>
                                                <span>{item.id}</span>
                                            </Link>
                                        </td>
                                        <td className="cursor-pointer cell max-w-20 overflow-x-hidden break-words ">
                                            <Link className="w-full h-full inline-block" to={`/account/${projectName}/${item.modelname}`}>
                                                <span>{item.modelname}</span>
                                            </Link>
                                        </td>
                                        <td name="delete" className="cell cellBtn1">
                                            <div className="flex justify-end">
                                                <DeleteModelModal modelName={item.modelname} projectName={projectName} />
                                            </div>
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

export default ModelsTable;