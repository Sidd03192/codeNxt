import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
export const  LandingCard=()=> {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={require("./codeNext.png")}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">CodeNXT</p>
          <p className="text-small text-default-500">CodeNXT.com</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Log in once per day to see your graph go up!
         <p>Go Bears!</p>
        </p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="chart"
        >
          Check out your charts!
        </Link>
      </CardFooter>
    </Card>
  );
}
