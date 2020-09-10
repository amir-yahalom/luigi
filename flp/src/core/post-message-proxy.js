import { EventEmitter } from 'events';
import { parseMessageData, parseService, uuid, MessageData, Message } from './commons';

const logger = console;
const DEFAULT_TIMEOUT = 7 * 1000; // 7 sec

export class PostMessageProxy extends EventEmitter {
  // targetWindow = null;
  // selfWindow = null;
  //
  // listener = null;

  /**
   * Holds whitelisted/blacklisted origins for Post Message communication
   * @type { [string]: boolean }
   */
  // origins = {};

  /**
   * Holds pending promises to be resolved once the shell responds
   * @type { [string]: Promise }
   */
  // pending = {};

  constructor(cfg) {
    super();
    this.origins = { ...(cfg.allowedOrigins || {}) };
    this.pending = {};
    // enables to inject targetWindow
    // fallback to window.parent
    if (!cfg.targetWindow && typeof window !== 'undefined') {
      cfg.targetWindow = window.parent;
    }
    this.targetWindow = cfg.targetWindow;
    // same approach for the app window
    if (!cfg.selfWindow && typeof window !== 'undefined') {
      cfg.selfWindow = window;
    }
    this.selfWindow = cfg.selfWindow;
  }

  init() {
    if (!this.listener) {
      this.listener = (msg) => {
        this.handleMessage(msg);
      };
      this.addEventListener('message', this.listener);
    }
  }

  destroy() {
    if (this.listener) {
      this.listener = null;
      this._cleanPending('');
      this.removeEventListener('message', this.listener);
    }
  }

  handleMessage(msg) {
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

  handleResponseMessage(data) {
    if (data.request_id) {
      const deferred = this.pending[data.request_id];
      if (!deferred) {
        // was never requested or the consumer does wait for response
        logger.log(`incoming message with unknown id:\n${data.request_id}`);
        return;
      }
      delete this.pending[data.request_id];
      if (data.status === 'success') {
        const body = data.body;
        deferred.resolve(body && body.result);
      } else {
        deferred.reject();
      }
    }
  }

  handleRequestMessage(data) {
    const service = parseService(data.service);
    if (service.name) {
      // service call
      this.emit(data.service, data);
    }
  }

  postErrorResponse(msg, e) {
    return this.postToShell({ ...msg, type: 'response', status: 'error', body: { message: e.message } });
  }

  async postToShell(msg) {
    let {
      id,
      service,
      origin = this._defaultOrigin(),
      type = 'request',
      body = {},
      status = 'success',
      timeout = DEFAULT_TIMEOUT,
      request_id,
    } = msg || {};
    const req = {
      request_id: id || request_id || uuid(),
      type,
      service,
      body,
    };
    id = req.request_id;
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
        setTimeout(() => this._cleanPending(id), timeout);
        postMessage(this.targetWindow, req, origin);
        return pending[id].promise;
      }
      default: {
        throw new Error(`message type "${type}" is unknown`);
      }
    }
  }

  _cleanPending(id) {
    if (!id) {
      this.pending = {};
    } else if (id in this.pending) {
      logger.log(`clean pending request: ${id}`);
      delete this.pending[id];
    }
  }

  _defaultOrigin() {
    return Object.keys(this.origins)[0] || '*';
  }

  removeEventListener(e, h) {
    return this.selfWindow && this.selfWindow.removeEventListener(e, h);
  }

  addEventListener(e, h) {
    return this.selfWindow && this.selfWindow.addEventListener(e, h);
  }
}

function postMessage(targetWindow = { postMessage: (r, o) => {} }, req = {}, origin = '*') {
  if (typeof req !== 'string') {
    req = JSON.stringify(req);
  }
  logger.log('sending message:', req);
  targetWindow.postMessage(req, origin);
}

function defer() {
  let resolve, reject;

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
