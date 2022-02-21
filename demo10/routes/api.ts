import express from 'express';
import { PrismaClient } from '@prisma/client';

const apiRouter : express.Router = express.Router();

const prisma : PrismaClient = new PrismaClient();

apiRouter.use(express.json());

apiRouter.delete("/ostokset/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {

        res.json(await prisma.ostos.delete({
            where: {
                id: Number(req.params.id)
            }
        }));


    } catch (e : any) {
        res.status(500).json({ "virhe" : e });
    }


});

apiRouter.post("/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {
 
        res.json(await prisma.ostos.create({
            data: {
                ostos: req.body.ostos || "ei nimeä"
            }
        }));

    } catch (e : any) {
        res.status(500).json({ "virhe" : e });
    }



});

apiRouter.get("/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {

        res.json(await prisma.ostos.findMany());

    } catch (e : any) {
        res.status(500).json({ "virhe" : e })
    }
              
 
});

export default apiRouter;
