import { useEffect } from 'react'
import './DashModel.css'
import { useLocation, useParams } from 'react-router-dom'
import DashTable from '../../component/DashTable/DashTable'
import DashModelHeader from '../../component/DashModelHeader/DashModelHeader'
import { getAllModelData, getModelFields } from '../../features/model/handleRequests'
import { useDispatch } from 'react-redux'


const DashModel = () => {
    const { modelName, projectName } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()

    var model = location.pathname
    model = model.replace("/account/", "")


    useEffect(() => {
        dispatch(getAllModelData(modelName))
        dispatch(getModelFields(modelName))

    }, [dispatch,modelName])

    return (
        <div className='w-full'>
            <DashModelHeader path={model} modelName={modelName} projectName={projectName}/>
            <DashTable modelName={modelName}/>
        </div>
    )
}

export default DashModel