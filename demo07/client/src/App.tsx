import React from 'react';
import { Container, Typography} from '@mui/material';
import { Routes, Route } from 'react-router-dom'
import Blogi from './components/Blogi';
import Hallinta from './components/Hallinta';

interface Data {
  blogikirjoitukset : any[],
  dataHaettu : boolean,
  virhe : string  
}

const App : React.FC = () : React.ReactElement => {



  return (
    <Container>
      <Typography variant='h5'>Demo 7: Tietokannat (Prisma ORM)</Typography><Typography/>

      <Routes>
        <Route path="/" element={<Blogi />}/>
        <Route path="/hallinta" element={<Hallinta />} />
      </Routes>

    </Container>
  );
}

export default App;
