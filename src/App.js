import React, { useState, useEffect } from "react";
import Tracks from "./Tracks";
function App() {
  const [isStarted, setStart] = useState(false);
  const btnContent = isStarted ? "RECORD" : "START";

  console.log(isStarted);
  return (
    <div className="App">
      <header className="App-header">
        <Tracks></Tracks>
      </header>
    </div>
  );
}

export default App;
