import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

dotenv.config({ path : path.resolve(__dirname, ".env")});

const app : express.Application = express();

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {

    console.log(`Palvelin käynnistyi porttiin: ${process.env.PORT}`);

});