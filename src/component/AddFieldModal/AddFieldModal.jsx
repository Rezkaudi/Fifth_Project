import { toast } from 'react-toastify';
import './AddFieldModal.css'
import { useState } from 'react'

import int from "../../assets/types/int.svg"
import image from "../../assets/types/image.svg"
import real from "../../assets/types/real.svg"
import fk from "../../assets/types/fk.svg"
import string from "../../assets/types/string.svg"
import bool from "../../assets/types/bool.svg"


const AddFieldModal = ({ fields, setFields, userProjectModels }) => {

    const [showModal, setShowModal] = useState(false);
    const [field, setField] = useState({
        "field": "",
        "datatype": "",
        "null": "False",
        "unique": "False",
        "related_model": ""
    })

    // const [field, setField] = useState({

    // });



    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddField = (e) => {
        e.stopPropagation()
        console.log(field)
        if (isFormComplete()) {
            handelShowModal()
            setFields([...fields, field])

            setField({
                "field": "",
                "datatype": "",
                "null": "False",
                "unique": "False",
                "related_model": ""
            })
        }

        else
            toast.error("please fill all field")
    }

    const isFormComplete = () => {
        // Check if every required field has a non-empty 
        let requiredFields = []
        if (field["datatype"] === "FOREIGNKEY") {
            requiredFields = ['datatype', 'field', "related_model"];
        }
        else {
            requiredFields = ['datatype', 'field'];
        }
        return requiredFields.every(fieldName => field[fieldName].trim() !== ''); // Using trim() to also catch spaces as invalid input
    };

    return (
        <>
            <button onClick={handelShowModal} className="save" > + Add new field</button>
            {showModal &&
                <div className="addField">
                    <div className='modalContainer'>
                        <div className="content">
                            <div className="contentContainer">
                                {/*header*/}
                                <div className="modelHeader m-0">
                                    <div className=''>
                                        <h3>Field Data</h3>
                                    </div>

                                    <div className="modelFooter1">
                                        <button className="close" onClick={handelShowModal}>Close</button>
                                        <button className="save" onClick={handleAddField}>Save Changes</button>
                                    </div>

                                </div>
                                {/*body*/}
                                <div className="modelBody">

                                    <label className='block mb-2 text-[#737373]' htmlFor="field">Enter field name :</label>
                                    <input className='rounded outline-none border border-c2 p-1 h-8' name="field" id="field" type="text" value={field["field"] || ""} required onChange={handleChange} />

                                    {/* <ol>
                                        <li>
                                            <label htmlFor="datatype">data type :</label>
                                            <select name="datatype" id="datatype" value={field["datatype"] || ""} required onChange={handleChange}>
                                                <option value="">Select...</option>
                                                <option value="INTEGER">INTEGER</option>
                                                <option value="TEXT">TEXT</option>
                                                <option value="REAL">REAL</option>
                                                <option value="BOOLEAN">BOOLEAN</option>
                                                <option value="DATE">DATE</option>
                                                <option value="BLOB">Image</option>
                                                {userProjectModels.length !== 0 && <option value="FOREIGNKEY">FOREIGNKEY</option>}
                                            </select>
                                        </li>
                                        {field["datatype"] !== "FOREIGNKEY" &&
                                            <>
                                                <li>
                                                    <label htmlFor="null">is null :</label>
                                                    <select name="null" id="null" value={field["null"] || ""} required onChange={handleChange}>
                                                        <option value="True">True</option>
                                                        <option value="False">False</option>
                                                    </select>
                                                </li>

                                                <li>
                                                    <label htmlFor="unique">is unique :</label>
                                                    <select name="unique" id="unique" value={field["unique"] || ""} required onChange={handleChange}>
                                                        <option value="True">True</option>
                                                        <option value="False">False</option>
                                                    </select>
                                                </li>
                                            </>}

                                        {userProjectModels.length !== 0 && field["datatype"] === "FOREIGNKEY" &&
                                            <>
                                                <li>
                                                    <label htmlFor="related_model">is related_model :</label>
                                                    <select name="related_model" id="related_model" value={field["related_model"] || ""} required onChange={handleChange}>
                                                        <option value="">select ... </option>
                                                        {
                                                            userProjectModels.map((item, index) =>
                                                                <option key={index} value={item.modelname}>{item.modelname}</option>
                                                            )
                                                        }
                                                    </select>
                                                </li>
                                            </>}
                                    </ol> */}

                                    <div className="selectedType mt-10">
                                        <h3 className="text-lg text-gray-600">Selected Type</h3>
                                        <hr className='bg-slate-500 h-[2px] my-2 mb-6' />
                                        <div className="types grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                <span className="w-8 ">
                                                    <img src={int} alt="text" />
                                                </span>
                                                <span className="flex-1">
                                                    <h5 className="text-xs">INTEGER</h5>
                                                    <p className="text-[7px]">Integer number ( form 0 to infinity)</p>
                                                </span>
                                                <span className="">
                                                    <input type="radio" name="datatype" onChange={handleChange} value="INTEGER" required />
                                                </span>
                                            </label>
                                            <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                <span className="w-8 ">
                                                    <img src={real} alt="text" />
                                                </span>
                                                <span className="flex-1">
                                                    <h5 className="text-xs">REAL</h5>
                                                    <p className="text-[7px]">REAL number (from -infinity to + infinity) </p>
                                                </span>
                                                <span className="">
                                                    <input type="radio" name="datatype" onChange={handleChange} value="REAL" required />
                                                </span>
                                            </label>
                                            <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                <span className="w-8 ">
                                                    <img src={string} alt="text" />
                                                </span>
                                                <span className="flex-1">
                                                    <h5 className="text-xs">TEXT</h5>
                                                    <p className="text-[7px]">small or long text like title or description</p>
                                                </span>
                                                <span className="">
                                                    <input type="radio" name="datatype" onChange={handleChange} value="TEXT" required />
                                                </span>
                                            </label>
                                            <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                <span className="w-8 ">
                                                    <img src={image} alt="text" />
                                                </span>
                                                <span className="flex-1">
                                                    <h5 className="text-xs">IMAGE</h5>
                                                    <p className="text-[7px]">Image (.png , .jpg , ....)</p>
                                                </span>
                                                <span className="">
                                                    <input type="radio" name="datatype" onChange={handleChange} value="BLOB" required />
                                                </span>
                                            </label>
                                            {userProjectModels.length !== 0 &&
                                                <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                    <span className="w-8 ">
                                                        <img src={fk} alt="text" />
                                                    </span>
                                                    <span className="flex-1">
                                                        <h5 className="text-xs">FOREIGNKEY</h5>
                                                        <p className="text-[7px]">Related tables</p>
                                                    </span>
                                                    <span className="">
                                                        <input type="radio" name="datatype" onChange={handleChange} value="FOREIGNKEY" required />
                                                    </span>
                                                </label>}


                                        </div>
                                    </div>

                                    <div className="selectedType mt-10">
                                        <h3 className="text-lg text-gray-600">Advanced Settings</h3>
                                        <hr className='bg-slate-500 h-[2px] mb-6' />
                                        <div className="types grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {field["datatype"] !== "FOREIGNKEY" &&
                                                <>
                                                    <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                        <span className="w-8 ">
                                                            <img src={bool} alt="text" />
                                                        </span>
                                                        <span className="flex-1">
                                                            <h5 className="text-xs">is null</h5>
                                                            <p className="text-[7px]">If feild maybe null or no</p>
                                                        </span>
                                                        <span className="inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={field["null"] === "True"} // Adjusted to reflect the state
                                                                onChange={(e) => setField(prev => ({ ...prev, null: e.target.checked ? "True" : "False" }))} // Update state on change
                                                            />
                                                            <span className={`relative w-10 h-5 border border-c1 ${field["null"] === "True" ? 'bg-c2' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${field["null"] === "True" ? 'peer-checked:bg-c2' : ''}`}></span>
                                                        </span>
                                                    </label>

                                                    <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                        <span className="w-8 ">
                                                            <img src={bool} alt="text" />
                                                        </span>
                                                        <span className="flex-1">
                                                            <h5 className="text-xs">is unique</h5>
                                                            <p className="text-[7px]">If field is unique or no</p>
                                                        </span>
                                                        <span className="inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                checked={field["unique"] === "True"} // Adjusted to reflect the state
                                                                onChange={(e) => setField(prev => ({ ...prev, unique: e.target.checked ? "True" : "False" }))} // Update state on change
                                                            />
                                                            <span className={`relative w-10 h-5 border border-c1 ${field["unique"] === "True" ? 'bg-c2' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${field["unique"] === "True" ? 'peer-checked:bg-c2' : ''}`}></span>
                                                        </span>
                                                    </label>
                                                </>
                                            }

                                            {userProjectModels.length !== 0 && field["datatype"] === "FOREIGNKEY" &&
                                                // <>
                                                //     <li>
                                                //         <label htmlFor="related_model">is related_model :</label>
                                                //         <select name="related_model" id="related_model" value={field["related_model"] || ""} required onChange={handleChange}>
                                                //             <option value="">select ... </option>
                                                //             {
                                                //                 userProjectModels.map((item, index) =>
                                                //                     <option key={index} value={item.modelname}>{item.modelname}</option>
                                                //                 )
                                                //             }
                                                //         </select>
                                                //     </li>
                                                // </>
                                                <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                    <span className="flex-1">
                                                        <h5 className="text-xs">related_model</h5>
                                                        <p className="text-[7px]">Which model related from</p>
                                                    </span>
                                                    <span className="inline-flex items-center cursor-pointer">
                                                        <select className='rounded border border-c2 outline-none' name="related_model" id="related_model" value={field["related_model"] || ""} required onChange={handleChange}>
                                                            <option value="">select ... </option>
                                                            {
                                                                userProjectModels.map((item, index) =>
                                                                    <option key={index} value={item.modelname}>{item.modelname}</option>
                                                                )
                                                            }
                                                        </select>   </span>
                                                </label>

                                            }


                                        </div>
                                    </div>

                                </div>
                                {/*footer*/}

                            </div>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </div>
                </div>
            }
        </>
    );
}

export default AddFieldModal