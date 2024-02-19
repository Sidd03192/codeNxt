

import React, { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import {Navigate} from 'react-router-dom'
import { Link } from "react-router-dom";
export const Profile=(props)=> {

    const [user, setUser]= useState(getAuth().currentUser);

  
    const logout = () => {
      console.log("hello");
      const auth = getAuth();
      signOut(auth);
      setUser(null); 
    };

 

  const login = () => {
    console.log("login");
    return <Navigate to="/login" />;
  };

  const signUp = () => {
     // Redirect to the sign-up page
  };

    if (user!=null){
       

       
        return (
            <div className="profile">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src={props.pic}
                  name="joe"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{props.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  My Settings
                </DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                
                <DropdownItem onClick={logout}key="logout" color="danger">
                    

                    Log Out
                   
                  
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            </div>
          );

    }
   
    else{
        return (
            <div className="profile">

          
            <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
               
                name=""
              />
            </DropdownTrigger>
            <DropdownMenu  closeOnSelect={false} aria-label="Profile Actions" variant="flat">
              <DropdownItem key="5" className="h-14 gap-2">
                <p className="font-semibold">Not Signed In</p>
                
              </DropdownItem>
              
              <DropdownItem key="g">
                Help & Feedback
              </DropdownItem>
              <DropdownItem onClick={login} key="Sign In" color="success">
              <Link className="hello" to="/signUp"> Sign Up </Link>

                
              </DropdownItem>
              <DropdownItem  key="er" color="success">
                
                <Link className="hello" to="/login"> Log In </Link>
                
              </DropdownItem>

            </DropdownMenu>
          </Dropdown>
          </div>
        );
       
    }
  
}
