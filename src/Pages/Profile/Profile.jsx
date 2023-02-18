import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authHeader from '../../Authheader'
import { API_URL } from '../../Authservice'
import './style.css'

const Profile = () => {
    const {id} = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [{ username, email, description, img_url }, setProfile] = useState({})

    useEffect(()=>{
        // const {user} = JSON.parse(localStorage.getItem('user'));
        axios.get(API_URL+`/profile/${id}`,{headers:authHeader()})
        .then((response)=>{
            console.log(response)
            setProfile(response.data)
            setIsLoading(false)
        })
    },[])

    if(isLoading) return <h1>Loading...</h1>

    return (
        <div className='profile-layout container'>
            <div className="detail-box">
                <img src={img_url} alt="" />
                <div className="text-details">
                    <h1>{username}</h1>
                    <h2>{email}</h2>
                </div>
            </div>
            <p className="bio">
                {description}
            </p>
        </div>
    )
}

export default Profile