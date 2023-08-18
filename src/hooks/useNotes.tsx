import { Note } from "@/pages/api/todo";
import { createNote, getNotes, updateNote } from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useNotes = () => {
  const queryClient = useQueryClient();

  const getAll = useQuery<Note[]>(["notes"], getNotes);

  const create = useMutation(["notes"], async (element: Note) => {
    try {
      await createNote(element);
    } finally {
      queryClient.refetchQueries(["notes"]);
    }
  });

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
