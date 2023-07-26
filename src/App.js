
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Forgot from "./ForgotPassword";
import Layout from "./Layout";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration";
import LoginUser from "./PrivetRouter/LoginUser";
import Notlogin from "./PrivetRouter/Notlogni";
import Massage from "./pages/Massage";
import Notification from "./pages/Notification/Notification";
import Settings from "./pages/Settings/Settings";


function App() {
  
   const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route element={<LoginUser/>}>
         <Route element={<Layout/>}>
            <Route index path="/" element= {<HomePage/>}></Route>
            <Route path="/massage" element= {<Massage/>}></Route>
            <Route path="/notification" element= {<Notification/>}></Route>
            <Route path="/setting" element= {<Settings/>}></Route>
         </Route>
      </Route>
      <Route element ={<Notlogin />}>
        <Route path="/Registration" element={<Registration/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Forgot" element={<Forgot/>}></Route>
      </Route>
      
    </Route>
   ))
  return (
  <>
   <RouterProvider router={router}></RouterProvider> 
  

  </>
  );
}

export default App;
