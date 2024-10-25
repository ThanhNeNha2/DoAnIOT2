import React from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { MailOutline } from "react-ionicons";
import { PersonOutline } from "react-ionicons";
import { LockClosedOutline } from "react-ionicons";
export default function Register() {
  return (
    <div>
      <section>
        <div className="form-box">
          <div className="form-value">
            <form>
              <h2>Register</h2>
              {/*  USER  */}
              <div className="inputbox">
                <div className="ion-icon">
                  <PersonOutline color={"#00000"} height="20px" width="20px" />
                </div>
                <input type="email" required />
                <label htmlFor="email">Email</label>
              </div>

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

              <button type="submit">Register</button>
              <div className="register">
                <p>
                  Already have an account
                  <Link to={"/login"}> Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
