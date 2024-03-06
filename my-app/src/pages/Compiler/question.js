import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { CardMedia } from '@mui/material';
import { SparklesCore } from "../sparkle";
import "./question.css"
export const Question = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const problemsCollection = collection(db, 'problems');
        const problemsSnapshot = await getDocs(problemsCollection);

        const problemsData = problemsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProblems(problemsData);
        console.log(problemsData);
        console.log(problems[3].StarterCode)
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    fetchProblems();
  }, []);
  

  return (
    
    



    <div className="questions">
       <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
        Problems
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
 
        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
      <div className='content-container'>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
          {problems.map((problem) => (
            <Card key={problem.id} sx={{ maxWidth: 270 }}>
              <CardActionArea
  component={Link}
  to={{
    pathname: `/CompilerPage/${problem.id}`,
    search: `?starterCode=${encodeURIComponent(problem.id)}&questionDetails=${encodeURIComponent(problem.QuestionDetails)}`
  }}
  
>

                <CardMedia
                  component="img"
                  height="100"
                  image={"https://associationsnow.com/wp-content/uploads/2016/01/0111_javascript.jpg"} 
                  alt={`Problem ${problem.id}`}
                  style={{ maxHeight: '100%' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {problem.id}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
