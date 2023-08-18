import { Note } from "@/pages/api/todo";
import { axiosInstance } from "@/services/axiosInstance";

const localStorageKey = "todos";

const saveInDB = (data: any) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
  return data;
};

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
