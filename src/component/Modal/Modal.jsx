import './Modal.css'
import { useState } from 'react'


const Modal = ({ content }) => {

    const [showModal, setShowModal] = useState(false);

    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    return (
        <>
            <button onClick={handelShowModal}>{content}</button>
            {showModal &&
                <div className="mainModal">
                    <div className='modalContainer'>
                    <div className="content">
                        <div className="contentContainer">
                            {/*header*/}
                            <div className="modelHeader">
                                <h3>Modal Title</h3>
                            </div>
                            {/*body*/}
                            <div className="modelBody">

                            </div>
                            {/*footer*/}
                            <div className="modelFooter">
                                <button className="close" onClick={handelShowModal}>Close</button>
                                <button className="save" onClick={handelShowModal}>Save Changes</button>
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

export default Modal