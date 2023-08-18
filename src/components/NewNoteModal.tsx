import useNotes from "@/hooks/useNotes";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import React, { useState } from "react";

export interface NewNoteModalProps {
  handleClose?: () => void;
  open?: boolean;
}

/**
 * Componente para cadastro de novas notas
 * @param param0
 * @returns
 */
const NewNoteModal: React.FC<NewNoteModalProps> = ({
  open = false,
  handleClose = () => "",
}) => {
  const [note, setNote] = useState("");

  const handleSetNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const {
    create: { mutate: createNote },
  } = useNotes();

  const handleComplete = () => {
    createNote({
      description: note,
    });
    setNote("");
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova nota</DialogTitle>
        <DialogContent>
          <DialogContentText>Escreva sua nota</DialogContentText>
          <TextField
            autoFocus
            multiline
            onChange={handleSetNote}
            value={note}
            margin="dense"
            id="note"
            label="Nota"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleComplete}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewNoteModal;
