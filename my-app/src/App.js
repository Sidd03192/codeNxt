import logo from './logo.svg';
import './App.css';
import { AboutPage } from './tests';
import { Question } from "./pages/Compiler/question";
import { LandingPage } from './pages/landingPage';
import { Compiler } from './pages/Compiler/Complier';
import { Auth } from './auth/auth';
import { Signup } from './auth/signup';
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Header } from './components/header';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { toast } from 'react-toastify';

function App() {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState({
    userName: "",
    userPicture: "",
    userId: "",
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserData();
      }
    });
    return () => unsubscribe();
  }, [auth]); 

  // Private Route Component
  const PrivateRoute = ({ element, ...rest }) => {
    if (user) {
      return element;
    } else {
      alert("You are being redirected to sign up.");
      return <Navigate to="/SignUp" />;
    }
  };

  return (
    <main className="">
      <div className="App">
        <NextUIProvider>
          <div className="app">
            <BrowserRouter>
              <Header isAuthenticated ={user}email={userData.userName} pic={userData.userPicture} />
              <Routes>
                <Route path="/LandingPage" element={<LandingPage />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/Question" element={<PrivateRoute element ={<Question />}/>} />
                <Route path="/CompilerPage/:problemID" element={<Compiler/>} />

              </Routes>
            </BrowserRouter>
          </div>
        </NextUIProvider>
      </div>
    </main>
  );
}

export default App;
