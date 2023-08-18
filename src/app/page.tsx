"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { withProviderClient } from "@/components/ProviderClient";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Todo } from "@/pages/api/todo";
import OnlineViewer, { useOnline } from "@/components/OnlineViewer";
import axios from "axios";

const localStorageKey = "todos";

const getTodos = async (): Promise<Todo[]> => {
  try {
    console.log("loading online =========================");
    const { data: json } = await axios.get("/api/todo");
    localStorage.setItem(localStorageKey, JSON.stringify(json));
    return json;
  } catch {
    console.log("loading offline =========================");
    const dataStorage = localStorage.getItem(localStorageKey);
    if (!dataStorage) return [];
    return JSON.parse(dataStorage);
  }
};

const Home = () => {
  const { data = [] } = useQuery<Todo[]>(["todos"], getTodos);
  const [todo, setTodo] = useState<Todo>({} as Todo);

  const { online } = useOnline();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    ["todos"],
    () => {
      return fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({
          ...todo,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!online) throw new Error("Offline");
          queryClient.refetchQueries(["todos"]);
          return json;
        })
        .catch(() => {
          const dataStorage = localStorage.getItem(localStorageKey);
          if (!dataStorage) {
            localStorage.setItem(localStorageKey, JSON.stringify([todo]));
            throw new Error("Offline");
          }
          const data = JSON.parse(dataStorage);
          localStorage.setItem(
            localStorageKey,
            JSON.stringify([...data, todo])
          );
          queryClient.refetchQueries(["todos"]);
          throw new Error("Offline");
        });
    },
    {}
  );

  const { mutate: mutateTodo } = useMutation({
    mutationKey: ["todos"],
    mutationFn: (todoItem) => {
      return fetch("/api/todo", {
        method: "PUT",
        body: JSON.stringify(todoItem),
      })
        .then((response) => response.json())
        .then((json) => {
          if (!online) throw new Error("Offline");
          queryClient.refetchQueries(["todos"]);
          return json;
        })
        .catch(() => {
          const dataStorage = localStorage.getItem(localStorageKey);
          if (!dataStorage) {
            localStorage.setItem(localStorageKey, JSON.stringify([todo]));
            throw new Error("Offline");
          }

          const data = JSON.parse(dataStorage);
          localStorage.setItem(
            localStorageKey,
            JSON.stringify([...data, todo])
          );
          queryClient.refetchQueries(["todos"]);
          throw new Error("Offline");
        });
    },
  });

  return (
    <Box
      sx={{
        padding: "4rem",
      }}
    >
      <CssBaseline />
      <Container>
        <OnlineViewer />
        <Box display="flex" flexDirection="column" gap="1rem">
          <TextField
            onChange={({ target: { value } }) => {
              setTodo((current) => ({
                ...current,
                title: value,
              }));
            }}
            value={todo?.title}
            label="Título"
          />
          <TextField
            onChange={({ target: { value } }) => {
              setTodo((current) => ({
                ...current,
                description: value,
              }));
            }}
            value={todo?.description}
            label="Descrição"
          />
          <Button onClick={() => mutate()}>Criar novo</Button>
        </Box>

        {!data?.length && <Typography variant="body1">No todos</Typography>}
        <Box display="flex" flexDirection="column" gap="1rem">
          {data?.map((todo) => (
            <Paper sx={{ padding: "1rem" }} key={todo.id}>
              <Typography variant="body1">{todo.title}</Typography>
              <Typography variant="body2">{todo.description}</Typography>
              <Typography variant="body2">
                {todo.completed ? "Finalizado" : "Não finalizado"}
              </Typography>
              <Button
                onClick={() =>
                  mutateTodo({ ...todo, completed: !todo.completed } as any)
                }
                variant="contained"
                color="primary"
              >
                Completar
              </Button>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default withProviderClient(Home);
