import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import profileRoutes from "./routes/profileRoutes";
import bloodGlucoseRoutes from "./routes/bloodGlucoseRoutes";

const app = express();
const corsOptions = {
  origin: "exp://192.168.1.80:8081",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("", userRoutes);
app.use("", dashboardRoutes);
app.use("", profileRoutes);
app.use("", bloodGlucoseRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(8000, () => {
  console.log("Listening on port: 8000");
});
