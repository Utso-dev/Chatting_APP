import React from 'react'
import "./style.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { getAuth, sendPasswordResetEmail} from "firebase/auth";
import { NavLink } from 'react-router-dom';




const Forgot = () => {
 const auth = getAuth();

const formik = useFormik({
    initialValues:{
        email : "",
    },
     onSubmit:()=>{
        sendPasswordResetEmail(auth, formik.values.email)
    }
})
  return (
    <div>
       <div className="forgot-password">
           <div className="forgot-wrpper">
              <div className="forgot-header">
                 <h4>select your email for forgot password</h4>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="reset-input">
                    <TextField
                    className='reset-input-design' 
                     id="outlined-basic"
                     label="Enter your email" 
                     variant="outlined" 
                     name='email'
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     type="email"
                     />
                </div>
                  <div className="reset-button">
                     <NavLink to = "/Login"> <Button variant="contained">
                       Cancel
                     </Button>
                     </NavLink>
                     <Button type='submit' variant="contained">Next</Button>
                  </div>
              </form>
           </div>
       </div>
    </div>
  )
}

export default Forgot
