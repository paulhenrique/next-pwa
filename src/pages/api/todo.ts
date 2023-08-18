import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

export interface Note {
  id: string;
  description: string;
}

let dataBase: Note[] = [];

const insert = (cTodo: any) => {
  let todo = cTodo;
  if (typeof cTodo === "string") {
    todo = JSON.parse(cTodo);
  }
  const newTodo = { ...todo, id: v4() };
  dataBase = [newTodo, ...dataBase];
  return newTodo;
};

const update = (cTodo: Note) => {
  let todo = cTodo;
  if (typeof cTodo === "string") {
    todo = JSON.parse(cTodo);
  }
  const index = dataBase.findIndex((item) => item.id === todo.id);
  dataBase[index] = todo;
  return dataBase[index];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note | Note[]>
) {
  if (req.method === "POST") {
    // Process a POST request
    res.status(200).json(insert(req.body));
  }

  if (req.method === "PUT") {
    res.status(200).json(update(req.body));
  }

  if (req.method === "GET") {
    res.status(200).json(dataBase);
  }
}
