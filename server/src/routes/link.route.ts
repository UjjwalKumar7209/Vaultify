import { Router, type NextFunction, type Request, type Response } from 'express'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

const linkRouter: Router = Router()

linkRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      msg: 'Authorization token missing'
    })
  }
  const token = authHeader.split(' ')[1] as string
  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    // attach userId to request
    ;(req as any).userId = user.id

    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    })
  }
})

linkRouter.post('/', async (req: Request, res: Response) => {
  const {
    title,
    link,
    category
  }: { title: string; link: string; category: string } = req.body
  const userId = (req as any).userId

  if (!userId || typeof userId !== 'string') {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
  try {
    const data = await prisma.links.create({
      data: {
        title,
        link,
        category,
        user: {
          connect: { id: userId }
        }
      }
    })
    return res.json({ msg: 'inserted' })
  } catch (error) {
    return res.json({
      err: error
    })
  }
})

linkRouter.get('/bulk', async (req: Request, res: Response) => {
  const userId = (req as any).userId
  if (!userId || typeof userId !== 'string') {
    return res.status(401).json({ msg: 'Unauthorized' })
  }

  try {
    const data = await prisma.links.findMany({
      where: {
        userId: userId
      }
    })
    if (!data) {
      return res.status(404).json({
        msg: 'Link not found'
      })
    }

    return res.json({
      data
    })
  } catch (error) {
    return res.status(409).json({
      err: error
    })
  }
})

linkRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id
  const userId = (req as any).userId

  if (!userId || typeof userId != 'string') {
    return res.status(409).json({
      msg: 'Unauthorized'
    })
  }

  if (typeof id !== 'string') {
    return res.status(400).json({
      msg: 'Invalid id'
    })
  }

  try {
    const data = await prisma.links.findFirst({
      where: {
        id: id,
        userId: userId
      }
    })
    if (!data) {
      return res.status(404).json({
        msg: 'Link not found'
      })
    }
    return res.json({
      data
    })
  } catch (error) {
    return res.status(409).json({
      err: error
    })
  }
})

linkRouter.put('/:id', async (req: Request, res: Response) => {
  const {
    title,
    link,
    category
  }: { title: string; link: string; category: string } = req.body
  const id: string = req.params.id as string
  if (!id) {
    return res.status(400).json({ msg: 'Missing id param' })
  }
  const userId = (req as any).userId

  if (!userId || typeof userId !== 'string') {
    return res.status(401).json({ msg: 'Unauthorized' })
  }
  try {
    const linkRecord = await prisma.links.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!linkRecord) {
      return res.status(403).json({
        msg: 'Not allowed to update this link'
      })
    }

    await prisma.links.update({
      where: { id },
      data: { title, link, category }
    })

    return res.json({ msg: 'updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      msg: 'Internal server error'
    })
  }
})


linkRouter.delete('/:id', async (req: Request, res: Response) => {
  const id:string = req.params.id as string;
  if (!id) {
    return res.status(400).json({
      msg: "id params missing"
    })
  }

  const userId = (req as any).userId
  if (!userId || typeof userId !== "string") {
    return res.status(401).json({ msg: 'Unauthorized' })
  }

  try {
    const linkRecord = await prisma.links.findFirst({
      where: {
        id,
        userId
      }
    })
    if (!linkRecord) {
      return res.status(403).json({
        msg: 'Not allowed to delete this link'
      })
    }

    await prisma.links.delete({
      where: {
        id
      }
    })

    return res.status(200).json({
      msg: "Delete successful"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Internal server error"
    })
  }
})

export default linkRouter
