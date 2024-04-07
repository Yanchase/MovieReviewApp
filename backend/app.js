import express from "express";
import userRouter from "./routers/user.js";
import "./db/index.js";

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);

app.get(
  "/sign-up",
  (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
    }
    next();
  },
  (req, res) => {
    res.send("<h1> This is backend about</h1>");
  }
);

app.listen(8000, () => {
  console.log("connected on port 8000");
});
