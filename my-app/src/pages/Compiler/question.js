import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { CardMedia } from '@mui/material';

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
      <h1 className='pagehead'>Problems</h1>
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
