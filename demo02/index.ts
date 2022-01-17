import express from 'express';
import path from 'path';
import kayttajat from "./kayttajat.json";

interface Kayttaja {
    id: number;
    sukunimi: string;
    etunimi: string;
    sukupuoli: string;
    kaupunki: string;
    maa: string;
    sahkoposti: string;
    ipOsoite: string;
    luottokorttityyppi: string;
    luottokortinNumero: string;
    kayttajatunnus: string;
    salasana: string;
}

interface Data {
    id: number,
    nimi : string,
    kayttajatunnus : string,
    sahkoposti : string,
    maa : string
}

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3002;

app.use(express.static(path.resolve(__dirname, "public")));

app.get("/kayttajat/:id", (req : express.Request, res : express.Response) => {

    let lahetettavaData : Kayttaja = kayttajat.find((kayttaja : Kayttaja) => {

        return kayttaja.id === Number(req.params.id);

    });

    res.json(lahetettavaData)

});

app.get("/kayttajat", (req : express.Request, res : express.Response) => {

    let lahetettavaData : Data[] = kayttajat.map((kayttaja : Kayttaja) => {

        return {
                id : kayttaja.id,
                nimi : `${kayttaja.sukunimi} ${kayttaja.etunimi}`,
                sahkoposti : kayttaja.sahkoposti,
                kayttajatunnus : kayttaja.kayttajatunnus,
                maa : kayttaja.maa
        }

    });

    if (typeof req.query.maa === "string") {

        lahetettavaData = lahetettavaData.filter((data : Data) => {

            return data.maa === req.query.maa;

        })

    }

    res.json(lahetettavaData);

});

app.listen(portti, () => {
    console.log(`Palvelin käynnistyi porttiin ${portti}`);    
});