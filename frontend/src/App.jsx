import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';

function App() {
  const [name, setName] = useState("");
  const [result, setResult] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('chat message', msg => {
      setResult((prev) => [...prev, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && socket) {
      socket.emit('chat message', name);
    }
  }

  return (
    <>
      <ul>{result.map((msg, index) => <li key={index}>{msg}</li>)}</ul>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
