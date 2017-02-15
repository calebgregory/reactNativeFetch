function parseHeadersToObj(str) {
  const headers = str
    .split('\r\n')
    .map((h) => h.split(': '))
    .reduce((acc, h) => {
      var field = h[0].toLowerCase(),
          value = h[1].toLowerCase();
      acc[field] = value;
      return acc;
    }, {});
  return headers;
}

function generateHttpRpcImpl(servicePath, config) {
  return function httpRpcImpl(method, requestData, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', config.url);
    xhr.responseType = 'arraybuffer'; // we'll be getting back an ArrayBuffer

    setAuthorizationHeader(xhr, config.auth)

    xhr.setRequestHeader('X-Rpc-Service', servicePath);
    xhr.setRequestHeader('X-Rpc-Method', method);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.HEADERS_RECEIVED && config.headersCallback) {
        const headers = parseHeadersToObj(xhr.getAllResponseHeaders())
        config.headersCallback(null, headers)
      }

      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // we must convert the response to an ArrayBufferView before
          // protobufs can use it
          const msg = new Uint8Array(xhr.response);
          callback(null, msg);
        } else {
          callback(`error making request to ${method}`, null);
        }
      }
    }

    // msg must be a string to go over the wire; a simple string conversion
    // will not do, as bytes in the requestData will be truncated (_believe me_)
    var msg = String.fromCharCode.apply(null, new Uint8Array(requestData));
    xhr.send(msg);
  }
}

function setAuthorizationHeader(xhr, authConfig) {
  let header;

  switch(authConfig.type) {
    case 'basic':
      const base64EncodedUsernamePassword = btoa(`${authConfig.apiKey}:${authConfig.apiSecret}`);
      header = `Basic ${base64EncodedUsernamePassword}`;
    case 'token':
      header = `Bearer ${authConfig.token}`;
    default:
      return; // noop
  }

  xhr.setRequestHeader('Authorization', header);
}

module.exports = generateHttpRpcImpl;
