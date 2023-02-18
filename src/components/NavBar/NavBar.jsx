import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import './style.css'

const NavBar = () => {
  return (
    <nav>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link> 
    </nav>
  )
}

export default NavBar