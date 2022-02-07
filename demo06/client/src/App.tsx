import React, { useEffect, useState } from 'react';
import {Routes , Route, useNavigate, NavigateFunction} from 'react-router-dom'; 
import { Container, Typography } from '@mui/material'; 
import Ostoslista from './components/Ostoslista';
import Login from './components/Login';

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

  const navigate : NavigateFunction = useNavigate();

  const [token, setToken] = useState<string>(String(localStorage.getItem("jwt")))

  const [data, setData] = useState<Data>({
                                            ostokset : [],
                                            virhe : "",
                                            dataHaettu : false
                                        });
  
  const apiKutsu = async (asetukset : any) : Promise<void> => {  

    try {
      const yhteys = await fetch("http://localhost:3006/api/ostokset", asetukset);
    
      if (yhteys.status === 401) {
        navigate("/login");
      }

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
    apiKutsu({
              method : "GET",
              headers : {
                'Authorization' : `Bearer ${token}`
              }
            });    
  }, []);

  return (
    <Container>
      
      <Typography variant="h5">
        Demo 6: Ostoslista (JWT-autorisointi)
      </Typography>
      
      <Routes>
        <Route path="/" element={<Ostoslista data={data} setData={setData} token={token} apiKutsu={apiKutsu}/>}/>
        <Route path="/login" element={<Login setToken={setToken}/>}/>
      </Routes>

      

    </Container>
  );
}

export default App;
