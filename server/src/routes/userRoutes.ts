import { Router } from "express";
import { getUsers } from "../controllers/userControllers";

const userRoute = Router();

userRoute.get('/', getUsers);

export default userRoute;