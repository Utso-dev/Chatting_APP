import React, { useEffect, useState } from 'react'
import { IoIosCloseCircleOutline } from 'react-icons/io';
import "./style.css"
import { getDatabase, onValue, ref } from 'firebase/database';
import { useSelector } from 'react-redux';

const Groupinfo = ({setOpen}) => {
    const db = getDatabase();
    const user = useSelector((users)=>users.logins.logged)
    const [grpmember , setGrpmemeber]= useState([]);
   const handleClose =()=>{
    setOpen(false)
   }

   useEffect(()=>{
    const starCountRef = ref(db, 'groupMembers/');
    onValue(starCountRef, (snapshot) => {
     const grpmemberArry=[];
     snapshot.forEach((member)=>{
      if(user.uid == member.val().adminId )
      grpmemberArry.push({...member.val(), id: member.key})
     });
     setGrpmemeber(grpmemberArry);
    });
   },[]);
   console.log(grpmember);
  return (
    <>
       <div className="grp-info-wrp">
           <div className="info-header-wrp">
              <div className="info-header">
                 <h2>gorup info</h2>
              </div>
              <div className="info-close" onClick={handleClose}>
                 <IoIosCloseCircleOutline cursor="pointer" size={30}/>
              </div>
           </div>
            
            {grpmember.length == 0 ? "no member":
               grpmember.map((item, i)=>(

                     <div className="groupinfo-item" key={i} >
                     <div className="groupinfo-image">
                     </div>
                     <div className="groupifo-name">
                        <h4>{item.userName}</h4>
                     </div>
                     <div className="mygroup-button">
                     
                     </div>
                  </div>
               ))
            }
        </div> 
    </>
  )
}

export default Groupinfo