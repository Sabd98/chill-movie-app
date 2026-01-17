const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const getUsers = async () => {
  return JSON.parse(localStorage.getItem('app_users') || '[]');
};

export const loginUser = async (credentials) => {
  const users = await getUsers();
  const hashedPassword = await hashPassword(credentials.password);
  
  const user = users.find(u => u.username === credentials.username && u.password === hashedPassword);
  
  if (user) {
    return { data: { username: user.username } };
  } else {
    throw new Error('Username atau password salah');
  }
};

export const registerUser = async (userData) => {
  const users = await getUsers();
  
  if (users.find(u => u.username === userData.username)) {
    throw new Error('Username sudah terdaftar');
  }

  const hashedPassword = await hashPassword(userData.password);
  const newUser = {
    username: userData.username,
    password: hashedPassword
  };

  const localUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
  localUsers.push(newUser);
  localStorage.setItem('app_users', JSON.stringify(localUsers));

  return newUser;
};
