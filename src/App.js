import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext.js";

// Pages & components
import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login.js";
import SignUp from "./pages/signup/SignUp.js";
import Error from "./pages/error/Error.js";
import Navbar from "./components/Navbar.js";

function App() {
  const { authReady, user } = useAuthContext();
  return (
    <div className="App">
      {authReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="login"
              element={user ? <Navigate to="/" /> : <Login />}
            ></Route>
            <Route
              path="signup"
              element={
                user && user.displayName ? <Navigate to="/" /> : <SignUp />
              }
            ></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
