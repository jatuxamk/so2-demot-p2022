import express from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const apiRouter : express.Router = express.Router();

apiRouter.get("/kayttajat", async (req : express.Request, res :express.Response ) => {

    if (typeof req.query.hakusana === "string") {

        let hakusana : string = `%${String(req.query.hakusana)}%`;

        let sukupuoli : string = String(req.query.sukupuoli);

        let kayttajat = await prisma.$queryRaw`SELECT * FROM kayttaja WHERE 
                                                (etunimi LIKE ${hakusana} OR 
                                                sukunimi LIKE ${hakusana}) 
                                                ${ (sukupuoli !== "undefined") ? Prisma.sql`AND sukupuoli = ${sukupuoli}` :  Prisma.empty }
                                                LIMIT 10`;
    

                                                
        res.json(kayttajat);

    }


});

export default apiRouter;