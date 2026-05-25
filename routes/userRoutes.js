import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import { createUser , getUsers , getUserById , updateUser , deletedUser } from "../controllers/userController.js";

const router = express.Router()

router.post("/users" , authMiddleware , upload.single("photo"),createUser)

router.get("/users", authMiddleware , getUsers)

router.get("/users/:id",authMiddleware,getUserById)

router.put("/users/:id", authMiddleware ,upload.single("photo") ,updateUser)

router.delete("/users/:id",authMiddleware,deletedUser)

router.get("/users",authMiddleware,(req,res)=>{
    res.json({message:"All users (protected)"})

})
export default router