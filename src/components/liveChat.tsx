import { useEffect, useState } from "react";
import { socket } from "../../src/socket_frontend.js";

export default function LiveChat({ roomName }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.emit("join_live_chat", roomName);

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.emit("send_message", {
      roomName,
      message,
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full border rounded-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded">
            <span className="font-semibold">{msg.username}</span>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 p-2 border-t">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-2"
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-3 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
