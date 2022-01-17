import express from 'express';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3002;

app.get("/", (req : express.Request, res : express.Response) => {

    res.send("Toimii!!!");

});

app.listen(portti, () => {
    console.log(`Palvelin käynnistyi porttiin ${portti}`);    
});