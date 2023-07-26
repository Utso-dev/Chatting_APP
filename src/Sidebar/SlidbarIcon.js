import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { AiFillMessage } from 'react-icons/ai';
import { MdOutlineNotificationImportant } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import {  NavLink } from 'react-router-dom';

const SlidbarIcon = () => {
  return (
    <div>
      <div className="icon-wrp">
      <div className="slidebar-iconss">
          <NavLink to="/" className="slidebar-icons"><AiOutlineHome/></NavLink>
       </div>
       <div className="slidebar-iconss">
         <NavLink to="/massage" className="slidebar-icons"> <AiFillMessage/></NavLink>
       </div>
       <div className="slidebar-iconss">
         <NavLink to="/notification" className="slidebar-icons"> <MdOutlineNotificationImportant/></NavLink>
       </div>
       <div className="slidebar-iconss">
         <NavLink to="/setting" className="slidebar-icons"> <BsFillGearFill/></NavLink>
       </div>
      </div>
     
    </div>
  )
}

export default SlidbarIcon
