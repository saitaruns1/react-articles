import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getUserId } from '../../Authheader'
import { logout_user } from '../../Authservice'
import Button from '../Button/Button'
import InputBox from '../InputBox/InputBox'
import './style.css'

const NavBar = ({ queryText, setQueryText, onSearchBtnClicked }) => {

  const navigate = useNavigate()
  const location = useLocation();

  const handleLogout = () => {
    logout_user()
    navigate(0)
  }

  const handleSearch = (e) => {
    setQueryText(e.target.value)
  }

  const handleSubmit = () => {
    onSearchBtnClicked(queryText)
  }

  return (
    <nav>
      <a href="/" className='logo'>Articles</a>
      {(location.pathname !== '/login' && location.pathname !== '/signup') &&
        <div>
          <InputBox
            id="search"
            type="text"
            placeholder="Search for articles"
            onChange={handleSearch}
            value={queryText}
          />
          <Button text="Search" callBack={handleSubmit} />
        </div>}
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