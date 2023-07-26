import React from 'react'
import "./style.css"
import { BiLogInCircle } from 'react-icons/bi';
import SlidbarIcon from './SlidbarIcon';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { Loginusers } from '../Features/Slice/Loginslice';
import { useNavigate } from 'react-router-dom';
import { GoCloudUpload } from 'react-icons/go';
import Popup from '../Modal/Modal';

const SideBare = () => {

  //logout function==============
  const [open, setOpen] = React.useState(false);

  const auth = getAuth();
  const dispatch = useDispatch();
  const nvigate = useNavigate();
  const users= useSelector((user)=>user.logins.logged);
  
  const handleLogout =()=>{
    signOut(auth).then(() => {
      localStorage.removeItem("users");
      dispatch(Loginusers(null));
      nvigate("/")

    }).catch((error) => {
       console.log(error.code);
    });

  }
  const handleOpen = ()=>{
    setOpen(true);
  }
  return (
    
    <>
      <div className="sidebar">
          <div className="sidebar-wrpper">
            <div className="profile-update">
            <div className="profile-picture" onClick={handleOpen}>
              <div className="pro-pic-overlay">
                 <div>
                   <GoCloudUpload className='upload-icon'/>
                 </div>
              </div>
                <picture>
                     <img src={users.photoURL} alt="profile" />
                </picture>
             </div>
                <div className="profile-name">
                   <h4>{users.displayName}</h4>
                </div>
            </div>
             <div className="other-page">
                <div className="s-icon">
                <SlidbarIcon/>
                </div>
             </div>
             <div className="logout" onClick={handleLogout}>
                <BiLogInCircle cursor="pointer"/>
             </div>
          </div>
      </div>

      <Popup  open={open} setOpen={setOpen}/>
    </>
    
  )
}

export default SideBare
