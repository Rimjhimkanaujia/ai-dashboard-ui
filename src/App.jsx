import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import "./styles/main.css";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeChat, setActiveChat] = useState(null);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const newChat = () => {
    setChats((prev) => [...prev, []]);
    setActiveChat(chats.length);
  };

  const clearChat = () => {
    if (activeChat === null) return;

    setChats((prev) =>
      prev.map((chat, index) =>
        index === activeChat ? [] : chat
      )
    );
  };

  const updateMessages = (messages) => {
    setChats((prev) =>
      prev.map((chat, index) =>
        index === activeChat ? messages : chat
      )
    );
  };

  return (
    <div className={`app ${theme}`}>
      <Sidebar
        chats={chats}
        onSelectChat={setActiveChat}
        onNewChat={newChat}
        onClearChat={clearChat}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <ChatWindow
        messages={activeChat !== null ? chats[activeChat] : []}
        setMessages={updateMessages}
      />
    </div>
  );
}

export default App;
