import "./styles.css";
import React, { useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [valid, setValid] = useState(true);
  const ErrorMessage = "Age is not valid";

  const handleText = (e) => {
    setValid(true);
    setText(e.target.value);
    if (e.target.value < 18) setValid(false);
  };

  return (
    <div className="App">
      <div>Age Validator</div>
      <label>Input Age:</label>
      <input value={text} onChange={(e) => handleText(e)} />
      {!valid ? ErrorMessage : null}
    </div>
  );
}
