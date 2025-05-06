import { Router } from "express"
import { getCurrentUserController } from "../controllers/user.controller"

export const userRoutes = Router()
userRoutes.get("/current", getCurrentUserController)
