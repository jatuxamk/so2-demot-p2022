import { readFile, writeFile } from 'fs/promises'; 
import path from 'path';

export interface Ostos {
    id : number,
    ostos : string
}

class ostokset {

    private tiedostonimi : string[] = [__dirname, "data", "ostokset.json"]
    private data : Ostos[] = [];

    constructor() {

        readFile(path.resolve(...this.tiedostonimi), "utf-8")
            .then((dataStr : string) => {
                this.data = JSON.parse(dataStr);
            })
            .catch((e : any) => {
                this.data = [];
            });

    }

    public haeKaikki = async () : Promise<any> => {

        try  {

            return this.data;

        } catch (error) {

            throw {
                    "status" : 500,
                    "teksti" : "Tiedostoa ei voitu avata"
                };

        }

    }

    public lisaa = async (reqBody : any) : Promise<void> => {

        let uusiOstos = {
            id : this.data[this.data.length -1].id + 1,
            ostos : reqBody.ostos
        }

        this.data = [...this.data, uusiOstos];

        await this.tallenna();


    }

    public poista = async (id : number) : Promise<any> => {

        this.data = this.data.filter((ostos) => {
            return ostos.id !== id;
        })

        await this.tallenna();


    }

    private tallenna = async () : Promise<any> => {

        try {

            await writeFile(path.resolve(...this.tiedostonimi), JSON.stringify(this.data, null, 2), "utf-8")

        } catch (error) {

            return {
                    "status" : 500,
                    "teksti" : "Tiedostoa ei voitu tallentaa"
                };
        }

    }

}

export default new ostokset();