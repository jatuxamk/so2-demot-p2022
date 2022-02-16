import express from 'express';
import path from 'path';
import haeUutiset, { Uutinen } from './models/uutiset';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3009;

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/api/uutiset", async (req : express.Request, res : express.Response) : Promise<void>=> {

    try  {

        let uutiset : Uutinen[] = await haeUutiset("https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET");

        res.json(uutiset);

    } catch (e : any) {

        res.status(500).json({ virhe : e })

    }

});

app.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin: ${portti}`);

});