import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";


export const  Question=(props)=> {

  const [value, setValue] = React.useState(props.boilerplate);
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log('val:', val);
    setValue(val);
  }, []);
  return <CodeMirror 
  value={value} 
  height="200px" 
  extensions={[javascript({ jsx: true })]} 
  theme={tokyoNight}
  onChange={onChange} />;

}
