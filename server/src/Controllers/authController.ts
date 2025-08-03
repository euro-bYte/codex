import { Request, Response } from 'express';
import { Pool, RowDataPacket } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import { hashPassword, verifyPassword } from '../Services/authService';
import { IRegisterRequest, ILoginRequest, IJwtPayload } from '../Interfaces/IAuth';


// Creates an authentication controller with handlers for registration and login.
export const createAuthController = (dbPool: Pool) => ({

    // Controller function to handle user registration.
    register: async (req: Request, res: Response): Promise<void> => {
        const { firstName, lastName, email, password }: IRegisterRequest = req.body;

        // Basic input validation
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }

        try {
            // Check if the user already exists
            const [rows] = await dbPool.execute<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length > 0) {
                res.status(409).json({ message: 'User with this email already exists.' });
                return;
            }

            // Hash the password for secure storage using the auth service
            const passwordHash = await hashPassword(password);

            // Insert the new user into the database
            await dbPool.execute('INSERT INTO users (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)', [
                firstName,
                lastName,
                email,
                passwordHash,
            ]);

            res.status(201).json({ message: 'User registered successfully.' });

        } catch (error) {
            console.error('Error during user registration:', error);
            res.status(500).json({ message: 'Server error during registration.' });
        }
    },


    // Controller function to handle user login.
    login: async (req: Request, res: Response): Promise<void> => {
        const { email, password }: ILoginRequest = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        try {
            // Find the user by email
            const [rows] = await dbPool.execute<RowDataPacket[]>('SELECT user_id, password_hash FROM users WHERE email = ?', [email]);

            if (rows.length === 0) {
                res.status(401).json({ message: 'Invalid credentials.' });
                return;
            }

            const user = rows[0];

            // Verify the provided password against the stored hash
            const isMatch = await verifyPassword(user.password_hash, password);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid credentials.' });
                return;
            }

            // Generate a JWT
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                throw new Error('JWT_SECRET not defined');
            }

            const payload: IJwtPayload = { userId: user.user_id };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful.', token });

        } catch (error) {
            console.error('Error during user login:', error);
            res.status(500).json({ message: 'Server error during login.' });
        }
    }

});