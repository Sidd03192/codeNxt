
import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import { useState } from "react";
import { useEffect } from "react";
import "./question.css"
export const Question =(props)=> {

  const [value, setValue] =useState(localStorage.getItem("count")|| "Adarsh messed up");
  // boiler plate code goes where adarsh thing is there. 
  useEffect(() => {
    localStorage.setItem("count", value);
  }, [value]);
 
 
 
 
 
 
 
 
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return( 
  <>
  
  <div className="codeEditor">

 
  <CodeMirror 
  value={value} 
  height="900px"
  extensions={[javascript({ jsx: true })]} 
  theme={tokyoNight}
  onChange={onChange} />;
   </div>

 </>
  )
}
