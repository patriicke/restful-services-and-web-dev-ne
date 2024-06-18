export type ResponseType<T> = {
    success: boolean;
    message: string;
    payload: T;
    path: string;
    method: string;
    timestamp: number;
};
