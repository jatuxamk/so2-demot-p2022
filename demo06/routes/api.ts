import express from 'express';
import ostokset, { Ostos } from '../models/ostokset';

const apiRouter : express.Router = express.Router();

apiRouter.use(express.json()); // Otetaan vastaan mahdollinen pyynnön body json-datana

apiRouter.delete("/ostokset/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {

        let data : Ostos[] = await ostokset.haeKaikki();

        let loytyy = data.find((ostos : Ostos) => {
            return ostos.id === Number(req.params.id);
        });

        if (loytyy) {

            ostokset.poista(Number(req.params.id));
            res.json({ "viesti" : "Ostos poistettu" });

        } else {

            res.status(404).json({ "viesti" : "Virheellinen id" });

        }     


    } catch (e : any) {
        res.status(e.status).json({ "viesti" : e.teksti });
    }


});

apiRouter.post("/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {

        if (req.body.ostos) {

            await ostokset.lisaa(req.body);

            
            res.json(await ostokset.haeKaikki());

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

        if (data.length > 0) {
            res.json(data);
        } else {
            res.status(500).json({ "virhe" : "Palvelinvirhe"} );
        }

        

    } catch (e : any) {

        console.log(e)

        res.status(e.status).json({ "virhe" : e.teksti })

    }
              
 
});

export default apiRouter;
