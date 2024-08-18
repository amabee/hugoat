// LOGIN PAGE

"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/login-style.css";
export default function Login() {
  return (
    <div className="form-container">
      <h1>Login</h1>
      <form>
        <div className="input-group">
          <label for="username" className="username">
            Username
          </label>
          <input type="text" className="" required></input>
        </div>
        <div className="input-group">
          <label for="password" className="password">
            Password
          </label>
          <input type="password" className="" required></input>
        </div>

        <div className="forgot">
          <a href="#">Forgot Password ?</a>
        </div>
        <button type="button" className="sign-in">
          Sign In
        </button>

        <p className="sign-up">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
