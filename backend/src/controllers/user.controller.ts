import { HTTPSTATUS } from "../config/http.config";
import {Request, Response} from 'express'
import { getCurrentUserService } from "../services/user.service";
import { asyncHandler } from "../middlewares/asynchandler.middleware";

export const getCurrentUserController = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.user?._id;
        const { user} = await getCurrentUserService(userId);

        return res.status(HTTPSTATUS.OK).json({
            message: "User fetched successfully",
            user
        })
    }
)