import express, {NextFunction} from 'express';
import apiRouter from './routes/api';
import cors from 'cors';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3005;

app.use(cors({
                "origin" : "http://localhost:3000",
                "optionsSuccessStatus" : 200 
            }));

app.use((req : Express.Request, res : Express.Response, next : NextFunction) => {
    setTimeout(next, 1000);
});

app.use("/api/", apiRouter);

app.listen(portti, () => {

    console.log(`Palvelin kännistyi porttiin ${portti}`);

});