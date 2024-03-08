import { Link } from 'react-router-dom'
import './Sidbar.css'
import { useContext } from 'react';


import Search from '../../assets/images/icon _search.svg'
import Cog from '../../assets/images/icon _cog.svg'
import { useEffect, useState } from 'react'
import { SideBarModel, SideBarItem } from '../SideBarItems/SideBarItems'
// import dash from '../../assets/images/icon _dash.svg'

import ModelsContext from '../../Context/ModelsContext';


const Sidbar = () => {

    const [activeSearch, setActiveSearch] = useState(false)
    const [activeSideBare, setActiveSideBare] = useState(true)
    const { models } = useContext(ModelsContext)

    const [instansModel, setInstansModel] = useState(models)
    const [searsh, setSearsh] = useState("")


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


    let handelChangeFilter = (e) => {
        setSearsh(e.target.value.toLowerCase())
    }

    const filteredArray = instansModel.filter(str => str.name.toLowerCase().includes(searsh))



    return (
        <>
            <aside className={activeSideBare ? "sidebar active" : "sidebar"}>
                <div className="logo">
                    <Link to="/">LOGO</Link>
                </div>
                <ul className='sidebar-items'>
                    <li className='models'>
                        <span>Models</span>
                        <i className='search'>
                            <img src={Search} alt="Search" onClick={handleActiveSearch} />
                            <input className={activeSearch ? "activeSearch" : ""} type="search" onChange={handelChangeFilter} />
                        </i>
                        <ul>
                            {filteredArray ?
                                filteredArray.map((item, index) => (
                                    <SideBarModel key={index} to={`/account/models/${item.name}`} modelName={item.name} />
                                )) :
                                <li>loading ...</li>
                            }
                            {/* {instansModel && instansModel.map((item, index) => (
                                <SideBarModel key={index} to={`/account/models/${item.name}`} modelName={item.name} />
                            ))} */}
                        </ul>
                    </li>
                    <li className='plugins'>
                        <span>Plugins</span>
                        <ul>
                            <SideBarItem to="/account/dashboard" itemName="Dashboard" icon={Cog} />
                            <SideBarItem to="/account/setting" itemName="Setting" icon={Cog} />
                        </ul>
                    </li>
                </ul>

                <div className="user">
                    <div className="circle"></div>
                    <div className="userName">Rezk Audi</div>
                </div>
            </aside>
            <div className={activeSideBare ? "menuBtn active" : "menuBtn"} onClick={handleActiveSideBare}>
                <span>+</span>
            </div>
        </>
    )
}

export default Sidbar