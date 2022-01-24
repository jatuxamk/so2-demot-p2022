import express from 'express';

const apiRouter : express.Router = express.Router();

apiRouter.use(express.json()); // Otetaan vastaan mahdollinen pyynnön body json-datana

apiRouter.get("/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {

    /*

    let ostokset : Ostos[] = await haeOstokset();

    if (ostokset) {

        res.json(ostokset);

    } else {

        res.json({ "virhe" : "Palvelinvirhe" })
    }
    */

    res.json("testi");

});

export default apiRouter;
