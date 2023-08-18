import { Note } from "@/pages/api/todo";
import { axiosInstance } from "@/services/axiosInstance";

const localStorageKey = "todos";

/**
 * Salva as notas no localStorage
 * @param data
 * @returns Note[]
 */
const saveInDB = (data: any) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
  return data;
};

/**
 * Retorna todas as notas do localStorage
 * @returns Note[]
 */
const getFromDB = () => {
  const dataStorage = localStorage.getItem(localStorageKey);
  if (!dataStorage) return [];
  return JSON.parse(dataStorage);
};

/**
 * Retorna todas as notas
 * @returns Promise<Note[]>
 */
export const getNotes = async (): Promise<Note[]> => {
  try {
    const { data: json } = await axiosInstance.get("/api/todo");
    return saveInDB(json);
  } catch {
    return getFromDB();
  }
};

export const createNote = async (note: Note): Promise<void> => {
  try {
    await axiosInstance.post("/todo", note);
  } catch {
    saveInDB([...getFromDB(), note]);
    throw new Error("Offline");
  }
};

export const updateNote = async (note: Note): Promise<void> => {
  try {
    await axiosInstance.put("/todo", note);
  } catch {
    saveInDB([...getFromDB(), note]);
    throw new Error("Offline");
  }
};
