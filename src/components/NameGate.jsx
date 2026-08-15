import { useState } from "react";

export default function NameGate({ children }) {
  const [name, setName] = useState(localStorage.getItem("techsetu_name") || "");
  const [input, setInput] = useState("");

  if (name) return children;

  const handleStart = () => {
    if (input.trim()) {
      localStorage.setItem("techsetu_name", input.trim());
      setName(input.trim());
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", background: "#0a0e17",
      color: "white", padding: "24px" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Welcome to TechSetu</h1>
      <p style={{ opacity: 0.7, marginBottom: "24px" }}>What should we call you?</p>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleStart()}
        placeholder="Enter your name"
        style={{ padding: "12px 16px", borderRadius: "8px", border: "1px solid #333",
          background: "#111827", color: "white", width: "100%", maxWidth: "320px",
          marginBottom: "16px" }}
      />
      <button onClick={handleStart} style={{ padding: "12px 32px", borderRadius: "8px",
        background: "#10b981", color: "white", border: "none", fontWeight: "bold",
        cursor: "pointer" }}>
        Start Learning
      </button>
    </div>
  );
}