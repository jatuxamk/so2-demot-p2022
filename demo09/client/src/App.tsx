import React, { useEffect, useState, useRef } from 'react';
import { Alert, Backdrop, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Link, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'; 
import { format, parseISO, parseJSON } from 'date-fns';

interface Uutinen {
  otsikko : string,
  sisalto : string,
  julkaistu : Date,
  kuva : string,
  linkki : string
}

interface Data {
  uutiset : Uutinen[],
  virhe : string,
  dataHaettu : boolean
}

const App : React.FC = () : React.ReactElement => {

  const [data, setData] = useState<Data>({
                                            uutiset : [],
                                            virhe : "",
                                            dataHaettu : false
                                        });
  const [indeksi, setIndeksi] = useState<number>(0);

  const haeData = async () : Promise<void> => {  

    try {
      const yhteys = await fetch("/api/uutiset");
      
      if (yhteys.status === 200) {

        const vastaanotettuData = await yhteys.json();

        setData({
                  ...data,
                  uutiset : vastaanotettuData,
                  dataHaettu : true
                });
  
      } else {

        setData({
          ...data,
          virhe : `Palvelin ei palauttanut dataa. (status : ${yhteys.status})`
        });

      }
      

    } catch (e : any) {

      setData({
                ...data,
                virhe : "Palvelimeen ei saada yhteyttä."
              });

    }

  }
  
  useEffect(() => {
    haeData();    
  }, []);

  useEffect(() => {
    
    setTimeout(() => { 
      
      if (indeksi === (data.uutiset.length - 1)) {
        setIndeksi(0);
        haeData(); 
      } else {
        setIndeksi(indeksi + 1);
      }
      
    }, 5000);
    
  }, [indeksi]);


  return (
    <Container>
      
      <Typography variant="h5">
        Demo 9: Tietojen haku toiselta palvelimelta (RSS/XML)
      </Typography>

      <Typography variant="h6">Ylen uutisia</Typography>
      
      {(Boolean(data.virhe))
      ? <Alert severity="error">
          {data.virhe}
        </Alert>
      : (data.dataHaettu)
        ?<Card sx={{ width: 410 }}>
          <CardMedia
            component="img"
            height="210"
            image={data.uutiset[indeksi].kuva}
            alt=""
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.uutiset[indeksi].otsikko}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {format(parseJSON(data.uutiset[indeksi].julkaistu), "dd.MM.yyyy HH:mm")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.uutiset[indeksi].sisalto}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">
              <Link href={data.uutiset[indeksi].linkki} target="_blank">
                Lue lisää
              </Link>
              </Button>
          </CardActions>
        </Card>
        : <Backdrop open={true}>
            <CircularProgress color="inherit"/>
          </Backdrop>  
      }

    </Container>
  );
}

export default App;
