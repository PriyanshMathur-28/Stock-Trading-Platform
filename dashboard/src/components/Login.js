import * as React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";

export default function Login() {
  let [alert, setAlert] = React.useState({ st: false, msg: "" });
  const navigate = useNavigate();
  const { login, user } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    axios
      .post("http://localhost:3000/user/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        await login(res.data.token);
      })
      .catch((error) => {
        if (error.response) {
          setAlert({ st: true, msg: error.response.data.error });
        } else if (error.request) {
          setAlert({ st: true, msg: "Network Error" });
        } else {
          setAlert({ st: true, msg: "Something Went Wrong" });
        }
      });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="icon-wrapper">
            <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {alert.st && (
            <div className="alert-error">
              <svg className="alert-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <span>{alert.msg}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              autoComplete="email"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="btn-submit">
            Sign In
          </button>

          <div className="login-footer">
            <p className="signup-text">
              Don't have an account? <Link to="/register" className="signup-link">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}