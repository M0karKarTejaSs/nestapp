import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Genre from "./pages/Genre";
import Book from "./pages/Book";
import Author from "./pages/Author";
import "./App.css";
import { useDashboard } from "../src/pages/useDashboard";
import ForgotPasswordModal from "./pages/ForgotPasswordModal";

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ email: "", password: "", confirm_password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const { isSidebarHidden, isSearchFormShown, isDarkMode, toggleSidebar, toggleDarkMode, handleSearchButtonClick } = useDashboard();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{6,}$/;

  const handleChange = (e, isSignUp) => {
    const setter = isSignUp ? setSignUpData : setSignInData;
    setter((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Check if password matches the regex
    if (!passwordRegex.test(signInData.password)) {
      toast.error("Password must be alphanumeric.", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/generateToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signInData.username, password: signInData.password }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
        setLoggedIn(true);
        localStorage.setItem("AuthToken", btoa(responseData.data));
      } else {
        toast.error("Invalid credentials, please try again.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Server error occurred. Please try again later.", { position: "top-right", autoClose: 3000 });
      console.error(error);
    } finally {
      setSignInData({ email: "", password: "" });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Check if password matches the regex
    if (!passwordRegex.test(signUpData.password)) {
      toast.error("Password must be alphanumeric.", { position: "top-right", autoClose: 3000 });
      return;
    }

    if (signUpData.password !== signUpData.confirm_password) {
      toast.error("Password and Confirm Password don't match.", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/addNewUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signUpData?.name ?? signUpData?.email?.split('@')[0],
          email: signUpData.email,
          password: signUpData.password,
          roles: "ROLE_USER"
        }),
      });
      if (response.ok) {
        toast.success("Sign Up successful! Redirecting to login.", { position: "top-right", autoClose: 3000 });
        setIsSignUpMode(false);
        setSignUpData({ email: "", password: "", confirm_password: "" });
      } else {
        toast.error("Sign Up Failed, please try again.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Server error occurred. Please try again later.", { position: "top-right", autoClose: 3000 });
      console.error(error);
    }
  };

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
                <div className="forms-container">
                  <img src="/assets/pxlogo.png" alt="Logo" className="fixed-logo" />
                  <h1 className="fixed-logo-content" style={{ color: isSignUpMode ? "#9d00ff" : "#ffffff" }}>Nest Book</h1>

                  <div className="signin-signup">
                    <form onSubmit={handleSignIn} className="sign-in-form">
                      <h2>Sign in</h2>
                      {["username", "password"].map((field) => (
                        <input
                          key={field}
                          className="flds"
                          type={field === "password" ? (showPasswords ? "text" : "password") : "text"}
                          name={field}
                          value={signInData[field]}
                          onChange={(e) => handleChange(e, false)}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                      ))}
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="checkbox"
                          checked={showPasswords}
                          onChange={() => setShowPasswords(!showPasswords)}
                        />
                        <span style={{ marginLeft: "5px" }}>Show Passwords</span>
                      </label>
                      <input type="submit" value="Sign In" className="btn solid" />
                      <ForgotPasswordModal />
                    </form>

                    <form onSubmit={handleSignUp} className="sign-up-form">
                      <h2>Sign up</h2>
                      {["name", "email", "password", "confirm_password"].map((field) => (
                        <input
                          key={field}
                          className="flds"
                          type={field.includes("password") ? (showPasswords ? "text" : "password") : "text"}
                          name={field}
                          value={signUpData[field]}
                          onChange={(e) => handleChange(e, true)}
                          placeholder={field.replace("_", " ").replace(/^./, (str) => str.toUpperCase())}
                        />
                      ))}
                      <label style={{ marginRight: "10px" }}>
                        <input
                          type="checkbox"
                          checked={showPasswords}
                          onChange={() => setShowPasswords(!showPasswords)}
                        />
                        <span style={{ marginLeft: "5px" }}>Show Passwords</span>
                      </label>
                      <input type="submit" value="Sign Up" className="btn" />
                    </form>
                  </div>
                </div>

                <div className="panels-container">
                  <div className="panel left-panel">
                    <div className="content">
                      <h3>New here?</h3>
                      <p>Start your journey with us.</p>
                      <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>Sign up</button>
                    </div>
                    <img src="/assets/log.svg" className="image" alt="Log" />
                  </div>

                  <div className="panel right-panel">
                    <div className="content">
                      <h3>One of us?</h3>
                      <p>Welcome back to your shelf!</p>
                      <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>Sign in</button>
                    </div>
                    <img src="/assets/register.svg" className="image" alt="Register" />
                  </div>
                </div>
              </div>
            )
          }
        />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={localStorage.getItem('AuthToken') ? <Dashboard {...{ isSidebarHidden, isSearchFormShown, isDarkMode, toggleSidebar, toggleDarkMode, handleSearchButtonClick }} /> : <Navigate to="/" />}
        />
        <Route
          path="/genre"
          element={localStorage.getItem('AuthToken') ? <Genre {...{ isSidebarHidden, isSearchFormShown, isDarkMode, toggleSidebar, toggleDarkMode, handleSearchButtonClick }} /> : <Navigate to="/" />}
        />
        <Route
          path="/book"
          element={localStorage.getItem('AuthToken') ? <Book {...{ isSidebarHidden, isSearchFormShown, isDarkMode, toggleSidebar, toggleDarkMode, handleSearchButtonClick }} /> : <Navigate to="/" />}
        />
        <Route
          path="/author"
          element={localStorage.getItem('AuthToken') ? <Author {...{ isSidebarHidden, isSearchFormShown, isDarkMode, toggleSidebar, toggleDarkMode, handleSearchButtonClick }} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
