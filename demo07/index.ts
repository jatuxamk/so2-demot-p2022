import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import apiRouter from './routes/api';

dotenv.config({ path : path.resolve(__dirname, ".env") });

const app : express.Application = express();

app.use(express.static(path.resolve(__dirname, "public")));

app.use("/api", apiRouter);

app.listen(process.env.PORT, () => {
    console.log(`Palvelin käynnistyi porttiin ${process.env.PORT}`);    
});

