// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./AuthPages/SignUp";
import Login from "./AuthPages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Login/>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
