import express from 'express';
import path from 'path';
import apiRouter from './routes/api';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3010;

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api/", apiRouter);

app.listen(portti, () => {

    console.log(`Palvelin kännistyi porttiin ${portti}`);

});