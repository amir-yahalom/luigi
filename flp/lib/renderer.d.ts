export interface IRenderer {
    setHeaderTitle(title: string): Promise<any>;
    setHeaderVisibility(show: boolean): Promise<any>;
    addHeaderItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any>;
    addHeaderEndItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any>;
}
/**
 * @WIP
 */
export declare function setHeaderTitle(title: string): Promise<any>;
/**
 * @WIP
 */
export declare function setHeaderVisibility(show: boolean): Promise<any>;
/**
 * @WIP
 */
export declare function addHeaderItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any>;
/**
 * @WIP
 */
export declare function addHeaderEndItem(headerId: string, desc: string, sapIcon: string, visible: boolean): Promise<any>;
