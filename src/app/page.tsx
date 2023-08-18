"use client";
import React, { useState } from "react";
import { withProviderClient } from "@/components/ProviderClient";
import { Box, Container, CssBaseline, Fab, Typography } from "@mui/material";
import useNotes from "@/hooks/useNotes";
import NoteBox from "@/components/NoteBox";
import { Add } from "@mui/icons-material";
import NewNoteModal from "@/components/NewNoteModal";

const Home = () => {
  const {
    getAll: { data: notes },
    update: { mutate: updateNote },
  } = useNotes();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        padding: "1rem",
        height: "100vh",
        width: "100vw",
        background: "#f2f1f1",
      }}
    >
      <CssBaseline />
      <Container
        sx={{
          maxWidth: {
            md: "60%",
            sx: "80%",
            xs: "100%",
          },
        }}
      >
        <Box display="flex" flexDirection="column" gap="1rem">
          {notes?.length === 0 && (
            <Typography color="textSecondary">
              Sem notas encontradas, clique abaixo para criar uma nova nota
            </Typography>
          )}
          {notes?.map((note) => (
            <NoteBox
              onDelete={() => updateNote(note)}
              key={note.id}
              notes={note.description}
            />
          ))}
        </Box>
        <NewNoteModal handleClose={handleClose} open={open} />
        <Fab
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
          color="primary"
          aria-label="add"
          onClick={handleOpen}
        >
          <Add />
        </Fab>
      </Container>
    </Box>
  );
};

export default withProviderClient(Home);
