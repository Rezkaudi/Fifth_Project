// FieldsTable.jsx corrected version
import { useState, useEffect } from "react";
import trush from "../../assets/images/icon _trash-c2.svg"; // Assuming this is your delete icon
import text from "../../assets/images/string.svg"
import './FieldsTable.css';

const FieldsTable = ({ fields, onDelete }) => {
    const [coulmn, setCoulmn] = useState(null);

    useEffect(() => {
        setCoulmn(fields);
        console.log(coulmn);
    }, [fields, coulmn]);

    return (
        <div className="DashTableData">
            {/* <button>+ Add new field</button> */}
            <div className="tableContainer">
                {coulmn ?
                    <table>
                        <thead>
                            <tr>
                                <th scope="col" className="relative px-2 py-1 border-r border-c2">
                                    <span className="sr-only">index</span>
                                </th>
                                <th scope="col" className="col">field name</th>
                                {/* <th scope="col" className="col">data type</th> */}
                                <th scope="col" className="col w-20">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coulmn.map((item, index) => (
                                <tr key={index}>
                                    <td className="index">{index + 1}</td>
                                    <td className="cell">
                                        <img className="w-8 inline-block mr-3" src={text} alt="text" />
                                        {item.field}
                                    </td>
                                    {/* <td className="cell">{item.datatype}</td> */}
                                    <td className="cell">
                                        <span className="flex items-center justify-center" onClick={() => onDelete(index)}>
                                            <img className="w-5 h-5 cursor-pointer" src={trush} alt="Delete" />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <div className="loading">loading ...</div>}
            </div>
        </div>
    );
};

export default FieldsTable;