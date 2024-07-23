import './Dashboard.css'

import DashSidebar from '../../component/DashSidebar/DashSidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='dasboard'>
            <DashSidebar />
            <div className="default">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard