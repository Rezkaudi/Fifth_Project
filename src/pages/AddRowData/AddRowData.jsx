import './AddRowData.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { createModelRow, getAllModelData, getAllModelDataSpecify } from '../../features/model/handleRequests';
import { useParams,useNavigate } from 'react-router-dom';

const AddRowData = () => {

    const { modelName, projectName } = useParams()
    const navigate =useNavigate()
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
        console.log("relatedModel", relatedModel);
    }, [relatedModel])

    const [modelData, setModelData] = useState({});


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const fileValue = files && files.length ? files[0] : value; // Use the first file if it's a file input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded', otherwise use the value

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
                navigate(`/account/${projectName}/${modelName}`)
                setModelData({})

            },
            (error) => {
                console.error("Failed to sign in:", error);
            }
        );

    }

    return (
        <div className="addRowDataPage">
            <div className='modalContainer'>
                <div className="p-5">
                    <form className="contentContainer" onSubmit={handleSave}>
                        {/*header*/}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className='text-c2 text-2xl font-black mr-4'>Add new row of data </h3>
                                <p className='text-xs font-medium ml-1 text-c2'> {projectName}/{modelName}</p>
                            </div>

                            <div className="flex items-center justify-between gap-5">
                                <button className="py-2 px-10 bg-c5 text-c1 rounded cursor-pointer text-xs" onClick={()=>navigate(`/account/${projectName}/${modelName}`)} disabled={loading}>Close</button>
                                <button className="flex items-center justify-center py-2 px-10 bg-c1 text-c5 rounded cursor-pointer text-xs" disabled={loading}>Save Changes
                                    {loading && (
                                        <span
                                            className="animate-spin h-5 ml-2 w-5 border-t-2 border-b-2 border-c4 rounded-full inline-block"
                                            role="status"
                                            aria-live="polite"
                                        ></span>
                                    )}
                                </button>
                            </div>
                        </div>
                        {/*body*/}
                        <div className="mt-20">
                            <ol className='grid grid-cols-1 md:grid-cols-2 gap-5 gap-y-10'>
                                {modelFields ? modelFields.slice(1).map((item, index) =>
                                    <li className=' space-y-2' key={index}>
                                        <label className='text-base font-bold text-[#777]' htmlFor={item.name}>{item.name} :{item.type}  </label>

                                        {item.type === "INTEGER" && !item.is_key && <input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="number" min={0} value={modelData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "REAL" && <input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="number" value={modelData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "TEXT" && <textarea className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="text" min={0} value={modelData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "BOOLEAN" &&
                                            <select className='bg-gray1 w-full' name={item.name} id={item.name} value={modelData[item.name] || ""} required onChange={handleChange}>
                                                <option value="">Select...</option>
                                                <option value="True">True</option>
                                                <option value="False">False</option>
                                            </select>}
                                        {item.type === "DATE" && <input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="date" min={0} value={modelData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "BLOB" && // Corrected MIME type from "BOLB" to "BLOB"
                                            <input className='h-10 p-1 bg-gray1 w-full block outline-none border border-c2 rounded'
                                                name={item.name}
                                                id={item.name}
                                                type="file"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={handleChange}
                                                required // If the file is mandatory
                                            />
                                        }
                                        {item.type === "INTEGER" && item.is_key &&
                                            <select className='bg-gray1 w-full rounded h-10 outline-none' name={item.name} id={item.name} value={modelData[item.name] || ""} required onChange={handleChange}>
                                                <option value="">Select...</option>
                                                {
                                                    relatedModel && relatedModel[item.name]?.map((item, index) =>
                                                        <option key={index} value={item?.id}>{item.id}</option>
                                                    )
                                                }
                                            </select>

                                        }
                                        {/* item["related_model"].split('_')[0] */}

                                    </li>
                                ) : <div className="loading">loading ...</div>
                                }
                            </ol>
                        </div>
                        {/*footer*/}

                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddRowData