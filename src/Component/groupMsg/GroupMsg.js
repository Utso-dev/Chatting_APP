
import { Button } from '@mui/material'
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux';
import "./style.css"
import Searchbar from '../../Component/Searchbar/Searchbar';
import { activeChat } from '../../Features/Slice/FriendChatSlice';

function GroupMsg() {
    // const user = useSelector((users)=>users.logins.logged)
    const dispatch = useDispatch();
    const db = getDatabase();
  const [massGrp, setMassGrp]=useState([])
    useEffect(()=>{
      const starCountRef = ref(db, 'Groups/');
      onValue(starCountRef, (snapshot) => {
       const grpjoinrr=[];
       snapshot.forEach((mygroup)=>{
        grpjoinrr.push({...mygroup.val(),id: mygroup.key});
        
       });
       setMassGrp(grpjoinrr);
      });
    },[]);
    // redux========
    const handlechat= (item)=>{
      localStorage.setItem("activesfriend", JSON.stringify(item));
      dispatch(activeChat({
        status : "group",
        grpName: item.groupName,
        grpId: item.id ,
        adminId: item.adminId,
        adminName: item.adminName
      }))
    }
  return (
    <div>
      <div>
              <Searchbar/>
            </div>
          <div className="grouplist-wrpper">
        <div className="group-header-wrp">
          <div className="grouplist-header">
            <h4>Groups List</h4>
            </div>
            
            <div className="groplist-icon">
               <HiDotsVertical size={25}/>
            </div>
        </div>
        <div className='scroll'>
        {massGrp.map((item,i)=>(
          <div className="grouplist-item" key={i} onClick={()=>handlechat(item)}>
          <div className="grouplist-image">
            <img src="" alt="" />
          </div>
          <div className="grouplist-name">
          <p>Admin : {item.adminName}</p>
                <h4>{item.groupName}</h4>
                <p>{item.groupTag}</p>
               
          </div>

          <div className="grouplist-button">
          <Button variant="contained">message</Button>
          </div>
        </div>
        ))}
       </div>
     </div>
    </div>
  )
}

export default GroupMsg
