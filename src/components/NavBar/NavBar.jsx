import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserId } from '../../Authheader'
import { logout_user } from '../../Authservice'
import Button from '../Button/Button'
import InputBox from '../InputBox/InputBox'
import './style.css'

const NavBar = () => {

  const [queryText,setQueryText] = useState("")

  const navigate = useNavigate()

  const handleLogout = () => {
    logout_user()
    navigate(0)
  }

  const handleSearch = (e)=>{
    setQueryText(e.target.value)
  }

  // const handleSubmit = ()=>{
  //   console.log(queryText)
  // }

  return (
    <nav>
      <Link to="/" className='logo'>Articles</Link>
      <div>
      <InputBox
        id="search"
        type="text"
        placeholder="Search for articles"
        onChange={handleSearch}
        value={queryText}
      />
      {/* <Button text="Search" callBack={handleSubmit} /> */}
      </div>
      <div>
        <Link className='btn btn-primary home-btn' to='/'>Home</Link>
        {getUserId() ? <>
          <Link className='btn btn-secondary' to={'/profile/' + getUserId()}>Profile</Link>
          <Link className='btn btn-secondary' to="/article/new">Create Article</Link>
          <Button className='btn btn-secondary' text="Logout" callBack={handleLogout} />
        </> :
          <>
            <Link className='btn btn-secondary' to="/login">Log In</Link>
            <Link className='btn btn-secondary' to="/signup">Sign Up</Link></>}
      </div>
    </nav>
  )
}

export default NavBar