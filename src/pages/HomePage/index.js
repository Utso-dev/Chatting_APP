import Grid from '@mui/material/Grid';
import React from 'react';
import Block from '../../Component/Block/Block';
import Friend from '../../Component/Friend/Friend';
import FriendRequst from '../../Component/FriendRequst/FriendRequst';
import Grouplist from '../../Component/GroupList/Grouplist';
import MyGroup from '../../Component/MyGroup/MyGroup';
import Searchbar from '../../Component/Searchbar/Searchbar';
import UserList from '../../Component/UserList/UserList';
import "./style.css";

const HomePage = () => {
  return (
    <div>
      <div className="home-wrrper">
      <Grid container  display="flex"
  justifyContent="center"
  alignItems="center" spacing={3}>
        <Grid item  xs={12} sm={8}  md={6} lg={4}>
           <div>
            <Searchbar/>
           </div>
           <div>
            <Grouplist/>
           </div>
           <div>
           <FriendRequst/>
           </div>
        </Grid>
        <Grid item  xs={12} sm={8} md={6} lg={4}>
          <div>
          <Friend/>
          </div>
          <div>
            <MyGroup/>
          </div>
        </Grid>
        <Grid item  xs={12} sm={12} md={12} lg={4}>
        <Grid container  display="flex"
  justifyContent="center"
  alignItems="center" spacing={3}>
    <Grid item  xs={12} sm={8} md={6} lg={12}>
    <div>
          <UserList/>
         </div>
    </Grid>
    <Grid item  xs={12} sm={8} md={6} lg={12}>
    <div>
          <Block/>
         </div>
    </Grid>
  </Grid>
         {/* <div className="home-f">
         
         
         </div> */}
        </Grid>
      </Grid>
      </div>
      
    </div>
  )
}

export default HomePage
