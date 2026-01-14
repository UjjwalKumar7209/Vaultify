import { Router, type Request, type Response } from "express";

const categoryRouter: Router = Router();

categoryRouter.get('/', (req: Request, res: Response) => {
    res.json({
        msg: "Will be updated later"
    })
})


export default categoryRouter