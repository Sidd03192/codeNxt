import React from "react";
import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";


export const UserCard=(props)=> {

  return (
    <div className="userCardParent">

    
    <Card className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
 
    isBlurred
    shadow="lg"
  >
    <CardBody>
    <div className="userCard"
>

    
      <div style={{width:'35%', display:"flex"}}className="userImage">
      {props.image!=null ? (
            <Image
                alt="Album cover"
                className="imagee"
                shadow="md"
                src={props.image} // Use props.image if it exists
                width="100%"
            />
            ) : (
            <Image
                alt="Album cover"
                className="imagee"
                shadow="md"
                src={require('../logoWithText.png')} // Use default image if props.image is null
                width="100%"
            />
     )}
  
        
      </div>
      <div className="info">
      <h2 className="user">{props.userName}</h2>
      <h3 className="company">{props.company}</h3>
      <h4 className="role">{props.role}</h4>
    </div>
      
      </div>
    </CardBody>
  </Card>
  </div>
  );
}
