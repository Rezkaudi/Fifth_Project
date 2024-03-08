import Sidbar from '../../component/Sidbar/Sidbar'
import './Account.css'
import { Outlet } from 'react-router-dom'

const Account = () => {
    return (
        <div className="account">
            <Sidbar />
            <Outlet />
        </div>
    )
}

export default Account