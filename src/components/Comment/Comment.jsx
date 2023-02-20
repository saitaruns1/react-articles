import React from 'react'
import './style.css'

const Comment = ({text,user}) => {
  return (
    <div className='comment'>
        <div className='comment-user'>{user}</div>
        <div>{text}</div>
    </div>
  )
}

export default Comment