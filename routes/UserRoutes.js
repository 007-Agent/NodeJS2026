import { handleAddUser, handlegetUsers } from "../controllers/UserControllers.js";
import express from "express";
const router = express.Router();




router.post('/add', handleAddUser);


router.post('/usersall', handlegetUsers);



export default router;