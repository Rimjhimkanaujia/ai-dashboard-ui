const Message = ({ text, isBot }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isBot ? "flex-start" : "flex-end",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          maxWidth: "60%",
          padding: "12px",
          borderRadius: "8px",
          background: isBot ? "#1e293b" : "#2563eb",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Message;
