
import {LandingCard} from './landingCards2';
import React, { useState } from 'react';
import Calendar from 'react-calendar'
import {Spacer} from "@nextui-org/react";
import 'react-calendar/dist/Calendar.css';
import {Link} from 'react-router-dom';
import { SparklesCore } from "./sparkle";


import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";

export const LandingPage=()=> {
    const [value, setValue] = useState(new Date());
     
  return (
    
    <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
    <div className="w-full absolute inset-0 h-screen">
    <Spacer x = {2}/>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={1.0}
        maxSize={2.0}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FF00FF"
      />
    </div>
    <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
      Welcome to CodeNXT!
    </h1>
    <Spacer y = {10}/>
    <div className="flex">
      <Spacer x = {2}/>
      {/* <Calendar 
      value={value}/> */}
       <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
   <Spacer x = {2}/>
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={300}
        src={require("./codeNext.png")}
        width={300}
      />
      <Spacer x = {2}/>
       <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="tiny text-black/80">Click here to get coding! </p>
        <ul>
        <li>
        <Link to = "/compilerPage">
        <Button className="tiny text-black bg-black/20" variant="outline" color="default" radius="lg" size="lg" >
          Go!


        </Button>
        </Link>
       
        </li>
        </ul>
       
       
      </CardFooter>
    </Card>
    <Spacer x = {4} />
      <LandingCard />
    </div>
 

  </div>
  
  );

}




