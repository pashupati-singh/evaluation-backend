const express = require("express");
const { connect } = require("./db/mongoDB");
const { userRoute } = require("./Routes/userRoutes");
const { postRoute } = require("./Routes/postRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use("/users", userRoute);
app.use("/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(process.env.PORT, async () => {
  console.log("server");
  try {
    await connect;
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
});
