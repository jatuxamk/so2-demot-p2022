import { readFile, writeFile } from 'fs/promises'; 
import path from 'path';

export interface Ostos {
    id : number,
    ostos : string
}

class ostokset {

    data : Ostos[] = [];

    constructor() {

        readFile(path.resolve(__dirname, "data", "ostokset.json"), "utf-8")
            .then((dataStr : string) => {
                this.data = JSON.parse(dataStr);
            })
            .catch((e : any) => {
                this.data = [];
            });

    }

    haeKaikki = async () : Promise<any> => {

        try  {

            return this.data;

        } catch (error) {

            throw {
                    "status" : 500,
                    "teksti" : "Tiedostoa ei voitu avata"
                };

        }

    }

    lisaa = async () : Promise<void> => {




    }

    tallennaOstokset = async (ostokset : Ostos[]) : Promise<any> => {

        try {

            await writeFile(path.resolve(__dirname, "data", "ostokset.json"), JSON.stringify(ostokset, null, 2), "utf-8")

        } catch (error) {

            return null;
        }

    }

}

export default new ostokset();