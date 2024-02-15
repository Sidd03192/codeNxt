import React from 'react'
//import {FaHamburger} from "react-icons/fa";
import { useState } from 'react';
import {Link} from "@nextui-org/react";
//import {BiHomeAlt} from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';

import Cookies from "universal-cookie";
import { signOut,getAuth } from 'firebase/auth';
//import {Profile} from "./Profile"
import "./header.css"

export const Header = (props) => {
    const cookies = new Cookies();
    const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  
    const logout = () => {
      console.log("hello");
      const auth = getAuth();
      signOut(auth);
      setIsAuth(false); 
    };
  
  
    return (
<div className= "header" >

        <div className='title'>           
            
            <h1 className='mainText' style={{color:"white", justifyContent:"center", fontSize:"20px", fontWeight:"bold"}}> Brain Flow </h1>       
        </div>
          <div className="pages">
          <Tooltip title="Dashboard" arrow>
            <ul>
                <li className = "headerLink">
                
                <Link to="/"> Dashboard </Link>
                </li>
            </ul>
            </Tooltip>
            <Tooltip title="Collaborate" arrow>


            <ul>
                <li>
                <Link to="/chat"> Collaborate </Link>
                </li>
            </ul>
            </Tooltip>
          
            <Tooltip title="About" arrow>
            <ul>
                <li>
                <Link to="/about"> About </Link>
                </li>
            </ul>
            </Tooltip>
            <Tooltip title="Profile" arrow followCursor>
            {/* <ul className="profile"> 
                <li>   <Profile name ={props.name} email={props.email} photo={props.photo}/>
                
                </li>
            </ul> */}
            </Tooltip>
            <Tooltip title="learn" arrow>
            <ul>
                <li>
                <Link to="/learn"> Questions </Link>
                </li>
            </ul>
            </Tooltip>
          </div>
</div>
  );
}
