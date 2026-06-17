
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    console.log({
  name,
  email,
  password
});// prevent page reload

    try {
      const response = await fetch("https://surprise-box.onrender.com:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {

  alert(data.message);

  localStorage.setItem("userName", data.user.name);
  localStorage.setItem("userId", data.user._id);

  if (data.user.email.endsWith("@org.com")) {

    window.location.href = "/VendorDashboard";

  } else {

    window.location.href = "/Shop";

  }

}

      else {
        alert(data.message || "Error");
      }

    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="background1">
        <div className="form-content">

          {/* ✅ FORM START */}
          <form className="form-container" onSubmit={handleLogin}>

            <h4>LOGIN</h4>
            <h5>WELCOME BACK!</h5>

            <div className="form-input">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-link d-flex justify-content-between align-items-center">

              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="remember" />
                <label className="form-check-label" htmlFor="remember">
                  Remember Me
                </label>
              </div>

              <a href="#">Forgot password?</a>
            </div>

            <div className="form-button">
              {/* ✅ SUBMIT BUTTON */}
              <button type="submit" >LOGIN</button>

              <p className="login-footer">
                Don’t have an account? <Link to="/SignUp">Sign in</Link>
              </p>
            </div>

          </form>
          {/* ✅ FORM END */}

        </div>
      </div>
    </>
  );
};

export default Login;