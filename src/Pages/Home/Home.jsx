import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Card from '../../components/Card/Card';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { API_URL } from '../../Authservice'
import authHeader from '../../Authheader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function Home() {

  const navigate = useNavigate()
  const location = useLocation()
  const { query, category_text } = useParams()
  const [text, setText] = useState("")

  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    axios.get(API_URL + '/categories').then((res) => {
      const cat = res.data.map((c) => { return { text: c.category_name, callBack: () => { navigate('/c/' + c.category_name) } } })
      setCategories(cat)
    })

    const fetchData = async () => {
      const resp = await axios.get(API_URL + '/article', { headers: authHeader() });
      setArticles(resp.data)
      setLoading(false)
    }

    const searchArticles = async () => {
      setArticles([])
      setLoading(true)
      const resp = await axios.get(API_URL + '/articlefilter/' + query)
      setArticles(resp.data)
      setLoading(false)
    }

    const searchArticlesByCategory = async () => {
      setArticles([])
      setLoading(true)
      const resp = await axios.get(API_URL + '/categoryfilter/' + category_text)
      setArticles(resp.data)
      setLoading(false)
    }

    const getMostLikedArticles = async () => {
      setArticles([])
      setLoading(true)
      const res = await axios.get(API_URL + '/mostliked')
      setArticles(res.data)
      setLoading(false)
    }

    if (location.pathname === '/mostliked') {
      getMostLikedArticles()
    }
    else if ((query === undefined || query === "") && (category_text === undefined || category_text === "")) {
      fetchData()
    }
    else if (query !== undefined) {
      searchArticles()
    }
    else if (category_text !== undefined) {
      searchArticlesByCategory()
    }
  }, [query, category_text, location.pathname, navigate])

  const getHeading = ()=>{
    const loc = location.pathname
    if(loc==='/'){
      return "All Articles"
    }
    if(loc==='/mostliked'){
      return "Most Liked"
    }
  }

  return (
    <div className="App container">
      <div className='home-layout'>
        <div className='search-box'>
          <InputBox classname="search-input input-text" placeholder="search" text={text} setText={setText} />
          <ButtonGroup btns={categories} />
        </div>
        <div className='main-container'>
          <div className='filter'>
            <h2>{getHeading()}</h2>
            <select className='input-box input-text' onChange={(e)=>navigate('/'+e.target.value)}>
              <option value="">Filter</option>
              <option value="mostliked">Most Liked</option>
            </select>
          </div>
          <div className='card-container'>
            {loading && <h1>Loading...</h1>}
            {articles && articles.map((article) => {
              return <Card key={article.id} article={article} author={{ user_id: article.user_id, username: article.username, image_url: "" }} />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
