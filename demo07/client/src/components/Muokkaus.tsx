import React, { Dispatch, SetStateAction, useRef } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";

interface Props {
  dialogiAuki : boolean
  setDialogiAuki : Dispatch<SetStateAction<boolean>>
  lisaaUusi : (otsikko: string, sisalto: string) => void
}

const Muokkaus: React.FC<Props> = (props : Props) : React.ReactElement => {

  const formRef : any = useRef<HTMLFormElement>();
  const quillRef : any = useRef<any>();

  const tallenna = (e: React.FormEvent) : void => {

    e.preventDefault();


  }

  const peruuta = () : void => {


  } 

  return <Dialog
            maxWidth="lg" 
            fullWidth={true}
            open={props.dialogiAuki} 
            onClose={peruuta}
          >
          <DialogTitle>Lisää uusi kirjoitus blogiin</DialogTitle>
          <DialogContent style={{paddingTop : 10}}>
            <Stack 
              spacing={1} 
              component="form"
              onSubmit={tallenna}
              ref={formRef}
            >
            <TextField
              name="otsikko"
              label="Kirjoituksen otsikko"
              fullWidth
              variant="outlined"
            />



            <Button 
              variant="contained"
              type="submit"
            >Tallenna</Button>

            <Button
              variant="outlined"
              onClick={peruuta}
            >Peruuta</Button>

            </Stack>
          </DialogContent>

        </Dialog>;
};

export default Muokkaus;
