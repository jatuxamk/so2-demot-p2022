import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const apiRouter : express.Router = express.Router();

apiRouter.get("/", async (req : express.Request, res : express.Response) : Promise<void> => {

    let blogitekstit = await prisma.blogiteksti.findMany();

    res.json(blogitekstit);
});


export default apiRouter;