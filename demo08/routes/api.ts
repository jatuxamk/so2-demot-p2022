import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const apiRouter : express.Router = express.Router();

apiRouter.get("/", async (req : express.Request, res :express.Response ) => {

    let ostokset = await prisma.ostos.findMany();

    res.json(ostokset);

});

export default apiRouter;