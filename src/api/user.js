import api from './apiRoot';

export const getCurrentUsername = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    const user = JSON.parse(userStr);
    return user.username;
  } catch {
    return null;
  }
};

export const getSafeKey = (key) => {
    return btoa(key); 
}

export const updateUser = async (oldUsername, newData) => {
  const response = await api.get('/users.json');
  const usersMap = response.data || {};
  const users = Object.entries(usersMap).map(([key, value]) => ({ id: key, ...value }));

  const targetUser = users.find(u => u.username === oldUsername);

  if (!targetUser) {
    throw new Error('User tidak ditemukan');
  }

  if (newData.username && newData.username !== oldUsername) {
    if (users.some(u => u.username === newData.username)) {
      throw new Error('Username sudah digunakan');
    }
  }

  const updates = {};
  if (newData.username) updates.username = newData.username;
  if (newData.password) updates.password = newData.password;

  await api.patch(`/users/${targetUser.id}.json`, updates);

  return { 
    data: { 
      username: newData.username || targetUser.username, 
      password: newData.password || targetUser.password 
    } 
  };
};
