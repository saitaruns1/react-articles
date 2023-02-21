import React from 'react'
import Home from './Pages/Home/Home'
import { Routes,Route } from 'react-router-dom'
import Article from './Pages/Article/Article'
import LoginPage from './Pages/LoginPage/LoginPage'
import SingupPage from './Pages/SignupPage/SignupPage'
import Profile from './Pages/Profile/Profile'
import CreateArticle from './Pages/CreateArticle/CreateArticle'
import EditArticle from './Pages/CreateArticle/EditArticle'
import NavBar from './components/NavBar/NavBar';

const App = () => {

  return (
    <div>
      <NavBar  />
    <Routes>
        <Route path='/' element={<Home  />} />
        <Route path='/s/:query' element={<Home />} />
        <Route path='/c/:category_text' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SingupPage />} />
        <Route path='/article/edit/:id' element={<EditArticle />} />
        <Route path='/article/new' element={<CreateArticle />} />
        <Route path='/article/:id' element={<Article />} />
        <Route path='/profile/:id' element={<Profile />} />
    </Routes>
    </div>
  )
}

export default App