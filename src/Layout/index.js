import React from 'react'
import Grid from '@mui/material/Grid';
import {  Outlet } from 'react-router-dom';
import SideBare from '../Sidebar';

const Layout = () => {
  return (
    <>
       <Grid container spacing={2}>
        <Grid item xs={12}  sm={12} md={2} lg={1}>
           <SideBare/>
        </Grid>
        <Grid item xs={12} sm={12} md={10} lg={11}>
           <Outlet />
        </Grid>
       
      </Grid>
    </>
  )
}

export default Layout
