import { Link } from 'react-router-dom'
import './MobileSidebar.css'

import { Api } from '../../Api/Api';
import Cog from '../../assets/images/icon _cog.svg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { SideBarItem } from '../SideBarItems/SideBarItems'
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"
import Logo from "../../assets/images/logo.png"
import DashProject from '../DashProject/DashProject';

const MobileSidebar = () => {

    const [activeSideBare, setActiveSideBare] = useState(false)
    const { userData } = useSelector((state) => state.user);
    const { userProjects } = useSelector((state) => state.allProjects);


    let handleActiveSideBare = () => {
        setActiveSideBare(pre => !pre)
    }

    useEffect(() => {
        if (window.innerWidth >= 1024) setActiveSideBare(true)
        else setActiveSideBare(false)
    }, [])

    return (
        <>
            <aside className={activeSideBare ? "MobileSidebar active" : "MobileSidebar unActive"}>
                <div className="logo">
                    <Link to="/account">
                        <img className='w-20' src={Logo} alt="logo" />
                    </Link>

                    <div className="menuBtn2" onClick={handleActiveSideBare}>
                        <span>&#10006;</span>
                    </div>
                </div>
                <ul className='sidebar-items'>
                    <li className='projects whitespace-nowrap'>
                        <Link to="/account" className='inline-block z-50'>
                            <span> &#x25c0; Projects</span>
                        </Link>

                        <ul>
                            {
                                userProjects && userProjects.length > 0 ?
                                    userProjects.map(item =>
                                        <DashProject key={item.id} projectId={item.id} projectName={item.name} />
                                    )
                                    : userProjects && userProjects.length === 0 ? // Corrected condition
                                        <div className="text-gray-600 text-sm">
                                            No project.
                                        </div>
                                        : <PrimaryLoading />
                            }
                        </ul>
                    </li>
                    <li className='plugins'>
                        <span>Plugins</span>
                        <ul>
                            <SideBarItem to="/account/schema" itemName="Schema" icon={Cog} />
                            <SideBarItem to="/account/tokens" itemName="Tokens" icon={Cog} />
                            <SideBarItem to="/logOut" itemName="LogOut" icon={Cog} />
                        </ul>
                    </li>
                </ul>

                {userData && <div className="user">
                    <div className="circle">
                        <img src={`${Api}${userData.profile_picture}`} alt="profile" />
                    </div>
                    <div className="userName">{userData.username}</div>
                </div>}
            </aside>
            <div onClick={handleActiveSideBare} className='burger fixed z-30 cursor-pointer text-c2 flex flex-col items-center justify-center gap-1 text-4xl top-2 right-2 w-7 h-7 border-2 border-c2 rounded'>
                <span className='w-5 h-[2px] bg-c2'></span>
                <span className='w-5 h-[2px] bg-c2'></span>
                <span className='w-5 h-[2px] bg-c2'></span>
            </div>
        </>
    )
}

export default MobileSidebar









