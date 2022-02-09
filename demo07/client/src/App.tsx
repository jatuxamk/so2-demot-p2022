import React, {useEffect, useState} from 'react';
import { Alert, Container, Typography, Backdrop, CircularProgress} from '@mui/material';

interface Data {
  blogikirjoitukset : any[],
  dataHaettu : boolean,
  virhe : string  
}

const App : React.FC = () : React.ReactElement => {

  const [data, setData] = useState<Data>({
                                      blogikirjoitukset : [],
                                      dataHaettu : false,
                                      virhe : ""
                                  })

  const haeBlogitekstit = async () : Promise<void> => {

    try {

      const yhteys = await fetch("/api");

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

  }

  useEffect(() => {
    haeBlogitekstit();
  }, [])
  

  return (
    <Container>
      <Typography variant='h5'>Demo 7: Tietokannat (Prisma ORM)</Typography><Typography/>

      {(Boolean(data.virhe))
      ? <Alert severity='error'>{data.virhe}</Alert>
      : (data.dataHaettu)
          ?<div>{data.blogikirjoitukset}</div>
          :<Backdrop open={true}>
            <CircularProgress color="inherit"/>
          </Backdrop>
      }

    </Container>
  );
}

export default App;
