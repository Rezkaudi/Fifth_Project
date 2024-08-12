import './TokensTable.css'
import { useSelector, useDispatch } from "react-redux";
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"
import CopyIcon from "../../assets/images/copy-duplicate-c2.svg"
import { refreshToken } from '../../features/user/handleRequests';
import { useState } from 'react';

const TokensTable = () => {

    const { userTokens, loading } = useSelector(state => state.user)
    const [tokenClick ,setTokenClick]=useState("")

    const dispatch = useDispatch()

    const handleCopy = (x) => {
        navigator.clipboard.writeText(x).then(() => {
            alert('Text copied successful');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    const handleRefresh = (id) => {
        setTokenClick(id)
        dispatch(refreshToken(id))
    }

    return (
        <div className="TokensTable">
            <div className="tableContainer">
                {userTokens ?
                    <table>
                        <thead>
                            <tr>
                                <th scope="col" className="relative px-2 py-1 border-r border-c2">
                                    <span className="sr-only">index</span>
                                </th>
                                <th scope="col" className="col">
                                    Token
                                </th>
                                <th scope="col" className="col">
                                    Read
                                </th>
                                <th scope="col" className="col">
                                    write
                                </th>
                                <th scope="col" className="relative px-6 py-1">
                                    <span className="sr-only">Edit</span>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {userTokens?.length === 0 ?
                                <tr>
                                    <td colSpan={4} className="cell text-center">no Tokens</td>
                                </tr>
                                : userTokens?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="index">
                                            {index + 1}
                                        </td>
                                        <td className="cell w-fit overflow-x-hidden break-words">
                                            <span>{"Token " + item.token}</span>
                                        </td>
                                        <td className="cell max-w-20 overflow-x-hidden break-words ">
                                            {item.Read ?
                                                <span className='text-green-500'>&#10004;</span> :
                                                <span className='text-red-500'>&#10006;</span>
                                            }
                                        </td>
                                        <td className="cell max-w-20 overflow-x-hidden break-words ">
                                            {item.Write ?
                                                <span className='text-green-500'>&#10004;</span> :
                                                <span className='text-red-500'>&#10006;</span>
                                            }                                        </td>
                                        <td name="delete" className="cell cellBtn1 flex items-center justify-center gap-2">
                                            <button className='text-c2 text-2xl flex items-center justify-center w-[25px] h-[25px] hover:border-2 border-c2 rounded' onClick={() => handleRefresh(item.token)} title='refresh'>
                                                <span className={loading && tokenClick === item.token ? "animate-spin" : ""}>&#11118;</span>
                                            </button>

                                            <button className='flex items-center justify-center w-[25px] h-[25px] hover:border-2 border-c2 rounded' onClick={() => handleCopy("Token " + item.token)} title='copy'>
                                                <img className='pt-1 w-[21px]' src={CopyIcon} alt="copy " />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    : <PrimaryLoading />
                }
            </div>

        </div>
    );
};

export default TokensTable;