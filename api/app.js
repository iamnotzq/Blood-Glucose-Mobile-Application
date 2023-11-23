const express = require("express");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "exp://192.168.1.80:8081",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
const userRoutes = require("./routes/userRoutes");
app.use("", userRoutes);

app.get("/", (req, res) => {
  res.send(JSON.stringify(fakeUser1));
});

app.listen(8000, () => {
  console.log("Listening on port: 8000");
});
