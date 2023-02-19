import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Card from '../../components/Card/Card';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import {API_URL} from '../../Authservice'
import authHeader from '../../Authheader';

function Home() {
  const [text, setText] = useState("")
  const [articles, setArticles] = useState([])
  const [categories,setCategories]= useState([])

  useEffect(() => {
    const fetchData = async () =>{
      const resp1 = await axios.get(API_URL+'/article',{ headers: authHeader() });
      const resp2 = await axios.get(API_URL+'/categories')

      setArticles(resp1.data)

      console.log(resp1.data)

      const cat = resp2.data.map((c)=>{return{text:c.category_name}})

      setCategories(cat)
    }
    fetchData()
  }, [])

  return (
    <div className="App container">
      <div className='home-layout'>
        <div className='search-box'>
          <InputBox classname="search-input input-text" placeholder="search" text={text} setText={setText} />
          <ButtonGroup btns={categories} />
        </div>
        <div className='card-container'>
          {articles && articles.map((article) => {
            return <Card key={article.id} article={article} author={{user_id:article.user_id,username:article.username,image_url:""}} />
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
