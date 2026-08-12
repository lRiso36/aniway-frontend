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

export async function forgotPassword(email: string) {
  await client.post('/auth/forgot-password', { email });
}

export async function resetPassword(token: string, newPassword: string) {
  await client.post('/auth/reset-password', { token, newPassword });
}
