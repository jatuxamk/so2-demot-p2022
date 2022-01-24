import express from 'express';
import apiRouter from './routes/api';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3004;

app.use("/api/", apiRouter);

app.listen(portti, () => {

    console.log(`Palvelin kännistyi porttiin ${portti}`);

});