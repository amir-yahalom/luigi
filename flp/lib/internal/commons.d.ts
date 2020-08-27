export interface ICommon {
    getUrlParam(param: string, url: string): string;
    parseMessageData(data: any): MessageData;
    parseService(service: string): ParsedService;
}
export interface Message {
    data: MessageData;
    origin?: string;
}
export interface MessageData {
    service: string;
    body?: {};
    request_id?: string;
    type?: string;
    status?: string;
}
export interface ParsedService {
    namespace: string;
    name: string;
    action: string;
}
export declare function constructHash(semanticObject: string, action: string, params: {
    [key: string]: string;
}, innerAppRoute: string): string;
export declare function getUrlParam(param: string, url: string): string;
export declare function parseMessageData(data: any): MessageData;
export declare function parseService(service?: string): ParsedService;
export declare function uuid(): string;
