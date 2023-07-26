import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosPersonAdd } from 'react-icons/io';
import "./style.css";
import { getDatabase, ref, onValue, set, push, remove} from "firebase/database";
import { useSelector } from 'react-redux';
import { FiSearch } from 'react-icons/fi';

const UserList = () => {
  const db = getDatabase();
  const [userlist , setUserlist] = useState([]);
  const [reqList , setReqList] = useState([]);
  const [reqList2 , setReqList2] = useState([]);
  const [reqList3 , setReqList3] = useState([]);
  const user = useSelector((users)=>(users.logins.logged));
  const [searchTerm, setSearchTerm] = useState('');
  
// user show in browser==================
  useEffect(()=>{
    const db = getDatabase();
    const starCountRef = ref(db, 'users/');
    onValue(starCountRef, (snapshot) => {
      const userArry=[];
    snapshot.forEach((userslist)=>{
      if(user.uid !== userslist.key){
        userArry.push({...userslist.val(), id : userslist.key})
      }
    });
    setUserlist(userArry);
  });
  },[])


//send requst=================
const handleSendRequst = (item)=>{
  set(push(ref(db, 'friendRequst/')), {
   senderName: user.displayName,
   senderId: user.uid,
   reciverName: item.firstName,
   reciverId: item.id,
  });
};

useEffect(()=>{
  const db = getDatabase();
  const starCountRef = ref(db, 'friendRequst/');
  onValue(starCountRef, (snapshot) => {
    const reqArry=[];
    const reqArry2=[];
    const reqArry3=[];
  snapshot.forEach((reqlist)=>{
    if(user.uid == reqlist.val().reciverId){
      reqArry3.push(reqlist.val().reciverId + reqlist.val().senderId);
    }
    reqArry.push(reqlist.val().reciverId + reqlist.val().senderId);
    reqArry2.push({...reqlist.val(), id: reqlist.key});
  });
  setReqList(reqArry);
  setReqList2(reqArry2);
  setReqList3(reqArry3);
});
},[]);

const [friendButton, setfriendButton]=useState([])
useEffect(()=>{
  const db = getDatabase();
  const starCountRef=ref(db, 'friends');

  onValue(starCountRef, (snapshot) => {
    const friendArry =[]
    snapshot.forEach((data)=>{
      friendArry.push(data.val().reciverId + data.val().senderId)

    })
    setfriendButton(friendArry);
});
},[]);


// block button show
const [blockButton,setBlockButton]= useState([]);
const [blockButton2,setBlockButton2]= useState([]);

useEffect(()=>{
  const starCountRef=ref(db, 'block/');
  onValue(starCountRef, (snapshot) => {
    const blockBtArry =[]
    const blockBtArry2 =[]
    snapshot.forEach((data)=>{
      if (user.uid == data.val().blockKyceId) {
        blockBtArry.push(data.val().blockDaseId + data.val().blockKyceId)
      }else{
        if(user.uid == data.val().blockDaseId)
          blockBtArry2.push(data.val().blockDaseId + data.val().blockKyceId)
      }
    })
    setBlockButton(blockBtArry);
    setBlockButton2(blockBtArry2);
});
},[])


const handleCancel = (gitem)=>{
  reqList2.map((item)=>{
    if(gitem.id == item.reciverId || gitem.id == item.senderId){
      remove(ref(db, "friendRequst/" + item.id));
    }
  })
}



const handleChange = (e) => {
  let searcharry = [];
  userlist.filter((item)=>{
     if(item.firstName.toLowerCase().includes(e.target.value)){
      searcharry.push(item)
       setSearchTerm(searcharry)
     };
  })
};

  return (
    <>
        <div className="userlist-wrp">
      <div className="userlist-header-wrp">
          <div className="userlist-header">
            <h4>User List</h4>
            </div>
            <div className="groplist-icon">
               <HiDotsVertical size={25}/>
            </div>
        </div>
        <div className="search-wrpper">
        <div className="search-icon">
           <FiSearch size={30} />
        </div>
        <div className="search-input">
            <input type="text" placeholder='Search here...'  onChange={handleChange}/>
        </div>
      </div>
       {
        searchTerm.length > 0 ?  searchTerm.map((item , i) =>(
          <div className="userlist-item" key={i}>
          <div className="userlist-image">

          </div>
          <div className="userlist-name">
              <h4>{item.firstName}</h4>
          </div>
          <div className="userlist-button" >
            
          {
            blockButton2.includes(item.id + user.uid) || blockButton2.includes( user.uid + item.id) ?< Button  type='button' variant="contained" >Unblock</Button> :
           blockButton.includes(item.id + user.uid) || blockButton.includes( user.uid + item.id) ?< Button  type='button' variant="contained" >block</Button> :

            friendButton.includes(item.id + user.uid) ||   friendButton.includes(user.uid + item.id ) ?< Button  type='button' variant="contained" >friend</Button> :
            reqList3.includes(item.id + user.uid) || reqList.includes(user.uid + item.id ) ?
            <div>< Button  type='button' variant="contained" className='f-reject' >reject</Button>
            < Button  type='button' variant="contained" >accept</Button></div>:
            reqList.includes(item.id + user.uid) || reqList.includes(user.uid + item.id ) ? 
            < Button  type='button' variant="contained" onClick={()=>handleCancel(item)}>cancel requst</Button>:
        
            <Button onClick={()=>{handleSendRequst(item)}} type='button' variant="contained"><IoIosPersonAdd/></Button>
          }
          
          </div>
      </div>
        )): 
        userlist.map((item , i) =>(
          <div className="userlist-item" key={i}>
          <div className="userlist-image">

          </div>
          <div className="userlist-name">
              <h4>{item.firstName}</h4>
          </div>
          <div className="userlist-button" >
            
          {
            blockButton2.includes(item.id + user.uid) || blockButton2.includes( user.uid + item.id) ?< Button  type='button' variant="contained" >Unblock</Button> :
           blockButton.includes(item.id + user.uid) || blockButton.includes( user.uid + item.id) ?< Button  type='button' variant="contained" >block</Button> :

            friendButton.includes(item.id + user.uid) ||   friendButton.includes(user.uid + item.id ) ?< Button  type='button' variant="contained" >friend</Button> :
            reqList3.includes(item.id + user.uid) || reqList.includes(user.uid + item.id ) ?
            <div>< Button  type='button' variant="contained" className='f-reject' >reject</Button>
            < Button  type='button' variant="contained" >accept</Button></div>:
            reqList.includes(item.id + user.uid) || reqList.includes(user.uid + item.id ) ? 
            < Button  type='button' variant="contained" onClick={()=>handleCancel(item)}>cancel requst</Button>:
        
            <Button onClick={()=>{handleSendRequst(item)}} type='button' variant="contained">Add Friend</Button>
          }
          
          </div>
      </div>
        ))
       }
      </div>
    </>
  )
}

export default UserList
