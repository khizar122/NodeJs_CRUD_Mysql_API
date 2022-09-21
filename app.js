require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/userRouter");

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(5000, () => { 
    console.log("Server Up and running")
});
