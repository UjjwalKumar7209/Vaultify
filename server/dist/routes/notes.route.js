import { Router } from 'express';
import jwt, {} from 'jsonwebtoken';
import { prisma } from '../lib/prisma.js';
const notesRouter = Router();
notesRouter.use(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            msg: 'Authorization token missing'
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = user.id;
        next();
    }
    catch (err) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
});
notesRouter.post('/', async (req, res) => {
    const { subject, title, subTitle, content } = req.body;
    const userId = req.userId;
    if (!userId || typeof userId !== 'string') {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    try {
        const data = await prisma.notes.create({
            data: {
                subject,
                title,
                subTitle,
                content,
                user: {
                    connect: { id: userId }
                }
            }
        });
        return res.json({ msg: 'inserted' });
    }
    catch (error) {
        return res.json({
            err: "note not created due to an unexpected error"
        });
    }
});
notesRouter.get('/bulk', async (req, res) => {
    const userId = req.userId;
    if (!userId || typeof userId !== 'string') {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    try {
        const data = await prisma.notes.findMany({
            where: {
                userId: userId
            }
        });
        if (!data) {
            return res.status(404).json({
                msg: 'Link not found'
            });
        }
        return res.json({
            data
        });
    }
    catch (error) {
        return res.status(409).json({
            err: "error"
        });
    }
});
notesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;
    if (!userId || typeof userId != 'string') {
        return res.status(409).json({
            msg: 'Unauthorized'
        });
    }
    if (typeof id !== 'string') {
        return res.status(400).json({
            msg: 'Invalid id'
        });
    }
    try {
        const data = await prisma.notes.findFirst({
            where: {
                id: id,
                userId: userId
            }
        });
        if (!data) {
            return res.status(404).json({
                msg: 'Link not found'
            });
        }
        return res.json({
            data
        });
    }
    catch (error) {
        return res.status(409).json({
            err: error
        });
    }
});
notesRouter.put('/:id', async (req, res) => {
    const { subject, title, subTitle, content } = req.body;
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ msg: 'Missing id param' });
    }
    const userId = req.userId;
    if (!userId || typeof userId !== 'string') {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    try {
        const noteRecord = await prisma.notes.findFirst({
            where: {
                id,
                userId
            }
        });
        if (!noteRecord) {
            return res.status(403).json({
                msg: 'Not allowed to update this link'
            });
        }
        await prisma.notes.update({
            where: { id },
            data: { subject, title, subTitle, content }
        });
        return res.json({ msg: 'updated' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error'
        });
    }
});
notesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            msg: "id params missing"
        });
    }
    const userId = req.userId;
    if (!userId || typeof userId !== "string") {
        return res.status(401).json({ msg: 'Unauthorized' });
    }
    try {
        const linkRecord = await prisma.notes.findFirst({
            where: {
                id,
                userId
            }
        });
        if (!linkRecord) {
            return res.status(403).json({
                msg: 'Not allowed to delete this link'
            });
        }
        await prisma.notes.delete({
            where: {
                id
            }
        });
        return res.status(200).json({
            msg: "Delete successful"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
});
export default notesRouter;
//# sourceMappingURL=notes.route.js.map