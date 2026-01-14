import { Router, type Request, type Response } from "express";

const subjectRouter: Router = Router();

subjectRouter.get('/', (req: Request, res: Response) => {
    res.json({
        msg: "Will be updated later"
    })
})


export default subjectRouter