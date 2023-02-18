import React from 'react'

const Button = ({text,classname,callBack}) => {
  return (
    <div className={classname} onClick={callBack}>{text}</div>
  )
}

export default Button