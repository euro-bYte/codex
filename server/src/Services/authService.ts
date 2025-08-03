import argon2 from 'argon2';

// Hashes a plain text password using Argon2.
export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
}

// Verifies a plain text password against a stored hash.
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
}
