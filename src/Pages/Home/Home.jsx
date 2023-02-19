import axios from 'axios';
import { useEffect, useState } from 'react';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import Card from '../../components/Card/Card';
import InputBox from '../../components/InputBox/InputBox';
import './style.css'
import { API_URL } from '../../Authservice'
import authHeader from '../../Authheader';
import { useParams } from 'react-router-dom';

function Home({articles,categories,loading}) {

  const { query } = useParams()
  const [text, setText] = useState("")

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
