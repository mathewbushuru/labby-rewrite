import { Router } from "express";

const router = Router();

router.get("/test-error-handler", (_req, _res, next) => {
  const error = new Error("Test error");
  next(error);
});

export default router;
