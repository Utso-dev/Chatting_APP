import React, {  useState } from 'react'
import "./style.css"
import { HiDotsVertical } from 'react-icons/hi';
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set,} from "firebase/database";
import {  useSelector } from 'react-redux';

// import {  activeChat } from '../../Features/Slice/FriendChatSlice';

function Friend() {
  const user = useSelector((users)=>users.logins.logged)
  const [friend, setFriend] = useState([])
  const db = getDatabase();


 setTimeout(() => {
  const db = getDatabase();
  const starCountRef = ref(db, 'friends/');
  const frndArry= [];
  onValue(starCountRef, (snapshot) => {
    snapshot.forEach((data)=>{
      if(data.val().reciverId === user.uid){
        frndArry.push({...data.val(), id : data.key} )
      }else{
        if(data.val().senderId === user.uid){
          frndArry.push({...data.val(), id : data.key} )
        }
      }
    
    })
    setFriend(frndArry)
 });
 }, 1000);

const handleunfrnd = (data)=>{
  remove(ref(db, 'friends/' + data.id))
}
// block part start

const handleBlock =(data)=>{
  if (user.uid === data.senderId) {
     set(ref(db, 'block/' + data.id), {
      blockKyce: data.reciverName,
      blockKyceId : data.reciverId,
      blockDase: data.senderName,
      blockDaseId: data.senderId,
  }).then(()=>{
    remove(ref(db, 'friends/' + data.id));
  });
  }else{
    if (user.uid === data.reciverId) {
      set(ref(db, 'block/'+ data.id), {
        blockKyce: data.senderName,
        blockKyceId : data.senderId,
        blockDase: data.reciverName,
        blockDaseId: data.reciverId,
    }).then(()=>{
      remove(ref(db, 'friends/' + data.id));
    });
    }
  }
 }

//  active chat part===========


  return (
    <>
      <div className="friend-wrp">
      <div className="friend-header-wrp">
          <div className="friend-header">
            <h4>Friends</h4>
            </div>
            <div className="friend-icon">
               <HiDotsVertical size={25}/>
            </div>
        </div>
         {
          friend.map((item, i)=>(
            <div className="friendRequst-item" key={i}> 
            <div className="friendRequst-image">

            </div>
            <div className="friendRequst-name">
                <h4>{user.uid === item.senderId ? item.reciverName : item.senderName}</h4>
            </div>
            <div className="friendRequst-button">
            <Button className='f-reject' variant="contained" onClick={()=> handleBlock(item)}>block</Button>
            <Button variant="contained" onClick={()=>handleunfrnd(item)}>unfriend</Button>
            </div>
        </div>
          ))
         }
      </div>
    </>
  )
}

export default Friend
