import { readFile, writeFile } from 'fs/promises'; 
import path from 'path';

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