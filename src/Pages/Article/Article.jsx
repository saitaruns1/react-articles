import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authHeader from '../../Authheader'
import { API_URL } from '../../Authservice'
import "./style.css"

const Article = () => {
    const { id } = useParams()
    const [isLoading,setLoading] = useState(true)
    const [{ title, description, category_name, image_url, author, created_at, text_content }, setArticle] = useState({})
    useEffect(()=>{
        axios.get(API_URL+`/article/byarticleid/${id}`,{ headers : authHeader() })
        .then((response)=>{
            console.log(response)
            setArticle(response.data[0])
            setLoading(false)
        })
    },[])

    if(isLoading) return <h1>Loading</h1>

    return  (
        <div className='article'>
            <h2 className='tag'>{category_name}</h2>
            <h1 className='title'>{title}</h1>
            <p className='desc'>{description}</p>
            {/* <div className='author-details'>
                <img className='avatar' src={author.image_url} alt="" />
                <div className='author-box'>
                    <h4 className='author-name'>{author.name}</h4>
                    <p className='created-at'>{created_at}</p>
                </div>
            </div> */}
            <img className='banner-image' src={image_url} alt="" />
            <p className='text'  dangerouslySetInnerHTML={{__html: text_content}}></p>
        </div>
    )
}

export default Article