export interface AppLifeCycleLightHandler {
    open: (url: string) => void;
}
export declare function useAppLifeCycleEventsLight(handler: AppLifeCycleLightHandler): void;
