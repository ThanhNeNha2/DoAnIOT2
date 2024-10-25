import React, { useState } from "react";
import "./Login.css";
import { Link, Redirect } from "react-router-dom";
import { MailOutline } from "react-ionicons";
import toast from "react-hot-toast";
import { LockClosedOutline } from "react-ionicons";
import { Axios } from "../../Config/Axios";
export default function Login() {
  const [email, setEmail] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !passWord) {
        return toast.error(" Please , Enter full information !");
      }

      const res = await Axios.post("/auth/login", {
        email: email,
        password: passWord,
      });

      if (res && res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setRedirect(true);
        window.location.href = "/";
        toast.success("Successfully created!");
      }
    } catch (err) {
      console.log(err);
      if (err && err.status === 401) {
        toast.error(err.response.data.mess);
      }
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <section>
        <div className="form-box">
          <div className="form-value">
            <form>
              <h2>Login</h2>
              {/* EMAIL */}
              <div className="inputbox">
                <div className="ion-icon">
                  <MailOutline color={"#00000"} height="20px" width="20px" />
                </div>
                <input
                  type="text"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>

              {/* PASSWORD  */}
              <div className="inputbox">
                <div className="ion-icon">
                  <LockClosedOutline
                    color={"#00000"}
                    height="20px"
                    width="20px"
                  />
                </div>
                <input
                  type="password"
                  required
                  onChange={(e) => setPassWord(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="forget">
                <label>
                  <input type="checkbox" />
                  Remember Me
                  {/* Liên kết hợp lệ */}
                  <a href="#">Forget Password</a>
                </label>
              </div>
              <button type="submit" onClick={(e) => handleLogin(e)}>
                Log in
              </button>
              <div className="register">
                <p>
                  Don't have an account? <Link to={"/register"}>Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
