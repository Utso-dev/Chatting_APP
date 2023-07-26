import React from 'react'
import MassageList from '../../Component/MassagelList/MassageList';
import "./style.css"
import {  Grid } from '@mui/material'
import GroupMsg from '../../Component/groupMsg/GroupMsg';
import FriendChat from '../../Component/FriendChat/FriendChat';

const Massage = () => {
 
  return (
      <div>
        <Grid container spacing={2} justifyContent="space-between" className='m-gap'>
          <Grid item xs={12} sm={12} md={6} lg={4} >
             <div className="groupmsg">
              <GroupMsg/>
             </div>
      <div className="massFriend">
        <FriendChat/>
      </div>
       </Grid>

       <Grid item xs={12} sm={12}  lg={8}>
         <MassageList/>
       </Grid>
        </Grid>
    </div>
  )
}

export default Massage
