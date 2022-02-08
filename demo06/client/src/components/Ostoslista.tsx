import React, { useRef, Dispatch, SetStateAction, useEffect } from 'react';
import { Alert, Backdrop, Button, CircularProgress, List, ListItem, ListItemText, Stack, TextField } from '@mui/material'; 

interface Ostos {
  id : number,
  ostos : string
}

interface Data {
  ostokset : Ostos[],
  virhe : string,
  dataHaettu : boolean
}

interface Props {
    data : Data,
    token : string,
    setData : Dispatch<SetStateAction<Data>>
    apiKutsu : (arg0: any) => {}
}

const Ostoslista : React.FC<Props> = (props : Props) : React.ReactElement => {

  const formData = useRef<any>({})
  
  const lisaaUusi = async (e : any) : Promise<void> => {

    e.preventDefault();

    if (formData.current.uusiOstos.length > 0) {

      props.setData({
        ...props.data,
        dataHaettu : false
      });

      props.apiKutsu({ 
                method : "POST",
                headers : {
                  'Content-Type' : 'application/json',
                  'Authorization' : `Bearer ${props.token}`
                },
                body : JSON.stringify({
                  "ostos" : formData.current.uusiOstos
                })
              });
      } 

  }

  useEffect(() => {
    props.apiKutsu({
              method : "GET",
              headers : {
                'Authorization' : `Bearer ${props.token}`
              }
            });    
  }, []);

  return (Boolean(props.data.virhe))
      ? <Alert severity="error">
          {props.data.virhe}
        </Alert>
      : (props.data.dataHaettu)
        ? <>
          <List>
            {props.data.ostokset.map((ostos : Ostos, idx : number) => {
              return <ListItem key={idx}>
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


export default Ostoslista;
