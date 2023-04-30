import {Request, Response, Router} from "express";
import {videoDB} from "../db/videoDB";
import {videoRouter} from "./video-router";

export const testRouter = Router({})

testRouter.delete('/testing',(req: Request, res: Response) => {
    videoDB.splice(0);
    res.send(204)
})