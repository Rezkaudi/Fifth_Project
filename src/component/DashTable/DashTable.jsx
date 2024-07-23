import { useState, useEffect } from "react";
import './DashTable.css'
// import Edit from '../../assets/images/edit-04-dark.svg'
// import Trash from '../../assets/images/icon _trash-dark.svg'
import { useSelector } from "react-redux";



const DashTable = ({ modelName }) => {
    const { modelData, modelFields } = useSelector((state) => state.model)

    //     const [coulmn, setCoulmn] = useState({
    //         default_value
    // is_key
    // is_unique

    // name

    // notnull
    // related_model

    // type
    //     })

    useEffect(() => {
        console.log(modelFields)
    }, [modelFields])

    return (
        <div className="DashTableData">
            {/* <button>+ Add new field</button> */}
            <div className="tableContainer">
                {modelFields ?
                    <table>
                        <thead>
                            <tr>
                                <th scope="col" className="relative px-2 py-1 border-r border-c2">
                                    <span className="sr-only">index</span>
                                </th>
                                <th scope="col" className="col">field name</th>
                                <th scope="col" className="col">data type</th>
                                <th scope="col" className="col">not null</th>
                                <th scope="col" className="col">is unique</th>
                                <th scope="col" className="col">is_key</th>
                                <th scope="col" className="col"> related_model</th>

                            </tr>
                        </thead>
                        <tbody>
                            {modelFields.map((item, index) => (
                                <tr key={index}>
                                    <td className="index">{index + 1}</td>
                                    <td className="cell">{item["name"]?.toString()}</td>
                                    <td className="cell">{item["type"]?.toString()}</td>
                                    <td className="cell">{item["notnull"]?.toString()}</td>
                                    <td className="cell">{item["is_unique"]?.toString()}</td>
                                    <td className="cell">{item["is_key"]?.toString()}</td>
                                    <td className="cell">{item["related_model"]?.toString().split('_')[0] || "null"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <div className="loading">loading ...</div>}
            </div>
        </div>
    );
}

export default DashTable

// default_value
// is_key
// is_unique
// name
// notnull
// related_model
// type