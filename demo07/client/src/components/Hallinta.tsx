import React, { useState, useEffect } from "react";
import { Alert, Backdrop, Button, CircularProgress, Typography, ListItem, ListItemText, List, ListItemIcon, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Muokkaus from './Muokkaus';

interface Data {
  blogikirjoitukset: any[];
  virhe: string;
  dataHaettu: boolean;
}

const Hallinta: React.FC = (): React.ReactElement => {

    const [dialogiAuki, setDialogiAuki] = useState<boolean>(false);

    const [data, setData] = useState<Data>({
        blogikirjoitukset: [],
        virhe: "",
        dataHaettu: false,
    });

    const poista = async (id : number) : Promise<void> => {

        try {

            const yhteys = await fetch(`/api/blogitekstit/${id}`, {
                method : "DELETE"
            });
      
            const poistettuKirjoitus = await yhteys.json();

            console.log(poistettuKirjoitus)

            setData({
                ...data,
                dataHaettu : true,
                blogikirjoitukset : [...data.blogikirjoitukset.filter((kirjoitus) => kirjoitus.id !== poistettuKirjoitus.id)]
            });

          } catch (e : any) {
      
            setData({
              ...data,
              virhe : "Palvelimeen ei saada yhteyttä.",
              dataHaettu : true
            });
      
          }

    }


    const lisaaUusi = async (otsikko : string, sisalto : string) : Promise<void> => {

        try {

            const yhteys = await fetch("/api/blogitekstit", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    otsikko : otsikko,
                    sisalto : sisalto
                })
            });
      
            const uusiKirjoitus = await yhteys.json();
      
            setData({
                ...data,
                dataHaettu : true,
                blogikirjoitukset : [...data.blogikirjoitukset, uusiKirjoitus]
            });
      
          } catch (e : any) {
      
            setData({
              ...data,
              virhe : "Palvelimeen ei saada yhteyttä.",
              dataHaettu : true
            });
      
          }

    }

    const haeBlogitekstit = async (): Promise<void> => {

        try {

            const yhteys = await fetch("/api/blogitekstit");
      
            const blogikirjoitukset = await yhteys.json();
      
            setData({
              ...data,
              blogikirjoitukset : blogikirjoitukset,
              dataHaettu : true
            });
      
          } catch (e : any) {
      
            setData({
              ...data,
              virhe : "Palvelimeen ei saada yhteyttä.",
              dataHaettu : true
            });
      
          }
    };

    useEffect(() => {
        haeBlogitekstit();
    }, []);

  return <>
            <Typography variant="h6">Ylläpito</Typography>
            <Button 
                variant="contained"
                onClick={() => { setDialogiAuki(true) }}
            >Lisää uusi kirjoitus</Button>

            {(Boolean(data.virhe)) ? (
                <Alert severity="error">{data.virhe}</Alert>
            ) : data.dataHaettu ? (
                <List>
                
                {data.blogikirjoitukset.map((teksti: any, idx: number) => {
                    return (
                    <ListItem key={idx} sx={{ paddingTop: 2 }}>
                        <ListItemText primary={teksti.otsikko} />
                        <ListItemIcon>
                            <IconButton onClick={() => { poista(Number(teksti.id)) }}>
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                    );
                })}
                </List>
            ) : (
                <Backdrop open={true}>
                <   CircularProgress color="inherit" />
                </Backdrop>
            )}

            <Muokkaus dialogiAuki={dialogiAuki} setDialogiAuki={setDialogiAuki} lisaaUusi={lisaaUusi}/>

        </>
};

export default Hallinta;
