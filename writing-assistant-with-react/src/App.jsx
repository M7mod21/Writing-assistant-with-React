import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./App.css";

const TOOLS = [
  "Summarize",
  "Write Essay",
  "Paraphrasing",
  "Grammar Correction",
];

function App() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [tool, setTool] = useState("Summarize"); 
  const [error, setError] = useState("");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setResult(""); 
      setError(""); 

      let prompt = inputText || "name 10 arabic countries";
      if (tool === "Summarize") prompt = `Summarize: ${prompt}`;
      if (tool === "Write Essay")
        prompt = `Write an essay about: ${prompt} with 200 words.`;
      if (tool === "Paraphrasing") prompt = `Paraphrase: ${prompt}`;
      if (tool === "Grammar Correction")
        prompt = `Grammar Correction: ${prompt}`;

      const response = await model.generateContent(prompt);
      setResult(response.response.text);
    } catch (error) {
      console.error("error:", error);
      setError("There is an error with Gemini API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Left Panel */}
      <div className="left-panel card">
        <h1>Welcome to your AI Writing Assistant!</h1>

        <textarea
          aria-label="input-box"
          className="input-box"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows="5"
          disabled={loading}
          placeholder="Write your prompt here..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              handleSubmit();
            }
          }}
          
        />

        <button
          aria-label="submit-btn"
          className={`submit-btn ${loading ? "loading" : ""}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span style={{ marginLeft: 8 }}>Wait...</span>
            </>
          ) : (
            "Submit"
          )}
        </button>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        {result && (
          <div className="result-container">
            <h2>Result:</h2>
            <div className="result">{result}</div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="right-panel card">
        <h2>Select Tool</h2>
        <ul className="tool-list">
          {TOOLS.map((t) => (
            <li
              key={t}
              className={tool === t ? "selected" : ""}
              onClick={() => setTool(t)}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
