import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import "./style.css";
import { getDatabase, ref, onValue, set, push, remove, } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequst = () => {

    const db = getDatabase();
    const [reqLists , setReqLists] = useState([]);
    const user = useSelector((users)=>(users.logins.logged));

    useEffect(()=>{
        const db = getDatabase();
        const starCountRef = ref(db, 'friendRequst/');
        onValue(starCountRef, (snapshot) => {
          const requstArry=[];
        snapshot.forEach((item)=>{
          if(item.val().reciverId == user.uid){
            requstArry.push({...item.val(), id : item.key})
       }
        });
        setReqLists(requstArry);
      });
      },[]);
      
  //Accept==================
  const handelaccept = (data)=>{
    
    set(ref(db, 'friends/' + data.id), {
         ...data
     }).then(()=>{
      remove(ref(db, 'friendRequst/' + data.id))
     });
  };
  const handelReject = (data)=>{
      remove(ref(db, 'friendRequst/' + data.id))
  };


  return (
    <>
    <div className="friendrequst-wrpper">
    <div className="friendRequst-header-wrp">
          <div className="friendRequst-header">
            <h4>Friend  Request</h4>
            </div>
            <div className="groplist-icon">
               <HiDotsVertical size={25}/>
            </div>
        </div>
        {reqLists.map((item, i )=>(
            <div className="friendRequst-item" key={i}>
            <div className="friendRequst-image">

            </div>
            <div className="friendRequst-name">
                <h4>{item.senderName}</h4>
            </div>
            <div className="friendRequst-button">
            <Button className='f-reject' variant="contained" onClick={()=>handelReject(item)}>reject</Button>
            <Button variant="contained" type='button' onClick={()=>handelaccept(item)}>Accept</Button>
            </div>
        </div>
          ))}
        
    </div>
      
    </>
  )
}

export default FriendRequst
