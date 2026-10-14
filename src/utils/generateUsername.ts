import { generateUsername } from 'unique-username-generator';
import { isUsernameAvailable } from '../api/auth';

export async function generateAvailableUsername(maxTries = 5) {
  for (let i = 0; i < maxTries; i++) {
    const candidate = generateUsername('_', 3, 20).replace(
      /[^a-zA-Z0-9_]/g,
      ''
    );
    if (candidate.length < 3 || candidate.length > 20) continue;
    try {
      if (await isUsernameAvailable(candidate)) return candidate;
    } catch {
      return candidate;
    }
  }
  return null;
}
