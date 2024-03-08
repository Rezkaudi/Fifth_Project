import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import {  useState } from 'react'

// pages
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'

import PageNotFound from './pages/404/PageNotFound'
import Account from './pages/Account/Account'
import Models from './pages/Models/Models'
import Model from './pages/Model/Model'


import ModelsContext from './Context/ModelsContext'

const App = () => {
  const [models, setModels] = useState([
    {
      id: 1,
      name: "users1"
    },
    {
      id: 2,
      name: "users2"
    },
    {
      id: 3,
      name: "users3"
    },
    {
      id: 4,
      name: "users4"
    }
  ])


  // const [models, setModels] = useState([])
  const value = { models, setModels }


  return (
    <>
      <ModelsContext.Provider value={value}>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            {/* -------------------------------------------- */}
            <Route path='account' element={<Account />}>

              <Route path='models' element={<Models />} >
                {
                  models && models.map((item) => <Route key={item.id} path={item.name} element={<Model />} />)
                }
                {/* <Route path=":model" element={<Model />} /> */}
                <Route path='*' element={<PageNotFound />} />
              </Route>

              <Route path='dashboard' element={<Dashboard />} />
              <Route path='*' element={<PageNotFound />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Router>
      </ModelsContext.Provider>
    </>
  )
}

export default App