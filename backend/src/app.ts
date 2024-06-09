// Third party imports
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

// Routes imports
import userRoutes from "./routes/user";
import taskRoutes from "./routes/task";
import testRoutes from "./routes/test";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req: Request, res: Response, _next: NextFunction) => {
  return res.json({ message: "Labby API" });
});

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/test", testRoutes);

// 404 route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const errorMessage = "404 error - Route not found";
  console.error(errorMessage);
  return res.status(404).json({ errorMessage });
});

// Error handler route
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Global Error Handler]:", error);

  return res.status(500).json({
    errorMessage: error.message || "Something went wrong.",
    ...error,
  });
});

export default app;
