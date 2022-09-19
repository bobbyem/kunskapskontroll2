import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Interests from "./pages/interests";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  return (
    <Router>
      <h1>Interester</h1>{" "}
      <div>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/">Interests</Link>
      </div>
      <Routes>
        <Route path="/" element={<Interests />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
