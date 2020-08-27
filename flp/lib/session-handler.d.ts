export interface SessionHandler {
    onExtend: (msg: any) => void;
    manageUserActivity?: boolean;
}
export declare function useSessionHandler(handler: SessionHandler): () => void;
export declare function notifyUserActivity(): void;
