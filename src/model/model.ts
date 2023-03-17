export interface ActivityCreate {
    task_id: number;
    title: string;
    description: string;
    status: number;
    hours: number;
    planned_start_date: string | null;
    planned_end_date: string | null;
    content: string | null;
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
    tag: Tag;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
}
