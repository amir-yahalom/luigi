import facade from '../../src';
import {mocks} from './post-meesage-proxy.spec';
import appRuntime from "../../src/internal/app-runtime";

test('send and listen to messages', async () => {
    expect.assertions(3);
    const outMsg = [];
    let extended = 0;
    const callProxyListener = (data: any) => (appRuntime as any).proxy.listener({data, origin: "*"});
    const { targetWindow, selfWindow } = mocks((msg: any, origin: string) => {
        outMsg.push(msg);
        // echo back
        if (msg) {
            msg = facade.parseMessageData(msg);
            msg.type = 'response';
            msg.status = 'success';
            setTimeout(() => callProxyListener(msg));
        }
    });

    facade.destroy();

    facade.init({allowedOrigins:{"*": true}, targetWindow, selfWindow})
        .use({
            sessionHandler: {
                onExtend() {
                    extended++;
                },
                manageUserActivity: false
            }
        });

    callProxyListener(`{"type":"request","request_id":"1589384603208","service":"sap.ushell.sessionHandler.extendSessionEvent","body":{}}`);
    expect(extended).toBe(1);

    try {
        await facade.navigateInternal("/my/inner/route");
        await facade.setShellTitle("Custom Title..");
    }  catch (e) {
        console.error(e);
    }

    expect(outMsg.length).toBe(2);

    callProxyListener(`{"type":"request","request_id":"1589384603208","service":"sap.ushell.sessionHandler.extendSessionEvent","body":{}}`);
    expect(extended).toBe(2);

    facade.destroy();
});