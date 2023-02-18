import React from 'react'
import Home from './Pages/Home/Home'
import { Routes,Route } from 'react-router-dom'
import Article from './Pages/Article/Article'
import LoginPage from './Pages/LoginPage/LoginPage'
import SingupPage from './Pages/SignupPage/SignupPage'
import Profile from './Pages/Profile/Profile'
import CreateArticle from './Pages/CreateArticle/CreateArticle'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SingupPage />} />
        <Route path='/article/:id' element={<Article />} />
        <Route path='/createarticle' element={<CreateArticle />} />
        <Route path='/profile/:id' element={<Profile />} />
    </Routes>
  )
}

export default App