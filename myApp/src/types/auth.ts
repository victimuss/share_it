export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    user: {
        user_name: string;
        description: string
        tag: string
    }
    us_likes: number
    us_lessons: number
    us_learn_lessons: number
}

export interface RefreshResponse {
    access_token: string;
}

export interface RegisRequest {
    user_name: string,
    email: string,
    hashed_password: string
}

export interface RegisResponse {
    message: string;
}