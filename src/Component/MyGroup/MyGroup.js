import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { HiDotsVertical } from 'react-icons/hi';
import "./style.css";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from 'react-redux';
import { GrFormClose } from 'react-icons/gr';
import GrpModal from './GrpModal';


const MyGroup = () => {
  const [open, setOpen] = React.useState(false);
 
const db = getDatabase();
const user = useSelector((users)=>users.logins.logged)
const [myGroup , setMyGroup]= useState([]);
// const [member , setMember]= useState([]);
const [groupReq , setGroupReq]= useState([]);
const [show , setShow]= useState(false);

useEffect(()=>{
  const starCountRef = ref(db, 'Groups/');
  onValue(starCountRef, (snapshot) => {
   const groupArry=[];
   snapshot.forEach((mygroup)=>{
       if(user.uid == mygroup.val().adminId){
        groupArry.push({...mygroup.val(), id : mygroup.key})
       }
   });
   setMyGroup(groupArry);
   
  });
},[]);

const handleGroupReq = (data)=>{
  setShow(true);
  const starCountRef = ref(db, 'GroupJoinRqust/');
  onValue(starCountRef, (snapshot) => {
   const groupreqArry=[];
   snapshot.forEach((groupreq)=>{
       if( data.id == groupreq.val().groupId){
        groupreqArry.push({...groupreq.val(), id : groupreq.key})
       }
   });
   setGroupReq(groupreqArry);
  });
}

const groupreqaccept = (data)=>{
  set(push(ref(db, 'groupMembers/')), {
    adminId: data.adminId,
    groupId: data.groupId,
    groupName: data.groupName,
    adminName: data.adminName,
    userId: data.userId,
    userName:data.userName,
  }).then(()=>{
    remove(ref(db, 'GroupJoinRqust/' + data.id ));
  });
};

const handleinfo = (data) =>{
   setOpen(true);
  //  const starCountRef = ref(db, 'groupMembers/');
  //  onValue(starCountRef, (snapshot) => {
  //   const grpmemberArry=[];
  //   snapshot.forEach((member)=>{
  //       if( data.id == member.val().groupId && user.uid == member.adminId){
  //         grpmemberArry.push({...member.val(), id : member.key})
  //       }
  //   });
  //   setMember(grpmemberArry);
  //  });
}

  return (
    <>
      <div className="mygroup-wrp">
      <div className="mygroup-header-wrp">
          <div className="mygroup-header">
            <h4>My Group</h4>
            </div>
            <div className="groplist-icon">
               <HiDotsVertical size={25}/>
            </div>
        </div>
        {
          show && <div className='group-req'><h3>group requst list</h3> <div onClick={()=>setShow(false)}><GrFormClose size={40} color='#737373' /></div></div>
        }
        {
        show  ? groupReq.length == 0 ? "no requst" :  
        groupReq.map((item, i)=>(
          <div className="mygroup-item" key={i}>
          <div className="mygroup-image">
          </div>
          <div className="mygroup-name">
              <h4>{item.userName}</h4>
          </div>
          <div className="mygroup-button">
          <Button className='f-reject' variant="contained" >reject</Button>
          <Button  variant="contained" onClick={()=>groupreqaccept(item)}>accept</Button>
          
          </div>
      </div>
        )):
          myGroup.length == 0 ? <p>not a create group you</p>:
          myGroup.map((item, i)=>(
            <div className="mygroup-item" key={i}>
            <div className="mygroup-image">

            </div>
            <div className="mygroup-name">
              <p>Admin : {item.adminName}</p>
                <h4>{item.groupName}</h4>
                <p>{item.groupTag}</p>
            </div>
            <div className="mygroup-button">
            <Button className='f-reject' variant="contained" onClick={()=>handleinfo(item)}>info</Button>
            <Button  variant="contained" onClick={()=>handleGroupReq(item)}>requst</Button>
            
            </div>
        </div>
          ))
        }
       <GrpModal open={open} setOpen={setOpen}/>
      </div>
    </>
  )
}

export default MyGroup
