import './EditDataModal.css'
import { useState, useEffect } from 'react'
import Edit from '../../assets/images/edit-04-dark.svg'
import { updateModelRow, getAllModelData } from '../../features/model/handleRequests'
import { useSelector, useDispatch } from 'react-redux';
import { getAllModelDataSpecify } from '../../features/model/handleRequests';
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"

const EditDataModal = ({ rowId, modelName, currentRowData, modelFields }) => {

    const [showModal, setShowModal] = useState(false);
    const [rowData, setRowData] = useState({});
    const { loading } = useSelector((state) => state.model)
    const dispatch = useDispatch()
    const [formData] = useState(new FormData());
    const [relatedModel, setRelatedModel] = useState(null)



    useEffect(() => {
        if (!modelFields || !Array.isArray(modelFields)) {
            console.log("modelFields is not an array or is undefined");
            return; // Ensure modelFields is an array
        }

        console.log("modelFields", modelFields);

        const fetchPromises = modelFields
            .filter(item => item.is_key) // Ensure this is an array
            .map(item => {
                const modelName = item["related_model"].split('_')[0];
                // Ensure dispatch(getAllModelDataSpecify(modelName)).unwrap() returns a promise
                return dispatch(getAllModelDataSpecify(modelName)).unwrap().then(payload => ({ [item.name]: payload }));
            });

        if (fetchPromises.length === 0) {
            console.log("No fetchPromises to execute");
            return; // Exit early if there are no promises
        }

        Promise.all(fetchPromises)
            .then(results => {
                // Correctly provide an initial value for reduce to handle empty arrays
                const combinedResults = results.reduce((acc, result) => ({ ...acc, ...result }));
                setRelatedModel(prevState => ({ ...prevState, ...combinedResults }));
            })
            .catch(error => {
                console.error("Failed to fetch model data:", error);
            });

    }, [modelFields, dispatch, currentRowData, formData]);


    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const fileValue = files && files.length ? files[0] : value; // Use the first file if it's a file input, otherwise use the value

        setRowData(prev => ({
            ...prev,
            [name]: fileValue
        }));

        formData.set(name, fileValue);
    };

    const handelEdit = async (e) => {
        e.preventDefault()
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}: ${value}`);
        // }


        dispatch(updateModelRow({ modelName, rowId, rowData: formData })).unwrap().then(
            () => {
                dispatch(getAllModelData(modelName))
                handelShowModal()
            },
            (error) => {
                console.error("Failed to sign in:", error);
            }
        );
    }

    useEffect(() => {
        setRowData(currentRowData)
        Object.keys(currentRowData).forEach(key => {
            formData.set(key, currentRowData[key]);
        });
    }, [currentRowData,formData])

    return (
        <>
            <button className='tableBtn' onClick={handelShowModal} title="edit">
                <img src={Edit} alt="edit" />
            </button>
            {showModal &&
                <div className='EditmodalContainer'>
                    <div className="content">
                        <form className="contentContainer" onSubmit={handelEdit}>
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Edit this row</h3>
                            </div>
                            {/*body*/}
                            <div className="modelBody">
                                <ol>
                                    {modelFields ? modelFields.slice(1).map((item, index) =>
                                        <li key={index}>
                                            <label htmlFor={item.name}>{item.name} :{item.type} {item.related_model} </label>

                                            {item.type === "INTEGER" && !item.is_key && <input name={item.name} id={item.name} type="number" min={0} value={rowData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "REAL" && <input name={item.name} id={item.name} type="number" value={rowData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "TEXT" && <input name={item.name} id={item.name} type="text" min={0} value={rowData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "BOOLEAN" &&
                                                <select name={item.name} id={item.name} value={rowData[item.name] || ""} required onChange={handleChange}>
                                                    <option value="">Select...</option>
                                                    <option value="True">True</option>
                                                    <option value="False">False</option>
                                                </select>}
                                            {item.type === "DATE" && <input name={item.name} id={item.name} type="date" min={0} value={rowData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "BLOB" && // Corrected MIME type from "BOLB" to "BLOB"
                                                <input
                                                    name={item.name}
                                                    id={item.name}
                                                    type="file"
                                                    accept=".png,.jpg,.jpeg" // Specify accepted file formats
                                                    onChange={handleChange}
                                                    style={{ width: '250px', border: '1px solid gray', padding: '10px', textAlign: 'center', backgroundColor: '#f0f0f0f0', borderRadius: '5px', cursor: 'pointer' }}
                                                />
                                            }
                                            {item.type === "INTEGER" && item.is_key &&
                                                <select name={item.name} id={item.name} value={rowData[item.name] || ""} required onChange={handleChange}>
                                                    <option value="">Select...</option>
                                                    {
                                                        relatedModel[item.name]?.map((item, index) =>
                                                            <option key={index} value={item.id}>{item.id}</option>
                                                        )
                                                    }
                                                </select>}


                                        </li>
                                    ) : <PrimaryLoading/>
                                    }
                                    {/* {Object.keys(rowData).slice(1).map((item, index) =>
                                        <li key={index}>
                                            <label htmlFor={item.toString()}>{item.toString()} :</label>
                                            <input name={item.toString()} id={item.toString()} type="text" value={rowData[item.toString()]} required onChange={handleChange} />
                                        </li>
                                    )} */}
                                </ol>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button disabled={loading} className="close" onClick={handelShowModal}>Close</button>
                                <button type='submit' disabled={loading} className="save">Save Changes
                                    {loading && (
                                        <span
                                            className="animate-spin h-5 ml-2 w-5 border-t-2 border-b-2 border-c4 rounded-full inline-block"
                                            role="status"
                                            aria-live="polite"
                                        ></span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </div >
            }
        </>
    );
}

export default EditDataModal