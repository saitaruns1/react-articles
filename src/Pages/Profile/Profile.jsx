import React, { useEffect, useState } from 'react'
import './style.css'

const Profile = () => {
    const [{ name, email, bio, img_url }, setProfile] = useState({
        name:"Name",
        email:"Email",
        bio:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        img_url:"https://source.unsplash.com/random"
    })

    // useEffect(()=>{
    //     setProfile()
    // },[])

    return (
        <div className='profile-layout container'>
            <div className="detail-box">
                <img src={img_url} alt="" />
                <div className="text-details">
                    <h1>{name}</h1>
                    <h2>{email}</h2>
                </div>
            </div>
            <p className="bio">
                {bio}
            </p>
        </div>
    )
}

export default Profile