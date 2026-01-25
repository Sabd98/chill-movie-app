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
    // Check keberadaan via API (opsional jika store sudah handle, tapi bagus untuk safety)
    // Atau kita percayakan pada store untuk cek duplikasi di state lokal
    // Untuk efisiensi, kita bisa skip checkIsMyList request jika kita yakin state sinkron,
    // tapi untuk safety backend, PUT request biasanya idempotent.
    // Firebase RTDB PUT akan overwrite, jadi aman.
    
    await api.put(`/chill_my_list/${getSafeKey(username)}/${movie.id}.json`, movie);
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
  } catch (error) {
     console.error("Error removing from list:", error);
     throw error; // Lempar error agar store tahu kalau gagal
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
