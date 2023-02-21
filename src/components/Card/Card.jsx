import axios from 'axios'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import authHeader, { getUserId } from '../../Authheader'
import { API_URL } from '../../Authservice'
import Button from '../Button/Button'
import './style.css'
import { format } from 'date-fns'

const Card = ({ article, author }) => {

    const navigate = useNavigate()

    // const { image, title, description:body, category, author, date, link } = article
    const location = useLocation();
    const { title, body: description, id, image_url, created_at, category_name } = article
    const { user_id, username, image_url: user_img } = author

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(API_URL + '/article/' + id, { headers: authHeader() })
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
        e.stopPropagation();
    }

    const handleEdit = (e) => {
        e.preventDefault();
        navigate("/article/edit/"+id);
        e.stopPropagation();
    }

    return (
        <div onClick={()=>{navigate(`/article/${id}`)}} className="card anchor">
            <div className="card-header">
                <img src={(image_url && image_url === '') ? image_url : "https://source.unsplash.com/random"} alt="rover" />
                {location.pathname === `/profile/${getUserId()}` && <>
                    <Button classname="edit-btn btn btn-secondary" text="Edit" callBack={handleEdit} />
                    <Button classname="delete-btn btn btn-secondary" text="Delete" callBack={handleDelete} />
                </>}
            </div>
            <div className="card-body">
                <span className="card-tag tag-teal">{category_name}</span>
                <h2>
                    {title}
                </h2>
                <h3>
                    {description}
                </h3>
                <div className='anchor' onClick={()=>{navigate(`/profile/${user_id}`)}}>
                    <div className="user">
                        <img src={(user_img && user_img === '') ? user_img : "https://source.unsplash.com/random"} alt="user" />
                        <div className="user-info">
                            <h5>{username}</h5>
                            <small>{format(new Date(created_at), 'dd/MM/yyyy')}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card