import { useEffect } from 'react'
import './Model.css'
import { useLocation, useParams, Outlet, useNavigate } from 'react-router-dom'
import Table from '../../component/Table/Table'
import ModelHeader from '../../component/ModelHeader/ModelHeader'
import { useDispatch } from 'react-redux'
import { getAllModelData, getModelFields } from '../../features/model/handleRequests'

const Model = () => {
    const { modelName, projectName } = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    var path = location.pathname
    path = path.replace("/account/", "")

    useEffect(() => {
        dispatch(getAllModelData(modelName)).then((payload) => {
            console.log(payload);
            if (!payload.payload) {
                navigate("/notfound")
            }
        })
        dispatch(getModelFields(modelName))


        console.log("loc", location.pathname);
    }, [dispatch, modelName, location,navigate])

    return (
        <>
            {location.pathname === `/account/${projectName}/${modelName}` ?
                <div className='w-full p-2 lg:px-5'>
                    <ModelHeader path={path} modelName={modelName} projectName={projectName} />
                    <Table modelName={modelName} projectName={projectName} />
                </div> :
                <Outlet />
            }
        </>
    )
}

export default Model