import logo from './logo.svg';
import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from 'react';
import HomePage from './components/HomePage';

function App() {

  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState(null)

  useEffect(() => {
    const socket = io("https://woolly-sparkly-silence.glitch.me"); // Replace with your Socket.IO server URL
    setSocket(() => {
      return socket;
    });

    console.log(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      return;
    }
    
  }, [socket])

  useEffect(() => {
    if (socket !== null)
      setPage(<HomePage socket={socket} setPage={setPage} />)
  }, [socket])

  return (
    <div className="App">
      {page}

    </div>
  );
}

export default App;
