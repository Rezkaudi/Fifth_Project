import { Link } from 'react-router-dom'
import './Sidbar.css'

const Sidbar = () => {
    return (
        <aside className="sidebar">
            <div className="logo">
                LOGO
            </div>
            <ul className='sidebar-items'>
                <li>
                    <span>Models</span>
                    <ul>
                        <li><Link to='/account/models/users'>users</Link></li>
                        <li><Link to='/account/models/books'>books</Link></li>
                    </ul>
                </li>
                <li>
                    <span>Plugins</span>
                    <ul>
                        <li><Link to='/account/dashboard'>Dashboard</Link></li>
                        <li><Link to='/account/setting'>Setting</Link></li>
                    </ul>
                </li>
            </ul>
        </aside>
    )
}

export default Sidbar