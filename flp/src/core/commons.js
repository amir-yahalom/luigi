export function constructHash(semanticObject, action, params, innerAppRoute) {
  const paramsFlat = [];
  for (let k in params) {
    paramsFlat.push(`${k}=${params[k]}`);
  }
  if (innerAppRoute.indexOf('/') !== 0) {
    innerAppRoute += '/';
  }
  return `#${semanticObject}-${action}?${paramsFlat.join('&')}&${innerAppRoute}`;
}

export function getUrlParam(param, url) {
  const parsed = new RegExp(`[?&]${param}=([^&#]*)`, 'i').exec(url);
  return parsed ? parsed[1] : '';
}

export function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      // not a json, message is not from cflp shell
      return { service: '', body: {} };
    }
  }
  return data;
}

export function parseService(service = '') {
  let parts = [];
  if (typeof service === 'string') {
    parts = service.split('.');
  }
  const [action, name, ...namespace] = parts.reverse();
  return { namespace: namespace.reverse().join('.'), name, action };
}

export function uuid() {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
