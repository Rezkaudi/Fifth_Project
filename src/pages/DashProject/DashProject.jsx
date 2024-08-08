import { Outlet } from 'react-router-dom'
import './DashProject.css'

const DashProject = () => {
    return (
        <div className='projectDash'>
            <div className="default">
                <Outlet />
            </div>
        </div>
    )
}

export default DashProject