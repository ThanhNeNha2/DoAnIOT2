import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("Connect success!");
  })
  .catch((error) => {
    console.log("Connect error!", error);
  });
app.get("/", (req, res) => {
  res.status(200).json({
    message: "I am using babel in NodeJS",
    status: "success",
  });
});
app.use("/v1/user", userRoute);
app.use("/v1/auth", authRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("server up and running");
});
