// ChatApp.jsx
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL; // change to your server

export default function ChatApp() {
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [messages, setMessages] = useState([]); // {from, text, time}
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    const s = io(SOCKET_URL, { transports: ['websocket'] });
    setSocket(s);

    s.on('connect', () => {
      console.log('connected to socket', s.id);
    });

    s.on('message', (payload) => {
      setMessages(prev => [...prev, payload]);
    });

    s.on('system', (text) => {
      setMessages(prev => [...prev, { from: 'system', text, time: new Date().toISOString() }]);
    });

    s.on('users', (list) => {
      setConnectedUsers(list);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    // auto-scroll when messages change
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  function handleJoin() {
    if (!name.trim()) return alert('Enter a name');
    socket.emit('join', name.trim());
    setJoined(true);
  }

  function sendMessage() {
    if (!input.trim()) return;
    socket.emit('message', input.trim());
    setInput('');
  }

  function handleKey(e) {
    if (e.key === 'Enter') sendMessage();
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 border rounded">
      {!joined ? (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Join Chat</h2>
          <input
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={handleJoin} className="bg-blue-500 text-white px-3 py-2 rounded">Join</button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Chat — {name}</h2>
            <div className="text-sm text-gray-600">Users: {connectedUsers.join(', ')}</div>
          </div>
        </div>
      )}

      <div ref={messagesRef} className="h-64 overflow-auto border p-2 mb-3">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.from === 'system' ? 'text-gray-500 italic' : ''}`}>
            {m.from !== 'system' ? <strong>{m.from}: </strong> : null}
            <span>{m.text}</span>
            <div className="text-xs text-gray-400">{new Date(m.time).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>

      {joined ? (
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type a message..."
            className="flex-1 border p-2"
          />
          <button onClick={sendMessage} className="bg-green-500 text-white px-3 py-2 rounded">Send</button>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Join the chat to send messages</div>
      )}
    </div>
  );
}
