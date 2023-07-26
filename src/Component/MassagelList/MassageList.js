import './style.css'
import React, { useEffect, useRef } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { IoIosCall } from 'react-icons/io';
import { FcVideoCall } from 'react-icons/fc';
import ModalImage from "react-modal-image";
import { useSelector } from 'react-redux';
import { MdSend } from 'react-icons/md';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { BsFillCameraFill } from 'react-icons/bs';
import { IoMdPhotos } from 'react-icons/io';
// import { AiFillAudio } from 'react-icons/ai';
import { CgClose } from 'react-icons/cg';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css'
import { date } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment/moment';
import { getDownloadURL, getStorage, ref as sref, uploadBytes, uploadBytesResumable, uploadString } from "firebase/storage";
// import ScrollToBottom from 'react-scroll-to-bottom';
import { AudioRecorder } from 'react-audio-voice-recorder'; //audio
import { current } from '@reduxjs/toolkit';
// emoji picker=============
import EmojiPicker from 'emoji-picker-react';
import { Grid } from '@mui/material';

const MassageList = () => {
  const [open , setOpen]=useState(false);
  const [camera , setCamera]=useState(false);
  const [massege , setMassegs] = useState("");
  const [grpMassege , setGrpMessage] = useState([]);
  const [grpMember , setGrpMember] = useState([]);
  const [audioURl , setAudioURL] = useState("");
  const [blob , setBlob] = useState("");
  const [showAudio , setShowAudio] = useState("");
  const [takeImg, setTakeImg]= useState();
  const [msgList, setMsgList]= useState([]);
  const [emojiOpen, setemojiOpen]= useState(false);
  const choosFile = useRef(null);
  const scrollRef = useRef(null);
  const actives = useSelector((user)=>user.friendChat.Active);
  const user = useSelector((user)=>user.logins.logged);
  const db = getDatabase();
  const storage = getStorage();


  // scroll update===
  useEffect(()=>{

    scrollRef?.current?.scrollIntoView();
  },[msgList])
  
  const handleMore =()=>{
    setOpen((current)=>!current);
  }

  // camera img upload
 const handlecamera =()=>{
   setCamera(true)
  }
  function handleTakePhoto (dataUri) {
    // Do stuff with the photo...
    setTakeImg(dataUri)
    const storageRef = sref(storage, user.uid + uuidv4());
    uploadString(storageRef, dataUri, 'data_url').then((snapshot) => {
    getDownloadURL(storageRef).then((downloadURL) => {
      if(actives.single == "friend"){
        set(push(ref(db, 'masseg/')), {
         sendMassegeId: user.uid,
         sendMassegeName: user.displayName,
         receiveMassegeId:actives.id,
         receiveMassegeName:actives.name,
         img: downloadURL,
         date: ` ${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} `
         
       });
      }
     });
  }).then(()=>{
    setCamera(false)
  });
  }

//massege write===============
  const handleSend =()=>{
   if(actives.single == "friend"){
    if(!massege){
      console.log("nai");
    }else{
      set(push(ref(db, 'masseg/')), {
        sendMassegeId: user.uid,
        sendMassegeName: user.displayName,
        receiveMassegeId:actives.id,
        receiveMassegeName:actives.name,
        massege: massege,
        date: ` ${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} `
      }).then(()=>{
        setMassegs("");
        setemojiOpen(false)
      })
    }
   }else{
    if(actives.status == "group"){
      if(!massege){
        console.log("nai");
      }else{
        set(push(ref(db, 'GroupMasseg/')), {
          sendMassegeId: user.uid,
          sendMassegeName: user.displayName,
          receiveGroupId:actives.grpId,
          receiveGroupName:actives.grpName,
          massege: massege,
          date: ` ${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} `
        }).then(()=>{
          setMassegs("");
          setemojiOpen(false)
        })
      }
    }
   }
   
   //  audio send===========
   const audiostorageRef = sref(storage, audioURl);
   // 'file' comes from the Blob or File API
   uploadBytes(audiostorageRef, blob).then((snapshot) => {
    getDownloadURL(audiostorageRef).then((downloadURL) => {
      if(actives.single == "friend"){
        set(push(ref(db, 'masseg/')), {
         sendMassegeId: user.uid,
         sendMassegeName: user.displayName,
         receiveMassegeId:actives.id,
         receiveMassegeName:actives.name,
         audio: downloadURL,
         date: ` ${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} `
         
       }).then(()=>{
        setAudioURL("");
       });
      }else{
        if(actives.status == "group"){
          set(push(ref(db, 'GroupMasseg/')), {
           sendMassegeId: user.uid,
           sendMassegeName: user.displayName,
           receiveMassegeId:actives.grpId,
           receiveMassegeName:actives.grpName,
           audio: downloadURL,
           date: ` ${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} `
           
         }).then(()=>{
          setAudioURL("");
         });
        }
      }
    });
  });
  }
  // audio record upload==================
const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  setAudioURL(url);
  setBlob(blob);
  // const audio = document.createElement("audio");
  // audio.src = url;
  // audio.controls = true;
  // document.body.appendChild(audio);
};
// massege read==================
useEffect(()=>{
  onValue(ref(db, "masseg/"), (snapshot)=>{
    let mgArry=[];
    snapshot.forEach((item)=>{  
      if(item.val().sendMassegeId == user.uid && item.val().receiveMassegeId == actives.id || item.val().receiveMassegeId == user.uid && item.val().sendMassegeId == actives.id){
        mgArry.push(item.val());
      }
    })
    setMsgList(mgArry);
  });
},[actives.id]);
console.log(msgList);
// for group message read data ================== 
useEffect(()=>{
  onValue(ref(db, "GroupMasseg/"), (snapshot)=>{
    let mgArry=[];
    snapshot.forEach((item)=>{  
        mgArry.push(item.val());
    })
    setGrpMessage(mgArry);
  });
},[]);
useEffect(()=>{
  onValue(ref(db, "groupMembers/"), (snapshot)=>{
    let grpmemberArry=[];
    snapshot.forEach((item)=>{  
      grpmemberArry.push(item.val().groupId  + item.val().userId);
    })
    setGrpMember(grpmemberArry);
  });
},[]);

// img upload  ===========
const handleImgUpload = (e)=>{
  const storage = getStorage();
const storageRef = sref(storage, e.target.files[0].name);

const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log(error);
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      if(actives.single == "friend"){
        set(push(ref(db, 'masseg/')), {
         sendMassegeId: user.uid,
         sendMassegeName: user.displayName,
         receiveMassegeId:actives.id,
         receiveMassegeName:actives.name,
         img: downloadURL,
         date: ` ${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} `
         
       });
      }else{//group img upload=====================
          set(push(ref(db, 'GroupMasseg/')), {
           sendMassegeId: user.uid,
           sendMassegeName: user.displayName,
           receiveMassegeId:actives.grpId,
           receiveMassegeName:actives.grpName,
           img: downloadURL,
           date: ` ${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()}, ${new Date().getHours()} : ${new Date().getMinutes()} `
         });  
      }
    });
  }
);

}

// enter key press
const handlekeyPress =(e)=>{
  if (e.key === "Enter") {
   handleSend();
  }
};


// emoji picker=================
const emojipick =(emoj)=>{
  setMassegs(massege + emoj.emoji);
}
  return (
    <>
    
      {
      actives.single == "friend" || actives.status == "group"?  
      <div className="massages">
    <div className="m-rap">

    <div className="massage_wraper">
      <div className="massage_item">
        <div className="massage_img">
          <div className="massage_pic">
          <picture>
            <img src="./images/pro.jpg" alt="pro" />
          </picture>
          </div>
        </div>
        <div className="massage_text">
          <h1>{actives.name} </h1>
          <h1>{actives.grpName} </h1>
          <p>Online</p>
        </div>
        <div className="massage_icon">
          <div className="massage_audio_call">
          <IoIosCall/>
          </div>
          <div className="massage_vedio_call">
          <FcVideoCall/>
          </div>
          <BiDotsVerticalRounded/>
        </div>
      </div>
    </div>
    <div  className="img_overfollow">
    {
      actives.single == "friend" ? 
      msgList.map((item, i)=>(
        <div ref={scrollRef}>
        {
        item.sendMassegeId == user.uid ?
        item.massege ?
        <div className="msg-right-text" key={i}>
        <div className="msg_right_content">
           <p>{item.massege}</p>
        </div>
        <div className="msg_right_time">
          <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
        </div>
    </div>
        
        :  item.img ?
        <div className="msg-right-text" key={i}>
        <div className="msg-right-img-bg">
        <div className="msg_right_img">
           <picture>
           <ModalImage
              small={item.img}
              large={item.img}
              />
           </picture>
        </div>
        </div>
        <div className="msg_left_time">
          <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
        </div>
    </div>:
  <div className="msg-right-text" key={i}>
    <div className="msg_right_audio">
      <audio width={400} controls src={item.audio}>
      </audio>
    </div>
    <div className="msg_right_time">
      <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
    </div>
 </div>

        :item.massege? 
        <div className="msg-left-text" key={i}>
        <div className="msg_left_content">
           <p>{item.massege}</p>
        </div>
        <div className="msg_left_time">
        <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
        </div>
    </div>
    : item.img ? <div className="msg-left-text" key={i}>
    <div className="msg-left-img-bg">
        <div className="msg_left_img">
           <picture>
           <ModalImage
              small={item.img}
              large={item.img}
              />
           </picture>
        </div>
        </div>
        <div className="msg_left_time">
          <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
        </div>
    </div> :
    <div className="msg-left-text" key={i}>
         <div className="msg_left_audio">
           <audio width={400} controls src={item.audio}></audio>
         </div>
         <div className="msg_left_time">
           <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
         </div>
     </div>
    
}
   </div>
)) : 
user.uid == actives.adminId || grpMember.includes(actives.grpId + user.uid) ?
grpMassege.map((item, i)=>(
  item.sendMassegeId == user.uid ?
  item.receiveGroupId == actives.grpId &&
   item.massege ? 
   <div className="msg-right-text" key={i}>
       <div className="msg_right_content">
          <p>{item.massege}</p>
       </div>
       <div className="msg_right_time">
         <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
       </div>
   </div>:
   item.img ?
  <div className="msg-right-text" key={i}>
  <div className="msg-right-img-bg">
  <div className="msg_right_img">
     <picture>
     <ModalImage
        small={item.img}
        large={item.img}
        />
     </picture>
  </div>
  </div>
  <div className="msg_left_time">
    <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
  </div>
</div>:
<div className="msg-right-text" key={i}>
<div className="msg_right_audio">
<audio width={400} controls src={item.audio}>
</audio>
</div>
<div className="msg_right_time">
<p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
</div>
</div>
   : item.receiveGroupId == actives.grpId && 
   item.massege ?
   <div className="msg-left-text" key={i}>
   <div className="msg_left_content">
      <p>{item.massege}</p>
   </div>
   <div className="msg_left_time">
   <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
   </div>
</div>:
item.img ? <div className="msg-left-text" key={i}>
<div className="msg-left-img-bg">
    <div className="msg_left_img">
       <picture>
       <ModalImage
          small={item.img}
          large={item.img}
          />
       </picture>
    </div>
    </div>
    <div className="msg_left_time">
      <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
    </div>
</div> :
<div className="msg-left-text" key={i}>
     <div className="msg_left_audio">
       <audio width={400} controls src={item.audio}></audio>
     </div>
     <div className="msg_left_time">
       <p>{moment(item.date, "YYYYMMDD hh:mm ").fromNow()}</p>
     </div>
 </div>
  ))
    : "no member please joine our group"  
      
    }

      {/* <div className="msg-left-text">
         <div className="msg_left_content">
            <p>hi my friend</p>
         </div>
         <div className="msg_left_time">
           <p>Today, 2:01pm</p>
         </div>
     </div>
     <div className="msg-right-text">
         <div className="msg_right_content">
            <p>hi my friend how are you, where you liveing now</p>
         </div>
         <div className="msg_right_time">
           <p>Today, 2:01pm</p>
         </div>
     </div>
     <div className="msg-left-text">
         <div className="msg-left-img-bg">
         <div className="msg_left_img">
            <picture>
            <ModalImage
               small={"./images/m-img (2).jpg"}
               large={"./images/m-img (2).jpg"}
               />;
            
            </picture>
         </div>
         </div>
         <div className="msg_left_time">
           <p>Today, 2:01pm</p>
         </div>
     </div>
     <div className="msg-right-text">
     <div className="msg-right-img-bg">
         <div className="msg_right_img">
            <picture>
            <ModalImage
               small={"./images/m-img (1).jpg"}
               large={"./images/m-img (1).jpg"}
               />;
              
            </picture>
         </div>
         </div>
         <div className="msg_left_time">
           <p>Today, 2:01pm</p>
         </div>
     </div>
     
     <div className="msg-left-text">
         <div className="msg_left_video">
           <video width={400} controls></video>
         </div>
         <div className="msg_left_time">
           <p>Today, 2:01pm</p>
         </div>
     </div>
     

     <div className="msg-right-text">
         <div className="msg_right_video">
           <video width={400} controls></video>
         </div>
         <div className="msg_right_time">
           <p>Today, 2:01pm</p>
         </div>
     </div>
     <div className="msg-right-text">
         <div className="msg_right_audio">
           <audio width={400} controls>
           </audio>
         </div>
         <div className="msg_right_time">
           <p>Today, 2:01pm</p>
         </div>
     </div> */}
   </div>

      {/* ===========input part============= */}

      <div className="input">
          <div className="boder"></div>
     <div className="inputs">
      {/* ==========audio========== */}
     {
       !audioURl && <div className="audio-recd" onClick={()=>setShowAudio(!showAudio)}>
         <AudioRecorder 
           onRecordingComplete={(blob)=>addAudioElement(blob)}
         />
      </div>
     }
     {audioURl && 
        (
          <>
           <div className="audio_send">
           <div className="delete-rcrd"  onClick={()=>setAudioURL("")}>
                  <AiFillCloseCircle cursor="pointer" size={40}/>
            </div> 
           <audio className='audioRecord' controls src={audioURl}></audio>
            
           </div>
          </>
        )
      }
      {!showAudio && !audioURl && 
        <div className="text_input">
           <input type="text" placeholder='message' name="message" value={massege} onKeyUp={handlekeyPress} onChange={(e)=>setMassegs(e.target.value)}/>
          {/* =========audio========= */}
          {/* imoge */}
          <div className="emoji">
          <div className="input_emoji" onClick={()=>setemojiOpen(!emojiOpen)}>
             <BsFillEmojiSmileFill size={30} cursor="pointer"/>
          </div>
        {
          emojiOpen &&<div className="emoji-tracker" >
          <EmojiPicker onEmojiClick={emojipick}/>
          </div>
        }
          
          </div>
          <div className="input_option_plus" onClick={handleMore}>
             <BsFillPlusCircleFill size={30}/>
             {
              open && <div className='more'>
                     <div className="camera-icon" onClick={handlecamera}>
                       <BsFillCameraFill size={30}/>
                      </div>
                     
                     <div className="gellary_icon" onChange={handleImgUpload} >
                       <IoMdPhotos onClick={()=>choosFile.current.click()} size={30}/>
                       <input type="file" hidden ref={choosFile}/>
                     </div>
                     <div className="audio_icon">
                       {/* <AiFillAudio size={30}/> */}
                     </div>
              </div>
             }
          </div>
        </div>
        }
        <div >
        {
        camera && (
          <div className="img_capture">
            <div className="close" onClick={()=>setCamera(false)}>
               <CgClose size={30}/>
            </div>
            <Camera
              onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
            />

              </div>
            )
          }
        </div>
        <div className="input_button"  onClick={handleSend}>
           <button type='button' ><div className='send' ><MdSend cursor="pointer" size={30}/></div></button>
        </div>
     </div>
      </div>
      </div>
    </div>
      : 
      <div className="no_message">
        <div className="no-content">
        <h1>chatting for windows</h1>
        <p>send and recive messages without keeping your phone online. </p>
        <p>click your friend and goplist</p>
        </div>
      </div>
    }
    
    </>
  )
}

export default MassageList