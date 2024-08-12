import { useEffect } from 'react'
import './DashModel.css'
import {useParams } from 'react-router-dom'
import DashTable from '../../component/DashTable/DashTable'
import DashModelHeader from '../../component/DashModelHeader/DashModelHeader'
import { getAllModelData, getModelFields } from '../../features/model/handleRequests'
import { useDispatch } from 'react-redux'


const DashModel = () => {
    const { modelName } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getAllModelData(modelName))
        dispatch(getModelFields(modelName))

    }, [dispatch,modelName])

    return (
        <div className='w-full px-5 pt-4'>
            <DashModelHeader modelName={modelName}/>
            <DashTable modelName={modelName}/>
        </div>
    )
}

export default DashModel