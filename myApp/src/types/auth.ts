
export interface AuthResponse {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    user: {
        avatar: string;
        telegram: string;
        site: string;
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
    password: string
}

export interface RegisResponse {
    message: string;
}

export interface CryptoRequestChallenge {
    user_id?: number,
    public_key?: string
}

export interface CryptoResponseChallenge {
    nonce: string
}

export interface CryptoRequestVerify {
    user_id?: number,
    public_key?: string,
    nonce?: string,
    signature?: string
}

export interface CryptoResponseVerify {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    user: {
        avatar: string;
        telegram: string;
        site: string;
        user_name: string;
        description: string
        tag: string
    }
    us_likes: number
    us_lessons: number
    us_learn_lessons: number

}