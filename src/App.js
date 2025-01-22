import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import DashboardTest from "./pages/DashboardTest";
import Genre from "./pages/Genre";
import "./App.css";
import { useDashboard } from "../src/pages/useDashboard"

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ email: "", password: "", confirm_password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e, isSignUp) => {
    const setter = isSignUp ? setSignUpData : setSignInData;
    setter((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/generateToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signInData.email, password: signInData.password }),
      });

      if (response.ok) {
        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
        setLoggedIn(true);
        const responseData = await response.json(); // Parse the JSON from the response
        console.log(responseData.data, "Parsed response");
        localStorage.setItem("AuthToken", responseData.data);
      
      } else {
        toast.error("Invalid credentials, please try again.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Server error occurred. Please try again later.", { position: "top-center", autoClose: 3000 });
      console.error(error);
    } finally {
      setSignInData({ email: "", password: "" });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirm_password) {
      toast.error("Password and Confirm Password don't match.", { position: "top-center", autoClose: 3000 });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signUpData.email, password: signUpData.password }),
      });
      if (response.ok) {
        toast.success("Sign Up successful! Redirecting to login.", { position: "top-right", autoClose: 3000 });
        setIsSignUpMode(false);
        setSignUpData({ email: "", password: "", confirm_password: "" });
      } else {
        toast.error("Sign Up Failed, please try again.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Server error occurred. Please try again later.", { position: "top-center", autoClose: 3000 });
      console.error(error);
    }
  };

  const {
    isSidebarHidden,
    isSearchFormShown,
    isDarkMode,
    toggleSidebar,
    toggleDarkMode,
    handleSearchButtonClick,
  } = useDashboard();

  // instead make after login api should be authenticated so automatically my work will file logout
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
                  <h1 className="fixed-logo-content" style={{ color: isSignUpMode ? "#9d00ff" : "#ffffff" }}>Book Stock</h1>

                  <div className="signin-signup">
                    {/* Sign In Form */}
                    <form onSubmit={handleSignIn} className="sign-in-form">
                      <h2>Sign in</h2>
                      {["email", "password"].map((field) => (
                        <input
                          key={field}
                          className="flds"
                          type={field === "password" ? "password" : "text"}
                          name={field}
                          value={signInData[field]}
                          onChange={(e) => handleChange(e, false)}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        />
                      ))}
                      <input type="submit" value="Sign In" className="btn solid" />
                      <button type="button" className="fg-btn">Forgot Password?</button>
                    </form>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSignUp} className="sign-up-form">
                      <h2>Sign up</h2>
                      {["email", "password", "confirm_password"].map((field) => (
                        <input
                          key={field}
                          className="flds"
                          type={field.includes("password") ? "password" : "email"}
                          name={field}
                          value={signUpData[field]}
                          onChange={(e) => handleChange(e, true)}
                          placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace("_", " ")}
                        />
                      ))}
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

                <footer className="footer">
                  <p>Created with ❤️ by <strong>Tech Titans</strong></p>
                </footer>
              </div>
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              isSidebarHidden={isSidebarHidden}
              isSearchFormShown={isSearchFormShown}
              isDarkMode={isDarkMode}
              toggleSidebar={toggleSidebar}
              toggleDarkMode={toggleDarkMode}
              handleSearchButtonClick={handleSearchButtonClick}
            />
          }
        />
        <Route path="/genre" element={<Genre />} />
        {/* <Route path="/dashboard" element={<DashboardTest />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
