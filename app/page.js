"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/login-style.css";
import { useState } from "react";
import axios from "axios";
import { AUTH_ENDPOINT } from "@/globals/endpoints";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/globals/swal";
import { useRouter } from "next/navigation";
export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const router = useRouter();

  const login = async () => {
    if (!username.length > 0 && !password.length > 0) {
      ERROR_MESSAGE(
        "Invalid Input",
        "Username or Password must never be empty"
      );
      return;
    }
    try {
      const res = await axios.get(AUTH_ENDPOINT, {
        params: {
          operation: "login",
          json: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      });

      if (res.status === 200) {
        if (res.data && res.data.success) {
          // SUCCESS_MESSAGE("Success", "Logged in successfully");

          sessionStorage.setItem("user", JSON.stringify(res.data.success));

          router.push("/Home");
        } else if (res.data && res.data.error) {
          ERROR_MESSAGE("Auth Failed!", res.data.error);
        } else {
          ERROR_MESSAGE("Auth Failed!", "An unknown error occurred.");
        }
      } else {
        ERROR_MESSAGE("Status Error", `Unexpected status code: ${res.status}`);
        console.log(res);
      }
    } catch (error) {}
  };

  const signup = async () => {
    if (
      !firstname.length > 0 &&
      !lastname.length > 0 &&
      !username.length > 0 &&
      !password.length > 0
    ) {
      ERROR_MESSAGE("User Information Required!", "Inputs must never be empty");
      return;
    }
    const formData = new FormData();
    formData.append("operation", "signup");
    formData.append(
      "json",
      JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      })
    );

    const res = await axios({
      url: AUTH_ENDPOINT,
      method: "POST",
      data: formData,
    });

    if (res.status === 200) {
      if (res.data !== null && res.data.success) {
        SUCCESS_MESSAGE("Registration Successful", res.data.success);
        setIsLogin(true);
      } else if (res.data.error) {
        ERROR_MESSAGE("Sign Up Failed", res.data.error);
      } else {
        ERROR_MESSAGE("Sign Up Failed!", "An unknown error occurred.");
      }
    } else {
      ERROR_MESSAGE("Status Error", `Unexpected status code: ${res.status}`);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="form-container">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="firstname" className="firstname">
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastname" className="lastname">
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label htmlFor="username" className="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password" className="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {isLogin ? (
          <>
            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="button" className="sign-in" onClick={login}>
              Sign In
            </button>
            <p className="sign-up">
              Don't have an account?{" "}
              <a href="#" onClick={toggleForm}>
                Sign Up
              </a>
            </p>
          </>
        ) : (
          <>
            <button type="button" className="sign-in" onClick={signup}>
              Sign Up
            </button>
            <p className="sign-in">
              Already have an account?{" "}
              <a
                href="#"
                onClick={toggleForm}
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign In
              </a>
            </p>
          </>
        )}
      </form>
    </div>
  );
}
