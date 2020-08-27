export interface IShellUi {
    setShellTitle(title: string): Promise<any>;
    showShellUIBlocker(show: boolean): Promise<any>;
    sendUrlAsEmail(): Promise<any>;
    getShellGroupIDs(): Promise<any>;
    setDirtyFlag(isDirty: boolean): Promise<any>;
    getFlpUrl(includeHash: boolean): Promise<any>;
    addBookmarkDialog(): Promise<any>;
}
export interface AppInfo {
    title: string;
    icon?: string;
    subtitle?: string;
    intent: string;
}
export interface Bookmark {
    title: string;
    url: string;
    icon: string;
    info?: string;
    subtitle?: string;
    serviceUrl?: string;
    serviceRefreshInterval?: string;
    numberUnit?: string;
}
export declare function setShellTitle(title: string): Promise<any>;
export declare function showShellUIBlocker(show: boolean): Promise<any>;
export declare function sendUrlAsEmail(): Promise<any>;
export declare function getShellGroupIDs(): Promise<any>;
export declare function setDirtyFlag(isDirty: boolean): Promise<any>;
export declare function getFlpUrl(includeHash: boolean): Promise<any>;
/**
 * @WIP
 */
export declare function setHierarchy(hierarchyLevels: Array<AppInfo>): Promise<any>;
/**
 * @WIP
 */
export declare function setRelatedApps(relatedApps: Array<AppInfo>): Promise<any>;
/**
 * @WIP
 */
export declare function addBookmark(bookmark: Bookmark, groupId: string): Promise<any>;
export declare function addBookmarkDialog(): Promise<any>;
