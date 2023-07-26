import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill, BsFacebook } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import "./style.css";
// import { useDispatch } from 'react-redux';
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import CircleLoader from "react-spinners/CircleLoader";
import { toast, ToastContainer } from 'react-toastify';
import { Loginusers } from '../../Features/Slice/Loginslice';
import { SignIn } from '../../Validation';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    // eye show part=================
    let[eyeshow , setEyeShow] = useState("password");
    const handleShow = () =>{
        if(eyeshow === "password"){
            setEyeShow("text");
        }else{
            setEyeShow("password")
        }
    }
 //Login validation  part start
const auth = getAuth();
const dispatch = useDispatch()
// react spiner===============
const[loding , setLoding] = useState(false)
//navigate============
const navigate = useNavigate();

const formik = useFormik({
      initialValues:{
        email:"",
        password:"",
      },
      validationSchema: SignIn,
      onSubmit:()=>{
        setLoding(true);//react spiner
        signInWithEmailAndPassword(
          auth, 
          formik.values.email, 
          formik.values.password
          )
          .then(({user})=>{
            toast.success('complete login', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            dispatch(Loginusers(user));
            localStorage.setItem("users", JSON.stringify(user));
            
            setLoding(false);//react spiner
            setTimeout(() => {
              navigate("/");
            }, 2000);
              
        }).catch((error)=>{
         
          if("error.auth/user-not-found"){
            toast.error('wrong email', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
            }else if(" error.auth/wrong-password"){
              toast.error('wrong pass ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
            setLoding(false)
        })
      }
    });
    // google login ====================
    const provider = new GoogleAuthProvider();

    const handelGoogle = ()=>{
      signInWithPopup(auth, provider)
      .then(()=>{
        toast.success('complete login', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          });
          setTimeout(() => {
            navigate("/");
          }, 2000);
          
      }).catch((error)=>{
        console.log(error.code);
      });
    }

    // const handleSigniN = ()=>{
    //   signInWithEmailAndPassword(auth, formik.values.email, formik.values.password)
    // }
    //Login validation  part end
  return (
    <div>
       <Container fixed>
       <ToastContainer/>
       <Grid className='box' container spacing={2}>
       <Grid item xs={12} sm={12} md={6} >
         <div className="sign-pic">
          <picture>
              <img src="./images/signup.png" alt="" />
          </picture>
      </div>
         </Grid>
         <Grid item xs={12} sm={12} md={6} >
          <div className="singin-header">
            <h1>Login Your Account</h1>
          </div>
             {/* <Grid item xs={9}>  */}
            <div className="google-D-flex">
              <div className="google-login" onClick={handelGoogle}>
                <div className="g-icon">
                  <FcGoogle  />
                </div>
                 <div className="g-button">
                 <p > <NavLink> Login with Google</NavLink></p>
                 </div>
              </div>
              <div className="google-login" onClick={handelGoogle}>
                <div className="g-icon">
                <BsFacebook />
                </div>
                 <div className="g-button">
                 <p > <NavLink> Login with Facebook</NavLink></p>
                 </div>
              </div>
             
            </div>
            {/* </Grid> */}
             
          <div className="from-wrp">
            <div className="forms">
           <form onSubmit={formik.handleSubmit}>
           <TextField  
           className='input-design' 
           label="Enter your email" 
           type="email"
           variant="outlined"
           name='email' 
           onChange={formik.handleChange}
           value={formik.values.email}
           />
           {formik.errors.email ? <p style={{color:"red",paddingBottom:"20px"}}>{formik.errors.email}</p>:null}
           <div className="password">
             <TextField  
             className='input-design' 
             label="Enter your password" 
             variant="outlined" 
             type={eyeshow}
             name="password"
             onChange={formik.handleChange}
             value={formik.values.password}
             />
             <div className="eyes" onClick={handleShow}>  
              {
                eyeshow === "password" ? <BsEyeSlashFill cursor="pointer"/> : <BsEyeFill cursor="pointer" color='#6A4DF4'/>
              }
            </div>
            {formik.touched.password && formik.errors.password ? <p className='Errors'>{formik.errors.password}</p>:null}
           </div>
           

          <div className="button">
           {
            loding ?   <Button type='submit' variant="contained" ><CircleLoader size={23} color='#fff'/></Button> :
            <Button type='submit' variant="contained" >Log in</Button>
           }
             
         </div>
           </form>
         <div className="forgot">
              <NavLink to="/Forgot">Forgot your password</NavLink>
         </div>
         <div className="link">
            <p>Already have an account ?  
                <NavLink to='/Registration'> Sign up</NavLink>
            </p>
          </div>
         </div>
             </div>
         </Grid>
         
        
       </Grid>
        
      </Container>
    </div>
  )
}

export default Login
