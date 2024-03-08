import { Outlet } from 'react-router-dom'
import './Models.css'

const Models = () => {
    return (
        <div className='pl-8 bg-c4 flex-1 h-[calc(100vh-8px)] rounded'>
            Models
            <Outlet />
        </div>
    )
}

export default Models