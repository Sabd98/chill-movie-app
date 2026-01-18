const MY_LIST_KEY = 'chill_my_list';

export const getMyList = () => {
  const list = localStorage.getItem(MY_LIST_KEY);
  return list ? JSON.parse(list) : [];
};

export const addToMyList = (movie) => {
  const list = getMyList();
  if (!list.find(m => m.id === movie.id)) {
    const newList = [...list, movie];
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(newList));
    window.dispatchEvent(new Event('myListUpdated'));
    return true;
  }
  return false;
};

export const removeFromMyList = (movieId) => {
  const list = getMyList();
  const newList = list.filter(m => m.id !== movieId);
  localStorage.setItem(MY_LIST_KEY, JSON.stringify(newList));
  window.dispatchEvent(new Event('myListUpdated'));
};

export const isInMyList = (movieId) => {
  const list = getMyList();
  return !!list.find(m => m.id === movieId);
};