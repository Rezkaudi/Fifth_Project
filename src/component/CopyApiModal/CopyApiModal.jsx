import './CopyApiModal.css'
import { useState } from 'react'
import Copy from '../../assets/images/copy-duplicate-c2.svg'
import { Api } from '../../Api/Api'


const CopyApiModal = ({ modelName }) => {

    const [showModal, setShowModal] = useState(false);

    const urls = [
        {
            id: 1,
            request: "GET",
            url: `${Api}/data/${modelName}/`
        },
        {
            id: 2,
            request: "POST",
            url: `${Api}/data-enter/${modelName}/`
        },
        {
            id: 3,
            request: "UPDATE",
            url: `${Api}/edit/${modelName}/{rowId}/`
        },
        {
            id: 4,
            request: "DELETE",
            url: `${Api}/edit/${modelName}/{rowId}/`
        },
        {
            id: 5,
            request: "GET Filter",
            url: `${Api}/filtered-data/${modelName}?{feildName}={value}/`
        },
    ]
    const copyUrl = async (url) => {
        try {
            await navigator.clipboard.writeText(url)
            alert("copy url successfully")

        } catch (err) {
            console.err(err);
        }
    }


    const handelShowModal = () => {
        setShowModal(pre => !pre)
    }

    return (
        <>
            <button title='copy url' onClick={handelShowModal}>
                <img src={Copy} alt="copy" />
            </button>
            {showModal &&
                <div className="CopyApiModal">
                    <div className='modalContainer'>
                        <div className="content">
                            <div className="contentContainer">
                                {/*header*/}
                                <div className="modelHeader">
                                    <h3>Copy Api</h3>
                                </div>
                                <hr className='bg-slate-500 h-[2px] mx-5' />
                                {/*body*/}
                                <div className="modelBody">
                                    <ol className='mb-5'>
                                        {urls.map(item =>
                                            <li key={item.id} className='urls'>
                                                <span onClick={() => { copyUrl(item.url) }} className='xl:hidden ml-auto cursor-pointer hover:outline outline-c2 rounded outline-2 p-1'>
                                                    <img className='w-6 h-6' src={Copy} alt="copy" />
                                                </span>
                                                <span className=' font-bold text-c1 text-xs lg:text-base xl:w-16' >{item.request} :</span>

                                                <p className='bg-white rounded p-2 text-xs truncate max-w-[90%]'>{item.url}</p>
                                                <span onClick={() => { copyUrl(item.url) }} className='copyBtn'>
                                                    <img className='w-6 h-6' src={Copy} alt="copy" />
                                                </span>
                                            </li>
                                        )}
                                    </ol>
                                    <div className='flex flex-wrap'>
                                        <span className='bg-white p-1 rounded m-1'> {`?{feildName}={value}`} : &#61;</span>
                                        <span className='bg-white p-1 rounded m-1'> {`?{feildName}__lt={value}`} : &lt;</span>
                                        <span className='bg-white p-1 rounded m-1'> {`?{feildName}__gt={value}`} : &gt;</span>
                                        <span className='bg-white p-1 rounded m-1'> {`?{feildName}__lte={value}`} : &le;</span>
                                        <span className='bg-white p-1 rounded m-1'> {`?{feildName}__gte={value}`} : &ge;</span>
                                        <span className='bg-white p-1 rounded m-1'> {`?{feildName}__ne={value}`} : &ne;</span>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="modelFooter5">
                                    <button className="close" onClick={handelShowModal}>Close</button>
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

export default CopyApiModal