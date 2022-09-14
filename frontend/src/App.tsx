import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Interests from "./pages/interests";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <h1>Interester</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/interests" element={<Interests />} />
      </Routes>
    </Router>
  );
}

export default App;
