

const getUsers = async () => {
  return JSON.parse(localStorage.getItem('app_users') || '[]');
};

export const loginUser = async (credentials) => {
  const users = await getUsers();
  
  const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
  
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
    password: userData.password
  };

  const localUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
  localUsers.push(newUser);
  localStorage.setItem('app_users', JSON.stringify(localUsers));

  return newUser;
};
