import React from 'react'
import './style.css'

const InputBox = ({id,name,classname,label,type,value,onChange,onBlur,placeholder}) => {

  return (
    <div className={type!=='checkbox' ? "input-box" : ""}>
    { type!=='checkbox' &&  <label  htmlFor={id} >{label}</label> }
    <input className={classname ? classname : "input-text"} id={id} name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
    { type==='checkbox' &&  <label htmlFor={id} >{label}</label> }
    </div>
  )
}

export default InputBox