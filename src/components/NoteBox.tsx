"use client";
import { Paper, Typography, Box, Button } from "@mui/material";
import React from "react";

export interface NoteBoxProps {
  notes: string;
  onDelete?: () => void;
}

/**
 * Componente de Notas
 * @param param0
 * @returns
 */
export const NoteBox: React.FC<NoteBoxProps> = ({
  notes = null,
  onDelete = () => null,
}) => {
  return (
    <Paper
      sx={{
        padding: "1rem",
      }}
    >
      <Typography component="div" variant="body1">
        {notes}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          justifyContent: "flex-end",
        }}
      >
        <Button onClick={onDelete}>Excluir</Button>
      </Box>
    </Paper>
  );
};

export default NoteBox;
