import express from 'express';
import { readFile, writeFile } from 'fs/promises'; 
import path from 'path';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3003;

interface Ostos {
    id : number,
    ostos : string
}

const haeOstokset = async () : Promise<any> => {

    try  {

        let data : string = await readFile(path.resolve(__dirname, "data", "ostokset.json"), "utf-8");

        return JSON.parse(data);

    } catch (error) {

        return null;

    }

}

const tallennaOstokset = async (ostokset : Ostos[]) : Promise<any> => {

    try {

        await writeFile(path.resolve(__dirname, "data", "ostokset.json"), JSON.stringify(ostokset, null, 2), "utf-8")

    } catch (error) {

        return null;
    }

}

app.use(express.static(path.resolve(__dirname, "public" )));

app.use(express.json()); // Otetaan vastaan mahdollinen pyynnön body json-datana

app.delete("/api/ostokset/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    let ostokset : Ostos[] = await haeOstokset();

    ostokset = ostokset.filter((ostos : Ostos) => {

        return ostos.id !== Number(req.params.id);

    })

    tallennaOstokset(ostokset);

    res.json({ "viesti" : "Ostos poistettu" })

});

app.put("/api/ostokset/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    let ostokset : Ostos[] = await haeOstokset();

    ostokset = ostokset.filter((ostos : Ostos) => {

        return ostos.id !== Number(req.params.id);

    })   

    let uusiOstos : Ostos = {
            id : Number(req.params.id),
            ostos : req.body.ostos
        }

    ostokset = [...ostokset, uusiOstos];

    ostokset.sort((a, b) => { // sorttaa arrayn id:n mukaiseen järjestykseen ennen tallennusta

        return a.id - b.id;

    });

    tallennaOstokset(ostokset);

    res.json({ "viesti" : "Ostos muutettu" })

});

app.post("/api/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {


    let ostokset : Ostos[] = await haeOstokset();

    let uusiOstos : Ostos = {
                        id : ostokset[ostokset.length -1].id + 1,
                        ostos : req.body.ostos
                    }

    ostokset = [...ostokset, uusiOstos];

    tallennaOstokset(ostokset);

    res.json({ "viesti" : "Uusi ostos lisätty" })

});


app.get("/api/ostokset/:id", async (req : express.Request, res : express.Response) : Promise<void> => {

    let ostokset : Ostos[] = await haeOstokset();

    if (ostokset) {

        let ostos = ostokset.find((ostos : Ostos) => {

            return ostos.id === Number(req.params.id);  
    
        });

        res.json(ostos);

    } else {

        res.json({ "virhe" : "Palvelinvirhe" })
    }


});

app.get("/api/ostokset", async (req : express.Request, res : express.Response) : Promise<void> => {

    let ostokset : Ostos[] = await haeOstokset();

    if (ostokset) {

        res.json(ostokset);

    } else {

        res.json({ "virhe" : "Palvelinvirhe" })
    }

    

});

app.listen(portti, () => {

    console.log(`Palvelin kännistyi porttiin ${portti}`);

});