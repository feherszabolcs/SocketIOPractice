import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from './Message';

const socket = io('http://localhost:3001');

export interface Message {
  content: string;
  username?: string;
  room?: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');


  useEffect(() => {
    socket.on('connect', () => {
      setMessages([...messages, { content: `You connected with id: ${socket.id}` }]);
      localStorage.setItem("user", "jani")
    })

    socket.on('recieve-message', (message: Message) => {
      setMessages([...messages, message]);
    });

    socket.on('connect_error', (err) => {
      setMessages([...messages, { content: err.message }])
    });

    socket.on('user-joined', (data: any) => {
      setMessages([...messages, { content: `${data.id} joined` }])
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('send-message', { content: messageText });
    setMessages([...messages, { content: messageText }]);
    setMessageText('');
  };

  return (
    <div className="App">
      <h1>Real-Time Chat App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <Message key={index} username={message.username} content={message.content} />
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;