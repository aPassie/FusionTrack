import {ErrorRequestHandler} from 'express'
import { HTTPSTATUS } from '../config/http.config'
export const errorHandler:ErrorRequestHandler =  (error,req,res,next):any =>{
    if(error instanceof SyntaxError){
        console.error(`Error occured on PATH: ${req.path}`, error)
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
            message: "Invalid JSON Format"
        })
    }
    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        message: "Internal Server Error",
        error: error?.message || "Unknown eror occured"
    }) 
}
