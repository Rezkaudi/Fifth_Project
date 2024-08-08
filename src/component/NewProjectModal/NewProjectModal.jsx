import './NewProjectModal.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { creatProject } from '../../features/allProjects/handleRequests';

const NewProjectModal = () => {

    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);
    const [name, setProjectName] = useState("");
    const { loading } = useSelector((state) => state.allProjects);



    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }
    
    const handleChange = (e) => {
        setProjectName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        console.log(formData);

        dispatch(creatProject(formData)).unwrap().then(
            () => {
                handelShowModal()
                setProjectName("")
            },
            (error) => {
                console.error("Failed to create:", error);
            }
        );



    }

    return (
        <>
            <button className="createNew" onClick={handelShowModal}>
                + create new project
            </button>
            {showModal &&
                <div className='NewProModalContainer'>
                    <form className="content" onSubmit={handleSubmit}>
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader ">
                                <h3>Create new project</h3>
                            </div>
                            <hr className='bg-slate-500 h-[2px] mx-5'/>
                            {/*body*/}
                            <div className="modelBody h-[250px]">
                                <label className='block ml-2 mb-2' htmlFor="name">Enter Project Name :</label>
                                <input className='rounded h-8' name="name" id="name" type="text" value={name} required onChange={handleChange} />
                            </div>
                            {/*footer*/}
                            <div className="rounded flex items-center justify-between p-6 bg-[#ccc]">
                                <button className="close1" disabled={loading} onClick={handelShowModal}>Cancel</button>
                                <button type='submit' className="save1" disabled={loading}>Create Project
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
                    </form>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </div>
            }
        </>
    );
}

export default NewProjectModal