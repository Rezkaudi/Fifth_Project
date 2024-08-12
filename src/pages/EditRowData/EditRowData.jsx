import './EditRowData.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateModelRow, getAllModelData, getAllModelDataSpecify } from '../../features/model/handleRequests';
import { useParams, useNavigate } from 'react-router-dom';
import PrimaryLoading from '../../component/PrimaryLoading/PrimaryLoading';


import INTEGER from "../../assets/types/int.svg"
import BLOB from "../../assets/types/image.svg"
import REAL from "../../assets/types/real.svg"
import FK from "../../assets/types/fk.svg"
import TEXT from "../../assets/types/string.svg"

const EditRowData = () => {

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


    const { modelName, projectName, rowId } = useParams()
    const navigate = useNavigate()
    const [rowData, setRowData] = useState({});
    // const [currentRowData, setCurrentRowData] = useState({})
    const { modelFields, modelData, loading } = useSelector((state) => state.model)
    const [relatedModel, setRelatedModel] = useState(null)
    // let formData = new FormData()
    const [formData] = useState(new FormData());
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

    const dispatch = useDispatch()


    useEffect(() => {
        if (!modelFields || !Array.isArray(modelFields)) {
            console.log("modelFields is not an array or is undefined");
            return; // Ensure modelFields is an array
        }

        // console.log("modelFields", modelFields);

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
    }, [modelFields, dispatch, formData]); // Ensure dispatch is stable; if using Redux Toolkit's useDispatch, it doesn't need to be in the dependency array


    useEffect(() => {
        console.log("relatedModel", relatedModel,);
    }, [relatedModel])



    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const fileValue = files && files.length ? files[0] : value; // Use the first file if it's a file input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded', otherwise use the value
        console.log(fileValue);

        setRowData(prev => ({
            ...prev,
            [name]: fileValue
        }));

        formData.set(name, fileValue);
    };;

    const handleSave = async (e) => {
        e.preventDefault()

        console.log(formData);
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        // console.log(modelData)

        dispatch(updateModelRow({ modelName, rowId, rowData: formData })).unwrap().then(
            () => {
                dispatch(getAllModelData(modelName))
                navigate(`/account/${projectName}/${modelName}`)

            },
            (error) => {
                console.error("error", error);
            }
        );

    }


    useEffect(() => {
        const getCurrent = async () => {
            try {
                const row = modelData?.find((item) => item.id === Number(rowId));
                if (modelData && row === undefined) {
                    navigate("/notfound");
                    return; // Exit if no row is found to avoid further execution
                }
                if (row) {
                    setRowData(row);

                    const isBlob = (key) => {
                        const field = modelFields?.find(item => item.name === key);
                        return field?.type === "BLOB";
                    };

                    const createFile = async (url, name = "image") => {
                        console.log(url);
                        try {
                            let response = await fetch(url)
                            // ,{ mode: 'no-cors' }
                            let data = await response.blob();
                            let metadata = { type: 'image/jpg' }; // Adjust the type as needed
                            let file = new File([data], `${name}.jpg`, metadata);
                            console.log("file", file);
                            return file;
                        } catch (error) {
                            console.error("Error creating file from URL:", error);
                            return null; // Return null or handle error as needed
                        }
                    };

                    const updateFormData = async () => {
                        for (const key of Object.keys(row)) {
                            let value;
                            if (isBlob(key)) {
                                try {
                                    // value = await createFile(row[key], key);
                                    // value = await createFile(proxyUrl + row[key], key);
                                    // value = await createFile("https://fastly.picsum.photos/id/497/200/300.jpg?hmac=IqTAOsl408FW-5QME1woScOoZJvq246UqZGGR9UkkkY", "key");
                                    value = await createFile("https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1-1024x824.jpg", "key");


                                } catch (error) {
                                    console.error(`Error fetching ${key}:`, error);
                                    continue;
                                }
                                formData.set(key, value || row[key]);
                            } else {
                                formData.set(key, row[key]);
                            }
                        }

                        formData.forEach((value, key) => {
                            console.log(`${key}: ${value}`);
                        });
                    };

                    await updateFormData();
                }


            } catch (error) {
                console.error("Error in useEffect:", error);
            }
        };

        getCurrent();
    }, [rowId, formData, modelData, navigate, modelFields]);



    return (
        <div className="addRowDataPage">
            <div className='modalContainer pt-4'>
                <div className="p-5">
                    <form className="contentContainer" onSubmit={handleSave}>
                        {/*header*/}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className='text-c2 text-lg lg:text-2xl font-black mr-4'>Edit row Data </h3>
                                <p className='text-xs font-medium ml-1 text-c2'> {projectName}/{modelName}/{rowId}</p>
                            </div>

                            <div className="flex items-center justify-end lg:justify-between lg:gap-5 gap-2 flex-wrap-reverse">
                                <button className="py-2 px-5 lg:px-10 bg-c5 text-c1 rounded cursor-pointer text-xs" onClick={() => navigate(`/account/${projectName}/${modelName}`)} disabled={loading}>Close</button>
                                <button className="flex items-center justify-center py-2 px-5 lg:px-10 bg-c1 text-c5 rounded cursor-pointer text-xs" disabled={loading}>Save Changes
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
                                {rowData && modelFields ? modelFields.slice(1).map((item, index) =>
                                    <li className=' space-y-2' key={index}>
                                        <label className='flex gap-1 text-base font-bold text-[#777]' htmlFor={item.name}>
                                            <img src={getType(item.type, item.is_key)} alt="" />
                                            <span>{item.name} :</span>
                                        </label>

                                        {item.type === "INTEGER" && !item.is_key && <input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="number" min={0} value={rowData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "REAL" && <input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="number" value={rowData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "TEXT" && <textarea className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="text" min={0} value={rowData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "BOOLEAN" &&
                                            <select className='bg-gray1 w-full' name={item.name} id={item.name} value={rowData[item.name] || ""} required onChange={handleChange}>
                                                <option value="">Select...</option>
                                                <option value="True">True</option>
                                                <option value="False">False</option>
                                            </select>}
                                        {item.type === "DATE" && <input className='h-10 bg-gray1 w-full block p-1 outline-none border border-c2 rounded' name={item.name} id={item.name} type="date" min={0} value={rowData[item.name] || ""} required onChange={handleChange} />}
                                        {item.type === "BLOB" && // Corrected MIME type from "BOLB" to "BLOB"
                                            <div className='flex items-center justify-between gap-5'>
                                                <input className='h-10 p-1 bg-gray1 w-full block outline-none border border-c2 rounded'
                                                    name={item.name}
                                                    id={item.name}
                                                    type="file"
                                                    accept=".png,.jpg,.jpeg"
                                                    // value={rowData[item.name] || ""}
                                                    onChange={handleChange}
                                                />
                                                {/* <a href={rowData[item.name]} download >download</a> */}
                                                {/* URL.createObjectURL(rowData[item.name]) */}
                                                {/* {rowData[item.name] && <img src={formData[item.name]} alt="img" style={{ width: '40px', height: '40px' }} />} */}

                                            </div>

                                        }
                                        {item.type === "INTEGER" && item.is_key &&
                                            <select className='bg-gray1 w-full rounded h-10 outline-none' name={item.name} id={item.name} value={rowData[item.name] || ""} required onChange={handleChange}>
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
                                ) : <PrimaryLoading />
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

export default EditRowData