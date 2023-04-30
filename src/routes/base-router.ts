import {Request, Response, Router} from "express";


export const baseRouter = Router({})

baseRouter.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello my dear friends!")
})