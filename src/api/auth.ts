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
  const { accessToken } = response.data;
  return { accessToken };
}

export async function googleLogin(credential: string, username?: string) {
  const response = await client.post('/auth/googleLogin', {
    credential,
    username,
  });
  const { accessToken, needsUsername } = response.data;
  return { accessToken, needsUsername };
}

export async function forgotPassword(email: string) {
  await client.post('/auth/forgot-password', { email });
}

export async function resetPassword(token: string, newPassword: string) {
  await client.post('/auth/reset-password', { token, newPassword });
}

export async function getMe() {
  const response = await client.get('users/me');
  return response.data;
}

export async function isUsernameAvailable(username: string) {
  const response = await client.get('/auth/username-available', {
    params: { username },
  });
  return response;
}
