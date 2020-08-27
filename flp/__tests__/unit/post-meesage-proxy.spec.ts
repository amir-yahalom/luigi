import {PostMessageProxy, PostMessageRequest, SelfWindow, TargetWindow} from '../../src/internal/post-message-proxy';
import {MessageData,Message} from "../../src/internal/commons";

test('init', () => {
    const { targetWindow, selfWindow } = mocks();
    const proxy = new PostMessageProxy({allowedOrigins:{"*": true}, targetWindow, selfWindow});

    const spy  = jest.spyOn(proxy.selfWindow, "addEventListener");

    proxy.init();

    expect(spy).toBeCalled();
});

test('destroy', () => {
    const { targetWindow, selfWindow } = mocks();
    const proxy = new PostMessageProxy({allowedOrigins:{"*": true}, targetWindow, selfWindow});

    const spy  = jest.spyOn(proxy.selfWindow, "removeEventListener");
    proxy.listener = (msg: any) => {};
    proxy.destroy();

    expect(spy).toBeCalled();
});

test('postToShell', () => {
    const { targetWindow, selfWindow } = mocks();
    const proxy = new PostMessageProxy({allowedOrigins:{"*": true}, targetWindow, selfWindow});

    const spy  = jest.spyOn(proxy.targetWindow, "postMessage");

    proxy.init();
    proxy.postToShell({service: "sap.ushell.services.CrossApplicationNavigation.setInnerAppRoute", body: {
            appSpecificRoute: "/my/inner/route",
        }});

    expect(spy).toBeCalled();
});

test('handleMessage response', async () => {
    const { targetWindow, selfWindow } = mocks();
    const proxy = new PostMessageProxy({allowedOrigins:{"*": true}, targetWindow, selfWindow});

    proxy.init();
    let rej: (reason?: any) => void = () => {}, res: (value?: any) => void = () => {};
    const p = new Promise((r, e) => {
        res = r;
        rej = e;
    });
    proxy.pending["2a94066f-4e0d-4a01-835c-537a425c2848"] = {
        promise: p,
        resolve: res,
        reject: rej
    };
    const msg: Message = {
        data: {"type":"response","service":"sap.ushell.services.ShellUIService.setTitle","request_id":"2a94066f-4e0d-4a01-835c-537a425c2848","status":"success","body":{}},
        origin: "*"
    };
    p.then((res) => {
        expect(res).toBeUndefined(); // no body in the response
    }, () => {
        expect(true).toBeFalsy(); // fail because we shouldn't get here
    });
    proxy.handleMessage(msg);
});

test('handleMessage request', async () => {
    const { targetWindow, selfWindow } = mocks();
    const proxy = new PostMessageProxy({allowedOrigins:{"*": true}, targetWindow, selfWindow});
    let count = 0;
    proxy.init();

    proxy.on("sap.ushell.sessionHandler.extendSessionEvent", (msg) => {
        expect(msg.request_id).toBe("1589384603208");
        count++;
    });

    const msg: Message = {
        data: {"type":"request","request_id":"1589384603208","service":"sap.ushell.sessionHandler.extendSessionEvent","body":{}},
        origin: "*"
    };
    proxy.handleMessage(msg);

    expect(count).toBe(1);
});

export function mocks(fnOnPostMessage?: (msg: any, origin: string) => void) {
    const targetWindow: TargetWindow = {
        postMessage: (msg: any, origin: string) => {
            fnOnPostMessage && fnOnPostMessage(msg, origin)
        }
    };

    const selfWindow: SelfWindow = {
        addEventListener: (e: string, h: (val?: any) => void) => {
            // do nothing
        },
        removeEventListener: (e: string, h: (val?: any) => void) => {
            // do nothing
        }
    };

    return { targetWindow, selfWindow };
}