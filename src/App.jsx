import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from './store/store';
import { useEffect } from "react"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// pages
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'

import PageNotFound from './pages/404/PageNotFound'
import Account from './pages/Account/Account'
import Project from './pages/Project/Project'
import Model from './pages/Model/Model'
import DashModel from './pages/DashModel/DashModel'
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute'
import Tokens from "./pages/Tokens/Tokens"
import LogOut from "./pages/LogOut/LogOut"
import 'aos/dist/aos.css';
import AOS from 'aos';


const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Global duration for all animations
      easing: 'ease-in-out', // Global easing for all animations
      delay: 0, // Global delay for all animations
      once: true, // Whether the animation should only play once
    });
  }, []);
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='logOut' element={<LogOut />} />
          {/* -------------------------------------------- */}
          <Route element={<ProtectedRoute />}>
            <Route path='account' element={<Account />}>

              <Route path=':projectName' element={<Project />}>
                <Route path=':modelName' element={<Model />} />
              </Route>

              <Route path='dashboard' element={<Dashboard />}>
                <Route path=':projectName' element={<Project />}>
                  <Route path=':modelName' element={<DashModel />} />
                </Route>
              </Route>

              <Route path='tokens' element={<Tokens />} />
            </Route>
          </Route>
          {/* -------------------------------------------- */}

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App