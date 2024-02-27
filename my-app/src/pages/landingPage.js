import React from 'react';
import Compiler from '../Compiler/Complier';
import {LandingCard} from './landingCards2';
import {Spacer} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export const LandingPage=()=> {
  return (

    <div className="flex">
      <LandingCard />
      <Spacer x={4} />
      <LandingCard />
      <LandingCard />
      <Spacer x={4} />
      <LandingCard />
    </div>
 
  
  );

}




