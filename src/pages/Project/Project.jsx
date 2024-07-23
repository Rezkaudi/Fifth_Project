import { Outlet } from 'react-router-dom'
import './Project.css'

const Project = () => {
    return (
        <div className='px-3 bg-c4 flex-auto h-[calc(100vh-8px)] rounded]'>
            <Outlet />
        </div>
    )
}

export default Project