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
