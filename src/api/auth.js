import api from './apiRoot';
import { encryptPassword } from '../utils/crypto';

const getUsers = async () => {
  try {
    const response = await api.get('/users.json');
    if (response.data) {
      return Object.entries(response.data).map(([key, value]) => ({
        id: key,
        ...value
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; 
  }
};

export const loginUser = async (credentials) => {
  const users = await getUsers();
  
  const encryptedPassword = encryptPassword(credentials.password);
  const user = users.find(u => u.username === credentials.username && u.password === encryptedPassword);
  
  if (user) {
    return { data: { username: user.username, password: user.password } };
  } else {
    throw new Error('Username atau password salah');
  }
};

export const registerUser = async (userData) => {
  const users = await getUsers();
  
  if (users.find(u => u.username === userData.username)) {
    throw new Error('Username sudah terdaftar');
  }

  const newUser = {
    username: userData.username,
    password: encryptPassword(userData.password)
  };

  await api.post('/users.json', newUser);

  return newUser;
};
