import { parseMessageData, parseService, getUrlParam, uuid } from '../../src/internal/commons';

test('parseMessageData', () => {
    const data = `{"type":"request","request_id":"1589384603208","service":"sap.ushell.sessionHandler.extendSessionEvent","body":{}}`;

    const parsed = parseMessageData(data);
    expect(parsed.request_id).toBe("1589384603208");

    const empty = parseMessageData("non-json string");
    expect(empty.service).toBe("");
});

test('parseService', () => {
    const { namespace, name, action } = parseService("sap.ushell.sessionHandler.extendSessionEvent");
    expect(namespace).toBe("sap.ushell");
    expect(name).toBe("sessionHandler");
    expect(action).toBe("extendSessionEvent");
});

test('getUrlParam', () => {
    let param = getUrlParam("sap-param", "https://host.com/path?q=a&sap-param=val");
    expect(param).toBe("val");

    param = getUrlParam("sap-param", "https://host.com/path?sap-param=val&q=a&");
    expect(param).toBe("val");

    param = getUrlParam("sap-param", "https://host.com/path?b=c&sap-param=val&q=a&");
    expect(param).toBe("val");
});

test('uuid', () => {
    const u = uuid();
    expect(u.length).toBe(36);
});

