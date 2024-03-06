import React, { useState, useRef } from 'react';
import { Auth } from '../../auth/auth';
import Cookies from 'universal-cookie';
import { Chat } from './chat';
import { TextField, Button, Card, CardContent } from '@mui/material';

const cookies = new Cookies();

export const Roomz = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState('');
  const roomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div>
          <h1 className="text-4xl font-bold mb-4 text-black">Hello</h1>
          <Auth setIsAuth={setIsAuth} />
        </div>
      </div>
    );
  }

  return (
    <div 
    style={{
     
    }}
    >
      {room ? (
        <Chat room={room}></Chat>
      ) : (
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-black w-full">Enter Room Name:</h1>
          <TextField
            placeholder="Room Name"
            inputRef={roomInputRef}
            className="mb-4 w-full"
          />
          <Button
            onClick={() => setRoom(roomInputRef.current.value)}
            variant="contained"
            color="primary"
          >
            Enter Chat
          </Button>
        </div>
      )}
    </div>
  );
};
