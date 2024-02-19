// this will have the authentiction . We will use passwordless authentication for ease of use and we will also use firebase. 
// This is where the user will be cretated and that itself will be a seperate collection. 
//we will use one tap sign in, so no pages. 

import "./auth.css";
import { useState, useEffect } from "react";
import {Input} from "@nextui-org/react";
import {MailIcon} from './components/MailIcon';
import React from 'react'
import {EyeFilledIcon} from "./components/EyeFilledIcon";
import {EyeSlashFilledIcon} from "./components/EyeSlashFilledIcon";
import {  onAuthStateChanged,signInWithEmailAndPassword,createUserWithEmailAndPassword, signInWithPopup,sendEmailVerification} from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import Cookies from "universal-cookie";
import { getAuth } from "firebase/auth";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export const Auth =()=>{
const cookies = new Cookies();

const [isVisible, setIsVisible] = React.useState(false);

const [Email, setEmail]= useState("");
const[Password, setPassword]=useState("");
const isLoginEnabled = Email !== "" && Password !== "" ;
const auth = getAuth();
const [user, setUser] = useState(auth.currentUser);
const toggleVisibility = () => setIsVisible(!isVisible);
const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
const vertical ="top"
const horizontal="center"

const [wrongPassword, setWrongPassword]=useState(false); 
const [success, setSuccess] = useState("")
const handleEmailChange = (event) => {
  setEmail(event.target.value);
};

const handlePasswordChange = (event) => {
  setPassword(event.target.value);
};

const handleSignInSuccess = (message, fortune) => {
  setOpenSnackbar(true); // Open the Snackbar
  setSnackbarMessage(message); // Set the Snackbar message
  setSuccess(fortune); // Set the
};
const validateEmail = (Email) => Email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  const isInvalid = React.useMemo(() => {
    if (Email === "") return false;

    return validateEmail(Email) ? false : true;
  }, [Email]);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
    setUser(authUser);
    
    if ( user!=null)
    {
      cookies.set("auth-token", user.refreshToken); //navigate("./dash");
    }
  });

  return () => unsubscribe();
}, []);

const signInWithGoogle = async () => {
  try {
    console.log("Attempting Google Sign-In...");
    const result = await signInWithPopup(auth, provider);
    console.log("Google Sign-In Result:", result);
    cookies.set("auth-token", result.user.refreshToken);

    // Handle successful sign-in with Google
    handleSignInSuccess("Google sign-in successful!", "success");
  } catch (err) {
    console.error("Google Sign-In Error:", err.message);
    handleSignInSuccess("You've got to Sign up first... Bud", "warning");

  }
};

const handleSignIn = async (event) => {
  event.preventDefault();
  // Your login logic...
  
  try {
    const result = await signInWithEmailAndPassword(auth, Email, Password);
    
    console.log("Email/Password Sign-In Result:", result);
    setWrongPassword(false);
    handleSignInSuccess("Google sign-in successful!", "success");
    
    // Check if the user's email is verified
    if (result.user.emailVerified) {
      cookies.set("auth-token", result.user.refreshToken);
      handleSignInSuccess(); // Call the function for successful login
    } else {
      console.log("Email is not verified. Sending verification email...");
      await sendEmailVerification(result.user);
    }
  } catch (err) {
    console.error("Email/Password Sign-In Error:", err.message);
    setWrongPassword(true);
    setPassword(""); setEmail("");
    handleSignInSuccess("Email or Password is Incorrect!", "warning");



  }
};
return (
<div className="background-image">
 
      <div className=" login">
      
      <div className="input">
        <h1> Login </h1>
        <div className="logo">
        <img src={require('./logoWithText.png')}/>

        </div>
      <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            labelPlacement="inside"
            startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            onChange={handleEmailChange}
            color={isInvalid ? "danger" : ""}
      errorMessage={isInvalid && "Please enter a valid email"}
      />
      <Input
        label="Password"
        className="password"
        placeholder="Enter your password"
        endContent={
          <button className="focus:outline-none " type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        onChange={handlePasswordChange}
        errorMessage={wrongPassword && "Are you a hacker? Or are you just stupid?"}
      />
<div className="buttonz">
  <button onClick={signInWithGoogle} className="btn google" >
  
  <svg
    version="1.1"
    width="20"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 512 512"
    style={{enableBackground: 'new 0 0 512 512'}}
    xmlSpace="preserve"
  >
    <path
      style={{fill: '#FBBB00'}}
      d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256    c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456    C103.821,274.792,107.225,292.797,113.47,309.408z"
    ></path>
    <path
      style={{fill: '#518EF8'}}
      d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451    c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535    c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
    ></path>
    <path
      style={{fill: '#28B446'}}
      d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512    c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771    c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
    ></path>
    <path
      style={{fill: '#F14336'}}
      d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012    c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0    C318.115,0,375.068,22.126,419.404,58.936z"
    ></path>
  </svg>
  Google
</button>
<button className="btn apple">
            <svg
              version="1.1"
              height="20"
              width="20"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 22.773 22.773"
              style={{enableBackground: 'new 0 0 22.773 22.773'}}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path>
                  <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path>
                </g>
              </g>
            </svg>
            Apple
          </button>
      </div>
{/* button for submit */}
      {isLoginEnabled && (
            <div className="buttonz">
              <button 
              onClick={handleSignIn}
              className="space" type="button">
                <strong>LOGIN</strong>
                <div id="container-stars">
                  <div id="stars"></div>
                </div>
                <div id="glow">
                  <div className="circle"></div>
                  <div className="circle"></div>
                </div>
              </button>
            </div>
          )}


<Snackbar    anchorOrigin={{vertical, horizontal}}  TransitionComponent="Fade"
 open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}> 
        <Alert onClose={() => setOpenSnackbar(false)} severity={success} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

</div>
    </div>
      </div>

)


}

