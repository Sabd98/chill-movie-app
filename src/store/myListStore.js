import { create } from "zustand";
import { getMyList, addToMyList, removeFromMyList } from "../api/movies";

const useMyListStore = create((set, get) => ({
  myList: [],
  loading: false,
  error: null,

  fetchMyList: async () => {
    set({ loading: true, error: null });
    try {
      const list = await getMyList();
      set({ myList: list, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  addMovie: async (movie) => {
    const currentList = get().myList;
    if (currentList.some((m) => m.id === movie.id)) return;

    set({ myList: [...currentList, movie] });

    try {
      const success = await addToMyList(movie);
      if (!success) {
        set({ myList: currentList });
      }
    } catch (error) {
      console.error("Failed to add movie to list", error);
      set({ myList: currentList });
    }
  },
  removeMovie: async (movieId) => {
    const currentList = get().myList;

    set({ myList: currentList.filter((m) => m.id !== movieId) });

    try {
      await removeFromMyList(movieId);
    } catch (error) {
      console.error("Failed to remove movie from list", error);
      set({ myList: currentList });
    }
  },

}));

export default useMyListStore;
