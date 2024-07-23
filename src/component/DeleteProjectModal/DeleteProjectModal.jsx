import './DeleteProjectModal.css'
import { useState } from 'react'

import DeleteImage from '../../assets/images/icon _trash-c2.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../features/allProjects/handleRequests'


const DeleteProjectModal = ({ projectId, projectName }) => {

    const [showModal, setShowModal] = useState(false);
    const { loading } = useSelector((state) => state.allProjects);

    const dispatch = useDispatch()

    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handleDelete = async () => {
        console.log("delete", projectId);

        dispatch(deleteProject(projectId)).unwrap().then(
            () => {
                handelShowModal()
            },
            (error) => {
                console.error("Failed to Delete:", error);
            }
        );
    }


    return (
        <>
            <span className="del" onClick={handelShowModal} title="delete">
                <img src={DeleteImage} alt="del" />
            </span>
            {showModal &&
                <div className='deleteModalContainer'>
                    <div className="content">
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Do you need to delete  {projectName} project</h3>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" disabled={loading} onClick={handelShowModal}>No</button>
                                <button className="save" disabled={loading} onClick={handleDelete}>
                                    Yes
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
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </div>
            }
        </>
    );
}

export default DeleteProjectModal