import { readFile, writeFile } from 'fs/promises'; 
import path from 'path';

export interface Kayttaja {
    id : number,
    tunnus : string,
    salasana : string
}

class kayttajat {

    private tiedostonimi : string[] = [__dirname, "data", "kayttajat.json"]
    private data : Kayttaja[] = [];

    constructor() {

        readFile(path.resolve(...this.tiedostonimi), "utf-8")
            .then((dataStr : string) => {
                this.data = JSON.parse(dataStr);
            })
            .catch((e : any) => {
                this.data = [];
            });

    }

    public haeKayttaja = async (tunnus : string) : Promise<any> => {

        return this.data.find((kayttaja : Kayttaja) => {
            return kayttaja.tunnus === tunnus
        });

    }

}

export default new kayttajat();