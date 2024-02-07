const express = require("express");
const userRouter = require("./routers/user");
require("./db");

const app = express();
app.use(express.json());
app.use("/api/user", userRouter);

app.get("/about", (req, res) => {
  res.send("<h1> This is backend about</h1>");
});

app.listen(8000, () => {
  console.log("connected");
});
