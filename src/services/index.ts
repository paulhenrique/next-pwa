"use client";
import { Note } from "@/pages/api/todo";
import { axiosInstance } from "@/services/axiosInstance";

const localStorageKey = "todos";

const localStorage =
  typeof window !== "undefined"
    ? window.localStorage
    : {
        getItem: () => null,
        setItem: () => null,
      };

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
    const { data: json } = await axiosInstance.get("/todo");
    return saveInDB(json);
  } catch (e) {
    console.error("Erro ao buscar notas", e);
    return [];
  } finally {
    if (!navigator?.onLine) {
      return getFromDB();
    }
  }
};

export const createNote = async (note: Partial<Note>): Promise<void> => {
  try {
    if (!navigator?.onLine) {
      saveInDB([note, ...getFromDB()]);
    }
    await axiosInstance.post("/todo", note);
  } catch (e) {
    console.error("Erro ao criar nota", e);
  }
};

export const updateNote = async (note: Note): Promise<void> => {
  try {
    await axiosInstance.put("/todo", note);
  } catch {
    saveInDB(getFromDB().filter((el: Note) => el.id !== note.id));
    throw new Error("Offline");
  }
};
