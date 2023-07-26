import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CircleLoader from "react-spinners/CircleLoader";
import TextField from '@mui/material/TextField';
import { BsEyeFill } from 'react-icons/bs';
import { BsEyeSlashFill } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile  } from "firebase/auth";
import "./style.css";
import { useFormik } from 'formik';
import { Signup } from '../../Validation';
import { NavLink, useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {

// react spiner for button loding state=================
  const [loding, setLoding] = useState(false);
  const db = getDatabase();

  // form authantiction ===================== 
  const auth = getAuth();

  // navigate on page to other page open====================
  const nvigate = useNavigate();

    //eye show state part====================
  const [eyeShow , setEyeShow] = useState("password");

   const handelshow = () =>{
         if(eyeShow === "password"){
          setEyeShow("text");
         }
         else{
          setEyeShow("password");
         }
   }
  // formik use for form validation part=========================
   const initialValues ={
    firstName : "",
    email : "",
    password  : "",
    confirmPassword : "",
   }
   
  const formik = useFormik({
    validationSchema: Signup,
    initialValues: initialValues,
    onSubmit: ()=>{
      setLoding(true);
      createUserWithEmailAndPassword(auth, formik.values.email, formik.values.password)
      .then(({user})=>{
        updateProfile(auth.currentUser, {
          displayName:formik.values.firstName
        }).then(()=>{
          sendEmailVerification(auth.currentUser).then(()=>{
            set(ref(db, 'users/' + user.uid), {
              firstName:user.displayName,
              email: user.email,
            }).then(()=>{
              toast.success('Registration complete! please chack your email', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                });
              formik.resetForm();
              setLoding(false);
             
              setTimeout(() => {
                nvigate("/Login");
              }, 1500);
            });
          });
        });
       
        
      }).catch((error)=>{
          console.log(error.code);
      });
     
    }
  })
  return (
    <>
     <Container fixed>
     <Grid className='box' container spacing={2}>
      <ToastContainer/>
      <Grid item xs={12} sm={12} md={6}>
      <div className="sign-pic">
          <picture>
              <img src="./images/signup.png" alt="" />
          </picture>
      </div>
  </Grid>
      <Grid item xs={12} sm={12} md={6}>
      <div className="froms">
        <div className="registration-header">
            <h2>Get started with easily register</h2>
            <p>free register and you can enjoy it</p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} >
      <div className="input-forms">
      
      <TextField 
      onChange={formik.handleChange} 
      name='firstName' 
      className='input-design' 
      label="full name" 
      type="text" 
      value={formik.values.firstName}
      variant="outlined" />
      {
        formik.errors.firstName  ? <p className='Errors'>{formik.errors.firstName}</p> : null
      }
      <TextField 
      onChange={formik.handleChange} 
      name='email' 
      className='input-design' 
      label="email" 
      type="email" 
      value={formik.values.email}
      variant="outlined" />
      {
        formik.errors.email && formik.touched.email ? <p className='Errors'>{formik.errors.email}</p> : null
      }
       <div className="password">
       <TextField 
       onChange={formik.handleChange} 
       name='password' 
       className='input-design' 
       label="new password" 
       type={eyeShow} 
       value={formik.values.password}
       variant="outlined" />
       {
        formik.errors.password && formik.touched.password ? <p className='Errors'>{formik.errors.password}</p> : null
      }
          <div className="eyes" onClick={handelshow}>  
             {eyeShow==="password" ? <BsEyeSlashFill cursor="pointer"/>:<BsEyeFill cursor="pointer" className='eyeColor'/>}
         
          </div>
       </div>
       <div className="password">
       <TextField 
       onChange={formik.handleChange} 
       name='confirmPassword' 
       className='input-design' 
       label="confirm password" 
       type={eyeShow}
       value={formik.values.confirmPassword} 
       variant="outlined" />
       {
        formik.errors.confirmPassword && formik.touched.confirmPassword ? <p className='Errors'>{formik.errors.confirmPassword}</p> : null
      }
          <div className="eyes" onClick={handelshow}>  
            {eyeShow==="password" ? <BsEyeSlashFill cursor="pointer"/>:<BsEyeFill cursor="pointer" className='eyeColor'/>}
         
          </div>
       </div>
         
      </div>
      {
        loding ? <div className="button">
        <Button type='submit' variant="contained"><CircleLoader size={23} color='#fff'/></Button>
      </div> : <div className="button">
        <Button type='submit' variant="contained">Contained</Button>
      </div>
      }
      
      <div className="link">
        <p>Already have an account ? 
          <NavLink to='/Login'> Sign in</NavLink>
        </p>
      </div>
      </form>
      
      </Grid>

  
  </Grid>
      </Container>
      
    </>
  )
}

export default Registration