import { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

let dataBase: Todo[] = [];

const insert = (cTodo: any) => {
  let todo = cTodo;
  if (typeof cTodo === "string") {
    todo = JSON.parse(cTodo);
  }
  const newTodo = { ...todo, completed: false, id: v4() };
  dataBase = [newTodo, ...dataBase];
  return newTodo;
};

const update = (cTodo: Todo) => {
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
  res: NextApiResponse<Todo | Todo[]>
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
    console.log("🚀 ~ file: todo.ts:41 ~ dataBase:", dataBase);
  }
}
