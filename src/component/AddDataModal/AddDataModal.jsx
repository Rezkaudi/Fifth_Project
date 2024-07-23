import './AddDataModal.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createModelRow, getAllModelData, getAllModelDataSpecify } from '../../features/model/handleRequests';

const AddDataModal = ({ content, modelName, projectName }) => {

    const [showModal, setShowModal] = useState(false);
    const { modelFields, loading } = useSelector((state) => state.model)
    const [relatedModel, setRelatedModel] = useState(null)
    // let formData = new FormData()
    const [formData] = useState(new FormData());

    const dispatch = useDispatch()


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
    }, [modelFields, dispatch]); // Ensure dispatch is stable; if using Redux Toolkit's useDispatch, it doesn't need to be in the dependency array

    useEffect(() => {
        console.log(relatedModel);
    }, [relatedModel])

    const [modelData, setModelData] = useState({});

    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const fileValue = files && files.length ? files[0] : value; // Use the first file if it's a file input, otherwise use the value
    
        setModelData(prev => ({
            ...prev,
            [name]: fileValue
        }));
    
        formData.set(name, fileValue);
    };;

    const handleSave = async (e) => {
        e.preventDefault()

        console.log(formData);
        // console.log(modelData)

        dispatch(createModelRow({ modelName, rowData: formData })).unwrap().then(
            () => {
                dispatch(getAllModelData(modelName))
                handelShowModal()
                setModelData({})

            },
            (error) => {
                console.error("Failed to sign in:", error);
            }
        );

    }


    // const handleChangeFile = (e, name) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         formData.append(name, file);
    //     }
    //     console.log(formData)
    // }
    return (
        <>
            <button onClick={handelShowModal}>{content}</button>
            {showModal &&
                <div className='modalContainer'>
                    <div className="content">
                        <form className="contentContainer" onSubmit={handleSave}>
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Add new row of data for {modelName} table in {projectName}</h3>
                            </div>
                            {/*body*/}
                            <div className="modelBody">
                                <ol>
                                    {modelFields ? modelFields.slice(1).map((item, index) =>
                                        <li key={index}>
                                            <label htmlFor={item.name}>{item.name} :{item.type}  </label>

                                            {item.type === "INTEGER" && !item.is_key && <input name={item.name} id={item.name} type="number" min={0} value={modelData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "REAL" && <input name={item.name} id={item.name} type="number" value={modelData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "TEXT" && <input name={item.name} id={item.name} type="text" min={0} value={modelData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "BOOLEAN" &&
                                                <select name={item.name} id={item.name} value={modelData[item.name] || ""} required onChange={handleChange}>
                                                    <option value="">Select...</option>
                                                    <option value="True">True</option>
                                                    <option value="False">False</option>
                                                </select>}
                                            {item.type === "DATE" && <input name={item.name} id={item.name} type="date" min={0} value={modelData[item.name] || ""} required onChange={handleChange} />}
                                            {item.type === "BLOB" && // Corrected MIME type from "BOLB" to "BLOB"
                                                <input
                                                    name={item.name}
                                                    id={item.name}
                                                    type="file"
                                                    accept=".png,.jpg,.jpeg"
                                                    onChange={handleChange}
                                                    style={{ width: '250px', border: '1px solid gray', padding: '10px', textAlign: 'center', backgroundColor: '#f0f0f0f0', borderRadius: '5px', cursor: 'pointer' }}
                                                    required // If the file is mandatory
                                                />
                                            }
                                            {item.type === "INTEGER" && item.is_key &&
                                                <select name={item.name} id={item.name} value={modelData[item.name] || ""} required onChange={handleChange}>
                                                    <option value="">Select...</option>
                                                    {
                                                        relatedModel[item.name]?.map((item, index) =>
                                                            <option key={index} value={item.id}>{item.id}</option>
                                                        )
                                                    }
                                                </select>}
                                            {/* item["related_model"].split('_')[0] */}

                                        </li>
                                    ) : <div className="loading">loading ...</div>
                                    }
                                </ol>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" disabled={loading} onClick={handelShowModal}>Close</button>
                                <button className="save" disabled={loading}>Save Changes
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
                </div>
            }
        </>
    );
}

export default AddDataModal