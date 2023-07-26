import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


export default function Notlogin(){
    const user = useSelector((users)=> users.logins.logged);

    return user ? <Navigate to="/"></Navigate> : <Outlet /> ;

}