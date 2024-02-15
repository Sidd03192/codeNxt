import logo from './logo.svg';
import './App.css';
import { AboutPage } from './tests';
import { LandingPage } from './pages/landingPage';
import { Auth} from './auth/auth';
import { Signup } from './auth/signup';
import {NextUIProvider} from "@nextui-org/react";
import { Header } from './components/header';

function App() {
  return (
    <div className="App">
      
      <NextUIProvider> 
       <Header/>
       <Signup/>   
      
        
      </NextUIProvider>
      



     
    </div>
  );
}

export default App;
