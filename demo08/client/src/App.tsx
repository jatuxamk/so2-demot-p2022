import React, { useRef } from 'react';
import {Button, Container, Grid, Typography, Paper, Stack, TextField} from '@mui/material'; 

const App : React.FC = () : React.ReactElement => {

  const lomakeRef = useRef<any>();

  const kaynnistaHaku = async (e : React.FormEvent) : Promise<void> => {

    e.preventDefault();


    try {

        let reitti : string = `/api/kayttajat?hakusana=${lomakeRef.current.hakusana.value}`;

        const yhteys = await fetch(reitti);
        const data = await yhteys.json();

        console.log(data);

    } catch (e: any) {

      console.log(e)

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
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="sukupuoli"
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

        </Stack>


      </Paper>

    </Container>
  );
}

export default App;
