import React, { useState } from "react";
import "./Compiler.css";
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from '@uiw/react-codemirror';
import { Button } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import { useEffect } from "react";
import Split from 'react-split';

export const Compiler = () => {
  const [value, setValue] = useState(localStorage.getItem("savedCode") || "");
  const [output, setOutput] = useState(""); // State variable to hold the output
  const [isLoading, setIsLoading] = useState(false); // State variable to control loading state
console.log(value);
  const inputChangeHandler = (val, viewUpdate) => {
    setValue(val);
    localStorage.setItem("savedCode", val);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "885ed62442msh11401e38e070fb7p19b807jsn2f07fa4c01bb",
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            source_code: value,
            stdin: value,
            language_id: 62,
          }),
        }
      );

      const jsonResponse = await response.json();
      let jsonGetSolution = {
        status: { description: "Queue" },
        stderr: null,
        compile_output: null,
      };
      while (
        jsonGetSolution.status.description !== "Accepted" &&
        jsonGetSolution.stderr == null &&
        jsonGetSolution.compile_output == null
      ) {
        if (jsonResponse.token) {
          let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
          const getSolution = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key":
                "885ed62442msh11401e38e070fb7p19b807jsn2f07fa4c01bb",
              "content-type": "application/json",
            },
          });
          jsonGetSolution = await getSolution.json();
        }
      }

      if (jsonGetSolution.stdout) {
        const output = atob(jsonGetSolution.stdout);
        setOutput(output); // Update the output state with the received output
        console.log(output);
        
      } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);
        setOutput(error);
        console.log(error);

      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);
        setOutput("compilation Error\n"+compilation_error);
        console.log(compilation_error);

      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading state to false once execution is done
    }
  };

  return (
    <div className="whole">
      <div className="row container-fluid">
        <div className="col-6 ml-4">
          <label htmlFor="solution"></label>
          <div id="source" className="input">
            <CodeMirror 
              value={value} 
              height="70vh"
              name="solution"
              extensions={[javascript({ jsx: true })]} 
              theme={tokyoNight}
              onChange={inputChangeHandler} />
  
            <div id="output" style={{ marginTop: "20px" }}>
              <ScrollShadow hideScrollBar className="w-[300px] h-[400px]">
                <div style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
                  <h2>Output</h2>
                  <pre>{output}</pre>
                </div>
              </ScrollShadow>
            </div>
  
            <Button 
              type="submit"
              color="secondary"
              id="submit-btn"
              onClick={submitHandler}
              isLoading={isLoading} // Set isLoading attribute based on loading state
            >
              {isLoading ? 'Running...' : 'Run'} {/* Button text based on loading state */}
            </Button>
          </div>
        </div>
  
        {/* <div className="col-6" >
          <div id="output" >
            <h2>Output</h2>
            <pre>{output}</pre>
          </div>
        </div> */}
      </div>
    </div>
  );
  
}