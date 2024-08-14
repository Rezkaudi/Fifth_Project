import { Link } from 'react-router-dom'
import './Sidbar.css'

import { Api } from '../../Api/Api';
import Search from '../../assets/images/icon _search.svg'
import Cog from '../../assets/images/icon _cog.svg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { SideBarItem } from '../SideBarItems/SideBarItems'
// import dash from '../../assets/images/icon _dash.svg'
import PrimaryLoading from "../PrimaryLoading/PrimaryLoading"
import UserProjects from '../UserProjects/UserProjects';
import Logo from "../../assets/images/logo.png"


const Sidbar = () => {

    const [activeSearch, setActiveSearch] = useState(false)
    const [activeSideBare, setActiveSideBare] = useState(false)
    const { userData } = useSelector((state) => state.user);
    const { userProjects } = useSelector((state) => state.allProjects);

    let handleActiveSearch = () => {
        setActiveSearch(pre => !pre)
    }

    let handleActiveSideBare = () => {
        setActiveSideBare(pre => !pre)
    }

    useEffect(() => {
        setActiveSearch(false)
        if (window.innerWidth >= 1024) setActiveSideBare(true)
        else setActiveSideBare(false)
    }, [])


    // let handelChangeFilter = (e) => {
    //     setSearsh(e.target.value.toLowerCase())
    // }


    // const filteredArray = instansModel.filter(str => str.name.toLowerCase().includes(searsh))



    return (
        <>
            <aside className={activeSideBare ? "sidebar active" : "sidebar unActive"}>
                <div className="logo">
                    <Link to="/">
                        <img className='w-20' src={Logo} alt="logo" />
                    </Link>
                </div>
                <ul className='sidebar-items'>
                    <li className='projects'>
                        <Link to="/account" className='inline-block z-50'>
                            <span> &#x25c0; Projects</span>
                        </Link>
                        <i className='search'>
                            <img src={Search} alt="Search" onClick={handleActiveSearch} />
                            <input className={activeSearch ? "activeSearch" : ""} type="search" />
                        </i>
                        <ul>
                            {
                                userProjects && userProjects.length > 0 ?
                                    userProjects.map(item =>
                                        <UserProjects key={item.id} id={item.id} projectName={item.name} />
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
            <aside className={activeSideBare ? "sidebar2 active" : "sidebar2 unActive"}></aside>
            <div className={activeSideBare ? "menuBtn active" : "menuBtn unActive"} onClick={handleActiveSideBare}>
                <span>+</span>
            </div>
        </>
    )
}

export default Sidbar