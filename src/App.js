import React, { useState } from "react";
import "./App.css";

function App() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e, isSignUp) => {
    const setter = isSignUp ? setSignUpData : setSignInData;
    setter((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2>Sign in</h2>
            {["username", "password"].map((field) => (
                <input
             class="flds"     type={field === "password" ? "password" : "text"}
                  name={field}
                  value={signInData[field]}
                  onChange={(e) => handleChange(e, false)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
            ))}
            <input type="submit"class="flds" value="Sign" className="btn solid" />
          </form>

          <form className="sign-up-form">
            <h2>Sign up</h2>
            {["username", "email", "password"].map((field) => (
                <input
             class="flds"     type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                  name={field}
                  value={signUpData[field]}
                  onChange={(e) => handleChange(e, true)}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
            ))}
            <input type="submit"class="flds" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>Sign up</button>
          </div>
          <img src="/images/log.svg" className="image" alt="Log" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>Sign in</button>
          </div>
          <img src="/images/register.svg" className="image" alt="Register" />
        </div>
      </div>
    </div>
  );
}

export default App;
