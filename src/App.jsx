import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// section
import Container from './section/Container/Container'
import Footer from './section/Footer/Footer'
import Header from './section/Header/Header'

// pages
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'

import PageNotFound from './pages/404/PageNotFound'



const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  )
}

export default App