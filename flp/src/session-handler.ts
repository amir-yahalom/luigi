import { postToShell, on } from './base';
import { SelfWindow } from './internal/post-message-proxy';

export interface SessionHandler {
  onExtend: (msg: any) => void;
  manageUserActivity?: boolean;
}

export function useSessionHandler(handler: SessionHandler): () => void {
  on('sap.ushell.sessionHandler.extendSessionEvent', (msg: any) => {
    handler.onExtend(msg);
  });
  if (handler.manageUserActivity || typeof handler.manageUserActivity === 'undefined') {
    return useEventListeners();
  }
  return () => {}; // empty destroy function
}

export function notifyUserActivity(): void {
  const service = 'sap.ushell.sessionHandler.notifyUserActive';
  postToShell({ service });
}

interface NotifyContext {
  timer?: any;
}

const DefaultEvents = ['mousedown', 'mousemove', 'keyup', 'touchstart', 'touchmove'];

function useEventListeners(selfWin?: SelfWindow, events = DefaultEvents): () => void {
  if (!selfWin && typeof window !== 'undefined') {
    selfWin = window as SelfWindow;
  }
  const win = selfWin;
  let destroy = () => {};
  if (win) {
    const ctx: NotifyContext = {};
    const listener = () => _onUserActivity(ctx);
    for (let e of events) {
      win.addEventListener(e, listener);
    }
    destroy = () => {
      for (let e of events) {
        win.removeEventListener(e, listener);
      }
    };
  }
  return destroy;
}

function _onUserActivity(ctx: NotifyContext) {
  if (!ctx.timer) {
    ctx.timer = setTimeout(() => {
      notifyUserActivity();
      ctx.timer = undefined;
    }, 1000 * 60); // debounce 60 sec instead of notifying many events
  }
}
