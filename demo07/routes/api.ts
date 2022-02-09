import express from 'express';
import { PrismaClient } from '@prisma/client';
import sanitizeHtml from 'sanitize-html';

const prisma = new PrismaClient();

const apiRouter : express.Router = express.Router();

apiRouter.use(express.json());

apiRouter.delete("/blogitekstit/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    let blogitekstit = await prisma.blogiteksti.delete({
        where : {
            id : Number(req.params.id)
        }
    });

    res.json(blogitekstit);
});

apiRouter.post("/blogitekstit", async (req : express.Request, res : express.Response) : Promise<void> => {

    let blogitekstit = await prisma.blogiteksti.create({
        data : {
            otsikko : req.body.otsikko,
            sisalto : sanitizeHtml(req.body.sisalto)
        }
    });

    res.json(blogitekstit);
});

apiRouter.get("/blogitekstit", async (req : express.Request, res : express.Response) : Promise<void> => {

    let blogitekstit = await prisma.blogiteksti.findMany();

    res.json(blogitekstit);
});


export default apiRouter;