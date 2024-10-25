import React, { useState } from "react";
import "./Register.css";
import { Link, Redirect } from "react-router-dom";
import { MailOutline } from "react-ionicons";
import { PersonOutline } from "react-ionicons";
import { LockClosedOutline } from "react-ionicons";
import { Axios } from "../../Config/Axios";
import toast from "react-hot-toast";
export default function Register() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [passWord, setPassWord] = useState(null);
  const [passWordConfirm, setPassWordConfirm] = useState(null);
  const [redirect, setRedirect] = useState(false);
  // Check email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!user || !email || !passWordConfirm || !passWord) {
        return toast.error(" Please , Enter full information !");
      }
      // Kiểm tra định dạng email
      if (!validateEmail(email)) {
        return toast.error("Invalid email format!");
      }
      // Kiểm tra độ dài mật khẩu
      if (passWord.length < 5) {
        return toast.error("Password must be at least 6 characters long!");
      }
      if (passWord !== passWordConfirm) {
        return toast.error(" PassWord Confirm wrong !");
      }
      const res = await Axios.post("/auth/register", {
        username: user,
        email: email,
        password: passWord,
      });
      if (res && res.status === 200) {
        setRedirect(true);
        toast.success("Successfully created!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
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
                <input
                  type="text"
                  required
                  onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor="email">User</label>
              </div>

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

              {/* PASSWORD CONFIRM */}

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
                  onChange={(e) => setPassWordConfirm(e.target.value)}
                />
                <label htmlFor="password"> Confirm Password</label>
              </div>

              <button
                type="submit"
                onClick={(e) => {
                  handleRegister(e);
                }}
              >
                Register
              </button>
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
