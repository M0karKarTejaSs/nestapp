import React, { useState } from "react";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard"
function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ username: "", email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e, isSignUp) => {
    const setter = isSignUp ? setSignUpData : setSignInData;
    setter((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    console.log(signInData, "signInData");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(e, "ee");
    try {
      console.log(JSON.stringify({ usename: signInData.username, password: signInData }), "sendata");

      const Signres = await fetch("http://localhost:8080/api/login",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(signInData),
        });
      Signres.ok
        ? toast.success("Login successful!", { position: "top-right", autoClose: 3000 }) && setLoggedIn(true)
        : toast.error("Invalid credentials, please try again.", { position: "top-right", autoClose: 3000 });
    } catch (e) {
      toast.error("Server error occurred. Please try again later.", { position: "top-center", autoClose: 3000 });
      console.log(e, "e");
    }
  }

  const handleSignUp = async (e) => {
    toast.error("Comming Soon.", { position: "top-right", autoClose: 3000 });
  }
  return (
    !loggedIn ? <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <ToastContainer />
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2>Sign in</h2>
            {["username", "password"].map((field) => (
              <input
                key={field} // Adding a unique key prop
                className="flds"
                type={field === "password" ? "password" : "text"}
                name={field}
                value={signInData[field]}
                onChange={(e) => handleChange(e, false)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
            <input type="submit" class="flds" value="Sign In" className="btn solid" />
          </form>

          <form onSubmit={handleSignUp} className="sign-up-form">
            <h2>Sign up</h2>
            {["username", "email", "password"].map((field) => (
              <input
                key={field} // Adding a unique key prop
                className="flds"
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                name={field}
                value={signUpData[field]}
                onChange={(e) => handleChange(e, true)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
            <input type="submit" class="flds" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Create Account.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>Sign up</button>
          </div>
          <img src="/assets/log.svg" className="image" alt="Log" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Sign In Here.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>Sign in</button>
          </div>
          <img src="/assets/register.svg" className="image" alt="Register" />
        </div>
      </div>
    </div> : <Dashboard />
  );
}

export default App;
