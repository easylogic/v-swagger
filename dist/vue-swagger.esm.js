var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer_1,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

var btoa_1 = btoa;

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

var btoa$1 = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || btoa_1;

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa$1(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies$$1 = cookies;

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies$$1.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults_1, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults_1, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var default_1 = axios;
axios_1.default = default_1;

var axios$1 = axios_1;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

(function () {
    if (typeof document !== 'undefined') {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            css = "table[data-v-602a81a0] { display: table; border: 0px; margin: 0px; border-collapse: collapse; width: 100%; padding: 0 10px; } table tr[data-v-602a81a0], table td[data-v-602a81a0], table th[data-v-602a81a0] { border: 0px; background-color: transparent; padding: 0.6em 0em; } table th[data-v-602a81a0] { font-size: 12px; font-weight: 700; padding: 12px 0; text-align: left; border-bottom: 1px solid rgba(59, 65, 81, 0.2); font-family: sans-serif; color: #3b4151; } .source[data-v-602a81a0] { color: gray; font-size: 11px; } .section-header[data-v-602a81a0] { padding: 8px 20px; min-height: 50px; background: rgba(255, 255, 255, 0.8); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); display: flex; align-items: center; box-sizing: border-box; } .section-header .tab-header[data-v-602a81a0] { display: flex; flex: 1; } .section-header .tab-header h1[data-v-602a81a0] { font-size: 14px; flex: 1; margin: 0; font-family: sans-serif; color: #3b4151; } .table-container[data-v-602a81a0] { padding: 20px; } .btn[data-v-602a81a0] { font-size: 14px; font-weight: 700; padding: 5px 23px; transition: all .3s; border: 2px solid gray; border-radius: 4px; background: transparent; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); font-family: sans-serif; color: #3b4151; cursor: pointer; } .btn.cancel[data-v-602a81a0] { border-color: #ff6060; background-color: transparent; font-family: sans-serif; color: #ff6060; } .btn.execute[data-v-602a81a0] { background-color: #4990e2; color: #fff; border-color: #4990e2; } .execute-wrapper .btn[data-v-602a81a0] { width: 100%; padding: 8px 40px; } .parameter-name[data-v-602a81a0] { font-size: 16px; font-weight: 700; font-family: sans-serif; color: #3b4151; vertical-align: middle; } .parameter-name .required[data-v-602a81a0] { font-size: 10px; padding: 5px; vertical-align: middle; color: rgba(255, 0, 0, 0.6); } .parameter-type[data-v-602a81a0] { font-size: 12px; padding: 5px 0; font-family: monospace; font-weight: 600; color: #3b4151; } .data[data-v-602a81a0] { font-size: 12px; } .vtop[data-v-602a81a0] { vertical-align: top; } .value-input[data-v-602a81a0] { margin-top: 2px; } .value-input input[type=text][data-v-602a81a0] { padding: 8px 10px; border-radius: 4px; border: 1px solid #ececec; width: 240px; } .value-input textarea[data-v-602a81a0] { padding: 8px 10px; border-radius: 4px; border: 1px solid #ececec; width: 90%; height: 110px; max-width: 100%; } .value-input .title[data-v-602a81a0] { font-size: 12px; font-weight: 700; margin-bottom: 5px; } .value-input select[data-v-602a81a0] { font-size: 14px; font-weight: 700; padding: 5px 40px 5px 10px; height: 34px; width: 180px; box-sizing: border-box; border: 2px solid #41444e; border-radius: 4px; background: #f7f7f7 url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICAgIDxwYXRoIGQ9Ik0xMy40MTggNy44NTljLjI3MS0uMjY4LjcwOS0uMjY4Ljk3OCAwIC4yNy4yNjguMjcyLjcwMSAwIC45NjlsLTMuOTA4IDMuODNjLS4yNy4yNjgtLjcwNy4yNjgtLjk3OSAwbC0zLjkwOC0zLjgzYy0uMjctLjI2Ny0uMjctLjcwMSAwLS45NjkuMjcxLS4yNjguNzA5LS4yNjguOTc4IDBMMTAgMTFsMy40MTgtMy4xNDF6Ii8+PC9zdmc+\") right 10px center no-repeat; background-size: 20px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25); font-family: Titillium Web,sans-serif; color: #3b4151; appearance: none; -webkit-appearance: none; -moz-appearance: none; } .params[data-v-602a81a0] { margin-top: 5px; } .params .param-item span[data-v-602a81a0] { font-size: 12px; margin-right: 10px; font-weight: 700; } .copy-result[data-v-602a81a0] { display: inline-block; margin-right: 15px; } .copy-result.success[data-v-602a81a0] { color: #4990e2; } .response[data-v-602a81a0] { font-size: 12px; height: 200px; overflow: auto; margin-bottom: 10px; } .response pre[data-v-602a81a0] { padding: 10px; background-color: transparent; } ";style.type = 'text/css';if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }head.appendChild(style);
    }
})();

var ParamsTable = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "parameters" }, [_c('div', { staticClass: "section-header" }, [_vm._m(0), _vm._v(" "), !_vm.execute ? _c('div', { staticClass: "try-out" }, [_c('button', { staticClass: "btn", on: { "click": function click($event) {
                    _vm.execute = true;
                } } }, [_vm._v("Try it out ")])]) : _vm._e(), _vm._v(" "), _vm.execute ? _c('div', { staticClass: "try-out" }, [_c('button', { staticClass: "btn cancel", on: { "click": function click($event) {
                    _vm.execute = false;
                } } }, [_vm._v("Cancel")])]) : _vm._e()]), _vm._v(" "), _c('div', { staticClass: "table-container" }, [_c('table', [_vm._m(1), _vm._v(" "), _vm._l(_vm.dataParameters, function (item, index) {
            return _c('tr', { key: index }, [_c('td', { staticClass: "vtop" }, [_c('div', { staticClass: "parameter-name" }, [_vm._v(_vm._s(item.key)), item.required ? _c('span', { staticClass: "required" }, [_vm._v("* required")]) : _vm._e()]), _vm._v(" "), item.type ? _c('div', { staticClass: "parameter-type" }, [_vm._v(_vm._s(item.type))]) : _vm._e(), _vm._v(" "), _c('div', { staticClass: "source" }, [_vm._v("(" + _vm._s(item.source) + ")")])]), _vm._v(" "), _c('td', { staticClass: "vtop" }, [item.description ? _c('div', { staticClass: "description" }, [_vm._v(_vm._s(item.description))]) : _vm._e(), _vm._v(" "), item.dataValue && !_vm.isExecute ? _c('div', { staticClass: "data" }, [_c('pre', [_vm._v(_vm._s(item.dataValue))])]) : _vm._e(), _vm._v(" "), _vm.isExecute && item.source !== 'body' ? _c('div', { staticClass: "value-input" }, [item.items ? _c('select', { directives: [{ name: "model", rawName: "v-model", value: item.inputValue, expression: "item.inputValue" }], on: { "change": function change($event) {
                        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                            return o.selected;
                        }).map(function (o) {
                            var val = "_value" in o ? o._value : o.value;return val;
                        });_vm.$set(item, "inputValue", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                    } } }, _vm._l(item.items, function (enumData, selectedItemIndex) {
                return _c('option', { key: selectedItemIndex, attrs: { "selected": "enumData.selected" }, domProps: { "value": enumData.value } }, [_vm._v(_vm._s(enumData.text))]);
            })) : item.source === 'header' && item.params.length ? _c('div', { staticClass: "params" }, _vm._l(item.params, function (param, paramIndex) {
                return _c('div', { key: paramIndex, staticClass: "param-item" }, [_c('span', [_vm._v(_vm._s(param.key))]), _vm._v(" "), _c('input', { directives: [{ name: "model", rawName: "v-model", value: param.value, expression: "param.value" }], attrs: { "type": "text", "placeholder": _vm.getPlaceholder(param) }, domProps: { "value": param.value }, on: { "input": function input($event) {
                            if ($event.target.composing) {
                                return;
                            }_vm.$set(param, "value", $event.target.value);
                        } } })]);
            })) : _c('input', { directives: [{ name: "model", rawName: "v-model", value: item.inputValue, expression: "item.inputValue" }], attrs: { "type": "text", "placeholder": _vm.getPlaceholder(item) }, domProps: { "value": item.inputValue }, on: { "input": function input($event) {
                        if ($event.target.composing) {
                            return;
                        }_vm.$set(item, "inputValue", $event.target.value);
                    } } })]) : _vm._e(), _vm._v(" "), _vm.isExecute && item.source === 'body' ? _c('div', { staticClass: "value-input" }, [_c('textarea', { directives: [{ name: "model", rawName: "v-model", value: item.dataValue, expression: "item.dataValue" }], attrs: { "placeholder": _vm.getPlaceholder(item) }, domProps: { "value": item.dataValue }, on: { "input": function input($event) {
                        if ($event.target.composing) {
                            return;
                        }_vm.$set(item, "dataValue", $event.target.value);
                    } } })]) : _vm._e(), _vm._v(" "), item.contentType ? _c('div', { staticClass: "value-input" }, [_c('div', { staticClass: "title" }, [_vm._v("Parameter content type")]), _vm._v(" "), _c('select', { directives: [{ name: "model", rawName: "v-model", value: item.contentType, expression: "item.contentType" }], on: { "change": function change($event) {
                        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                            return o.selected;
                        }).map(function (o) {
                            var val = "_value" in o ? o._value : o.value;return val;
                        });_vm.$set(item, "contentType", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
                    } } }, [_c('option', { domProps: { "value": item.contentType } }, [_vm._v(_vm._s(item.contentType))])])]) : _vm._e()])]);
        }), _vm._v(" "), _vm.params.length === 0 ? _c('tr', [_c('td', { attrs: { "colspan": "2" } }, [_vm._v("No Parameters.")])]) : _vm._e()], 2), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isExecute, expression: "isExecute" }], staticClass: "execute-wrapper" }, [_c('button', { staticClass: "btn execute", on: { "click": _vm.runApi } }, [_vm._v("Execute")])])]), _vm._v(" "), _vm.lastResponseData ? _c('div', { staticClass: "section-header" }, [_vm._m(2), _vm._v(" "), _c('div', { staticClass: "try-out" }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.showCopyResult, expression: "showCopyResult" }], class: { 'copy-result': true, success: _vm.isCopySuccess } }, [_vm._v("Successfully copied")]), _vm._v(" "), _c('button', { staticClass: "btn", on: { "click": _vm.copyToClipboard } }, [_vm._v("Copy")])])]) : _vm._e(), _vm._v(" "), _vm.lastResponseData ? _c('div', [_c('div', { staticClass: "response" }, [_c('pre', { attrs: { "id": "responseData" } }, [_vm._v(_vm._s(JSON.stringify(_vm.lastResponseData, null, 4)))])])]) : _vm._e()]);
    }, staticRenderFns: [function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "tab-header" }, [_c('h1', [_vm._v("Parameters")])]);
    }, function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('tr', [_c('th', [_vm._v("Name")]), _vm._v(" "), _c('th', [_vm._v("Description")])]);
    }, function () {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "tab-header" }, [_c('h1', [_vm._v("Response")])]);
    }], _scopeId: 'data-v-602a81a0',
    props: ['params'],
    data: function data() {
        return {
            execute: false,
            lastResponseData: null,
            dataParameters: this.params || [],
            isCopySuccess: false,
            showCopyResult: false
        };
    },

    computed: {
        isExecute: function isExecute() {
            return this.execute;
        }
    },
    methods: {
        runApi: function () {
            var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var call, url, config, response;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    var this$1 = this;

                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                call = axios$1.create();
                                url = [this$1.$parent.apiObj.host, this$1.getUrl()].join('');
                                config = {
                                    url: url,
                                    method: this$1.$parent.method,
                                    headers: this$1.getHeaders(),
                                    params: this$1.getParams(),
                                    data: this$1.getData()
                                };
                                _context.next = 5;
                                return call.request(config);

                            case 5:
                                response = _context.sent;

                                this$1.lastResponseData = response.data;

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function runApi() {
                return _ref.apply(this, arguments);
            }

            return runApi;
        }(),
        getData: function getData() {
            var body = {};

            body = this.dataParameters.filter(function (it) {
                return it.source.includes('body');
            })[0];

            if (!body) { return {}; }

            return JSON.parse(body.dataValue) || {};
        },
        getParams: function getParams() {
            var params = {};

            this.dataParameters.filter(function (it) {
                return it.source.includes('query');
            }).forEach(function (it) {
                params[it.key] = it.inputValue;
            });

            return params;
        },
        getUrl: function getUrl() {

            var url = this.$parent.url;

            this.dataParameters.filter(function (it) {
                return it.source.includes('path');
            }).forEach(function (it) {
                url = url.replace(new RegExp('{' + it.key + '}', 'g'), it.inputValue || '');
            });

            return url;
        },
        getHeaders: function getHeaders() {
            var _this = this;

            var headers = {};

            this.dataParameters.filter(function (it) {
                return it.source.includes('header');
            }).forEach(function (it) {
                headers[it.key] = _this.getHeadersByVariable(it);
            });

            return headers;
        },
        getHeadersByVariable: function getHeadersByVariable(it) {

            if (it.params.length) {
                var description = it.description;
                it.params.forEach(function (p) {
                    description = description.replace(new RegExp('{{' + p.key + '}}', 'g'), p.value || '');
                });

                return description;
            }

            return it.inputValue;
        },
        getValue: function getValue(item) {
        },
        getPlaceholder: function getPlaceholder(item) {
            var arr = [item.key, item.description];

            return arr.join(' - ');
        },
        copyToClipboard: function () {
            var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
                var _this2 = this;

                var textData, el;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    var this$1 = this;

                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                textData = JSON.stringify(this$1.lastResponseData, null, 4);

                                if (navigator.clipboard) {
                                    _context2.next = 10;
                                    break;
                                }

                                el = document.getElementById('clipboard-area');

                                if (!el) {
                                    el = document.createElement('textarea');
                                    el.id = 'clipboard-area';
                                    el.style.position = 'absolute';
                                    el.style.left = '-10000px';
                                    event.target.parentElement.appendChild(el);
                                }
                                el.value = textData;
                                el.select();
                                document.execCommand('copy');
                                _context2.next = 12;
                                break;

                            case 10:
                                _context2.next = 12;
                                return navigator.clipboard.writeText(textData);

                            case 12:

                                this$1.isCopySuccess = true;
                                this$1.showCopyResult = true;
                                setTimeout(function () {
                                    return _this2.showCopyResult = false;
                                }, 1000);
                                _context2.next = 20;
                                break;

                            case 17:
                                _context2.prev = 17;
                                _context2.t0 = _context2['catch'](0);

                                this$1.isCopySuccess = false;

                            case 20:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 17]]);
            }));

            function copyToClipboard(_x) {
                return _ref2.apply(this, arguments);
            }

            return copyToClipboard;
        }()
    }
};

(function () {
    if (typeof document !== 'undefined') {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            css = ".request[data-v-d3531974] { border: 1px solid #000; border-radius: 4px; margin: 0 0 15px; } .request .request-item[data-v-d3531974] { padding: 5px; cursor: pointer; display: flex; align-items: center; } .request.post[data-v-d3531974] { border-color: #49cc90; background: rgba(73, 204, 144, 0.1); } .request.post .method[data-v-d3531974] { background: #49cc90; } .request.put[data-v-d3531974] { border-color: #fca130; background: rgba(252, 161, 48, 0.1); } .request.put .method[data-v-d3531974] { background: #fca130; } .request.get[data-v-d3531974] { border-color: #61affe; background: rgba(97, 175, 254, 0.1); } .request.get .method[data-v-d3531974] { background: #61affe; } .request.delete[data-v-d3531974] { border-color: #f93e3e; background: rgba(249, 62, 62, 0.1); } .request.delete .method[data-v-d3531974] { background: #f93e3e; } .request .method[data-v-d3531974] { font-size: 14px; font-weight: 700; min-width: 80px; padding: 6px 15px; text-align: center; border-radius: 3px; background: #000; text-shadow: 0 1px 0 rgba(0, 0, 0, 0.1); font-family: sans-serif; color: #fff; text-transform: uppercase; box-sizing: border-box; } .request .path[data-v-d3531974] { font-size: 16px; display: flex; flex: 0 3 auto; align-items: center; word-break: break-all; padding: 0 10px; font-family: monospace; font-weight: 600; color: #3b4151; box-sizing: border-box; } .request .description[data-v-d3531974] { font-size: 13px; flex: 1; font-family: sans-serif; color: #3b4151; } ";style.type = 'text/css';if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }head.appendChild(style);
    }
})();

var request = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: ['request', _vm.method.toLowerCase(), _vm.isOpened] }, [_c('div', { class: ['request-item'], on: { "click": function click($event) {
                    _vm.open = !_vm.open;
                } } }, [_c('span', { staticClass: "method" }, [_vm._v(_vm._s(_vm.method))]), _vm._v(" "), _c('span', { staticClass: "path" }, [_vm._v(_vm._s(_vm.url))]), _vm._v(" "), _c('span', { staticClass: "description" }, [_vm._v(_vm._s(_vm.description))])]), _vm._v(" "), _c('params-table', { directives: [{ name: "show", rawName: "v-show", value: _vm.open, expression: "open" }], attrs: { "params": _vm.sourceList } })], 1);
    }, staticRenderFns: [], _scopeId: 'data-v-d3531974',
    props: {
        description: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: '/'
        },
        params: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        headers: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        path: {
            type: Array,
            default: function _default() {
                return [];
            }
        },
        body: {
            type: Object,
            default: function _default() {
                return {};
            }
        },
        method: {
            type: String,
            default: 'GET'
        }
    },

    components: {
        ParamsTable: ParamsTable
    },

    data: function data() {
        return {
            open: false,
            apiObj: this.$parent.apiObj,
            dataHeaders: this.parseHeaders(this.headers),
            dataBody: this.parseBody(this.body),
            dataPath: this.parsePath(this.path),
            dataQuery: this.parseQuery(this.params)
        };
    },

    computed: {
        isOpened: function isOpened() {
            return this.open;
        },
        host: function host() {
            return this.$parent.host;
        },
        sourceList: function sourceList() {
            return [].concat(this.dataPath, this.dataHeaders, this.dataBody, this.dataQuery);
        }
    },
    methods: {
        parsePath: function parsePath() {
            var _this = this;

            var paths = this.url.split('/').filter(function (it) {
                return it.indexOf('{') === 0 && it.indexOf('}') === it.length - 1;
            }).map(function (it) {
                return it.replace(/\{/g, '').replace(/\}/g, '');
            });

            return paths.map(function (key) {

                var obj = _this.path.filter(function (it) {
                    return it.key === key;
                })[0];

                if (!obj) {
                    obj = { key: key, value: '' };
                }

                if (typeof obj === 'string') {
                    obj = { key: key, value: obj };
                }

                return Object.assign({
                    source: 'path',
                    required: true,
                    type: 'string',
                    description: ''
                }, _this.parseItems(obj));
            });
        },


        /**
         * request headers
         * 
         * {
         *  Authorization: 'Bearer {{access_token}}'
         * }
         * 
         * {{xxx}} 로 시작되는건 외부에서 입력받을 수 있는 변수로 대체됨 
         * 
         */
        parseHeaders: function parseHeaders(headers) {
            var _this2 = this;

            return headers.map(function (obj) {

                obj.params = _this2.parseHeaderValue(obj.description);

                return Object.assign({
                    source: 'header',
                    type: 'string',
                    required: true,
                    description: ''
                }, _this2.parseItems(obj));
            });
        },

        /**
         * body 
         * 
         * {
         *  data : { a: 1, b: 2, c: 3 },
         *  contentType: 'application/json' 
         * }
         * 
         * or 
         * 
         * {
         *  data : "{ a: 1, b: 2, c: 3 }",
         *  contentType: 'text/plain' 
         * }
         * 
         */
        parseBody: function parseBody(body) {

            if (!body.data) { return []; }

            if (typeof body.data === 'string') {
                body.dataValue = body.data + "";
            } else if (_typeof(body.data) === 'object') {
                body.dataValue = JSON.stringify(body.data, null, 4);
            }

            return [Object.assign({
                source: 'body',
                key: 'body',
                contentType: 'application/json',
                required: false,
                description: ''
            }, body)];
        },


        /**
         * query string 
         * 
         * [
         *   { key : 'xxx', value : 'xxx', type: 'string', defalut: 'xxx' , description : 'xxx', required: true },
         * ]
         * 
         */
        parseQuery: function parseQuery(params) {
            var _this3 = this;

            return Object.keys(params).map(function (key) {

                var obj = params[key];

                if (typeof obj === 'string') {
                    obj = { key: key, value: obj };
                }

                return Object.assign({
                    source: 'query',
                    type: 'string',
                    required: false,
                    description: ''
                }, _this3.parseItems(obj));
            });
        },
        parseHeaderValue: function parseHeaderValue(headerValue) {
            var arr = headerValue.match(/\{\{(.*)\}\}/g);
            return arr.map(function (it) {
                var key = it.replace(/\{/g, '').replace(/\}/g, '');
                return { key: key, value: '' };
            });
        },
        parseItems: function parseItems(item) {
            if (!item.items) { return item; }

            item.items = (item.items || []).map(function (it, index) {

                if (typeof it === 'string') {
                    it = { text: it, value: it };
                }

                if (index === 0) {
                    it.selected = true;
                    item.inputValue = it.value;
                }

                return it;
            });

            return item;
        }
    }
};

(function () {
    if (typeof document !== 'undefined') {
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style'),
            css = ".api[data-v-3ab0010c] { /* background-color: yellow; */ } .api .header[data-v-3ab0010c] { display: flex; align-items: center; padding: 10px 20px 10px 10px; cursor: pointer; transition: all .2s; border-bottom: 1px solid rgba(59, 65, 81, 0.3); font-size: 24px; margin: 0 0 5px; font-family: sans-serif; color: #3b4151; } .api .header .host[data-v-3ab0010c] { font-size: 14px; font-weight: 400; padding: 0 10px; font-family: sans-serif; color: #3b4151; flex: 1; } .api .header .title[data-v-3ab0010c] { font-weight: 700; } .api .header .description[data-v-3ab0010c] { font-size: 14px; font-weight: 400; flex: 1; padding: 0 10px; font-family: sans-serif; color: #3b4151; text-align: right; } ";style.type = 'text/css';if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }head.appendChild(style);
    }
})();

var component = { render: function render() {
        var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "api" }, [_c('div', { staticClass: "header", on: { "click": function click($event) {
                    _vm.open = !_vm.open;
                } } }, [_c('span', { staticClass: "title" }, [_vm._v(_vm._s(_vm.apiObj.title))]), _vm._v(" "), _c('span', { staticClass: "host" }, [_vm._v(_vm._s(_vm.apiObj.host))]), _vm._v(" "), _c('span', { staticClass: "description" }, [_vm._v(_vm._s(_vm.apiObj.description))])]), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.isOpen, expression: "isOpen" }], staticClass: "table" }, [_vm._t("default"), _vm._v(" "), _vm._l(_vm.apiObj.request, function (item, index) {
            return _c('request', { key: index, attrs: { "method": item.method, "url": item.url, "description": item.description, "headers": item.headers, "path": item.path, "params": item.params, "body": item.body } });
        })], 2)]);
    }, staticRenderFns: [], _scopeId: 'data-v-3ab0010c',
    props: ['host', 'opened', 'title', 'description', 'target'],
    data: function data() {

        var apiObj = {
            host: this.host,
            title: this.title,
            description: this.description,
            opened: this.opened
        };
        return {
            apiObj: apiObj,
            open: apiObj.opened || false
        };
    },

    computed: {
        isOpen: function isOpen() {
            return this.open;
        }
    },
    components: {
        request: request
    }
};

function install(Vue) {
  if (install.installed) { return; }

  install.installed = true;

  Vue.component('VueSwagger', component);
}

var plugin = {
  install: install
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default component;
export { install };
//# sourceMappingURL=vue-swagger.esm.js.map
