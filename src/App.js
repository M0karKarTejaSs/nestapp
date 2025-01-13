import React, { useState } from "react";
import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard"
function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const handleChange = (e, isSignUp) => {
    const setter = isSignUp ? setSignUpData : setSignInData;
    setter((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    console.log(signInData, "signInData", "signUpData", signUpData);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log(e, "ee");
    try {
      const Signres = await fetch("http://localhost:8080/api/login",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username: signInData.email, password: signInData.password }),
        });
      // console.log(await Signres.text(), "Signres");
      Signres.ok
        ? toast.success("Login successful!", { position: "top-right", autoClose: 3000 }) && setLoggedIn(true)
        : toast.error("Invalid credentials, please try again.", { position: "top-right", autoClose: 3000 });
    } catch (e) {
      toast.error("Server error occurred. Please try again later.", { position: "top-center", autoClose: 3000 });
      console.log(e, "e");
    }finally{
      setSignInData({ email: "", password: "" });
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      
      if (signUpData?.password != signUpData?.confirm_password) {
        toast.error("Password and Confirm Password doesn't match.", { position: "top-center", autoClose: 3000 });
        return;
      }
      const Signupres = await fetch("http://localhost:8080/api/register",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username: signUpData.email, password: signUpData.password }),
        });
      console.log(Signupres.json(), "Signupres", signUpData);
      Signupres.ok
        ? toast.success("Sign Up successful!", { position: "top-right", autoClose: 3000 }) && setSignedIn(true)
        : toast.error("Sign Up Failed, please try again.", { position: "top-right", autoClose: 3000 });
    } catch (e) {
      toast.error("Server error occurred. Please try again later.", { position: "top-center", autoClose: 3000 });
      console.log(e, "e");
    }finally{
      setSignInData({ email: "", password: "" });
    }
  }
  return (
    !loggedIn ? <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <ToastContainer />
      <div className="forms-container">
        <img src="/assets/pxlogo.png" alt="Logo" className="fixed-logo" />
        {/* <h1 className="fixed-logo-content" style={{ paddingRight: "10rem", marginTop: "-1rem" }}>Tech Titans </h1> */}
        <div className="signin-signup">
          <form onSubmit={handleSignIn} className="sign-in-form">
            <h2>Sign in</h2>
            {["email", "password"].map((field) => (
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
            {["email", "password", "confirm_password"].map((field) => (
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
      <footer className="footer">
        <p>Created with ❤️ by <strong>Tech Titans</strong></p>
      </footer>
    </div> : <Dashboard />
  );
}

export default App;
