import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sign.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUp = () => {
  const navigate = useNavigate();
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = form;

    if (!name || !email || !password || !confirmPassword) {
      return setError("All fields are required.");
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
    }

    try {
      const response = await fetch("https://surprise-box.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      alert(data.message);

      // Reset form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setError("");
      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="background">
      <div className="form-content">
        <div className="form1-container">
          <h4>Sign In</h4>
          <h5>WELCOME BACK!</h5>

          {/* Show error */}
          {error && <p>{error}</p>}

          <div className="form1-input">
            <input
              name="name"
              placeholder="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              name="confirmPassword"
              placeholder="confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="button" onClick={handleSubmit}>
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

