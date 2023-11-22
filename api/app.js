const express = require("express");

const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use("", userRoutes);

app.get("/", (req, res) => {
  res.send(JSON.stringify(fakeUser1));
});

app.listen(8000, () => {
  console.log("Listening on port: 8000");
});
