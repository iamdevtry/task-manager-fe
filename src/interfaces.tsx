export interface Task {
    title: string;
    dir: string;
    description: string;
    date: string;
    completed: boolean;
    important: boolean;
    id: string;
}

export interface Activity {
    id: number;
    task_id: number;
    title: string;
    description: string;
    status: number;
    hours: number;
    created_at: string;
    updated_at: string | null;
    planned_start_date: string | null;
    planned_end_date: string | null;
    actual_start_date: string | null;
    actual_end_date: string | null;
    content: string | null;
}

export interface User {
    first_name: string;
    last_name: string;
    username: string;
    mobile: string;
    email: string;
}

export interface TaskDirectory {
    id: number;
    title: string;
    description: string;
    content: string;
    created_at: string;
    planned_start_date: string;
    planned_end_date: string;
    hours: number;
    status: number;
}

export interface TokenDecoded {
    payload: {
        user_id: string;
    };
    exp: number;
    iat: number;
}
