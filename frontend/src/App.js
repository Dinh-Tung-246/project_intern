import "./App.css";
import LoginForm from "./Components/UX/LoginForm";
import ListUser from "./Components/UX/ListUser";
import Insert from "./Components/UX/Insert";
import Update from "./Components/UX/Update";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./Components/UX/Menu";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
      {sessionStorage.getItem("token") === null ? (
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/list" element={<Navigate to="/login" replace />} />
          <Route path="/insert" element={<Navigate to="/login" replace />} />
          <Route path="/update" element={<Navigate to="/login" replace />} />
          <Route path="/menu" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/menu" element={<Menu />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/update" element={<Update />} />
          <Route path="/list" element={<ListUser />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
