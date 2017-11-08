SystemJS.config({
  production: false,
  browserConfig: {
    "paths": {
      "npm:": "/jspm_packages/npm/"
    }
  },
  packages: {
    "": {
      "defaultExtension": "js"
    }
  },
  map: {
    "redux-saga/effects": "npm:redux-saga@0.15.6/lib/effects",
    "redux-saga/index": "npm:redux-saga@0.15.6/lib/index",

    "rw-login": "libs/rw-login",
    "rw-router": "libs/rw-router",
    "rw-utils": "libs/rw-utils",
    "rw-controls": "libs/rw-controls"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "animated": "npm:animated@0.2.0",
    "@types/react-dom": "npm:@types/react-dom@16.0.1",
    "@types/react": "npm:@types/react@16.0.10",
    "es6-promise": "npm:es6-promise@4.1.1",
    "gsap": "npm:gsap@1.20.3",
    "react-transition-group": "npm:react-transition-group@2.2.1",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3",
    "redux": "npm:redux@3.7.2",
    "react-redux": "npm:react-redux@5.0.6",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "react-md": "npm:react-md@1.2.3",
    "url-pattern": "npm:url-pattern@1.0.3",
    "history": "npm:history@4.7.2",
    "qs": "npm:qs@6.5.1",
    "react": "npm:react@16.0.0",
    "react-dom": "npm:react-dom@16.0.0",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "fela": "npm:fela@5.2.0",
    "fela-dom": "npm:fela-dom@5.0.8",
    "fela-plugin-extend": "npm:fela-plugin-extend@5.0.10",
    "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.11",
    "fela-plugin-lvha": "npm:fela-plugin-lvha@5.0.10",
    "fela-plugin-prefixer": "npm:fela-plugin-prefixer@5.0.11",
    "fela-plugin-unit": "npm:fela-plugin-unit@5.0.10",
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "classnames": "npm:classnames@2.2.5",
    "core-js": "npm:core-js@2.5.1",
    "invariant": "npm:invariant@2.2.2",
    "js-cookie": "npm:js-cookie@2.1.4",
    "lodash": "npm:lodash@4.17.4",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.6.0",
    "redux-saga": "npm:redux-saga@0.15.6",
    "tslib": "npm:tslib@1.8.0",
    "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
  },
  packages: {
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.7.2"
      }
    },
    "npm:stream-http@2.7.2": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "readable-stream": "npm:readable-stream@2.3.3",
        "inherits": "npm:inherits@2.0.3",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "pako": "npm:pako@0.2.9",
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:redux@3.7.2": {
      "map": {
        "lodash": "npm:lodash@4.17.4",
        "loose-envify": "npm:loose-envify@1.3.1",
        "symbol-observable": "npm:symbol-observable@1.0.4",
        "lodash-es": "npm:lodash-es@4.17.4"
      }
    },
    "npm:react-redux@5.0.6": {
      "map": {
        "invariant": "npm:invariant@2.2.2",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.3.1",
        "prop-types": "npm:prop-types@15.6.0",
        "loose-envify": "npm:loose-envify@1.3.1",
        "lodash-es": "npm:lodash-es@4.17.4",
        "lodash": "npm:lodash@4.17.4"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.1.7"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.1": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.11.1"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.0.8"
      }
    },
    "npm:crypto-browserify@3.11.1": {
      "map": {
        "diffie-hellman": "npm:diffie-hellman@5.0.2",
        "browserify-cipher": "npm:browserify-cipher@1.0.0",
        "create-hmac": "npm:create-hmac@1.1.6",
        "public-encrypt": "npm:public-encrypt@4.0.0",
        "inherits": "npm:inherits@2.0.3",
        "randombytes": "npm:randombytes@2.0.5",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "create-ecdh": "npm:create-ecdh@4.0.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.3",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:readable-stream@2.3.3": {
      "map": {
        "isarray": "npm:isarray@1.0.0",
        "string_decoder": "npm:string_decoder@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "process-nextick-args": "npm:process-nextick-args@1.0.7",
        "core-util-is": "npm:core-util-is@1.0.2"
      }
    },
    "npm:diffie-hellman@5.0.2": {
      "map": {
        "randombytes": "npm:randombytes@2.0.5",
        "miller-rabin": "npm:miller-rabin@4.0.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:public-encrypt@4.0.0": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "randombytes": "npm:randombytes@2.0.5",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:create-hmac@1.1.6": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.9",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.9",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "inherits": "npm:inherits@2.0.3",
        "parse-asn1": "npm:parse-asn1@5.1.0",
        "elliptic": "npm:elliptic@6.4.0",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:randombytes@2.0.5": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:browserify-cipher@1.0.0": {
      "map": {
        "browserify-des": "npm:browserify-des@1.0.0",
        "browserify-aes": "npm:browserify-aes@1.1.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3"
      }
    },
    "npm:create-ecdh@4.0.0": {
      "map": {
        "elliptic": "npm:elliptic@6.4.0",
        "bn.js": "npm:bn.js@4.11.8"
      }
    },
    "npm:string_decoder@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:browserify-des@1.0.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "inherits": "npm:inherits@2.0.3",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:ripemd160@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@2.0.2"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.1.0",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.14",
        "asn1.js": "npm:asn1.js@4.9.1"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "randombytes": "npm:randombytes@2.0.5"
      }
    },
    "npm:elliptic@6.4.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "brorand": "npm:brorand@1.1.0",
        "hash.js": "npm:hash.js@1.1.3",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hash-base@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hash.js@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "hash.js": "npm:hash.js@1.1.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
      }
    },
    "npm:asn1.js@4.9.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.0"
      }
    },
    "npm:react-prop-types@0.4.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:invariant@2.2.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:loose-envify@1.3.1": {
      "map": {
        "js-tokens": "npm:js-tokens@3.0.2"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "whatwg-fetch": "npm:whatwg-fetch@2.0.3",
        "node-fetch": "npm:node-fetch@1.7.3"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.19"
      }
    },
    "npm:react-swipeable-views@0.12.8": {
      "map": {
        "react-swipeable-views-utils": "npm:react-swipeable-views-utils@0.12.8",
        "react-swipeable-views-core": "npm:react-swipeable-views-core@0.12.8",
        "warning": "npm:warning@3.0.0",
        "dom-helpers": "npm:dom-helpers@3.2.1",
        "prop-types": "npm:prop-types@15.6.0",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:history@4.7.2": {
      "map": {
        "invariant": "npm:invariant@2.2.2",
        "resolve-pathname": "npm:resolve-pathname@2.2.0",
        "value-equal": "npm:value-equal@0.4.0",
        "warning": "npm:warning@3.0.0",
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:react-swipeable-views-utils@0.12.8": {
      "map": {
        "react-swipeable-views-core": "npm:react-swipeable-views-core@0.12.8",
        "react-event-listener": "npm:react-event-listener@0.5.1",
        "prop-types": "npm:prop-types@15.6.0",
        "fbjs": "npm:fbjs@0.8.16",
        "keycode": "npm:keycode@2.1.9",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:react-swipeable-views-core@0.12.8": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:fela-dom@5.0.8": {
      "map": {
        "fela-tools": "npm:fela-tools@5.0.10",
        "fela-utils": "npm:fela-utils@6.0.1"
      }
    },
    "npm:fela@5.2.0": {
      "map": {
        "fela-tools": "npm:fela-tools@5.0.10",
        "fela-utils": "npm:fela-utils@6.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:fela-utils@6.0.1": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:babel-runtime@6.26.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.0",
        "core-js": "npm:core-js@2.5.1"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "is-stream": "npm:is-stream@1.1.0",
        "encoding": "npm:encoding@0.1.12"
      }
    },
    "npm:css-in-js-utils@2.0.0": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:pbkdf2@3.0.14": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.9",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "hash-base": "npm:hash-base@3.0.4",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:inline-style-prefixer@3.0.8": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "bowser": "npm:bowser@1.8.0"
      }
    },
    "npm:animated@0.2.0": {
      "map": {
        "invariant": "npm:invariant@2.2.2",
        "normalize-css-color": "npm:normalize-css-color@1.0.2"
      }
    },
    "npm:fbjs@0.8.16": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "promise": "npm:promise@7.3.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "core-js": "npm:core-js@1.2.7",
        "ua-parser-js": "npm:ua-parser-js@0.7.17",
        "setimmediate": "npm:setimmediate@1.0.5"
      }
    },
    "npm:prop-types@15.6.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.16"
      }
    },
    "npm:buffer@5.0.8": {
      "map": {
        "base64-js": "npm:base64-js@1.2.1",
        "ieee754": "npm:ieee754@1.1.8"
      }
    },
    "npm:sha.js@2.4.9": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:react-md@1.2.3": {
      "map": {
        "react-swipeable-views": "npm:react-swipeable-views@0.12.8",
        "react-prop-types": "npm:react-prop-types@0.4.0",
        "resize-observer-polyfill": "npm:resize-observer-polyfill@1.4.2",
        "react-motion": "npm:react-motion@0.5.2",
        "prop-types": "npm:prop-types@15.6.0",
        "classnames": "npm:classnames@2.2.5",
        "react-transition-group": "npm:react-transition-group@1.2.1"
      }
    },
    "npm:react-dom@16.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.16",
        "prop-types": "npm:prop-types@15.6.0",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:react@16.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.16",
        "prop-types": "npm:prop-types@15.6.0",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:react-motion@0.5.2": {
      "map": {
        "prop-types": "npm:prop-types@15.6.0",
        "performance-now": "npm:performance-now@0.2.0",
        "raf": "npm:raf@3.4.0"
      }
    },
    "npm:react-transition-group@1.2.1": {
      "map": {
        "prop-types": "npm:prop-types@15.6.0",
        "loose-envify": "npm:loose-envify@1.3.1",
        "dom-helpers": "npm:dom-helpers@3.2.1",
        "warning": "npm:warning@3.0.0",
        "chain-function": "npm:chain-function@1.0.0"
      }
    },
    "npm:raf@3.4.0": {
      "map": {
        "performance-now": "npm:performance-now@2.1.0"
      }
    },
    "npm:react-event-listener@0.5.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "fbjs": "npm:fbjs@0.8.16",
        "prop-types": "npm:prop-types@15.6.0",
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:browserify-aes@1.1.0": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:react-transition-group@2.2.1": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "prop-types": "npm:prop-types@15.6.0",
        "dom-helpers": "npm:dom-helpers@3.2.1",
        "chain-function": "npm:chain-function@1.0.0",
        "warning": "npm:warning@3.0.0",
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:fela-plugin-prefixer@5.0.11": {
      "map": {
        "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.11",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fela-utils": "npm:fela-utils@7.0.2",
        "inline-style-prefixer": "npm:inline-style-prefixer@3.0.8"
      }
    },
    "npm:@types/react-dom@16.0.1": {
      "map": {
        "@types/react": "npm:@types/react@16.0.10",
        "@types/node": "npm:@types/node@8.0.34"
      }
    },
    "npm:fela-plugin-unit@5.0.10": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fela-utils": "npm:fela-utils@7.0.2"
      }
    },
    "npm:fela-plugin-fallback-value@5.0.11": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fela-utils": "npm:fela-utils@7.0.2"
      }
    },
    "npm:fela-plugin-extend@5.0.10": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fela-utils": "npm:fela-utils@7.0.2"
      }
    },
    "npm:fela-plugin-lvha@5.0.10": {
      "map": {
        "fela-utils": "npm:fela-utils@7.0.2"
      }
    },
    "npm:fela-utils@7.0.2": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:fela-tools@5.0.10": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0",
        "fela-utils": "npm:fela-utils@7.0.2"
      }
    }
  }
});
