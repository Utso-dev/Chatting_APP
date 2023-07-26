import * as Yup from 'yup';

export const Signup = Yup.object({
  firstName : Yup.string().min(3,"must be 3 character").max(15, "Must be 15 characters or less").required("please enter your name"),
  email : Yup.string().email().required("please enter your email"),
  password : Yup.string().min(8, "must be 8 character").required("please enter your password"),
  confirmPassword : Yup.string().oneOf([Yup.ref("password"),null],"password don't matched").required("please enter your confrim password"),
    
})
export const SignIn = Yup.object({
  
  email : Yup.string().email().required("please enter your email"),
  password : Yup.string().min(8, "must be 8 character").required("please enter your password")
    
})