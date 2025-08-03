import { Router } from 'express';
import { Pool } from 'mysql2/promise';
import { createAuthController } from '../Controllers/authController';

// Creates and returns the authentication router.
export const createAuthRouter = (dbPool: Pool) => {
    const router = Router();
    const authController = createAuthController(dbPool);

    // Define the registration route and link it to the controller method
    router.post('/register', authController.register);

    // Define the login route and link it to the controller method
    router.post('/login', authController.login);

    return router;
};
