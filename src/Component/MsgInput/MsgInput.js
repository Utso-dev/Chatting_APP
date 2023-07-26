import React, { useRef } from 'react'
import "./style.css"
import { MdSend } from 'react-icons/md';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { BsFillCameraFill } from 'react-icons/bs';
import { IoMdPhotos } from 'react-icons/io';
import { AiFillAudio } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { getDatabase, ref, set } from "firebase/database";
import { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { useSelector } from 'react-redux';



const MsgInput = () => {

const [open , setOpen]=useState(false);
const [camera , setCamera]=useState(false);
const [masseg, setMasseg]= useState("");
const choosFile = useRef(null);
const active = useSelector((user)=>user.friendChat.Active);
const user = useSelector((user)=>user.logins.logged);

  const handleMore =()=>{
    setOpen(true);
  }

 const handlecamera =()=>{
   setCamera(true)
  }

  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleTakePhotoAnimationDone (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop () {
    console.log('handleCameraStop');
  }
  
  const handleSend =()=>{
    const db = getDatabase();
    set(ref(db, 'massege/'), {
      sendMassegeId: user.uid,
      sendMassegeName: user.displayName,
      receiveMassegeId:active.id,
      receiveMassegeName:active.name,
      massege: masseg,
      
    });
  }

  return (
    <>
    <div className="boder"></div>
     <div className="inputs">
        <div className="text_input">
          <input type="text" placeholder='Aa' onChange={(e)=>setMasseg(e.target.value)}/>

          <div className="input_option">
             <BsFillEmojiSmileFill size={30}/>
          </div>
          <div className="input_option_plus" onClick={handleMore}>
             <BsFillPlusCircleFill size={30}/>
             {
              open && <div className='more'>
                     <div className="camera-icon" onClick={handlecamera}>
                       <BsFillCameraFill size={30}/>
                       </div>
                     
                     <div className="gellary_icon" onClick={()=>choosFile.current.click()}>
                       <IoMdPhotos size={30}/>
                       <input type="file" hidden ref={choosFile}/>
                     </div>
                     <div className="audio_icon">
                       <AiFillAudio size={30}/>
                     </div>
              </div>
             }
          </div>
        </div>
        <div >
        {
        camera && (
          <div className="img_capture">
            <div className="close" onClick={()=>setCamera(false)}>
               <CgClose size={30}/>
            </div>
            <Camera
                  onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                  onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
                  onCameraError = { (error) => { handleCameraError(error); } }
                  idealFacingMode = {FACING_MODES.ENVIRONMENT}
                  idealResolution = {{width: 640, height: 480}}
                  imageType = {IMAGE_TYPES.JPG}
                  imageCompression = {0.97}
                  isMaxResolution = {true}
                  isImageMirror = {false}
                  isSilentMode = {false}
                  isDisplayStartCameraError = {true}
                  isFullscreen = {false}
                  sizeFactor = {1}
                  onCameraStart = { (stream) => { handleCameraStart(stream); } }
                  onCameraStop = { () => { handleCameraStop(); } }
                />

              </div>
            )
          }
        </div>
        <div className="input_button" onClick={handleSend}>
           <button type='button'><div className='send'><MdSend size={30}/></div></button>
        </div>
     </div>
    </>
  )
}

export default MsgInput