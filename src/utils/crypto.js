
const SECRET_KEY = import.meta.env.VITE_CRYPTO_SECRET_KEY;

export const encryptPassword = (password) => {
  if (!password) return "";
  
  let result = "";
  for (let i = 0; i < password.length; i++) {
    const charCode = password.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
    result += String.fromCharCode(charCode);
  }
  
  return btoa(result);
};

export const decryptPassword = (encryptedPassword) => {
  if (!encryptedPassword) return "";
  
  try {
    const decoded = atob(encryptedPassword);
    
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
      result += String.fromCharCode(charCode);
    }
    
    return result;
  } catch (e) {
    console.error("Failed to decrypt password", e);
    return "";
  }
};
