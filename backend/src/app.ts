// Third party imports
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

// Routes imports
import userRoutes from "./routes/user";
import testRoutes from "./routes/test";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get("/", (req: Request, res: Response, _next: NextFunction) => {
  return res.json({ message: "Checklists API" });
});

app.use("/user", userRoutes);
app.use("/test", testRoutes); 

// Error handler
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[Global Error Handler]:", error);

  return res.status(500).json({
    errorMessage: error.message || "Something went wrong.",
    ...error,
  });
});

export default app;
