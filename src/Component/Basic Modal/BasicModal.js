
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getDatabase, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const BasicModal = ({open, setOpen}) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
  
    const handleClose = () => setOpen(false);
// from vladitaion
const [groupItems ,setGroupItems]= useState({
  name: '',
  title: '',
})
const handleChange = (e)=>{
  const {name, value} =e.target ;
  setGroupItems((prev) =>({
    ...prev,
    [name]: value,
  }))
}
    // write data 
    const db = getDatabase();
    const user = useSelector((users)=>users.logins.logged)
 

    const handleCreateGroup = ()=>{
      if(!groupItems.name || !groupItems.title){
        console.log("please fill up the from");
      }else{
        set(push(ref(db, 'Groups/')), {
          adminId: user.uid,
          adminName:user.displayName,
          groupName: groupItems.name,
          groupTag:groupItems.title,
        }).then(()=>{
           setGroupItems({
             name:"",
             title:""
           })
            setOpen(false)
            
        });
      }
   
    }
  return (
    <>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ceaate Your Group
          </Typography>
          <TextField id="outlined-basic" label="Group  Name" variant="outlined" 
          margin='normal' fullWidth onChange={handleChange} name='name' value={groupItems.name} />
          <TextField id="outlined-basic" label="Group  tatile" variant="outlined" 
          margin='normal' fullWidth onChange={handleChange} name='title' value={groupItems.title}/>
           <Button variant="contained" color="success" onClick={handleCreateGroup}>
             Create Group
         </Button>
        </Box>
      </Modal>
    </>
  )
}

export default BasicModal
