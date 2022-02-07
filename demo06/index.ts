import express, {NextFunction} from 'express';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const app : express.Application = express();

const portti : number = Number(process.env.PORT);

const checkToken = (req : express.Request, res : express.Response, next : NextFunction) : NextFunction | void => {
    
    try {

        let token : string | undefined = req.headers.authorization!.split(" ")[1];
      
        let payload =  jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), {  algorithms : ["HS256"] });

        next();

    } catch (e : any) {

        res.status(401).json({ "virhe" : "Pääsy kielletty"});

    }

}

app.use(cors({
                "origin" : "*",
                "optionsSuccessStatus" : 204 
            }));

app.use("/auth/", authRouter);

app.use("/api/", checkToken , apiRouter);

app.listen(portti, () => {

    console.log(`Palvelin kännistyi porttiin ${portti}`);

});