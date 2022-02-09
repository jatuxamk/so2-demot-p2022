import React, { useState, useEffect } from 'react';
import { Alert, Backdrop, Box, CircularProgress, Stack, Typography } from '@mui/material'; 
import { format, parseJSON } from 'date-fns';

interface Data {
  blogitekstit : any[],
  virhe : string,
  dataHaettu : boolean
}

const Blogi : React.FC = () : React.ReactElement => {

  const [data, setData] = useState<Data>({
    blogitekstit : [],
    virhe : "",
    dataHaettu : false
});

  const haeBlogitekstit = async () : Promise<void> => {

    const yhteys = await fetch("/api/blogitekstit");

    setData({
      ...data,
      blogitekstit : await yhteys.json(),
      dataHaettu : true
    });

  };

  useEffect(() => {
 
    haeBlogitekstit();

  }, []);

  return (Boolean(data.virhe))
      ? <Alert severity="error">
          {data.virhe}
        </Alert>
      : (data.dataHaettu)
        ? <>
            {data.blogitekstit.map((teksti : any, idx : number) => {
              return <Box key={idx} sx={{paddingTop : 2}}> 
                        <Stack spacing={1}>
                          <Typography variant="h5">{teksti.otsikko}</Typography>
                          <Typography variant="body2">{format(parseJSON(teksti.createdAt), "dd.MM.yyyy  HH:mm")}</Typography>
                          <Typography variant="body2"><span dangerouslySetInnerHTML={ {__html: teksti.sisalto} } /></Typography>
                        </Stack>
                    </Box>
            })}
          </>
        : <Backdrop open={true}>
            <CircularProgress color="inherit"/>
          </Backdrop>  
          
}


export default Blogi;
