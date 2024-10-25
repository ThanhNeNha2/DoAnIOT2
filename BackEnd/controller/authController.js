import User from "../model/user";
import bcrypt from "bcrypt";

// REGISTER

export const register = async (req, res) => {
  try {
    let { password } = req.body;
    let passbcry = await bcrypt.hash(password, 10);
    let response = await User.create({
      ...req.body,
      password: passbcry,
    });
    return res.status(200).json({
      mess: "Create user success!",
      user: response,
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      mess: "Create user don't success!",
    });
  }
};

// lOGIN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mess: "Email or password wrong !" });
    }

    // So sánh mật khẩu
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ mess: "Email or password wrong! " });
    }

    // Tạo token (sử dụng JWT)
    // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "secretKey", {
    //   expiresIn: "1h",
    // });

    return res.status(200).json({
      mess: "Login success!",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mess: "Login failed!" });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

// module.exports = { register, login, logout };
