import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const App = () => {
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState();
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const _socket = io('http://localhost:3000');
    _socket.on('message', (sender, message) => {
      setMessages((messages) => [...messages, { sender, message }]);
    });
    setSocket(_socket)
    return () => {
      _socket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      socket.emit('joinRoom', { username, room });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <div id="chat-box">
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default App;
