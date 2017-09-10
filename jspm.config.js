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
    },
    "npm:query-string@5.0.0": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "decode-uri-component": "npm:decode-uri-component@0.2.0",
        "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
      }
    },
    "npm:url-parse@1.1.9": {
      "map": {
        "requires-port": "npm:requires-port@1.0.0",
        "querystringify": "npm:querystringify@1.0.0"
      }
    }
  },
  map: {
    "web-fela": "/app-web/lib/fela",
    "redux-saga/effects": "npm:redux-saga@0.15.6/lib/effects",
    "redux-saga/index": "npm:redux-saga@0.15.6/lib/index",
    "url-parse": "npm:url-parse@1.1.9",
    "query-string": "npm:query-string@5.0.0",
    "validate.js": "npm:validate.js@0.11.1"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "react-md": "npm:react-md@1.1.0",
    "url-pattern": "npm:url-pattern@1.0.3",
    "history": "npm:history@4.7.2",
    "qs": "npm:qs@6.5.1",
    "bcrypt-pbkdf": "npm:bcrypt-pbkdf@1.0.1",
    "console": "npm:jspm-nodelibs-console@0.2.3",
    "dgram": "npm:jspm-nodelibs-dgram@0.2.1",
    "dns": "npm:jspm-nodelibs-dns@0.2.1",
    "ecc-jsbn": "npm:ecc-jsbn@0.1.1",
    "fsevents": "npm:fsevents@1.1.2",
    "graceful-fs": "npm:graceful-fs@4.1.11",
    "jsbn": "npm:jsbn@0.1.1",
    "module": "npm:jspm-nodelibs-module@0.2.1",
    "net": "npm:jspm-nodelibs-net@0.2.1",
    "querystring": "npm:jspm-nodelibs-querystring@0.2.2",
    "react-native": "npm:react-native@0.48.2",
    "readline": "npm:jspm-nodelibs-readline@0.2.1",
    "tls": "npm:jspm-nodelibs-tls@0.2.1",
    "tty": "npm:jspm-nodelibs-tty@0.2.1",
    "tweetnacl": "npm:tweetnacl@0.14.5",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "react": "npm:react@15.6.1",
    "react-dom": "npm:react-dom@15.6.1",
    "redux": "npm:redux@3.7.2",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "fela": "npm:fela@5.2.0",
    "fela-dom": "npm:fela-dom@5.0.8",
    "fela-plugin-extend": "npm:fela-plugin-extend@5.0.7",
    "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.8",
    "fela-plugin-lvha": "npm:fela-plugin-lvha@5.0.7",
    "fela-plugin-prefixer": "npm:fela-plugin-prefixer@5.0.8",
    "fela-plugin-unit": "npm:fela-plugin-unit@5.0.7",
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "classnames": "npm:classnames@2.2.5",
    "core-js": "npm:core-js@2.5.1",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "invariant": "npm:invariant@2.2.2",
    "js-cookie": "npm:js-cookie@2.1.4",
    "lodash": "npm:lodash@4.17.4",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "prop-types": "npm:prop-types@15.5.10",
    "react-motion": "npm:react-motion@0.5.1",
    "react-navigation": "npm:react-navigation@1.0.0-beta.12",
    "react-prop-types": "npm:react-prop-types@0.4.0",
    "react-redux": "npm:react-redux@5.0.6",
    "react-swipeable-views": "npm:react-swipeable-views@0.12.8",
    "react-transition-group": "npm:react-transition-group@1.1.3",
    "redux-saga": "npm:redux-saga@0.15.6",
    "resize-observer-polyfill": "npm:resize-observer-polyfill@1.4.2",
    "tslib": "npm:tslib@1.7.1",
    "whatwg-fetch": "npm:whatwg-fetch@2.0.3"
  },
  packages: {
    "npm:bcrypt-pbkdf@1.0.1": {
      "map": {
        "tweetnacl": "npm:tweetnacl@0.14.5"
      }
    },
    "npm:ecc-jsbn@0.1.1": {
      "map": {
        "jsbn": "npm:jsbn@0.1.1"
      }
    },
    "npm:fsevents@1.1.2": {
      "map": {
        "nan": "npm:nan@2.4.0",
        "node-pre-gyp": "npm:node-pre-gyp@0.6.37"
      }
    },
    "npm:fbjs@0.8.12": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1",
        "promise": "npm:promise@7.3.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.14"
      }
    },
    "npm:babel-preset-react-native@2.1.0": {
      "map": {
        "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.22.0",
        "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.22.0",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.26.0",
        "react-transform-hmr": "npm:react-transform-hmr@1.0.4",
        "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.24.1",
        "babel-plugin-react-transform": "npm:babel-plugin-react-transform@2.0.2",
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
        "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.13.0",
        "babel-plugin-transform-es2015-computed-properties": "npm:babel-plugin-transform-es2015-computed-properties@6.24.1",
        "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0",
        "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.13.0",
        "babel-plugin-transform-es2015-arrow-functions": "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0",
        "babel-plugin-transform-object-assign": "npm:babel-plugin-transform-object-assign@6.22.0",
        "babel-plugin-transform-react-jsx-source": "npm:babel-plugin-transform-react-jsx-source@6.22.0",
        "babel-plugin-check-es2015-constants": "npm:babel-plugin-check-es2015-constants@6.22.0",
        "babel-plugin-transform-es2015-function-name": "npm:babel-plugin-transform-es2015-function-name@6.24.1",
        "babel-plugin-transform-es2015-literals": "npm:babel-plugin-transform-es2015-literals@6.22.0",
        "babel-plugin-transform-es2015-template-literals": "npm:babel-plugin-transform-es2015-template-literals@6.22.0",
        "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.23.0",
        "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.22.0",
        "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.26.0",
        "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.23.0",
        "babel-plugin-transform-react-display-name": "npm:babel-plugin-transform-react-display-name@6.25.0",
        "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.24.1",
        "babel-plugin-transform-es2015-classes": "npm:babel-plugin-transform-es2015-classes@6.24.1",
        "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1",
        "babel-plugin-transform-regenerator": "npm:babel-plugin-transform-regenerator@6.26.0",
        "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.24.1",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0"
      }
    },
    "npm:babel-preset-es2015-node@6.1.1": {
      "map": {
        "semver": "npm:semver@5.4.1",
        "babel-plugin-transform-es2015-function-name": "npm:babel-plugin-transform-es2015-function-name@6.24.1",
        "babel-plugin-transform-es2015-sticky-regex": "npm:babel-plugin-transform-es2015-sticky-regex@6.24.1",
        "babel-plugin-transform-es2015-unicode-regex": "npm:babel-plugin-transform-es2015-unicode-regex@6.24.1",
        "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.22.0",
        "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.23.0",
        "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.24.1",
        "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.24.1",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0"
      }
    },
    "npm:babel-preset-fbjs@2.1.4": {
      "map": {
        "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.24.1",
        "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.22.0",
        "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.22.0",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.26.0",
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
        "babel-plugin-transform-es2015-computed-properties": "npm:babel-plugin-transform-es2015-computed-properties@6.24.1",
        "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0",
        "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.13.0",
        "babel-plugin-transform-es2015-arrow-functions": "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0",
        "babel-plugin-check-es2015-constants": "npm:babel-plugin-check-es2015-constants@6.22.0",
        "babel-plugin-transform-es2015-function-name": "npm:babel-plugin-transform-es2015-function-name@6.24.1",
        "babel-plugin-transform-es2015-literals": "npm:babel-plugin-transform-es2015-literals@6.22.0",
        "babel-plugin-transform-es2015-template-literals": "npm:babel-plugin-transform-es2015-template-literals@6.22.0",
        "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.23.0",
        "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.22.0",
        "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.13.0",
        "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.26.0",
        "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.23.0",
        "babel-plugin-transform-react-display-name": "npm:babel-plugin-transform-react-display-name@6.25.0",
        "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.24.1",
        "babel-plugin-transform-es2015-object-super": "npm:babel-plugin-transform-es2015-object-super@6.24.1",
        "babel-plugin-transform-es2015-classes": "npm:babel-plugin-transform-es2015-classes@6.24.1",
        "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1",
        "babel-plugin-transform-es3-property-literals": "npm:babel-plugin-transform-es3-property-literals@6.22.0",
        "babel-plugin-transform-es3-member-expression-literals": "npm:babel-plugin-transform-es3-member-expression-literals@6.22.0",
        "babel-plugin-transform-es2015-block-scoped-functions": "npm:babel-plugin-transform-es2015-block-scoped-functions@6.22.0",
        "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.24.1",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0"
      }
    },
    "npm:plist@1.2.0": {
      "map": {
        "base64-js": "npm:base64-js@0.0.8",
        "xmlbuilder": "npm:xmlbuilder@4.0.0",
        "util-deprecate": "npm:util-deprecate@1.0.2",
        "xmldom": "npm:xmldom@0.1.27"
      }
    },
    "npm:temp@0.8.3": {
      "map": {
        "rimraf": "npm:rimraf@2.2.8",
        "os-tmpdir": "npm:os-tmpdir@1.0.2"
      }
    },
    "npm:write-file-atomic@1.3.4": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "slide": "npm:slide@1.1.6",
        "imurmurhash": "npm:imurmurhash@0.1.4"
      }
    },
    "npm:mkdirp@0.5.1": {
      "map": {
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:fbjs-scripts@0.7.1": {
      "map": {
        "babel-preset-fbjs": "npm:babel-preset-fbjs@1.0.0",
        "object-assign": "npm:object-assign@4.1.1",
        "core-js": "npm:core-js@1.2.7",
        "semver": "npm:semver@5.4.1",
        "through2": "npm:through2@2.0.3",
        "cross-spawn": "npm:cross-spawn@3.0.1",
        "gulp-util": "npm:gulp-util@3.0.8",
        "babel-core": "npm:babel-core@6.26.0"
      }
    },
    "npm:optimist@0.6.1": {
      "map": {
        "wordwrap": "npm:wordwrap@0.0.2",
        "minimist": "npm:minimist@0.0.8"
      }
    },
    "npm:request@2.81.0": {
      "map": {
        "form-data": "npm:form-data@2.1.4",
        "performance-now": "npm:performance-now@0.2.0",
        "mime-types": "npm:mime-types@2.1.17",
        "uuid": "npm:uuid@3.0.1",
        "har-validator": "npm:har-validator@4.2.1",
        "forever-agent": "npm:forever-agent@0.6.1",
        "combined-stream": "npm:combined-stream@1.0.5",
        "is-typedarray": "npm:is-typedarray@1.0.0",
        "isstream": "npm:isstream@0.1.2",
        "stringstream": "npm:stringstream@0.0.5",
        "json-stringify-safe": "npm:json-stringify-safe@5.0.1",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "caseless": "npm:caseless@0.12.0",
        "http-signature": "npm:http-signature@1.1.1",
        "aws4": "npm:aws4@1.6.0",
        "hawk": "npm:hawk@3.1.3",
        "oauth-sign": "npm:oauth-sign@0.8.2",
        "tough-cookie": "npm:tough-cookie@2.3.2",
        "qs": "npm:qs@6.4.0",
        "aws-sign2": "npm:aws-sign2@0.6.0",
        "tunnel-agent": "npm:tunnel-agent@0.6.0",
        "extend": "npm:extend@3.0.1"
      }
    },
    "npm:fs-extra@1.0.0": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "jsonfile": "npm:jsonfile@2.4.0",
        "klaw": "npm:klaw@1.3.1"
      }
    },
    "npm:opn@3.0.3": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:rimraf@2.6.1": {
      "map": {
        "glob": "npm:glob@7.1.2"
      }
    },
    "npm:sane@1.4.1": {
      "map": {
        "minimist": "npm:minimist@1.2.0",
        "minimatch": "npm:minimatch@3.0.4",
        "fb-watchman": "npm:fb-watchman@1.9.2",
        "exec-sh": "npm:exec-sh@0.2.1",
        "walker": "npm:walker@1.0.7",
        "watch": "npm:watch@0.10.0"
      }
    },
    "npm:concat-stream@1.6.0": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.3",
        "inherits": "npm:inherits@2.0.3",
        "typedarray": "npm:typedarray@0.0.6"
      }
    },
    "npm:merge-stream@1.0.1": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:glob@7.1.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimatch": "npm:minimatch@3.0.4",
        "path-is-absolute": "npm:path-is-absolute@1.0.1",
        "once": "npm:once@1.4.0",
        "inflight": "npm:inflight@1.0.6",
        "fs.realpath": "npm:fs.realpath@1.0.0"
      }
    },
    "npm:debug@2.6.8": {
      "map": {
        "ms": "npm:ms@2.0.0"
      }
    },
    "npm:babel-plugin-external-helpers@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-flow-strip-types@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0"
      }
    },
    "npm:json-stable-stringify@1.0.1": {
      "map": {
        "jsonify": "npm:jsonify@0.0.0"
      }
    },
    "npm:shell-quote@1.6.1": {
      "map": {
        "jsonify": "npm:jsonify@0.0.0",
        "array-map": "npm:array-map@0.0.0",
        "array-reduce": "npm:array-reduce@0.0.0",
        "array-filter": "npm:array-filter@0.0.1"
      }
    },
    "npm:babel-plugin-transform-async-to-generator@6.16.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-plugin-syntax-async-functions": "npm:babel-plugin-syntax-async-functions@6.13.0",
        "babel-helper-remap-async-to-generator": "npm:babel-helper-remap-async-to-generator@6.24.1"
      }
    },
    "npm:mime-types@2.1.11": {
      "map": {
        "mime-db": "npm:mime-db@1.23.0"
      }
    },
    "npm:ws@1.1.4": {
      "map": {
        "utf-8-validate": "npm:utf-8-validate@1.2.2",
        "ultron": "npm:ultron@1.0.2",
        "bufferutil": "npm:bufferutil@1.2.1",
        "options": "npm:options@0.0.6"
      }
    },
    "npm:xcode@0.9.3": {
      "map": {
        "uuid": "npm:uuid@3.0.1",
        "pegjs": "npm:pegjs@0.10.0",
        "simple-plist": "npm:simple-plist@0.2.1"
      }
    },
    "npm:react-transform-hmr@1.0.4": {
      "map": {
        "global": "npm:global@4.3.2",
        "react-proxy": "npm:react-proxy@1.1.8"
      }
    },
    "npm:npmlog@2.0.4": {
      "map": {
        "are-we-there-yet": "npm:are-we-there-yet@1.1.4",
        "gauge": "npm:gauge@1.2.7",
        "ansi": "npm:ansi@0.3.1"
      }
    },
    "npm:npmlog@4.1.2": {
      "map": {
        "are-we-there-yet": "npm:are-we-there-yet@1.1.4",
        "gauge": "npm:gauge@2.7.4",
        "set-blocking": "npm:set-blocking@2.0.0",
        "console-control-strings": "npm:console-control-strings@1.1.0"
      }
    },
    "npm:errno@0.1.4": {
      "map": {
        "prr": "npm:prr@0.0.0"
      }
    },
    "npm:yargs@6.6.0": {
      "map": {
        "get-caller-file": "npm:get-caller-file@1.0.2",
        "os-locale": "npm:os-locale@1.4.0",
        "camelcase": "npm:camelcase@3.0.0",
        "cliui": "npm:cliui@3.2.0",
        "read-pkg-up": "npm:read-pkg-up@1.0.1",
        "which-module": "npm:which-module@1.0.0",
        "require-directory": "npm:require-directory@2.1.1",
        "string-width": "npm:string-width@1.0.2",
        "set-blocking": "npm:set-blocking@2.0.0",
        "yargs-parser": "npm:yargs-parser@4.2.1",
        "decamelize": "npm:decamelize@1.2.0",
        "require-main-filename": "npm:require-main-filename@1.0.1",
        "y18n": "npm:y18n@3.2.1"
      }
    },
    "npm:xmldoc@0.4.0": {
      "map": {
        "sax": "npm:sax@1.1.6"
      }
    },
    "npm:ws@2.3.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.0.1",
        "ultron": "npm:ultron@1.1.0"
      }
    },
    "npm:babel-plugin-transform-class-properties@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-plugin-syntax-class-properties": "npm:babel-plugin-syntax-class-properties@6.13.0",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
        "babel-template": "npm:babel-template@6.26.0"
      }
    },
    "npm:babel-preset-fbjs@1.0.0": {
      "map": {
        "babel-plugin-transform-es2015-computed-properties": "npm:babel-plugin-transform-es2015-computed-properties@6.24.1",
        "babel-plugin-syntax-flow": "npm:babel-plugin-syntax-flow@6.18.0",
        "babel-plugin-transform-es2015-arrow-functions": "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0",
        "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.22.0",
        "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.22.0",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.26.0",
        "object-assign": "npm:object-assign@4.1.1",
        "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.24.1",
        "babel-plugin-check-es2015-constants": "npm:babel-plugin-check-es2015-constants@6.22.0",
        "babel-plugin-transform-es2015-literals": "npm:babel-plugin-transform-es2015-literals@6.22.0",
        "babel-plugin-transform-es2015-template-literals": "npm:babel-plugin-transform-es2015-template-literals@6.22.0",
        "babel-plugin-transform-es2015-for-of": "npm:babel-plugin-transform-es2015-for-of@6.23.0",
        "babel-plugin-transform-es2015-spread": "npm:babel-plugin-transform-es2015-spread@6.22.0",
        "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.13.0",
        "babel-plugin-transform-es2015-block-scoping": "npm:babel-plugin-transform-es2015-block-scoping@6.26.0",
        "babel-plugin-transform-es2015-destructuring": "npm:babel-plugin-transform-es2015-destructuring@6.23.0",
        "babel-plugin-transform-es2015-shorthand-properties": "npm:babel-plugin-transform-es2015-shorthand-properties@6.24.1",
        "babel-plugin-transform-es2015-object-super": "npm:babel-plugin-transform-es2015-object-super@6.24.1",
        "babel-plugin-transform-es2015-classes": "npm:babel-plugin-transform-es2015-classes@6.24.1",
        "babel-plugin-transform-es3-property-literals": "npm:babel-plugin-transform-es3-property-literals@6.22.0",
        "babel-plugin-transform-es3-member-expression-literals": "npm:babel-plugin-transform-es3-member-expression-literals@6.22.0",
        "babel-plugin-transform-es2015-block-scoped-functions": "npm:babel-plugin-transform-es2015-block-scoped-functions@6.22.0",
        "babel-plugin-transform-es2015-parameters": "npm:babel-plugin-transform-es2015-parameters@6.24.1",
        "babel-plugin-transform-es2015-modules-commonjs": "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0"
      }
    },
    "npm:form-data@2.1.4": {
      "map": {
        "mime-types": "npm:mime-types@2.1.17",
        "asynckit": "npm:asynckit@0.4.0",
        "combined-stream": "npm:combined-stream@1.0.5"
      }
    },
    "npm:sane@2.0.0": {
      "map": {
        "minimist": "npm:minimist@1.2.0",
        "exec-sh": "npm:exec-sh@0.2.1",
        "fb-watchman": "npm:fb-watchman@2.0.0",
        "minimatch": "npm:minimatch@3.0.4",
        "walker": "npm:walker@1.0.7",
        "watch": "npm:watch@0.10.0",
        "anymatch": "npm:anymatch@1.3.2"
      }
    },
    "npm:async@2.5.0": {
      "map": {
        "lodash": "npm:lodash@4.17.4"
      }
    },
    "npm:rc@1.2.1": {
      "map": {
        "minimist": "npm:minimist@1.2.0",
        "deep-extend": "npm:deep-extend@0.4.2",
        "ini": "npm:ini@1.3.4",
        "strip-json-comments": "npm:strip-json-comments@2.0.1"
      }
    },
    "npm:tar-pack@3.4.0": {
      "map": {
        "debug": "npm:debug@2.6.8",
        "rimraf": "npm:rimraf@2.6.1",
        "tar": "npm:tar@2.2.1",
        "once": "npm:once@1.4.0",
        "readable-stream": "npm:readable-stream@2.3.3",
        "fstream": "npm:fstream@1.0.11",
        "uid-number": "npm:uid-number@0.0.6",
        "fstream-ignore": "npm:fstream-ignore@1.0.5"
      }
    },
    "npm:tar@2.2.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "block-stream": "npm:block-stream@0.0.9",
        "fstream": "npm:fstream@1.0.11"
      }
    },
    "npm:babel-plugin-react-transform@2.0.2": {
      "map": {
        "lodash": "npm:lodash@4.17.4"
      }
    },
    "npm:inflight@1.0.6": {
      "map": {
        "once": "npm:once@1.4.0",
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:chalk@1.1.3": {
      "map": {
        "has-ansi": "npm:has-ansi@2.0.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "ansi-styles": "npm:ansi-styles@2.2.1",
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "supports-color": "npm:supports-color@2.0.0"
      }
    },
    "npm:xmlbuilder@4.0.0": {
      "map": {
        "lodash": "npm:lodash@3.10.1"
      }
    },
    "npm:utf-8-validate@1.2.2": {
      "map": {
        "nan": "npm:nan@2.4.0",
        "bindings": "npm:bindings@1.2.1"
      }
    },
    "npm:fb-watchman@2.0.0": {
      "map": {
        "bser": "npm:bser@2.0.0"
      }
    },
    "npm:fb-watchman@1.9.2": {
      "map": {
        "bser": "npm:bser@1.0.2"
      }
    },
    "npm:simple-plist@0.2.1": {
      "map": {
        "plist": "npm:plist@2.0.1",
        "bplist-creator": "npm:bplist-creator@0.0.7",
        "bplist-parser": "npm:bplist-parser@0.1.1"
      }
    },
    "npm:uglify-js@2.7.5": {
      "map": {
        "async": "npm:async@0.2.10",
        "yargs": "npm:yargs@3.10.0",
        "source-map": "npm:source-map@0.5.7",
        "uglify-to-browserify": "npm:uglify-to-browserify@1.0.2"
      }
    },
    "npm:through2@2.0.3": {
      "map": {
        "xtend": "npm:xtend@4.0.1",
        "readable-stream": "npm:readable-stream@2.3.3"
      }
    },
    "npm:are-we-there-yet@1.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.3",
        "delegates": "npm:delegates@1.0.0"
      }
    },
    "npm:bufferutil@1.2.1": {
      "map": {
        "nan": "npm:nan@2.4.0",
        "bindings": "npm:bindings@1.2.1"
      }
    },
    "npm:tough-cookie@2.3.2": {
      "map": {
        "punycode": "npm:punycode@1.4.1"
      }
    },
    "npm:gulp-util@3.0.8": {
      "map": {
        "object-assign": "npm:object-assign@3.0.0",
        "chalk": "npm:chalk@1.1.3",
        "minimist": "npm:minimist@1.2.0",
        "through2": "npm:through2@2.0.3",
        "dateformat": "npm:dateformat@2.0.0",
        "beeper": "npm:beeper@1.1.1",
        "lodash._reescape": "npm:lodash._reescape@3.0.0",
        "gulplog": "npm:gulplog@1.0.0",
        "array-differ": "npm:array-differ@1.0.0",
        "array-uniq": "npm:array-uniq@1.0.3",
        "fancy-log": "npm:fancy-log@1.3.0",
        "vinyl": "npm:vinyl@0.5.3",
        "lodash._reevaluate": "npm:lodash._reevaluate@3.0.0",
        "replace-ext": "npm:replace-ext@0.0.1",
        "lodash._reinterpolate": "npm:lodash._reinterpolate@3.0.0",
        "lodash.template": "npm:lodash.template@3.6.2",
        "has-gulplog": "npm:has-gulplog@0.1.0",
        "multipipe": "npm:multipipe@0.1.2"
      }
    },
    "npm:gauge@1.2.7": {
      "map": {
        "ansi": "npm:ansi@0.3.1",
        "has-unicode": "npm:has-unicode@2.0.1",
        "lodash.pad": "npm:lodash.pad@4.5.1",
        "lodash.padstart": "npm:lodash.padstart@4.6.1",
        "lodash.padend": "npm:lodash.padend@4.6.1"
      }
    },
    "npm:react-proxy@1.1.8": {
      "map": {
        "lodash": "npm:lodash@4.17.4",
        "react-deep-force-update": "npm:react-deep-force-update@1.1.1"
      }
    },
    "npm:gauge@2.7.4": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "string-width": "npm:string-width@1.0.2",
        "console-control-strings": "npm:console-control-strings@1.1.0",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "aproba": "npm:aproba@1.1.2",
        "wide-align": "npm:wide-align@1.1.2",
        "has-unicode": "npm:has-unicode@2.0.1",
        "signal-exit": "npm:signal-exit@3.0.2"
      }
    },
    "npm:yargs-parser@4.2.1": {
      "map": {
        "camelcase": "npm:camelcase@3.0.0"
      }
    },
    "npm:cliui@3.2.0": {
      "map": {
        "string-width": "npm:string-width@1.0.2",
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "wrap-ansi": "npm:wrap-ansi@2.1.0"
      }
    },
    "npm:tunnel-agent@0.6.0": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:string-width@1.0.2": {
      "map": {
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "code-point-at": "npm:code-point-at@1.1.0",
        "is-fullwidth-code-point": "npm:is-fullwidth-code-point@1.0.0"
      }
    },
    "npm:nopt@4.0.1": {
      "map": {
        "abbrev": "npm:abbrev@1.1.0",
        "osenv": "npm:osenv@0.1.4"
      }
    },
    "npm:babel-plugin-transform-es2015-computed-properties@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-template": "npm:babel-template@6.26.0"
      }
    },
    "npm:babel-plugin-transform-react-jsx-source@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0"
      }
    },
    "npm:babel-plugin-transform-object-assign@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-arrow-functions@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-check-es2015-constants@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-literals@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-function-name@6.24.1": {
      "map": {
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1"
      }
    },
    "npm:babel-plugin-transform-es2015-template-literals@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-for-of@6.23.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-unicode-regex@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "regexpu-core": "npm:regexpu-core@2.0.0",
        "babel-helper-regex": "npm:babel-helper-regex@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-sticky-regex@6.24.1": {
      "map": {
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-helper-regex": "npm:babel-helper-regex@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-spread@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-destructuring@6.23.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-shorthand-properties@6.24.1": {
      "map": {
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-react-display-name@6.25.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-object-super@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.24.1"
      }
    },
    "npm:babel-plugin-transform-es2015-classes@6.24.1": {
      "map": {
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-template": "npm:babel-template@6.26.0",
        "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.24.1",
        "babel-helper-define-map": "npm:babel-helper-define-map@6.26.0",
        "babel-helper-replace-supers": "npm:babel-helper-replace-supers@6.24.1"
      }
    },
    "npm:babel-plugin-transform-react-jsx@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0",
        "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.26.0"
      }
    },
    "npm:minimatch@3.0.4": {
      "map": {
        "brace-expansion": "npm:brace-expansion@1.1.8"
      }
    },
    "npm:once@1.4.0": {
      "map": {
        "wrappy": "npm:wrappy@1.0.2"
      }
    },
    "npm:babel-plugin-transform-es2015-parameters@6.24.1": {
      "map": {
        "babel-template": "npm:babel-template@6.26.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-helper-call-delegate": "npm:babel-helper-call-delegate@6.24.1",
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.24.1"
      }
    },
    "npm:babel-plugin-transform-es3-member-expression-literals@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es3-property-literals@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:babel-plugin-transform-es2015-block-scoped-functions@6.22.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:global@4.3.2": {
      "map": {
        "min-document": "npm:min-document@2.19.0",
        "node-min-document": "npm:min-document@2.19.0",
        "process": "npm:process@0.5.2"
      }
    },
    "npm:har-validator@4.2.1": {
      "map": {
        "ajv": "npm:ajv@4.11.8",
        "har-schema": "npm:har-schema@1.0.5"
      }
    },
    "npm:hawk@3.1.3": {
      "map": {
        "cryptiles": "npm:cryptiles@2.0.5",
        "sntp": "npm:sntp@1.0.9",
        "boom": "npm:boom@2.10.1",
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:cross-spawn@3.0.1": {
      "map": {
        "lru-cache": "npm:lru-cache@4.1.1",
        "which": "npm:which@1.3.0"
      }
    },
    "npm:micromatch@2.3.11": {
      "map": {
        "braces": "npm:braces@1.8.5",
        "is-glob": "npm:is-glob@2.0.1",
        "filename-regex": "npm:filename-regex@2.0.1",
        "parse-glob": "npm:parse-glob@3.0.4",
        "regex-cache": "npm:regex-cache@0.4.4",
        "arr-diff": "npm:arr-diff@2.0.0",
        "array-unique": "npm:array-unique@0.2.1",
        "normalize-path": "npm:normalize-path@2.1.1",
        "is-extglob": "npm:is-extglob@1.0.0",
        "object.omit": "npm:object.omit@2.0.1",
        "kind-of": "npm:kind-of@3.2.2",
        "expand-brackets": "npm:expand-brackets@0.1.5",
        "extglob": "npm:extglob@0.3.2"
      }
    },
    "npm:os-locale@1.4.0": {
      "map": {
        "lcid": "npm:lcid@1.0.0"
      }
    },
    "npm:read-pkg-up@1.0.1": {
      "map": {
        "find-up": "npm:find-up@1.1.2",
        "read-pkg": "npm:read-pkg@1.1.0"
      }
    },
    "npm:combined-stream@1.0.5": {
      "map": {
        "delayed-stream": "npm:delayed-stream@1.0.0"
      }
    },
    "npm:walker@1.0.7": {
      "map": {
        "makeerror": "npm:makeerror@1.0.11"
      }
    },
    "npm:http-signature@1.1.1": {
      "map": {
        "assert-plus": "npm:assert-plus@0.2.0",
        "sshpk": "npm:sshpk@1.13.1",
        "jsprim": "npm:jsprim@1.4.1"
      }
    },
    "npm:string-width@2.1.1": {
      "map": {
        "is-fullwidth-code-point": "npm:is-fullwidth-code-point@2.0.0",
        "strip-ansi": "npm:strip-ansi@4.0.0"
      }
    },
    "npm:connect@2.30.2": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "qs": "npm:qs@4.0.0",
        "content-type": "npm:content-type@1.0.2",
        "cookie": "npm:cookie@0.1.3",
        "on-headers": "npm:on-headers@1.0.1",
        "parseurl": "npm:parseurl@1.3.2",
        "serve-static": "npm:serve-static@1.10.3",
        "type-is": "npm:type-is@1.6.15",
        "utils-merge": "npm:utils-merge@1.0.0",
        "bytes": "npm:bytes@2.1.0",
        "fresh": "npm:fresh@0.3.0",
        "depd": "npm:depd@1.0.1",
        "cookie-signature": "npm:cookie-signature@1.0.6",
        "compression": "npm:compression@1.5.2",
        "serve-favicon": "npm:serve-favicon@2.3.2",
        "method-override": "npm:method-override@2.3.9",
        "serve-index": "npm:serve-index@1.7.3",
        "http-errors": "npm:http-errors@1.3.1",
        "morgan": "npm:morgan@1.6.1",
        "connect-timeout": "npm:connect-timeout@1.6.2",
        "errorhandler": "npm:errorhandler@1.4.3",
        "multiparty": "npm:multiparty@3.3.2",
        "csurf": "npm:csurf@1.8.3",
        "vhost": "npm:vhost@3.0.2",
        "response-time": "npm:response-time@2.3.2",
        "cookie-parser": "npm:cookie-parser@1.3.5",
        "pause": "npm:pause@0.1.0",
        "basic-auth-connect": "npm:basic-auth-connect@1.0.0",
        "finalhandler": "npm:finalhandler@0.4.0",
        "body-parser": "npm:body-parser@1.13.3",
        "express-session": "npm:express-session@1.11.3"
      }
    },
    "npm:home-or-tmp@2.0.0": {
      "map": {
        "os-tmpdir": "npm:os-tmpdir@1.0.2",
        "os-homedir": "npm:os-homedir@1.0.2"
      }
    },
    "npm:yargs@3.10.0": {
      "map": {
        "camelcase": "npm:camelcase@1.2.1",
        "cliui": "npm:cliui@2.1.0",
        "decamelize": "npm:decamelize@1.2.0",
        "window-size": "npm:window-size@0.1.0"
      }
    },
    "npm:plist@2.0.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "xmlbuilder": "npm:xmlbuilder@8.2.2",
        "xmldom": "npm:xmldom@0.1.27"
      }
    },
    "npm:bser@1.0.2": {
      "map": {
        "node-int64": "npm:node-int64@0.4.0"
      }
    },
    "npm:bser@2.0.0": {
      "map": {
        "node-int64": "npm:node-int64@0.4.0"
      }
    },
    "npm:anymatch@1.3.2": {
      "map": {
        "micromatch": "npm:micromatch@2.3.11",
        "normalize-path": "npm:normalize-path@2.1.1"
      }
    },
    "npm:fstream@1.0.11": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "inherits": "npm:inherits@2.0.3",
        "mkdirp": "npm:mkdirp@0.5.1",
        "rimraf": "npm:rimraf@2.6.1"
      }
    },
    "npm:block-stream@0.0.9": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:fstream-ignore@1.0.5": {
      "map": {
        "fstream": "npm:fstream@1.0.11",
        "inherits": "npm:inherits@2.0.3",
        "minimatch": "npm:minimatch@3.0.4"
      }
    },
    "npm:babel-helper-remap-async-to-generator@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-template": "npm:babel-template@6.26.0",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1"
      }
    },
    "npm:osenv@0.1.4": {
      "map": {
        "os-tmpdir": "npm:os-tmpdir@1.0.2",
        "os-homedir": "npm:os-homedir@1.0.2"
      }
    },
    "npm:figures@2.0.0": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5"
      }
    },
    "npm:rx-lite-aggregates@4.0.8": {
      "map": {
        "rx-lite": "npm:rx-lite@4.0.8"
      }
    },
    "npm:babel-helper-function-name@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-template": "npm:babel-template@6.26.0",
        "babel-helper-get-function-arity": "npm:babel-helper-get-function-arity@6.24.1"
      }
    },
    "npm:babel-messages@6.23.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:has-ansi@2.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:strip-ansi@3.0.1": {
      "map": {
        "ansi-regex": "npm:ansi-regex@2.1.1"
      }
    },
    "npm:strip-ansi@4.0.0": {
      "map": {
        "ansi-regex": "npm:ansi-regex@3.0.0"
      }
    },
    "npm:external-editor@2.0.4": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.19",
        "tmp": "npm:tmp@0.0.31",
        "jschardet": "npm:jschardet@1.5.1"
      }
    },
    "npm:detect-indent@4.0.0": {
      "map": {
        "repeating": "npm:repeating@2.0.1"
      }
    },
    "npm:debug@2.2.0": {
      "map": {
        "ms": "npm:ms@0.7.1"
      }
    },
    "npm:jsprim@1.4.1": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0",
        "extsprintf": "npm:extsprintf@1.3.0",
        "verror": "npm:verror@1.10.0",
        "json-schema": "npm:json-schema@0.2.3"
      }
    },
    "npm:sshpk@1.13.1": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0",
        "dashdash": "npm:dashdash@1.14.1",
        "asn1": "npm:asn1@0.2.3",
        "getpass": "npm:getpass@0.1.7"
      }
    },
    "npm:cli-cursor@2.1.0": {
      "map": {
        "restore-cursor": "npm:restore-cursor@2.0.0"
      }
    },
    "npm:run-async@2.3.0": {
      "map": {
        "is-promise": "npm:is-promise@2.1.0"
      }
    },
    "npm:ajv@4.11.8": {
      "map": {
        "json-stable-stringify": "npm:json-stable-stringify@1.0.1",
        "co": "npm:co@4.6.0"
      }
    },
    "npm:cryptiles@2.0.5": {
      "map": {
        "boom": "npm:boom@2.10.1"
      }
    },
    "npm:sntp@1.0.9": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:parse-glob@3.0.4": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0",
        "is-glob": "npm:is-glob@2.0.1",
        "glob-base": "npm:glob-base@0.3.0",
        "is-dotfile": "npm:is-dotfile@1.0.3"
      }
    },
    "npm:is-glob@2.0.1": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0"
      }
    },
    "npm:wrap-ansi@2.1.0": {
      "map": {
        "strip-ansi": "npm:strip-ansi@3.0.1",
        "string-width": "npm:string-width@1.0.2"
      }
    },
    "npm:vinyl@0.5.3": {
      "map": {
        "replace-ext": "npm:replace-ext@0.0.1",
        "clone": "npm:clone@1.0.2",
        "clone-stats": "npm:clone-stats@0.0.1"
      }
    },
    "npm:wide-align@1.1.2": {
      "map": {
        "string-width": "npm:string-width@1.0.2"
      }
    },
    "npm:extglob@0.3.2": {
      "map": {
        "is-extglob": "npm:is-extglob@1.0.0"
      }
    },
    "npm:fancy-log@1.3.0": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "time-stamp": "npm:time-stamp@1.1.0"
      }
    },
    "npm:boom@2.10.1": {
      "map": {
        "hoek": "npm:hoek@2.16.3"
      }
    },
    "npm:lodash.template@3.6.2": {
      "map": {
        "lodash._reinterpolate": "npm:lodash._reinterpolate@3.0.0",
        "lodash._basecopy": "npm:lodash._basecopy@3.0.1",
        "lodash.keys": "npm:lodash.keys@3.1.2",
        "lodash._basetostring": "npm:lodash._basetostring@3.0.1",
        "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9",
        "lodash._basevalues": "npm:lodash._basevalues@3.0.0",
        "lodash.restparam": "npm:lodash.restparam@3.6.1",
        "lodash.templatesettings": "npm:lodash.templatesettings@3.1.1",
        "lodash.escape": "npm:lodash.escape@3.2.0"
      }
    },
    "npm:cliui@2.1.0": {
      "map": {
        "wordwrap": "npm:wordwrap@0.0.2",
        "center-align": "npm:center-align@0.1.3",
        "right-align": "npm:right-align@0.1.3"
      }
    },
    "npm:brace-expansion@1.1.8": {
      "map": {
        "concat-map": "npm:concat-map@0.0.1",
        "balanced-match": "npm:balanced-match@1.0.0"
      }
    },
    "npm:min-document@2.19.0": {
      "map": {
        "dom-walk": "npm:dom-walk@0.1.1"
      }
    },
    "npm:ansi-styles@3.2.0": {
      "map": {
        "color-convert": "npm:color-convert@1.9.0"
      }
    },
    "npm:braces@1.8.5": {
      "map": {
        "repeat-element": "npm:repeat-element@1.1.2",
        "expand-range": "npm:expand-range@1.8.2",
        "preserve": "npm:preserve@0.2.0"
      }
    },
    "npm:lru-cache@4.1.1": {
      "map": {
        "pseudomap": "npm:pseudomap@1.0.2",
        "yallist": "npm:yallist@2.1.2"
      }
    },
    "npm:serve-favicon@2.3.2": {
      "map": {
        "ms": "npm:ms@0.7.2",
        "fresh": "npm:fresh@0.3.0",
        "parseurl": "npm:parseurl@1.3.2",
        "etag": "npm:etag@1.7.0"
      }
    },
    "npm:serve-static@1.10.3": {
      "map": {
        "parseurl": "npm:parseurl@1.3.2",
        "send": "npm:send@0.13.2",
        "escape-html": "npm:escape-html@1.0.3"
      }
    },
    "npm:type-is@1.6.15": {
      "map": {
        "mime-types": "npm:mime-types@2.1.17",
        "media-typer": "npm:media-typer@0.3.0"
      }
    },
    "npm:method-override@2.3.9": {
      "map": {
        "debug": "npm:debug@2.6.8",
        "parseurl": "npm:parseurl@1.3.2",
        "vary": "npm:vary@1.1.1",
        "methods": "npm:methods@1.1.2"
      }
    },
    "npm:compression@1.5.2": {
      "map": {
        "bytes": "npm:bytes@2.1.0",
        "debug": "npm:debug@2.2.0",
        "on-headers": "npm:on-headers@1.0.1",
        "vary": "npm:vary@1.0.1",
        "accepts": "npm:accepts@1.2.13",
        "compressible": "npm:compressible@2.0.11"
      }
    },
    "npm:http-errors@1.3.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "statuses": "npm:statuses@1.2.1"
      }
    },
    "npm:morgan@1.6.1": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "depd": "npm:depd@1.0.1",
        "on-headers": "npm:on-headers@1.0.1",
        "on-finished": "npm:on-finished@2.3.0",
        "basic-auth": "npm:basic-auth@1.0.4"
      }
    },
    "npm:serve-index@1.7.3": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "http-errors": "npm:http-errors@1.3.1",
        "mime-types": "npm:mime-types@2.1.17",
        "parseurl": "npm:parseurl@1.3.2",
        "escape-html": "npm:escape-html@1.0.3",
        "accepts": "npm:accepts@1.2.13",
        "batch": "npm:batch@0.5.3"
      }
    },
    "npm:which@1.3.0": {
      "map": {
        "isexe": "npm:isexe@2.0.0"
      }
    },
    "npm:makeerror@1.0.11": {
      "map": {
        "tmpl": "npm:tmpl@1.0.4"
      }
    },
    "npm:kind-of@3.2.2": {
      "map": {
        "is-buffer": "npm:is-buffer@1.1.5"
      }
    },
    "npm:normalize-path@2.1.1": {
      "map": {
        "remove-trailing-separator": "npm:remove-trailing-separator@1.1.0"
      }
    },
    "npm:is-fullwidth-code-point@1.0.0": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.1"
      }
    },
    "npm:expand-brackets@0.1.5": {
      "map": {
        "is-posix-bracket": "npm:is-posix-bracket@0.1.1"
      }
    },
    "npm:find-up@1.1.2": {
      "map": {
        "path-exists": "npm:path-exists@2.1.0",
        "pinkie-promise": "npm:pinkie-promise@2.0.1"
      }
    },
    "npm:read-pkg@1.1.0": {
      "map": {
        "load-json-file": "npm:load-json-file@1.1.0",
        "path-type": "npm:path-type@1.1.0",
        "normalize-package-data": "npm:normalize-package-data@2.4.0"
      }
    },
    "npm:bplist-parser@0.1.1": {
      "map": {
        "big-integer": "npm:big-integer@1.6.25"
      }
    },
    "npm:lcid@1.0.0": {
      "map": {
        "invert-kv": "npm:invert-kv@1.0.0"
      }
    },
    "npm:object.omit@2.0.1": {
      "map": {
        "for-own": "npm:for-own@0.1.5",
        "is-extendable": "npm:is-extendable@0.1.1"
      }
    },
    "npm:has-gulplog@0.1.0": {
      "map": {
        "sparkles": "npm:sparkles@1.0.0"
      }
    },
    "npm:bplist-creator@0.0.7": {
      "map": {
        "stream-buffers": "npm:stream-buffers@2.2.0"
      }
    },
    "npm:gulplog@1.0.0": {
      "map": {
        "glogg": "npm:glogg@1.0.0"
      }
    },
    "npm:arr-diff@2.0.0": {
      "map": {
        "arr-flatten": "npm:arr-flatten@1.1.0"
      }
    },
    "npm:multiparty@3.3.2": {
      "map": {
        "readable-stream": "npm:readable-stream@1.1.14",
        "stream-counter": "npm:stream-counter@0.2.0"
      }
    },
    "npm:connect-timeout@1.6.2": {
      "map": {
        "debug": "npm:debug@2.2.0",
        "http-errors": "npm:http-errors@1.3.1",
        "ms": "npm:ms@0.7.1",
        "on-headers": "npm:on-headers@1.0.1"
      }
    },
    "npm:babel-helper-optimise-call-expression@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0"
      }
    },
    "npm:csurf@1.8.3": {
      "map": {
        "cookie": "npm:cookie@0.1.3",
        "cookie-signature": "npm:cookie-signature@1.0.6",
        "http-errors": "npm:http-errors@1.3.1",
        "csrf": "npm:csrf@3.0.6"
      }
    },
    "npm:regexpu-core@2.0.0": {
      "map": {
        "regjsgen": "npm:regjsgen@0.2.0",
        "regenerate": "npm:regenerate@1.3.2",
        "regjsparser": "npm:regjsparser@0.1.5"
      }
    },
    "npm:response-time@2.3.2": {
      "map": {
        "depd": "npm:depd@1.1.1",
        "on-headers": "npm:on-headers@1.0.1"
      }
    },
    "npm:cookie-parser@1.3.5": {
      "map": {
        "cookie": "npm:cookie@0.1.3",
        "cookie-signature": "npm:cookie-signature@1.0.6"
      }
    },
    "npm:multipipe@0.1.2": {
      "map": {
        "duplexer2": "npm:duplexer2@0.0.2"
      }
    },
    "npm:babel-helper-replace-supers@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-template": "npm:babel-template@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-helper-optimise-call-expression": "npm:babel-helper-optimise-call-expression@6.24.1"
      }
    },
    "npm:restore-cursor@2.0.0": {
      "map": {
        "signal-exit": "npm:signal-exit@3.0.2",
        "onetime": "npm:onetime@2.0.1"
      }
    },
    "npm:tmp@0.0.31": {
      "map": {
        "os-tmpdir": "npm:os-tmpdir@1.0.2"
      }
    },
    "npm:errorhandler@1.4.3": {
      "map": {
        "escape-html": "npm:escape-html@1.0.3",
        "accepts": "npm:accepts@1.3.4"
      }
    },
    "npm:babel-plugin-transform-strict-mode@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0"
      }
    },
    "npm:babel-helper-get-function-arity@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0"
      }
    },
    "npm:babel-helper-call-delegate@6.24.1": {
      "map": {
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-helper-hoist-variables": "npm:babel-helper-hoist-variables@6.24.1"
      }
    },
    "npm:repeating@2.0.1": {
      "map": {
        "is-finite": "npm:is-finite@1.0.2"
      }
    },
    "npm:finalhandler@0.4.0": {
      "map": {
        "escape-html": "npm:escape-html@1.0.2",
        "debug": "npm:debug@2.2.0",
        "on-finished": "npm:on-finished@2.3.0",
        "unpipe": "npm:unpipe@1.0.0"
      }
    },
    "npm:readable-stream@1.1.14": {
      "map": {
        "stream-browserify": "npm:stream-browserify@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "inherits": "npm:inherits@2.0.3",
        "isarray": "npm:isarray@0.0.1",
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:glob-base@0.3.0": {
      "map": {
        "is-glob": "npm:is-glob@2.0.1",
        "glob-parent": "npm:glob-parent@2.0.0"
      }
    },
    "npm:is-equal-shallow@0.1.3": {
      "map": {
        "is-primitive": "npm:is-primitive@2.0.0"
      }
    },
    "npm:dashdash@1.14.1": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0"
      }
    },
    "npm:path-exists@2.1.0": {
      "map": {
        "pinkie-promise": "npm:pinkie-promise@2.0.1"
      }
    },
    "npm:load-json-file@1.1.0": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "pinkie-promise": "npm:pinkie-promise@2.0.1",
        "parse-json": "npm:parse-json@2.2.0",
        "pify": "npm:pify@2.3.0",
        "strip-bom": "npm:strip-bom@2.0.0"
      }
    },
    "npm:getpass@0.1.7": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0"
      }
    },
    "npm:verror@1.10.0": {
      "map": {
        "assert-plus": "npm:assert-plus@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "extsprintf": "npm:extsprintf@1.3.0"
      }
    },
    "npm:path-type@1.1.0": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "pinkie-promise": "npm:pinkie-promise@2.0.1",
        "pify": "npm:pify@2.3.0"
      }
    },
    "npm:normalize-package-data@2.4.0": {
      "map": {
        "semver": "npm:semver@5.4.1",
        "hosted-git-info": "npm:hosted-git-info@2.5.0",
        "is-builtin-module": "npm:is-builtin-module@1.0.0",
        "validate-npm-package-license": "npm:validate-npm-package-license@3.0.1"
      }
    },
    "npm:glogg@1.0.0": {
      "map": {
        "sparkles": "npm:sparkles@1.0.0"
      }
    },
    "npm:lodash.templatesettings@3.1.1": {
      "map": {
        "lodash._reinterpolate": "npm:lodash._reinterpolate@3.0.0",
        "lodash.escape": "npm:lodash.escape@3.2.0"
      }
    },
    "npm:regjsparser@0.1.5": {
      "map": {
        "jsesc": "npm:jsesc@0.5.0"
      }
    },
    "npm:duplexer2@0.0.2": {
      "map": {
        "readable-stream": "npm:readable-stream@1.1.14"
      }
    },
    "npm:send@0.13.2": {
      "map": {
        "mime": "npm:mime@1.3.4",
        "statuses": "npm:statuses@1.2.1",
        "debug": "npm:debug@2.2.0",
        "depd": "npm:depd@1.1.1",
        "escape-html": "npm:escape-html@1.0.3",
        "etag": "npm:etag@1.7.0",
        "fresh": "npm:fresh@0.3.0",
        "http-errors": "npm:http-errors@1.3.1",
        "ms": "npm:ms@0.7.1",
        "on-finished": "npm:on-finished@2.3.0",
        "destroy": "npm:destroy@1.0.4",
        "range-parser": "npm:range-parser@1.0.3"
      }
    },
    "npm:body-parser@1.13.3": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.11",
        "bytes": "npm:bytes@2.1.0",
        "content-type": "npm:content-type@1.0.2",
        "debug": "npm:debug@2.2.0",
        "depd": "npm:depd@1.0.1",
        "http-errors": "npm:http-errors@1.3.1",
        "on-finished": "npm:on-finished@2.3.0",
        "qs": "npm:qs@4.0.0",
        "type-is": "npm:type-is@1.6.15",
        "raw-body": "npm:raw-body@2.1.7"
      }
    },
    "npm:accepts@1.2.13": {
      "map": {
        "mime-types": "npm:mime-types@2.1.17",
        "negotiator": "npm:negotiator@0.5.3"
      }
    },
    "npm:compressible@2.0.11": {
      "map": {
        "mime-db": "npm:mime-db@1.30.0"
      }
    },
    "npm:stream-counter@0.2.0": {
      "map": {
        "readable-stream": "npm:readable-stream@1.1.14"
      }
    },
    "npm:is-finite@1.0.2": {
      "map": {
        "number-is-nan": "npm:number-is-nan@1.0.1"
      }
    },
    "npm:express-session@1.11.3": {
      "map": {
        "cookie": "npm:cookie@0.1.3",
        "cookie-signature": "npm:cookie-signature@1.0.6",
        "debug": "npm:debug@2.2.0",
        "depd": "npm:depd@1.0.1",
        "on-headers": "npm:on-headers@1.0.1",
        "parseurl": "npm:parseurl@1.3.2",
        "utils-merge": "npm:utils-merge@1.0.0",
        "uid-safe": "npm:uid-safe@2.0.0",
        "crc": "npm:crc@3.3.0"
      }
    },
    "npm:color-convert@1.9.0": {
      "map": {
        "color-name": "npm:color-name@1.1.3"
      }
    },
    "npm:expand-range@1.8.2": {
      "map": {
        "fill-range": "npm:fill-range@2.2.3"
      }
    },
    "npm:lodash.keys@3.1.2": {
      "map": {
        "lodash.isarguments": "npm:lodash.isarguments@3.1.0",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash._getnative": "npm:lodash._getnative@3.9.1"
      }
    },
    "npm:pinkie-promise@2.0.1": {
      "map": {
        "pinkie": "npm:pinkie@2.0.4"
      }
    },
    "npm:babel-helpers@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-template": "npm:babel-template@6.26.0"
      }
    },
    "npm:for-own@0.1.5": {
      "map": {
        "for-in": "npm:for-in@1.0.2"
      }
    },
    "npm:lodash.escape@3.2.0": {
      "map": {
        "lodash._root": "npm:lodash._root@3.0.1"
      }
    },
    "npm:stream-browserify@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "readable-stream": "npm:readable-stream@1.1.14"
      }
    },
    "npm:right-align@0.1.3": {
      "map": {
        "align-text": "npm:align-text@0.1.4"
      }
    },
    "npm:center-align@0.1.3": {
      "map": {
        "align-text": "npm:align-text@0.1.4",
        "lazy-cache": "npm:lazy-cache@1.0.4"
      }
    },
    "npm:on-finished@2.3.0": {
      "map": {
        "ee-first": "npm:ee-first@1.1.1"
      }
    },
    "npm:csrf@3.0.6": {
      "map": {
        "rndm": "npm:rndm@1.2.0",
        "uid-safe": "npm:uid-safe@2.1.4",
        "tsscmp": "npm:tsscmp@1.0.5"
      }
    },
    "npm:onetime@2.0.1": {
      "map": {
        "mimic-fn": "npm:mimic-fn@1.1.0"
      }
    },
    "npm:glob-parent@2.0.0": {
      "map": {
        "is-glob": "npm:is-glob@2.0.1"
      }
    },
    "npm:fill-range@2.2.3": {
      "map": {
        "repeat-element": "npm:repeat-element@1.1.2",
        "repeat-string": "npm:repeat-string@1.6.1",
        "randomatic": "npm:randomatic@1.1.7",
        "is-number": "npm:is-number@2.1.0",
        "isobject": "npm:isobject@2.1.0"
      }
    },
    "npm:align-text@0.1.4": {
      "map": {
        "kind-of": "npm:kind-of@3.2.2",
        "repeat-string": "npm:repeat-string@1.6.1",
        "longest": "npm:longest@1.0.1"
      }
    },
    "npm:babel-helper-hoist-variables@6.24.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0"
      }
    },
    "npm:raw-body@2.1.7": {
      "map": {
        "bytes": "npm:bytes@2.4.0",
        "iconv-lite": "npm:iconv-lite@0.4.13",
        "unpipe": "npm:unpipe@1.0.0"
      }
    },
    "npm:parse-json@2.2.0": {
      "map": {
        "error-ex": "npm:error-ex@1.3.1"
      }
    },
    "npm:validate-npm-package-license@3.0.1": {
      "map": {
        "spdx-correct": "npm:spdx-correct@1.0.2",
        "spdx-expression-parse": "npm:spdx-expression-parse@1.0.4"
      }
    },
    "npm:strip-bom@2.0.0": {
      "map": {
        "is-utf8": "npm:is-utf8@0.2.1"
      }
    },
    "npm:is-builtin-module@1.0.0": {
      "map": {
        "builtin-modules": "npm:builtin-modules@1.1.1"
      }
    },
    "npm:uid-safe@2.0.0": {
      "map": {
        "base64-url": "npm:base64-url@1.2.1"
      }
    },
    "npm:randomatic@1.1.7": {
      "map": {
        "is-number": "npm:is-number@3.0.0",
        "kind-of": "npm:kind-of@4.0.0"
      }
    },
    "npm:uid-safe@2.1.4": {
      "map": {
        "random-bytes": "npm:random-bytes@1.0.0"
      }
    },
    "npm:isobject@2.1.0": {
      "map": {
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:is-number@2.1.0": {
      "map": {
        "kind-of": "npm:kind-of@3.2.2"
      }
    },
    "npm:error-ex@1.3.1": {
      "map": {
        "is-arrayish": "npm:is-arrayish@0.2.1"
      }
    },
    "npm:kind-of@4.0.0": {
      "map": {
        "is-buffer": "npm:is-buffer@1.1.5"
      }
    },
    "npm:is-number@3.0.0": {
      "map": {
        "kind-of": "npm:kind-of@3.2.2"
      }
    },
    "npm:spdx-correct@1.0.2": {
      "map": {
        "spdx-license-ids": "npm:spdx-license-ids@1.2.2"
      }
    },
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
    "npm:react-dom@15.6.1": {
      "map": {
        "prop-types": "npm:prop-types@15.5.10",
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.12",
        "object-assign": "npm:object-assign@4.1.1"
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
        "buffer": "npm:buffer@5.0.7"
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
        "miller-rabin": "npm:miller-rabin@4.0.0",
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
        "sha.js": "npm:sha.js@2.4.8",
        "cipher-base": "npm:cipher-base@1.0.4"
      }
    },
    "npm:create-hash@1.1.3": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.8",
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
        "browserify-aes": "npm:browserify-aes@1.0.8",
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
    "npm:sha.js@2.4.8": {
      "map": {
        "inherits": "npm:inherits@2.0.3"
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
    "npm:miller-rabin@4.0.0": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:parse-asn1@5.1.0": {
      "map": {
        "browserify-aes": "npm:browserify-aes@1.0.8",
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
    "npm:prop-types@15.5.10": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1",
        "fbjs": "npm:fbjs@0.8.12"
      }
    },
    "npm:react-prop-types@0.4.0": {
      "map": {
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:create-react-class@15.6.0": {
      "map": {
        "fbjs": "npm:fbjs@0.8.12",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:raf@3.3.2": {
      "map": {
        "performance-now": "npm:performance-now@2.1.0"
      }
    },
    "npm:invariant@2.2.2": {
      "map": {
        "loose-envify": "npm:loose-envify@1.3.1"
      }
    },
    "npm:path-to-regexp@1.7.0": {
      "map": {
        "isarray": "npm:isarray@0.0.1"
      }
    },
    "npm:react-native-drawer-layout-polyfill@1.3.2": {
      "map": {
        "react-native-drawer-layout": "npm:react-native-drawer-layout@1.3.2"
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
    "npm:react-native-drawer-layout@1.3.2": {
      "map": {
        "react-native-dismiss-keyboard": "npm:react-native-dismiss-keyboard@1.0.0"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.19"
      }
    },
    "npm:react-transition-group@1.1.3": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "dom-helpers": "npm:dom-helpers@3.2.1",
        "prop-types": "npm:prop-types@15.5.10",
        "chain-function": "npm:chain-function@1.0.0"
      }
    },
    "npm:inline-style-prefixer@3.0.7": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@1.0.3",
        "bowser": "npm:bowser@1.7.3"
      }
    },
    "npm:css-in-js-utils@1.0.3": {
      "map": {
        "hyphenate-style-name": "npm:hyphenate-style-name@1.0.2"
      }
    },
    "npm:buffer@5.0.7": {
      "map": {
        "ieee754": "npm:ieee754@1.1.8",
        "base64-js": "npm:base64-js@1.1.2"
      }
    },
    "npm:fela-plugin-prefixer@5.0.8": {
      "map": {
        "fela-plugin-fallback-value": "npm:fela-plugin-fallback-value@5.0.8",
        "fela-utils": "npm:fela-utils@6.0.1",
        "inline-style-prefixer": "npm:inline-style-prefixer@3.0.7",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:react-swipeable-views@0.12.8": {
      "map": {
        "react-swipeable-views-utils": "npm:react-swipeable-views-utils@0.12.8",
        "react-swipeable-views-core": "npm:react-swipeable-views-core@0.12.8",
        "warning": "npm:warning@3.0.0",
        "dom-helpers": "npm:dom-helpers@3.2.1",
        "prop-types": "npm:prop-types@15.5.10",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:react-native@0.48.2": {
      "map": {
        "babel-polyfill": "npm:babel-polyfill@6.26.0",
        "metro-bundler": "npm:metro-bundler@0.11.0",
        "write-file-atomic": "npm:write-file-atomic@1.3.4",
        "whatwg-fetch": "npm:whatwg-fetch@1.1.1",
        "fbjs-scripts": "npm:fbjs-scripts@0.7.1",
        "fs-extra": "npm:fs-extra@1.0.0",
        "jest-haste-map": "npm:jest-haste-map@20.1.0-delta.4",
        "throat": "npm:throat@4.1.0",
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "envinfo": "npm:envinfo@3.4.1",
        "react-devtools-core": "npm:react-devtools-core@2.5.0",
        "inquirer": "npm:inquirer@3.2.3",
        "create-react-class": "npm:create-react-class@15.6.0",
        "react-timer-mixin": "npm:react-timer-mixin@0.13.3",
        "babel-preset-es2015-node": "npm:babel-preset-es2015-node@6.1.1",
        "rebound": "npm:rebound@0.0.13",
        "absolute-path": "npm:absolute-path@0.0.0",
        "art": "npm:art@0.10.1",
        "prop-types": "npm:prop-types@15.5.10",
        "core-js": "npm:core-js@2.5.1",
        "fbjs": "npm:fbjs@0.8.12",
        "concat-stream": "npm:concat-stream@1.6.0",
        "form-data": "npm:form-data@2.1.4",
        "denodeify": "npm:denodeify@1.2.1",
        "babel-preset-fbjs": "npm:babel-preset-fbjs@2.1.4",
        "left-pad": "npm:left-pad@1.1.3",
        "react-clone-referenced-element": "npm:react-clone-referenced-element@1.0.1",
        "stacktrace-parser": "npm:stacktrace-parser@0.1.4",
        "merge-stream": "npm:merge-stream@1.0.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.9.6",
        "shell-quote": "npm:shell-quote@1.6.1",
        "event-target-shim": "npm:event-target-shim@1.1.1",
        "node-fetch": "npm:node-fetch@1.7.3",
        "sane": "npm:sane@1.4.1",
        "promise": "npm:promise@7.3.1",
        "xmldoc": "npm:xmldoc@0.4.0",
        "optimist": "npm:optimist@0.6.1",
        "xpipe": "npm:xpipe@1.0.5",
        "babel-plugin-transform-async-to-generator": "npm:babel-plugin-transform-async-to-generator@6.16.0",
        "ws": "npm:ws@1.1.4",
        "babel-preset-react-native": "npm:babel-preset-react-native@2.1.0",
        "babel-plugin-external-helpers": "npm:babel-plugin-external-helpers@6.22.0",
        "base64-js": "npm:base64-js@1.1.2",
        "babel-plugin-syntax-trailing-function-commas": "npm:babel-plugin-syntax-trailing-function-commas@6.22.0",
        "babel-plugin-transform-flow-strip-types": "npm:babel-plugin-transform-flow-strip-types@6.22.0",
        "babel-plugin-transform-class-properties": "npm:babel-plugin-transform-class-properties@6.24.1",
        "react-transform-hmr": "npm:react-transform-hmr@1.0.4",
        "babel-plugin-transform-object-rest-spread": "npm:babel-plugin-transform-object-rest-spread@6.26.0",
        "commander": "npm:commander@2.11.0",
        "xcode": "npm:xcode@0.9.3",
        "temp": "npm:temp@0.8.3",
        "opn": "npm:opn@3.0.3",
        "request": "npm:request@2.81.0",
        "mkdirp": "npm:mkdirp@0.5.1",
        "npmlog": "npm:npmlog@2.0.4",
        "pretty-format": "npm:pretty-format@4.3.1",
        "glob": "npm:glob@7.1.2",
        "babel-core": "npm:babel-core@6.26.0",
        "lodash": "npm:lodash@4.17.4",
        "babel-register": "npm:babel-register@6.26.0",
        "json5": "npm:json5@0.4.0",
        "babel-generator": "npm:babel-generator@6.26.0",
        "babylon": "npm:babylon@6.18.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "connect": "npm:connect@2.30.2",
        "errno": "npm:errno@0.1.4",
        "bser": "npm:bser@1.0.2",
        "xtend": "npm:xtend@4.0.1",
        "async": "npm:async@2.5.0",
        "yargs": "npm:yargs@6.6.0",
        "minimist": "npm:minimist@1.2.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "rimraf": "npm:rimraf@2.6.1",
        "wordwrap": "npm:wordwrap@1.0.0",
        "plist": "npm:plist@1.2.0",
        "mime": "npm:mime@1.3.4",
        "semver": "npm:semver@5.4.1",
        "chalk": "npm:chalk@1.1.3",
        "mime-types": "npm:mime-types@2.1.11",
        "source-map": "npm:source-map@0.5.7",
        "debug": "npm:debug@2.6.8",
        "json-stable-stringify": "npm:json-stable-stringify@1.0.1"
      }
    },
    "npm:metro-bundler@0.11.0": {
      "map": {
        "write-file-atomic": "npm:write-file-atomic@1.3.4",
        "jest-haste-map": "npm:jest-haste-map@20.1.0-chi.1",
        "throat": "npm:throat@4.1.0",
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "babel-preset-es2015-node": "npm:babel-preset-es2015-node@6.1.1",
        "absolute-path": "npm:absolute-path@0.0.0",
        "core-js": "npm:core-js@2.5.1",
        "fbjs": "npm:fbjs@0.8.12",
        "concat-stream": "npm:concat-stream@1.6.0",
        "denodeify": "npm:denodeify@1.2.1",
        "babel-preset-fbjs": "npm:babel-preset-fbjs@2.1.4",
        "left-pad": "npm:left-pad@1.1.3",
        "merge-stream": "npm:merge-stream@1.0.1",
        "xpipe": "npm:xpipe@1.0.5",
        "babel-preset-react-native": "npm:babel-preset-react-native@2.1.0",
        "babel-plugin-external-helpers": "npm:babel-plugin-external-helpers@6.22.0",
        "temp": "npm:temp@0.8.3",
        "request": "npm:request@2.81.0",
        "mkdirp": "npm:mkdirp@0.5.1",
        "jest-docblock": "npm:jest-docblock@20.1.0-chi.1",
        "babel-core": "npm:babel-core@6.26.0",
        "image-size": "npm:image-size@0.6.1",
        "lodash": "npm:lodash@4.17.4",
        "babel-register": "npm:babel-register@6.26.0",
        "json5": "npm:json5@0.4.0",
        "babel-generator": "npm:babel-generator@6.26.0",
        "babylon": "npm:babylon@6.18.0",
        "uglify-js": "npm:uglify-js@2.7.5",
        "async": "npm:async@2.5.0",
        "rimraf": "npm:rimraf@2.6.1",
        "chalk": "npm:chalk@1.1.3",
        "mime-types": "npm:mime-types@2.1.11",
        "source-map": "npm:source-map@0.5.7",
        "debug": "npm:debug@2.6.8",
        "json-stable-stringify": "npm:json-stable-stringify@1.0.1"
      }
    },
    "npm:react-redux@5.0.6": {
      "map": {
        "invariant": "npm:invariant@2.2.2",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.3.1",
        "prop-types": "npm:prop-types@15.5.10",
        "loose-envify": "npm:loose-envify@1.3.1",
        "lodash-es": "npm:lodash-es@4.17.4",
        "lodash": "npm:lodash@4.17.4"
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
        "react-event-listener": "npm:react-event-listener@0.5.0",
        "prop-types": "npm:prop-types@15.5.10",
        "fbjs": "npm:fbjs@0.8.12",
        "keycode": "npm:keycode@2.1.9",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:react-navigation@1.0.0-beta.12": {
      "map": {
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.3.1",
        "clamp": "npm:clamp@1.0.1",
        "react-native-tab-view": "npm:react-native-tab-view@0.0.67",
        "prop-types": "npm:prop-types@15.5.10",
        "path-to-regexp": "npm:path-to-regexp@1.7.0",
        "react-native-drawer-layout-polyfill": "npm:react-native-drawer-layout-polyfill@1.3.2"
      }
    },
    "npm:jest-haste-map@20.1.0-delta.4": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "sane": "npm:sane@2.0.0",
        "jest-docblock": "npm:jest-docblock@20.1.0-delta.4",
        "worker-farm": "npm:worker-farm@1.5.0",
        "fb-watchman": "npm:fb-watchman@2.0.0",
        "micromatch": "npm:micromatch@2.3.11"
      }
    },
    "npm:jest-haste-map@20.1.0-chi.1": {
      "map": {
        "graceful-fs": "npm:graceful-fs@4.1.11",
        "sane": "npm:sane@2.0.0",
        "jest-docblock": "npm:jest-docblock@20.1.0-delta.4",
        "worker-farm": "npm:worker-farm@1.5.0",
        "fb-watchman": "npm:fb-watchman@2.0.0",
        "micromatch": "npm:micromatch@2.3.11"
      }
    },
    "npm:react-swipeable-views-core@0.12.8": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:react-motion@0.5.1": {
      "map": {
        "raf": "npm:raf@3.3.2",
        "performance-now": "npm:performance-now@0.2.0",
        "prop-types": "npm:prop-types@15.5.10"
      }
    },
    "npm:fela-dom@5.0.8": {
      "map": {
        "fela-tools": "npm:fela-tools@5.0.7",
        "fela-utils": "npm:fela-utils@6.0.1"
      }
    },
    "npm:fela@5.2.0": {
      "map": {
        "fela-tools": "npm:fela-tools@5.0.7",
        "fela-utils": "npm:fela-utils@6.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:react-event-listener@0.5.0": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "prop-types": "npm:prop-types@15.5.10",
        "fbjs": "npm:fbjs@0.8.15",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:fela-plugin-extend@5.0.7": {
      "map": {
        "fela-utils": "npm:fela-utils@6.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:fela-plugin-unit@5.0.7": {
      "map": {
        "fela-utils": "npm:fela-utils@6.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:fela-plugin-lvha@5.0.7": {
      "map": {
        "fela-utils": "npm:fela-utils@6.0.1"
      }
    },
    "npm:fela-plugin-fallback-value@5.0.8": {
      "map": {
        "fela-utils": "npm:fela-utils@6.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:fela-tools@5.0.7": {
      "map": {
        "fela-utils": "npm:fela-utils@6.0.1",
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:babel-polyfill@6.26.0": {
      "map": {
        "core-js": "npm:core-js@2.5.1",
        "regenerator-runtime": "npm:regenerator-runtime@0.10.5",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:react-native-tab-view@0.0.67": {
      "map": {
        "prop-types": "npm:prop-types@15.5.10"
      }
    },
    "npm:fbjs@0.8.15": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "loose-envify": "npm:loose-envify@1.3.1",
        "promise": "npm:promise@7.3.1",
        "setimmediate": "npm:setimmediate@1.0.5",
        "object-assign": "npm:object-assign@4.1.1",
        "ua-parser-js": "npm:ua-parser-js@0.7.14"
      }
    },
    "npm:react-devtools-core@2.5.0": {
      "map": {
        "shell-quote": "npm:shell-quote@1.6.1",
        "ws": "npm:ws@2.3.1"
      }
    },
    "npm:fela-utils@6.0.1": {
      "map": {
        "css-in-js-utils": "npm:css-in-js-utils@2.0.0"
      }
    },
    "npm:node-pre-gyp@0.6.37": {
      "map": {
        "mkdirp": "npm:mkdirp@0.5.1",
        "npmlog": "npm:npmlog@4.1.2",
        "request": "npm:request@2.81.0",
        "rc": "npm:rc@1.2.1",
        "tar-pack": "npm:tar-pack@3.4.0",
        "rimraf": "npm:rimraf@2.6.1",
        "semver": "npm:semver@5.4.1",
        "nopt": "npm:nopt@4.0.1",
        "tape": "npm:tape@4.8.0",
        "tar": "npm:tar@2.2.1"
      }
    },
    "npm:inquirer@3.2.3": {
      "map": {
        "lodash": "npm:lodash@4.17.4",
        "mute-stream": "npm:mute-stream@0.0.7",
        "cli-width": "npm:cli-width@2.2.0",
        "run-async": "npm:run-async@2.3.0",
        "cli-cursor": "npm:cli-cursor@2.1.0",
        "figures": "npm:figures@2.0.0",
        "rx-lite-aggregates": "npm:rx-lite-aggregates@4.0.8",
        "through": "npm:through@2.3.8",
        "external-editor": "npm:external-editor@2.0.4",
        "rx-lite": "npm:rx-lite@4.0.8",
        "ansi-escapes": "npm:ansi-escapes@2.0.0",
        "chalk": "npm:chalk@2.1.0",
        "string-width": "npm:string-width@2.1.1",
        "strip-ansi": "npm:strip-ansi@4.0.0"
      }
    },
    "npm:babel-plugin-transform-es2015-block-scoping@6.26.0": {
      "map": {
        "lodash": "npm:lodash@4.17.4",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-template": "npm:babel-template@6.26.0"
      }
    },
    "npm:babel-core@6.26.0": {
      "map": {
        "babel-generator": "npm:babel-generator@6.26.0",
        "babel-register": "npm:babel-register@6.26.0",
        "babylon": "npm:babylon@6.18.0",
        "json5": "npm:json5@0.5.1",
        "lodash": "npm:lodash@4.17.4",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-helpers": "npm:babel-helpers@6.24.1",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-template": "npm:babel-template@6.26.0",
        "babel-code-frame": "npm:babel-code-frame@6.26.0",
        "slash": "npm:slash@1.0.0",
        "path-is-absolute": "npm:path-is-absolute@1.0.1",
        "convert-source-map": "npm:convert-source-map@1.5.0",
        "private": "npm:private@0.1.7",
        "source-map": "npm:source-map@0.5.7",
        "debug": "npm:debug@2.6.8",
        "minimatch": "npm:minimatch@3.0.4"
      }
    },
    "npm:babel-generator@6.26.0": {
      "map": {
        "lodash": "npm:lodash@4.17.4",
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "trim-right": "npm:trim-right@1.0.1",
        "detect-indent": "npm:detect-indent@4.0.0",
        "source-map": "npm:source-map@0.5.7",
        "jsesc": "npm:jsesc@1.3.0"
      }
    },
    "npm:babel-register@6.26.0": {
      "map": {
        "babel-core": "npm:babel-core@6.26.0",
        "core-js": "npm:core-js@2.5.1",
        "lodash": "npm:lodash@4.17.4",
        "mkdirp": "npm:mkdirp@0.5.1",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "source-map-support": "npm:source-map-support@0.4.18",
        "home-or-tmp": "npm:home-or-tmp@2.0.0"
      }
    },
    "npm:babel-traverse@6.26.0": {
      "map": {
        "babylon": "npm:babylon@6.18.0",
        "invariant": "npm:invariant@2.2.2",
        "lodash": "npm:lodash@4.17.4",
        "babel-messages": "npm:babel-messages@6.23.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-code-frame": "npm:babel-code-frame@6.26.0",
        "debug": "npm:debug@2.6.8",
        "globals": "npm:globals@9.18.0"
      }
    },
    "npm:babel-helper-define-map@6.26.0": {
      "map": {
        "lodash": "npm:lodash@4.17.4",
        "babel-helper-function-name": "npm:babel-helper-function-name@6.24.1",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0"
      }
    },
    "npm:worker-farm@1.5.0": {
      "map": {
        "errno": "npm:errno@0.1.4",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:envinfo@3.4.1": {
      "map": {
        "which": "npm:which@1.3.0",
        "os-name": "npm:os-name@2.0.1",
        "minimist": "npm:minimist@1.2.0"
      }
    },
    "npm:babel-plugin-transform-es2015-modules-commonjs@6.26.0": {
      "map": {
        "babel-plugin-transform-strict-mode": "npm:babel-plugin-transform-strict-mode@6.24.1",
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-template": "npm:babel-template@6.26.0"
      }
    },
    "npm:babel-helper-builder-react-jsx@6.26.0": {
      "map": {
        "babel-types": "npm:babel-types@6.26.0",
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "esutils": "npm:esutils@2.0.2"
      }
    },
    "npm:babel-plugin-transform-object-rest-spread@6.26.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-plugin-syntax-object-rest-spread": "npm:babel-plugin-syntax-object-rest-spread@6.13.0"
      }
    },
    "npm:babel-helper-regex@6.26.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "lodash": "npm:lodash@4.17.4"
      }
    },
    "npm:babel-types@6.26.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "lodash": "npm:lodash@4.17.4",
        "esutils": "npm:esutils@2.0.2",
        "to-fast-properties": "npm:to-fast-properties@1.0.3"
      }
    },
    "npm:babel-runtime@6.26.0": {
      "map": {
        "regenerator-runtime": "npm:regenerator-runtime@0.11.0",
        "core-js": "npm:core-js@2.5.1"
      }
    },
    "npm:babel-template@6.26.0": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-traverse": "npm:babel-traverse@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "babylon": "npm:babylon@6.18.0",
        "lodash": "npm:lodash@4.17.4"
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
    "npm:babel-code-frame@6.26.0": {
      "map": {
        "chalk": "npm:chalk@1.1.3",
        "js-tokens": "npm:js-tokens@3.0.2",
        "esutils": "npm:esutils@2.0.2"
      }
    },
    "npm:source-map-support@0.4.18": {
      "map": {
        "source-map": "npm:source-map@0.5.7"
      }
    },
    "npm:babel-plugin-transform-regenerator@6.26.0": {
      "map": {
        "regenerator-transform": "npm:regenerator-transform@0.10.1"
      }
    },
    "npm:tape@4.8.0": {
      "map": {
        "glob": "npm:glob@7.1.2",
        "minimist": "npm:minimist@1.2.0",
        "through": "npm:through@2.3.8",
        "inherits": "npm:inherits@2.0.3",
        "for-each": "npm:for-each@0.3.2",
        "defined": "npm:defined@1.0.0",
        "resumer": "npm:resumer@0.0.0",
        "has": "npm:has@1.0.1",
        "function-bind": "npm:function-bind@1.1.1",
        "string.prototype.trim": "npm:string.prototype.trim@1.1.2",
        "deep-equal": "npm:deep-equal@1.0.1",
        "object-inspect": "npm:object-inspect@1.3.0",
        "resolve": "npm:resolve@1.4.0"
      }
    },
    "npm:regenerator-transform@0.10.1": {
      "map": {
        "babel-runtime": "npm:babel-runtime@6.26.0",
        "babel-types": "npm:babel-types@6.26.0",
        "private": "npm:private@0.1.7"
      }
    },
    "npm:accepts@1.3.4": {
      "map": {
        "mime-types": "npm:mime-types@2.1.17",
        "negotiator": "npm:negotiator@0.6.1"
      }
    },
    "npm:os-name@2.0.1": {
      "map": {
        "win-release": "npm:win-release@1.1.1",
        "macos-release": "npm:macos-release@1.1.0"
      }
    },
    "npm:win-release@1.1.1": {
      "map": {
        "semver": "npm:semver@5.4.1"
      }
    },
    "npm:chalk@2.1.0": {
      "map": {
        "escape-string-regexp": "npm:escape-string-regexp@1.0.5",
        "ansi-styles": "npm:ansi-styles@3.2.0",
        "supports-color": "npm:supports-color@4.4.0"
      }
    },
    "npm:browserify-aes@1.0.8": {
      "map": {
        "cipher-base": "npm:cipher-base@1.0.4",
        "create-hash": "npm:create-hash@1.1.3",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:pbkdf2@3.0.14": {
      "map": {
        "create-hash": "npm:create-hash@1.1.3",
        "create-hmac": "npm:create-hmac@1.1.6",
        "ripemd160": "npm:ripemd160@2.0.1",
        "sha.js": "npm:sha.js@2.4.8",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:exec-sh@0.2.1": {
      "map": {
        "merge": "npm:merge@1.2.0"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.1",
        "md5.js": "npm:md5.js@1.3.4"
      }
    },
    "npm:resumer@0.0.0": {
      "map": {
        "through": "npm:through@2.3.8"
      }
    },
    "npm:has@1.0.1": {
      "map": {
        "function-bind": "npm:function-bind@1.1.1"
      }
    },
    "npm:string.prototype.trim@1.1.2": {
      "map": {
        "function-bind": "npm:function-bind@1.1.1",
        "define-properties": "npm:define-properties@1.1.2",
        "es-abstract": "npm:es-abstract@1.8.2"
      }
    },
    "npm:mime-types@2.1.17": {
      "map": {
        "mime-db": "npm:mime-db@1.30.0"
      }
    },
    "npm:md5.js@1.3.4": {
      "map": {
        "hash-base": "npm:hash-base@3.0.4",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:for-each@0.3.2": {
      "map": {
        "is-function": "npm:is-function@1.0.1"
      }
    },
    "npm:regex-cache@0.4.4": {
      "map": {
        "is-equal-shallow": "npm:is-equal-shallow@0.1.3"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.1"
      }
    },
    "npm:supports-color@4.4.0": {
      "map": {
        "has-flag": "npm:has-flag@2.0.0"
      }
    },
    "npm:resolve@1.4.0": {
      "map": {
        "path-parse": "npm:path-parse@1.0.5"
      }
    },
    "npm:es-abstract@1.8.2": {
      "map": {
        "function-bind": "npm:function-bind@1.1.1",
        "has": "npm:has@1.0.1",
        "is-regex": "npm:is-regex@1.0.4",
        "es-to-primitive": "npm:es-to-primitive@1.1.1",
        "is-callable": "npm:is-callable@1.1.3"
      }
    },
    "npm:define-properties@1.1.2": {
      "map": {
        "foreach": "npm:foreach@2.0.5",
        "object-keys": "npm:object-keys@1.0.11"
      }
    },
    "npm:is-regex@1.0.4": {
      "map": {
        "has": "npm:has@1.0.1"
      }
    },
    "npm:es-to-primitive@1.1.1": {
      "map": {
        "is-callable": "npm:is-callable@1.1.3",
        "is-date-object": "npm:is-date-object@1.0.1",
        "is-symbol": "npm:is-symbol@1.0.1"
      }
    },
    "npm:react-md@1.1.0": {
      "map": {
        "classnames": "npm:classnames@2.2.5",
        "invariant": "npm:invariant@2.2.2",
        "react-motion": "npm:react-motion@0.5.1",
        "resize-observer-polyfill": "npm:resize-observer-polyfill@1.4.2",
        "react-swipeable-views": "npm:react-swipeable-views@0.12.8",
        "prop-types": "npm:prop-types@15.5.10",
        "react-prop-types": "npm:react-prop-types@0.4.0",
        "react-transition-group": "npm:react-transition-group@1.1.3"
      }
    },
    "npm:react@15.6.1": {
      "map": {
        "create-react-class": "npm:create-react-class@15.6.0",
        "fbjs": "npm:fbjs@0.8.12",
        "prop-types": "npm:prop-types@15.5.10",
        "loose-envify": "npm:loose-envify@1.3.1",
        "object-assign": "npm:object-assign@4.1.1"
      }
    }
  }
});
