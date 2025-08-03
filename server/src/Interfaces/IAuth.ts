// Interface for the basic user data.
export interface IUser {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
}

// Interface for the data required during a user registration request.
export interface IRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Interface for the data required during a user login request.
export interface ILoginRequest {
    email: string;
    password: string;
}

// Interface for the payload stored in a JWT.
export interface IJwtPayload {
    userId: number;
}
