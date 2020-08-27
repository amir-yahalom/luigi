export interface INavigation {
    navigateExternal(intent: Intent): Promise<any>;
    isNavigationSupported(intent: Intent): Promise<any>;
    isIntentSupported(aIntents: Array<string>): Promise<any>;
    navigateInternal(innerRoute: string): Promise<any>;
    getLinks(query: IntentQuery): Promise<IntentQueryResults>;
    historyBack(steps: number): Promise<any>;
    getInnerAppStateData(appStateKey: string): Promise<any>;
    setInnerAppStateData(data: string): Promise<any>;
    getDistinctSemanticObjects(): Promise<any>;
}
export interface Intent {
    hash?: string;
    semanticObject?: string;
    action?: string;
    params?: {
        [key: string]: string;
    };
    parameters?: {
        [key: string]: string;
    };
}
export interface IntentQuery {
    semanticObject: string;
    params?: {
        [key: string]: string;
    };
}
export interface IntentQueryResults {
    intent: string;
    text: string;
}
export declare function navigateExternal({ hash, semanticObject, action, params }: Intent): Promise<any>;
export declare function isNavigationSupported({ hash, semanticObject, action, parameters }: Intent): Promise<any>;
export declare function isIntentSupported(aIntents: Array<string>): Promise<any>;
export declare function navigateInternal(innerRoute?: string): Promise<any>;
export declare function getLinks({ semanticObject, params }: IntentQuery): Promise<IntentQueryResults>;
export declare function historyBack(steps: number): Promise<any>;
export declare function getInnerAppStateData(appStateKey: string): Promise<any>;
export declare function setInnerAppStateData(data: string): Promise<any>;
export declare function getDistinctSemanticObjects(): Promise<any>;
