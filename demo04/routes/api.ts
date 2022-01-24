import express from 'express';
import ostokset, { Ostos } from '../models/ostokset';

const apiRouter : express.Router = express.Router();

apiRouter.use(express.json()); // Otetaan vastaan mahdollinen pyynnön body json-datana

apiRouter.post("/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {

        if (req.body.ostos) {

            ostokset.lisaa(req.body);
            res.json({ "viesti" : "Uusi ostos lisätty" });

        } else {

            res.status(400).json({ "viesti" : "Virheellinen data" });

        }     


    } catch (e : any) {
        res.status(e.status).json({ "viesti" : e.teksti });
    }



});

apiRouter.get("/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {

        let data : Ostos[] = await ostokset.haeKaikki();

        res.json(data);

    } catch (e : any) {

        console.log(e)

        res.status(e.status).json({ "virhe" : e.teksti })

    }
              
 
});

export default apiRouter;
