import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Card from '../../components/Card/Card';
import InputBox from '../../components/InputBox/InputBox';
import NavBar from '../../components/NavBar/NavBar';
import './style.css'
import {API_URL} from '../../Authservice'
import authHeader from '../../Authheader';

function Home() {

  const [text, setText] = useState("")
  const [articles, setArticles] = useState([])

  useEffect(() => {
    axios.get(API_URL+'/article',{ headers: authHeader() })
    .then((response)=>setArticles(response.data))
  }, [])

  const btns = [
    {
      text: "Grocery",
      callBack: ()=>{}
    },
    {
      text: "Category 2",
      callBack: ()=>{}
    },
    {
      text: "Category 3",
      callBack: ()=>{}
    },
    {
      text: "Category 4",
      callBack: ()=>{}
    }
  ]

  return (
    <div className="App container">
      <NavBar />
      <div className='home-layout'>
        <div className='search-box'>
          <InputBox classname="search-input" placeholder="search" text={text} setText={setText} />
          <ButtonGroup btns={btns} />
        </div>
        <div className='card-container'>
          {articles && articles.map((article) => {
            return <Card key={article.id} article={article} />
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
