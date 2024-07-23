import './DeleteModelModal.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Delete from '../../assets/images/icon _trash-c2.svg'
import { useDispatch, useSelector } from 'react-redux'
import { deleteModel, getAllUserModels } from '../../features/allModels/handleRequests'

const DeleteModelModal = ({ modelName }) => {

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);
    const { loading } = useSelector((state) => state.allModels);
    const dispatch = useDispatch()


    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handleDelete = async () => {
        console.log("delete", modelName);

        dispatch(deleteModel(modelName)).unwrap().then(
            () => {
                // dispatch(getAllUserModels(modelName))
                navigate("/account/dashboard")
                handelShowModal()
            },
            (error) => {
                console.error("Failed to Delete:", error);
            }
        );
    }


    return (
        <>
            <button title='Delete this model' onClick={handelShowModal}>
                <img src={Delete} alt="Delete" />
            </button>
            {showModal &&
                <div className='deleteModell'>
                    <div className="content">
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Do you need to delete this table</h3>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" disabled={loading} onClick={handelShowModal}>No</button>
                                <button className="save" disabled={loading} onClick={handleDelete}>
                                    Yes
                                    {loading && (
                                        <span
                                            className=" animate-spin h-5 ml-2 w-5 border-t-2 border-b-2 border-c4 rounded-full inline-block z-10"
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

export default DeleteModelModal