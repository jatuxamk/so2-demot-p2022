import React, { useState, useEffect } from "react";
import { Alert, Backdrop, Button, CircularProgress, Typography, ListItem, ListItemText, List, ListItemIcon, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface Data {
  blogitekstit: any[];
  virhe: string;
  dataHaettu: boolean;
}

const Hallinta: React.FC = (): React.ReactElement => {

    const [data, setData] = useState<Data>({
        blogitekstit: [],
        virhe: "",
        dataHaettu: false,
    });


    const haeBlogitekstit = async (): Promise<void> => {

        const yhteys = await fetch("/api/blogitekstit");

        setData({
        ...data,
        blogitekstit: await yhteys.json(),
        dataHaettu: true,
        });
    };

    useEffect(() => {
        haeBlogitekstit();
    }, []);

  return <>
            <Typography variant="h6">Ylläpito</Typography>
            <Button 
                variant="contained"
                onClick={() => {}}
            >Lisää uusi kirjoitus</Button>

            {(Boolean(data.virhe)) ? (
                <Alert severity="error">{data.virhe}</Alert>
            ) : data.dataHaettu ? (
                <List>
                
                {data.blogitekstit.map((teksti: any, idx: number) => {
                    return (
                    <ListItem key={idx} sx={{ paddingTop: 2 }}>
                        <ListItemText primary={teksti.otsikko} />
                        <ListItemIcon>
                            <IconButton onClick={() => {}}>
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

 

        </>
};

export default Hallinta;
