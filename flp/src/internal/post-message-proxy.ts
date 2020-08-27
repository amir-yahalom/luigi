import { EventEmitter } from 'events';
import { parseMessageData, parseService, uuid, MessageData, Message } from './commons';

const logger = console;
const DEFAULT_TIMEOUT = 7 * 1000; // 7 sec

export interface TargetWindow {
  postMessage: (msg: any, origin: string) => void;
}

export interface SelfWindow {
  addEventListener: (e: string, h: (val?: any) => void) => void;
  removeEventListener: (e: string, h: (val?: any) => void) => void;
}

export interface PostMessageRequest extends MessageData {
  // will not be present in the actual request payload
  origin?: string;
  id?: string;
  timeout?: number;
}

interface Deferred {
  promise: Promise<any>;
  reject: (reason?: any) => void;
  resolve: (value?: any) => void;
}

export interface PostMessageProxyConfig {
  allowedOrigins?: { [key: string]: boolean };
  targetWindow?: TargetWindow;
  selfWindow?: SelfWindow;
}

export class PostMessageProxy extends EventEmitter {
  targetWindow: TargetWindow;
  selfWindow: SelfWindow;

  listener: (msg: Message) => void;

  /**
   * Holds whitelisted/blacklisted origins for Post Message communication
   * @type { [string]: boolean }
   */
  origins: { [key: string]: boolean };

  /**
   * Holds pending promises to be resolved once the shell responds
   * @type { [string]: Promise }
   */
  pending: { [key: string]: Deferred };

  constructor(cfg: PostMessageProxyConfig) {
    super();
    this.origins = { ...(cfg.allowedOrigins || {}) } as any;
    this.pending = {};
    // enables to inject targetWindow
    // fallback to window.parent
    if (!cfg.targetWindow && typeof window !== 'undefined') {
      cfg.targetWindow = window.parent as TargetWindow;
    }
    this.targetWindow = cfg.targetWindow as TargetWindow;
    // same approach for the app window
    if (!cfg.selfWindow && typeof window !== 'undefined') {
      cfg.selfWindow = window;
    }
    this.selfWindow = cfg.selfWindow as SelfWindow;

    this.listener = null as any;
  }

  init() {
    if (!this.listener) {
      this.listener = (msg: Message) => {
        this.handleMessage(msg);
      };
      this.addEventListener('message', this.listener);
    }
  }

  destroy() {
    if (this.listener) {
      this.listener = null as any;
      this.cleanPending('');
      this.removeEventListener('message', this.listener);
    }
  }

  handleMessage(msg: Message): void {
    if (!msg) {
      return;
    }
    logger.log('handle message:', msg.data);
    const data = parseMessageData(msg.data);
    if (msg.origin && !this.origins[msg.origin] && !this.origins['*']) {
      logger.warn(`origin not allowed:\n${msg.origin}`);
      return;
    }
    switch (data.type) {
      case 'request': {
        this.handleRequestMessage(data);
        break;
      }
      case 'response': {
        this.handleResponseMessage(data);
        break;
      }
      default: {
        logger.warn(`unknown message type ${data.type}`);
      }
    }
  }

  handleResponseMessage(data: MessageData): void {
    if (data.request_id) {
      const deferred = this.pending[data.request_id];
      if (!deferred) {
        // was never requested or the consumer does wait for response
        logger.log(`incoming message with unknown id:\n${data.request_id}`);
        return;
      }
      delete this.pending[data.request_id];
      if (data.status === 'success') {
        const body: any = data.body;
        deferred.resolve(body && body.result);
      } else {
        deferred.reject();
      }
    }
  }

  handleRequestMessage(data: MessageData): void {
    const service = parseService(data.service);
    if (service.name) {
      // service call
      this.emit(data.service, data);
    }
  }

  postErrorResponse(msg: any, e: Error): Promise<any> {
    return this.postToShell({ ...msg, type: 'response', status: 'error', body: { message: e.message } });
  }

  async postToShell(msg: PostMessageRequest): Promise<any> {
    let {
      id,
      service,
      origin = this.defaultOrigin(),
      type = 'request',
      body = {},
      status = 'success',
      timeout = DEFAULT_TIMEOUT,
      request_id,
    } = msg || {};
    const req: MessageData = {
      request_id: id || request_id || uuid(),
      type,
      service,
      body,
    };
    id = req.request_id as string;
    switch (type) {
      case 'response': {
        req.status = status;
        return postMessage(this.targetWindow, req, origin);
      }
      case 'request': {
        const pending = this.pending;
        if (pending[id]) {
          // duplicated request id -> not supported
          logger.log('request id already exist, still pending...');
          return pending[id].promise;
        }
        pending[id] = defer();
        setTimeout(() => this.cleanPending(id), timeout);
        postMessage(this.targetWindow, req, origin);
        return pending[id].promise;
      }
      default: {
        throw new Error(`message type "${type}" is unknown`);
      }
    }
  }

  private cleanPending(id: string | undefined): void {
    if (!id) {
      this.pending = {};
    } else if (id in this.pending) {
      logger.log(`clean pending request: ${id}`);
      delete this.pending[id];
    }
  }

  private defaultOrigin(): string {
    return Object.keys(this.origins)[0] || '*';
  }

  removeEventListener(e: string, h: (val?: any) => void): void {
    return this.selfWindow && this.selfWindow.removeEventListener(e, h);
  }

  addEventListener(e: string, h: (val?: any) => void): void {
    return this.selfWindow && this.selfWindow.addEventListener(e, h);
  }
}

function postMessage(targetWindow: TargetWindow = { postMessage: (r, o) => {} }, req = {}, origin = '*'): void {
  if (typeof req !== 'string') {
    req = JSON.stringify(req);
  }
  logger.log('sending message:', req);
  targetWindow.postMessage(req, origin);
}

function defer(): Deferred {
  let resolve: (value?: any) => void = () => {};
  let reject: (value?: any) => void = () => {};

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    reject,
    resolve,
  };
}
