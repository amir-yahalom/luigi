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

export function constructHash(
  semanticObject: string,
  action: string,
  params: { [key: string]: string },
  innerAppRoute: string,
): string {
  const paramsFlat = [];
  for (let k in params) {
    paramsFlat.push(`${k}=${params[k]}`);
  }
  if (innerAppRoute.indexOf('/') !== 0) {
    innerAppRoute += '/';
  }
  return `#${semanticObject}-${action}?${paramsFlat.join('&')}&${innerAppRoute}`;
}

export function getUrlParam(param: string, url: string): string {
  const parsed = new RegExp(`[?&]${param}=([^&#]*)`, 'i').exec(url);
  return parsed ? parsed[1] : '';
}

export function parseMessageData(data: any): MessageData {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // not a message from cflp shell
      return { service: '', body: {} };
    }
  }
  return data;
}

export function parseService(service = ''): ParsedService {
  let parts: string[] = [];
  if (typeof service === 'string') {
    parts = service.split('.');
  }
  const [action, name, ...namespace] = parts.reverse();
  return { namespace: namespace.reverse().join('.'), name, action };
}

export function uuid(): string {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
