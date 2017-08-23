export const restAPI = async <T extends {} = {}, TData extends {} = {}>(data: RestAPI.IInp) => {

  return fetch(window.lmGlobal.platform.restAPIPlatform.serviceUrl, {
    method: 'post',
    headers: {
      'Content-Type': 'application/octet-stream',
      'x-lm-module': data.module,
      'x-lm-action': data.action,
      ...(data.dataType ? { 'x-lm-data-type': data.dataType } : null),
      ...(data.par ? { 'x-lm-par': encodeURIComponent(JSON.stringify(data.par)) } : null),
    },
    body: data.data && data.dataType === RestAPI.Types.JSON ? JSON.stringify(data.data) : data.data
  })
    .then(resp => {
      const out = {} as RestAPI.IOut<T, TData>
      out.dataType = resp.headers.get('x-lm-type') as RestAPI.Types 
      const par = resp.headers.get('x-lm-par')
      if (par) out.par = JSON.parse(decodeURIComponent(par))
      switch (out.dataType) {
        case RestAPI.Types.ERROR: throw new Error(resp.headers['x-lm-msg'])
        case RestAPI.Types.JSON: return resp.text().then(txt => {
          try { out.data = txt ? JSON.parse(txt) : null } catch (msg) { throw new Error(`ERROR: ${msg} (${txt})`) }
          return out
        })
        case RestAPI.Types.STRING: return resp.text().then(txt => { out.data = txt; return out })
        case RestAPI.Types.ARRAYBUFFER: return resp.arrayBuffer().then(buf => { out.data = buf; return out })
        case RestAPI.Types.NO: return Promise.resolve(out)
        default: throw 'not implemented'
      }
    })
}

function isLittleEndian(): boolean { //.NET binary writer is little endian
  var arrayBuffer = new ArrayBuffer(2)
  var uint8Array = new Uint8Array(arrayBuffer)
  var uint16array = new Uint16Array(arrayBuffer)
  uint8Array[0] = 0xAA // set first byte
  uint8Array[1] = 0xBB // set second byte
  return uint16array[0] === 0xBBAA 
}