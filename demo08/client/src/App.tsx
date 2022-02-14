import React, { useRef, useState } from 'react';
import {Alert, Button, Container, FormControl, List, ListItem, ListItemText, FormLabel, FormControlLabel, RadioGroup, Grid, Radio, Typography, Paper, Stack, TextField} from '@mui/material'; 

const App : React.FC = () : React.ReactElement => {

  const lomakeRef = useRef<any>();
  const [kayttajat, setKayttajat] = useState<any[]>([]);
  const [virhe, setVirhe] = useState<string>("");

  const kaynnistaHaku = async (e : React.FormEvent) : Promise<void> => {

    e.preventDefault();


    try {

        let reitti : string = `/api/kayttajat?hakusana=${lomakeRef.current.hakusana.value}&sukupuoli=${lomakeRef.current.sukupuoli.value}`;

                                console.log(reitti);

        const yhteys = await fetch(reitti);
        const data = await yhteys.json();

        setKayttajat(data);

    } catch (e: any) {

      setVirhe("Palvelimelle ei saada yhteyttä.")

    } 

  }


  return (
    <Container>
      <Typography variant="h5">Demo 8: SQL-tietokantapalvelimet ja -kyselyt</Typography>
      
      <Typography variant="h6">Käyttäjähaku</Typography>

      <Paper 
        component="form"
        onSubmit={kaynnistaHaku}
        ref={lomakeRef}
        elevation={2}
        sx={{ padding : 2 }}
      >
        <Stack spacing={2}>

          <Grid container spacing={1}>

            <Grid item xs={10}>

              <TextField 
                name="hakusana"
                variant="outlined"
                size="small"
                fullWidth={true}
              />

            </Grid>
            <Grid item xs={2}>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth={true}
              >Hae</Button>

            </Grid>
          </Grid>

          <FormControl>
            <FormLabel>Sukupuoli</FormLabel>
            <RadioGroup
              row
              name="sukupuoli"
            >
              <FormControlLabel value="nainen" control={<Radio />} label="Nainen" />
              <FormControlLabel value="mies" control={<Radio />} label="Mies" />
              <FormControlLabel value="" control={<Radio />} label="Ei merkitystä" />
            </RadioGroup>
          </FormControl>

        </Stack>


      </Paper>

      {(Boolean(virhe)) 
        ? <Alert severity="error">{virhe}</Alert>
        : <List>{kayttajat.map((kayttaja, idx) => {
          return <ListItem key={idx}>
                    <ListItemText 
                      primary={`${kayttaja.etunimi} ${kayttaja.sukunimi}`}
                      secondary={`${kayttaja.kaupunki}, ${kayttaja.maa} ${kayttaja.sahkoposti}`}  
                    />
                  </ListItem>
        })}</List>
      }

      

    </Container>
  );
}

export default App;
