// Environment variables loader for Expo
// Reads from process.env (in dev) if using expo-env or dotenv support
export const ENV = {
  API_URL: process.env.API_URL || 'http://localhost:3000',
};

export default ENV;
