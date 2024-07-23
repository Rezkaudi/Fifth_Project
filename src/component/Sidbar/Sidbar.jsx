import { Link } from 'react-router-dom'
import './Sidbar.css'

import { Api } from '../../Api/Api';
import Search from '../../assets/images/icon _search.svg'
import Cog from '../../assets/images/icon _cog.svg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { SideBarModel, SideBarItem } from '../SideBarItems/SideBarItems'
// import dash from '../../assets/images/icon _dash.svg'

import UserProjects from '../UserProjects/UserProjects';


const Sidbar = () => {

    const [activeSearch, setActiveSearch] = useState(false)
    const [activeSideBare, setActiveSideBare] = useState(true)
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
            <aside className={activeSideBare ? "sidebar active" : "sidebar"}>
                <div className="logo">
                    <Link to="/">LOGO</Link>
                </div>
                <ul className='sidebar-items'>
                    <li className='projects'>
                        <span>Projects</span>
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
                                            No models found for this project.
                                        </div>
                                        : <div className="loading">loading ...</div>
                            }
                        </ul>
                    </li>
                    <li className='plugins'>
                        <span>Plugins</span>
                        <ul>
                            <SideBarItem to="/account/dashboard" itemName="Dashboard" icon={Cog} />
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
            <div className={activeSideBare ? "menuBtn active" : "menuBtn"} onClick={handleActiveSideBare}>
                <span>+</span>
            </div>
        </>
    )
}

export default Sidbar