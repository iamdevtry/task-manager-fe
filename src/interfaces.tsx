export interface Task {
    title: string;
    dir: string;
    description: string;
    date: string;
    completed: boolean;
    important: boolean;
    id: string;
}

export interface User {
    first_name: string;
    last_name: string;
    username: string;
    mobile: string;
    email: string;
}

export interface TokenDecoded {
    payload: {
        user_id: string;
    };
    exp: number;
    iat: number;
}
