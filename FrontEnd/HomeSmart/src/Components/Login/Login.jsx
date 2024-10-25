import React from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { MailOutline } from "react-ionicons";

import { LockClosedOutline } from "react-ionicons";
export default function Login() {
  return (
    <div>
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
                <input type="email" required />
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
                <input type="password" required />
                <label htmlFor="password">Password</label>
              </div>

              {/* PASSWORD CONFIRM */}

              <div className="inputbox">
                <div className="ion-icon">
                  <LockClosedOutline
                    color={"#00000"}
                    height="20px"
                    width="20px"
                  />
                </div>
                <input type="password" required />
                <label htmlFor="password"> Confirm Password</label>
              </div>
              <div className="forget">
                <label>
                  <input type="checkbox" />
                  Remember Me
                  {/* Liên kết hợp lệ */}
                  <a href="#">Forget Password</a>
                </label>
              </div>
              <button type="submit">Log in</button>
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
