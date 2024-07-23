import { Navigate, Outlet} from 'react-router-dom';

const ProtectedRoute = () => {
    const userToken = localStorage.getItem('userToken')
    return(
        userToken ? <Outlet/> : <Navigate to="/signin"/>
    )
};

export default ProtectedRoute;