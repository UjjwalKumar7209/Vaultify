import { Router, type Request, type Response } from "express";
import { loginSchema, signupSchema } from "../validation/auth.validation.js";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken"

const authRouter: Router = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    const {email, password}: {email: string, password: string} = req.body;
    const {success} = loginSchema.safeParse({
        email,
        password
    })

    if (!success) {
        return res.status(411).json({
            error: "Enter valid input!"
        })
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    })

    if (!user || password !== user.password) {
        return res.status(403).json({
            msg: "Invalid email or password!"
        })
    }

    const userJWT = jwt.sign({id: user.id}, process.env.JWT_SECRET as string);
    return res.json({
        jwt: userJWT
    })
})



authRouter.post('/signup', async (req: Request, res: Response) => {
    const {name, email, password}: {name: string, email: string, password: string} = req.body;
    const {success} = signupSchema.safeParse({
        name,
        email,
        password
    })

    if (!success) {
        return res.status(411).json({
            error: "Enter valid input!"
        })
    }

    if (await prisma.user.findFirst({
        where: {
            email: email
        }
    })) {
        return res.status(409).json({
            msg: "User already exist"
        })
    }

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })

    const userJWT = jwt.sign({id: user.id}, process.env.JWT_SECRET as string);
    return res.json({
        jwt: userJWT
    })
})



export default authRouter;