import { useState } from "react";
import Pagination from "../Pagination/Pagination";
import './Table.css'
import DeleteDataModal from "../DeleteDataModal/DeleteDataModal";
import { useSelector } from "react-redux";
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"
import Edit from "../../assets/images/edit-04-dark.svg"
import { Link } from "react-router-dom";
import Eye from "../../assets/images/icon _eye.svg"

const Table = ({ modelName, projectName }) => {

    const { modelData, modelFields } = useSelector((state) => state.model)

    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(modelData?.length / 10)
    const indexOfLastItem = currentPage * 10;
    const indexOfFirstItem = indexOfLastItem - 10;
    const currentItems = modelData?.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <div className="mainTable22">
            <div className="modelTableData">
                <div className="tableContainer ">
                    {modelFields && modelData ?
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col" className="relative px-2 py-1 border-r border-c2">
                                        <span className="sr-only">index</span>
                                    </th>
                                    {modelFields.slice(0, 4).map((item, index) =>
                                        <th key={index} scope="col" className="col max-w-40 truncate">
                                            {item.name}
                                        </th>
                                    )}
                                    {
                                        modelFields.length > 4 &&
                                        <th scope="col" title={`+${modelFields.length - 4} More fields ...`} className="truncate relative px-6 py-1 max-w-40">
                                            <span className="text-xs font-extralight">+{modelFields.length - 4} More fields ...</span>
                                        </th>
                                    }
                                    <th scope="col" className="relative px-6 py-1">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {modelData?.length === 0 ?
                                    <tr>
                                        <td colSpan={modelFields?.length + 2} className="cell text-center">no data</td>
                                    </tr>
                                    : currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className="index">{index + 1}</td>

                                            {Object.keys(item).slice(0, 4).map((prob, index) =>
                                                <td key={index} className="cell max-w-48 truncate">

                                                    {modelFields[index].type === "BLOB" ?
                                                        <img className="h-10 w-10 bg-contain" src={item[prob]} alt="img" />
                                                        :
                                                        <span>{item[prob]}</span>
                                                    }
                                                </td>
                                            )}
                                            {
                                                modelFields.length > 4 &&
                                                <td className="relative px-6 py-1 text-center">
                                                    <span className="text-sm text-center font-normal">...</span>
                                                </td>
                                            }
                                            <td className="cell w-20">

                                                <Link to={`/account/${projectName}/${modelName}/showRow/${item.id}`}>
                                                    <button className='tableBtn' title="show data">
                                                        <img src={Eye} alt="show data" />
                                                    </button>
                                                </Link>


                                                <Link to={`/account/${projectName}/${modelName}/editRow/${item.id}`}>
                                                    <button className='tableBtn' title="edit">
                                                        <img src={Edit} alt="edit" />
                                                    </button>
                                                </Link>

                                                {/* <EditDataModal rowId={item.id} modelName={modelName} currentRowData={item} modelFields={modelFields} /> */}
                                                <DeleteDataModal rowId={item.id} modelName={modelName} />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        : <PrimaryLoading />
                    }
                </div>

                <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
            </div>
        </div>
    );
};

export default Table;