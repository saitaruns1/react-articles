import React, { useEffect, useState } from 'react'
import Home from './Pages/Home/Home'
import { Routes,Route } from 'react-router-dom'
import Article from './Pages/Article/Article'
import LoginPage from './Pages/LoginPage/LoginPage'
import SingupPage from './Pages/SignupPage/SignupPage'
import Profile from './Pages/Profile/Profile'
import CreateArticle from './Pages/CreateArticle/CreateArticle'
import EditArticle from './Pages/CreateArticle/EditArticle'
import NavBar from './components/NavBar/NavBar';
import authHeader from './Authheader'
import { API_URL } from './Authservice'
import axios from 'axios'

const App = () => {

  const [queryText,setQueryText] = useState("") 
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [loading,setLoading] = useState(true)

  const fetchData = async () => {
    const resp1 = await axios.get(API_URL + '/article', { headers: authHeader() });
    const resp2 = await axios.get(API_URL + '/categories')

    setArticles(resp1.data)
    console.log(resp1.data)

    const cat = resp2.data.map((c) => { return { text: c.category_name,callBack : searchArticlesByCategory } })

    setCategories(cat)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const searchArticles = async (query) => {
    // if(query==='') {
    //   fetchData()
    //   return
    // }
    setArticles([])
    setLoading(true)
    const resp = await axios.get(API_URL + '/articlefilter/' + query)
    console.log(resp)
    setArticles(resp.data)
    setLoading(false)
  }

  const searchArticlesByCategory = async (cat)=>{
    axios.get(API_URL+'/categoryfilter/'+cat)
    .then((resp)=>{
      console.log(resp)
      setArticles(resp.data)
    })
  }

  return (
    <div>
      <NavBar queryText={queryText} setQueryText={setQueryText} onSearchBtnClicked={searchArticles}  />
    <Routes>
        <Route path='/' element={<Home articles={articles} categories={categories} loading={loading}  />} />
        {/* <Route path='/s/:query' element={<Home articles={articles} categories={categories} />} /> */}
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