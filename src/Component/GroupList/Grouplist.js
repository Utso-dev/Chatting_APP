import React, { useEffect, useState } from 'react'
import "./style.css"
import { HiDotsVertical } from 'react-icons/hi';
import Button from '@mui/material/Button';
import BasicModal from '../Basic Modal/BasicModal';
import { getDatabase, onValue, push, ref, set } from 'firebase/database';
import { useSelector } from 'react-redux';


const Grouplist = () => {
  const db = getDatabase();
  const user = useSelector((users)=>users.logins.logged)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [grouplist, setGroupList] = useState([]);
  const [grpButton, setGrpButton] = useState([]);
  const [grpJoin, setGrpJoin] = useState([]);

  useEffect(()=>{
    const starCountRef = ref(db, 'Groups/');
    onValue(starCountRef, (snapshot) => {
     const grouplistArry=[];
     snapshot.forEach((mygroup)=>{
         if(user.uid !== mygroup.val().adminId){
          grouplistArry.push({...mygroup.val(), id : mygroup.key})
         }
     });
     setGroupList(grouplistArry);
    });
  },[]);

  useEffect(()=>{
    const starCountRef = ref(db, 'GroupJoinRqust/');
    onValue(starCountRef, (snapshot) => {
     const grplistarr=[];
     snapshot.forEach((mygroup)=>{
      grplistarr.push(mygroup.val().userId + mygroup.val().groupId);
     });
     setGrpButton(grplistarr);
    });
  },[]);

  useEffect(()=>{
    const starCountRef = ref(db, 'groupMembers/');
    onValue(starCountRef, (snapshot) => {
     const grpjoinrr=[];
     snapshot.forEach((mygroup)=>{
    //  if(user.uid !== mygroup.val().adminId){
      grpjoinrr.push(mygroup.val().userId + mygroup.val().groupId);
     
     });
     setGrpJoin(grpjoinrr);
    });
  },[]);

  const handleJoin =(data)=>{
   
    set(push(ref(db, 'GroupJoinRqust/')), {
      groupId: data.id,
      groupName: data.groupName,
      adminId: data.adminId,
      adminName: data.adminName,
      groupTag: data.groupTag,
      userId: user.uid,
      userName:user.displayName
    });

  }
  return (
    <>
     <div className="grouplist-wrpper">
        <div className="group-header-wrp">
          <div className="grouplist-header">
            <h4>Groups List</h4>
            <Button variant="contained" color="success" onClick={handleOpen}>
            create Group
            </Button>
            </div>
            
            <div className="groplist-icon">
               <HiDotsVertical size={25}/>
            </div>
        </div>
        <div className='scroll'>
        {
          grouplist==0 ? "not a grouplist":
          grouplist.map((item, i)=>(

        <div className="grouplist-item" key={i}>
          <div className="grouplist-image">
            <img src="" alt="" />
          </div>
          <div className="grouplist-name">
          <p>Admin : {item.adminName}</p>
                <h4>{item.groupName}</h4>
                <p>{item.groupTag}</p>
          </div>

          <div className="grouplist-button">
            {
              grpJoin.includes(item.id + user.uid )|| grpJoin.includes(user.uid + item.id)?
               <div className='groupbtn'>
                 <h6>Message</h6>
               </div>:
              grpButton.includes(item.id  + user.uid) || grpButton.includes(user.uid + item.id) ?
              <Button variant="contained" >send</Button>:
              <Button variant="contained" onClick={()=>handleJoin(item)}>join</Button>
            }
          </div>
        </div>
          ))
        }
        </div>
        <BasicModal open={open} setOpen={setOpen}/>
     </div> 
    </>
  )
}

export default Grouplist
