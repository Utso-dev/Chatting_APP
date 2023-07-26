import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { activeChat } from '../../Features/Slice/FriendChatSlice';
import "./Fstyle.css"

const FriendChat = () => {
    const user = useSelector((users)=>users.logins.logged)
    const [friend, setFriend] = useState([])
     const db = getDatabase();
    const dispatch = useDispatch();

    setTimeout(() => {
        // const db = getDatabase();
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

       const handleChat = (data)=>{
        localStorage.setItem("activesfriend", JSON.stringify(data));
         if(user.uid === data.reciverId){
          
          dispatch(activeChat(
            {
              single:"friend",
              id: data.senderId,
              name :data.senderName
            }
          ))
         }else{
          dispatch(activeChat(
            {
              single:"friend",
              id: data.reciverId,
              name :data.reciverName,
            }
          ))
         }
      }

  return (
    <div>
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
            <div className="friendChat-item" key={i} onClick={()=>handleChat(item)}> 
            <div className="friendChat-image">

            </div>
            <div className="friendChat-name">
                <h4>{user.uid === item.senderId ? item.reciverName : item.senderName}</h4>
                <p>hi.....</p>
            </div>
            
            <div className="time">
            <p>9:20pm</p>
            <div className="f-m-no">
                <p>12</p>
            </div>
            </div>
        </div>
          ))
         }
      </div>
    </div>
  )
}

export default FriendChat