import { useState, useEffect } from "react";
import Pagination from "../Pagination/Pagination";
import './Table.css'

import EditDataModal from "../EditDataModal/EditDataModal";
import DeleteDataModal from "../DeleteDataModal/DeleteDataModal";
import { useSelector } from "react-redux";

const Table = ({ modelName }) => {

    const { modelData, modelFields } = useSelector((state) => state.model)

    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(modelData?.length / 10)
    const indexOfLastItem = currentPage * 10;
    const indexOfFirstItem = indexOfLastItem - 10;
    const currentItems = modelData?.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        console.log("modelData", modelData);
        console.log("modelFields", modelFields);
    }, [modelFields, modelData])
    return (
        <div className="modelTableData">
            <div className="tableContainer">
                {modelFields && modelData ?
                    <table>
                        <thead>
                            <tr>
                                <th scope="col" className="relative px-2 py-1 border-r border-c2">
                                    <span className="sr-only">index</span>
                                </th>
                                {modelFields.map((item, index) =>
                                    <th key={index} scope="col" className="col">
                                        {item.name}
                                    </th>
                                )}
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

                                        {Object.keys(item).map((prob, index) =>
                                            <td key={index} className="cell max-w-20 overflow-x-hidden break-words">

                                                {modelFields[index].type==="BLOB" ?
                                                    <img className="max-w-12" src={item[prob]} alt="img" />
                                                    :
                                                    <span>{item[prob]}</span>
                                                }
                                            </td>
                                        )}

                                        <td className="cell cellBtn">
                                            <EditDataModal rowId={item.id} modelName={modelName} currentRowData={item} modelFields={modelFields} />
                                            <DeleteDataModal rowId={item.id} modelName={modelName} />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    : <div className="loading">loading ...</div>
                }
            </div>

            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
};

export default Table;