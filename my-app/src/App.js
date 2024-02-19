import logo from './logo.svg';
import './App.css';
import { AboutPage } from './tests';
import { LandingPage } from './pages/landingPage';
import { Auth} from './auth/auth';
import { Signup } from './auth/signup';
import {NextUIProvider} from "@nextui-org/react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { Header } from './components/header';
import Compiler from "./Compiler/Complier";
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase/firebase';



function App() {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState({
    userName: "",
    userPicture: "",
    userId:"",
    role: "",
    company: "",
    email: "",
    password: "",
    correctQuestions: [0]
  });

  const fetchUserData = async () => {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const firebaseUserData = docSnap.data();
      setUserData({
        userName: firebaseUserData.userName,
        userPicture: firebaseUserData.userPicture,
        userId: firebaseUserData.userId,
        role: firebaseUserData.role,
        company: firebaseUserData.company,
        email: firebaseUserData.email,
        correctQuestions: firebaseUserData.correctQuestions
      });
    }
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      fetchUserData();
    }
  }, [auth.currentUser]);

  return (
    <div className="App">
      <NextUIProvider>
        <div className="app">
          <BrowserRouter>
            
              <Header email={userData.userName} pic={userData.userPicture} />
            
            <Routes>
              <Route path="/LandingPage" element={<LandingPage />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/SignUp" element={<Signup />} />
            </Routes>
          </BrowserRouter>
        </div>
      </NextUIProvider>
    </div>
  );
}

export default App;
