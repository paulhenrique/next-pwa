import { Note } from "@/pages/api/todo";
import { createNote, getNotes, updateNote } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Hook que retorna as funções de manipulação de notas
 * @returns
 */
const useNotes = () => {
  const queryClient = useQueryClient();

  /**
   * Query para buscar todas as notas
   */
  const getAll = useQuery<Note[]>(["notes"], getNotes);

  /**
   * Mutation para criar uma nota
   */
  const create = useMutation(["notes"], async (element: Omit<Note, "id">) => {
    try {
      await createNote(element);
    } finally {
      queryClient.refetchQueries(["notes"]);
    }
  });

  /**
   * Mutation para atualizar uma nota
   */
  const update = useMutation(["notes"], async (element: Note) => {
    try {
      await updateNote(element);
    } finally {
      queryClient.refetchQueries(["notes"]);
    }
  });

  return {
    getAll,
    create,
    update,
  };
};

export default useNotes;
