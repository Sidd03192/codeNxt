import React, { useState } from "react";
import "./Compiler.css";
import { Chat } from "./chat";
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from '@uiw/react-codemirror';
import { Button } from "@nextui-org/react";
import {ScrollShadow} from "@nextui-org/react";
import { useEffect } from "react";
import Split from 'react-split';
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Accordion, AccordionItem} from "@nextui-org/react";

import { Roomz } from "./roomz";
import { ChatGPT } from "./server";
export const Compiler = (props) => {
  const location = useLocation(); // Use useLocation hook
  const { problemId } = useParams();
  console.log(problemId);
  const [details, setDetails] = useState('');
  const[name, setName]=useState("")
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [success, setSuccess] = useState("")
  const handleSignInSuccess = (message, fortune) => {
    setOpenSnackbar(true); // Open the Snackbar
    setSnackbarMessage(message); // Set the Snackbar message
    setSuccess(fortune); // Set the
  };
  const vertical ="top"
const horizontal="center"


  const twoSum =
   `import java.util.*;
  public class Main {
      public static int[] twoSum(int[] nums, int target) {
          // input your code here. return null;
      }
  
      public static void main(String[] args) {
          int[][] testCases = {{2, 7, 11, 15}, {5, 2, 3}, {3, 2, 4}};
          int[] targets = {9, 7, 6};
          for (int i = 0; i < testCases.length; i++) {
              int[] result = twoSum(testCases[i], targets[i]);
              System.out.println("Input: nums = [" + testCases[i][0] + ", " + testCases[i][1] + ", " + testCases[i][2] + ", " + testCases[i][3] + "], target = " + targets[i]);
              if (result.length == 0) {
                  System.out.println("Output: No such numbers found");
              } else {
                  System.out.println("Output: [" + result[0] + ", " + result[1] + "]");
              }
              System.out.println("-----");
          }
      }
  }`;
  const buzz=`public class Main {

    public static List<String> fizzBuzz(int n) {
        // start here
    }

    public static void main(String[] args) {
        int[] testCases = {15, 20, 25};

        for (int i = 0; i < testCases.length; i++) {
            List<String> result = fizzBuzz(testCases[i]);
            System.out.println("Input: " + testCases[i]);
            System.out.println("Output: " + result);
            System.out.println("-----");
        }
    }
}
`;
const PalindromeNumber=`public class Main {

  public static boolean isPalindrome(int x) {
      // start here
  }

  public static void main(String[] args) {
      int[] testCases = {121, -121, 10};

      for (int i = 0; i < testCases.length; i++) {
          boolean result = isPalindrome(testCases[i]);
          System.out.println("Input: " + testCases[i]);
          System.out.println("Output: " + result);
          System.out.println("-----");
      }
  }
}
`;
const reverse=`public class Main {

  public static void reverseString(char[] s) {
      // start here

  }

  public static void main(String[] args) {
      char[][] testCases = {
          {'h', 'e', 'l', 'l', 'o'},
          {'H', 'a', 'n', 'n', 'a', 'h'},
          {'a', 'b', 'c', 'd'}
      };

      for (int i = 0; i < testCases.length; i++) {
          reverseString(testCases[i]);
          System.out.println("Input: " + Arrays.toString(testCases[i]));
          System.out.println("Output: " + Arrays.toString(testCases[i]));
          System.out.println("-----");
      }
  }
}
`
  
  const [value, setValue] = useState();
    const [output, setOutput] = useState(""); // State variable to hold the output
  const [isLoading, setIsLoading] = useState(false); // State variable to control loading state
 const[deta,setDeta]=useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);
    const code = searchParams.get('starterCode');
    const det = searchParams.get('questionDetails');
      setDeta(det);
    async function getDocumentAndField() {
      const collectionRef = collection(db, 'problems'); // Replace with your collection name
      const documentRef = doc(collectionRef, code); // Replace with your document ID
    
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists) {
        const data = docSnap.data();
        const fieldName = 'QuestionDetails'; // Replace with your field name
        const fieldValue = data[fieldName];
        console.log('Field value:', fieldValue);
        setDetails(fieldValue);
      } else {
        console.log('No such document!');
      }
    }
    
    getDocumentAndField();


    console.log("code"+code);
    console.log("question: "+ det);
    setDetails(det);
    if (code==='FizzBuzz')
    {
      console.log("hooray")
      setValue(buzz);
    }
    if (code==='problem1')
    {
      console.log("hooray")
      setValue(twoSum);
    }
    if (code==='PalindromeNumber')
    {
      console.log("hooray")
      setValue(PalindromeNumber);
    }
    if (code==='Reverse a String')
    {
      console.log("hooray")
      setValue(reverse);
    }
    }, [location]);




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
        const passedCount = (output.match(/PASSED/g) || []).length;
        console.log("Number of times 'PASSED' appeared:", passedCount);
        const failedCount = (output.match(/FAILED/g) || []).length;
        console.log("Number of times 'FAILED' appeared:", passedCount);
        if (passedCount==3)
        {
          handleSignInSuccess(" Congrats ! Thats Perfect ", "success");

        }
        else{
          handleSignInSuccess("Failed "+failedCount +" Test Cases", "warning");

        }
        
      } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);
        setOutput(error);
        console.log(error);
        handleSignInSuccess("Run-Time Error", "warning");


      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);
        setOutput("compilation Error\n"+compilation_error);
        console.log(compilation_error);
        handleSignInSuccess("Compilation Error", "warning");

      }
    } catch (error) {
      console.error("Error:", error);

    } finally {
      setIsLoading(false); // Set loading state to false once execution is done
    }
  };

  return (
    <div className="whole">
      <div className="row container-fluid ">
        <div className="col-6 ml-4 flex">
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
          <div className="col-6 blue" >
          <div className="output"   >
            <h1>Output</h1> 

            <Accordion variant="shadow" className="accordian">
      <AccordionItem key="1" aria-label="Accordion 1" title="Description ">
      <p>{details}</p>

      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Discussion">
          <Chat room={deta}/>     
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 2" title="Ask Gerboa">
          <ChatGPT ca={value}/>  
      </AccordionItem>
    </Accordion>
          </div>
          <Snackbar    anchorOrigin={{vertical, horizontal}}  TransitionComponent="Fade"
 open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}> 
        <Alert onClose={() => setOpenSnackbar(false)} severity={success} variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
        </div>
        </div>
  
        
      </div>
    </div>
  );
  
}