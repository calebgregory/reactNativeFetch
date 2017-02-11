import proto from '../proto';

const API_URL = 'http://localhost:3030/api';

function rpcImpl(method, requestData, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', API_URL);
  xhr.responseType = 'arraybuffer'; // we'll be getting back an ArrayBuffer

  xhr.setRequestHeader('X-Rpc-Service', '/data.Messager/');
  xhr.setRequestHeader('X-Rpc-Method', method);
  xhr.setRequestHeader('Content-Type', 'application/octet-stream');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // we must convert the response to an ArrayBufferView before
        // protobufs can use it
        const msg = new Uint8Array(xhr.response)
        callback(null, msg);
      } else {
        callback(`error making request to ${method}`, null);
      }
    }
  }

  // msg must be a string to go over the wire; a simple string conversion
  // will not do, as bytes in the requestData will be truncated (_believe me_)
  var msg = String.fromCharCode.apply(null, new Uint8Array(requestData))
  xhr.send(msg)
}

var messager = proto.data.Messager.create(rpcImpl, false, false);
export default messager
