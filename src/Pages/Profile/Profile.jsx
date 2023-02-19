import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import authHeader, { getUserId } from '../../Authheader'
import { API_URL } from '../../Authservice'
import Button from '../../components/Button/Button'
import './style.css'
import InputBox from '../../components/InputBox/InputBox'
import { useFormik } from 'formik'
import Card from '../../components/Card/Card'


const validate = values => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required'
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.bio) {
        errors.bio = 'Required'
    }

    return errors;
};



const Profile = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [user, setProfile] = useState({})
    const [articles, setArticles] = useState([])

    const { username, email, description, user_img_url } = user

    const onSubmit = (values) => {
        const prof = {
            username: values.username,
            email: values.email,
            image_url: '',
            description: values.bio
        }
        axios.put(API_URL + `/profile/${id}`,
            prof
            , { headers: authHeader() })
            .then((response) => {
                console.log(response)
                window.location.reload()
            })
    }

    const formik = useFormik({
        initialValues: {
            username: (username !== undefined || username !== null) ? username : "",
            email: (email !== undefined || email !== null) ? email : "",
            // image: img_url,
            bio: (description !== undefined || description !== null) ? description : ""
        },
        enableReinitialize: true,
        onSubmit,
        validate
    });

    useEffect(() => {
        axios.get(API_URL + `/profile/${id}`, { headers: authHeader() })
            .then((response) => {
                setProfile(response.data.user)
                setArticles(response.data.article)
                setIsLoading(false)
            })
    }, [id])


    if (isLoading) return <h1>Loading...</h1>

    return (
        <div className='profile-layout container'>
            {!editMode ? <div className='det'>
                <div className="detail-box">
                <img src={(user_img_url && user_img_url==='') ? user_img_url : "https://source.unsplash.com/random"} alt="rover" />
                    <div className="text-details">
                        <h1>{username}</h1>
                        <h2>{email}</h2>
                    </div>
                    {id == getUserId() && <Button text="Edit" callBack={() => setEditMode((x) => !x)} />}
                </div>
                <p className="bio">
                    {description}
                </p>
            </div> :
                <form onSubmit={formik.handleSubmit}>
                    <div className="detail-box">
                    <img src={(user_img_url && user_img_url==='') ? user_img_url : "https://source.unsplash.com/random"} alt="rover" />
                        <div className="text-details">
                            <InputBox
                                id="username"
                                name="username"
                                // label="User Name"
                                type="text"
                                placeholder="Enter your Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                            />
                            {formik.touched.username && formik.errors.username ? <div>{formik.errors.username}</div> : null}
                            <InputBox
                                id="email"
                                name="email"
                                // label="Email"
                                type="email"
                                placeholder="Enter your Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        </div>
                        {id == getUserId() && <Button text="Cancel" callBack={() => setEditMode((x) => !x)} />}
                    </div>
                    <div className="bio">
                        <InputBox
                            id="bio"
                            name="bio"
                            // label="Bio"
                            type="text"
                            placeholder="Enter your Bio"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.bio}
                        />
                        {formik.touched.bio && formik.errors.bio ? <div>{formik.errors.bio}</div> : null}
                    </div>
                    <Button text="Submit" classname="btn btn-primary" callBack={onSubmit} />
                </form>}
            <div className='card-container'>
                {articles && articles.map((article) => {
                    return <Card key={article.id} article={article} author={{user_id:article.user_id,...user}} />
                })}
            </div>
        </div>
    )
}

export default Profile