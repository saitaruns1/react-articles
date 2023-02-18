import React from 'react'
import { Link } from 'react-router-dom'
import { getUserId } from '../../Authheader'
import Button from '../Button/Button'
import './style.css'

const NavBar = () => {
  return (
    <nav>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link> 
        <Link to={'/profile/'+getUserId()}>Profile</Link>
        <Link to="/createarticle">Create Article</Link>
    </nav>
  )
}

export default NavBar