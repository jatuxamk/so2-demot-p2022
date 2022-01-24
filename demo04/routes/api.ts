import express from 'express';
import ostokset, { Ostos } from '../models/ostokset';

const apiRouter : express.Router = express.Router();

apiRouter.use(express.json()); // Otetaan vastaan mahdollinen pyynnön body json-datana


apiRouter.post("/api/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {


    let vanhatOstokset : Ostos[] = await ostokset.haeKaikki();

    let uusiOstos : Ostos = {
                        id : vanhatOstokset[vanhatOstokset.length -1].id + 1,
                        ostos : req.body.ostos
                    }

    vanhatOstokset = [...vanhatOstokset, uusiOstos];

    //tallennaOstokset(ostokset);

    res.json({ "viesti" : "Uusi ostos lisätty" })

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
