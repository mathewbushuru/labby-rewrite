import { Router } from "express";

const router =  Router();

router.get("/all", (req, res) => {
    console.log("Get all tasks");
    return res.json("All tasks");
})

export default router;