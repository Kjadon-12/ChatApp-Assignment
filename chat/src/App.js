import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import User from "./components/user/User";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 className="title">Chat Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
