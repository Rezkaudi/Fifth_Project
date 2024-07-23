import './NewModelModal.css'
import { useState } from 'react'
import FieldsModal from '../FieldsModal/FieldsModal';
// import { useSelector } from 'react-redux'

const NewModelModal = ({ projectName, userProjectModels }) => {

    const [showModal, setShowModal] = useState(false);
    const [modelName, setModelName] = useState("");


    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handleChange = (e) => {
        setModelName(e.target.value)
    }

    return (
        <>
            <div className="createNew" onClick={handelShowModal}>
                + create new model
            </div>
            {showModal &&
                <div className='modalContainer'>
                    <div className="content">
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Modal Title</h3>
                            </div>
                            {/*body*/}
                            <div className="modelBody">
                                <ol>
                                    <li>
                                        <label htmlFor="project">Project Name :</label>
                                        <input disabled name="project" id="project" type="text" value={projectName} required />
                                    </li>

                                    <li>
                                        <label htmlFor="modelName">Enter Model Name :</label>
                                        <input name="modelName" id="modelName" type="text" value={modelName} required onChange={handleChange} />
                                    </li>

                                </ol>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" onClick={handelShowModal}>Close</button>
                                <FieldsModal hidden={handelShowModal} userProjectModels={userProjectModels} projectName={projectName} modelName={modelName} />
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </div>
            }
        </>
    );
}

export default NewModelModal