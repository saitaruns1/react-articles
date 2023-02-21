import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Card from '../../components/Card/Card';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { API_URL } from '../../Authservice'
import authHeader from '../../Authheader';
import { useNavigate, useParams } from 'react-router-dom';

function Home() {

  const navigate = useNavigate()
  const { query, category_text } = useParams()
  console.log(query, category_text)
  const [text, setText] = useState("")

  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    axios.get(API_URL + '/categories').then((res)=>{
      const cat = res.data.map((c) => { return { text: c.category_name, callBack: () => { navigate('/c/'+c.category_name) } } })
      setCategories(cat)
    })

    const fetchData = async () => {
      const resp = await axios.get(API_URL + '/article', { headers: authHeader() });
      console.log(resp)
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

    if ((query === undefined || query == "") && (category_text === undefined || category_text == "")) { 
      fetchData() 
    }
    else if(query !== undefined){
      searchArticles()
    }
    else{
      searchArticlesByCategory()
    }
  }, [query,category_text])
  

  return (
    <div className="App container">
      <div className='home-layout'>
        <div className='search-box'>
          <InputBox classname="search-input input-text" placeholder="search" text={text} setText={setText} />
          <ButtonGroup btns={categories} />
        </div>
        <div className='card-container'>
          {loading && <h1>Loading...</h1>}
          {articles && articles.map((article) => {
            return <Card key={article.id} article={article} author={{ user_id: article.user_id, username: article.username, image_url: "" }} />
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
