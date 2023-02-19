import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import authHeader from '../../Authheader'
import { API_URL } from '../../Authservice'
import "./style.css"

const Article = () => {
    const { id } = useParams()
    const [isLoading,setLoading] = useState(true)
    const [{ title, description, category_name, image_url, created_at, text_content, username,user_id }, setArticle] = useState({})
    useEffect(()=>{
        axios.get(API_URL+`/article/byarticleid/${id}`,{ headers : authHeader() })
        .then((response)=>{
            console.log(response)
            setArticle(response.data[0])
            setLoading(false)
        })
    },[id])

    if(isLoading) return <h1>Loading</h1>

    return  (
        <div className='article'>
            <h2 className='tag'>{category_name}</h2>
            <h1 className='title'>{title}</h1>
            <h3 className='desc'>{description}</h3>
            <div className='author-details'>
                <img className='avatar' src={(image_url && image_url==="") ? image_url : "https://source.unsplash.com/random" } alt="" />
                <Link to={'/profile/'+user_id} className="author-box">
                    <h2 className='author-name'>{username}</h2>
                    <h4 className='created-at'>{created_at}</h4>
                </Link>
            </div>
            <img className='banner-image' src={(image_url && image_url==="") ? image_url : "https://source.unsplash.com/random" } alt="" />
            <div className='text'  dangerouslySetInnerHTML={{__html: text_content}}></div>
        </div>
    )
}

export default Article