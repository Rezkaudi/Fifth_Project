import './DeleteProjectModal.css'
import { useState } from 'react'

import DeleteImage from '../../assets/images/icon _trash-c2.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../features/allProjects/handleRequests'


const DeleteProjectModal = ({ projectId, projectName }) => {

    const [showModal, setShowModal] = useState(false);
    const { loading } = useSelector((state) => state.allProjects);

    const dispatch = useDispatch()

    const handelShowModal = (e) => {
        e?.stopPropagation()
        setShowModal(pre => !pre)
    }

    const handleDelete = (e) => {
        // console.log("delete", projectId);
        e?.stopPropagation()

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
            <span className="del cursor-pointer w-7 h-7 p-1 z-40 hover:border border-c1 rounded flex items-center justify-center" onClick={handelShowModal} title="delete">
                <img src={DeleteImage} alt="del" />
            </span>
            {showModal &&
                <div className='deleteModalContainer' onClick={(e)=>e.stopPropagation()}>
                    <div className="content">
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader1">
                                <img src={DeleteImage} alt="delete" />
                                <h3>Delete {projectName} project </h3>
                                <p>Are you sure you would like to do this ? </p>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter1">
                                <button className="close" disabled={loading} onClick={handelShowModal}>Cancle</button>
                                <button className="save" disabled={loading} onClick={handleDelete}>
                                    Confirm
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