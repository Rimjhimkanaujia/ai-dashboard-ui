import { useState } from "react";

const Sidebar = ({
  chats,
  onSelectChat,
  onNewChat,
  onClearChat,
  onExportChat,
  theme,
  toggleTheme,
}) => {
  const [search, setSearch] = useState("");

  // 🔍 Full-context search (user + AI replies)
  const chatList = search
    ? chats
        .map((chat, index) => ({ chat, index }))
        .filter(({ chat }) =>
          chat.some((msg) =>
            msg.text.toLowerCase().includes(search.toLowerCase())
          )
        )
    : chats.map((chat, index) => ({ chat, index }));

  return (
    <div
      className="sidebar"
      style={{
        width: "260px",
        padding: "20px",
        backgroundColor: theme === "dark" ? "#020617" : "#e2e8f0",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>AI Dashboard</h2>

      {/* 🌗 Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{ width: "100%", marginBottom: "6px" }}
      >
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ➕ New Chat */}
      <button
        onClick={onNewChat}
        style={{ width: "100%", marginBottom: "6px" }}
      >
        + New Chat
      </button>

      {/* 🗑 Clear Chat */}
      <button
        onClick={onClearChat}
        style={{
          width: "100%",
          marginBottom: "6px",
          background: "#ef4444",
          color: "white",
        }}
      >
        🗑 Clear Chat
      </button>

      {/* ⬇ Export Chat */}
      <button
        onClick={onExportChat}
        style={{
          width: "100%",
          marginBottom: "10px",
          background: "#22c55e",
          color: "white",
        }}
      >
        ⬇ Export Chat
      </button>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search chats (user + AI)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
          borderRadius: "6px",
          border: "none",
        }}
      />

      {/* 📜 Chat List */}
      <div>
        {chatList.length === 0 && (
          <div style={{ fontSize: "13px", opacity: 0.6 }}>
            No matching chats
          </div>
        )}

        {chatList.map(({ chat, index }) => {
          const title =
            chat.find((m) => !m.isBot)?.text || "New Chat";

          return (
            <div
              key={index}
              onClick={() => onSelectChat(index)}
              style={{
                padding: "8px",
                marginBottom: "6px",
                cursor: "pointer",
                borderRadius: "6px",
                background:
                  theme === "dark" ? "#1e293b" : "#cbd5f5",
                fontSize: "14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
