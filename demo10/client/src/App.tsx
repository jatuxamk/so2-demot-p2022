import React, { useEffect, useState, useRef } from 'react';
import { Alert, Backdrop, Button, CircularProgress, Container, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material'; 
import DeleteIcon from '@mui/icons-material/Delete';

interface Ostos {
  id : number,
  ostos : string
}

interface Data {
  ostokset : Ostos[],
  virhe : string,
  dataHaettu : boolean
}

const App : React.FC = () : React.ReactElement => {

  const formData = useRef<any>({})

  const [data, setData] = useState<Data>({
                                            ostokset : [],
                                            virhe : "",
                                            dataHaettu : false
                                        });
  
  const poista = async (id:number) : Promise<void> => {


    try {

      const yhteys = await fetch(`/api/ostokset/${id}`, { method : "DELETE" });

        if (yhteys.status === 200) {

        const vastaanotettuData = await yhteys.json();

        setData({
                  ...data,
                  ostokset : [...data.ostokset.filter((ostos) => ostos.id !== vastaanotettuData.id )],
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

  const lisaaUusi = async (e : any) : Promise<void> => {

    e.preventDefault();

    if (formData.current.uusiOstos.length > 0) {

      setData({
        ...data,
        dataHaettu : false
      });


      try {

        const yhteys = await fetch("/api/ostokset", { 
                                                      method : "POST",
                                                      headers : {
                                                        'Content-Type' : 'application/json'
                                                      },
                                                      body : JSON.stringify({
                                                        "ostos" : formData.current.uusiOstos
                                                      })
                                                    });

          if (yhteys.status === 200) {

          const vastaanotettuData = await yhteys.json();
  
          setData({
                    ...data,
                    ostokset : [...data.ostokset,
                                vastaanotettuData
                               ],
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

  }


  const haeData = async () : Promise<void> => {  

    try {
      const yhteys = await fetch("/api/ostokset");
      
      if (yhteys.status === 200) {

        const vastaanotettuData = await yhteys.json();

        setData({
                  ...data,
                  ostokset : vastaanotettuData,
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

  return (
    <Container>
      
      <Typography variant="h5">
        Ostoslista
      </Typography>
      
      {(Boolean(data.virhe))
      ? <Alert severity="error">
          {data.virhe}
        </Alert>
      : (data.dataHaettu)
        ? <>
          <List>
            {data.ostokset.map((ostos : Ostos, idx : number) => {
              return <ListItem 
                        key={idx}
                        secondaryAction={
                          <IconButton 
                            edge="end"
                            onClick={() => { poista(ostos.id) }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                     >
                        <ListItemText primary={ostos.ostos}></ListItemText>
                    </ListItem>
            })}
          </List>
          <form onSubmit={(e: any) => {
                                    lisaaUusi(e);
                                    }}>
          <Stack spacing={1}>
            <TextField
              name="uusiOstos"
              variant="outlined"
              placeholder='Kirjoita ostos' 
              fullWidth={true}
              onChange={(e: any) => { formData.current[e.target.name] = e.target.value }}      
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth={true}
              size="large"
            >Lisää uusi ostos</Button>
            
          </Stack>
          </form>
          </>
        : <Backdrop open={true}>
            <CircularProgress color="inherit"/>
          </Backdrop>  
      }

    </Container>
  );
}

export default App;
