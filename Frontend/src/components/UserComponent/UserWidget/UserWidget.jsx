import React from 'react'
import { Container } from 'react-bootstrap'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

const UserWidget = ({title, counter, bgColor, borderLeft }) => {
  return (
       <div className="widgets" style={{borderLeft: borderLeft}}>
      <div className="left">
        <span className="title">{title}</span>
        <span className="counter">
          {counter}
        </span>
      </div>
      <div className="right" style={{backgroundColor: bgColor}}>
        <ConfirmationNumberOutlinedIcon className='icon' />
      </div>
    </div>
  )
}

export default UserWidget