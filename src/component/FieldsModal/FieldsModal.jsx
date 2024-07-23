import './FieldsModal.css'
import { useState } from 'react'

import AddFieldModal from '../AddFieldModal/AddFieldModal'
import FieldsTable from '../FieldsTable/FieldsTable'
import { creatModel } from '../../features/allModels/handleRequests'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserModels } from '../../features/allModels/handleRequests'


const FieldsModal = ({ hidden, modelName, projectName, userProjectModels }) => {

    const [fields, setFields] = useState([])
    const { loading } = useSelector((state) => state.allModels)
    const dispatch = useDispatch()

    const formData = new FormData()
    formData.append("project", projectName)
    formData.append("modelname", modelName)


    const [showModal, setShowModal] = useState(false);

    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handelCloseAll = () => {
        setShowModal(false)
        hidden()
    }

    const handleDeleteField = (index) => {
        // Implement deletion logic here
        // For example, remove the field at the given index from the fields array
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    function convertFormDataToObject(formData) {
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });
        return object;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        fields.forEach((item, index) => {
            // dataModel[`field${index + 1}`] = item.field
            // dataModel[`datatype${index + 1}`] = item.datatype
            // dataModel[`null${index + 1}`] = item.null
            // dataModel[`maxlen${index + 1}`] = item.maxlen
            // dataModel[`unique${index + 1}`] = item.unique

            formData.append(`field${index + 1}`, item.field)
            formData.append(`datatype${index + 1}`, item.datatype)
            if (item.datatype === "FOREIGNKEY") {
                formData.append(`related_model${index + 1}`, item.related_model)
            }

            else {
                formData.append(`null${index + 1}`, item.null)
                formData.append(`unique${index + 1}`, item.unique)
            }

        })

        // dataModel["nf"] = fields.length
        formData.append("nf", fields.length)

        console.log(convertFormDataToObject(formData));

        dispatch(creatModel(formData)).unwrap().then(
            () => {
                dispatch(getAllUserModels());
                handelCloseAll()
            },
            (error) => {
                console.error("Failed to sign in:", error);
            }
        );
    }

    return (
        <>
            <button className="save" onClick={handelShowModal}>Next</button>
            {showModal &&
                <div className='feildModalContainer'>
                    <div className="content">
                        <form onSubmit={handleSubmit} className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>All model Feilds</h3>
                            </div>
                            {/*body*/}
                            <div className="modelBody">
                                <FieldsTable fields={fields} onDelete={handleDeleteField} />
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" onClick={handelCloseAll} disabled={loading}>Close</button>
                                <AddFieldModal fields={fields} setFields={setFields} userProjectModels={userProjectModels} />
                                <button type='submit' className="save" disabled={loading}>
                                    Save Changes
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

export default FieldsModal