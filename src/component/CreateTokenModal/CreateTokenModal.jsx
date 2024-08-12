import './CreateTokenModal.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { creatUserToken, getUserTokens } from '../../features/user/handleRequests';

const CreateTokenModal = () => {

    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.user)

    const [checkboxState, setCheckboxState] = useState({
        read_P: "True",
        write_P: "True",
    });

    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(checkboxState);
        const data = new FormData();
        data.append('read_P', checkboxState.read_P);
        data.append('write_P', checkboxState.write_P);

        dispatch(creatUserToken(data)).unwrap().then(
            () => {
                dispatch(getUserTokens())
                handelShowModal()
            },
            (error) => {
                console.error("Failed to sign in:", error);
            }
        );
    };

    return (
        <>
            <button onClick={handelShowModal} className='createNew'>+ create token</button>
            {showModal &&
                <div className="CreateTokenModal">
                    <div className='modalContainer'>
                        <div className="content">
                            <div className="contentContainer">
                                {/*header*/}
                                <div className="modelHeader m-0">
                                    <div className=''>
                                        <h3>Create Token</h3>
                                    </div>
                                </div>
                                <hr className='bg-slate-500 h-[2px] mb-6' />

                                {/*body*/}
                                <div className="modelBody">
                                    <div className="selectedType mb-10">
                                        <div className="types grid grid-cols-1 md:grid-cols-2 gap-2">
                                            <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                <span className="flex-1">
                                                    <h5 className="text-xs">Read</h5>
                                                    <p className="text-[7px]">you can only read data without Write</p>
                                                </span>
                                                <span className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={checkboxState.read_P === "True"} // Adjusted to reflect the state
                                                        onChange={(e) => setCheckboxState(prev => ({ ...prev, read_P: e.target.checked ? "True" : "False" }))} // Update state on change
                                                    />
                                                    <span className={`relative w-10 h-[21px] border border-c1 ${checkboxState.read_P === "True" ? 'bg-c2' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${checkboxState.read_P === "True" ? 'peer-checked:bg-c2' : ''}`}></span>
                                                </span>
                                            </label>

                                            <label className='flex items-center justify-between p-3 gap-4 mx-2'>
                                                <span className="flex-1">
                                                    <h5 className="text-xs">Write</h5>
                                                    <p className="text-[7px]">you can only Write data without Reade</p>
                                                </span>
                                                <span className="inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        className="sr-only peer"
                                                        checked={checkboxState.write_P === "True"} // Adjusted to reflect the state
                                                        onChange={(e) => setCheckboxState(prev => ({ ...prev, write_P: e.target.checked ? "True" : "False" }))} // Update state on change
                                                    />
                                                    <span className={`relative w-10 h-[21px] border border-c1 ${checkboxState.write_P === "True" ? 'bg-c2' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${checkboxState.write_P === "True" ? 'peer-checked:bg-c2' : ''}`}></span>
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-between gap-2 p-5 bg-[#bbb]">
                                    <button className="close5" onClick={handelShowModal}>Close</button>
                                    <button className="save5 flex items-center justify-center g-4" onClick={handleSubmit}>
                                        Create
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
                </div>
            }
        </>
    );
}

export default CreateTokenModal