import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider from "./context/AuthProvider";
import PrivateRoute from "./context/PrivateRoute ";
import SignUp from "./components/SignUp";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/main" element={<Main />} />
            </Route>
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
