import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import kayttajat, { Kayttaja } from '../models/kayttajat';

const authRouter : express.Router = express.Router();

authRouter.use(express.json()); // Otetaan vastaan mahdollinen pyynnön body json-datana

authRouter.post("/login", async (req : express.Request, res : express.Response) : Promise<void> => {

    try {

        let kayttaja : Kayttaja = await kayttajat.haeKayttaja(req.body.tunnus)

        if (kayttaja) {

            let hash = crypto.createHash("SHA256").update(req.body.salasana).digest("hex");

            if (kayttaja.salasana === hash) 
            {
                let token = jwt.sign({ id : kayttaja.id, tunnus : kayttaja.tunnus }, String(process.env.ACCESS_TOKEN_SECRET), { algorithm :  "HS256" }); 

                res.status(200).json({"token" : token})

            } else {

                  res.status(401).json({ "viesti" : "Virheellinen tunnus tai salasana" });
            }          

        } else {

            res.status(401).json({ "viesti" : "Virheellinen tunnus tai salasana" });
        }

    } catch (e : any) {
        res.status(e.status).json({ "viesti" : e.teksti });
    }



});

export default authRouter;
