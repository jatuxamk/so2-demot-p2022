import express from 'express';
import path from 'path';

const app : express.Application = express();

const portti : number = 3001;

app.get("/moikka", (req : express.Request, res : express.Response) => {

    res.send("<h1>Moikka</h1>")

});

app.get("/heippa", (req : express.Request, res : express.Response) => {

    let nimi : any;

    if (req.query.nimi) {
        nimi = req.query.nimi;
    } else {
        nimi = "tuntematon";
    }

    res.send(`<h1>Heippa, ${nimi}</h1>`);

});

app.get("/", (req : express.Request, res : express.Response) => {

    res.sendFile(path.resolve(__dirname, "etusivu.html"));

});

app.listen(portti, () => {
    console.log(`Palvelin käynnityi porttiin ${portti}`);
});