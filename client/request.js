import proto from '../proto';

const API_URL = 'http://localhost:3030/api';

console.log('XMLHttpRequest', XMLHttpRequest)

function rpcImpl(method, requestData, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', API_URL);
  xhr.responseType = 'arraybuffer';

  xhr.setRequestHeader('X-Rpc-Service', '/data.Messager/')
  xhr.setRequestHeader('X-Rpc-Method', method)
  xhr.setRequestHeader('Content-Type', 'application/octet-stream')

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const msg = new Uint8Array(xhr.response)
        callback(null, msg);
      } else {
        callback(`error making request to ${method}`, null);
      }
    }
  }

  var msg = String.fromCharCode.apply(null, new Uint8Array(requestData))
  xhr.send(msg)
}

//function rpcImpl(method, requestData, callback) {
//  const req = String.fromCharCode.apply(null, new Uint8Array(requestData));
//
//  fetch(API_URL, {
//    method: 'POST',
//    headers: {
//      'X-Rpc-Service': '/data.Messager/',
//      'X-Rpc-Method': method,
//      'Content-Type': 'application/octet-stream'
//    },
//    body: req
//  }).then((resp) => {
//    const msg = new Uint8Array(resp)
//    console.log(`got response back from ${method}`, msg)
//    callback(null, msg);
//  }).catch((error) => {
//    console.log(`error getting response from ${method}`, error)
//    callback(error, null);
//  })
//}

var messager = proto.data.Messager.create(rpcImpl, false, false);
export default messager
