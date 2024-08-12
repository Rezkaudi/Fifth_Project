import { useEffect } from "react";
import './DashTable.css'
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading";
import { useSelector } from "react-redux";

import INTEGER from "../../assets/types/int.svg"
import BLOB from "../../assets/types/image.svg"
import REAL from "../../assets/types/real.svg"
import FK from "../../assets/types/fk.svg"
import TEXT from "../../assets/types/string.svg"

const DashTable = () => {

    const types = {
        INTEGER: INTEGER,
        BLOB: BLOB,
        REAL: REAL,
        FK: FK,
        TEXT: TEXT
    }

    const getType = (type, isKey) => {
        if (isKey) return types.FK
        else return types[type]
    }

    const { modelFields } = useSelector((state) => state.model)

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
                                    <td className="cell">
                                        <img src={getType(item["type"], item["is_key"])} alt={item["type"]?.toString()} />
                                    </td>
                                    <td className="cell">
                                        {item["notnull"] ?
                                            <span className='text-green-500'>&#10004;</span> :
                                            <span className='text-red-500'>&#10006;</span>
                                        }
                                    </td>
                                    <td className="cell">
                                        {item["is_unique"] ?
                                            <span className='text-green-500'>&#10004;</span> :
                                            <span className='text-red-500'>&#10006;</span>
                                        }
                                    </td>
                                    <td className="cell">
                                        {item["is_key"] ?
                                            <span className='text-green-500'>&#10004;</span> :
                                            <span className='text-red-500'>&#10006;</span>
                                        }

                                    </td>
                                    <td className="cell">{item["related_model"]?.toString().split('_')[0] || "null"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <PrimaryLoading />
                }
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