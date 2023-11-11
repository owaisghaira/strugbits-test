import React from 'react'
interface Props {
  btnText: string;
  onClick?: any;
  classes?: any;
  icon?: any;
}
const Button: React.FC<Props> = ({ btnText, onClick, classes, icon }) => {
  return (
    <button onClick={onClick} className={classes}>
      {icon && <span className='pr-4'>{icon}</span>}
      {btnText}</button>
  )
}

export default Button