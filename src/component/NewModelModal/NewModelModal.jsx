import './NewModelModal.css'
import { useState } from 'react'
import FieldsModal from '../FieldsModal/FieldsModal';
// import { useSelector } from 'react-redux'

const NewModelModal = ({ projectName }) => {

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
            <button className="createNew" onClick={handelShowModal}>
                + create new model
            </button>
            {showModal &&
                <div className="newModel">
                    <div className='modalContainer'>
                        <div className="content">
                            <div className="contentContainer">
                                {/*header*/}
                                <div className="modelHeader">
                                    <h3>Create new Model</h3>
                                </div>
                                <hr className='bg-slate-500 h-[2px] mx-5'/>
                                {/*body*/}
                                <div className="modelBody">
                                    <ol>
                                        <li>
                                            <label className='block mb-2' htmlFor="project">Project Name :</label>
                                            <input className='rounded h-8 ml-5 px-1 mb-5 bg-gray-300'  disabled name="project" id="project" type="text" value={projectName} required />
                                        </li>

                                        <li>
                                            <label className='block mb-2' htmlFor="modelName">Enter Model Name :</label>
                                            <input className='rounded h-8 ml-5 px-1 outline-none'  name="modelName" id="modelName" type="text" value={modelName} required onChange={handleChange} />
                                        </li>

                                    </ol>
                                </div>
                                {/*footer*/}
                                <div className="modelFooter2 mt-14 rounded flex items-center justify-between p-6 bg-[#ccc]">
                                    <button className="close" onClick={handelShowModal}>Close</button>
                                    <FieldsModal hidden={handelShowModal} projectName={projectName} modelName={modelName} />
                                </div>
                            </div>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </div>
                </div>
            }
        </>
    );
}

export default NewModelModal