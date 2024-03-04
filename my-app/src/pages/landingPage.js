
import Compiler from '../Compiler/Complier';
import {LandingCard} from './landingCards2';
import React, { useState } from 'react';
import Calendar from 'react-calendar'
import {Spacer} from "@nextui-org/react";
import 'react-calendar/dist/Calendar.css';
import {Link} from 'react-router-dom';

import {Card, CardHeader, CardBody, CardFooter, Divider, Image, Button} from "@nextui-org/react";

export const LandingPage=()=> {
    const [value, setValue] = useState(new Date());
     function onChange(nextValue) {


    setValue(nextValue);
  }
  return (

    <div className="flex">
      <Spacer x = {2}/>
      <Calendar onChange={onChange}
      value={value}/>
       <Card
      isFooterBlurred
      radius="lg"
      className="border-none"
    >
   
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={300}
        src={require("./codeNext.png")}
        width={300}
      />
       <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="tiny text-white/80">Click here to get coding! </p>
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
 
  
  );

}




