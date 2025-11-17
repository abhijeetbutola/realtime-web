import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  return (
    <>
      {username === "" ? (
        <Login onSubmit={setUsername} />
      ) : (
        <Home username={username} onLogout={setUsername} />
      )}
    </>
  );
}

export default App;
