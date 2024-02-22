import React from 'react'
//import {FaHamburger} from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
//import {BiHomeAlt} from "react-icons/bi";
import Tooltip from '@mui/material/Tooltip';
import Cookies from "universal-cookie";
import { signOut,getAuth } from 'firebase/auth';
//import {Profile} from "./Profile"
import "./header.css"
import { Profile } from './profile';

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
            
        <img className="logo1"src={require('./logo.png')}/>
   
        </div>
          <div className="pages">
          <Tooltip title="landing" arrow>
            <ul>
                <li className = "headerLink">
                
                <Link to="/landingPage"> Landing </Link>
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
            <Tooltip title="Questions" arrow>
            <ul>
                <li>
                <Link to="/Question"> Question </Link>
                </li>
            </ul>
            </Tooltip>
            <div>
            <Profile email={props.email} pic={props.pic}/>
            </div>
            
          </div>
</div>
  );
}
