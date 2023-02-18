import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Card = ({ article, author }) => {

    // const { image, title, description:body, category, author, date, link } = article
    const { title, body: description,id,username,image_url,created_at,category_name } = article
    return (
        <Link to={`article/${id}`} className="card">
            <div className="card-header">
                <img src={image_url} alt="rover" />
            </div>
            <div className="card-body">
                <span className="card-tag tag-teal">{category_name}</span>
                <h4>
                    {title}
                </h4>
                <p>
                    {description}
                </p>
                <div className="user">
                    <img src={image_url} alt="user" />
                    <div className="user-info">
                        <h5>{username}</h5>
                        <small>{created_at}</small>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card