
import { moviesData } from '../data/movies';

export const getMovies = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(moviesData);
    }, 500);
  });
};

export const updateUser = async (oldUsername, newData) => {
  const users = JSON.parse(localStorage.getItem('app_users') || '[]');
  const userIndex = users.findIndex(u => u.username === oldUsername);
  
  if (userIndex === -1) {
    throw new Error('User tidak ditemukan');
  }

  if (newData.username && newData.username !== oldUsername) {
    if (users.some(u => u.username === newData.username)) {
      throw new Error('Username sudah digunakan');
    }
    users[userIndex].username = newData.username;
  }

  if (newData.password) {
    users[userIndex].password = newData.password;
  }

  localStorage.setItem('app_users', JSON.stringify(users));
  
  return { data: { username: users[userIndex].username, password: users[userIndex].password } };
};
