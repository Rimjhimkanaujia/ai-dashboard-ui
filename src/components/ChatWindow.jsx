import { useState, useEffect, useRef } from "react";
import Message from "./Message";

const ChatWindow = ({ messages, setMessages }) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 🎤 Voice Input
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.onresult = (event) => {
      const speechText = event.results[0][0].transcript;
      setInput((prev) => prev + " " + speechText);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const sendMessage = () => {
    if (input.trim() === "" || isTyping) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");
    setIsTyping(true);

    const aiText = "This is a demo AI typing response 🤖";
    let index = 0;

    setMessages((prev) => [...prev, { text: "", isBot: true }]);

    const interval = setInterval(() => {
      index++;

      setMessages((prev) =>
        prev.map((msg, i) =>
          i === prev.length - 1
            ? { ...msg, text: aiText.slice(0, index) }
            : msg
        )
      );

      if (index === aiText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 35);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Messages */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} isBot={msg.isBot} />
        ))}

        {isTyping && (
          <div style={{ fontStyle: "italic", opacity: 0.6 }}>
            AI is typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div style={{ display: "flex", padding: "10px", gap: "6px" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or speak your message..."
          rows={2}
          style={{ flex: 1, padding: "10px", resize: "none" }}
        />

        {/* 🎤 Mic Button */}
        <button
          onClick={startListening}
          style={{
            padding: "10px",
            background: isListening ? "#ef4444" : "#0ea5e9",
            color: "white",
          }}
        >
          {isListening ? "🎙️" : "🎤"}
        </button>

        {/* Send */}
        <button
          onClick={sendMessage}
          disabled={isTyping}
          style={{ padding: "10px 16px" }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
