import { getSafeKey } from '../utils/crypto';
import api from './apiRoot';
import { getCurrentUsername } from './user';

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
     throw error; 
  }
};

export const getEpisodes = async () => {
  try {
    const response = await api.get('/episodes.json');
    return response.data || [];
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return [];
  }
};

export const getRecommendations = async () => {
  try {
    const response = await api.get('/recommendations.json');
    return response.data || [];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};
