import client from './client';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await client.post('/auth/register', data);
  return response.data;
}

export async function login(data: LoginData) {
  const response = await client.post('/auth/login', data);
  const { accessToken, user } = response.data;
  return { accessToken, user };
}
