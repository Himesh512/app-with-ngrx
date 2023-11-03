export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calaries: number;
    date?: Date;
    state?: "completed" | 'cancelled ' | null;
};