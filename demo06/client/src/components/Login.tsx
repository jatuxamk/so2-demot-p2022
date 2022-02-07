import React, { useRef, SetStateAction, Dispatch } from "react";
import { Box, Button, Container, Stack, TextField, Typography} from "@mui/material";

const Login: React.FC = () : React.ReactElement => {

    const tunnusInput = useRef<HTMLInputElement>();
    const salasanaInput = useRef<HTMLInputElement>();

    const kirjaudu = async (e : React.FormEvent) : Promise<void> => {
        
        e.preventDefault();



        
    };

    return (
            <Box
                component="form"
                onSubmit={kirjaudu}
                style={{
                    width: 300,
                }}
            >
                <Stack spacing={2}>
                    <Typography variant="h6">Kirjaudu sisään</Typography>
                    <TextField 
                        label="Käyttäjätunnus" 
                        inputRef={tunnusInput}
                    />
                    <TextField 
                        label="Salasana"
                        inputRef={salasanaInput} 
                        type="password" 
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        size="large"
                    >
                        Kirjaudu
                    </Button>
                </Stack>
            </Box>
    );
};

export default Login;
