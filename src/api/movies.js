import api from './apiRoot';
import { getCurrentUsername, getSafeKey } from './user';

export const getMovies = async () => {
  const response = await api.get('/movies.json');
  return response.data;
};


export const getMyList = async () => {
  const username = getCurrentUsername();
  if (!username) return [];

  try {
    const response = await api.get(`/chill_my_list/${getSafeKey(username)}.json`);
    if (response.data) {
      return Object.values(response.data);
    }
    return [];
  } catch (error) {
    console.error("Error fetching my list:", error);
    return [];
  }
};

export const addToMyList = async (movie) => {
  const username = getCurrentUsername();
  if (!username) return false;

  try {
    const exists = await checkIsMyList(movie.id);
    if (exists) return false;

    await api.put(`/chill_my_list/${getSafeKey(username)}/${movie.id}.json`, movie);
    window.dispatchEvent(new Event('myListUpdated'));
    return true;
  } catch (error) {
    console.error("Error adding to list:", error);
    return false;
  }
};

export const removeFromMyList = async (movieId) => {
  const username = getCurrentUsername();
  if (!username) return;

  try {
    await api.delete(`/chill_my_list/${getSafeKey(username)}/${movieId}.json`);
    window.dispatchEvent(new Event('myListUpdated'));
  } catch (error) {
     console.error("Error removing from list:", error);
  }
};

export const checkIsMyList = async (movieId) => {
  const username = getCurrentUsername();
  if (!username) return false;

  try {
    const response = await api.get(`/chill_my_list/${getSafeKey(username)}/${movieId}.json`);
    return !!response.data;
  } catch {
    return false;
  }
};
