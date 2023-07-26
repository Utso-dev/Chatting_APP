import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";


export default function LoginUser(){
    const user = useSelector((users)=> users.logins.logged);

    return user ? <Outlet /> : <Login></Login> ;

}