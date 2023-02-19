import React from 'react'

const Button = ({text,classname,callBack}) => {
  return (
    <button className={classname?classname:"btn btn-secondary"} onClick={callBack}><h3>{text}</h3></button>
  )
}

export default Button