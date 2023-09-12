(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pub-sub-es'), require('regl')) :
  typeof define === 'function' && define.amd ? define(['exports', 'pub-sub-es', 'regl'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.createScatterplot = {}, global.createPubSub, global.createREGL));
})(this, (function (exports, createPubSub, createOriginalRegl) { 'use strict';

  function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

  var createPubSub__default = /*#__PURE__*/_interopDefaultCompat(createPubSub);
  var createOriginalRegl__default = /*#__PURE__*/_interopDefaultCompat(createOriginalRegl);

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
      i = arguments.length;
    while (i--) {
      y += arguments[i] * arguments[i];
    }
    return Math.sqrt(y);
  };

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$2() {
    var out = new ARRAY_TYPE(16);
    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }
    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */

  function clone(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function invert(out, a) {
    var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
      return null;
    }
    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function multiply(out, a, b) {
    var a00 = a[0],
      a01 = a[1],
      a02 = a[2],
      a03 = a[3];
    var a10 = a[4],
      a11 = a[5],
      a12 = a[6],
      a13 = a[7];
    var a20 = a[8],
      a21 = a[9],
      a22 = a[10],
      a23 = a[11];
    var a30 = a[12],
      a31 = a[13],
      a32 = a[14],
      a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
      b1 = b[1],
      b2 = b[2],
      b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Translation vector
   * @returns {mat4} out
   */

  function fromTranslation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Scaling vector
   * @returns {mat4} out
   */

  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */

  function fromRotation(out, rad, axis) {
    var x = axis[0],
      y = axis[1],
      z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    if (len < EPSILON) {
      return null;
    }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c; // Perform rotation-specific matrix multiplication

    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$1() {
    var out = new ARRAY_TYPE(4);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }
    return out;
  }
  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec4} out
   */

  function transformMat4(out, a, m) {
    var x = a[0],
      y = a[1],
      z = a[2],
      w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  (function () {
    var vec = create$1();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 4;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }
      return a;
    };
  })();

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create() {
    var out = new ARRAY_TYPE(2);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }
    return out;
  }
  /**
   * Get the angle between two 2D vectors
   * @param {ReadonlyVec2} a The first operand
   * @param {ReadonlyVec2} b The second operand
   * @returns {Number} The angle in radians
   */

  function angle(a, b) {
    var x1 = a[0],
      y1 = a[1],
      x2 = b[0],
      y2 = b[1],
      // mag is the product of the magnitudes of a and b
      mag = Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2),
      // mag &&.. short circuits if mag == 0
      cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  (function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;
      if (!stride) {
        stride = 2;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }
      return a;
    };
  })();

  const createCamera = (initTarget = [0, 0], initDistance = 1, initRotation = 0, initViewCenter = [0, 0], initScaleBounds = [[0, Infinity], [0, Infinity]], initTranslationBounds = [[-Infinity, Infinity], [-Infinity, Infinity]]) => {
    // Scratch variables
    const scratch0 = new Float32Array(16);
    const scratch1 = new Float32Array(16);
    const scratch2 = new Float32Array(16);
    let view = create$2();
    let viewCenter = [...initViewCenter.slice(0, 2), 0, 1];
    const scaleXBounds = Array.isArray(initScaleBounds[0]) ? [...initScaleBounds[0]] : [...initScaleBounds];
    const scaleYBounds = Array.isArray(initScaleBounds[0]) ? [...initScaleBounds[1]] : [...initScaleBounds];
    const translationXBounds = Array.isArray(initTranslationBounds[0]) ? [...initTranslationBounds[0]] : [...initTranslationBounds];
    const translationYBounds = Array.isArray(initTranslationBounds[0]) ? [...initTranslationBounds[1]] : [...initTranslationBounds];
    const getScaling$1 = () => getScaling(scratch0, view).slice(0, 2);
    const getMinScaling = () => {
      const scaling = getScaling$1();
      return Math.min(scaling[0], scaling[1]);
    };
    const getMaxScaling = () => {
      const scaling = getScaling$1();
      return Math.max(scaling[0], scaling[1]);
    };
    const getRotation = () => Math.acos(view[0] / getMaxScaling());
    const getScaleBounds = () => [[...scaleXBounds], [...scaleYBounds]];
    const getTranslationBounds = () => [[...translationXBounds], [...translationYBounds]];
    const getDistance = () => {
      const scaling = getScaling$1();
      return [1 / scaling[0], 1 / scaling[1]];
    };
    const getMinDistance = () => 1 / getMinScaling();
    const getMaxDistance = () => 1 / getMaxScaling();
    const getTranslation$1 = () => getTranslation(scratch0, view).slice(0, 2);
    const getTarget = () => transformMat4(scratch0, viewCenter, invert(scratch2, view)).slice(0, 2);
    const getView = () => view;
    const getViewCenter = () => viewCenter.slice(0, 2);
    const lookAt = ([x = 0, y = 0] = [], newDistance = 1, newRotation = 0) => {
      // Reset the view
      view = create$2();
      translate([-x, -y]);
      rotate(newRotation);
      scale(1 / newDistance);
    };
    const translate = ([x = 0, y = 0] = []) => {
      scratch0[0] = x;
      scratch0[1] = y;
      scratch0[2] = 0;
      const t = fromTranslation(scratch1, scratch0);

      // Translate about the viewport center
      // This is identical to `i * t * i * view` where `i` is the identity matrix
      multiply(view, t, view);
    };
    const scale = (d, mousePos) => {
      const isArray = Array.isArray(d);
      let dx = isArray ? d[0] : d;
      let dy = isArray ? d[1] : d;
      if (dx <= 0 || dy <= 0 || dx === 1 && dy === 1) return;
      const scaling = getScaling$1();
      const newXScale = scaling[0] * dx;
      const newYScale = scaling[1] * dy;
      dx = Math.max(scaleXBounds[0], Math.min(newXScale, scaleXBounds[1])) / scaling[0];
      dy = Math.max(scaleYBounds[0], Math.min(newYScale, scaleYBounds[1])) / scaling[1];
      if (dx === 1 && dy === 1) return; // There is nothing to do

      scratch0[0] = dx;
      scratch0[1] = dy;
      scratch0[2] = 1;
      const s = fromScaling(scratch1, scratch0);
      const scaleCenter = mousePos ? [...mousePos, 0] : viewCenter;
      const a = fromTranslation(scratch0, scaleCenter);

      // Translate about the scale center
      // I.e., the mouse position or the view center
      multiply(view, a, multiply(view, s, multiply(view, invert(scratch2, a), view)));
    };
    const rotate = rad => {
      const r = create$2();
      fromRotation(r, rad, [0, 0, 1]);

      // Rotate about the viewport center
      // This is identical to `i * r * i * view` where `i` is the identity matrix
      multiply(view, r, view);
    };
    const setScaleBounds = newBounds => {
      const isArray = Array.isArray(newBounds[0]);
      scaleXBounds[0] = isArray ? newBounds[0][0] : newBounds[0];
      scaleXBounds[1] = isArray ? newBounds[0][1] : newBounds[1];
      scaleYBounds[0] = isArray ? newBounds[1][0] : newBounds[0];
      scaleYBounds[1] = isArray ? newBounds[1][1] : newBounds[1];
    };
    const setTranslationBounds = newBounds => {
      const isArray = Array.isArray(newBounds[0]);
      translationXBounds[0] = isArray ? newBounds[0][0] : newBounds[0];
      translationXBounds[1] = isArray ? newBounds[0][1] : newBounds[1];
      translationYBounds[0] = isArray ? newBounds[1][0] : newBounds[0];
      translationYBounds[1] = isArray ? newBounds[1][1] : newBounds[1];
    };
    const setView = newView => {
      if (!newView || newView.length < 16) return;
      view = newView;
    };
    const setViewCenter = newViewCenter => {
      viewCenter = [...newViewCenter.slice(0, 2), 0, 1];
    };
    const reset = () => {
      lookAt(initTarget, initDistance, initRotation);
    };

    // Init
    lookAt(initTarget, initDistance, initRotation);
    return {
      get translation() {
        return getTranslation$1();
      },
      get target() {
        return getTarget();
      },
      get scaling() {
        return getScaling$1();
      },
      get minScaling() {
        return getMinScaling();
      },
      get maxScaling() {
        return getMaxScaling();
      },
      get scaleBounds() {
        return getScaleBounds();
      },
      get translationBounds() {
        return getTranslationBounds();
      },
      get distance() {
        return getDistance();
      },
      get minDistance() {
        return getMinDistance();
      },
      get maxDistance() {
        return getMaxDistance();
      },
      get rotation() {
        return getRotation();
      },
      get view() {
        return getView();
      },
      get viewCenter() {
        return getViewCenter();
      },
      lookAt,
      translate,
      pan: translate,
      rotate,
      scale,
      zoom: scale,
      reset,
      set: (...args) => {
        console.warn('`set()` is deprecated. Please use `setView()` instead.');
        return setView(...args);
      },
      setScaleBounds,
      setTranslationBounds,
      setView,
      setViewCenter
    };
  };
  const MOUSE_DOWN_MOVE_ACTIONS = ["pan", "rotate"];
  const KEY_MAP = {
    alt: "altKey",
    cmd: "metaKey",
    ctrl: "ctrlKey",
    meta: "metaKey",
    shift: "shiftKey"
  };
  const dom2dCamera = (element, {
    distance = 1.0,
    target = [0, 0],
    rotation = 0,
    isNdc = true,
    isFixed = false,
    isPan = true,
    isPanInverted = [false, true],
    panSpeed = 1,
    isRotate = true,
    rotateSpeed = 1,
    defaultMouseDownMoveAction = "pan",
    mouseDownMoveModKey = "alt",
    isZoom = true,
    zoomSpeed = 1,
    viewCenter,
    scaleBounds,
    translationBounds,
    onKeyDown = () => {},
    onKeyUp = () => {},
    onMouseDown = () => {},
    onMouseUp = () => {},
    onMouseMove = () => {},
    onWheel = () => {}
  } = {}) => {
    let camera = createCamera(target, distance, rotation, viewCenter, scaleBounds, translationBounds);
    let mouseX = 0;
    let mouseY = 0;
    let mouseRelX = 0;
    let mouseRelY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let isLeftMousePressed = false;
    let scrollDist = 0;
    let width = 1;
    let height = 1;
    let aspectRatio = 1;
    let isInteractivelyChanged = false;
    let isProgrammaticallyChanged = false;
    let isMouseDownMoveModActive = false;
    let panOnMouseDownMove = defaultMouseDownMoveAction === "pan";
    let isPanX = isPan;
    let isPanY = isPan;
    let isPanXInverted = isPanInverted;
    let isPanYInverted = isPanInverted;
    let isZoomX = isZoom;
    let isZoomY = isZoom;
    const spreadXYSettings = () => {
      isPanX = Array.isArray(isPan) ? Boolean(isPan[0]) : isPan;
      isPanY = Array.isArray(isPan) ? Boolean(isPan[1]) : isPan;
      isPanXInverted = Array.isArray(isPanInverted) ? Boolean(isPanInverted[0]) : isPanInverted;
      isPanYInverted = Array.isArray(isPanInverted) ? Boolean(isPanInverted[1]) : isPanInverted;
      isZoomX = Array.isArray(isZoom) ? Boolean(isZoom[0]) : isZoom;
      isZoomY = Array.isArray(isZoom) ? Boolean(isZoom[1]) : isZoom;
    };
    spreadXYSettings();
    const transformPanX = isNdc ? dX => dX / width * 2 * aspectRatio // to normalized device coords
    : dX => dX;
    const transformPanY = isNdc ? dY => dY / height * 2 // to normalized device coords
    : dY => -dY;
    const transformScaleX = isNdc ? x => (-1 + x / width * 2) * aspectRatio // to normalized device coords
    : x => x;
    const transformScaleY = isNdc ? y => 1 - y / height * 2 // to normalized device coords
    : y => y;
    const tick = () => {
      if (isFixed) {
        const isChanged = isProgrammaticallyChanged;
        isProgrammaticallyChanged = false;
        return isChanged;
      }
      isInteractivelyChanged = false;
      const currentMouseX = mouseX;
      const currentMouseY = mouseY;
      if ((isPanX || isPanY) && isLeftMousePressed && (panOnMouseDownMove && !isMouseDownMoveModActive || !panOnMouseDownMove && isMouseDownMoveModActive)) {
        const dX = isPanXInverted ? prevMouseX - currentMouseX : currentMouseX - prevMouseX;
        const transformedPanX = isPanX ? transformPanX(panSpeed * dX) : 0;
        const dY = isPanYInverted ? prevMouseY - currentMouseY : currentMouseY - prevMouseY;
        const transformedPanY = isPanY ? transformPanY(panSpeed * dY) : 0;
        if (transformedPanX !== 0 || transformedPanY !== 0) {
          camera.pan([transformedPanX, transformedPanY]);
          isInteractivelyChanged = true;
        }
      }
      if ((isZoomX || isZoomY) && scrollDist) {
        const dZ = zoomSpeed * Math.exp(scrollDist / height);
        const transformedX = transformScaleX(mouseRelX);
        const transformedY = transformScaleY(mouseRelY);
        camera.scale([isZoomX ? 1 / dZ : 1, isZoomY ? 1 / dZ : 1], [transformedX, transformedY]);
        isInteractivelyChanged = true;
      }
      if (isRotate && isLeftMousePressed && (panOnMouseDownMove && isMouseDownMoveModActive || !panOnMouseDownMove && !isMouseDownMoveModActive) && Math.abs(prevMouseX - currentMouseX) + Math.abs(prevMouseY - currentMouseY) > 0) {
        const wh = width / 2;
        const hh = height / 2;
        const x1 = prevMouseX - wh;
        const y1 = hh - prevMouseY;
        const x2 = currentMouseX - wh;
        const y2 = hh - currentMouseY;
        // Angle between the start and end mouse position with respect to the
        // viewport center
        const radians = angle([x1, y1], [x2, y2]);
        // Determine the orientation
        const cross = x1 * y2 - x2 * y1;
        camera.rotate(rotateSpeed * radians * Math.sign(cross));
        isInteractivelyChanged = true;
      }

      // Reset scroll delta and mouse position
      scrollDist = 0;
      prevMouseX = currentMouseX;
      prevMouseY = currentMouseY;
      const isChanged = isInteractivelyChanged || isProgrammaticallyChanged;
      isProgrammaticallyChanged = false;
      return isChanged;
    };
    const config = ({
      defaultMouseDownMoveAction: newDefaultMouseDownMoveAction = null,
      isFixed: newIsFixed = null,
      isPan: newIsPan = null,
      isPanInverted: newIsPanInverted = null,
      isRotate: newIsRotate = null,
      isZoom: newIsZoom = null,
      panSpeed: newPanSpeed = null,
      rotateSpeed: newRotateSpeed = null,
      zoomSpeed: newZoomSpeed = null,
      mouseDownMoveModKey: newMouseDownMoveModKey = null
    } = {}) => {
      defaultMouseDownMoveAction = newDefaultMouseDownMoveAction !== null && MOUSE_DOWN_MOVE_ACTIONS.includes(newDefaultMouseDownMoveAction) ? newDefaultMouseDownMoveAction : defaultMouseDownMoveAction;
      panOnMouseDownMove = defaultMouseDownMoveAction === "pan";
      isFixed = newIsFixed !== null ? newIsFixed : isFixed;
      isPan = newIsPan !== null ? newIsPan : isPan;
      isPanInverted = newIsPanInverted !== null ? newIsPanInverted : isPanInverted;
      isRotate = newIsRotate !== null ? newIsRotate : isRotate;
      isZoom = newIsZoom !== null ? newIsZoom : isZoom;
      panSpeed = +newPanSpeed > 0 ? newPanSpeed : panSpeed;
      rotateSpeed = +newRotateSpeed > 0 ? newRotateSpeed : rotateSpeed;
      zoomSpeed = +newZoomSpeed > 0 ? newZoomSpeed : zoomSpeed;
      spreadXYSettings();
      mouseDownMoveModKey = newMouseDownMoveModKey !== null && Object.keys(KEY_MAP).includes(newMouseDownMoveModKey) ? newMouseDownMoveModKey : mouseDownMoveModKey;
    };
    const refresh = () => {
      const bBox = element.getBoundingClientRect();
      width = bBox.width;
      height = bBox.height;
      aspectRatio = width / height;
    };
    const keyUpHandler = event => {
      isMouseDownMoveModActive = false;
      onKeyUp(event);
    };
    const keyDownHandler = event => {
      isMouseDownMoveModActive = event[KEY_MAP[mouseDownMoveModKey]];
      onKeyDown(event);
    };
    const mouseUpHandler = event => {
      isLeftMousePressed = false;
      onMouseUp(event);
    };
    const mouseDownHandler = event => {
      isLeftMousePressed = event.buttons === 1;
      onMouseDown(event);
    };
    const offsetXSupport = document.createEvent("MouseEvent").offsetX !== undefined;
    const updateMouseRelXY = offsetXSupport ? event => {
      mouseRelX = event.offsetX;
      mouseRelY = event.offsetY;
    } : event => {
      const bBox = element.getBoundingClientRect();
      mouseRelX = event.clientX - bBox.left;
      mouseRelY = event.clientY - bBox.top;
    };
    const updateMouseXY = event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    const mouseMoveHandler = event => {
      updateMouseXY(event);
      onMouseMove(event);
    };
    const wheelHandler = event => {
      if (isZoomX || isZoomY) {
        event.preventDefault();
        updateMouseXY(event);
        updateMouseRelXY(event);
        const scale = event.deltaMode === 1 ? 12 : 1;
        scrollDist += scale * (event.deltaY || event.deltaX || 0);
      }
      onWheel(event);
    };
    const dispose = () => {
      camera = undefined;
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      element.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      element.removeEventListener("wheel", wheelHandler);
    };
    window.addEventListener("keydown", keyDownHandler, {
      passive: true
    });
    window.addEventListener("keyup", keyUpHandler, {
      passive: true
    });
    element.addEventListener("mousedown", mouseDownHandler, {
      passive: true
    });
    window.addEventListener("mouseup", mouseUpHandler, {
      passive: true
    });
    window.addEventListener("mousemove", mouseMoveHandler, {
      passive: true
    });
    element.addEventListener("wheel", wheelHandler, {
      passive: false
    });
    camera.config = config;
    camera.dispose = dispose;
    camera.refresh = refresh;
    camera.tick = tick;
    const withProgrammaticChange = fn => function () {
      fn.apply(null, arguments);
      isProgrammaticallyChanged = true;
    };
    camera.lookAt = withProgrammaticChange(camera.lookAt);
    camera.translate = withProgrammaticChange(camera.translate);
    camera.pan = withProgrammaticChange(camera.pan);
    camera.rotate = withProgrammaticChange(camera.rotate);
    camera.scale = withProgrammaticChange(camera.scale);
    camera.zoom = withProgrammaticChange(camera.zoom);
    camera.reset = withProgrammaticChange(camera.reset);
    camera.set = withProgrammaticChange(camera.set);
    camera.setScaleBounds = withProgrammaticChange(camera.setScaleBounds);
    camera.setTranslationBounds = withProgrammaticChange(camera.setTranslationBounds);
    camera.setView = withProgrammaticChange(camera.setView);
    camera.setViewCenter = withProgrammaticChange(camera.setViewCenter);
    refresh();
    return camera;
  };

  function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) return;
    const m = left + right >> 1;
    select(ids, coords, m, left, right, depth % 2);
    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
  }
  function select(ids, coords, k, left, right, inc) {
    while (right > left) {
      if (right - left > 600) {
        const n = right - left + 1;
        const m = k - left + 1;
        const z = Math.log(n);
        const s = 0.5 * Math.exp(2 * z / 3);
        const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
        const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
        const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
        select(ids, coords, k, newLeft, newRight, inc);
      }
      const t = coords[2 * k + inc];
      let i = left;
      let j = right;
      swapItem(ids, coords, left, k);
      if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);
      while (i < j) {
        swapItem(ids, coords, i, j);
        i++;
        j--;
        while (coords[2 * i + inc] < t) i++;
        while (coords[2 * j + inc] > t) j--;
      }
      if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);else {
        j++;
        swapItem(ids, coords, j, right);
      }
      if (j <= k) left = j + 1;
      if (k <= j) right = j - 1;
    }
  }
  function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
  }
  function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    let x, y;
    while (stack.length) {
      const axis = stack.pop();
      const right = stack.pop();
      const left = stack.pop();
      if (right - left <= nodeSize) {
        for (let i = left; i <= right; i++) {
          x = coords[2 * i];
          y = coords[2 * i + 1];
          if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
        }
        continue;
      }
      const m = Math.floor((left + right) / 2);
      x = coords[2 * m];
      y = coords[2 * m + 1];
      if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
      const nextAxis = (axis + 1) % 2;
      if (axis === 0 ? minX <= x : minY <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(nextAxis);
      }
      if (axis === 0 ? maxX >= x : maxY >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(nextAxis);
      }
    }
    return result;
  }

  function within(ids, coords, qx, qy, r, nodeSize) {
    const stack = [0, ids.length - 1, 0];
    const result = [];
    const r2 = r * r;
    while (stack.length) {
      const axis = stack.pop();
      const right = stack.pop();
      const left = stack.pop();
      if (right - left <= nodeSize) {
        for (let i = left; i <= right; i++) {
          if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
        }
        continue;
      }
      const m = Math.floor((left + right) / 2);
      const x = coords[2 * m];
      const y = coords[2 * m + 1];
      if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
      const nextAxis = (axis + 1) % 2;
      if (axis === 0 ? qx - r <= x : qy - r <= y) {
        stack.push(left);
        stack.push(m - 1);
        stack.push(nextAxis);
      }
      if (axis === 0 ? qx + r >= x : qy + r >= y) {
        stack.push(m + 1);
        stack.push(right);
        stack.push(nextAxis);
      }
    }
    return result;
  }
  function sqDist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
  }

  const defaultGetX = p => p[0];
  const defaultGetY = p => p[1];
  class KDBush {
    constructor(points, getX = defaultGetX, getY = defaultGetY, nodeSize = 64, ArrayType = Float64Array) {
      this.nodeSize = nodeSize;
      this.points = points;
      const IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;
      const ids = this.ids = new IndexArrayType(points.length);
      const coords = this.coords = new ArrayType(points.length * 2);
      for (let i = 0; i < points.length; i++) {
        ids[i] = i;
        coords[2 * i] = getX(points[i]);
        coords[2 * i + 1] = getY(points[i]);
      }
      sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
    }
    range(minX, minY, maxX, maxY) {
      return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    }
    within(x, y, r) {
      return within(this.ids, this.coords, x, y, r, this.nodeSize);
    }
  }

  const FRAGMENT_SHADER$3 = `
precision mediump float;
varying vec4 color;
void main() {
  gl_FragColor = color;
}`;

  var FRAG_SHADER = FRAGMENT_SHADER$3;

  // Vertex shader from https://mattdesl.svbtle.com/drawing-lines-is-hard
  // The MIT License (MIT) Copyright (c) 2015 Matt DesLauriers
  const VERTEX_SHADER$1 = `
uniform mat4 projectionViewModel;
uniform float aspectRatio;

uniform sampler2D colorTex;
uniform float colorTexRes;
uniform float colorTexEps;
uniform float width;
uniform float useOpacity;
uniform float useColorOpacity;
uniform int miter;

attribute vec3 prevPosition;
attribute vec3 currPosition;
attribute vec3 nextPosition;
attribute float opacity;
attribute float offsetScale;
attribute float colorIndex;

varying vec4 color;

void main() {
  vec2 aspectVec = vec2(aspectRatio, 1.0);
  vec4 prevProjected = projectionViewModel * vec4(prevPosition, 1.0);
  vec4 currProjected = projectionViewModel * vec4(currPosition, 1.0);
  vec4 nextProjected = projectionViewModel * vec4(nextPosition, 1.0);

  // get 2D screen space with W divide and aspect correction
  vec2 prevScreen = prevProjected.xy / prevProjected.w * aspectVec;
  vec2 currScreen = currProjected.xy / currProjected.w * aspectVec;
  vec2 nextScreen = nextProjected.xy / nextProjected.w * aspectVec;

  // starting point uses (next - current)
  vec2 dir = vec2(0.0);
  if (currScreen == prevScreen) {
    dir = normalize(nextScreen - currScreen);
  }
  // ending point uses (current - previous)
  else if (currScreen == nextScreen) {
    dir = normalize(currScreen - prevScreen);
  }
  // somewhere in middle, needs a join
  else {
    // get directions from (C - B) and (B - A)
    vec2 dirA = normalize((currScreen - prevScreen));
    if (miter == 1) {
      vec2 dirB = normalize((nextScreen - currScreen));
      // now compute the miter join normal and length
      vec2 tangent = normalize(dirA + dirB);
      vec2 perp = vec2(-dirA.y, dirA.x);
      vec2 miter = vec2(-tangent.y, tangent.x);
      dir = tangent;
    } else {
      dir = dirA;
    }
  }

  vec2 normal = vec2(-dir.y, dir.x) * width;
  normal.x /= aspectRatio;
  vec4 offset = vec4(normal * offsetScale, 0.0, 0.0);
  gl_Position = currProjected + offset;

  // Get color from texture
  float colorRowIndex = floor((colorIndex + colorTexEps) / colorTexRes);
  vec2 colorTexIndex = vec2(
    (colorIndex / colorTexRes) - colorRowIndex + colorTexEps,
    colorRowIndex / colorTexRes + colorTexEps
  );

  color = texture2D(colorTex, colorTexIndex);
  color.a = useColorOpacity * color.a + useOpacity * opacity;
}`;

  var VERT_SHADER = VERTEX_SHADER$1;

  const {
    push,
    splice
  } = Array.prototype;
  const I = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  const FLOAT_BYTES$1 = Float32Array.BYTES_PER_ELEMENT;
  const createMesh = (numPointsPerLine, buffer = []) => {
    let numPrevPoints = 0;
    numPointsPerLine.forEach(numPoints => {
      for (let i = 0; i < numPoints - 1; i++) {
        const a = numPrevPoints + i * 2; // `2`  because we duplicated all points
        const b = a + 1;
        const c = a + 2;
        const d = a + 3;
        buffer.push(a, b, c, c, b, d);
      }
      // Each line adds an additional start and end point, hence, `numPoints + 2`
      // And again, since all points are duplicated, we have `* 2`
      numPrevPoints += (numPoints + 2) * 2;
    });
    return buffer;
  };
  const Buffer = {
    duplicate(buffer, stride = 1, dupScale = 1) {
      const out = [];
      const component = new Array(stride * 2);
      for (let i = 0, il = buffer.length / stride; i < il; i++) {
        const index = i * stride;
        for (let j = 0; j < stride; j++) {
          const value = buffer[index + j];
          component[j] = value;
          component[j + stride] = value * dupScale;
        }
        push.apply(out, component);
      }
      return out;
    },
    mapElement(buffer, elementIndex, stride, map) {
      for (let i = 0, il = buffer.length / stride; i < il; i++) {
        const index = elementIndex + i * stride;
        buffer[index] = map(buffer[index], index, i);
      }
      return buffer;
    },
    copyElement(buffer, sourceElementIndex, targetIndex, stride) {
      const component = new Array(stride);
      const ai = sourceElementIndex * stride;
      // Copy source element component wise
      for (let i = 0; i < stride; i++) component[i] = buffer[ai + i];
      splice.call(buffer, targetIndex * stride, 0, ...component);
      return buffer;
    },
    increaseStride(buffer, stride, newStride, undefValue = 0) {
      const out = [];
      const component = new Array(newStride).fill(undefValue);
      for (let i = 0, il = buffer.length / stride; i < il; i++) {
        const index = i * stride;
        for (let j = 0; j < stride; j++) {
          component[j] = buffer[index + j];
        }
        push.apply(out, component);
      }
      return out;
    }
  };
  const createLine = (regl, {
    projection = I,
    model = I,
    view = I,
    points = [],
    colorIndices = [],
    color = [0.8, 0.5, 0, 1],
    opacity = null,
    opacities = [],
    width = 1,
    widths = [],
    miter = 1,
    is2d = false,
    zPos2d = 0
  } = {}) => {
    if (!regl) {
      console.error('Regl instance is undefined.');
      return;
    }
    const pvm = new Float32Array(16);
    let numLines;
    let numPoints;
    let numPointsPerLine;
    let pointsPadded;
    let pointsDup;
    let colorIndicesDup;
    let opacitiesDup;
    let widthsDup;
    let indices;
    let pointBuffer;
    let opacityBuffer;
    let widthBuffer;
    let colorTex;
    let colorTexRes;
    let colorIndexBuffer;
    let attributes;
    let elements;
    let drawLine;
    let dim = is2d ? 2 : 3;
    const useOpacity = () => +(opacities.length === numPoints || opacity !== null);
    const init = () => {
      pointBuffer = regl.buffer();
      opacityBuffer = regl.buffer();
      widthBuffer = regl.buffer();
      colorIndexBuffer = regl.buffer();
      attributes = {
        prevPosition: {
          buffer: () => pointBuffer,
          offset: 0,
          stride: FLOAT_BYTES$1 * 3
        },
        currPosition: {
          buffer: () => pointBuffer,
          // note that each point is duplicated, hence we need to skip over the first two
          offset: FLOAT_BYTES$1 * 3 * 2,
          stride: FLOAT_BYTES$1 * 3
        },
        nextPosition: {
          buffer: () => pointBuffer,
          // note that each point is duplicated, hence we need to skip over the first four
          offset: FLOAT_BYTES$1 * 3 * 4,
          stride: FLOAT_BYTES$1 * 3
        },
        opacity: {
          buffer: () => opacityBuffer,
          // note that each point is duplicated, hence we need to skip over the first two
          offset: FLOAT_BYTES$1 * 2,
          stride: FLOAT_BYTES$1
        },
        offsetScale: {
          buffer: () => widthBuffer,
          // note that each point is duplicated, hence we need to skip over the first two
          offset: FLOAT_BYTES$1 * 2,
          stride: FLOAT_BYTES$1
        },
        colorIndex: {
          buffer: () => colorIndexBuffer,
          // note that each point is duplicated, hence we need to skip over the first two
          offset: FLOAT_BYTES$1 * 2,
          stride: FLOAT_BYTES$1
        }
      };
      elements = regl.elements();
      drawLine = regl({
        attributes,
        depth: {
          enable: !is2d
        },
        blend: {
          enable: true,
          func: {
            srcRGB: 'src alpha',
            srcAlpha: 'one',
            dstRGB: 'one minus src alpha',
            dstAlpha: 'one minus src alpha'
          }
        },
        uniforms: {
          projectionViewModel: (context, props) => {
            const projection = context.projection || props.projection;
            const model = context.model || props.model;
            const view = context.view || props.view;
            return multiply(pvm, projection, multiply(pvm, view, model));
          },
          aspectRatio: ({
            viewportWidth,
            viewportHeight
          }) => viewportWidth / viewportHeight,
          colorTex: () => colorTex,
          colorTexRes: () => colorTexRes,
          colorTexEps: () => 0.5 / colorTexRes,
          pixelRatio: ({
            pixelRatio
          }) => pixelRatio,
          width: ({
            pixelRatio,
            viewportHeight
          }) => width / viewportHeight * pixelRatio,
          useOpacity,
          useColorOpacity: () => +!useOpacity(),
          miter
        },
        elements: () => elements,
        vert: VERT_SHADER,
        frag: FRAG_SHADER
      });
    };
    const prepare = () => {
      if (numLines === 1 && points.length % dim > 0) {
        console.warn(`The length of points (${numPoints}) does not match the dimensions (${dim}). Incomplete points are ignored.`);
      }

      // Copy all points belonging to complete points
      pointsPadded = points.flat().slice(0, numPoints * dim);

      // Add the missing z point
      if (is2d) {
        pointsPadded = Buffer.increaseStride(pointsPadded, 2, 3, zPos2d);
      }
      if (colorIndices.length !== numPoints) colorIndices = new Array(numPoints).fill(0);
      if (widths.length !== numPoints) widths = new Array(numPoints).fill(1);
      let finalColorIndices = colorIndices.slice();
      let finalOpacities = opacities.length === numPoints ? opacities.slice() : new Array(numPoints).fill(+opacity);
      let finalWidths = widths.slice();
      let k = 0;
      numPointsPerLine.forEach(n => {
        const lastPointIdx = k + n - 1;
        // For each line, duplicate the first and last point.
        // E.g., [1,2,3] -> [1,1,2,3,3]
        // First, copy the last point to the end
        Buffer.copyElement(pointsPadded, lastPointIdx, lastPointIdx, 3);
        // Second, copy the first point to the beginning
        Buffer.copyElement(pointsPadded, k, k, 3);
        Buffer.copyElement(finalColorIndices, lastPointIdx, lastPointIdx, 1);
        Buffer.copyElement(finalColorIndices, k, k, 1);
        Buffer.copyElement(finalOpacities, lastPointIdx, lastPointIdx, 1);
        Buffer.copyElement(finalOpacities, k, k, 1);
        Buffer.copyElement(finalWidths, lastPointIdx, lastPointIdx, 1);
        Buffer.copyElement(finalWidths, k, k, 1);
        k += n + 2;
      });

      // duplicate each point for the positive and negative width (see below)
      pointsDup = new Float32Array(Buffer.duplicate(pointsPadded, 3));
      // duplicate each color, opacity, and width such that we have a positive
      // and negative width
      colorIndicesDup = Buffer.duplicate(finalColorIndices);
      opacitiesDup = Buffer.duplicate(finalOpacities);
      widthsDup = Buffer.duplicate(finalWidths, 1, -1);
      // create the line mesh, i.e., the vertex indices
      indices = createMesh(numPointsPerLine);
      pointBuffer({
        usage: 'dynamic',
        type: 'float',
        length: pointsDup.length * FLOAT_BYTES$1,
        data: pointsDup
      });
      opacityBuffer({
        usage: 'dynamic',
        type: 'float',
        length: opacitiesDup.length * FLOAT_BYTES$1,
        data: opacitiesDup
      });
      widthBuffer({
        usage: 'dynamic',
        type: 'float',
        length: widthsDup.length * FLOAT_BYTES$1,
        data: widthsDup
      });
      colorIndexBuffer({
        usage: 'dynamic',
        type: 'float',
        length: colorIndicesDup.length * FLOAT_BYTES$1,
        data: colorIndicesDup
      });
      elements({
        primitive: 'triangles',
        usage: 'dynamic',
        type: indices.length > 2 ** 16 ? 'uint32' : 'uint16',
        data: indices
      });
    };
    const clear = () => {
      destroy();
      init();
    };
    const destroy = () => {
      points = null;
      pointsPadded = null;
      pointsDup = null;
      widthsDup = null;
      indices = null;
      pointBuffer.destroy();
      widthBuffer.destroy();
      elements.destroy();
    };
    const draw = ({
      projection: newProjection,
      model: newModel,
      view: newView
    } = {}) => {
      // cache the view-defining matrices
      if (newProjection) {
        projection = newProjection;
      }
      if (newModel) {
        model = newModel;
      }
      if (newView) {
        view = newView;
      }
      // only draw when some points have been specified
      if (points && points.length > 1) {
        drawLine({
          projection,
          model,
          view
        });
      }
    };
    const getPerPointProperty = (property, newValues) => {
      const flatNewValues = newValues.flat(2);
      if (flatNewValues.length === numPoints) {
        return flatNewValues;
      } else if (flatNewValues.length === numLines) {
        return numPointsPerLine.map((n, i) => Array(n).fill(flatNewValues[i])).flat();
      }
      return property;
    };
    const getPoints = () => points;
    const setPoints = (newPoints = [], {
      colorIndices: newColorIndices = colorIndices,
      opacities: newOpacities = opacities,
      widths: newWidths = widths,
      is2d: newIs2d = is2d
    } = {}) => {
      points = newPoints;
      is2d = newIs2d;
      dim = is2d ? 2 : 3;
      numLines = Array.isArray(points[0]) ? points.length : 1;
      numPointsPerLine = numLines > 1 ? points.map(pts => Math.floor(pts.length / dim)) : [Math.floor(points.length / dim)];
      numPoints = numPointsPerLine.reduce((n, nPts) => n + nPts, 0);
      colorIndices = getPerPointProperty(colorIndices, newColorIndices);
      opacities = getPerPointProperty(opacities, newOpacities);
      widths = getPerPointProperty(widths, newWidths);
      if (points && numPoints > 1) {
        prepare();
      } else {
        clear();
      }
    };
    const getNestedness = (arr, level = -1) => {
      if (!Array.isArray(arr)) return level;
      if (arr.length && !Array.isArray(arr[0])) return level + 1;
      return getNestedness(arr[0], ++level);
    };
    const createColorTexture = () => {
      const colors = getNestedness(color) === 0 ? [color] : color;
      colorTexRes = Math.max(2, Math.ceil(Math.sqrt(colors.length)));
      const rgba = new Uint8Array(colorTexRes ** 2 * 4);
      colors.forEach((color, i) => {
        rgba[i * 4] = Math.min(255, Math.max(0, Math.round(color[0] * 255))); // r
        rgba[i * 4 + 1] = Math.min(255, Math.max(0, Math.round(color[1] * 255))); // g
        rgba[i * 4 + 2] = Math.min(255, Math.max(0, Math.round(color[2] * 255))); // b
        rgba[i * 4 + 3] = Number.isNaN(+color[3]) ? 255 : Math.min(255, Math.max(0, Math.round(color[3] * 255))); // a
      });

      colorTex = regl.texture({
        data: rgba,
        shape: [colorTexRes, colorTexRes, 4]
      });
    };
    const setColor = (newColor, newOpacity = opacity) => {
      color = newColor;
      opacity = newOpacity;
      if (colorTex) colorTex.destroy();
      createColorTexture();
    };
    const getStyle = () => ({
      color,
      miter,
      width
    });
    const setStyle = ({
      color: newColor,
      opacity: newOpacity,
      miter: newMiter,
      width: newWidth
    } = {}) => {
      if (newColor) setColor(newColor, newOpacity);
      if (newMiter) miter = newMiter;
      if (+newWidth > 0) width = newWidth;
    };
    const getBuffer = () => ({
      points: pointBuffer,
      widths: widthBuffer,
      opacities: opacityBuffer,
      colorIndices: colorIndexBuffer
    });
    const getData = () => ({
      points: pointsDup,
      widths: widthsDup,
      opacities: opacitiesDup,
      colorIndices: colorIndicesDup
    });

    // initialize parameters
    init();
    createColorTexture();

    // prepare data if points are already specified
    if (points && points.length > 1) {
      setPoints(points);
    }
    return {
      clear,
      destroy,
      draw,
      getPoints,
      setPoints,
      getData,
      getBuffer,
      getStyle,
      setStyle
    };
  };
  var createLine$1 = createLine;

  // @flekschas/utils v0.31.0 Copyright 2023 Fritz Lekschas
  /* eslint no-param-reassign:0 */

  /**
   * Cubic in easing function
   * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
   *   refers to the start and `1` to the end
   * @return {number} The eased time
   */
  const cubicIn = t => t * t * t;

  /**
   * Cubic in and out easing function
   * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
   *   refers to the start and `1` to the end
   * @return {number} The eased time
   */
  const cubicInOut = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

  /**
   * Cubic out easing function
   * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
   *   refers to the start and `1` to the end
   * @return {number} The eased time
   */
  const cubicOut = t => --t * t * t + 1;

  /**
   * Linear easing function
   * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
   *   refers to the start and `1` to the end
   * @return {number} Same as the input
   */
  const linear = t => t;

  /**
   * Quadratic in easing function
   * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
   *   refers to the start and `1` to the end
   * @return {number} The eased time
   */
  const quadIn = t => t * t;

  /**
   * Quadratic in and out easing function
   * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
   *   refers to the start and `1` to the end
   * @return {number} The eased time
   */
  const quadInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  /**
   * Quadratic out easing function
   * @param {number} t - The input time to be eased. Must be in [0, 1] where `0`
   *   refers to the start and `1` to the end
   * @return {number} The eased time
   */
  const quadOut = t => t * (2 - t);

  /**
   * Identity function
   * @type {<T>(x: T) => T}
   * @param {*} x - Any kind of value
   * @return {*} `x`
   */
  const identity = x => x;

  /**
   * Check if two arrays contain the same elements
   * @type {<T>(a: T[], b: T[]) => Boolean}
   * @param {array} a - First array
   * @param {array} b - Second array
   * @return {boolean} If `true` the two arrays contain the same elements
   */
  const hasSameElements = (a, b) => {
    if (a === b) return true;
    if (a.length !== b.length) return false;
    const aSet = new Set(a);
    const bSet = new Set(b);
    // Since the arrays could contain duplicates, we have to check the set length
    // as well
    if (aSet.size !== bSet.size) return false;
    return b.every(element => aSet.has(element));
  };

  /**
   * Get the maximum number of a vector while ignoring NaNs
   *
   * @description
   * This version is muuuch faster than `Math.max(...v)` and supports vectors
   * longer than 256^2, which is a limitation of `Math.max.apply(null, v)`.
   *
   * @param {number[]} v - Numerical vector
   * @return {number} The largest number
   */
  const max$1 = v => v.reduce((_max, a) => a > _max ? a : _max, -Infinity);

  /**
   * Initialize an array of a certain length using a mapping function
   *
   * @description
   * This is equivalent to `Array.from({ length }, mapFn)` but about 60% faster
   *
   * @param {number} length - Size of the array
   * @param {function} mapFn - Mapping function
   * @return {array} Initialized array
   * @type {<T = number>(length: number, mapFn: (i: number, length: number) => T) => T[]}
   */
  const rangeMap = (length, mapFn = x => x) => {
    const out = [];
    for (let i = 0; i < length; i++) {
      out.push(mapFn(i, length));
    }
    return out;
  };

  /**
   * Get the unique union of two vectors of integers
   * @param {number[]} v - First vector of integers
   * @param {number[]} w - Second vector of integers
   * @return {number[]} Unique union of `v` and `w`
   */
  const unionIntegers = (v, w) => {
    const a = [];
    v.forEach(x => {
      a[x] = true;
    });
    w.forEach(x => {
      a[x] = true;
    });
    return a.reduce((union, value, i) => {
      if (value) union.push(i);
      return union;
    }, []);
  };

  /**
   * Assign properties, constructors, etc. to an object
   *
   * @param {object} target - The target object that gets `sources` assigned to it
   * @param {}
   * @return {object}
   */
  const assign = (target, ...sources) => {
    sources.forEach(source => {
      // eslint-disable-next-line no-shadow
      const descriptors = Object.keys(source).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
        return descriptors;
      }, {});

      // By default, Object.assign copies enumerable Symbols, too
      Object.getOwnPropertySymbols(source).forEach(symbol => {
        const descriptor = Object.getOwnPropertyDescriptor(source, symbol);
        if (descriptor.enumerable) {
          descriptors[symbol] = descriptor;
        }
      });
      Object.defineProperties(target, descriptors);
    });
    return target;
  };

  /**
   * Convenience function to compose functions
   * @param {...function} fns - Array of functions
   * @return {function} The composed function
   */
  const pipe = (...fns) =>
  /**
   * @param {*} x - Some value
   * @return {*} Output of the composed function
   */
  x => fns.reduce((y, f) => f(y), x);

  /**
   * Assign a constructor to the object
   * @param {function} constructor - Constructor functions
   */
  const withConstructor = constructor => self => assign({
    __proto__: {
      constructor
    }
  }, self);

  /**
   * Assign a static property to an object
   * @param {string} name - Name of the property
   * @param {*} value - Static value
   */
  const withStaticProperty = (name, value) => self => assign(self, {
    get [name]() {
      return value;
    }
  });

  /**
   * L2 distance between a pair of points
   *
   * @description
   * Identical but much faster than `l2Dist([fromX, fromY], [toX, toY])`
   *
   * @param {number} fromX - X coordinate of the first point
   * @param {number} fromY - Y coordinate of the first point
   * @param {number} toX - X coordinate of the second point
   * @param {number} toY - Y coordinate of the first point
   * @return {number} L2 distance
   */
  const l2PointDist = (fromX, fromY, toX, toY) => Math.sqrt((fromX - toX) ** 2 + (fromY - toY) ** 2);

  /**
   * Create a worker from a function
   * @param {function} fn - Function to be turned into a worker
   * @return {Worker} Worker function
   */
  const createWorker = fn => new Worker(window.URL.createObjectURL(new Blob([`(${fn.toString()})()`], {
    type: 'text/javascript'
  })));

  /**
   * Get a promise that resolves after the next `n` animation frames
   * @param {number} n - Number of animation frames to wait
   * @return {Promise} A promise that resolves after the next `n` animation frames
   */
  const nextAnimationFrame = (n = 1) => new Promise(resolve => {
    let i = 0;
    const raf = () => requestAnimationFrame(() => {
      i++;
      if (i < n) raf();else resolve();
    });
    raf();
  });

  /**
   * Throttle and debounce a function call
   *
   * Throttling a function call means that the function is called at most every
   * `interval` milliseconds no matter how frequently you trigger a call.
   * Debouncing a function call means that the function is called the earliest
   * after `finalWait` milliseconds wait time where the function was not called.
   * Combining the two ensures that the function is called at most every
   * `interval` milliseconds and is ensured to be called with the very latest
   * arguments after after `finalWait` milliseconds wait time at the end.
   *
   * The following imaginary scenario describes the behavior:
   *
   * MS | throttleTime=3 and debounceTime=3
   * 1. y(f, 3, 3)(args1) => f(args1) called
   * 2. y(f, 3, 3)(args2) => call ignored due to throttling
   * 3. y(f, 3, 3)(args3) => call ignored due to throttling
   * 4. y(f, 3, 3)(args4) => f(args4) called
   * 5. y(f, 3, 3)(args5) => all ignored due to throttling
   * 6. No call           => nothing
   * 7. No call           => f(args5) called due to debouncing
   *
   * @param {functon} fn - Function to be throttled and debounced
   * @param {number} throttleTime - Throttle intevals in milliseconds
   * @param {number} debounceTime - Debounce wait time in milliseconds. By default
   *   this is the same as `throttleTime`.
   * @return {function} - Throttled and debounced function
   */
  const throttleAndDebounce = (fn, throttleTime, debounceTime = null) => {
    let timeout;
    let blockedCalls = 0;

    // eslint-disable-next-line no-param-reassign
    debounceTime = debounceTime === null ? throttleTime : debounceTime;
    const debounced = (...args) => {
      const later = () => {
        // Since we throttle and debounce we should check whether there were
        // actually multiple attempts to call this function after the most recent
        // throttled call. If there were no more calls we don't have to call
        // the function again.
        if (blockedCalls > 0) {
          fn(...args);
          blockedCalls = 0;
        }
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, debounceTime);
    };
    let isWaiting = false;
    const throttledAndDebounced = (...args) => {
      if (!isWaiting) {
        fn(...args);
        debounced(...args);
        isWaiting = true;
        blockedCalls = 0;
        setTimeout(() => {
          isWaiting = false;
        }, throttleTime);
      } else {
        blockedCalls++;
        debounced(...args);
      }
    };
    throttledAndDebounced.reset = () => {
      isWaiting = false;
    };
    throttledAndDebounced.cancel = () => {
      clearTimeout(timeout);
    };
    throttledAndDebounced.now = (...args) => fn(...args);
    return throttledAndDebounced;
  };

  var _DEFAULT_KEY_MAP;
  var AUTO = 'auto';
  var COLOR_NORMAL_IDX = 0;
  var COLOR_ACTIVE_IDX = 1;
  var COLOR_HOVER_IDX = 2;
  var COLOR_BG_IDX = 3;
  var COLOR_NUM_STATES = 4;
  var FLOAT_BYTES = Float32Array.BYTES_PER_ELEMENT;
  var GL_EXTENSIONS = ['OES_texture_float', 'OES_element_index_uint', 'WEBGL_color_buffer_float', 'EXT_float_blend'];
  var CLEAR_OPTIONS = {
    color: [0, 0, 0, 0],
    // Transparent background color
    depth: 1
  };
  var MOUSE_MODE_PANZOOM = 'panZoom';
  var MOUSE_MODE_LASSO = 'lasso';
  var MOUSE_MODE_ROTATE = 'rotate';
  var MOUSE_MODES = [MOUSE_MODE_PANZOOM, MOUSE_MODE_LASSO, MOUSE_MODE_ROTATE];
  var DEFAULT_MOUSE_MODE = MOUSE_MODE_PANZOOM;

  // Easing
  var EASING_FNS = {
    cubicIn: cubicIn,
    cubicInOut: cubicInOut,
    cubicOut: cubicOut,
    linear: linear,
    quadIn: quadIn,
    quadInOut: quadInOut,
    quadOut: quadOut
  };
  var DEFAULT_EASING = cubicInOut;
  var CONTINUOUS = 'continuous';
  var CATEGORICAL = 'categorical';
  var VALUE_ZW_DATA_TYPES = [CONTINUOUS, CATEGORICAL];

  // Default lasso
  var LASSO_CLEAR_ON_DESELECT = 'deselect';
  var LASSO_CLEAR_ON_END = 'lassoEnd';
  var LASSO_CLEAR_EVENTS = [LASSO_CLEAR_ON_DESELECT, LASSO_CLEAR_ON_END];
  var DEFAULT_LASSO_COLOR = [0, 0.666666667, 1, 1];
  var DEFAULT_LASSO_LINE_WIDTH = 2;
  var DEFAULT_LASSO_INITIATOR = false;
  var DEFAULT_LASSO_MIN_DELAY$1 = 10;
  var DEFAULT_LASSO_MIN_DIST$1 = 3;
  var DEFAULT_LASSO_CLEAR_EVENT = LASSO_CLEAR_ON_END;
  var DEFAULT_LASSO_ON_LONG_PRESS = false;
  var DEFAULT_LASSO_LONG_PRESS_TIME = 750;
  var DEFAULT_LASSO_LONG_PRESS_AFTER_EFFECT_TIME = 500;
  var DEFAULT_LASSO_LONG_PRESS_EFFECT_DELAY = 100;
  var DEFAULT_LASSO_LONG_PRESS_REVERT_EFFECT_TIME = 250;

  // Key mapping
  var KEY_ACTION_LASSO = 'lasso';
  var KEY_ACTION_ROTATE = 'rotate';
  var KEY_ACTION_MERGE = 'merge';
  var KEY_ACTIONS = [KEY_ACTION_LASSO, KEY_ACTION_ROTATE, KEY_ACTION_MERGE];
  var KEY_ALT = 'alt';
  var KEY_CMD = 'cmd';
  var KEY_CTRL = 'ctrl';
  var KEY_META = 'meta';
  var KEY_SHIFT = 'shift';
  var KEYS = [KEY_ALT, KEY_CMD, KEY_CTRL, KEY_META, KEY_SHIFT];
  var DEFAULT_KEY_MAP = (_DEFAULT_KEY_MAP = {}, _defineProperty(_DEFAULT_KEY_MAP, KEY_ALT, KEY_ACTION_ROTATE), _defineProperty(_DEFAULT_KEY_MAP, KEY_SHIFT, KEY_ACTION_LASSO), _defineProperty(_DEFAULT_KEY_MAP, KEY_CMD, KEY_ACTION_MERGE), _DEFAULT_KEY_MAP);

  // Default attribute
  var DEFAULT_DATA_ASPECT_RATIO = 1;
  var DEFAULT_WIDTH = AUTO;
  var DEFAULT_HEIGHT = AUTO;
  var DEFAULT_GAMMA = 1;

  // Default styles
  var MIN_POINT_SIZE = 1;
  var DEFAULT_POINT_SIZE = 6;
  var DEFAULT_POINT_SIZE_SELECTED = 2;
  var DEFAULT_POINT_OUTLINE_WIDTH = 2;
  var DEFAULT_SIZE_BY = null;
  var DEFAULT_POINT_CONNECTION_SIZE = 2;
  var DEFAULT_POINT_CONNECTION_SIZE_ACTIVE = 2;
  var DEFAULT_POINT_CONNECTION_SIZE_BY = null;
  var DEFAULT_POINT_CONNECTION_OPACITY = null;
  var DEFAULT_POINT_CONNECTION_OPACITY_BY = null;
  var DEFAULT_POINT_CONNECTION_OPACITY_ACTIVE = 0.66;
  var DEFAULT_OPACITY = 1;
  var DEFAULT_OPACITY_BY = null;
  var DEFAULT_OPACITY_BY_DENSITY_FILL = 0.15;
  var DEFAULT_OPACITY_BY_DENSITY_DEBOUNCE_TIME = 25;
  var DEFAULT_OPACITY_INACTIVE_MAX = 1;
  var DEFAULT_OPACITY_INACTIVE_SCALE = 1;
  var DEFAULT_COLOR_BY = null;
  var DEFAULT_COLOR_NORMAL = [0.66, 0.66, 0.66, DEFAULT_OPACITY];
  var DEFAULT_COLOR_ACTIVE = [0, 0.55, 1, 1];
  var DEFAULT_COLOR_HOVER = [1, 1, 1, 1];
  var DEFAULT_COLOR_BG = [0, 0, 0, 1];
  var DEFAULT_POINT_CONNECTION_COLOR_BY = null;
  var DEFAULT_POINT_CONNECTION_COLOR_NORMAL = [0.66, 0.66, 0.66, 0.2];
  var DEFAULT_POINT_CONNECTION_COLOR_ACTIVE = [0, 0.55, 1, 1];
  var DEFAULT_POINT_CONNECTION_COLOR_HOVER = [1, 1, 1, 1];

  // Default view
  var DEFAULT_TARGET = [0, 0];
  var DEFAULT_DISTANCE = 1;
  var DEFAULT_ROTATION = 0;
  // prettier-ignore
  var DEFAULT_VIEW = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

  // Error codes
  var IMAGE_LOAD_ERROR = 'IMAGE_LOAD_ERROR';

  // Default misc
  var DEFAULT_BACKGROUND_IMAGE = null;
  var DEFAULT_SHOW_RETICLE = false;
  var DEFAULT_RETICLE_COLOR = [1, 1, 1, 0.5];
  var DEFAULT_DESELECT_ON_DBL_CLICK = true;
  var DEFAULT_DESELECT_ON_ESCAPE = true;
  var DEFAULT_SHOW_POINT_CONNECTIONS = false;
  var DEFAULT_POINT_CONNECTION_MAX_INT_POINTS_PER_SEGMENT = 100;
  var DEFAULT_POINT_CONNECTION_INT_POINTS_TOLERANCE = 1 / 500;
  var DEFAULT_POINT_SIZE_MOUSE_DETECTION = 'auto';
  var DEFAULT_PERFORMANCE_MODE = false;
  var SINGLE_CLICK_DELAY = 200;
  var LONG_CLICK_TIME = 500;
  var Z_NAMES = new Set(['z', 'valueZ', 'valueA', 'value1', 'category']);
  var W_NAMES = new Set(['w', 'valueW', 'valueB', 'value2', 'value']);
  var DEFAULT_IMAGE_LOAD_TIMEOUT = 15000;

  // Error messages
  var ERROR_POINTS_NOT_DRAWN = 'Points have not been drawn';

  /**
   * Check if all GL extensions are supported and enabled and warn otherwise
   * @param   {import('regl').Regl}  regl  Regl instance to be tested
   * @param   {boolean}  silent  If `true` the function will not print `console.warn` statements
   * @return  {boolean}  If `true` all required GL extensions are supported
   */
  var checkReglExtensions = function checkReglExtensions(regl, silent) {
    if (!regl) return false;
    return GL_EXTENSIONS.reduce(function (every, EXTENSION) {
      if (!regl.hasExtension(EXTENSION)) {
        if (!silent) {
          console.warn("WebGL: ".concat(EXTENSION, " extension not supported. Scatterplot might not render properly"));
        }
        return false;
      }
      return every;
    }, true);
  };

  /**
   * Create a new Regl instance with `GL_EXTENSIONS` enables
   * @param   {HTMLCanvasElement}  canvas  Canvas element to be rendered on
   * @return  {import('regl').Regl}  New Regl instance
   */
  var createRegl = function createRegl(canvas) {
    var gl = canvas.getContext('webgl', {
      antialias: true,
      preserveDrawingBuffer: true
    });
    var extensions = [];

    // Needed to run the tests properly as the headless-gl doesn't support all
    // extensions, which is fine for the functional tests.
    GL_EXTENSIONS.forEach(function (EXTENSION) {
      if (gl.getExtension(EXTENSION)) {
        extensions.push(EXTENSION);
      } else {
        console.warn("WebGL: ".concat(EXTENSION, " extension not supported. Scatterplot might not render properly"));
      }
    });
    return createOriginalRegl__default.default({
      gl: gl,
      extensions: extensions
    });
  };

  /**
   * L2 distance between a pair of 2D points
   * @param   {number}  x1  X coordinate of the first point
   * @param   {number}  y1  Y coordinate of the first point
   * @param   {number}  x2  X coordinate of the second point
   * @param   {number}  y2  Y coordinate of the first point
   * @return  {number}  L2 distance
   */
  var dist = function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  };

  /**
   * Get the bounding box of a set of 2D positions
   * @param   {array}  positions2d  2D positions to be checked
   * @return  {array}  Quadruple of form `[xMin, yMin, xMax, yMax]` defining the
   *  bounding box
   */
  var getBBox = function getBBox(positions2d) {
    var xMin = Infinity;
    var xMax = -Infinity;
    var yMin = Infinity;
    var yMax = -Infinity;
    for (var i = 0; i < positions2d.length; i += 2) {
      xMin = positions2d[i] < xMin ? positions2d[i] : xMin;
      xMax = positions2d[i] > xMax ? positions2d[i] : xMax;
      yMin = positions2d[i + 1] < yMin ? positions2d[i + 1] : yMin;
      yMax = positions2d[i + 1] > yMax ? positions2d[i + 1] : yMax;
    }
    return [xMin, yMin, xMax, yMax];
  };

  /**
   * Test whether a bounding box is actually specifying an area
   * @param   {array}  bBox  The bounding box to be checked
   * @return  {array}  `true` if the bounding box is valid
   */
  var isValidBBox = function isValidBBox(_ref) {
    var _ref2 = _slicedToArray(_ref, 4),
      xMin = _ref2[0],
      yMin = _ref2[1],
      xMax = _ref2[2],
      yMax = _ref2[3];
    return Number.isFinite(xMin) && Number.isFinite(yMin) && Number.isFinite(xMax) && Number.isFinite(yMax) && xMax - xMin > 0 && yMax - yMin > 0;
  };

  /**
   * Convert a HEX-encoded color to an RGB-encoded color
   * @param   {string}  hex  HEX-encoded color string.
   * @param   {boolean}  isNormalize  If `true` the returned RGB values will be
   *   normalized to `[0,1]`.
   * @return  {array}  Triple holding the RGB values.
   */
  var hexToRgb = function hexToRgb(hex) {
    var isNormalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
      return "#".concat(r).concat(r).concat(g).concat(g).concat(b).concat(b);
    }).substring(1).match(/.{2}/g).map(function (x) {
      return parseInt(x, 16) / Math.pow(255, isNormalize);
    });
  };
  var isConditionalArray = function isConditionalArray(a, condition) {
    var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref3$minLength = _ref3.minLength,
      minLength = _ref3$minLength === void 0 ? 0 : _ref3$minLength;
    return Array.isArray(a) && a.length >= minLength && a.every(condition);
  };
  var isPositiveNumber = function isPositiveNumber(x) {
    return !Number.isNaN(+x) && +x >= 0;
  };
  var isStrictlyPositiveNumber = function isStrictlyPositiveNumber(x) {
    return !Number.isNaN(+x) && +x > 0;
  };

  /**
   * Create a function to limit choices to a predefined list
   * @param   {array}  choices  Array of acceptable choices
   * @param   {*}  defaultOption  Default choice
   * @return  {function}  Function limiting the choices
   */
  var limit = function limit(choices, defaultChoice) {
    return function (choice) {
      return choices.indexOf(choice) >= 0 ? choice : defaultChoice;
    };
  };

  /**
   * Promised-based image loading
   * @param {string}  src  Remote image source, i.e., a URL
   * @param {boolean} isCrossOrigin If `true` allow loading image from a source of another origin.
   * @return  {Promise<HTMLImageElement>}  Promise resolving to the image once its loaded
   */
  var loadImage = function loadImage(src) {
    var isCrossOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_IMAGE_LOAD_TIMEOUT;
    return new Promise(function (resolve, reject) {
      var image = new Image();
      if (isCrossOrigin) image.crossOrigin = 'anonymous';
      image.src = src;
      image.onload = function () {
        resolve(image);
      };
      var rejectPromise = function rejectPromise() {
        reject(new Error(IMAGE_LOAD_ERROR));
      };
      image.onerror = rejectPromise;
      setTimeout(rejectPromise, timeout);
    });
  };

  /**
   * @deprecated Please use `scatterplot.createTextureFromUrl(url)`
   *
   * Create a Regl texture from an URL.
   * @param   {import('regl').Regl}  regl  Regl instance used for creating the texture.
   * @param   {string}  url  Source URL of the image.
   * @return  {Promise<import('regl').Texture2D>}  Promise resolving to the texture object.
   */
  var createTextureFromUrl = function createTextureFromUrl(regl, url) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_IMAGE_LOAD_TIMEOUT;
    return new Promise(function (resolve, reject) {
      loadImage(url, url.indexOf(window.location.origin) !== 0 && url.indexOf('base64') === -1, timeout).then(function (image) {
        resolve(regl.texture(image));
      })["catch"](function (error) {
        reject(error);
      });
    });
  };

  /**
   * Convert a HEX-encoded color to an RGBA-encoded color
   * @param   {string}  hex  HEX-encoded color string.
   * @param   {boolean}  isNormalize  If `true` the returned RGBA values will be
   *   normalized to `[0,1]`.
   * @return  {array}  Triple holding the RGBA values.
   */
  var hexToRgba = function hexToRgba(hex) {
    var isNormalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return [].concat(_toConsumableArray(hexToRgb(hex, isNormalize)), [Math.pow(255, !isNormalize)]);
  };

  /**
   * Tests if a string is a valid HEX color encoding
   * @param   {string}  hex  HEX-encoded color string.
   * @return  {boolean}  If `true` the string is a valid HEX color encoding.
   */
  var isHex = function isHex(hex) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
  };

  /**
   * Tests if a number is in `[0,1]`.
   * @param   {number}  x  Number to be tested.
   * @return  {boolean}  If `true` the number is in `[0,1]`.
   */
  var isNormFloat = function isNormFloat(x) {
    return x >= 0 && x <= 1;
  };

  /**
   * Tests if an array consist of normalized numbers that are in `[0,1]` only.
   * @param   {array}  a  Array to be tested
   * @return  {boolean}  If `true` the array contains only numbers in `[0,1]`.
   */
  var isNormFloatArray = function isNormFloatArray(a) {
    return Array.isArray(a) && a.every(isNormFloat);
  };

  /**
   * From: https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
   * @param   {Array}  point  Tuple of the form `[x,y]` to be tested.
   * @param   {Array}  polygon  1D list of vertices defining the polygon.
   * @return  {boolean}  If `true` point lies within the polygon.
   */
  var isPointInPolygon = function isPointInPolygon(polygon) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [],
      _ref5 = _slicedToArray(_ref4, 2),
      px = _ref5[0],
      py = _ref5[1];
    var x1;
    var y1;
    var x2;
    var y2;
    var isWithin = false;
    for (var i = 0, j = polygon.length - 2; i < polygon.length; i += 2) {
      x1 = polygon[i];
      y1 = polygon[i + 1];
      x2 = polygon[j];
      y2 = polygon[j + 1];
      if (y1 > py !== y2 > py && px < (x2 - x1) * (py - y1) / (y2 - y1) + x1) isWithin = !isWithin;
      j = i;
    }
    return isWithin;
  };

  /**
   * Tests if a variable is a string
   * @param   {*}  s  Variable to be tested
   * @return  {boolean}  If `true` variable is a string
   */
  var isString = function isString(s) {
    return typeof s === 'string' || s instanceof String;
  };

  /**
   * Tests if a number is an interger and in `[0,255]`.
   * @param   {number}  x  Number to be tested.
   * @return  {boolean}  If `true` the number is an interger and in `[0,255]`.
   */
  var isUint8 = function isUint8(x) {
    return Number.isInteger(x) && x >= 0 && x <= 255;
  };

  /**
   * Tests if an array consist of Uint8 numbers only.
   * @param   {array}  a  Array to be tested.
   * @return  {boolean}  If `true` the array contains only Uint8 numbers.
   */
  var isUint8Array = function isUint8Array(a) {
    return Array.isArray(a) && a.every(isUint8);
  };

  /**
   * Tests if an array is encoding an RGB color.
   * @param   {array}  rgb  Array to be tested
   * @return  {boolean}  If `true` the array hold a triple of Uint8 numbers or
   *   a triple of normalized floats.
   */
  var isRgb = function isRgb(rgb) {
    return rgb.length === 3 && (isNormFloatArray(rgb) || isUint8Array(rgb));
  };

  /**
   * Tests if an array is encoding an RGBA color.
   * @param   {array}  rgb  Array to be tested
   * @return  {boolean}  If `true` the array hold a quadruple of Uint8 numbers or
   *   a quadruple of normalized floats.
   */
  var isRgba = function isRgba(rgba) {
    return rgba.length === 4 && (isNormFloatArray(rgba) || isUint8Array(rgba));
  };

  /**
   * Test if a color is multiple colors
   * @param   {*}  color  To be tested
   * @return  {boolean}  If `true`, `color` is an array of colors.
   */
  var isMultipleColors = function isMultipleColors(color) {
    return Array.isArray(color) && color.length && (Array.isArray(color[0]) || isString(color[0]));
  };

  /**
   * Fast version of `Math.max`. Based on
   *   https://jsperf.com/math-min-max-vs-ternary-vs-if/24 `Math.max` is not
   *   very fast
   * @param   {number}  a  Value A
   * @param   {number}  b  Value B
   * @return  {boolean}  If `true` A is greater than B.
   */
  var max = function max(a, b) {
    return a > b ? a : b;
  };

  /**
   * Fast version of `Math.min`. Based on
   *   https://jsperf.com/math-min-max-vs-ternary-vs-if/24 `Math.max` is not
   *   very fast
   * @param   {number}  a  Value A
   * @param   {number}  b  Value B
   * @return  {boolean}  If `true` A is smaller than B.
   */
  var min = function min(a, b) {
    return a < b ? a : b;
  };

  /**
   * Convert a color to an RGBA color
   * @param   {*}  color  Color to be converted. Currently supports:
   *   HEX, RGB, or RGBA.
   * @param   {boolean}  isNormalize  If `true` the returned RGBA values will be
   *   normalized to `[0,1]`.
   * @return  {array}  Quadruple defining an RGBA color.
   */
  var toRgba = function toRgba(color, shouldNormalize) {
    if (isRgba(color)) {
      var isNormalized = isNormFloatArray(color);
      if (shouldNormalize && isNormalized || !shouldNormalize && !isNormalized) return color;
      if (shouldNormalize && !isNormalized) return color.map(function (x) {
        return x / 255;
      });
      return color.map(function (x) {
        return x * 255;
      });
    }
    if (isRgb(color)) {
      var base = Math.pow(255, !shouldNormalize);
      var _isNormalized = isNormFloatArray(color);
      if (shouldNormalize && _isNormalized || !shouldNormalize && !_isNormalized) return [].concat(_toConsumableArray(color), [base]);
      if (shouldNormalize && !_isNormalized) return [].concat(_toConsumableArray(color.map(function (x) {
        return x / 255;
      })), [base]);
      return [].concat(_toConsumableArray(color.map(function (x) {
        return x * 255;
      })), [base]);
    }
    if (isHex(color)) return hexToRgba(color, shouldNormalize);
    console.warn('Only HEX, RGB, and RGBA are handled by this function. Returning white instead.');
    return shouldNormalize ? [1, 1, 1, 1] : [255, 255, 255, 255];
  };

  /**
   * Flip the key-value pairs of an object
   * @param {object} obj - Object to be flipped
   * @return {object} Flipped object
   */
  var flipObj = function flipObj(obj) {
    return Object.entries(obj).reduce(function (out, _ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
        key = _ref7[0],
        value = _ref7[1];
      if (out[value]) {
        out[value] = [].concat(_toConsumableArray(out[value]), [key]);
      } else {
        out[value] = key;
      }
      return out;
    }, {});
  };
  var rgbBrightness = function rgbBrightness(rgb) {
    return 0.21 * rgb[0] + 0.72 * rgb[1] + 0.07 * rgb[2];
  };

  /**
   * Clip a number between min and max
   * @param   {number}  value  The value to be clipped
   * @param   {number}  minValue  The minimum value
   * @param   {number}  maxValue  The maximum value
   * @return  {number}  The clipped value
   */
  var clip = function clip(value, minValue, maxValue) {
    return Math.min(maxValue, Math.max(minValue, value));
  };

  var createRenderer = function createRenderer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var regl = options.regl,
      _options$canvas = options.canvas,
      canvas = _options$canvas === void 0 ? document.createElement('canvas') : _options$canvas,
      _options$gamma = options.gamma,
      _gamma = _options$gamma === void 0 ? DEFAULT_GAMMA : _options$gamma;

    // Same as regl ||= createRegl(canvas) but avoids having to rely on
    // https://babeljs.io/docs/en/babel-plugin-proposal-logical-assignment-operators
    // eslint-disable-next-line no-unused-expressions
    regl || (regl = createRegl(canvas));
    var isSupportingAllGlExtensions = checkReglExtensions(regl);
    var fboRes = [canvas.width, canvas.height];
    var fbo = regl.framebuffer({
      width: fboRes[0],
      height: fboRes[1],
      colorFormat: 'rgba',
      colorType: 'float'
    });

    /**
     * Render the float32 framebuffer to the internal canvas
     *
     * From https://observablehq.com/@rreusser/selecting-the-right-opacity-for-2d-point-clouds
     */
    var renderToCanvas = regl({
      vert: "\n      precision highp float;\n      attribute vec2 xy;\n      void main () {\n        gl_Position = vec4(xy, 0, 1);\n      }",
      frag: "\n      precision highp float;\n      uniform vec2 srcRes;\n      uniform sampler2D src;\n      uniform float gamma;\n\n      vec3 approxLinearToSRGB (vec3 rgb, float gamma) {\n        return pow(clamp(rgb, vec3(0), vec3(1)), vec3(1.0 / gamma));\n      }\n\n      void main () {\n        vec4 color = texture2D(src, gl_FragCoord.xy / srcRes);\n        gl_FragColor = vec4(approxLinearToSRGB(color.rgb, gamma), color.a);\n      }",
      attributes: {
        xy: [-4, -4, 4, -4, 0, 4]
      },
      uniforms: {
        src: function src() {
          return fbo;
        },
        srcRes: function srcRes() {
          return fboRes;
        },
        gamma: function gamma() {
          return _gamma;
        }
      },
      count: 3,
      depth: {
        enable: false
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'one',
          srcAlpha: 'one',
          dstRGB: 'one minus src alpha',
          dstAlpha: 'one minus src alpha'
        }
      }
    });

    /**
     * Copy the pixels from the internal canvas onto the target canvas
     */
    var copyTo = function copyTo(targetCanvas) {
      var ctx = targetCanvas.getContext('2d');
      ctx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
      ctx.drawImage(canvas, (canvas.width - targetCanvas.width) / 2, (canvas.height - targetCanvas.height) / 2, targetCanvas.width, targetCanvas.height, 0, 0, targetCanvas.width, targetCanvas.height);
    };

    /**
     * The render function
     */
    var render = function render( /** @type {(): void} */draw, /** @type {HTMLCanvasElement} */targetCanvas) {
      // Clear internal canvas
      regl.clear(CLEAR_OPTIONS);
      fbo.use(function () {
        // Clear framebuffer
        regl.clear(CLEAR_OPTIONS);
        draw();
      });
      renderToCanvas();
      copyTo(targetCanvas);
    };

    /**
     * Update Regl's viewport, drawingBufferWidth, and drawingBufferHeight
     *
     * @description Call this method after the viewport has changed, e.g., width
     * or height have been altered
     */
    var refresh = function refresh() {
      regl.poll();
    };
    var drawFns = new Set();

    /**
     * Register an draw function that is going to be invoked on every animation
     * frame.
     */
    var onFrame = function onFrame( /** @type {(): void} */draw) {
      drawFns.add(draw);
      return function () {
        drawFns["delete"](draw);
      };
    };
    var frame = regl.frame(function () {
      var iterator = drawFns.values();
      var result = iterator.next();
      while (!result.done) {
        result.value(); // The draw function
        result = iterator.next();
      }
    });
    var resize = function resize() {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      fboRes[0] = canvas.width;
      fboRes[1] = canvas.height;
      fbo.resize.apply(fbo, fboRes);
    };
    if (!options.canvas) {
      window.addEventListener('resize', resize);
      window.addEventListener('orientationchange', resize);
      resize();
    }

    /**
     * Destroy the renderer to free resources and cancel animation frames
     */
    var destroy = function destroy() {
      frame.cancel();
      canvas = undefined;
      regl = undefined;
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
    return {
      /**
       * Get the associated canvas element
       * @return {HTMLCanvasElement} The associated canvas element
       */
      get canvas() {
        return canvas;
      },
      /**
       * Get the associated Regl instance
       * @return {import('regl').Regl} The associated Regl instance
       */
      get regl() {
        return regl;
      },
      /**
       * Get the gamma value
       * @return {number} The gamma value
       */
      get gamma() {
        return _gamma;
      },
      /**
       * Set gamma to a new value
       * @param {number} newGamma - The new gamma value
       */
      set gamma(newGamma) {
        _gamma = +newGamma;
      },
      /**
       * Get whether the browser supports all necessary WebGL features
       * @return {boolean} If `true` the browser supports all necessary WebGL features
       */
      get isSupported() {
        return isSupportingAllGlExtensions;
      },
      render: render,
      onFrame: onFrame,
      refresh: refresh,
      destroy: destroy
    };
  };

  var DEFAULT_LASSO_START_INITIATOR_SHOW = true;
  var DEFAULT_LASSO_MIN_DELAY = 8;
  var DEFAULT_LASSO_MIN_DIST = 2;
  var LASSO_SHOW_START_INITIATOR_TIME = 2500;
  var LASSO_HIDE_START_INITIATOR_TIME = 250;

  var createLongPressElements = function createLongPressElements() {
    var longPress = document.createElement('div');
    var longPressId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    longPress.id = "lasso-long-press-".concat(longPressId);
    longPress.style.position = 'fixed';
    longPress.style.width = '1.25rem';
    longPress.style.height = '1.25rem';
    longPress.style.pointerEvents = 'none';
    longPress.style.transform = 'translate(-50%,-50%)';
    var longPressCircle = document.createElement('div');
    longPressCircle.style.position = 'absolute';
    longPressCircle.style.top = 0;
    longPressCircle.style.left = 0;
    longPressCircle.style.width = '1.25rem';
    longPressCircle.style.height = '1.25rem';
    longPressCircle.style.clipPath = 'inset(0px 0px 0px 50%)';
    longPressCircle.style.opacity = 0;
    longPress.appendChild(longPressCircle);
    var longPressCircleLeft = document.createElement('div');
    longPressCircleLeft.style.position = 'absolute';
    longPressCircleLeft.style.top = 0;
    longPressCircleLeft.style.left = 0;
    longPressCircleLeft.style.width = '0.8rem';
    longPressCircleLeft.style.height = '0.8rem';
    longPressCircleLeft.style.border = '0.2rem solid currentcolor';
    longPressCircleLeft.style.borderRadius = '0.8rem';
    longPressCircleLeft.style.clipPath = 'inset(0px 50% 0px 0px)';
    longPressCircleLeft.style.transform = 'rotate(0deg)';
    longPressCircle.appendChild(longPressCircleLeft);
    var longPressCircleRight = document.createElement('div');
    longPressCircleRight.style.position = 'absolute';
    longPressCircleRight.style.top = 0;
    longPressCircleRight.style.left = 0;
    longPressCircleRight.style.width = '0.8rem';
    longPressCircleRight.style.height = '0.8rem';
    longPressCircleRight.style.border = '0.2rem solid currentcolor';
    longPressCircleRight.style.borderRadius = '0.8rem';
    longPressCircleRight.style.clipPath = 'inset(0px 50% 0px 0px)';
    longPressCircleRight.style.transform = 'rotate(0deg)';
    longPressCircle.appendChild(longPressCircleRight);
    var longPressEffect = document.createElement('div');
    longPressEffect.style.position = 'absolute';
    longPressEffect.style.top = 0;
    longPressEffect.style.left = 0;
    longPressEffect.style.width = '1.25rem';
    longPressEffect.style.height = '1.25rem';
    longPressEffect.style.borderRadius = '1.25rem';
    longPressEffect.style.background = 'currentcolor';
    longPressEffect.style.transform = 'scale(0)';
    longPressEffect.style.opacity = 0;
    longPress.appendChild(longPressEffect);
    return {
      longPress: longPress,
      longPressCircle: longPressCircle,
      longPressCircleLeft: longPressCircleLeft,
      longPressCircleRight: longPressCircleRight,
      longPressEffect: longPressEffect
    };
  };

  var getInTime = function getInTime(p, time, extraTime) {
    return (1 - p) * time + extraTime;
  };
  var getMainInAnimation = function getMainInAnimation(t, d) {
    return "".concat(t, "ms ease-out mainIn ").concat(d, "ms 1 normal forwards");
  };
  var getEffectInAnimation = function getEffectInAnimation(t, d) {
    return "".concat(t, "ms ease-out effectIn ").concat(d, "ms 1 normal forwards");
  };
  var getCircleLeftInAnimation = function getCircleLeftInAnimation(t, d) {
    return "".concat(t, "ms linear leftSpinIn ").concat(d, "ms 1 normal forwards");
  };
  var getCircleRightInAnimation = function getCircleRightInAnimation(t, d) {
    return "".concat(t, "ms linear rightSpinIn ").concat(d, "ms 1 normal forwards");
  };
  var getCircleInAnimation = function getCircleInAnimation(t, d) {
    return "".concat(t, "ms linear circleIn ").concat(d, "ms 1 normal forwards");
  };
  var getMainIn = function getMainIn(mainEffectPercent, currentColor, targetColor) {
    return "\n  @keyframes mainIn {\n    0% {\n      color: ".concat(currentColor, ";\n      opacity: 0;\n    }\n    0%, ").concat(mainEffectPercent, "% {\n      color: ").concat(currentColor, ";\n      opacity: 1;\n    }\n    100% {\n      color: ").concat(targetColor, ";\n      opacity: 0.8;\n    }\n  }\n");
  };
  var getEffectIn = function getEffectIn(mainEffectPercent, afterEffectPercent, opacity, scale) {
    return "\n  @keyframes effectIn {\n    0%, ".concat(mainEffectPercent, "% {\n      opacity: ").concat(opacity, ";\n      transform: scale(").concat(scale, ");\n    }\n    ").concat(afterEffectPercent, "% {\n      opacity: 0.66;\n      transform: scale(1.5);\n    }\n    99% {\n      opacity: 0;\n      transform: scale(2);\n    }\n    100% {\n      opacity: 0;\n      transform: scale(0);\n    }\n  }\n");
  };
  var getCircleIn = function getCircleIn(halfMainEffectPercent, clipPath, opacity) {
    return "\n  @keyframes circleIn {\n    0% {\n      clip-path: ".concat(clipPath, ";\n      opacity: ").concat(opacity, ";\n    }\n    ").concat(halfMainEffectPercent, "% {\n      clip-path: ").concat(clipPath, ";\n      opacity: 1;\n    }\n    ").concat(halfMainEffectPercent + 0.01, "%, 100% {\n      clip-path: inset(0);\n      opacity: 1;\n    }\n  }\n");
  };
  var getCircleLeftIn = function getCircleLeftIn(mainEffectPercent, angle) {
    return "\n  @keyframes leftSpinIn {\n    0% {\n      transform: rotate(".concat(angle, "deg);\n    }\n    ").concat(mainEffectPercent, "%, 100% {\n      transform: rotate(360deg);\n    }\n  }\n");
  };
  var getCircleRightIn = function getCircleRightIn(halfMainEffectPercent, angle) {
    return "\n  @keyframes rightSpinIn {\n    0% {\n      transform: rotate(".concat(angle, "deg);\n    }\n    ").concat(halfMainEffectPercent, "%, 100% {\n      transform: rotate(180deg);\n    }\n  }\n");
  };
  var createLongPressInAnimations = function createLongPressInAnimations(_ref) {
    var _ref$time = _ref.time,
      time = _ref$time === void 0 ? DEFAULT_LASSO_LONG_PRESS_TIME : _ref$time,
      _ref$extraTime = _ref.extraTime,
      extraTime = _ref$extraTime === void 0 ? DEFAULT_LASSO_LONG_PRESS_AFTER_EFFECT_TIME : _ref$extraTime,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? DEFAULT_LASSO_LONG_PRESS_EFFECT_DELAY : _ref$delay,
      currentColor = _ref.currentColor,
      targetColor = _ref.targetColor,
      effectOpacity = _ref.effectOpacity,
      effectScale = _ref.effectScale,
      circleLeftRotation = _ref.circleLeftRotation,
      circleRightRotation = _ref.circleRightRotation,
      circleClipPath = _ref.circleClipPath,
      circleOpacity = _ref.circleOpacity;
    var p = circleLeftRotation / 360;
    var actualTime = getInTime(p, time, extraTime);
    var longPressPercent = Math.round((1 - p) * time / actualTime * 100);
    var halfLongPressPercent = Math.round(longPressPercent / 2);
    var afterEffectPercent = longPressPercent + (100 - longPressPercent) / 4;
    return {
      rules: {
        main: getMainIn(longPressPercent, currentColor, targetColor),
        effect: getEffectIn(longPressPercent, afterEffectPercent, effectOpacity, effectScale),
        circleRight: getCircleRightIn(halfLongPressPercent, circleRightRotation),
        circleLeft: getCircleLeftIn(longPressPercent, circleLeftRotation),
        circle: getCircleIn(halfLongPressPercent, circleClipPath, circleOpacity)
      },
      names: {
        main: getMainInAnimation(actualTime, delay),
        effect: getEffectInAnimation(actualTime, delay),
        circleLeft: getCircleLeftInAnimation(actualTime, delay),
        circleRight: getCircleRightInAnimation(actualTime, delay),
        circle: getCircleInAnimation(actualTime, delay)
      }
    };
  };
  var getMainOutAnimation = function getMainOutAnimation(t) {
    return "".concat(t, "ms linear mainOut 0s 1 normal forwards");
  };
  var getEffectOutAnimation = function getEffectOutAnimation(t) {
    return "".concat(t, "ms linear effectOut 0s 1 normal forwards");
  };
  var getCircleLeftOutAnimation = function getCircleLeftOutAnimation(t) {
    return "".concat(t, "ms linear leftSpinOut 0s 1 normal forwards");
  };
  var getCircleRightOutAnimation = function getCircleRightOutAnimation(t) {
    return "".concat(t, "ms linear rightSpinOut 0s 1 normal forwards");
  };
  var getCircleOutAnimation = function getCircleOutAnimation(t) {
    return "".concat(t, "ms linear circleOut 0s 1 normal forwards");
  };
  var getMainOut = function getMainOut(currentColor, targetColor) {
    return "\n  @keyframes mainOut {\n    0% {\n      color: ".concat(currentColor, ";\n    }\n    100% {\n      color: ").concat(targetColor, ";\n    }\n  }\n");
  };
  var getEffectOut = function getEffectOut(opacity, scale) {
    return "\n  @keyframes effectOut {\n    0% {\n      opacity: ".concat(opacity, ";\n      transform: scale(").concat(scale, ");\n    }\n    99% {\n      opacity: 0;\n      transform: scale(").concat(scale + 0.5, ");\n    }\n    100% {\n      opacity: 0;\n      transform: scale(0);\n    }\n  }\n");
  };
  var getCircleRightOut = function getCircleRightOut(halfEffectPercent, angle) {
    return "\n  @keyframes rightSpinOut {\n    0%, ".concat(halfEffectPercent, "% {\n      transform: rotate(").concat(angle, "deg);\n    }\n    100% {\n      transform: rotate(0deg);\n    }\n");
  };
  var getCircleLeftOut = function getCircleLeftOut(angle) {
    return "\n  @keyframes leftSpinOut {\n    0% {\n      transform: rotate(".concat(angle, "deg);\n    }\n    100% {\n      transform: rotate(0deg);\n    }\n  }\n");
  };
  var getCircleOut = function getCircleOut(halfEffectPercent, clipPath, opacity) {
    return "\n  @keyframes circleOut {\n    0%, ".concat(halfEffectPercent, "% {\n      clip-path: ").concat(clipPath, ";\n      opacity: ").concat(opacity, ";\n    }\n    ").concat(halfEffectPercent + 0.01, "% {\n      clip-path: inset(0 0 0 50%);\n      opacity: ").concat(opacity, ";\n    }\n    100% {\n      clip-path: inset(0 0 0 50%);\n      opacity: 0;\n    }\n  }\n");
  };
  var createLongPressOutAnimations = function createLongPressOutAnimations(_ref2) {
    var _ref2$time = _ref2.time,
      time = _ref2$time === void 0 ? DEFAULT_LASSO_LONG_PRESS_REVERT_EFFECT_TIME : _ref2$time,
      currentColor = _ref2.currentColor,
      targetColor = _ref2.targetColor,
      effectOpacity = _ref2.effectOpacity,
      effectScale = _ref2.effectScale,
      circleLeftRotation = _ref2.circleLeftRotation,
      circleRightRotation = _ref2.circleRightRotation,
      circleClipPath = _ref2.circleClipPath,
      circleOpacity = _ref2.circleOpacity;
    var p = circleLeftRotation / 360;
    var actualTime = p * time;
    var rotatedPercent = Math.min(100, p * 100);
    var halfPercent = rotatedPercent > 50 ? Math.round((1 - 50 / rotatedPercent) * 100) : 0;
    return {
      rules: {
        main: getMainOut(currentColor, targetColor),
        effect: getEffectOut(effectOpacity, effectScale),
        circleRight: getCircleRightOut(halfPercent, circleRightRotation),
        circleLeft: getCircleLeftOut(circleLeftRotation),
        circle: getCircleOut(halfPercent, circleClipPath, circleOpacity)
      },
      names: {
        main: getMainOutAnimation(actualTime),
        effect: getEffectOutAnimation(actualTime),
        circleRight: getCircleLeftOutAnimation(actualTime),
        circleLeft: getCircleRightOutAnimation(actualTime),
        circle: getCircleOutAnimation(actualTime)
      }
    };
  };

  var ifNotNull = function ifNotNull(v) {
    var alternative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return v === null ? alternative : v;
  };
  var cachedLassoStylesheets;
  var getLassoStylesheets = function getLassoStylesheets() {
    if (!cachedLassoStylesheets) {
      var lassoStyleEl = document.createElement('style');
      document.head.appendChild(lassoStyleEl);
      cachedLassoStylesheets = lassoStyleEl.sheet;
    }
    return cachedLassoStylesheets;
  };
  var addRule = function addRule(rule) {
    var lassoStylesheets = getLassoStylesheets();
    var currentNumRules = lassoStylesheets.rules.length;
    lassoStylesheets.insertRule(rule, currentNumRules);
    return currentNumRules;
  };
  var removeRule = function removeRule(index) {
    getLassoStylesheets().deleteRule(index);
  };
  var inAnimation = "".concat(LASSO_SHOW_START_INITIATOR_TIME, "ms ease scaleInFadeOut 0s 1 normal backwards");
  var createInAnimationRule = function createInAnimationRule(opacity, scale, rotate) {
    return "\n@keyframes scaleInFadeOut {\n  0% {\n    opacity: ".concat(opacity, ";\n    transform: translate(-50%,-50%) scale(").concat(scale, ") rotate(").concat(rotate, "deg);\n  }\n  10% {\n    opacity: 1;\n    transform: translate(-50%,-50%) scale(1) rotate(").concat(rotate + 20, "deg);\n  }\n  100% {\n    opacity: 0;\n    transform: translate(-50%,-50%) scale(0.9) rotate(").concat(rotate + 60, "deg);\n  }\n}\n");
  };
  var inAnimationRuleIndex = null;
  var outAnimation = "".concat(LASSO_HIDE_START_INITIATOR_TIME, "ms ease fadeScaleOut 0s 1 normal backwards");
  var createOutAnimationRule = function createOutAnimationRule(opacity, scale, rotate) {
    return "\n@keyframes fadeScaleOut {\n  0% {\n    opacity: ".concat(opacity, ";\n    transform: translate(-50%,-50%) scale(").concat(scale, ") rotate(").concat(rotate, "deg);\n  }\n  100% {\n    opacity: 0;\n    transform: translate(-50%,-50%) scale(0) rotate(").concat(rotate, "deg);\n  }\n}\n");
  };
  var outAnimationRuleIndex = null;
  var createLasso = function createLasso(element) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$onDraw = _ref.onDraw,
      initialOnDraw = _ref$onDraw === void 0 ? identity : _ref$onDraw,
      _ref$onStart = _ref.onStart,
      initialOnStart = _ref$onStart === void 0 ? identity : _ref$onStart,
      _ref$onEnd = _ref.onEnd,
      initialOnEnd = _ref$onEnd === void 0 ? identity : _ref$onEnd,
      _ref$enableInitiator = _ref.enableInitiator,
      initialenableInitiator = _ref$enableInitiator === void 0 ? DEFAULT_LASSO_START_INITIATOR_SHOW : _ref$enableInitiator,
      _ref$initiatorParentE = _ref.initiatorParentElement,
      initialInitiatorParentElement = _ref$initiatorParentE === void 0 ? document.body : _ref$initiatorParentE,
      _ref$longPressIndicat = _ref.longPressIndicatorParentElement,
      initialLongPressIndicatorParentElement = _ref$longPressIndicat === void 0 ? document.body : _ref$longPressIndicat;
      _ref.minDelay;
      _ref.minDist;
      var _ref$pointNorm = _ref.pointNorm,
      initialPointNorm = _ref$pointNorm === void 0 ? identity : _ref$pointNorm;
    var enableInitiator = initialenableInitiator;
    var initiatorParentElement = initialInitiatorParentElement;
    var longPressIndicatorParentElement = initialLongPressIndicatorParentElement;
    var onDraw = initialOnDraw;
    var onStart = initialOnStart;
    var onEnd = initialOnEnd;
    var pointNorm = initialPointNorm;
    var initiator = document.createElement('div');
    var initiatorId = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    initiator.id = "lasso-initiator-".concat(initiatorId);
    initiator.style.position = 'fixed';
    initiator.style.display = 'flex';
    initiator.style.justifyContent = 'center';
    initiator.style.alignItems = 'center';
    initiator.style.zIndex = 99;
    initiator.style.width = '4rem';
    initiator.style.height = '4rem';
    initiator.style.borderRadius = '4rem';
    initiator.style.opacity = 0.5;
    initiator.style.transform = 'translate(-50%,-50%) scale(0) rotate(0deg)';
    var _createLongPressEleme = createLongPressElements(),
      longPress = _createLongPressEleme.longPress,
      longPressCircle = _createLongPressEleme.longPressCircle,
      longPressCircleLeft = _createLongPressEleme.longPressCircleLeft,
      longPressCircleRight = _createLongPressEleme.longPressCircleRight,
      longPressEffect = _createLongPressEleme.longPressEffect;
    var isMouseDown = false;
    var isLasso = false;
    var lassoPos = [];
    var lassoPosFlat = [];
    var lassoPrevMousePos;
    var longPressIsStarting = false;
    var longPressMainInAnimationRuleIndex = null;
    var longPressEffectInAnimationRuleIndex = null;
    var longPressCircleLeftInAnimationRuleIndex = null;
    var longPressCircleRightInAnimationRuleIndex = null;
    var longPressCircleInAnimationRuleIndex = null;
    var longPressMainOutAnimationRuleIndex = null;
    var longPressEffectOutAnimationRuleIndex = null;
    var longPressCircleLeftOutAnimationRuleIndex = null;
    var longPressCircleRightOutAnimationRuleIndex = null;
    var longPressCircleOutAnimationRuleIndex = null;
    var mouseUpHandler = function mouseUpHandler() {
      isMouseDown = false;
    };
    var getMousePosition = function getMousePosition(event) {
      var _element$getBoundingC = element.getBoundingClientRect(),
        left = _element$getBoundingC.left,
        top = _element$getBoundingC.top;
      return [event.clientX - left, event.clientY - top];
    };
    window.addEventListener('mouseup', mouseUpHandler);
    var resetInitiatorStyle = function resetInitiatorStyle() {
      initiator.style.opacity = 0.5;
      initiator.style.transform = 'translate(-50%,-50%) scale(0) rotate(0deg)';
    };
    var getCurrentTransformStyle = function getCurrentTransformStyle(node, hasRotated) {
      var computedStyle = getComputedStyle(node);
      var opacity = +computedStyle.opacity;
      // The css rule `transform: translate(-1, -1) scale(0.5);` is represented as
      // `matrix(0.5, 0, 0, 0.5, -1, -1)`
      var m = computedStyle.transform.match(/([0-9.-]+)+/g);
      var a = +m[0];
      var b = +m[1];
      var scale = Math.sqrt(a * a + b * b);
      var rotate = Math.atan2(b, a) * (180 / Math.PI);
      rotate = hasRotated && rotate <= 0 ? 360 + rotate : rotate;
      return {
        opacity: opacity,
        scale: scale,
        rotate: rotate
      };
    };
    var showInitiator = function showInitiator(event) {
      if (!enableInitiator || isMouseDown) return;
      var x = event.clientX;
      var y = event.clientY;
      initiator.style.top = "".concat(y, "px");
      initiator.style.left = "".concat(x, "px");
      var style = getCurrentTransformStyle(initiator);
      var opacity = style.opacity;
      var scale = style.scale;
      var rotate = style.rotate;
      initiator.style.opacity = opacity;
      initiator.style.transform = "translate(-50%,-50%) scale(".concat(scale, ") rotate(").concat(rotate, "deg)");
      initiator.style.animation = 'none';

      // See https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Tips
      // why we need to wait for two animation frames
      nextAnimationFrame().then(function () {
        if (inAnimationRuleIndex !== null) removeRule(inAnimationRuleIndex);
        inAnimationRuleIndex = addRule(createInAnimationRule(opacity, scale, rotate));
        initiator.style.animation = inAnimation;
        nextAnimationFrame().then(function () {
          resetInitiatorStyle();
        });
      });
    };
    var hideInitiator = function hideInitiator() {
      var _getCurrentTransformS = getCurrentTransformStyle(initiator),
        opacity = _getCurrentTransformS.opacity,
        scale = _getCurrentTransformS.scale,
        rotate = _getCurrentTransformS.rotate;
      initiator.style.opacity = opacity;
      initiator.style.transform = "translate(-50%,-50%) scale(".concat(scale, ") rotate(").concat(rotate, "deg)");
      initiator.style.animation = 'none';
      nextAnimationFrame(2).then(function () {
        if (outAnimationRuleIndex !== null) removeRule(outAnimationRuleIndex);
        outAnimationRuleIndex = addRule(createOutAnimationRule(opacity, scale, rotate));
        initiator.style.animation = outAnimation;
        nextAnimationFrame().then(function () {
          resetInitiatorStyle();
        });
      });
    };
    var showLongPressIndicator = function showLongPressIndicator(x, y) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
          time: DEFAULT_LASSO_LONG_PRESS_TIME,
          extraTime: DEFAULT_LASSO_LONG_PRESS_AFTER_EFFECT_TIME,
          delay: DEFAULT_LASSO_LONG_PRESS_EFFECT_DELAY
        },
        _ref2$time = _ref2.time,
        time = _ref2$time === void 0 ? DEFAULT_LASSO_LONG_PRESS_TIME : _ref2$time,
        _ref2$extraTime = _ref2.extraTime,
        extraTime = _ref2$extraTime === void 0 ? DEFAULT_LASSO_LONG_PRESS_AFTER_EFFECT_TIME : _ref2$extraTime,
        _ref2$delay = _ref2.delay,
        delay = _ref2$delay === void 0 ? DEFAULT_LASSO_LONG_PRESS_EFFECT_DELAY : _ref2$delay;
      longPressIsStarting = true;
      var mainStyle = getComputedStyle(longPress);
      longPress.style.color = mainStyle.color;
      longPress.style.top = "".concat(y, "px");
      longPress.style.left = "".concat(x, "px");
      longPress.style.animation = 'none';
      var circleStyle = getComputedStyle(longPressCircle);
      longPressCircle.style.clipPath = circleStyle.clipPath;
      longPressCircle.style.opacity = circleStyle.opacity;
      longPressCircle.style.animation = 'none';
      var effectStyle = getCurrentTransformStyle(longPressEffect);
      longPressEffect.style.opacity = effectStyle.opacity;
      longPressEffect.style.transform = "scale(".concat(effectStyle.scale, ")");
      longPressEffect.style.animation = 'none';
      var circleLeftStyle = getCurrentTransformStyle(longPressCircleLeft);
      longPressCircleLeft.style.transform = "rotate(".concat(circleLeftStyle.rotate, "deg)");
      longPressCircleLeft.style.animation = 'none';
      var circleRightStyle = getCurrentTransformStyle(longPressCircleRight);
      longPressCircleRight.style.transform = "rotate(".concat(circleRightStyle.rotate, "deg)");
      longPressCircleRight.style.animation = 'none';
      nextAnimationFrame().then(function () {
        if (!longPressIsStarting) return;
        if (longPressCircleInAnimationRuleIndex !== null) removeRule(longPressCircleInAnimationRuleIndex);
        if (longPressCircleRightInAnimationRuleIndex !== null) removeRule(longPressCircleRightInAnimationRuleIndex);
        if (longPressCircleLeftInAnimationRuleIndex !== null) removeRule(longPressCircleLeftInAnimationRuleIndex);
        if (longPressEffectInAnimationRuleIndex !== null) removeRule(longPressEffectInAnimationRuleIndex);
        if (longPressMainInAnimationRuleIndex !== null) removeRule(longPressMainInAnimationRuleIndex);
        var _createLongPressInAni = createLongPressInAnimations({
            time: time,
            extraTime: extraTime,
            delay: delay,
            currentColor: mainStyle.color || 'currentcolor',
            targetColor: longPress.dataset.activeColor,
            effectOpacity: effectStyle.opacity || 0,
            effectScale: effectStyle.scale || 0,
            circleLeftRotation: circleLeftStyle.rotate || 0,
            circleRightRotation: circleRightStyle.rotate || 0,
            circleClipPath: circleStyle.clipPath || 'inset(0 0 0 50%)',
            circleOpacity: circleStyle.opacity || 0
          }),
          rules = _createLongPressInAni.rules,
          names = _createLongPressInAni.names;
        longPressMainInAnimationRuleIndex = addRule(rules.main);
        longPressEffectInAnimationRuleIndex = addRule(rules.effect);
        longPressCircleLeftInAnimationRuleIndex = addRule(rules.circleLeft);
        longPressCircleRightInAnimationRuleIndex = addRule(rules.circleRight);
        longPressCircleInAnimationRuleIndex = addRule(rules.circle);
        longPress.style.animation = names.main;
        longPressEffect.style.animation = names.effect;
        longPressCircleLeft.style.animation = names.circleLeft;
        longPressCircleRight.style.animation = names.circleRight;
        longPressCircle.style.animation = names.circle;
      });
    };
    var hideLongPressIndicator = function hideLongPressIndicator() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          time: DEFAULT_LASSO_LONG_PRESS_REVERT_EFFECT_TIME
        },
        _ref3$time = _ref3.time,
        time = _ref3$time === void 0 ? DEFAULT_LASSO_LONG_PRESS_REVERT_EFFECT_TIME : _ref3$time;
      if (!longPressIsStarting) return;
      longPressIsStarting = false;
      var mainStyle = getComputedStyle(longPress);
      longPress.style.color = mainStyle.color;
      longPress.style.animation = 'none';
      var circleStyle = getComputedStyle(longPressCircle);
      longPressCircle.style.clipPath = circleStyle.clipPath;
      longPressCircle.style.opacity = circleStyle.opacity;
      longPressCircle.style.animation = 'none';
      var effectStyle = getCurrentTransformStyle(longPressEffect);
      longPressEffect.style.opacity = effectStyle.opacity;
      longPressEffect.style.transform = "scale(".concat(effectStyle.scale, ")");
      longPressEffect.style.animation = 'none';

      // The first half of the circle animation, the clip-path is set to `inset(0px 0px 0px 50%)`.
      // In the second half it's set to `inset(0px)`. Hence we can look at the second to last
      // character to determine if the animatation has progressed passed half time.
      var isAnimatedMoreThan50Percent = circleStyle.clipPath.slice(-2, -1) === 'x';
      var circleLeftStyle = getCurrentTransformStyle(longPressCircleLeft, isAnimatedMoreThan50Percent);
      longPressCircleLeft.style.transform = "rotate(".concat(circleLeftStyle.rotate, "deg)");
      longPressCircleLeft.style.animation = 'none';
      var circleRightStyle = getCurrentTransformStyle(longPressCircleRight);
      longPressCircleRight.style.transform = "rotate(".concat(circleRightStyle.rotate, "deg)");
      longPressCircleRight.style.animation = 'none';
      nextAnimationFrame().then(function () {
        if (longPressCircleOutAnimationRuleIndex !== null) removeRule(longPressCircleOutAnimationRuleIndex);
        if (longPressCircleRightOutAnimationRuleIndex !== null) removeRule(longPressCircleRightOutAnimationRuleIndex);
        if (longPressCircleLeftOutAnimationRuleIndex !== null) removeRule(longPressCircleLeftOutAnimationRuleIndex);
        if (longPressEffectOutAnimationRuleIndex !== null) removeRule(longPressEffectOutAnimationRuleIndex);
        if (longPressMainOutAnimationRuleIndex !== null) removeRule(longPressMainOutAnimationRuleIndex);
        var _createLongPressOutAn = createLongPressOutAnimations({
            time: time,
            currentColor: mainStyle.color || 'currentcolor',
            targetColor: longPress.dataset.color,
            effectOpacity: effectStyle.opacity || 0,
            effectScale: effectStyle.scale || 0,
            circleLeftRotation: circleLeftStyle.rotate || 0,
            circleRightRotation: circleRightStyle.rotate || 0,
            circleClipPath: circleStyle.clipPath || 'inset(0px)',
            circleOpacity: circleStyle.opacity || 1
          }),
          rules = _createLongPressOutAn.rules,
          names = _createLongPressOutAn.names;
        longPressMainOutAnimationRuleIndex = addRule(rules.main);
        longPressEffectOutAnimationRuleIndex = addRule(rules.effect);
        longPressCircleLeftOutAnimationRuleIndex = addRule(rules.circleLeft);
        longPressCircleRightOutAnimationRuleIndex = addRule(rules.circleRight);
        longPressCircleOutAnimationRuleIndex = addRule(rules.circle);
        longPress.style.animation = names.main;
        longPressEffect.style.animation = names.effect;
        longPressCircleLeft.style.animation = names.circleLeft;
        longPressCircleRight.style.animation = names.circleRight;
        longPressCircle.style.animation = names.circle;
      });
    };
    var draw = function draw() {
      onDraw(lassoPos, lassoPosFlat);
    };
    var extend = function extend(currMousePos) {
      if (!lassoPrevMousePos) {
        if (!isLasso) {
          isLasso = true;
          onStart();
        }
        lassoPrevMousePos = currMousePos;
        var point = pointNorm(currMousePos);
        lassoPos = [point];
        lassoPosFlat = [point[0], point[1]];
      } else {
        var d = l2PointDist(currMousePos[0], currMousePos[1], lassoPrevMousePos[0], lassoPrevMousePos[1]);
        if (d > DEFAULT_LASSO_MIN_DIST) {
          lassoPrevMousePos = currMousePos;
          var _point = pointNorm(currMousePos);
          lassoPos.push(_point);
          lassoPosFlat.push(_point[0], _point[1]);
          if (lassoPos.length > 1) {
            draw();
          }
        }
      }
    };
    var extendDb = throttleAndDebounce(extend, DEFAULT_LASSO_MIN_DELAY, DEFAULT_LASSO_MIN_DELAY);
    var extendPublic = function extendPublic(event, debounced) {
      var mousePosition = getMousePosition(event);
      if (debounced) return extendDb(mousePosition);
      return extend(mousePosition);
    };
    var clear = function clear() {
      lassoPos = [];
      lassoPosFlat = [];
      lassoPrevMousePos = undefined;
      draw();
    };
    var initiatorClickHandler = function initiatorClickHandler(event) {
      showInitiator(event);
    };
    var initiatorMouseDownHandler = function initiatorMouseDownHandler() {
      isMouseDown = true;
      isLasso = true;
      clear();
      onStart();
    };
    var initiatorMouseLeaveHandler = function initiatorMouseLeaveHandler() {
      hideInitiator();
    };
    var end = function end() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref4$merge = _ref4.merge,
        merge = _ref4$merge === void 0 ? false : _ref4$merge;
      isLasso = false;
      var currLassoPos = _toConsumableArray(lassoPos);
      var currLassoPosFlat = _toConsumableArray(lassoPosFlat);
      extendDb.cancel();
      clear();

      // When `currLassoPos` is empty the user didn't actually lasso
      if (currLassoPos.length) {
        onEnd(currLassoPos, currLassoPosFlat, {
          merge: merge
        });
      }
      return currLassoPos;
    };
    var set = function set() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref5$onDraw = _ref5.onDraw,
        newOnDraw = _ref5$onDraw === void 0 ? null : _ref5$onDraw,
        _ref5$onStart = _ref5.onStart,
        newOnStart = _ref5$onStart === void 0 ? null : _ref5$onStart,
        _ref5$onEnd = _ref5.onEnd,
        newOnEnd = _ref5$onEnd === void 0 ? null : _ref5$onEnd,
        _ref5$enableInitiator = _ref5.enableInitiator,
        newEnableInitiator = _ref5$enableInitiator === void 0 ? null : _ref5$enableInitiator,
        _ref5$initiatorParent = _ref5.initiatorParentElement,
        newInitiatorParentElement = _ref5$initiatorParent === void 0 ? null : _ref5$initiatorParent,
        _ref5$longPressIndica = _ref5.longPressIndicatorParentElement,
        newLongPressIndicatorParentElement = _ref5$longPressIndica === void 0 ? null : _ref5$longPressIndica;
        _ref5.minDelay;
        _ref5.minDist;
        var _ref5$pointNorm = _ref5.pointNorm,
        newPointNorm = _ref5$pointNorm === void 0 ? null : _ref5$pointNorm;
      onDraw = ifNotNull(newOnDraw, onDraw);
      onStart = ifNotNull(newOnStart, onStart);
      onEnd = ifNotNull(newOnEnd, onEnd);
      enableInitiator = ifNotNull(newEnableInitiator, enableInitiator);
      pointNorm = ifNotNull(newPointNorm, pointNorm);
      if (newInitiatorParentElement !== null && newInitiatorParentElement !== initiatorParentElement) {
        initiatorParentElement.removeChild(initiator);
        newInitiatorParentElement.appendChild(initiator);
        initiatorParentElement = newInitiatorParentElement;
      }
      if (newLongPressIndicatorParentElement !== null && newLongPressIndicatorParentElement !== longPressIndicatorParentElement) {
        longPressIndicatorParentElement.removeChild(longPress);
        newLongPressIndicatorParentElement.appendChild(longPress);
        longPressIndicatorParentElement = newLongPressIndicatorParentElement;
      }
      if (enableInitiator) {
        initiator.addEventListener('click', initiatorClickHandler);
        initiator.addEventListener('mousedown', initiatorMouseDownHandler);
        initiator.addEventListener('mouseleave', initiatorMouseLeaveHandler);
      } else {
        initiator.removeEventListener('mousedown', initiatorMouseDownHandler);
        initiator.removeEventListener('mouseleave', initiatorMouseLeaveHandler);
      }
    };
    var destroy = function destroy() {
      initiatorParentElement.removeChild(initiator);
      longPressIndicatorParentElement.removeChild(longPress);
      window.removeEventListener('mouseup', mouseUpHandler);
      initiator.removeEventListener('click', initiatorClickHandler);
      initiator.removeEventListener('mousedown', initiatorMouseDownHandler);
      initiator.removeEventListener('mouseleave', initiatorMouseLeaveHandler);
    };
    var withPublicMethods = function withPublicMethods() {
      return function (self) {
        return assign(self, {
          clear: clear,
          destroy: destroy,
          end: end,
          extend: extendPublic,
          set: set,
          showInitiator: showInitiator,
          hideInitiator: hideInitiator,
          showLongPressIndicator: showLongPressIndicator,
          hideLongPressIndicator: hideLongPressIndicator
        });
      };
    };
    initiatorParentElement.appendChild(initiator);
    longPressIndicatorParentElement.appendChild(longPress);
    set({
      onDraw: onDraw,
      onStart: onStart,
      onEnd: onEnd,
      enableInitiator: enableInitiator,
      initiatorParentElement: initiatorParentElement
    });
    return pipe(withStaticProperty('initiator', initiator), withStaticProperty('longPressIndicator', longPress), withPublicMethods(), withConstructor(createLasso))({});
  };

  const FRAGMENT_SHADER$2 = `
precision mediump float;

uniform sampler2D texture;

varying vec2 uv;

void main () {
  gl_FragColor = texture2D(texture, uv);
}
`;

  const VERTEX_SHADER = `
precision mediump float;

uniform mat4 modelViewProjection;

attribute vec2 position;

varying vec2 uv;

void main () {
  uv = position;
  gl_Position = modelViewProjection * vec4(-1.0 + 2.0 * uv.x, 1.0 - 2.0 * uv.y, 0, 1);
}
`;

  const FRAGMENT_SHADER$1 = `
precision highp float;

varying vec4 color;
varying float finalPointSize;

float linearstep(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {
  vec2 c = gl_PointCoord * 2.0 - 1.0;
  float sdf = length(c) * finalPointSize;
  float alpha = linearstep(finalPointSize + 0.5, finalPointSize - 0.5, sdf);

  gl_FragColor = vec4(color.rgb, alpha * color.a);
}
`;

  const FRAGMENT_SHADER = `precision highp float;

varying vec4 color;

void main() {
  gl_FragColor = color;
}
`;

  const createVertexShader = (globalState) => `
precision highp float;

uniform sampler2D colorTex;
uniform float colorTexRes;
uniform float colorTexEps;
uniform sampler2D stateTex;
uniform float stateTexRes;
uniform float stateTexEps;
uniform float devicePixelRatio;
uniform sampler2D encodingTex;
uniform float encodingTexRes;
uniform float encodingTexEps;
uniform float pointSizeExtra;
uniform float pointOpacityMax;
uniform float pointOpacityScale;
uniform float numPoints;
uniform float globalState;
uniform float isColoredByZ;
uniform float isColoredByW;
uniform float isOpacityByZ;
uniform float isOpacityByW;
uniform float isOpacityByDensity;
uniform float isSizedByZ;
uniform float isSizedByW;
uniform float colorMultiplicator;
uniform float opacityMultiplicator;
uniform float opacityDensity;
uniform float sizeMultiplicator;
uniform float numColorStates;
uniform float pointScale;
uniform mat4 modelViewProjection;

attribute vec2 stateIndex;

varying vec4 color;
varying float finalPointSize;

void main() {
  vec4 state = texture2D(stateTex, stateIndex);

  gl_Position = modelViewProjection * vec4(state.x, state.y, 0.0, 1.0);

  // Determine color index
  float colorIndexZ =  isColoredByZ * floor(state.z * colorMultiplicator);
  float colorIndexW =  isColoredByW * floor(state.w * colorMultiplicator);

  // Multiply by the number of color states per color
  // I.e., normal, active, hover, background, etc.
  float colorIndex = (colorIndexZ + colorIndexW) * numColorStates;

  // Half a "pixel" or "texel" in texture coordinates
  float colorLinearIndex = colorIndex + globalState;

  // Need to add cEps here to avoid floating point issue that can lead to
  // dramatic changes in which color is loaded as floor(3/2.9999) = 1 but
  // floor(3/3.0001) = 0!
  float colorRowIndex = floor((colorLinearIndex + colorTexEps) / colorTexRes);

  vec2 colorTexIndex = vec2(
    (colorLinearIndex / colorTexRes) - colorRowIndex + colorTexEps,
    colorRowIndex / colorTexRes + colorTexEps
  );

  color = texture2D(colorTex, colorTexIndex);

  // Retrieve point size
  float pointSizeIndexZ = isSizedByZ * floor(state.z * sizeMultiplicator);
  float pointSizeIndexW = isSizedByW * floor(state.w * sizeMultiplicator);
  float pointSizeIndex = pointSizeIndexZ + pointSizeIndexW;

  float pointSizeRowIndex = floor((pointSizeIndex + encodingTexEps) / encodingTexRes);
  vec2 pointSizeTexIndex = vec2(
    (pointSizeIndex / encodingTexRes) - pointSizeRowIndex + encodingTexEps,
    pointSizeRowIndex / encodingTexRes + encodingTexEps
  );
  float pointSize = texture2D(encodingTex, pointSizeTexIndex).x;

  // Retrieve opacity
  ${
    (() => {
      // Drawing the inner border of selected points
      if (globalState === 3) return '';

      // Draw points with opacity encoding or dynamic opacity
      return `
        if (isOpacityByDensity < 0.5) {
          float opacityIndexZ = isOpacityByZ * floor(state.z * opacityMultiplicator);
          float opacityIndexW = isOpacityByW * floor(state.w * opacityMultiplicator);
          float opacityIndex = opacityIndexZ + opacityIndexW;

          float opacityRowIndex = floor((opacityIndex + encodingTexEps) / encodingTexRes);
          vec2 opacityTexIndex = vec2(
            (opacityIndex / encodingTexRes) - opacityRowIndex + encodingTexEps,
            opacityRowIndex / encodingTexRes + encodingTexEps
          );
          color.a = texture2D(encodingTex, opacityTexIndex)[${1 + globalState}];
        } else {
          color.a = min(1.0, opacityDensity + globalState);
        }
      `;
    })()
  }

  color.a = min(pointOpacityMax, color.a) * pointOpacityScale;
  finalPointSize = (pointSize * pointScale) + pointSizeExtra;
  gl_PointSize = finalPointSize;
}
`;

  const SHADER$1 = `precision highp float;

uniform sampler2D startStateTex;
uniform sampler2D endStateTex;
uniform float t;

varying vec2 particleTextureIndex;

void main() {
  // Interpolate x, y, and value
  vec3 start = texture2D(startStateTex, particleTextureIndex).xyw;
  vec3 end = texture2D(endStateTex, particleTextureIndex).xyw;
  vec3 curr = start * (1.0 - t) + end * t;

  // The category cannot be interpolated
  float endCategory = texture2D(endStateTex, particleTextureIndex).z;

  gl_FragColor = vec4(curr.xy, endCategory, curr.z);
}`;

  const SHADER = `precision highp float;

attribute vec2 position;
varying vec2 particleTextureIndex;

void main() {
  // map normalized device coords to texture coords
  particleTextureIndex = 0.5 * (1.0 + position);

  gl_Position = vec4(position, 0, 1);
}`;

  /* eslint-env worker */
  /* eslint no-restricted-globals: 1 */

  var worker = function worker() {

    /**
     * Catmull-Rom interpolation
     * @param {number} t - Progress value
     * @param {array} p0 - First point
     * @param {array} p1 - Second point
     * @param {array} p2 - Third point
     * @param {array} p3 - Forth point
     * @return {number} Interpolated value
     */
    var catmullRom = function catmullRom(t, p0, p1, p2, p3) {
      var v0 = (p2 - p0) * 0.5;
      var v1 = (p3 - p1) * 0.5;
      return (2 * p1 - 2 * p2 + v0 + v1) * t * t * t + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t * t + v0 * t + p1;
    };

    /**
     * Interpolate a point with Catmull-Rom
     * @param {number} t - Progress value
     * @param {array} points - Key points
     * @param {number}  maxPointIdx - Highest point index. Same as array.length - 1
     * @return {array} Interpolated point
     */
    var interpolatePoint = function interpolatePoint(t, points, maxPointIdx) {
      var p = maxPointIdx * t;
      var intPoint = Math.floor(p);
      var weight = p - intPoint;
      var p0 = points[Math.max(0, intPoint - 1)];
      var p1 = points[intPoint];
      var p2 = points[Math.min(maxPointIdx, intPoint + 1)];
      var p3 = points[Math.min(maxPointIdx, intPoint + 2)];
      return [catmullRom(weight, p0[0], p1[0], p2[0], p3[0]), catmullRom(weight, p0[1], p1[1], p2[1], p3[1])];
    };

    /**
     * Square distance
     * @param {number} x1 - First x coordinate
     * @param {number} y1 - First y coordinate
     * @param {number} x2 - Second x coordinate
     * @param {number} y2 - Second y coordinate
     * @return {number} Distance
     */
    var sqDist = function sqDist(x1, y1, x2, y2) {
      return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
    };

    /**
     * Douglas Peucker square segment distance
     * Implementation from https://github.com/mourner/simplify-js
     * @author Vladimir Agafonkin
     * @copyright Vladimir Agafonkin 2013
     * @license BSD
     * @param {array} p - Point
     * @param {array} p1 - First boundary point
     * @param {array} p2 - Second boundary point
     * @return {number} Distance
     */
    var sqSegDist = function sqSegDist(p, p1, p2) {
      var x = p1[0];
      var y = p1[1];
      var dx = p2[0] - x;
      var dy = p2[1] - y;
      if (dx !== 0 || dy !== 0) {
        var t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
        if (t > 1) {
          x = p2[0];
          y = p2[1];
        } else if (t > 0) {
          x += dx * t;
          y += dy * t;
        }
      }
      dx = p[0] - x;
      dy = p[1] - y;
      return dx * dx + dy * dy;
    };

    /**
     * Douglas Peucker step function
     * Implementation from https://github.com/mourner/simplify-js
     * @author Vladimir Agafonkin
     * @copyright Vladimir Agafonkin 2013
     * @license BSD
     * @param   {[type]}  points  [description]
     * @param   {[type]}  first  [description]
     * @param   {[type]}  last  [description]
     * @param   {[type]}  tolerance  [description]
     * @param   {[type]}  simplified  [description]
     * @return  {[type]}  [description]
     */
    var simplifyDPStep = function simplifyDPStep(points, first, last, tolerance, simplified) {
      var maxDist = tolerance;
      var index;
      for (var i = first + 1; i < last; i++) {
        var dist = sqSegDist(points[i], points[first], points[last]);
        if (dist > maxDist) {
          index = i;
          maxDist = dist;
        }
      }
      if (maxDist > tolerance) {
        if (index - first > 1) simplifyDPStep(points, first, index, tolerance, simplified);
        simplified.push(points[index]);
        if (last - index > 1) simplifyDPStep(points, index, last, tolerance, simplified);
      }
    };

    /**
     * Douglas Peucker. Implementation from https://github.com/mourner/simplify-js
     * @author Vladimir Agafonkin
     * @copyright Vladimir Agafonkin 2013
     * @license BSD
     * @param {array} points - List of points to be simplified
     * @param {number} tolerance - Tolerance level. Points below this distance level will be ignored
     * @return {array} Simplified point list
     */
    var simplifyDouglasPeucker = function simplifyDouglasPeucker(points, tolerance) {
      var last = points.length - 1;
      var simplified = [points[0]];
      simplifyDPStep(points, 0, last, tolerance, simplified);
      simplified.push(points[last]);
      return simplified;
    };

    /**
     * Interpolate intermediate points between key points
     * @param {array} points - Fixed key points
     * @param {number} options.maxIntPointsPerSegment - Maximum number of points between two key points
     * @param {number} options.tolerance - Simplification tolerance
     * @return {array} Interpolated points including key points
     */
    var interpolatePoints = function interpolatePoints(points) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$maxIntPointsPerS = _ref.maxIntPointsPerSegment,
        maxIntPointsPerSegment = _ref$maxIntPointsPerS === void 0 ? 100 : _ref$maxIntPointsPerS,
        _ref$tolerance = _ref.tolerance,
        tolerance = _ref$tolerance === void 0 ? 0.002 : _ref$tolerance;
      var numPoints = points.length;
      var maxPointIdx = numPoints - 1;
      var maxOutPoints = maxPointIdx * maxIntPointsPerSegment + 1;
      var sqTolerance = Math.pow(tolerance, 2);
      var outPoints = [];
      var prevPoint;

      // Generate interpolated points where the squared-distance between points
      // is larger than sqTolerance
      for (var i = 0; i < numPoints - 1; i++) {
        var segmentPoints = [points[i].slice(0, 2)];
        prevPoint = points[i];
        for (var j = 1; j < maxIntPointsPerSegment; j++) {
          var t = (i * maxIntPointsPerSegment + j) / maxOutPoints;
          var intPoint = interpolatePoint(t, points, maxPointIdx);

          // Check squared distance simplification
          if (sqDist(prevPoint[0], prevPoint[1], intPoint[0], intPoint[1]) > sqTolerance) {
            segmentPoints.push(intPoint);
            prevPoint = intPoint;
          }
        }

        // Add next key point. Needed for the simplification algorithm
        segmentPoints.push(points[i + 1]);
        // Simplify interpolated points using the douglas-peuckner algorithm
        segmentPoints = simplifyDouglasPeucker(segmentPoints, sqTolerance);
        // Add simplified points without the last key point, which is added
        // anyway in the next segment
        outPoints = outPoints.concat(segmentPoints.slice(0, segmentPoints.length - 1));
      }
      outPoints.push(points[points.length - 1].slice(0, 2));
      return outPoints.flat();
    };

    /**
     * Group points by line assignment (the fifth component of a point)
     * @param {array} points - Flat list of points
     * @return {array} List of lists of ordered points by line
     */
    var groupPoints = function groupPoints(points) {
      var groupedPoints = {};
      var isOrdered = !Number.isNaN(+points[0][5]);
      points.forEach(function (point) {
        var segId = point[4];
        if (!groupedPoints[segId]) groupedPoints[segId] = [];
        if (isOrdered) groupedPoints[segId][point[5]] = point;else groupedPoints[segId].push(point);
      });

      // The filtering ensures that non-existing array entries are removed
      Object.entries(groupedPoints).forEach(function (idPoints) {
        groupedPoints[idPoints[0]] = idPoints[1].filter(function (v) {
          return v;
        });
        // Store the first point as the reference
        groupedPoints[idPoints[0]].reference = idPoints[1][0];
      });
      return groupedPoints;
    };
    self.onmessage = function onmessage(event) {
      var numPoints = event.data.points ? +event.data.points.length : 0;
      if (!numPoints) self.postMessage({
        error: new Error('No points provided')
      });
      event.data.points;
      var groupedPoints = groupPoints(event.data.points);
      self.postMessage({
        points: Object.entries(groupedPoints).reduce(function (curvePoints, idAndPoints) {
          curvePoints[idAndPoints[0]] = interpolatePoints(idAndPoints[1], event.data.options);
          // Make sure the reference is passed on
          curvePoints[idAndPoints[0]].reference = idAndPoints[1].reference;
          return curvePoints;
        }, {})
      });
    };
  };

  var createSplineCurve = function createSplineCurve(points) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      tolerance: 0.002,
      maxIntPointsPerSegment: 100
    };
    return new Promise(function (resolve, reject) {
      var worker$1 = createWorker(worker);
      worker$1.onmessage = function (e) {
        if (e.data.error) reject(e.data.error);else resolve(e.data.points);
        worker$1.terminate();
      };
      worker$1.postMessage({
        points: points,
        options: options
      });
    });
  };

  var version = "1.8.4";

  var deprecations = {
    showRecticle: 'showReticle',
    recticleColor: 'reticleColor'
  };
  var checkDeprecations = function checkDeprecations(properties) {
    Object.keys(properties).filter(function (prop) {
      return deprecations[prop];
    }).forEach(function (name) {
      console.warn("regl-scatterplot: the \"".concat(name, "\" property is deprecated. Please use \"").concat(deprecations[name], "\" instead."));
      properties[deprecations[name]] = properties[name];
      delete properties[name];
    });
  };
  var getEncodingType = function getEncodingType(type, defaultValue) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$allowSegment = _ref.allowSegment,
      allowSegment = _ref$allowSegment === void 0 ? false : _ref$allowSegment,
      _ref$allowDensity = _ref.allowDensity,
      allowDensity = _ref$allowDensity === void 0 ? false : _ref$allowDensity;
    // Z refers to the 3rd component of the RGBA value
    if (Z_NAMES.has(type)) return 'valueZ';

    // W refers to the 4th component of the RGBA value
    if (W_NAMES.has(type)) return 'valueW';
    if (type === 'segment') return allowSegment ? 'segment' : defaultValue;
    if (type === 'density') return allowDensity ? 'density' : defaultValue;
    return defaultValue;
  };
  var getEncodingIdx = function getEncodingIdx(type) {
    switch (type) {
      case 'valueZ':
        return 2;
      case 'valueW':
        return 3;
      default:
        return null;
    }
  };
  var createScatterplot = function createScatterplot() {
    var initialProperties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    /** @type {import('./types').PubSub} */
    var pubSub = createPubSub__default.default({
      async: !initialProperties.syncEvents,
      caseInsensitive: true
    });
    var scratch = new Float32Array(16);
    var pvm = new Float32Array(16);
    var mousePosition = [0, 0];
    checkDeprecations(initialProperties);
    var renderer = initialProperties.renderer,
      _initialProperties$ba = initialProperties.backgroundColor,
      backgroundColor = _initialProperties$ba === void 0 ? DEFAULT_COLOR_BG : _initialProperties$ba,
      _initialProperties$ba2 = initialProperties.backgroundImage,
      backgroundImage = _initialProperties$ba2 === void 0 ? DEFAULT_BACKGROUND_IMAGE : _initialProperties$ba2,
      _initialProperties$ca = initialProperties.canvas,
      canvas = _initialProperties$ca === void 0 ? document.createElement('canvas') : _initialProperties$ca,
      _initialProperties$co = initialProperties.colorBy,
      colorBy = _initialProperties$co === void 0 ? DEFAULT_COLOR_BY : _initialProperties$co,
      _initialProperties$de = initialProperties.deselectOnDblClick,
      deselectOnDblClick = _initialProperties$de === void 0 ? DEFAULT_DESELECT_ON_DBL_CLICK : _initialProperties$de,
      _initialProperties$de2 = initialProperties.deselectOnEscape,
      deselectOnEscape = _initialProperties$de2 === void 0 ? DEFAULT_DESELECT_ON_ESCAPE : _initialProperties$de2,
      _initialProperties$la = initialProperties.lassoColor,
      lassoColor = _initialProperties$la === void 0 ? DEFAULT_LASSO_COLOR : _initialProperties$la,
      _initialProperties$la2 = initialProperties.lassoLineWidth,
      lassoLineWidth = _initialProperties$la2 === void 0 ? DEFAULT_LASSO_LINE_WIDTH : _initialProperties$la2,
      _initialProperties$la3 = initialProperties.lassoMinDelay,
      lassoMinDelay = _initialProperties$la3 === void 0 ? DEFAULT_LASSO_MIN_DELAY$1 : _initialProperties$la3,
      _initialProperties$la4 = initialProperties.lassoMinDist,
      lassoMinDist = _initialProperties$la4 === void 0 ? DEFAULT_LASSO_MIN_DIST$1 : _initialProperties$la4,
      _initialProperties$la5 = initialProperties.lassoClearEvent,
      lassoClearEvent = _initialProperties$la5 === void 0 ? DEFAULT_LASSO_CLEAR_EVENT : _initialProperties$la5,
      _initialProperties$la6 = initialProperties.lassoInitiator,
      lassoInitiator = _initialProperties$la6 === void 0 ? DEFAULT_LASSO_INITIATOR : _initialProperties$la6,
      _initialProperties$la7 = initialProperties.lassoInitiatorParentElement,
      lassoInitiatorParentElement = _initialProperties$la7 === void 0 ? document.body : _initialProperties$la7,
      _initialProperties$la8 = initialProperties.lassoOnLongPress,
      lassoOnLongPress = _initialProperties$la8 === void 0 ? DEFAULT_LASSO_ON_LONG_PRESS : _initialProperties$la8,
      _initialProperties$la9 = initialProperties.lassoLongPressTime,
      lassoLongPressTime = _initialProperties$la9 === void 0 ? DEFAULT_LASSO_LONG_PRESS_TIME : _initialProperties$la9,
      _initialProperties$la10 = initialProperties.lassoLongPressAfterEffectTime,
      lassoLongPressAfterEffectTime = _initialProperties$la10 === void 0 ? DEFAULT_LASSO_LONG_PRESS_AFTER_EFFECT_TIME : _initialProperties$la10,
      _initialProperties$la11 = initialProperties.lassoLongPressEffectDelay,
      lassoLongPressEffectDelay = _initialProperties$la11 === void 0 ? DEFAULT_LASSO_LONG_PRESS_EFFECT_DELAY : _initialProperties$la11,
      _initialProperties$la12 = initialProperties.lassoLongPressRevertEffectTime,
      lassoLongPressRevertEffectTime = _initialProperties$la12 === void 0 ? DEFAULT_LASSO_LONG_PRESS_REVERT_EFFECT_TIME : _initialProperties$la12,
      _initialProperties$ke = initialProperties.keyMap,
      keyMap = _initialProperties$ke === void 0 ? DEFAULT_KEY_MAP : _initialProperties$ke,
      _initialProperties$mo = initialProperties.mouseMode,
      mouseMode = _initialProperties$mo === void 0 ? DEFAULT_MOUSE_MODE : _initialProperties$mo,
      _initialProperties$sh = initialProperties.showReticle,
      showReticle = _initialProperties$sh === void 0 ? DEFAULT_SHOW_RETICLE : _initialProperties$sh,
      _initialProperties$re = initialProperties.reticleColor,
      reticleColor = _initialProperties$re === void 0 ? DEFAULT_RETICLE_COLOR : _initialProperties$re,
      _initialProperties$po = initialProperties.pointColor,
      pointColor = _initialProperties$po === void 0 ? DEFAULT_COLOR_NORMAL : _initialProperties$po,
      _initialProperties$po2 = initialProperties.pointColorActive,
      pointColorActive = _initialProperties$po2 === void 0 ? DEFAULT_COLOR_ACTIVE : _initialProperties$po2,
      _initialProperties$po3 = initialProperties.pointColorHover,
      pointColorHover = _initialProperties$po3 === void 0 ? DEFAULT_COLOR_HOVER : _initialProperties$po3,
      _initialProperties$sh2 = initialProperties.showPointConnections,
      showPointConnections = _initialProperties$sh2 === void 0 ? DEFAULT_SHOW_POINT_CONNECTIONS : _initialProperties$sh2,
      _initialProperties$po4 = initialProperties.pointConnectionColor,
      pointConnectionColor = _initialProperties$po4 === void 0 ? DEFAULT_POINT_CONNECTION_COLOR_NORMAL : _initialProperties$po4,
      _initialProperties$po5 = initialProperties.pointConnectionColorActive,
      pointConnectionColorActive = _initialProperties$po5 === void 0 ? DEFAULT_POINT_CONNECTION_COLOR_ACTIVE : _initialProperties$po5,
      _initialProperties$po6 = initialProperties.pointConnectionColorHover,
      pointConnectionColorHover = _initialProperties$po6 === void 0 ? DEFAULT_POINT_CONNECTION_COLOR_HOVER : _initialProperties$po6,
      _initialProperties$po7 = initialProperties.pointConnectionColorBy,
      pointConnectionColorBy = _initialProperties$po7 === void 0 ? DEFAULT_POINT_CONNECTION_COLOR_BY : _initialProperties$po7,
      _initialProperties$po8 = initialProperties.pointConnectionOpacity,
      pointConnectionOpacity = _initialProperties$po8 === void 0 ? DEFAULT_POINT_CONNECTION_OPACITY : _initialProperties$po8,
      _initialProperties$po9 = initialProperties.pointConnectionOpacityBy,
      pointConnectionOpacityBy = _initialProperties$po9 === void 0 ? DEFAULT_POINT_CONNECTION_OPACITY_BY : _initialProperties$po9,
      _initialProperties$po10 = initialProperties.pointConnectionOpacityActive,
      pointConnectionOpacityActive = _initialProperties$po10 === void 0 ? DEFAULT_POINT_CONNECTION_OPACITY_ACTIVE : _initialProperties$po10,
      _initialProperties$po11 = initialProperties.pointConnectionSize,
      pointConnectionSize = _initialProperties$po11 === void 0 ? DEFAULT_POINT_CONNECTION_SIZE : _initialProperties$po11,
      _initialProperties$po12 = initialProperties.pointConnectionSizeActive,
      pointConnectionSizeActive = _initialProperties$po12 === void 0 ? DEFAULT_POINT_CONNECTION_SIZE_ACTIVE : _initialProperties$po12,
      _initialProperties$po13 = initialProperties.pointConnectionSizeBy,
      pointConnectionSizeBy = _initialProperties$po13 === void 0 ? DEFAULT_POINT_CONNECTION_SIZE_BY : _initialProperties$po13,
      _initialProperties$po14 = initialProperties.pointConnectionMaxIntPointsPerSegment,
      pointConnectionMaxIntPointsPerSegment = _initialProperties$po14 === void 0 ? DEFAULT_POINT_CONNECTION_MAX_INT_POINTS_PER_SEGMENT : _initialProperties$po14,
      _initialProperties$po15 = initialProperties.pointConnectionTolerance,
      pointConnectionTolerance = _initialProperties$po15 === void 0 ? DEFAULT_POINT_CONNECTION_INT_POINTS_TOLERANCE : _initialProperties$po15,
      _initialProperties$po16 = initialProperties.pointSize,
      pointSize = _initialProperties$po16 === void 0 ? DEFAULT_POINT_SIZE : _initialProperties$po16,
      _initialProperties$po17 = initialProperties.pointSizeSelected,
      pointSizeSelected = _initialProperties$po17 === void 0 ? DEFAULT_POINT_SIZE_SELECTED : _initialProperties$po17,
      _initialProperties$po18 = initialProperties.pointSizeMouseDetection,
      pointSizeMouseDetection = _initialProperties$po18 === void 0 ? DEFAULT_POINT_SIZE_MOUSE_DETECTION : _initialProperties$po18,
      _initialProperties$po19 = initialProperties.pointOutlineWidth,
      pointOutlineWidth = _initialProperties$po19 === void 0 ? DEFAULT_POINT_OUTLINE_WIDTH : _initialProperties$po19,
      _initialProperties$op = initialProperties.opacity,
      opacity = _initialProperties$op === void 0 ? AUTO : _initialProperties$op,
      _initialProperties$op2 = initialProperties.opacityBy,
      opacityBy = _initialProperties$op2 === void 0 ? DEFAULT_OPACITY_BY : _initialProperties$op2,
      _initialProperties$op3 = initialProperties.opacityByDensityFill,
      opacityByDensityFill = _initialProperties$op3 === void 0 ? DEFAULT_OPACITY_BY_DENSITY_FILL : _initialProperties$op3,
      _initialProperties$op4 = initialProperties.opacityInactiveMax,
      opacityInactiveMax = _initialProperties$op4 === void 0 ? DEFAULT_OPACITY_INACTIVE_MAX : _initialProperties$op4,
      _initialProperties$op5 = initialProperties.opacityInactiveScale,
      opacityInactiveScale = _initialProperties$op5 === void 0 ? DEFAULT_OPACITY_INACTIVE_SCALE : _initialProperties$op5,
      _initialProperties$si = initialProperties.sizeBy,
      sizeBy = _initialProperties$si === void 0 ? DEFAULT_SIZE_BY : _initialProperties$si,
      _initialProperties$he = initialProperties.height,
      height = _initialProperties$he === void 0 ? DEFAULT_HEIGHT : _initialProperties$he,
      _initialProperties$wi = initialProperties.width,
      width = _initialProperties$wi === void 0 ? DEFAULT_WIDTH : _initialProperties$wi;
    var currentWidth = width === AUTO ? 1 : width;
    var currentHeight = height === AUTO ? 1 : height;

    // The following properties cannot be changed after the initialization
    var _initialProperties$pe = initialProperties.performanceMode,
      performanceMode = _initialProperties$pe === void 0 ? DEFAULT_PERFORMANCE_MODE : _initialProperties$pe,
      _initialProperties$op6 = initialProperties.opacityByDensityDebounceTime,
      opacityByDensityDebounceTime = _initialProperties$op6 === void 0 ? DEFAULT_OPACITY_BY_DENSITY_DEBOUNCE_TIME : _initialProperties$op6;

    // Same as renderer ||= createRenderer({ ... }) but avoids having to rely on
    // https://babeljs.io/docs/en/babel-plugin-proposal-logical-assignment-operators
    // eslint-disable-next-line no-unused-expressions
    renderer || (renderer = createRenderer({
      regl: initialProperties.regl,
      gamma: initialProperties.gamma
    }));
    backgroundColor = toRgba(backgroundColor, true);
    lassoColor = toRgba(lassoColor, true);
    reticleColor = toRgba(reticleColor, true);
    var isDestroyed = false;
    var backgroundColorBrightness = rgbBrightness(backgroundColor);
    var camera;
    var lasso;
    var mouseDown = false;
    var mouseDownTime = null;
    var mouseDownPosition = [0, 0];
    var mouseDownTimeout = -1;
    /** @type{number[]} */
    var selectedPoints = [];
    /** @type{Set<number>} */
    var selectedPointsSet = new Set();
    /** @type{Set<number>} */
    var selectedPointsConnectionSet = new Set();
    var isPointsFiltered = false;
    /** @type{Set<number>} */
    var filteredPointsSet = new Set();
    var numPoints = 0;
    var numPointsInView = 0;
    var lassoActive = false;
    var lassoPointsCurr = [];
    var searchIndex;
    var viewAspectRatio;
    var dataAspectRatio = initialProperties.aspectRatio || DEFAULT_DATA_ASPECT_RATIO;
    var projectionLocal;
    var projection;
    var model;
    var pointConnections;
    var pointConnectionMap;
    var computingPointConnectionCurves;
    var reticleHLine;
    var reticleVLine;
    var computedPointSizeMouseDetection;
    var keyActionMap = flipObj(keyMap);
    var lassoInitiatorTimeout;
    var topRightNdc;
    var bottomLeftNdc;
    var preventEventView = false;
    var draw = true;
    var drawReticleOnce = false;
    var canvasObserver;
    pointColor = isMultipleColors(pointColor) ? _toConsumableArray(pointColor) : [pointColor];
    pointColorActive = isMultipleColors(pointColorActive) ? _toConsumableArray(pointColorActive) : [pointColorActive];
    pointColorHover = isMultipleColors(pointColorHover) ? _toConsumableArray(pointColorHover) : [pointColorHover];
    pointColor = pointColor.map(function (color) {
      return toRgba(color, true);
    });
    pointColorActive = pointColorActive.map(function (color) {
      return toRgba(color, true);
    });
    pointColorHover = pointColorHover.map(function (color) {
      return toRgba(color, true);
    });
    opacity = !Array.isArray(opacity) && Number.isNaN(+opacity) ? pointColor[0][3] : opacity;
    opacity = isConditionalArray(opacity, isPositiveNumber, {
      minLength: 1
    }) ? _toConsumableArray(opacity) : [opacity];
    pointSize = isConditionalArray(pointSize, isPositiveNumber, {
      minLength: 1
    }) ? _toConsumableArray(pointSize) : [pointSize];
    var minPointScale = MIN_POINT_SIZE / pointSize[0];
    if (pointConnectionColor === 'inherit') {
      pointConnectionColor = _toConsumableArray(pointColor);
    } else {
      pointConnectionColor = isMultipleColors(pointConnectionColor) ? _toConsumableArray(pointConnectionColor) : [pointConnectionColor];
      pointConnectionColor = pointConnectionColor.map(function (color) {
        return toRgba(color, true);
      });
    }
    if (pointConnectionColorActive === 'inherit') {
      pointConnectionColorActive = _toConsumableArray(pointColorActive);
    } else {
      pointConnectionColorActive = isMultipleColors(pointConnectionColorActive) ? _toConsumableArray(pointConnectionColorActive) : [pointConnectionColorActive];
      pointConnectionColorActive = pointConnectionColorActive.map(function (color) {
        return toRgba(color, true);
      });
    }
    if (pointConnectionColorHover === 'inherit') {
      pointConnectionColorHover = _toConsumableArray(pointColorHover);
    } else {
      pointConnectionColorHover = isMultipleColors(pointConnectionColorHover) ? _toConsumableArray(pointConnectionColorHover) : [pointConnectionColorHover];
      pointConnectionColorHover = pointConnectionColorHover.map(function (color) {
        return toRgba(color, true);
      });
    }
    if (pointConnectionOpacity === 'inherit') {
      pointConnectionOpacity = _toConsumableArray(opacity);
    } else {
      pointConnectionOpacity = isConditionalArray(pointConnectionOpacity, isPositiveNumber, {
        minLength: 1
      }) ? _toConsumableArray(pointConnectionOpacity) : [pointConnectionOpacity];
    }
    if (pointConnectionSize === 'inherit') {
      pointConnectionSize = _toConsumableArray(pointSize);
    } else {
      pointConnectionSize = isConditionalArray(pointConnectionSize, isPositiveNumber, {
        minLength: 1
      }) ? _toConsumableArray(pointConnectionSize) : [pointConnectionSize];
    }
    colorBy = getEncodingType(colorBy, DEFAULT_COLOR_BY);
    opacityBy = getEncodingType(opacityBy, DEFAULT_OPACITY_BY, {
      allowDensity: true
    });
    sizeBy = getEncodingType(sizeBy, DEFAULT_SIZE_BY);
    pointConnectionColorBy = getEncodingType(pointConnectionColorBy, DEFAULT_POINT_CONNECTION_COLOR_BY, {
      allowSegment: true
    });
    pointConnectionOpacityBy = getEncodingType(pointConnectionOpacityBy, DEFAULT_POINT_CONNECTION_OPACITY_BY, {
      allowSegment: true
    });
    pointConnectionSizeBy = getEncodingType(pointConnectionSizeBy, DEFAULT_POINT_CONNECTION_SIZE_BY, {
      allowSegment: true
    });
    var stateTex; // Stores the point texture holding x, y, category, and value
    var prevStateTex; // Stores the previous point texture. Used for transitions
    var tmpStateTex; // Stores a temporary point texture. Used for transitions
    var tmpStateBuffer; // Temporary frame buffer
    var stateTexRes = 0; // Width and height of the texture
    var stateTexEps = 0; // Half a texel
    var normalPointsIndexBuffer; // Buffer holding the indices pointing to the correct texel
    var selectedPointsIndexBuffer; // Used for pointing to the selected texels
    var hoveredPointIndexBuffer; // Used for pointing to the hovered texels

    var cameraZoomTargetStart; // Stores the start (i.e., current) camera target for zooming
    var cameraZoomTargetEnd; // Stores the end camera target for zooming
    var cameraZoomDistanceStart; // Stores the start camera distance for zooming
    var cameraZoomDistanceEnd; // Stores the end camera distance for zooming

    var isTransitioning = false;
    var transitionStartTime = null;
    var transitionDuration;
    var transitionEasing;
    var preTransitionShowReticle = showReticle;
    var colorTex; // Stores the point color texture
    var colorTexRes = 0; // Width and height of the texture
    var encodingTex; // Stores the point sizes and opacity values
    var encodingTexRes = 0; // Width and height of the texture

    var isViewChanged = false;
    var isPointsDrawn = false;
    var isMouseOverCanvasChecked = false;
    var valueZDataType = CATEGORICAL;
    var valueWDataType = CATEGORICAL;

    /** @type{number|undefined} */
    var hoveredPoint;
    var isMouseInCanvas = false;
    var xScale = initialProperties.xScale || null;
    var yScale = initialProperties.yScale || null;
    var xDomainStart = 0;
    var xDomainSize = 0;
    var yDomainStart = 0;
    var yDomainSize = 0;
    if (xScale) {
      xDomainStart = xScale.domain()[0];
      xDomainSize = xScale.domain()[1] - xScale.domain()[0];
      xScale.range([0, currentWidth]);
    }
    if (yScale) {
      yDomainStart = yScale.domain()[0];
      yDomainSize = yScale.domain()[1] - yScale.domain()[0];
      yScale.range([currentHeight, 0]);
    }
    var getNdcX = function getNdcX(x) {
      return -1 + x / currentWidth * 2;
    };
    var getNdcY = function getNdcY(y) {
      return 1 + y / currentHeight * -2;
    };

    // Get relative WebGL position
    var getMouseGlPos = function getMouseGlPos() {
      return [getNdcX(mousePosition[0]), getNdcY(mousePosition[1])];
    };
    var getScatterGlPos = function getScatterGlPos(xGl, yGl) {
      // Homogeneous vector
      var v = [xGl, yGl, 1, 1];

      // projection^-1 * view^-1 * model^-1 is the same as
      // model * view^-1 * projection
      var mvp = invert(scratch, multiply(scratch, projectionLocal, multiply(scratch, camera.view, model)));

      // Translate vector
      transformMat4(v, v, mvp);
      return v.slice(0, 2);
    };
    var getPointSizeNdc = function getPointSizeNdc() {
      var pointSizeIncrease = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // eslint-disable-next-line no-use-before-define
      var pointScale = getPointScale();

      // The height of the view in normalized device coordinates
      var heightNdc = topRightNdc[1] - bottomLeftNdc[1];
      // The size of a pixel in the current view in normalized device coordinates
      var pxNdc = heightNdc / canvas.height;
      // The scaled point size in normalized device coordinates
      return (computedPointSizeMouseDetection * pointScale + pointSizeIncrease) * pxNdc;
    };
    var getPoints = function getPoints() {
      if (isPointsFiltered) return searchIndex.points.filter(function (_, i) {
        return filteredPointsSet.has(i);
      });
      return searchIndex.points;
    };
    var getPointsInBBox = function getPointsInBBox(x0, y0, x1, y1) {
      var pointsInBBox = searchIndex.range(x0, y0, x1, y1);
      if (isPointsFiltered) return pointsInBBox.filter(function (i) {
        return filteredPointsSet.has(i);
      });
      return pointsInBBox;
    };
    var raycast = function raycast() {
      var _getMouseGlPos = getMouseGlPos(),
        _getMouseGlPos2 = _slicedToArray(_getMouseGlPos, 2),
        xGl = _getMouseGlPos2[0],
        yGl = _getMouseGlPos2[1];
      var _getScatterGlPos = getScatterGlPos(xGl, yGl),
        _getScatterGlPos2 = _slicedToArray(_getScatterGlPos, 2),
        xNdc = _getScatterGlPos2[0],
        yNdc = _getScatterGlPos2[1];
      var pointSizeNdc = getPointSizeNdc(4);

      // Get all points within a close range
      var pointsInBBox = getPointsInBBox(xNdc - pointSizeNdc, yNdc - pointSizeNdc, xNdc + pointSizeNdc, yNdc + pointSizeNdc);

      // Find the closest point
      var minDist = pointSizeNdc;
      var clostestPoint = -1;
      pointsInBBox.forEach(function (idx) {
        var _searchIndex$points$i = _slicedToArray(searchIndex.points[idx], 2),
          ptX = _searchIndex$points$i[0],
          ptY = _searchIndex$points$i[1];
        var d = dist(ptX, ptY, xNdc, yNdc);
        if (d < minDist) {
          minDist = d;
          clostestPoint = idx;
        }
      });
      return clostestPoint;
    };
    var lassoExtend = function lassoExtend(lassoPoints, lassoPointsFlat) {
      lassoPointsCurr = lassoPoints;
      lasso.setPoints(lassoPointsFlat);
      pubSub.publish('lassoExtend', {
        coordinates: lassoPoints
      });
    };
    var findPointsInLasso = function findPointsInLasso(lassoPolygon) {
      // get the bounding box of the lasso selection...
      var bBox = getBBox(lassoPolygon);
      if (!isValidBBox(bBox)) return [];

      // ...to efficiently preselect potentially selected points
      var pointsInBBox = getPointsInBBox.apply(void 0, _toConsumableArray(bBox));
      // next we test each point in the bounding box if it is in the polygon too
      var pointsInPolygon = [];
      pointsInBBox.forEach(function (pointIdx) {
        if (isPointInPolygon(lassoPolygon, searchIndex.points[pointIdx])) pointsInPolygon.push(pointIdx);
      });
      return pointsInPolygon;
    };
    var lassoClear = function lassoClear() {
      lassoPointsCurr = [];
      if (lasso) lasso.clear();
    };
    var hasPointConnections = function hasPointConnections(point) {
      return point && point.length > 4;
    };
    var setPointConnectionColorState = function setPointConnectionColorState(pointIdxs, stateIndex) {
      if (computingPointConnectionCurves || !showPointConnections || !hasPointConnections(searchIndex.points[pointIdxs[0]])) return;
      var isNormal = stateIndex === 0;
      var lineIdCacher = stateIndex === 1 ? function (lineId) {
        return selectedPointsConnectionSet.add(lineId);
      } : identity;

      // Get line IDs
      var lineIds = Object.keys(pointIdxs.reduce(function (ids, pointIdx) {
        var point = searchIndex.points[pointIdx];
        var isStruct = Array.isArray(point[4]);
        var lineId = isStruct ? point[4][0] : point[4];
        ids[lineId] = true;
        return ids;
      }, {}));
      var buffer = pointConnections.getData().opacities;
      lineIds.filter(function (lineId) {
        return !selectedPointsConnectionSet.has(+lineId);
      }).forEach(function (lineId) {
        var index = pointConnectionMap[lineId][0];
        var numPointPerLine = pointConnectionMap[lineId][2];
        var pointOffset = pointConnectionMap[lineId][3];
        var bufferStart = index * 4 + pointOffset * 2;
        var bufferEnd = bufferStart + numPointPerLine * 2 + 4;

        // eslint-disable-next-line no-underscore-dangle
        if (buffer.__original__ === undefined) {
          // eslint-disable-next-line no-underscore-dangle
          buffer.__original__ = buffer.slice();
        }
        for (var i = bufferStart; i < bufferEnd; i++) {
          // buffer[i] = Math.floor(buffer[i] / 4) * 4 + stateIndex;
          buffer[i] = isNormal ?
          // eslint-disable-next-line no-underscore-dangle
          buffer.__original__[i] : pointConnectionOpacityActive;
        }
        lineIdCacher(lineId);
      });
      pointConnections.getBuffer().opacities.subdata(buffer, 0);
    };
    var indexToStateTexCoord = function indexToStateTexCoord(index) {
      return [index % stateTexRes / stateTexRes + stateTexEps, Math.floor(index / stateTexRes) / stateTexRes + stateTexEps];
    };
    var isPointsFilteredOut = function isPointsFilteredOut(pointIdx) {
      return isPointsFiltered && !filteredPointsSet.has(pointIdx);
    };
    var deselect = function deselect() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$preventEvent = _ref2.preventEvent,
        preventEvent = _ref2$preventEvent === void 0 ? false : _ref2$preventEvent;
      if (lassoClearEvent === LASSO_CLEAR_ON_DESELECT) lassoClear();
      if (selectedPoints.length) {
        if (!preventEvent) pubSub.publish('deselect');
        selectedPointsConnectionSet.clear();
        setPointConnectionColorState(selectedPoints, 0);
        selectedPoints = [];
        selectedPointsSet.clear();
        draw = true;
      }
    };

    /**
     * Select and highlight a set of points
     * @param {number | number[]} pointIdxs
     * @param {import('./types').ScatterplotMethodOptions['select']}
     */
    var select = function select(pointIdxs) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref3$merge = _ref3.merge,
        merge = _ref3$merge === void 0 ? false : _ref3$merge,
        _ref3$preventEvent = _ref3.preventEvent,
        preventEvent = _ref3$preventEvent === void 0 ? false : _ref3$preventEvent;
      var newSelectedPoints = Array.isArray(pointIdxs) ? pointIdxs : [pointIdxs];
      var currSelectedPoints = _toConsumableArray(selectedPoints);
      if (merge) {
        selectedPoints = unionIntegers(selectedPoints, newSelectedPoints);
        if (currSelectedPoints.length === selectedPoints.length) {
          draw = true;
          return;
        }
      } else {
        // Unset previously highlight point connections
        if (selectedPoints && selectedPoints.length) setPointConnectionColorState(selectedPoints, 0);
        if (currSelectedPoints.length > 0 && newSelectedPoints.length === 0) {
          deselect({
            preventEvent: preventEvent
          });
          return;
        }
        selectedPoints = newSelectedPoints;
      }
      if (hasSameElements(currSelectedPoints, selectedPoints)) {
        draw = true;
        return;
      }
      var selectedPointsBuffer = [];
      selectedPointsSet.clear();
      selectedPointsConnectionSet.clear();
      for (var i = selectedPoints.length - 1; i >= 0; i--) {
        var pointIdx = selectedPoints[i];
        if (pointIdx < 0 || pointIdx >= numPoints || isPointsFilteredOut(pointIdx)) {
          // Remove invalid selected points
          selectedPoints.splice(i, 1);
          continue;
        }
        selectedPointsSet.add(pointIdx);
        selectedPointsBuffer.push.apply(selectedPointsBuffer, indexToStateTexCoord(pointIdx));
      }
      selectedPointsIndexBuffer({
        usage: 'dynamic',
        type: 'float',
        data: selectedPointsBuffer
      });
      setPointConnectionColorState(selectedPoints, 1);
      if (!preventEvent) pubSub.publish('select', {
        points: selectedPoints
      });
      draw = true;
    };

    /**
     * @param {number} point
     * @param {import('./types').ScatterplotMethodOptions['hover']} options
     */
    var hover = function hover(point) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref4$showReticleOnce = _ref4.showReticleOnce,
        showReticleOnce = _ref4$showReticleOnce === void 0 ? false : _ref4$showReticleOnce,
        _ref4$preventEvent = _ref4.preventEvent,
        preventEvent = _ref4$preventEvent === void 0 ? false : _ref4$preventEvent;
      var needsRedraw = false;
      if (point >= 0 && point < numPoints) {
        needsRedraw = true;
        var oldHoveredPoint = hoveredPoint;
        var newHoveredPoint = point !== hoveredPoint;
        if (+oldHoveredPoint >= 0 && newHoveredPoint && !selectedPointsSet.has(oldHoveredPoint)) {
          setPointConnectionColorState([oldHoveredPoint], 0);
        }
        hoveredPoint = point;
        hoveredPointIndexBuffer.subdata(indexToStateTexCoord(point));
        if (!selectedPointsSet.has(point)) setPointConnectionColorState([point], 2);
        if (newHoveredPoint && !preventEvent) pubSub.publish('pointover', hoveredPoint);
      } else {
        needsRedraw = +hoveredPoint >= 0;
        if (needsRedraw) {
          if (!selectedPointsSet.has(hoveredPoint)) {
            setPointConnectionColorState([hoveredPoint], 0);
          }
          if (!preventEvent) {
            pubSub.publish('pointout', hoveredPoint);
          }
        }
        hoveredPoint = undefined;
      }
      if (needsRedraw) {
        draw = true;
        drawReticleOnce = showReticleOnce;
      }
    };
    var getRelativeMousePosition = function getRelativeMousePosition(event) {
      var rect = canvas.getBoundingClientRect();
      mousePosition[0] = event.clientX - rect.left;
      mousePosition[1] = event.clientY - rect.top;
      return [].concat(mousePosition);
    };
    var lassoStart = function lassoStart() {
      // Fix camera for the lasso selection
      camera.config({
        isFixed: true
      });
      mouseDown = true;
      lassoActive = true;
      lassoClear();
      if (mouseDownTimeout >= 0) {
        clearTimeout(mouseDownTimeout);
        mouseDownTimeout = -1;
      }
      pubSub.publish('lassoStart');
    };
    var lassoEnd = function lassoEnd(lassoPoints, lassoPointsFlat) {
      var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref5$merge = _ref5.merge,
        merge = _ref5$merge === void 0 ? false : _ref5$merge;
      camera.config({
        isFixed: false
      });
      lassoPointsCurr = _toConsumableArray(lassoPoints);
      var pointsInLasso = findPointsInLasso(lassoPointsFlat);
      select(pointsInLasso, {
        merge: merge
      });
      pubSub.publish('lassoEnd', {
        coordinates: lassoPointsCurr
      });
      if (lassoClearEvent === LASSO_CLEAR_ON_END) lassoClear();
    };
    var lassoManager = createLasso(canvas, {
      onStart: lassoStart,
      onDraw: lassoExtend,
      onEnd: lassoEnd,
      enableInitiator: lassoInitiator,
      initiatorParentElement: lassoInitiatorParentElement,
      pointNorm: function pointNorm(_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
          x = _ref7[0],
          y = _ref7[1];
        return getScatterGlPos(getNdcX(x), getNdcY(y));
      }
    });
    var checkLassoMode = function checkLassoMode() {
      return mouseMode === MOUSE_MODE_LASSO;
    };
    var checkModKey = function checkModKey(event, action) {
      switch (keyActionMap[action]) {
        case KEY_ALT:
          return event.altKey;
        case KEY_CMD:
          return event.metaKey;
        case KEY_CTRL:
          return event.ctrlKey;
        case KEY_META:
          return event.metaKey;
        case KEY_SHIFT:
          return event.shiftKey;
        default:
          return false;
      }
    };
    var checkIfMouseIsOverCanvas = function checkIfMouseIsOverCanvas(event) {
      return document.elementsFromPoint(event.clientX, event.clientY).some(function (element) {
        return element === canvas;
      });
    };
    var mouseDownHandler = function mouseDownHandler(event) {
      if (!isPointsDrawn || event.buttons !== 1) return;
      mouseDown = true;
      mouseDownTime = performance.now();
      mouseDownPosition = getRelativeMousePosition(event);
      lassoActive = checkLassoMode() || checkModKey(event, KEY_ACTION_LASSO);
      if (!lassoActive && lassoOnLongPress) {
        lassoManager.showLongPressIndicator(event.clientX, event.clientY, {
          time: lassoLongPressTime,
          extraTime: lassoLongPressAfterEffectTime,
          delay: lassoLongPressEffectDelay
        });
        mouseDownTimeout = setTimeout(function () {
          mouseDownTimeout = -1;
          lassoActive = true;
        }, lassoLongPressTime);
      }
    };
    var mouseUpHandler = function mouseUpHandler(event) {
      if (!isPointsDrawn) return;
      mouseDown = false;
      if (mouseDownTimeout >= 0) {
        clearTimeout(mouseDownTimeout);
        mouseDownTimeout = -1;
      }
      if (lassoActive) {
        event.preventDefault();
        lassoActive = false;
        lassoManager.end({
          merge: checkModKey(event, KEY_ACTION_MERGE)
        });
      }
      if (lassoOnLongPress) {
        lassoManager.hideLongPressIndicator({
          time: lassoLongPressRevertEffectTime
        });
      }
    };
    var mouseClickHandler = function mouseClickHandler(event) {
      if (!isPointsDrawn) return;
      event.preventDefault();
      var currentMousePosition = getRelativeMousePosition(event);
      if (dist.apply(void 0, _toConsumableArray(currentMousePosition).concat(_toConsumableArray(mouseDownPosition))) >= lassoMinDist) return;
      var clickTime = performance.now() - mouseDownTime;
      if (!lassoInitiator || clickTime < LONG_CLICK_TIME) {
        // If the user clicked normally (i.e., fast) we'll only show the lasso
        // initiator if the use click into the void
        var clostestPoint = raycast();
        if (clostestPoint >= 0) {
          if (selectedPoints.length && lassoClearEvent === LASSO_CLEAR_ON_DESELECT) {
            // Special case where we silently "deselect" the previous points by
            // overriding the selected points. Hence, we need to clear the lasso.
            lassoClear();
          }
          select([clostestPoint], {
            merge: checkModKey(event, KEY_ACTION_MERGE)
          });
        } else if (!lassoInitiatorTimeout) {
          // We'll also wait to make sure the user didn't double click
          lassoInitiatorTimeout = setTimeout(function () {
            lassoInitiatorTimeout = null;
            lassoManager.showInitiator(event);
          }, SINGLE_CLICK_DELAY);
        }
      }
    };
    var mouseDblClickHandler = function mouseDblClickHandler(event) {
      lassoManager.hideInitiator();
      if (lassoInitiatorTimeout) {
        clearTimeout(lassoInitiatorTimeout);
        lassoInitiatorTimeout = null;
      }
      if (deselectOnDblClick) {
        event.preventDefault();
        deselect();
      }
    };
    var mouseMoveHandler = function mouseMoveHandler(event) {
      if (!isMouseOverCanvasChecked) {
        isMouseInCanvas = checkIfMouseIsOverCanvas(event);
        isMouseOverCanvasChecked = true;
      }
      if (!isPointsDrawn || !isMouseInCanvas && !mouseDown) return;
      var currentMousePosition = getRelativeMousePosition(event);
      var mouseMoveDist = dist.apply(void 0, _toConsumableArray(currentMousePosition).concat(_toConsumableArray(mouseDownPosition)));
      var mouseMovedMin = mouseMoveDist >= lassoMinDist;

      // Only ray cast if the mouse cursor is inside
      if (isMouseInCanvas && !lassoActive) {
        hover(raycast()); // eslint-disable-line no-use-before-define
      }

      if (lassoActive) {
        event.preventDefault();
        lassoManager.extend(event, true);
      } else if (mouseDown && lassoOnLongPress && mouseMovedMin) {
        lassoManager.hideLongPressIndicator({
          time: lassoLongPressRevertEffectTime
        });
      }
      if (mouseDownTimeout >= 0 && mouseMovedMin) {
        clearTimeout(mouseDownTimeout);
        mouseDownTimeout = -1;
      }

      // Always redraw when mousedown as the user might have panned or lassoed
      if (mouseDown) draw = true;
    };
    var blurHandler = function blurHandler() {
      hoveredPoint = undefined;
      isMouseInCanvas = false;
      isMouseOverCanvasChecked = false;
      if (!isPointsDrawn) return;
      if (+hoveredPoint >= 0 && !selectedPointsSet.has(hoveredPoint)) setPointConnectionColorState([hoveredPoint], 0);
      mouseUpHandler();
      draw = true;
    };
    var createEncodingTexture = function createEncodingTexture() {
      var maxEncoding = Math.max(pointSize.length, opacity.length);
      encodingTexRes = Math.max(2, Math.ceil(Math.sqrt(maxEncoding)));
      var rgba = new Float32Array(Math.pow(encodingTexRes, 2) * 4);
      for (var i = 0; i < maxEncoding; i++) {
        rgba[i * 4] = pointSize[i] || 0;
        rgba[i * 4 + 1] = Math.min(1, opacity[i] || 0);
        var activeOpacity = Number((pointColorActive[i] || pointColorActive[0])[3]);
        rgba[i * 4 + 2] = Math.min(1, Number.isNaN(activeOpacity) ? 1 : activeOpacity);
        var hoverOpacity = Number((pointColorHover[i] || pointColorHover[0])[3]);
        rgba[i * 4 + 3] = Math.min(1, Number.isNaN(hoverOpacity) ? 1 : hoverOpacity);
      }
      return renderer.regl.texture({
        data: rgba,
        shape: [encodingTexRes, encodingTexRes, 4],
        type: 'float'
      });
    };
    var getColors = function getColors() {
      var baseColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pointColor;
      var activeColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : pointColorActive;
      var hoverColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : pointColorHover;
      var n = baseColor.length;
      var n2 = activeColor.length;
      var n3 = hoverColor.length;
      var colors = [];
      if (n === n2 && n2 === n3) {
        for (var i = 0; i < n; i++) {
          colors.push(baseColor[i], activeColor[i], hoverColor[i], backgroundColor);
        }
      } else {
        for (var _i = 0; _i < n; _i++) {
          var rgbaOpaque = [baseColor[_i][0], baseColor[_i][1], baseColor[_i][2], 1];
          var colorActive = colorBy === DEFAULT_COLOR_BY ? activeColor[0] : rgbaOpaque;
          var colorHover = colorBy === DEFAULT_COLOR_BY ? hoverColor[0] : rgbaOpaque;
          colors.push(baseColor[_i], colorActive, colorHover, backgroundColor);
        }
      }
      return colors;
    };
    var createColorTexture = function createColorTexture() {
      var colors = getColors();
      var numColors = colors.length;
      colorTexRes = Math.max(2, Math.ceil(Math.sqrt(numColors)));
      var rgba = new Float32Array(Math.pow(colorTexRes, 2) * 4);
      colors.forEach(function (color, i) {
        rgba[i * 4] = color[0]; // r
        rgba[i * 4 + 1] = color[1]; // g
        rgba[i * 4 + 2] = color[2]; // b
        rgba[i * 4 + 3] = color[3]; // a
      });

      return renderer.regl.texture({
        data: rgba,
        shape: [colorTexRes, colorTexRes, 4],
        type: 'float'
      });
    };

    /**
     * Since we're using an external renderer whose canvas' width and height
     * might differ from this instance's width and height, we have to adjust the
     * projection of camera spaces into clip space accordingly.
     *
     * The `widthRatio` is rendererCanvas.width / thisCanvas.width
     * The `heightRatio` is rendererCanvas.height / thisCanvas.height
     */
    var updateProjectionMatrix = function updateProjectionMatrix(widthRatio, heightRatio) {
      projection[0] = widthRatio / viewAspectRatio;
      projection[5] = heightRatio;
    };
    var updateViewAspectRatio = function updateViewAspectRatio() {
      viewAspectRatio = currentWidth / currentHeight;
      projectionLocal = fromScaling([], [1 / viewAspectRatio, 1, 1]);
      projection = fromScaling([], [1 / viewAspectRatio, 1, 1]);
      model = fromScaling([], [dataAspectRatio, 1, 1]);
    };
    var setDataAspectRatio = function setDataAspectRatio(newDataAspectRatio) {
      if (+newDataAspectRatio <= 0) return;
      dataAspectRatio = newDataAspectRatio;
    };
    var setColors = function setColors(getter, setter) {
      return function (newColors) {
        if (!newColors || !newColors.length) return;
        var colors = getter();
        var prevColors = _toConsumableArray(colors);
        var tmpColors = isMultipleColors(newColors) ? newColors : [newColors];
        tmpColors = tmpColors.map(function (color) {
          return toRgba(color, true);
        });
        if (colorTex) colorTex.destroy();
        try {
          setter(tmpColors);
          colorTex = createColorTexture();
        } catch (e) {
          console.error('Invalid colors. Switching back to default colors.');
          // eslint-disable-next-line no-param-reassign
          setter(prevColors);
          colorTex = createColorTexture();
        }
      };
    };
    var setPointColor = setColors(function () {
      return pointColor;
    }, function (colors) {
      pointColor = colors;
    });
    var setPointColorActive = setColors(function () {
      return pointColorActive;
    }, function (colors) {
      pointColorActive = colors;
    });
    var setPointColorHover = setColors(function () {
      return pointColorHover;
    }, function (colors) {
      pointColorHover = colors;
    });
    var computeDomainView = function computeDomainView() {
      var xyStartPt = getScatterGlPos(-1, -1);
      var xyEndPt = getScatterGlPos(1, 1);
      var xStart = (xyStartPt[0] + 1) / 2;
      var xEnd = (xyEndPt[0] + 1) / 2;
      var yStart = (xyStartPt[1] + 1) / 2;
      var yEnd = (xyEndPt[1] + 1) / 2;
      var xDomainView = [xDomainStart + xStart * xDomainSize, xDomainStart + xEnd * xDomainSize];
      var yDomainView = [yDomainStart + yStart * yDomainSize, yDomainStart + yEnd * yDomainSize];
      return [xDomainView, yDomainView];
    };
    var updateScales = function updateScales() {
      if (!xScale && !yScale) return;
      var _computeDomainView = computeDomainView(),
        _computeDomainView2 = _slicedToArray(_computeDomainView, 2),
        xDomainView = _computeDomainView2[0],
        yDomainView = _computeDomainView2[1];
      if (xScale) xScale.domain(xDomainView);
      if (yScale) yScale.domain(yDomainView);
    };
    var setCurrentHeight = function setCurrentHeight(newCurrentHeight) {
      currentHeight = Math.max(1, newCurrentHeight);
      canvas.height = Math.floor(currentHeight * window.devicePixelRatio);
      if (yScale) {
        yScale.range([currentHeight, 0]);
        updateScales();
      }
    };
    var setHeight = function setHeight(newHeight) {
      if (newHeight === AUTO) {
        height = newHeight;
        canvas.style.height = '100%';
        window.requestAnimationFrame(function () {
          if (canvas) setCurrentHeight(canvas.getBoundingClientRect().height);
        });
        return;
      }
      if (!+newHeight || +newHeight <= 0) return;
      height = +newHeight;
      setCurrentHeight(height);
      canvas.style.height = "".concat(height, "px");
    };
    var computePointSizeMouseDetection = function computePointSizeMouseDetection() {
      computedPointSizeMouseDetection = pointSizeMouseDetection;
      if (pointSizeMouseDetection === AUTO) {
        computedPointSizeMouseDetection = Array.isArray(pointSize) ? max$1(pointSize) : pointSize;
      }
    };
    var setPointSize = function setPointSize(newPointSize) {
      if (isConditionalArray(newPointSize, isPositiveNumber, {
        minLength: 1
      })) pointSize = _toConsumableArray(newPointSize);
      if (isStrictlyPositiveNumber(+newPointSize)) pointSize = [+newPointSize];
      minPointScale = MIN_POINT_SIZE / pointSize[0];
      encodingTex = createEncodingTexture();
      computePointSizeMouseDetection();
    };
    var setPointSizeSelected = function setPointSizeSelected(newPointSizeSelected) {
      if (!+newPointSizeSelected || +newPointSizeSelected < 0) return;
      pointSizeSelected = +newPointSizeSelected;
    };
    var setPointOutlineWidth = function setPointOutlineWidth(newPointOutlineWidth) {
      if (!+newPointOutlineWidth || +newPointOutlineWidth < 0) return;
      pointOutlineWidth = +newPointOutlineWidth;
    };
    var setCurrentWidth = function setCurrentWidth(newCurrentWidth) {
      currentWidth = Math.max(1, newCurrentWidth);
      canvas.width = Math.floor(currentWidth * window.devicePixelRatio);
      if (xScale) {
        xScale.range([0, currentWidth]);
        updateScales();
      }
    };
    var setWidth = function setWidth(newWidth) {
      if (newWidth === AUTO) {
        width = newWidth;
        canvas.style.width = '100%';
        window.requestAnimationFrame(function () {
          if (canvas) setCurrentWidth(canvas.getBoundingClientRect().width);
        });
        return;
      }
      if (!+newWidth || +newWidth <= 0) return;
      width = +newWidth;
      setCurrentWidth(width);
      canvas.style.width = "".concat(currentWidth, "px");
    };
    var setOpacity = function setOpacity(newOpacity) {
      if (isConditionalArray(newOpacity, isPositiveNumber, {
        minLength: 1
      })) opacity = _toConsumableArray(newOpacity);
      if (isStrictlyPositiveNumber(+newOpacity)) opacity = [+newOpacity];
      encodingTex = createEncodingTexture();
    };
    var getEncodingDataType = function getEncodingDataType(type) {
      switch (type) {
        case 'valueZ':
          return valueZDataType;
        case 'valueW':
          return valueWDataType;
        default:
          return null;
      }
    };
    var getEncodingValueToIdx = function getEncodingValueToIdx(type, rangeValues) {
      switch (type) {
        case CONTINUOUS:
          return function (value) {
            return Math.round(value * (rangeValues.length - 1));
          };
        case CATEGORICAL:
        default:
          return identity;
      }
    };
    var setColorBy = function setColorBy(type) {
      colorBy = getEncodingType(type, DEFAULT_COLOR_BY);
    };
    var setOpacityBy = function setOpacityBy(type) {
      opacityBy = getEncodingType(type, DEFAULT_OPACITY_BY, {
        allowDensity: true
      });
    };
    var setSizeBy = function setSizeBy(type) {
      sizeBy = getEncodingType(type, DEFAULT_SIZE_BY);
    };
    var setPointConnectionColorBy = function setPointConnectionColorBy(type) {
      pointConnectionColorBy = getEncodingType(type, DEFAULT_POINT_CONNECTION_COLOR_BY, {
        allowSegment: true
      });
    };
    var setPointConnectionOpacityBy = function setPointConnectionOpacityBy(type) {
      pointConnectionOpacityBy = getEncodingType(type, DEFAULT_POINT_CONNECTION_OPACITY_BY, {
        allowSegment: true
      });
    };
    var setPointConnectionSizeBy = function setPointConnectionSizeBy(type) {
      pointConnectionSizeBy = getEncodingType(type, DEFAULT_POINT_CONNECTION_SIZE_BY, {
        allowSegment: true
      });
    };
    var getResolution = function getResolution() {
      return [canvas.width, canvas.height];
    };
    var getBackgroundImage = function getBackgroundImage() {
      return backgroundImage;
    };
    var getColorTex = function getColorTex() {
      return colorTex;
    };
    var getColorTexRes = function getColorTexRes() {
      return colorTexRes;
    };
    var getColorTexEps = function getColorTexEps() {
      return 0.5 / colorTexRes;
    };
    var getDevicePixelRatio = function getDevicePixelRatio() {
      return window.devicePixelRatio;
    };
    var getNormalPointsIndexBuffer = function getNormalPointsIndexBuffer() {
      return normalPointsIndexBuffer;
    };
    var getSelectedPointsIndexBuffer = function getSelectedPointsIndexBuffer() {
      return selectedPointsIndexBuffer;
    };
    var getEncodingTex = function getEncodingTex() {
      return encodingTex;
    };
    var getEncodingTexRes = function getEncodingTexRes() {
      return encodingTexRes;
    };
    var getEncodingTexEps = function getEncodingTexEps() {
      return 0.5 / encodingTexRes;
    };
    var getNormalPointSizeExtra = function getNormalPointSizeExtra() {
      return 0;
    };
    var getStateTex = function getStateTex() {
      return tmpStateTex || stateTex;
    };
    var getStateTexRes = function getStateTexRes() {
      return stateTexRes;
    };
    var getStateTexEps = function getStateTexEps() {
      return 0.5 / stateTexRes;
    };
    var getProjection = function getProjection() {
      return projection;
    };
    var getView = function getView() {
      return camera.view;
    };
    var getModel = function getModel() {
      return model;
    };
    var getModelViewProjection = function getModelViewProjection() {
      return multiply(pvm, projection, multiply(pvm, camera.view, model));
    };
    var getPointScale = function getPointScale() {
      if (camera.scaling[0] > 1) return Math.asinh(max(1.0, camera.scaling[0])) / Math.asinh(1) * window.devicePixelRatio;
      return max(minPointScale, camera.scaling[0]) * window.devicePixelRatio;
    };
    var getNormalNumPoints = function getNormalNumPoints() {
      return isPointsFiltered ? filteredPointsSet.size : numPoints;
    };
    var getSelectedNumPoints = function getSelectedNumPoints() {
      return selectedPoints.length;
    };
    var getPointOpacityMaxBase = function getPointOpacityMaxBase() {
      return getSelectedNumPoints() > 0 ? opacityInactiveMax : 1;
    };
    var getPointOpacityScaleBase = function getPointOpacityScaleBase() {
      return getSelectedNumPoints() > 0 ? opacityInactiveScale : 1;
    };
    var getIsColoredByZ = function getIsColoredByZ() {
      return +(colorBy === 'valueZ');
    };
    var getIsColoredByW = function getIsColoredByW() {
      return +(colorBy === 'valueW');
    };
    var getIsOpacityByZ = function getIsOpacityByZ() {
      return +(opacityBy === 'valueZ');
    };
    var getIsOpacityByW = function getIsOpacityByW() {
      return +(opacityBy === 'valueW');
    };
    var getIsOpacityByDensity = function getIsOpacityByDensity() {
      return +(opacityBy === 'density');
    };
    var getIsSizedByZ = function getIsSizedByZ() {
      return +(sizeBy === 'valueZ');
    };
    var getIsSizedByW = function getIsSizedByW() {
      return +(sizeBy === 'valueW');
    };
    var getColorMultiplicator = function getColorMultiplicator() {
      if (colorBy === 'valueZ') return valueZDataType === CONTINUOUS ? pointColor.length - 1 : 1;
      return valueWDataType === CONTINUOUS ? pointColor.length - 1 : 1;
    };
    var getOpacityMultiplicator = function getOpacityMultiplicator() {
      if (opacityBy === 'valueZ') return valueZDataType === CONTINUOUS ? opacity.length - 1 : 1;
      return valueWDataType === CONTINUOUS ? opacity.length - 1 : 1;
    };
    var getSizeMultiplicator = function getSizeMultiplicator() {
      if (sizeBy === 'valueZ') return valueZDataType === CONTINUOUS ? pointSize.length - 1 : 1;
      return valueWDataType === CONTINUOUS ? pointSize.length - 1 : 1;
    };
    var getOpacityDensity = function getOpacityDensity(context) {
      if (opacityBy !== 'density') return 1;

      // Adopted from the fabulous Ricky Reusser:
      // https://observablehq.com/@rreusser/selecting-the-right-opacity-for-2d-point-clouds
      // Extended with a point-density based approach
      var pointScale = getPointScale();
      var p = pointSize[0] * pointScale;

      // Compute the plot's x and y range from the view matrix, though these could come from any source
      var s = 2 / (2 / camera.view[0]) * (2 / (2 / camera.view[5]));

      // Viewport size, in device pixels
      var H = context.viewportHeight;
      var W = context.viewportWidth;

      // Adaptation: Instead of using the global number of points, I am using a
      // density-based approach that takes the points in the view into context
      // when zooming in. This ensure that in sparse areas, points are opaque and
      // in dense areas points are more translucent.
      var alpha = opacityByDensityFill * W * H / (numPointsInView * p * p) * min(1, s);

      // In performanceMode we use squares, otherwise we use circles, which only
      // take up (pi r^2) of the unit square
      alpha *= performanceMode ? 1 : 1 / (0.25 * Math.PI);

      // If the pixels shrink below the minimum permitted size, then we adjust the opacity instead
      // and apply clamping of the point size in the vertex shader. Note that we add 0.5 since we
      // slightly inrease the size of points during rendering to accommodate SDF-style antialiasing.
      var clampedPointDeviceSize = max(MIN_POINT_SIZE, p) + 0.5;

      // We square this since we're concerned with the ratio of *areas*.
      // eslint-disable-next-line no-restricted-properties
      alpha *= Math.pow(p / clampedPointDeviceSize, 2);

      // And finally, we clamp to the range [0, 1]. We should really clamp this to 1 / precision
      // on the low end, depending on the data type of the destination so that we never render *nothing*.
      return min(1, max(0, alpha));
    };
    var updatePoints = renderer.regl({
      framebuffer: function framebuffer() {
        return tmpStateBuffer;
      },
      vert: SHADER,
      frag: SHADER$1,
      attributes: {
        position: [-4, 0, 4, 4, 4, -4]
      },
      uniforms: {
        startStateTex: function startStateTex() {
          return prevStateTex;
        },
        endStateTex: function endStateTex() {
          return stateTex;
        },
        t: function t(ctx, props) {
          return props.t;
        }
      },
      count: 3
    });
    var drawPoints = function drawPoints(getPointSizeExtra, getNumPoints, getStateIndexBuffer) {
      var globalState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : COLOR_NORMAL_IDX;
      var getPointOpacityMax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : getPointOpacityMaxBase;
      var getPointOpacityScale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : getPointOpacityScaleBase;
      return renderer.regl({
        frag: performanceMode ? FRAGMENT_SHADER : FRAGMENT_SHADER$1,
        vert: createVertexShader(globalState),
        blend: {
          enable: !performanceMode,
          func: {
            srcRGB: 'src alpha',
            srcAlpha: 'one',
            dstRGB: 'one minus src alpha',
            dstAlpha: 'one minus src alpha'
          }
        },
        depth: {
          enable: false
        },
        attributes: {
          stateIndex: {
            buffer: getStateIndexBuffer,
            size: 2
          }
        },
        uniforms: {
          resolution: getResolution,
          modelViewProjection: getModelViewProjection,
          devicePixelRatio: getDevicePixelRatio,
          pointScale: getPointScale,
          encodingTex: getEncodingTex,
          encodingTexRes: getEncodingTexRes,
          encodingTexEps: getEncodingTexEps,
          pointOpacityMax: getPointOpacityMax,
          pointOpacityScale: getPointOpacityScale,
          pointSizeExtra: getPointSizeExtra,
          globalState: globalState,
          colorTex: getColorTex,
          colorTexRes: getColorTexRes,
          colorTexEps: getColorTexEps,
          stateTex: getStateTex,
          stateTexRes: getStateTexRes,
          stateTexEps: getStateTexEps,
          isColoredByZ: getIsColoredByZ,
          isColoredByW: getIsColoredByW,
          isOpacityByZ: getIsOpacityByZ,
          isOpacityByW: getIsOpacityByW,
          isOpacityByDensity: getIsOpacityByDensity,
          isSizedByZ: getIsSizedByZ,
          isSizedByW: getIsSizedByW,
          colorMultiplicator: getColorMultiplicator,
          opacityMultiplicator: getOpacityMultiplicator,
          opacityDensity: getOpacityDensity,
          sizeMultiplicator: getSizeMultiplicator,
          numColorStates: COLOR_NUM_STATES
        },
        count: getNumPoints,
        primitive: 'points'
      });
    };
    var drawPointBodies = drawPoints(getNormalPointSizeExtra, getNormalNumPoints, getNormalPointsIndexBuffer);
    var drawHoveredPoint = drawPoints(getNormalPointSizeExtra, function () {
      return 1;
    }, function () {
      return hoveredPointIndexBuffer;
    }, COLOR_HOVER_IDX, function () {
      return 1;
    }, function () {
      return 1;
    });
    var drawSelectedPointOutlines = drawPoints(function () {
      return (pointSizeSelected + pointOutlineWidth * 2) * window.devicePixelRatio;
    }, getSelectedNumPoints, getSelectedPointsIndexBuffer, COLOR_ACTIVE_IDX, function () {
      return 1;
    }, function () {
      return 1;
    });
    var drawSelectedPointInnerBorder = drawPoints(function () {
      return (pointSizeSelected + pointOutlineWidth) * window.devicePixelRatio;
    }, getSelectedNumPoints, getSelectedPointsIndexBuffer, COLOR_BG_IDX, function () {
      return 1;
    }, function () {
      return 1;
    });
    var drawSelectedPointBodies = drawPoints(function () {
      return pointSizeSelected * window.devicePixelRatio;
    }, getSelectedNumPoints, getSelectedPointsIndexBuffer, COLOR_ACTIVE_IDX, function () {
      return 1;
    }, function () {
      return 1;
    });
    var drawSelectedPoints = function drawSelectedPoints() {
      drawSelectedPointOutlines();
      drawSelectedPointInnerBorder();
      drawSelectedPointBodies();
    };
    var drawBackgroundImage = renderer.regl({
      frag: FRAGMENT_SHADER$2,
      vert: VERTEX_SHADER,
      attributes: {
        position: [0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0]
      },
      uniforms: {
        modelViewProjection: getModelViewProjection,
        texture: getBackgroundImage
      },
      count: 6
    });
    var drawPolygon2d = renderer.regl({
      vert: "\n      precision mediump float;\n      uniform mat4 modelViewProjection;\n      attribute vec2 position;\n      void main () {\n        gl_Position = modelViewProjection * vec4(position, 0, 1);\n      }",
      frag: "\n      precision mediump float;\n      uniform vec4 color;\n      void main () {\n        gl_FragColor = vec4(color.rgb, 0.2);\n      }",
      depth: {
        enable: false
      },
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 'one',
          dstRGB: 'one minus src alpha',
          dstAlpha: 'one minus src alpha'
        }
      },
      attributes: {
        position: function position() {
          return lassoPointsCurr;
        }
      },
      uniforms: {
        modelViewProjection: getModelViewProjection,
        color: function color() {
          return lassoColor;
        }
      },
      elements: function elements() {
        return Array.from({
          length: lassoPointsCurr.length - 2
        }, function (_, i) {
          return [0, i + 1, i + 2];
        });
      }
    });
    var drawReticle = function drawReticle() {
      if (!(hoveredPoint >= 0)) return;
      var _searchIndex$points$h = searchIndex.points[hoveredPoint].slice(0, 2),
        _searchIndex$points$h2 = _slicedToArray(_searchIndex$points$h, 2),
        x = _searchIndex$points$h2[0],
        y = _searchIndex$points$h2[1];

      // Homogeneous coordinates of the point
      var v = [x, y, 0, 1];

      // We have to calculate the model-view-projection matrix outside of the
      // shader as we actually don't want the model, view, or projection of the
      // line view space to change such that the reticle is visualized across the
      // entire view container and not within the view of the scatterplot
      multiply(scratch, projection, multiply(scratch, camera.view, model));
      transformMat4(v, v, scratch);
      reticleHLine.setPoints([-1, v[1], 1, v[1]]);
      reticleVLine.setPoints([v[0], 1, v[0], -1]);
      reticleHLine.draw();
      reticleVLine.draw();

      // Draw outer outline
      drawPoints(function () {
        return (pointSizeSelected + pointOutlineWidth * 2) * window.devicePixelRatio;
      }, function () {
        return 1;
      }, hoveredPointIndexBuffer, COLOR_ACTIVE_IDX)();

      // Draw inner outline
      drawPoints(function () {
        return (pointSizeSelected + pointOutlineWidth) * window.devicePixelRatio;
      }, function () {
        return 1;
      }, hoveredPointIndexBuffer, COLOR_BG_IDX)();
    };
    var createPointIndex = function createPointIndex(numNewPoints) {
      var index = new Float32Array(numNewPoints * 2);
      var j = 0;
      for (var i = 0; i < numNewPoints; ++i) {
        var texCoord = indexToStateTexCoord(i);
        index[j] = texCoord[0]; // x
        index[j + 1] = texCoord[1]; // y
        j += 2;
      }
      return index;
    };
    var createStateTexture = function createStateTexture(newPoints) {
      var dataTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var numNewPoints = newPoints.length;
      stateTexRes = Math.max(2, Math.ceil(Math.sqrt(numNewPoints)));
      stateTexEps = 0.5 / stateTexRes;
      var data = new Float32Array(Math.pow(stateTexRes, 2) * 4);
      var zIsInts = true;
      var wIsInts = true;
      var k = 0;
      var z = 0;
      var w = 0;
      for (var i = 0; i < numNewPoints; ++i) {
        k = i * 4;
        data[k] = newPoints[i][0]; // x
        data[k + 1] = newPoints[i][1]; // y

        z = newPoints[i][2] || 0;
        w = newPoints[i][3] || 0;
        data[k + 2] = z; // z: value 1
        data[k + 3] = w; // w: value 2
        zIsInts && (zIsInts = Number.isInteger(z));
        wIsInts && (wIsInts = Number.isInteger(w));
      }
      if (dataTypes.z && VALUE_ZW_DATA_TYPES.includes(dataTypes.z)) {
        valueZDataType = dataTypes.z;
      } else {
        valueZDataType = zIsInts ? CATEGORICAL : CONTINUOUS;
      }
      if (dataTypes.w && VALUE_ZW_DATA_TYPES.includes(dataTypes.w)) {
        valueWDataType = dataTypes.w;
      } else {
        valueWDataType = wIsInts ? CATEGORICAL : CONTINUOUS;
      }
      return renderer.regl.texture({
        data: data,
        shape: [stateTexRes, stateTexRes, 4],
        type: 'float'
      });
    };
    var cachePoints = function cachePoints(newPoints) {
      var dataTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!stateTex) return false;
      if (isTransitioning) {
        var tmp = prevStateTex;
        prevStateTex = tmpStateTex;
        tmp.destroy();
      } else {
        prevStateTex = stateTex;
      }
      tmpStateTex = createStateTexture(newPoints, dataTypes);
      tmpStateBuffer = renderer.regl.framebuffer({
        color: tmpStateTex,
        depth: false,
        stencil: false
      });
      stateTex = undefined;
      return true;
    };
    var hasCachedPoints = function hasCachedPoints() {
      return Boolean(prevStateTex && tmpStateTex);
    };
    var clearCachedPoints = function clearCachedPoints() {
      if (prevStateTex) {
        prevStateTex.destroy();
        prevStateTex = undefined;
      }
      if (tmpStateTex) {
        tmpStateTex.destroy();
        tmpStateTex = undefined;
      }
    };
    var setPoints = function setPoints(newPoints) {
      var dataTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      isPointsDrawn = false;
      numPoints = newPoints.length;
      numPointsInView = numPoints;
      if (stateTex) stateTex.destroy();
      stateTex = createStateTexture(newPoints, dataTypes);
      normalPointsIndexBuffer({
        usage: 'static',
        type: 'float',
        data: createPointIndex(numPoints)
      });
      searchIndex = new KDBush(newPoints, function (p) {
        return p[0];
      }, function (p) {
        return p[1];
      }, 16);
      isPointsDrawn = true;
    };
    var cacheCamera = function cacheCamera(newTarget, newDistance) {
      cameraZoomTargetStart = camera.target;
      cameraZoomTargetEnd = newTarget;
      cameraZoomDistanceStart = camera.distance[0];
      cameraZoomDistanceEnd = newDistance;
    };
    var hasCachedCamera = function hasCachedCamera() {
      return Boolean(cameraZoomTargetStart !== undefined && cameraZoomTargetEnd !== undefined && cameraZoomDistanceStart !== undefined && cameraZoomDistanceEnd !== undefined);
    };
    var clearCachedCamera = function clearCachedCamera() {
      cameraZoomTargetStart = undefined;
      cameraZoomTargetEnd = undefined;
      cameraZoomDistanceStart = undefined;
      cameraZoomDistanceEnd = undefined;
    };
    var getPointConnectionColorIndices = function getPointConnectionColorIndices(curvePoints) {
      var colorEncoding = pointConnectionColorBy === 'inherit' ? colorBy : pointConnectionColorBy;
      if (colorEncoding === 'segment') {
        var maxColorIdx = pointConnectionColor.length - 1;
        if (maxColorIdx < 1) return [];
        return curvePoints.reduce(function (colorIndices, curve, index) {
          var totalLength = 0;
          var segLengths = [];
          // Compute the total length of the line
          for (var i = 2; i < curve.length; i += 2) {
            var segLength = Math.sqrt(Math.pow(curve[i - 2] - curve[i], 2) + Math.pow(curve[i - 1] - curve[i + 1], 2));
            segLengths.push(segLength);
            totalLength += segLength;
          }
          colorIndices[index] = [0];
          var cumLength = 0;
          // Assign the color index based on the cumulative length
          for (var _i2 = 0; _i2 < curve.length / 2 - 1; _i2++) {
            cumLength += segLengths[_i2];
            // The `4` comes from the fact that we have 4 color states:
            // normal, active, hover, and background
            colorIndices[index].push(Math.floor(cumLength / totalLength * maxColorIdx) * 4);
          }
          // The `4` comes from the fact that we have 4 color states:
          // normal, active, hover, and background
          // colorIndices[index] = rangeMap(
          //   curve.length,
          //   (i) => Math.floor((i / (curve.length - 1)) * maxColorIdx) * 4
          // );
          return colorIndices;
        }, []);
      }
      if (colorEncoding) {
        var encodingIdx = getEncodingIdx(colorEncoding);
        var encodingValueToIdx = getEncodingValueToIdx(getEncodingDataType(colorEncoding), pointConnectionColorBy === 'inherit' ? pointColor : pointConnectionColor);
        return pointConnectionMap.reduce(function (colorIndices, _ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
            index = _ref9[0],
            referencePoint = _ref9[1];
          // The `4` comes from the fact that we have 4 color states:
          // normal, active, hover, and background
          colorIndices[index] = encodingValueToIdx(referencePoint[encodingIdx]) * 4;
          return colorIndices;
        }, []);
      }
      return Array(pointConnectionMap.length).fill(0);
    };
    var getPointConnectionOpacities = function getPointConnectionOpacities() {
      var opacityEncoding = pointConnectionOpacityBy === 'inherit' ? opacityBy : pointConnectionOpacityBy;
      if (opacityEncoding === 'segment') {
        var maxOpacityIdx = pointConnectionOpacity.length - 1;
        if (maxOpacityIdx < 1) return [];
        return pointConnectionMap.reduce(
        // eslint-disable-next-line no-unused-vars
        function (opacities, _ref10) {
          var _ref11 = _slicedToArray(_ref10, 3),
            index = _ref11[0];
            _ref11[1];
            var length = _ref11[2];
          opacities[index] = rangeMap(length, function (i) {
            return pointConnectionOpacity[Math.floor(i / (length - 1) * maxOpacityIdx)];
          });
          return opacities;
        }, []);
      }
      if (opacityEncoding) {
        var encodingIdx = getEncodingIdx(opacityEncoding);
        var encodingRangeMap = pointConnectionOpacityBy === 'inherit' ? opacity : pointConnectionOpacity;
        var encodingValueToIdx = getEncodingValueToIdx(getEncodingDataType(opacityEncoding), encodingRangeMap);
        return pointConnectionMap.reduce(function (opacities, _ref12) {
          var _ref13 = _slicedToArray(_ref12, 2),
            index = _ref13[0],
            referencePoint = _ref13[1];
          opacities[index] = encodingRangeMap[encodingValueToIdx(referencePoint[encodingIdx])];
          return opacities;
        }, []);
      }
      return undefined;
    };
    var getPointConnectionWidths = function getPointConnectionWidths() {
      var sizeEncoding = pointConnectionSizeBy === 'inherit' ? sizeBy : pointConnectionSizeBy;
      if (sizeEncoding === 'segment') {
        var maxSizeIdx = pointConnectionSize.length - 1;
        if (maxSizeIdx < 1) return [];
        return pointConnectionMap.reduce(
        // eslint-disable-next-line no-unused-vars
        function (widths, _ref14) {
          var _ref15 = _slicedToArray(_ref14, 3),
            index = _ref15[0];
            _ref15[1];
            var length = _ref15[2];
          widths[index] = rangeMap(length, function (i) {
            return pointConnectionSize[Math.floor(i / (length - 1) * maxSizeIdx)];
          });
          return widths;
        }, []);
      }
      if (sizeEncoding) {
        var encodingIdx = getEncodingIdx(sizeEncoding);
        var encodingRangeMap = pointConnectionSizeBy === 'inherit' ? pointSize : pointConnectionSize;
        var encodingValueToIdx = getEncodingValueToIdx(getEncodingDataType(sizeEncoding), encodingRangeMap);
        return pointConnectionMap.reduce(function (widths, _ref16) {
          var _ref17 = _slicedToArray(_ref16, 2),
            index = _ref17[0],
            referencePoint = _ref17[1];
          widths[index] = encodingRangeMap[encodingValueToIdx(referencePoint[encodingIdx])];
          return widths;
        }, []);
      }
      return undefined;
    };
    var setPointConnectionMap = function setPointConnectionMap(curvePoints) {
      pointConnectionMap = [];
      var cumLinePoints = 0;
      Object.keys(curvePoints).forEach(function (id, index) {
        pointConnectionMap[id] = [index, curvePoints[id].reference, curvePoints[id].length / 2,
        // Used for offsetting in the buffer manipulations on
        // hovering and selecting
        cumLinePoints];
        cumLinePoints += curvePoints[id].length / 2;
      });
    };
    var setPointConnections = function setPointConnections(newPoints) {
      return new Promise(function (resolve) {
        pointConnections.setPoints([]);
        if (!newPoints || !newPoints.length) {
          resolve();
        } else {
          computingPointConnectionCurves = true;
          createSplineCurve(newPoints, {
            maxIntPointsPerSegment: pointConnectionMaxIntPointsPerSegment,
            tolerance: pointConnectionTolerance
          }).then(function (curvePoints) {
            setPointConnectionMap(curvePoints);
            var curvePointValues = Object.values(curvePoints);
            pointConnections.setPoints(curvePointValues.length === 1 ? curvePointValues[0] : curvePointValues, {
              colorIndices: getPointConnectionColorIndices(curvePointValues),
              opacities: getPointConnectionOpacities(),
              widths: getPointConnectionWidths()
            });
            computingPointConnectionCurves = false;
            resolve();
          });
        }
      });
    };

    /**
     * Reset the point filter
     * @param {import('./types').ScatterplotMethodOptions['filter']}
     */
    var unfilter = function unfilter() {
      var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref18$preventEvent = _ref18.preventEvent,
        preventEvent = _ref18$preventEvent === void 0 ? false : _ref18$preventEvent;
      isPointsFiltered = false;
      filteredPointsSet.clear();
      normalPointsIndexBuffer.subdata(createPointIndex(numPoints));
      return new Promise(function (resolve) {
        var finish = function finish() {
          pubSub.subscribe('draw', function () {
            if (!preventEvent) pubSub.publish('unfilter');
            resolve();
          }, 1);
          draw = true;
        };

        // Update point connections
        if (showPointConnections || hasPointConnections(searchIndex.points[0])) {
          setPointConnections(getPoints()).then(function () {
            if (!preventEvent) pubSub.publish('pointConnectionsDraw');
            finish();
          });
        } else {
          finish();
        }
      });
    };

    /**
     * Filter down to a set of points
     * @param {number | number[]} pointIdxs
     * @param {import('./types').ScatterplotMethodOptions['filter']}
     */
    var filter = function filter(pointIdxs) {
      var _ref19 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref19$preventEvent = _ref19.preventEvent,
        preventEvent = _ref19$preventEvent === void 0 ? false : _ref19$preventEvent;
      var filteredPoints = Array.isArray(pointIdxs) ? pointIdxs : [pointIdxs];
      isPointsFiltered = true;
      filteredPointsSet.clear();
      var filteredPointsBuffer = [];
      var filteredSelectedPoints = [];
      for (var i = filteredPoints.length - 1; i >= 0; i--) {
        var pointIdx = filteredPoints[i];
        if (pointIdx < 0 || pointIdx >= numPoints) {
          // Remove invalid filtered points
          filteredPoints.splice(i, 1);
          continue;
        }
        filteredPointsSet.add(pointIdx);
        filteredPointsBuffer.push.apply(filteredPointsBuffer, indexToStateTexCoord(pointIdx));
        if (selectedPointsSet.has(pointIdx)) filteredSelectedPoints.push(pointIdx);
      }

      // Update the normal points index buffers
      normalPointsIndexBuffer.subdata(filteredPointsBuffer);

      // Update selection
      select(filteredSelectedPoints, {
        preventEvent: preventEvent
      });

      // Unset any potentially hovered point
      if (!filteredPointsSet.has(hoveredPoint)) hover(-1, {
        preventEvent: preventEvent
      });
      return new Promise(function (resolve) {
        var finish = function finish() {
          pubSub.subscribe('draw', function () {
            if (!preventEvent) pubSub.publish('filter', {
              points: filteredPoints
            });
            resolve();
          }, 1);
          draw = true;
        };

        // Update point connections
        if (showPointConnections || hasPointConnections(searchIndex.points[0])) {
          setPointConnections(getPoints()).then(function () {
            if (!preventEvent) pubSub.publish('pointConnectionsDraw');
            // We have to re-apply the selection because the connections might
            // have changed
            select(filteredSelectedPoints, {
              preventEvent: preventEvent
            });
            finish();
          });
        } else {
          finish();
        }
      });
    };
    var getPointsInView = function getPointsInView() {
      return getPointsInBBox(bottomLeftNdc[0], bottomLeftNdc[1], topRightNdc[0], topRightNdc[1]);
    };
    var getNumPointsInView = function getNumPointsInView() {
      numPointsInView = getPointsInView().length;
    };
    var getNumPointsInViewDb = throttleAndDebounce(getNumPointsInView, opacityByDensityDebounceTime);
    var tweenCamera = function tweenCamera(t) {
      var _cameraZoomTargetStar = cameraZoomTargetStart,
        _cameraZoomTargetStar2 = _slicedToArray(_cameraZoomTargetStar, 2),
        xStart = _cameraZoomTargetStar2[0],
        yStart = _cameraZoomTargetStar2[1];
      var _cameraZoomTargetEnd = cameraZoomTargetEnd,
        _cameraZoomTargetEnd2 = _slicedToArray(_cameraZoomTargetEnd, 2),
        xEnd = _cameraZoomTargetEnd2[0],
        yEnd = _cameraZoomTargetEnd2[1];
      var ti = 1.0 - t;
      var targetX = xStart * ti + xEnd * t;
      var targetY = yStart * ti + yEnd * t;
      var distance = cameraZoomDistanceStart * ti + cameraZoomDistanceEnd * t;
      camera.lookAt([targetX, targetY], distance);
    };
    var isTransitioningPoints = function isTransitioningPoints() {
      return hasCachedPoints();
    };
    var isTransitioningCamera = function isTransitioningCamera() {
      return hasCachedCamera();
    };
    var tween = function tween(duration, easing) {
      if (!transitionStartTime) transitionStartTime = performance.now();
      var dt = performance.now() - transitionStartTime;
      var t = clip(easing(dt / duration), 0, 1);
      if (isTransitioningPoints()) {
        updatePoints({
          t: t
        });
      }
      if (isTransitioningCamera()) {
        tweenCamera(t);
      }
      return dt < duration;
    };
    var endTransition = function endTransition() {
      isTransitioning = false;
      transitionStartTime = null;
      transitionDuration = undefined;
      transitionEasing = undefined;
      showReticle = preTransitionShowReticle;
      clearCachedPoints();
      clearCachedCamera();
      pubSub.publish('transitionEnd');
    };
    var startTransition = function startTransition(_ref20) {
      var _ref20$duration = _ref20.duration,
        duration = _ref20$duration === void 0 ? 500 : _ref20$duration,
        _ref20$easing = _ref20.easing,
        easing = _ref20$easing === void 0 ? DEFAULT_EASING : _ref20$easing;
      if (isTransitioning) pubSub.publish('transitionEnd');
      isTransitioning = true;
      transitionStartTime = null;
      transitionDuration = duration;
      transitionEasing = isString(easing) ? EASING_FNS[easing] || DEFAULT_EASING : easing;
      preTransitionShowReticle = showReticle;
      showReticle = false;
      pubSub.publish('transitionStart');
    };
    var toArrayOrientedPoints = function toArrayOrientedPoints(points) {
      return new Promise(function (resolve, reject) {
        if (!points || Array.isArray(points)) {
          resolve(points);
        } else {
          var length = Array.isArray(points.x) || ArrayBuffer.isView(points.x) ? points.x.length : 0;
          var getX = (Array.isArray(points.x) || ArrayBuffer.isView(points.x)) && function (i) {
            return points.x[i];
          };
          var getY = (Array.isArray(points.y) || ArrayBuffer.isView(points.y)) && function (i) {
            return points.y[i];
          };
          var getL = (Array.isArray(points.line) || ArrayBuffer.isView(points.line)) && function (i) {
            return points.line[i];
          };
          var getLO = (Array.isArray(points.lineOrder) || ArrayBuffer.isView(points.lineOrder)) && function (i) {
            return points.lineOrder[i];
          };
          var components = Object.keys(points);
          var getZ = function () {
            var z = components.find(function (c) {
              return Z_NAMES.has(c);
            });
            return z && (Array.isArray(points[z]) || ArrayBuffer.isView(points[z])) && function (i) {
              return points[z][i];
            };
          }();
          var getW = function () {
            var w = components.find(function (c) {
              return W_NAMES.has(c);
            });
            return w && (Array.isArray(points[w]) || ArrayBuffer.isView(points[w])) && function (i) {
              return points[w][i];
            };
          }();
          if (getX && getY && getZ && getW && getL && getLO) {
            resolve(points.x.map(function (x, i) {
              return [x, getY(i), getZ(i), getW(i), getL(i), getLO(i)];
            }));
          } else if (getX && getY && getZ && getW && getL) {
            resolve(Array.from({
              length: length
            }, function (_, i) {
              return [getX(i), getY(i), getZ(i), getW(i), getL(i)];
            }));
          } else if (getX && getY && getZ && getW) {
            resolve(Array.from({
              length: length
            }, function (_, i) {
              return [getX(i), getY(i), getZ(i), getW(i)];
            }));
          } else if (getX && getY && getZ) {
            resolve(Array.from({
              length: length
            }, function (_, i) {
              return [getX(i), getY(i), getZ(i)];
            }));
          } else if (getX && getY) {
            resolve(Array.from({
              length: length
            }, function (_, i) {
              return [getX(i), getY(i)];
            }));
          } else {
            reject(new Error('You need to specify at least x and y'));
          }
        }
      });
    };

    /**
     * @param {import('./types').Points} newPoints
     * @param {import('./types').ScatterplotMethodOptions['draw']} options
     * @returns {Promise<void>}
     */
    var publicDraw = function publicDraw(newPoints) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (isDestroyed) {
        return Promise.reject(new Error('The instance was already destroyed'));
      }
      return toArrayOrientedPoints(newPoints).then(function (points) {
        return new Promise(function (resolve) {
          if (isDestroyed) {
            // In the special case where the instance was destroyed after
            // scatterplot.draw() was called but before toArrayOrientedPoints()
            // resolved, we will _not_ reject the promise as this would be
            // confusing. Instead we will immediately resolve and return.
            resolve();
            return;
          }
          var pointsCached = false;
          if (!options.preventFilterReset || (points === null || points === void 0 ? void 0 : points.length) !== numPoints) {
            isPointsFiltered = false;
            filteredPointsSet.clear();
          }
          var drawPointConnections = points && hasPointConnections(points[0]) && (showPointConnections || options.showPointConnectionsOnce);
          var zDataType = options.zDataType,
            wDataType = options.wDataType;
          if (points) {
            if (options.transition) {
              if (points.length === numPoints) {
                pointsCached = cachePoints(points, {
                  z: zDataType,
                  w: wDataType
                });
              } else {
                console.warn('Cannot transition! The number of points between the previous and current draw call must be identical.');
              }
            }
            setPoints(points, {
              z: zDataType,
              w: wDataType
            });
            if (options.hover !== undefined) {
              hover(options.hover, {
                preventEvent: true
              });
            }
            if (options.select !== undefined) {
              select(options.select, {
                preventEvent: true
              });
            }
            if (options.filter !== undefined) {
              filter(options.filter, {
                preventEvent: true
              });
            }
            if (drawPointConnections) {
              setPointConnections(points).then(function () {
                pubSub.publish('pointConnectionsDraw');
                draw = true;
                drawReticleOnce = options.showReticleOnce;
              });
            }
          }
          if (options.transition && pointsCached) {
            if (drawPointConnections) {
              Promise.all([new Promise(function (resolveTransition) {
                pubSub.subscribe('transitionEnd', function () {
                  // Point connects cannot be transitioned yet so we hide them during
                  // the transition. Hence, we need to make sure we call `draw()` once
                  // the transition has ended.
                  draw = true;
                  drawReticleOnce = options.showReticleOnce;
                  resolveTransition();
                }, 1);
              }), new Promise(function (resolveDraw) {
                pubSub.subscribe('pointConnectionsDraw', resolveDraw, 1);
              })]).then(resolve);
            } else {
              pubSub.subscribe('transitionEnd', function () {
                // Point connects cannot be transitioned yet so we hide them during
                // the transition. Hence, we need to make sure we call `draw()` once
                // the transition has ended.
                draw = true;
                drawReticleOnce = options.showReticleOnce;
                resolve();
              }, 1);
            }
            startTransition({
              duration: options.transitionDuration,
              easing: options.transitionEasing
            });
          } else {
            if (drawPointConnections) {
              Promise.all([new Promise(function (resolveDraw) {
                pubSub.subscribe('draw', resolveDraw, 1);
              }), new Promise(function (resolveDraw) {
                pubSub.subscribe('pointConnectionsDraw', resolveDraw, 1);
              })]).then(resolve);
            } else {
              pubSub.subscribe('draw', resolve, 1);
            }
            draw = true;
            drawReticleOnce = options.showReticleOnce;
          }
        });
      });
    };

    /** @type {<F extends Function>(f: F) => (...args: Parameters<F>) => ReturnType<F>} */
    var withDraw = function withDraw(f) {
      return function () {
        var out = f.apply(void 0, arguments);
        draw = true;
        return out;
      };
    };

    /**
     * Get the bounding box of a set of points.
     * @param {number[]} pointIdxs - A list of point indices
     * @returns {import('./types').Rect} The bounding box
     */
    var getBBoxOfPoints = function getBBoxOfPoints(pointIdxs) {
      var xMin = Infinity;
      var xMax = -Infinity;
      var yMin = Infinity;
      var yMax = -Infinity;
      for (var i = 0; i < pointIdxs.length; i++) {
        var _searchIndex$points$p = _slicedToArray(searchIndex.points[pointIdxs[i]], 2),
          x = _searchIndex$points$p[0],
          y = _searchIndex$points$p[1];
        xMin = Math.min(xMin, x);
        xMax = Math.max(xMax, x);
        yMin = Math.min(yMin, y);
        yMax = Math.max(yMax, y);
      }
      return {
        x: xMin,
        y: yMin,
        width: xMax - xMin,
        height: yMax - yMin
      };
    };

    /**
     * Zoom to an area specified as a rectangle
     * @param {import('./types').Rect} rect - The rectangle to zoom to
     * @param {import('./types').ScatterplotMethodOptions['draw']} options
     * @returns {Promise<void>}
     */
    var zoomToArea = function zoomToArea(rect) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve) {
        var target = [rect.x + rect.width / 2, rect.y + rect.height / 2];

        // Vertical field of view
        // The Arc Tangent is based on the original camera position. Otherwise
        // we would have to do `Math.atan(1 / camera.view[5])`
        var vFOV = 2 * Math.atan(1);
        var distance = rect.height * viewAspectRatio > rect.width ?
        // Distance is based on the height of the bounding box
        rect.height / 2 / Math.tan(vFOV / 2) :
        // Distance is based on the width of the bounding box
        rect.width / 2 / Math.tan(vFOV * viewAspectRatio / 2);
        if (options.transition) {
          camera.config({
            isFixed: true
          });
          cacheCamera(target, distance);
          pubSub.subscribe('transitionEnd', function () {
            resolve();
            camera.config({
              isFixed: false
            });
          }, 1);
          startTransition({
            duration: options.transitionDuration,
            easing: options.transitionEasing
          });
        } else {
          camera.lookAt(target, distance);
          pubSub.subscribe('draw', resolve, 1);
          draw = true;
        }
      });
    };

    /**
     * Zoom to a set of points
     * @param {number[]} pointIdxs - A list of point indices
     * @param {import('./types').ScatterplotMethodOptions['zoomToPoints']} options
     * @returns {Promise<void>}
     */
    var zoomToPoints = function zoomToPoints(pointIdxs) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isPointsDrawn) return Promise.reject(new Error(ERROR_POINTS_NOT_DRAWN));
      var rect = getBBoxOfPoints(pointIdxs);
      var cX = rect.x + rect.width / 2;
      var cY = rect.y + rect.height / 2;
      var pointSizeNdc = getPointSizeNdc();
      var scale = 1 + (options.padding || 0);
      var w = Math.max(rect.width, pointSizeNdc) * scale;
      var h = Math.max(rect.height, pointSizeNdc) * scale;
      var x = cX - w / 2;
      var y = cY - h / 2;
      return zoomToArea({
        x: x,
        y: y,
        width: w,
        height: h
      }, options);
    };

    /**
     * Zoom to a location specified in normalized devide coordinates.
     * @param {number[]} target - The camera target
     * @param {number} distance - The camera distance
     * @param {import('./types').ScatterplotMethodOptions['draw']} options
     * @returns {Promise<void>}
     */
    var zoomToLocation = function zoomToLocation(target, distance) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return new Promise(function (resolve) {
        if (options.transition) {
          camera.config({
            isFixed: true
          });
          cacheCamera(target, distance);
          pubSub.subscribe('transitionEnd', function () {
            resolve();
            camera.config({
              isFixed: false
            });
          }, 1);
          startTransition({
            duration: options.transitionDuration,
            easing: options.transitionEasing
          });
        } else {
          camera.lookAt(target, distance);
          pubSub.subscribe('draw', resolve, 1);
          draw = true;
        }
      });
    };

    /**
     * Zoom to the origin
     * @param {import('./types').ScatterplotMethodOptions['draw']} options
     * @returns {Promise<void>}
     */
    var zoomToOrigin = function zoomToOrigin() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return zoomToLocation([0, 0], 1, options);
    };

    /**
     * Get the screen position of a point
     * @param {number} pointIdx - Point index
     * @returns {[number, number] | undefined}
     */
    var getScreenPosition = function getScreenPosition(pointIdx) {
      if (!isPointsDrawn) throw new Error(ERROR_POINTS_NOT_DRAWN);
      var point = searchIndex.points[pointIdx];
      if (!point) return undefined;

      // Homogeneous coordinates of the point
      var v = [point[0], point[1], 0, 1];

      // Convert to clip space
      multiply(scratch, projectionLocal, multiply(scratch, camera.view, model));
      transformMat4(v, v, scratch);

      // Finally, we convert to the screen space
      var x = currentWidth * (v[0] + 1) / 2;
      var y = currentHeight * (0.5 - v[1] / 2);
      return [x, y];
    };
    var updatePointConnectionStyle = function updatePointConnectionStyle() {
      pointConnections.setStyle({
        color: getColors(pointConnectionColor, pointConnectionColorActive, pointConnectionColorHover),
        opacity: pointConnectionOpacity === null ? null : pointConnectionOpacity[0],
        width: pointConnectionSize[0]
      });
    };
    var updateLassoInitiatorStyle = function updateLassoInitiatorStyle() {
      var v = Math.round(backgroundColorBrightness) > 0.5 ? 0 : 255;
      lassoManager.initiator.style.border = "1px dashed rgba(".concat(v, ", ").concat(v, ", ").concat(v, ", 0.33)");
      lassoManager.initiator.style.background = "rgba(".concat(v, ", ").concat(v, ", ").concat(v, ", 0.1)");
    };
    var updateLassoLongPressIndicatorStyle = function updateLassoLongPressIndicatorStyle() {
      var v = Math.round(backgroundColorBrightness) > 0.5 ? 0 : 255;
      lassoManager.longPressIndicator.style.color = "rgb(".concat(v, ", ").concat(v, ", ").concat(v, ")");
      lassoManager.longPressIndicator.dataset.color = "rgb(".concat(v, ", ").concat(v, ", ").concat(v, ")");
      var rgb = lassoColor.map(function (c) {
        return Math.round(c * 255);
      });
      lassoManager.longPressIndicator.dataset.activeColor = "rgb(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ")");
    };
    var setBackgroundColor = function setBackgroundColor(newBackgroundColor) {
      if (!newBackgroundColor) return;
      backgroundColor = toRgba(newBackgroundColor, true);
      backgroundColorBrightness = rgbBrightness(backgroundColor);
      updateLassoInitiatorStyle();
      updateLassoLongPressIndicatorStyle();
    };
    var setBackgroundImage = function setBackgroundImage(newBackgroundImage) {
      if (!newBackgroundImage) {
        backgroundImage = null;
      } else if (isString(newBackgroundImage)) {
        createTextureFromUrl(renderer.regl, newBackgroundImage).then(function (texture) {
          backgroundImage = texture;
          draw = true;
          pubSub.publish('backgroundImageReady');
        })["catch"](function () {
          console.error("Count not create texture from ".concat(newBackgroundImage));
          backgroundImage = null;
        });
        // eslint-disable-next-line no-underscore-dangle
      } else if (newBackgroundImage._reglType === 'texture2d') {
        backgroundImage = newBackgroundImage;
      } else {
        backgroundImage = null;
      }
    };
    var setCameraDistance = function setCameraDistance(distance) {
      if (distance > 0) camera.lookAt(camera.target, distance, camera.rotation);
    };
    var setCameraRotation = function setCameraRotation(rotation) {
      if (rotation !== null) camera.lookAt(camera.target, camera.distance[0], rotation);
    };
    var setCameraTarget = function setCameraTarget(target) {
      if (target) camera.lookAt(target, camera.distance[0], camera.rotation);
    };
    var setCameraView = function setCameraView(view) {
      if (view) camera.setView(view);
    };
    var setLassoColor = function setLassoColor(newLassoColor) {
      if (!newLassoColor) return;
      lassoColor = toRgba(newLassoColor, true);
      lasso.setStyle({
        color: lassoColor
      });
      var rgb = lassoColor.map(function (c) {
        return Math.round(c * 255);
      });
      lassoManager.longPressIndicator.dataset.activeColor = "rgb(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ")");
    };
    var setLassoLineWidth = function setLassoLineWidth(newLassoLineWidth) {
      if (Number.isNaN(+newLassoLineWidth) || +newLassoLineWidth < 1) return;
      lassoLineWidth = +newLassoLineWidth;
      lasso.setStyle({
        width: lassoLineWidth
      });
    };
    var setLassoMinDelay = function setLassoMinDelay(newLassoMinDelay) {
      if (!+newLassoMinDelay) return;
      lassoMinDelay = +newLassoMinDelay;
      lassoManager.set({
        minDelay: lassoMinDelay
      });
    };
    var setLassoMinDist = function setLassoMinDist(newLassoMinDist) {
      if (!+newLassoMinDist) return;
      lassoMinDist = +newLassoMinDist;
      lassoManager.set({
        minDist: lassoMinDist
      });
    };
    var setLassoClearEvent = function setLassoClearEvent(newLassoClearEvent) {
      lassoClearEvent = limit(LASSO_CLEAR_EVENTS, lassoClearEvent)(newLassoClearEvent);
    };
    var setLassoInitiator = function setLassoInitiator(newLassoInitiator) {
      lassoInitiator = Boolean(newLassoInitiator);
      lassoManager.set({
        enableInitiator: lassoInitiator
      });
    };
    var setLassoInitiatorParentElement = function setLassoInitiatorParentElement(newLassoInitiatorParentElement) {
      lassoInitiatorParentElement = newLassoInitiatorParentElement;
      lassoManager.set({
        startInitiatorParentElement: lassoInitiatorParentElement
      });
    };
    var setLassoOnLongPress = function setLassoOnLongPress(newLassoOnLongPress) {
      lassoOnLongPress = Boolean(newLassoOnLongPress);
    };
    var setLassoLongPressTime = function setLassoLongPressTime(newLassoOnLongPressTime) {
      lassoLongPressTime = Number(newLassoOnLongPressTime);
    };
    var setLassoLongPressAfterEffectTime = function setLassoLongPressAfterEffectTime(newTime) {
      lassoLongPressAfterEffectTime = Number(newTime);
    };
    var setLassoLongPressEffectDelay = function setLassoLongPressEffectDelay(newDelay) {
      lassoLongPressEffectDelay = Number(newDelay);
    };
    var setLassoLongPressRevertEffectTime = function setLassoLongPressRevertEffectTime(newTime) {
      lassoLongPressRevertEffectTime = Number(newTime);
    };
    var setKeyMap = function setKeyMap(newKeyMap) {
      keyMap = Object.entries(newKeyMap).reduce(function (map, _ref21) {
        var _ref22 = _slicedToArray(_ref21, 2),
          key = _ref22[0],
          value = _ref22[1];
        if (KEYS.includes(key) && KEY_ACTIONS.includes(value)) {
          map[key] = value;
        }
        return map;
      }, {});
      keyActionMap = flipObj(keyMap);
      if (keyActionMap[KEY_ACTION_ROTATE]) {
        camera.config({
          isRotate: true,
          mouseDownMoveModKey: keyActionMap[KEY_ACTION_ROTATE]
        });
      } else {
        camera.config({
          isRotate: false
        });
      }
    };
    var setMouseMode = function setMouseMode(newMouseMode) {
      mouseMode = limit(MOUSE_MODES, MOUSE_MODE_PANZOOM)(newMouseMode);
      camera.config({
        defaultMouseDownMoveAction: mouseMode === MOUSE_MODE_ROTATE ? 'rotate' : 'pan'
      });
    };
    var setShowReticle = function setShowReticle(newShowReticle) {
      if (newShowReticle === null) return;
      showReticle = newShowReticle;
    };
    var setReticleColor = function setReticleColor(newReticleColor) {
      if (!newReticleColor) return;
      reticleColor = toRgba(newReticleColor, true);
      reticleHLine.setStyle({
        color: reticleColor
      });
      reticleVLine.setStyle({
        color: reticleColor
      });
    };
    var setXScale = function setXScale(newXScale) {
      if (!newXScale) return;
      xScale = newXScale;
      xDomainStart = newXScale.domain()[0];
      xDomainSize = newXScale ? newXScale.domain()[1] - newXScale.domain()[0] : 0;
      xScale.range([0, currentWidth]);
      updateScales();
    };
    var setYScale = function setYScale(newYScale) {
      if (!newYScale) return;
      yScale = newYScale;
      yDomainStart = yScale.domain()[0];
      yDomainSize = yScale ? yScale.domain()[1] - yScale.domain()[0] : 0;
      yScale.range([currentHeight, 0]);
      updateScales();
    };
    var setDeselectOnDblClick = function setDeselectOnDblClick(newDeselectOnDblClick) {
      deselectOnDblClick = !!newDeselectOnDblClick;
    };
    var setDeselectOnEscape = function setDeselectOnEscape(newDeselectOnEscape) {
      deselectOnEscape = !!newDeselectOnEscape;
    };
    var setShowPointConnections = function setShowPointConnections(newShowPointConnections) {
      showPointConnections = !!newShowPointConnections;
      if (showPointConnections) {
        if (hasPointConnections(searchIndex.points[0])) {
          setPointConnections(getPoints()).then(function () {
            pubSub.publish('pointConnectionsDraw');
            draw = true;
          });
        }
      } else {
        setPointConnections();
      }
    };
    var setPointConnectionColors = function setPointConnectionColors(setter, getInheritance) {
      return function (newColors) {
        if (newColors === 'inherit') {
          setter(_toConsumableArray(getInheritance()));
        } else {
          var tmpColors = isMultipleColors(newColors) ? newColors : [newColors];
          setter(tmpColors.map(function (color) {
            return toRgba(color, true);
          }));
        }
        updatePointConnectionStyle();
      };
    };
    var setPointConnectionColor = setPointConnectionColors(function (newColors) {
      pointConnectionColor = newColors;
    }, function () {
      return pointColor;
    });
    var setPointConnectionColorActive = setPointConnectionColors(function (newColors) {
      pointConnectionColorActive = newColors;
    }, function () {
      return pointColorActive;
    });
    var setPointConnectionColorHover = setPointConnectionColors(function (newColors) {
      pointConnectionColorHover = newColors;
    }, function () {
      return pointColorHover;
    });
    var setPointConnectionOpacity = function setPointConnectionOpacity(newOpacity) {
      if (isConditionalArray(newOpacity, isPositiveNumber, {
        minLength: 1
      })) pointConnectionOpacity = _toConsumableArray(newOpacity);
      if (isStrictlyPositiveNumber(+newOpacity)) pointConnectionOpacity = [+newOpacity];
      pointConnectionColor = pointConnectionColor.map(function (color) {
        color[3] = !Number.isNaN(+pointConnectionOpacity[0]) ? +pointConnectionOpacity[0] : color[3];
        return color;
      });
      updatePointConnectionStyle();
    };
    var setPointConnectionOpacityActive = function setPointConnectionOpacityActive(newOpacity) {
      if (!Number.isNaN(+newOpacity) && +newOpacity) pointConnectionOpacityActive = +newOpacity;
    };
    var setPointConnectionSize = function setPointConnectionSize(newPointConnectionSize) {
      if (isConditionalArray(newPointConnectionSize, isPositiveNumber, {
        minLength: 1
      })) pointConnectionSize = _toConsumableArray(newPointConnectionSize);
      if (isStrictlyPositiveNumber(+newPointConnectionSize)) pointConnectionSize = [+newPointConnectionSize];
      updatePointConnectionStyle();
    };
    var setPointConnectionSizeActive = function setPointConnectionSizeActive(newPointConnectionSizeActive) {
      if (!Number.isNaN(+newPointConnectionSizeActive) && +newPointConnectionSizeActive) pointConnectionSizeActive = Math.max(0, newPointConnectionSizeActive);
    };
    var setPointConnectionMaxIntPointsPerSegment = function setPointConnectionMaxIntPointsPerSegment(newPointConnectionMaxIntPointsPerSegment) {
      pointConnectionMaxIntPointsPerSegment = Math.max(0, newPointConnectionMaxIntPointsPerSegment);
    };
    var setPointConnectionTolerance = function setPointConnectionTolerance(newPointConnectionTolerance) {
      pointConnectionTolerance = Math.max(0, newPointConnectionTolerance);
    };
    var setPointSizeMouseDetection = function setPointSizeMouseDetection(newPointSizeMouseDetection) {
      pointSizeMouseDetection = newPointSizeMouseDetection;
      computePointSizeMouseDetection();
    };
    var setOpacityByDensityFill = function setOpacityByDensityFill(newOpacityByDensityFill) {
      opacityByDensityFill = +newOpacityByDensityFill;
    };
    var setOpacityInactiveMax = function setOpacityInactiveMax(newOpacityInactiveMax) {
      opacityInactiveMax = +newOpacityInactiveMax;
    };
    var setOpacityInactiveScale = function setOpacityInactiveScale(newOpacityInactiveScale) {
      opacityInactiveScale = +newOpacityInactiveScale;
    };
    var setGamma = function setGamma(newGamma) {
      renderer.gamma = newGamma;
    };

    /** @type {<Key extends keyof import('./types').Properties>(property: Key) => import('./types').Properties[Key] } */
    var get = function get(property) {
      checkDeprecations({
        property: true
      });
      if (property === 'aspectRatio') return dataAspectRatio;
      if (property === 'background') return backgroundColor;
      if (property === 'backgroundColor') return backgroundColor;
      if (property === 'backgroundImage') return backgroundImage;
      if (property === 'camera') return camera;
      if (property === 'cameraTarget') return camera.target;
      if (property === 'cameraDistance') return camera.distance[0];
      if (property === 'cameraRotation') return camera.rotation;
      if (property === 'cameraView') return camera.view;
      if (property === 'canvas') return canvas;
      if (property === 'colorBy') return colorBy;
      if (property === 'sizeBy') return sizeBy;
      if (property === 'deselectOnDblClick') return deselectOnDblClick;
      if (property === 'deselectOnEscape') return deselectOnEscape;
      if (property === 'height') return height;
      if (property === 'lassoColor') return lassoColor;
      if (property === 'lassoLineWidth') return lassoLineWidth;
      if (property === 'lassoMinDelay') return lassoMinDelay;
      if (property === 'lassoMinDist') return lassoMinDist;
      if (property === 'lassoClearEvent') return lassoClearEvent;
      if (property === 'lassoInitiator') return lassoInitiator;
      if (property === 'lassoInitiatorElement') return lassoManager.initiator;
      if (property === 'lassoInitiatorParentElement') return lassoInitiatorParentElement;
      if (property === 'keyMap') return _objectSpread2({}, keyMap);
      if (property === 'mouseMode') return mouseMode;
      if (property === 'opacity') return opacity.length === 1 ? opacity[0] : opacity;
      if (property === 'opacityBy') return opacityBy;
      if (property === 'opacityByDensityFill') return opacityByDensityFill;
      if (property === 'opacityByDensityDebounceTime') return opacityByDensityDebounceTime;
      if (property === 'opacityInactiveMax') return opacityInactiveMax;
      if (property === 'opacityInactiveScale') return opacityInactiveScale;
      if (property === 'points') return searchIndex.points;
      if (property === 'hoveredPoint') return hoveredPoint;
      if (property === 'selectedPoints') return _toConsumableArray(selectedPoints);
      if (property === 'filteredPoints') return isPointsFiltered ? Array.from(filteredPointsSet) : Array.from({
        length: searchIndex.points.length
      }, function (_, i) {
        return i;
      });
      if (property === 'pointsInView') return getPointsInView();
      if (property === 'pointColor') return pointColor.length === 1 ? pointColor[0] : pointColor;
      if (property === 'pointColorActive') return pointColorActive.length === 1 ? pointColorActive[0] : pointColorActive;
      if (property === 'pointColorHover') return pointColorHover.length === 1 ? pointColorHover[0] : pointColorHover;
      if (property === 'pointOutlineWidth') return pointOutlineWidth;
      if (property === 'pointSize') return pointSize.length === 1 ? pointSize[0] : pointSize;
      if (property === 'pointSizeSelected') return pointSizeSelected;
      if (property === 'pointSizeMouseDetection') return pointSizeMouseDetection;
      if (property === 'showPointConnections') return showPointConnections;
      if (property === 'pointConnectionColor') return pointConnectionColor.length === 1 ? pointConnectionColor[0] : pointConnectionColor;
      if (property === 'pointConnectionColorActive') return pointConnectionColorActive.length === 1 ? pointConnectionColorActive[0] : pointConnectionColorActive;
      if (property === 'pointConnectionColorHover') return pointConnectionColorHover.length === 1 ? pointConnectionColorHover[0] : pointConnectionColorHover;
      if (property === 'pointConnectionColorBy') return pointConnectionColorBy;
      if (property === 'pointConnectionOpacity') return pointConnectionOpacity.length === 1 ? pointConnectionOpacity[0] : pointConnectionOpacity;
      if (property === 'pointConnectionOpacityBy') return pointConnectionOpacityBy;
      if (property === 'pointConnectionOpacityActive') return pointConnectionOpacityActive;
      if (property === 'pointConnectionSize') return pointConnectionSize.length === 1 ? pointConnectionSize[0] : pointConnectionSize;
      if (property === 'pointConnectionSizeActive') return pointConnectionSizeActive;
      if (property === 'pointConnectionSizeBy') return pointConnectionSizeBy;
      if (property === 'pointConnectionMaxIntPointsPerSegment') return pointConnectionMaxIntPointsPerSegment;
      if (property === 'pointConnectionTolerance') return pointConnectionTolerance;
      if (property === 'reticleColor') return reticleColor;
      if (property === 'regl') return renderer.regl;
      if (property === 'showReticle') return showReticle;
      if (property === 'version') return version;
      if (property === 'width') return width;
      if (property === 'xScale') return xScale;
      if (property === 'yScale') return yScale;
      if (property === 'performanceMode') return performanceMode;
      if (property === 'gamma') return renderer.gamma;
      if (property === 'renderer') return renderer;
      if (property === 'isDestroyed') return isDestroyed;
      if (property === 'isPointsDrawn') return isPointsDrawn;
      if (property === 'isPointsFiltered') return isPointsFiltered;
      if (property === 'zDataType') return valueZDataType;
      if (property === 'wDataType') return valueWDataType;
      return undefined;
    };

    /** @type {(properties: Partial<import('./types').Settable>) => void} */
    var set = function set() {
      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      checkDeprecations(properties);
      if (properties.backgroundColor !== undefined || properties.background !== undefined) {
        setBackgroundColor(properties.backgroundColor || properties.background);
      }
      if (properties.backgroundImage !== undefined) {
        setBackgroundImage(properties.backgroundImage);
      }
      if (properties.cameraTarget !== undefined) {
        setCameraTarget(properties.cameraTarget);
      }
      if (properties.cameraDistance !== undefined) {
        setCameraDistance(properties.cameraDistance);
      }
      if (properties.cameraRotation !== undefined) {
        setCameraRotation(properties.cameraRotation);
      }
      if (properties.cameraView !== undefined) {
        setCameraView(properties.cameraView);
      }
      if (properties.colorBy !== undefined) {
        setColorBy(properties.colorBy);
      }
      if (properties.pointColor !== undefined) {
        setPointColor(properties.pointColor);
      }
      if (properties.pointColorActive !== undefined) {
        setPointColorActive(properties.pointColorActive);
      }
      if (properties.pointColorHover !== undefined) {
        setPointColorHover(properties.pointColorHover);
      }
      if (properties.pointSize !== undefined) {
        setPointSize(properties.pointSize);
      }
      if (properties.pointSizeSelected !== undefined) {
        setPointSizeSelected(properties.pointSizeSelected);
      }
      if (properties.pointSizeMouseDetection !== undefined) {
        setPointSizeMouseDetection(properties.pointSizeMouseDetection);
      }
      if (properties.sizeBy !== undefined) {
        setSizeBy(properties.sizeBy);
      }
      if (properties.opacity !== undefined) {
        setOpacity(properties.opacity);
      }
      if (properties.showPointConnections !== undefined) {
        setShowPointConnections(properties.showPointConnections);
      }
      if (properties.pointConnectionColor !== undefined) {
        setPointConnectionColor(properties.pointConnectionColor);
      }
      if (properties.pointConnectionColorActive !== undefined) {
        setPointConnectionColorActive(properties.pointConnectionColorActive);
      }
      if (properties.pointConnectionColorHover !== undefined) {
        setPointConnectionColorHover(properties.pointConnectionColorHover);
      }
      if (properties.pointConnectionColorBy !== undefined) {
        setPointConnectionColorBy(properties.pointConnectionColorBy);
      }
      if (properties.pointConnectionOpacityBy !== undefined) {
        setPointConnectionOpacityBy(properties.pointConnectionOpacityBy);
      }
      if (properties.pointConnectionOpacity !== undefined) {
        setPointConnectionOpacity(properties.pointConnectionOpacity);
      }
      if (properties.pointConnectionOpacityActive !== undefined) {
        setPointConnectionOpacityActive(properties.pointConnectionOpacityActive);
      }
      if (properties.pointConnectionSize !== undefined) {
        setPointConnectionSize(properties.pointConnectionSize);
      }
      if (properties.pointConnectionSizeActive !== undefined) {
        setPointConnectionSizeActive(properties.pointConnectionSizeActive);
      }
      if (properties.pointConnectionSizeBy !== undefined) {
        setPointConnectionSizeBy(properties.pointConnectionSizeBy);
      }
      if (properties.pointConnectionMaxIntPointsPerSegment !== undefined) {
        setPointConnectionMaxIntPointsPerSegment(properties.pointConnectionMaxIntPointsPerSegment);
      }
      if (properties.pointConnectionTolerance !== undefined) {
        setPointConnectionTolerance(properties.pointConnectionTolerance);
      }
      if (properties.opacityBy !== undefined) {
        setOpacityBy(properties.opacityBy);
      }
      if (properties.lassoColor !== undefined) {
        setLassoColor(properties.lassoColor);
      }
      if (properties.lassoLineWidth !== undefined) {
        setLassoLineWidth(properties.lassoLineWidth);
      }
      if (properties.lassoMinDelay !== undefined) {
        setLassoMinDelay(properties.lassoMinDelay);
      }
      if (properties.lassoMinDist !== undefined) {
        setLassoMinDist(properties.lassoMinDist);
      }
      if (properties.lassoClearEvent !== undefined) {
        setLassoClearEvent(properties.lassoClearEvent);
      }
      if (properties.lassoInitiator !== undefined) {
        setLassoInitiator(properties.lassoInitiator);
      }
      if (properties.lassoInitiatorParentElement !== undefined) {
        setLassoInitiatorParentElement(properties.lassoInitiatorParentElement);
      }
      if (properties.lassoOnLongPress !== undefined) {
        setLassoOnLongPress(properties.lassoOnLongPress);
      }
      if (properties.lassoLongPressTime !== undefined) {
        setLassoLongPressTime(properties.lassoLongPressTime);
      }
      if (properties.lassoLongPressAfterEffectTime !== undefined) {
        setLassoLongPressAfterEffectTime(properties.lassoLongPressAfterEffectTime);
      }
      if (properties.lassoLongPressEffectDelay !== undefined) {
        setLassoLongPressEffectDelay(properties.lassoLongPressEffectDelay);
      }
      if (properties.lassoLongPressRevertEffectTime !== undefined) {
        setLassoLongPressRevertEffectTime(properties.lassoLongPressRevertEffectTime);
      }
      if (properties.keyMap !== undefined) {
        setKeyMap(properties.keyMap);
      }
      if (properties.mouseMode !== undefined) {
        setMouseMode(properties.mouseMode);
      }
      if (properties.showReticle !== undefined) {
        setShowReticle(properties.showReticle);
      }
      if (properties.reticleColor !== undefined) {
        setReticleColor(properties.reticleColor);
      }
      if (properties.pointOutlineWidth !== undefined) {
        setPointOutlineWidth(properties.pointOutlineWidth);
      }
      if (properties.height !== undefined) {
        setHeight(properties.height);
      }
      if (properties.width !== undefined) {
        setWidth(properties.width);
      }
      if (properties.aspectRatio !== undefined) {
        setDataAspectRatio(properties.aspectRatio);
      }
      if (properties.xScale !== undefined) {
        setXScale(properties.xScale);
      }
      if (properties.yScale !== undefined) {
        setYScale(properties.yScale);
      }
      if (properties.deselectOnDblClick !== undefined) {
        setDeselectOnDblClick(properties.deselectOnDblClick);
      }
      if (properties.deselectOnEscape !== undefined) {
        setDeselectOnEscape(properties.deselectOnEscape);
      }
      if (properties.opacityByDensityFill !== undefined) {
        setOpacityByDensityFill(properties.opacityByDensityFill);
      }
      if (properties.opacityInactiveMax !== undefined) {
        setOpacityInactiveMax(properties.opacityInactiveMax);
      }
      if (properties.opacityInactiveScale !== undefined) {
        setOpacityInactiveScale(properties.opacityInactiveScale);
      }
      if (properties.gamma !== undefined) {
        setGamma(properties.gamma);
      }

      // setWidth and setHeight can be async when width or height are set to
      // 'auto'. And since draw() would have anyway been async we can just make
      // all calls async.
      return new Promise(function (resolve) {
        window.requestAnimationFrame(function () {
          if (!canvas) return; // Instance was destroyed in between
          updateViewAspectRatio();
          camera.refresh();
          renderer.refresh();
          draw = true;
          resolve();
        });
      });
    };

    /**
     * @param {number[]} cameraView
     * @param {import('./types').ScatterplotMethodOptions['preventEvent']} options
     */
    var view = function view(cameraView) {
      var _ref23 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref23$preventEvent = _ref23.preventEvent,
        preventEvent = _ref23$preventEvent === void 0 ? false : _ref23$preventEvent;
      setCameraView(cameraView);
      draw = true;
      preventEventView = preventEvent;
    };
    var initCamera = function initCamera() {
      if (!camera) camera = dom2dCamera(canvas, {
        isPanInverted: [false, true]
      });
      if (initialProperties.cameraView) {
        camera.setView(clone(initialProperties.cameraView));
      } else if (initialProperties.cameraTarget || initialProperties.cameraDistance || initialProperties.cameraRotation) {
        camera.lookAt(_toConsumableArray(initialProperties.cameraTarget || DEFAULT_TARGET), initialProperties.cameraDistance || DEFAULT_DISTANCE, initialProperties.cameraRotation || DEFAULT_ROTATION);
      } else {
        camera.setView(clone(DEFAULT_VIEW));
      }
      topRightNdc = getScatterGlPos(1, 1);
      bottomLeftNdc = getScatterGlPos(-1, -1);
    };

    /**
     * @param {import('./types').ScatterplotMethodOptions['preventEvent']} options
     */
    var reset = function reset() {
      var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref24$preventEvent = _ref24.preventEvent,
        preventEvent = _ref24$preventEvent === void 0 ? false : _ref24$preventEvent;
      initCamera();
      updateScales();
      if (preventEvent) return;
      pubSub.publish('view', {
        view: camera.view,
        camera: camera,
        xScale: xScale,
        yScale: yScale
      });
    };
    var keyUpHandler = function keyUpHandler(_ref25) {
      var key = _ref25.key;
      switch (key) {
        case 'Escape':
          if (deselectOnEscape) deselect();
          break;
        // Nothing
      }
    };

    var mouseEnterCanvasHandler = function mouseEnterCanvasHandler() {
      isMouseInCanvas = true;
      isMouseOverCanvasChecked = true;
    };
    var mouseLeaveCanvasHandler = function mouseLeaveCanvasHandler() {
      hover();
      isMouseInCanvas = false;
      isMouseOverCanvasChecked = true;
      draw = true;
    };
    var wheelHandler = function wheelHandler() {
      draw = true;
    };

    /** @type {() => void} */
    var clear = function clear() {
      setPoints([]);
      pointConnections.clear();
    };
    var resizeHandler = function resizeHandler() {
      camera.refresh();
      var autoWidth = width === AUTO;
      var autoHeight = height === AUTO;
      if (autoWidth || autoHeight) {
        var _canvas$getBoundingCl = canvas.getBoundingClientRect(),
          newWidth = _canvas$getBoundingCl.width,
          newHeight = _canvas$getBoundingCl.height;
        if (autoWidth) setCurrentWidth(newWidth);
        if (autoHeight) setCurrentHeight(newHeight);
        updateViewAspectRatio();
        draw = true;
      }
    };

    /** @type {() => ImageData} */
    var exportFn = function exportFn() {
      return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    };
    var init = function init() {
      updateViewAspectRatio();
      initCamera();
      updateScales();
      lasso = createLine$1(renderer.regl, {
        color: lassoColor,
        width: lassoLineWidth,
        is2d: true
      });
      pointConnections = createLine$1(renderer.regl, {
        color: pointConnectionColor,
        colorHover: pointConnectionColorHover,
        colorActive: pointConnectionColorActive,
        opacity: pointConnectionOpacity === null ? null : pointConnectionOpacity[0],
        width: pointConnectionSize[0],
        widthActive: pointConnectionSizeActive,
        is2d: true
      });
      reticleHLine = createLine$1(renderer.regl, {
        color: reticleColor,
        width: 1,
        is2d: true
      });
      reticleVLine = createLine$1(renderer.regl, {
        color: reticleColor,
        width: 1,
        is2d: true
      });
      computePointSizeMouseDetection();

      // Event listeners
      canvas.addEventListener('wheel', wheelHandler);

      // Buffers
      normalPointsIndexBuffer = renderer.regl.buffer();
      selectedPointsIndexBuffer = renderer.regl.buffer();
      hoveredPointIndexBuffer = renderer.regl.buffer({
        usage: 'dynamic',
        type: 'float',
        length: FLOAT_BYTES * 2 // This buffer is fixed to exactly 1 point consisting of 2 coordinates
      });

      colorTex = createColorTexture();
      encodingTex = createEncodingTexture();

      // Set dimensions
      var whenSet = set({
        backgroundImage: backgroundImage,
        width: width,
        height: height,
        keyMap: keyMap
      });
      updateLassoInitiatorStyle();
      updateLassoLongPressIndicatorStyle();

      // Setup event handler
      window.addEventListener('keyup', keyUpHandler, false);
      window.addEventListener('blur', blurHandler, false);
      window.addEventListener('mouseup', mouseUpHandler, false);
      window.addEventListener('mousemove', mouseMoveHandler, false);
      canvas.addEventListener('mousedown', mouseDownHandler, false);
      canvas.addEventListener('mouseenter', mouseEnterCanvasHandler, false);
      canvas.addEventListener('mouseleave', mouseLeaveCanvasHandler, false);
      canvas.addEventListener('click', mouseClickHandler, false);
      canvas.addEventListener('dblclick', mouseDblClickHandler, false);
      if ('ResizeObserver' in window) {
        canvasObserver = new ResizeObserver(resizeHandler);
        canvasObserver.observe(canvas);
      } else {
        window.addEventListener('resize', resizeHandler);
        window.addEventListener('orientationchange', resizeHandler);
      }
      whenSet.then(function () {
        pubSub.publish('init');
      });
    };
    var cancelFrameListener = renderer.onFrame(function () {
      // Update camera: this needs to happen on every
      isViewChanged = camera.tick();
      if (!isPointsDrawn || !(draw || isTransitioning)) return;
      if (isTransitioning && !tween(transitionDuration, transitionEasing)) endTransition();
      if (isViewChanged) {
        topRightNdc = getScatterGlPos(1, 1);
        bottomLeftNdc = getScatterGlPos(-1, -1);
        if (opacityBy === 'density') getNumPointsInViewDb();
      }
      renderer.render(function () {
        var widthRatio = canvas.width / renderer.canvas.width;
        var heightRatio = canvas.height / renderer.canvas.height;
        updateProjectionMatrix(widthRatio, heightRatio);

        // eslint-disable-next-line no-underscore-dangle
        if (backgroundImage && backgroundImage._reglType) {
          drawBackgroundImage();
        }
        if (lassoPointsCurr.length > 2) drawPolygon2d();

        // The draw order of the following calls is important!
        if (!isTransitioning) {
          pointConnections.draw({
            projection: getProjection(),
            model: getModel(),
            view: getView()
          });
        }
        drawPointBodies();
        if (!mouseDown && (showReticle || drawReticleOnce)) drawReticle();
        if (hoveredPoint >= 0) drawHoveredPoint();
        if (selectedPoints.length) drawSelectedPoints();
        lasso.draw({
          projection: getProjection(),
          model: getModel(),
          view: getView()
        });
      }, canvas);

      // Publish camera change
      if (isViewChanged) {
        updateScales();
        if (preventEventView) {
          preventEventView = false;
        } else {
          pubSub.publish('view', {
            view: camera.view,
            camera: camera,
            xScale: xScale,
            yScale: yScale
          });
        }
      }
      draw = false;
      drawReticleOnce = false;
      pubSub.publish('draw');
    });
    var redraw = function redraw() {
      draw = true;
    };
    var destroy = function destroy() {
      isPointsDrawn = false;
      isDestroyed = true;
      cancelFrameListener();
      window.removeEventListener('keyup', keyUpHandler, false);
      window.removeEventListener('blur', blurHandler, false);
      window.removeEventListener('mouseup', mouseUpHandler, false);
      window.removeEventListener('mousemove', mouseMoveHandler, false);
      canvas.removeEventListener('mousedown', mouseDownHandler, false);
      canvas.removeEventListener('mouseenter', mouseEnterCanvasHandler, false);
      canvas.removeEventListener('mouseleave', mouseLeaveCanvasHandler, false);
      canvas.removeEventListener('click', mouseClickHandler, false);
      canvas.removeEventListener('dblclick', mouseDblClickHandler, false);
      canvas.removeEventListener('wheel', wheelHandler, false);
      if (canvasObserver) {
        canvasObserver.disconnect();
      } else {
        window.removeEventListener('resize', resizeHandler);
        window.removeEventListener('orientationchange', resizeHandler);
      }
      canvas = undefined;
      camera.dispose();
      camera = undefined;
      lasso.destroy();
      lassoManager.destroy();
      pointConnections.destroy();
      reticleHLine.destroy();
      reticleVLine.destroy();
      if (!initialProperties.renderer) {
        // Since the user did not pass in an externally created renderer we can
        // assume that the renderer is only used by this scatter plot instance.
        // Therefore it's save to destroy it when this scatter plot instance is
        // destroyed.
        renderer.destroy();
      }
      pubSub.publish('destroy');
      pubSub.clear();
    };
    init();
    return {
      /**
       * Get whether the browser supports all necessary WebGL features
       * @return {boolean} If `true` the browser supports all necessary WebGL features
       */
      get isSupported() {
        return renderer.isSupported;
      },
      clear: withDraw(clear),
      createTextureFromUrl: function createTextureFromUrl$1( /** @type {string} */url) {
        var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_IMAGE_LOAD_TIMEOUT;
        return createTextureFromUrl(renderer.regl, url, timeout);
      },
      deselect: deselect,
      destroy: destroy,
      draw: publicDraw,
      filter: filter,
      get: get,
      getScreenPosition: getScreenPosition,
      hover: hover,
      redraw: redraw,
      refresh: renderer.refresh,
      reset: withDraw(reset),
      select: select,
      set: set,
      "export": exportFn,
      subscribe: pubSub.subscribe,
      unfilter: unfilter,
      unsubscribe: pubSub.unsubscribe,
      view: view,
      zoomToLocation: zoomToLocation,
      zoomToArea: zoomToArea,
      zoomToPoints: zoomToPoints,
      zoomToOrigin: zoomToOrigin
    };
  };

  exports.checkSupport = checkReglExtensions;
  exports.createRegl = createRegl;
  exports.createRenderer = createRenderer;
  exports.createTextureFromUrl = createTextureFromUrl;
  exports.default = createScatterplot;

  Object.defineProperty(exports, '__esModule', { value: true });

}));