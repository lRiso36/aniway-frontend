import client from './client';

export async function deleteAccount() {
  await client.delete('users/delete-account');
}
