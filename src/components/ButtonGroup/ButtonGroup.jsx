import React from 'react'
import Button from '../Button/Button'
import './style.css'

const ButtonGroup = ({btns}) => {
  return (
    <div className='btn-grp'>
        {btns.map((btn,i)=>{
            return <Button key={i} classname="btn-grp-btn" text={btn.text} callBack={()=>btn.callBack(btn.text)} />
        })}
    </div>
  )
}

export default ButtonGroup