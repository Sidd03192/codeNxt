import React from 'react';
import Compiler from '../Compiler/Complier';
import {LandingCard} from './landingCards2';
import Calendar from 'react-calendar'
import {Spacer} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";

export const LandingPage=()=> {
  return (

    <div className="flex">
      <Spacer x = {2}/>
      <Calendar/>
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
        <Button className="tiny text-black bg-black/20" variant="outline" color="default" radius="lg" size="lg">
          Go!
        </Button>
      </CardFooter>
    </Card>
    <Spacer x = {4} />
      <LandingCard />
    </div>
 
  
  );

}




