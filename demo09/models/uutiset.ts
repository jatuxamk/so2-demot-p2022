import axios from 'axios';
import Parser from 'rss-parser';
import {parseISO} from 'date-fns';

const parser : Parser = new Parser();

export interface Uutinen {
    otsikko : string,
    sisalto : string,
    julkaistu : Date,
    kuva : string,
    linkki : string
}

const haeUutiset = (url : string) => {

    return new Promise(async (resolve : (uutiset: Uutinen[]) => void, reject : (virhe : string) => void) => {

        try {

            let yhteys = await axios.get(url);            

            let rssFeed : any = await parser.parseString(yhteys.data);

            let uutiset : Uutinen[] = rssFeed.items.map((item : any) => {
                return {
                        otsikko : item.title,
                        sisalto : item.contentSnippet,
                        julkaistu : parseISO(item.isoDate),
                        kuva : (item.enclosure) ? item.enclosure.url : "http://localhost:3009/eikuvaa.png",
                        linkki : item.link
                       }
            });

            resolve(uutiset);

        } catch (e : any) {

            reject(`RSS-feediin ${url} ei saada yhteyttä`);

        }

    });

} 

export default haeUutiset;