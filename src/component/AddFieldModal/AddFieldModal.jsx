import { toast } from 'react-toastify';
import './AddFieldModal.css'
import { useState } from 'react'


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
            <button onClick={handelShowModal} className="save" >Add new field</button>
            {showModal &&
                <div className='modalContainer'>
                    <div className="content">
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Add new field</h3>
                            </div>
                            {/*body*/}
                            <div className="modelBody">
                                <ol>
                                    <li>
                                        <label htmlFor="field">field name :</label>
                                        <input name="field" id="field" type="text" value={field["field"] || ""} required onChange={handleChange} />
                                    </li>

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
                                </ol>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" onClick={handelShowModal}>Close</button>
                                <button className="save" onClick={handleAddField}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </div>
            }
        </>
    );
}

export default AddFieldModal