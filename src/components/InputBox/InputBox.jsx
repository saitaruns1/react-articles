import React from 'react'

const InputBox = ({id,name,classname,label,type,value,onChange,onBlur,placeholder}) => {

  return (
    <div>
    { type!=='checkbox' &&  <label htmlFor={id} >{label}</label> }
    <input className={classname} id={id} name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} />
    { type==='checkbox' &&  <label htmlFor={id} >{label}</label> }
    </div>
  )
}

export default InputBox