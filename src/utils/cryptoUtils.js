import CryptoJS from "crypto-js";

// Function to generate a dynamic secret key
const generateSecretKey = () => {
  const browserInfo = navigator.userAgent; // Browser information
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // User's timezone
  const randomSalt = Math.random().toString(36).substring(2, 15); // Random salt for uniqueness
  const screenSize = `${window.screen.width}-${window.screen.height}`; // Unique screen size (width x height)

  // Combine the details to create a base string
  const baseString = `${browserInfo}-${timezone}-${randomSalt}-${screenSize}`;

  // Hash the base string using SHA-256 to create a consistent and secure key
  return CryptoJS.SHA256(baseString).toString(CryptoJS.enc.Hex);
};

// Function to derive a master key based on multiple environmental conditions
const deriveMasterKey = () => {
  const browserInfo = navigator.userAgent;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const screenSize = `${window.screen.width}-${window.screen.height}`;

  // Get a random value for session uniqueness
  const sessionSalt = Math.random().toString(36).substring(2, 15);

  // Combine the environmental factors to create a base string
  const baseString = `${browserInfo}-${timezone}-${screenSize}-${sessionSalt}`;

  // Use SHA-256 to hash the combined string and create a master key
  return CryptoJS.SHA256(baseString).toString(CryptoJS.enc.Base64); // Base64 encoding for a string representation
};

// Function to encrypt the secret key before storing it in localStorage
const encryptSecretKey = (secretKey) => {
  const masterKey = deriveMasterKey();
  return CryptoJS.AES.encrypt(secretKey, masterKey).toString();
};

// Function to decrypt the secret key from localStorage
const decryptSecretKey = (encryptedKey) => {
  const masterKey = deriveMasterKey();
  const bytes = CryptoJS.AES.decrypt(encryptedKey, masterKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Retrieve the encrypted SECRET_KEY from localStorage or generate a new one
let encryptedSecretKey = localStorage.getItem("SECRET_KEY");
let SECRET_KEY;

if (!encryptedSecretKey) {
  // Generate a new secret key if it's not found in localStorage
  SECRET_KEY = generateSecretKey();

  // Encrypt and store the secret key in localStorage
  encryptedSecretKey = encryptSecretKey(SECRET_KEY);
  localStorage.setItem("SECRET_KEY", encryptedSecretKey);
} else {
  // Decrypt the secret key from localStorage
  SECRET_KEY = decryptSecretKey(encryptedSecretKey);
}

// Function to encrypt data using the SECRET_KEY
export const encryptData = (data) => {
  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

// Function to decrypt data using the SECRET_KEY
export const decryptData = (cipherText) => {
  if (!cipherText) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};