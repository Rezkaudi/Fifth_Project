import './DeleteDataModal.css'
import { useState } from 'react'
import { deleteModelRow } from '../../features/model/handleRequests'
import Trash from '../../assets/images/icon _trash-dark.svg'
import { useSelector, useDispatch } from 'react-redux';


const DeleteDataModal = ({ rowId, modelName }) => {

    const [showModal, setShowModal] = useState(false);
    const { loading } = useSelector((state) => state.model)
    const dispatch = useDispatch()

    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    const handleDelete = async () => {
        console.log("delete", rowId);
        dispatch(deleteModelRow({ modelName, rowId})).unwrap().then(
            () => {
                handelShowModal()
            },
            (error) => {
                console.error("Failed to sign in:", error);
            }
        );
    }


    return (
        <>
            <button className='tableBtn' onClick={handelShowModal} title="delete">
                <img src={Trash} alt="delete" />
            </button>
            {showModal &&
                <div className='deleteModalContainer'>
                    <div className="content">
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Do you need to delete this row</h3>
                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" disabled={loading} onClick={handelShowModal}>No</button>
                                <button className="save" disabled={loading}  onClick={handleDelete}>Yes
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

export default DeleteDataModal