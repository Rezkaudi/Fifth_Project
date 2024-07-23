import { useEffect } from 'react'
import './Model.css'
import { useLocation, useParams } from 'react-router-dom'
import Table from '../../component/Table/Table'
import ModelHeader from '../../component/ModelHeader/ModelHeader'
import { useDispatch } from 'react-redux'
import { getAllModelData, getModelFields } from '../../features/model/handleRequests'

const Model = () => {
    const { modelName, projectName } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()

    var path = location.pathname
    path = path.replace("/account/", "")

    useEffect(() => {
        dispatch(getAllModelData(modelName))
        dispatch(getModelFields(modelName))
    }, [dispatch,modelName])

    return (
        <div className='w-full'>
            <ModelHeader path={path} modelName={modelName} projectName={projectName} />
            <Table modelName={modelName} />
        </div>
    )
}

export default Model