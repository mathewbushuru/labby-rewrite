/**
 * Routes specifically for testing
 */

import { Router } from "express";

const router = Router();

router.get("/test-error-handler", (req, res, next) => {
  const error = new Error("Test error");
  next(error);
});

export default router;
