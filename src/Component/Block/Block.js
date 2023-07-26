import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { HiDotsVertical } from 'react-icons/hi';
import "./style.css";
import { getDatabase, ref, onValue, remove, set, push} from "firebase/database";
import { useSelector } from 'react-redux';


const Block = () => {
  // block read data part start
  const user = useSelector((users)=>(users.logins.logged));
  const db = getDatabase();
  const [blockUser, setblockUser]= useState([])

  useEffect(()=>{
    const starCountRef = ref(db, 'block/');
    onValue(starCountRef, (snapshot) => {
      const blockArry = []
      snapshot.forEach((item)=>{
        if (user.uid == item.val().blockKyceId) {
          blockArry.push({
            id: item.val().key,
            blockDase: item.val().blockDase,
            blockDaseId: item.val().blockDaseId,

          })
        }else{
          if (user.uid == item.val().blockDaseId) {
            
            blockArry.push({
              id: item.val().key,
              blockKyce: item.val().blockKyce,
              blockKyceId: item.val().blockKyceId,
             
            })
          }
        }
        // blockArry.push({...item.val(), id: item.key})
      })
      setblockUser(blockArry)
    });
    
  },[])

  // unblock your account
  const handleUnblockBtn = (data)=>{
    console.log(data);
    set(push(ref(db, 'friends/')), {
      senderName: data.blockKyce,
      senderId: data.blockKyceId,
      reciverName: user.displayName,
      reciverId: user.uid
    }).then(()=>{
      remove(ref(db, 'block/', + data.id))
    });
  }
 
  return (
    <>
       <div className="block-wrp">
      <div className="block-header-wrp">
          <div className="block-header">
            <h4>block</h4>
            </div>
            <div className="groplist-icon">
               <HiDotsVertical size={25}/>
            </div>
        </div>
        {blockUser.map((item , i)=>(
          <div key={i}>
            {
              !item.blockDaseId &&
                 <div className="block-item" >
                      <div className="block-image">

                  </div>
                  <div className="block-name">
                      <h4>{item.blockKyce}</h4>
                      <h4>{item.blockDase}</h4>
                  </div>
                  <div className="block-button">
                    <Button  variant="contained" onClick={()=> handleUnblockBtn(item)}>Unblock</Button> 
                  </div>
              </div>
              
            }
        </div>
        ))}
        
      </div>
    </>
  )
}

export default Block
