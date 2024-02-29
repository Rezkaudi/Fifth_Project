import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


// pages
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'

import PageNotFound from './pages/404/PageNotFound'
import Account from './pages/Account/Account'
import Models from './pages/Models/Models'
import Model from './pages/Model/Model'



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          {/* -------------------------------------------- */}
          <Route path='account' element={<Account />}>

            <Route path='models' element={<Models />} >
              <Route path=':model' element={<Model />} />
            </Route>

            <Route path='dashboard' element={<Dashboard />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App