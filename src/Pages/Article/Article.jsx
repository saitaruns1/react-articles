import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import authHeader, { getUserId } from '../../Authheader'
import { API_URL, getCurrentUser } from '../../Authservice'
import "./style.css"
import { AiOutlineHeart } from 'react-icons/ai'
import { FcLike } from 'react-icons/fc'
import Comment from '../../components/Comment/Comment'
import InputBox from '../../components/InputBox/InputBox'
import Button from '../../components/Button/Button'

const Article = () => {
    const { id } = useParams()
    const [isLoading, setLoading] = useState(true)
    const [liked,setLiked] = useState(false)

    const [article, setArticle] = useState({})
    const [commentValue,setCommentValue] = useState("")
    const [comments,setComments] = useState([])

    const { title,
            description, 
            category_name, 
            image_url, 
            created_at, 
            text_content, 
            username, 
            user_id, 
            likes_count,
         } = article

    useEffect(() => {
        axios.get(API_URL + `/article/byarticleid/${id}/${getUserId()}`, { headers: authHeader() })
            .then((response) => {
                console.log(response)
                setArticle(response.data.article[0])
                setLiked(response.data.flag)
                setLoading(false)
            })

        axios.get(API_URL+ '/comment/'+id,{headers:authHeader()})
        .then((resp)=>{
            console.log(resp.data)
            setComments(resp.data)
        })
    }, [id])


    if (isLoading) return <h1>Loading</h1>

    const handleLike = ()=>{
        axios.post(API_URL+'/like/'+user_id+'/'+id,{},{ headers: authHeader() })
        .then((res)=>{
            console.log(res)
            setArticle(
                {...article,
                    likes_count: liked ? likes_count - 1 : likes_count+1
                }
            );
            setLiked((l)=>!l)
        }).catch((err)=>console.log(err))

    }

    const handleComment = ()=>{
        axios.post(API_URL+'/comment/'+getUserId()+'/'+id,{
            comment_text:commentValue
        },{headers:authHeader()})
        .then((res)=>{
            console.log(res)
            setComments([...comments,{id:comments[comments.length-1].id+1,username:getCurrentUser().user.username,comment_text:commentValue}])
        }).catch((err)=>console.log(err))
    }

    return (
        <div className='article'>
            <h2 className='tag'>{category_name}</h2>
            <h1 className='title'>{title}</h1>
            <h3 className='desc'>{description}</h3>
            <div className='author-details'>
                <img className='avatar' src={(image_url && image_url === "") ? image_url : "https://source.unsplash.com/random"} alt="" />
                <Link to={'/profile/' + user_id} className="author-box">
                    <h2 className='author-name'>{username}</h2>
                    <h4 className='created-at'>{created_at}</h4>
                </Link>
            </div>
            <img className='banner-image' src={(image_url && image_url === "") ? image_url : "https://source.unsplash.com/random"} alt="" />
            <div className='text' dangerouslySetInnerHTML={{ __html: text_content }}></div>
            <div className='footer'>
                <div onClick={handleLike} className="btn icon-btn liked" >
                    {liked ? <FcLike />
                    : <AiOutlineHeart/>}
                    <span>{likes_count} likes</span>
                </div>
                <div>
                    <h2 style={{padding:'10px'}}>Comments: </h2>
                    <div className='comment-box'>
                        <InputBox 
                        id="comment"
                        type="text"
                        placeholder="Enter your comment"
                        onChange={(e)=>setCommentValue(e.target.value)}
                        value={commentValue}
                         />
                         <Button text={"Comment"} callBack={handleComment} />
                    </div>
                    {comments && comments.map((com)=>{
                        return<Comment key={com.id} text={com.comment_text} user={com.username} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Article