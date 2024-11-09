var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// https://deno.land/x/good@0.5.20/value.js
function deepCopyInner3(value, valueChain = [], originalToCopyMap = /* @__PURE__ */ new Map()) {
  valueChain.push(value);
  if (value == null) {
    return value;
  }
  if (!(value instanceof Object)) {
    return value;
  }
  if (originalToCopyMap.has(value)) {
    return originalToCopyMap.get(value);
  }
  if (value[deepCopySymbol3] instanceof Function) {
    const clonedValue = value[deepCopySymbol3]();
    originalToCopyMap.set(value, clonedValue);
    return clonedValue;
  }
  if (isGeneratorType3(value)) {
    throw Error(`Sadly built-in generators cannot be deep copied.
And I found a generator along this path:
${valueChain.reverse().map((each) => `${each},
`)}`);
  }
  let object, theThis, thisCopy;
  if (value instanceof Date) {
    object = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    object = new RegExp(value);
  } else if (value instanceof Function) {
    theThis = value[getThis3]();
    object = function(...args) {
      return value.apply(thisCopy, args);
    };
  } else if (primitiveArrayClasses2.includes(value.constructor)) {
    object = new value.constructor([...value]);
  } else if (value instanceof Array) {
    object = [];
  } else if (value instanceof Set) {
    object = /* @__PURE__ */ new Set();
  } else if (value instanceof Map) {
    object = /* @__PURE__ */ new Map();
  }
  originalToCopyMap.set(value, object);
  if (object instanceof Function) {
    thisCopy = deepCopyInner3(theThis, valueChain, originalToCopyMap);
  }
  const output2 = object;
  try {
    output2.constructor = value.constructor;
  } catch (error) {
  }
  Object.setPrototypeOf(output2, Object.getPrototypeOf(value));
  const propertyDefinitions = {};
  for (const [key2, description] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    const { value: value2, get, set, ...options } = description;
    const getIsFunc = get instanceof Function;
    const setIsFunc = set instanceof Function;
    if (getIsFunc || setIsFunc) {
      propertyDefinitions[key2] = {
        ...options,
        get: get ? function(...args) {
          return get.apply(output2, args);
        } : void 0,
        set: set ? function(...args) {
          return set.apply(output2, args);
        } : void 0
      };
    } else {
      if (key2 == "length" && output2 instanceof Array) {
        continue;
      }
      propertyDefinitions[key2] = {
        ...options,
        value: deepCopyInner3(value2, valueChain, originalToCopyMap)
      };
    }
  }
  Object.defineProperties(output2, propertyDefinitions);
  return output2;
}
var primitiveArrayClasses2, allKeys3, ownKeyDescriptions3, allKeyDescriptions3, MapIterator3, SetIterator3, GeneratorFunction3, AsyncGeneratorFunction3, isGeneratorType3, deepCopySymbol3, clonedFromSymbol3, getThis3, deepCopy3;
var init_value = __esm({
  "https://deno.land/x/good@0.5.20/value.js"() {
    primitiveArrayClasses2 = [Uint16Array, Uint32Array, Uint8Array, Uint8ClampedArray, Int16Array, Int32Array, Int8Array, Float32Array, Float64Array, globalThis.BigInt64Array, globalThis.BigUint64Array].filter((each) => each);
    allKeys3 = function(obj) {
      let keys = [];
      if (obj == null) {
        return [];
      }
      if (!(obj instanceof Object)) {
        obj = Object.getPrototypeOf(obj);
      }
      while (obj) {
        keys = keys.concat(Reflect.ownKeys(obj));
        obj = Object.getPrototypeOf(obj);
      }
      return keys;
    };
    ownKeyDescriptions3 = Object.getOwnPropertyDescriptors;
    allKeyDescriptions3 = function(value, options = { includingBuiltin: false }) {
      var { includingBuiltin } = { ...options };
      let descriptions = [];
      if (value == null) {
        return {};
      }
      if (!(value instanceof Object)) {
        value = Object.getPrototypeOf(value);
      }
      const rootPrototype = Object.getPrototypeOf({});
      let prevObj;
      while (value && value != prevObj) {
        if (!includingBuiltin && value == rootPrototype) {
          break;
        }
        descriptions = descriptions.concat(Object.entries(Object.getOwnPropertyDescriptors(value)));
        prevObj = value;
        value = Object.getPrototypeOf(value);
      }
      descriptions.reverse();
      return Object.fromEntries(descriptions);
    };
    MapIterator3 = Object.getPrototypeOf((/* @__PURE__ */ new Map()).keys());
    SetIterator3 = Object.getPrototypeOf((/* @__PURE__ */ new Set()).keys());
    GeneratorFunction3 = class {
    };
    AsyncGeneratorFunction3 = class {
    };
    try {
      GeneratorFunction3 = eval("((function*(){})()).constructor");
      AsyncGeneratorFunction3 = eval("((async function*(){})()).constructor");
    } catch (error) {
    }
    isGeneratorType3 = (value) => {
      if (value instanceof Object) {
        const prototype = Object.getPrototypeOf(value);
        if (prototype == MapIterator3 || prototype == SetIterator3) {
          return true;
        }
        const constructor = value.constructor;
        return constructor == GeneratorFunction3 || constructor == AsyncGeneratorFunction3;
      }
      return false;
    };
    deepCopySymbol3 = Symbol.for("deepCopy");
    clonedFromSymbol3 = Symbol();
    getThis3 = Symbol();
    Object.getPrototypeOf(function() {
    })[getThis3] = function() {
      return this;
    };
    deepCopy3 = (value) => deepCopyInner3(value);
  }
});

// https://deno.land/x/elementalist@0.5.29/main/deno.js?code
var deno_exports = {};
__export(deno_exports, {
  Elemental: () => Elemental2,
  allTags: () => allTags2,
  combineClasses: () => combineClasses2,
  css: () => css3,
  default: () => deno_default,
  html: () => html2
});
function o(r2) {
  var p2, a, l, s, c = arguments, i = this, n = 0, d = [], h = 0, u = [], f = 0;
  d.root = true;
  var g = function(e2, o2, r3) {
    void 0 === o2 && (o2 = []);
    var p3 = 0;
    return (e2 = r3 || e2 !== t ? e2.replace(/\ue001/g, (e3) => u[f++]) : u[f++].slice(1, -1)) ? (e2.replace(/\ue000/g, (t2, r4) => (r4 && o2.push(e2.slice(p3, r4)), p3 = r4 + 1, o2.push(c[++h]))), p3 < e2.length && o2.push(e2.slice(p3)), o2.length > 1 ? o2 : o2[0]) : e2;
  }, m = () => {
    [d, s, ...p2] = d, d.push(i(s, ...p2));
  };
  return r2.join(e).replace(/<!--[^]*-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (e2) => (u.push(e2), t)).replace(/\s+/g, " ").replace(/(?:^|>)([^<]*)(?:$|<)/g, (e2, t2, r3, p3) => {
    var c2, i2;
    if (r3 && p3.slice(n, r3).replace(/(\S)\/$/, "$1 /").split(" ").map((e3, t3) => {
      if ("/" === e3[0]) c2 = i2 || e3.slice(1) || 1;
      else if (t3) {
        if (e3) {
          var r4 = d[2] || (d[2] = {});
          "..." === e3.slice(0, 3) ? Object.assign(r4, arguments[++h]) : ([a, l] = e3.split("="), r4[g(a)] = !l || g(l));
        }
      } else {
        for (i2 = g(e3); o.close[d[1] + i2]; ) m();
        d = [d, i2, null], o.empty[i2] && (c2 = i2);
      }
    }), c2) for (m(); s !== c2 && o.close[s]; ) m();
    n = r3 + e2.length, t2 && " " !== t2 && g((s = 0, t2), d, true);
  }), d.root || m(), d.length > 1 ? d : d[0];
}
function defaultErrorComponentFactory2({ children, ...properties2 }, key2, error) {
  const element = document.createElement("div");
  const errorDetails = document.createElement("code");
  const childContainer = document.createElement("div");
  element.setAttribute("style", `
        all:              unset;
        display:          flex;
        flex-direction:   column;
        padding:          1.5rem;
        background-color: #f5a5a8;
        color:            white;
        font-family:      -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size:        18px;
        font-weight:      400;
        overflow:         auto;
    `);
  element.innerHTML = `I'm sorry, there was an error when loading this part of the page 🙁 `;
  let errorElementPart;
  if (typeof key2 == "string") {
    errorElementPart = `<${key2} />`;
  } else {
    try {
      errorElementPart = `<${key2.prototype.constructor.name} />`;
    } catch (error2) {
      try {
        errorElementPart = `<${key2.name} />`;
      } catch (error3) {
        errorElementPart = `<${key2} />`;
      }
    }
  }
  let errorJsonObject = {};
  for (const [key3, value] of Object.entries(properties2)) {
    try {
      errorJsonObject[key3] = JSON.parse(JSON.stringify(value));
    } catch (error2) {
      errorJsonObject[key3] = `${value}`;
    }
  }
  errorDetails.innerHTML = `tag: ${errorElementPart}
properties: ${JSON.stringify(errorJsonObject, 0, 4)}
error: ${error}`;
  errorDetails.setAttribute("style", `
        padding: 1rem;
        background-color: #161b22;
        color: #789896;
        white-space: pre;
        max-width: 85vw;
        overflow: auto;
    `);
  element.appendChild(errorDetails);
  childContainer.setAttribute("style", `
        all: unset
        display: flex
        flex-direction: column
        margin-top: 1.3rem
    `);
  ElementalClass2.appendChildren(childContainer, children);
  element.appendChild(childContainer);
  return element;
}
var e, t, r, p, a, xhtm2, validStyleAttribute2, validNonCallbackHtmlAttributes2, isValidStyleAttribute2, kebabCase2, isConstructor2, attachProperties2, ElementalClass2, Elemental2, combineClasses2, html2, css3, allTags2, deno_default;
var init_deno = __esm({
  "https://deno.land/x/elementalist@0.5.29/main/deno.js?code"() {
    init_value();
    e = "";
    t = "";
    o.empty = {}, o.close = {}, "area base br col command embed hr img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((e2) => o.empty[e2] = o.empty[e2.toUpperCase()] = true);
    r = { li: "", dt: "dd", dd: "dt", p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table", rt: "rp", rp: "rt", optgroup: "", option: "optgroup", caption: "tbody thead tfoot tr colgroup", colgroup: "thead tbody tfoot tr caption", thead: "tbody tfoot caption", tbody: "tfoot caption", tfoot: "caption", tr: "tbody tfoot", td: "th tr", th: "td tr tbody" };
    p = function(e2) {
      [...r[e2].split(" "), e2].map((t2) => {
        o.close[e2] = o.close[e2.toUpperCase()] = o.close[e2 + t2] = o.close[e2.toUpperCase() + t2] = o.close[e2 + t2.toUpperCase()] = o.close[e2.toUpperCase() + t2.toUpperCase()] = true;
      });
    };
    for (a in r) p(a);
    xhtm2 = o;
    validStyleAttribute2 = Object.freeze(/* @__PURE__ */ new Set(["accent-color", "align-content", "align-items", "align-self", "align-tracks", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timeline", "animation-timing-function", "appearance", "ascent-override", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "bleed", "block-overflow", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "color", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cursor", "length", "angle", "descent-override", "direction", "display", "resolution", "empty-cells", "fallback", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex_value", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "frequency", "hanging-punctuation", "height", "hyphenate-character", "hyphens", "image-orientation", "image-rendering", "image-resolution", "inherit", "inherits", "initial", "initial-letter", "initial-letter-align", "initial-value", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "justify-tracks", "left", "letter-spacing", "line-break", "line-clamp", "line-gap-override", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-style", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "max-zoom", "min-block-size", "min-height", "min-inline-size", "min-width", "min-zoom", "mix-blend-mode", "time", "negative", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orientation", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "Pseudo-classes", "Pseudo-elements", "pad", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "prefix", "print-color-adjust", "quotes", "range", "resize", "revert", "right", "rotate", "row-gap", "ruby-align", "ruby-merge", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "size", "size-adjust", "speak-as", "src", "suffix", "symbols", "syntax", "system", "tab-size", "table-layout", "text-align", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "unicode-range", "unset", "user-select", "user-zoom", "vertical-align", "viewport-fit", "visibility", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"]));
    validNonCallbackHtmlAttributes2 = Object.freeze(/* @__PURE__ */ new Set(["class", "style", "value", "id", "contenteditable", "href", "hidden", "autofocus", "src", "name", "accept", "accesskey", "action", "align", "alt", "async", "autocomplete", "autoplay", "border", "charset", "checked", "cite", "cols", "colspan", "content", "controls", "coords", "data", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "for", "form", "formaction", "headers", "high", "hreflang", "http", "ismap", "kind", "label", "lang", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "multiple", "muted", "novalidate", "open", "optimum", "pattern", "placeholder", "poster", "preload", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "selected", "shape", "size", "sizes", "span", "spellcheck", "srcdoc", "srclang", "srcset", "start", "step", "tabindex", "target", "title", "translate", "type", "usemap", "wrap", "bgcolor", "width", "color", "height"]));
    isValidStyleAttribute2 = (key2) => key2.startsWith("-") || validStyleAttribute2.has(key2);
    kebabCase2 = (string) => string.replace(/[a-z]([A-Z])(?=[a-z])/g, (each) => `${each[0]}-${each.slice(1).toLowerCase()}`);
    isConstructor2 = (obj) => !!obj.prototype && !!obj.prototype.constructor.name;
    attachProperties2 = (source, target) => {
      const attributes = allKeyDescriptions3(source);
      const propertiesDefition = {};
      for (const [key2, value] of Object.entries(attributes)) {
        if (["constructor", "prototype", "length"].includes(key2)) {
          continue;
        }
        propertiesDefition[key2] = {
          get: () => source[key2]
        };
      }
      Object.defineProperties(target, propertiesDefition);
      return target;
    };
    ElementalClass2 = class _ElementalClass {
      constructor(components = {}, options = {}) {
        const { middleware: middleware2, errorComponentFactory } = options || {};
        this.components = components || {};
        this.middleware = middleware2 || {};
        this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory2;
        this.html = this.createElement;
        this.xhtm = xhtm2.bind((...args) => this.createElement(...args));
      }
      static debug = false;
      static allTags = Symbol.for("allTags");
      static exclusivelySvgElements = /* @__PURE__ */ new Set(["svg", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "tspan", "unknown", "use", "view"]);
      static randomId = (name) => `${name}${Math.random()}`.replace(".", "");
      static appendChildren = function(element, ...children) {
        for (const each of children) {
          if (typeof each == "string") {
            element.appendChild(new window.Text(each));
          } else if (each == null) {
            element.appendChild(new window.Text(""));
          } else if (!(each instanceof Object)) {
            element.appendChild(new window.Text(`${each}`));
          } else if (each instanceof Node) {
            element.appendChild(each);
          } else if (each instanceof Array) {
            _ElementalClass.appendChildren(element, ...each);
          } else if (each instanceof Function) {
            _ElementalClass.appendChildren(element, each());
          } else if (each instanceof Promise) {
            const elementPromise = each;
            const placeholder = elementPromise.placeholder || document.createElement("div");
            setTimeout(async () => placeholder.replaceWith(await elementPromise), 0);
            element.appendChild(placeholder);
          } else if (each != null && each instanceof Object) {
            element.appendChild(each);
          }
        }
        return element;
      };
      static css = function(first, ...args) {
        if (typeof first == "string") {
          return first;
        } else if (first == null) {
          return "";
        } else if (first instanceof Array) {
          const strings = first;
          const values = args;
          let finalString = "";
          for (const each of strings) {
            finalString += each;
            if (values.length > 0) {
              const value = values.shift();
              if (value instanceof Object) {
                finalString += Elemental2.css(value);
              } else {
                finalString += `${value}`;
              }
            }
          }
          return finalString;
        } else if (first instanceof Object) {
          let finalString = "";
          for (const [key2, value] of Object.entries(first)) {
            if (value != null) {
              finalString += `${kebabCase2(key2)}: ${value};`;
            }
          }
          return finalString;
        } else {
          return first;
        }
      };
      static combineClasses = (...classes) => {
        classes = classes.filter((each) => each != null);
        let classesFinalList = [];
        for (let eachEntry of classes) {
          if (typeof eachEntry == "string") {
            eachEntry = eachEntry.split(" ");
          }
          if (eachEntry instanceof Array) {
            eachEntry = eachEntry.flat(Infinity);
            for (let eachName of eachEntry) {
              classesFinalList.push(eachName);
            }
          } else if (eachEntry instanceof Object) {
            for (const [className, enabled] of Object.entries(eachEntry)) {
              if (enabled) {
                classesFinalList.push(className);
              }
            }
          }
        }
        return classesFinalList;
      };
      createElement(...args) {
        if (args[0] instanceof Array) {
          return this.xhtm(...args);
        } else {
          _ElementalClass.debug && console.debug(`args is:`, args);
          for (const middleware2 of (this.middleware[_ElementalClass.allTags] || []).concat(this.middleware[args[0]] || [])) {
            try {
              args = eachMiddleWare(args);
            } catch (error) {
              console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args);
            }
          }
          let [key2, properties2, ...children] = args;
          _ElementalClass.debug && console.debug(`key, properties, children is:`, key2, properties2, children);
          if (this.components[key2] instanceof Function) {
            key2 = this.components[key2];
          }
          if (key2 instanceof Function) {
            let output2;
            try {
              output2 = isConstructor2(key2) ? new key2({ ...properties2, children }) : key2({ ...properties2, children });
            } catch (error) {
              return this.errorComponentFactory({ ...properties2, children }, key2, error);
            }
            if (output2 instanceof Promise) {
              const elementPromise = output2;
              const placeholder = elementPromise.placeholder || document.createElement("div");
              setTimeout(async () => placeholder.replaceWith(await elementPromise), 0);
              return placeholder;
            } else {
              return output2;
            }
          }
          const isSvg = _ElementalClass.exclusivelySvgElements.has(key2);
          const element = isSvg ? document.createElementNS("http://www.w3.org/2000/svg", key2) : document.createElement(key2);
          let styleString = "";
          if (properties2 instanceof Object) {
            for (let [key3, value] of Object.entries(properties2)) {
              if (key3 == "style") {
                styleString += _ElementalClass.css(value);
                continue;
              }
              if (key3.slice(0, 2) == "on" && value instanceof Function) {
                element.addEventListener(key3.slice(2).toLowerCase(), value);
              }
              if (key3 == "class") {
                if (value instanceof Array) {
                  value = value.join(" ");
                } else if (value instanceof Object) {
                  let newValue = "";
                  for (const [classString, enable] of Object.entries(value)) {
                    if (enable) {
                      newValue += classString;
                    }
                  }
                  value = newValue;
                }
              }
              if (isSvg) {
                if (value instanceof Array) {
                  value = value.join(" ");
                }
                element.setAttribute(kebabCase2(key3), value);
                continue;
              }
              if (value != null && !(value instanceof Object) && validNonCallbackHtmlAttributes2.has(key3)) {
                element.setAttribute(key3, value);
              }
              try {
                element[key3] = value;
              } catch (error) {
              }
              if (isValidStyleAttribute2(key3)) {
                styleString += `;${key3}: ${value};`;
              }
            }
          }
          if (styleString) {
            element.setAttribute("style", styleString);
          }
          return _ElementalClass.appendChildren(element, ...children);
        }
      }
      extend(additionalComponents = {}, options = {}) {
        const { middleware: middleware2, ...other } = options || {};
        return Elemental2(
          { ...this.components, ...additionalComponents },
          {
            middleware: { ...this.middleware, ...middleware2 },
            ...other
          }
        );
      }
    };
    Elemental2 = (...args) => {
      const elementalObject = new ElementalClass2(...args);
      const createElementFunction = elementalObject.createElement.bind(elementalObject);
      attachProperties2(ElementalClass2, createElementFunction);
      attachProperties2(elementalObject, createElementFunction);
      return createElementFunction;
    };
    attachProperties2(ElementalClass2, Elemental2);
    try {
      const originalHead = document.head;
      Object.defineProperty(document, "head", {
        set: (element) => ElementalClass2.appendChildren(originalHead, ...element.childNodes),
        get: () => originalHead,
        writable: true
      });
    } catch (error) {
    }
    combineClasses2 = ElementalClass2.combineClasses;
    html2 = Elemental2();
    css3 = ElementalClass2.css;
    allTags2 = ElementalClass2.allTags;
    deno_default = {
      Elemental: Elemental2,
      html: html2,
      css: css3,
      allTags: allTags2,
      combineClasses: combineClasses2
    };
  }
});

// https://deno.land/x/good@1.4.4.3/value.js
var typedArrayClasses = [
  Uint16Array,
  Uint32Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Int32Array,
  Int8Array,
  Float32Array,
  Float64Array,
  globalThis.BigInt64Array,
  globalThis.BigUint64Array
].filter((each) => each);
var copyableClasses = /* @__PURE__ */ new Set([RegExp, Date, URL, ...typedArrayClasses, globalThis.ArrayBuffer, globalThis.DataView]);
var IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
var ArrayIterator = Object.getPrototypeOf([][Symbol.iterator]);
var MapIterator = Object.getPrototypeOf((/* @__PURE__ */ new Map())[Symbol.iterator]);
var SetIterator = Object.getPrototypeOf((/* @__PURE__ */ new Set())[Symbol.iterator]);
var AsyncFunction = class {
};
var GeneratorFunction = class {
};
var AsyncGeneratorFunction = class {
};
var SyncGenerator = class {
};
var AsyncGenerator = class {
};
try {
  AsyncFunction = eval("(async function(){}).constructor");
  GeneratorFunction = eval("(function*(){}).constructor");
  AsyncGeneratorFunction = eval("(async function*(){}).constructor");
  SyncGenerator = eval("((function*(){})()).constructor");
  AsyncGenerator = eval("((async function*(){})()).constructor");
} catch (error) {
}
var isPrimitive = (value) => !(value instanceof Object);
var isPureObject = (value) => value instanceof Object && Object.getPrototypeOf(value).constructor == Object;
var isPracticallyPrimitive = (value) => isPrimitive(value) || value instanceof Date || value instanceof RegExp || value instanceof URL;
var isBuiltInIterator = (value) => IteratorPrototype.isPrototypeOf(value);
var isGeneratorType = (value) => {
  if (value instanceof Object) {
    if (isBuiltInIterator(value)) {
      return true;
    }
    const constructor = value.constructor;
    return constructor == SyncGenerator || constructor == AsyncGenerator;
  }
  return false;
};
var isAsyncIterable = function(value) {
  return value && typeof value[Symbol.asyncIterator] === "function";
};
var isSyncIterable = function(value) {
  return value && typeof value[Symbol.iterator] === "function";
};
var isIterableObjectOrContainer = function(value) {
  return value instanceof Object && (typeof value[Symbol.iterator] == "function" || typeof value[Symbol.asyncIterator] === "function");
};
var isTechnicallyIterable = function(value) {
  return value instanceof Object || typeof value == "string";
};
var isSyncIterableObjectOrContainer = function(value) {
  return value instanceof Object && typeof value[Symbol.iterator] == "function";
};
var deepCopySymbol = Symbol.for("deepCopy");
var clonedFromSymbol = Symbol();
var getThis = Symbol();
Object.getPrototypeOf(function() {
})[getThis] = function() {
  return this;
};
function deepCopyInner(value, valueChain = [], originalToCopyMap = /* @__PURE__ */ new Map()) {
  valueChain.push(value);
  if (value == null) {
    return value;
  }
  if (!(value instanceof Object)) {
    return value;
  }
  if (originalToCopyMap.has(value)) {
    return originalToCopyMap.get(value);
  }
  if (value[deepCopySymbol] instanceof Function) {
    const clonedValue = value[deepCopySymbol](originalToCopyMap);
    originalToCopyMap.set(value, clonedValue);
    return clonedValue;
  }
  if (isGeneratorType(value)) {
    throw Error(`Sadly built-in generators cannot be deep copied.
And I found a generator along this path:
${valueChain.reverse().map((each) => `${each},
`)}`);
  }
  let object, theThis, thisCopy;
  if (value instanceof Date) {
    object = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    object = new RegExp(value);
  } else if (value instanceof URL) {
    object = new URL(value);
  } else if (value instanceof Function) {
    theThis = value[getThis]();
    object = value.bind(theThis);
  } else if (copyableClasses.has(value.constructor)) {
    object = new value.constructor(value);
  } else if (value instanceof Array) {
    object = [];
  } else if (value instanceof Set) {
    object = /* @__PURE__ */ new Set();
  } else if (value instanceof Map) {
    object = /* @__PURE__ */ new Map();
  }
  originalToCopyMap.set(value, object);
  if (object instanceof Function) {
    thisCopy = deepCopyInner(theThis, valueChain, originalToCopyMap);
    object = object.bind(thisCopy);
  }
  const output2 = object;
  try {
    output2.constructor = value.constructor;
  } catch (error) {
  }
  Object.setPrototypeOf(output2, Object.getPrototypeOf(value));
  const propertyDefinitions = {};
  for (const [key2, description] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    const { value: value2, get, set, ...options } = description;
    const getIsFunc = get instanceof Function;
    const setIsFunc = set instanceof Function;
    if (getIsFunc || setIsFunc) {
      propertyDefinitions[key2] = {
        ...options,
        get: get ? function(...args) {
          return get.apply(output2, args);
        } : void 0,
        set: set ? function(...args) {
          return set.apply(output2, args);
        } : void 0
      };
    } else {
      if (key2 == "length" && output2 instanceof Array) {
        continue;
      }
      propertyDefinitions[key2] = {
        ...options,
        value: deepCopyInner(value2, valueChain, originalToCopyMap)
      };
    }
  }
  Object.defineProperties(output2, propertyDefinitions);
  return output2;
}
var deepCopy = (value) => deepCopyInner(value);
var shallowSortObject = (obj) => {
  return Object.keys(obj).sort().reduce(
    (newObj, key2) => {
      newObj[key2] = obj[key2];
      return newObj;
    },
    {}
  );
};
var deepSortObject = (obj, seen = /* @__PURE__ */ new Map()) => {
  if (!(obj instanceof Object)) {
    return obj;
  } else if (seen.has(obj)) {
    return seen.get(obj);
  } else {
    if (obj instanceof Array) {
      const sortedChildren = [];
      seen.set(obj, sortedChildren);
      for (const each of obj) {
        sortedChildren.push(deepSortObject(each, seen));
      }
      return sortedChildren;
    } else {
      const sorted = {};
      seen.set(obj, sorted);
      for (const eachKey of Object.keys(obj).sort()) {
        sorted[eachKey] = deepSortObject(obj[eachKey], seen);
      }
      return sorted;
    }
  }
};
var stableStringify = (value, ...args) => {
  return JSON.stringify(deepSortObject(value), ...args);
};
var allKeys = function(obj) {
  let keys = [];
  if (obj == null) {
    return [];
  }
  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }
  while (obj) {
    keys = keys.concat(Reflect.ownKeys(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return keys;
};
var ownKeyDescriptions = Object.getOwnPropertyDescriptors;
var allKeyDescriptions = function(value, options = { includingBuiltin: false }) {
  var { includingBuiltin } = { ...options };
  let descriptions = [];
  if (value == null) {
    return {};
  }
  if (!(value instanceof Object)) {
    value = Object.getPrototypeOf(value);
  }
  const rootPrototype = Object.getPrototypeOf({});
  let prevObj;
  while (value && value != prevObj) {
    if (!includingBuiltin && value == rootPrototype) {
      break;
    }
    descriptions = descriptions.concat(Object.entries(Object.getOwnPropertyDescriptors(value)));
    prevObj = value;
    value = Object.getPrototypeOf(value);
  }
  descriptions.reverse();
  return Object.fromEntries(descriptions);
};

// https://deno.land/x/good@1.4.4.3/async.js
var objectPrototype = Object.getPrototypeOf({});

// https://deno.land/x/good@1.4.4.3/iterable.js
var emptyIterator = function* () {
}();
var makeIterable = (object) => {
  if (object == null) {
    return emptyIterator;
  }
  if (object[Symbol.iterator] instanceof Function || object[Symbol.asyncIterator] instanceof Function) {
    return object;
  }
  if (Object.getPrototypeOf(object).constructor == Object) {
    return Object.entries(object);
  }
  return emptyIterator;
};
var Stop = Symbol("iterationStop");
var iter = (object) => {
  const iterable = makeIterable(object);
  if (iterable[Symbol.asyncIterator]) {
    return iterable[Symbol.asyncIterator]();
  } else {
    return iterable[Symbol.iterator]();
  }
};
async function asyncIteratorToList(asyncIterator) {
  const results = [];
  for await (const each of asyncIterator) {
    results.push(each);
  }
  return results;
}
var zip = function* (...iterables) {
  iterables = iterables.map((each) => iter(each));
  while (true) {
    const nexts = iterables.map((each) => each.next());
    if (nexts.every((each) => each.done)) {
      break;
    }
    yield nexts.map((each) => each.value);
  }
};
var ERROR_WHILE_MAPPING_MESSAGE = "Threw while mapping.";
function concurrentlyTransform({ iterator, transformFunction, poolLimit = null, awaitAll = false }) {
  poolLimit = poolLimit || concurrentlyTransform.defaultPoolLimit;
  const res = new TransformStream({
    async transform(p2, controller) {
      try {
        const s = await p2;
        controller.enqueue(s);
      } catch (e2) {
        if (e2 instanceof AggregateError && e2.message == ERROR_WHILE_MAPPING_MESSAGE) {
          controller.error(e2);
        }
      }
    }
  });
  const mainPromise = (async () => {
    const writer = res.writable.getWriter();
    const executing = [];
    try {
      let index = 0;
      for await (const item of iterator) {
        const p2 = Promise.resolve().then(() => transformFunction(item, index));
        index++;
        writer.write(p2);
        const e2 = p2.then(() => executing.splice(executing.indexOf(e2), 1));
        executing.push(e2);
        if (executing.length >= poolLimit) {
          await Promise.race(executing);
        }
      }
      await Promise.all(executing);
      writer.close();
    } catch {
      const errors = [];
      for (const result of await Promise.allSettled(executing)) {
        if (result.status == "rejected") {
          errors.push(result.reason);
        }
      }
      writer.write(Promise.reject(
        new AggregateError(errors, ERROR_WHILE_MAPPING_MESSAGE)
      )).catch(() => {
      });
    }
  })();
  const asyncIterator = res.readable[Symbol.asyncIterator]();
  if (!awaitAll) {
    return asyncIterator;
  } else {
    return mainPromise.then(() => asyncIteratorToList(asyncIterator));
  }
}
concurrentlyTransform.defaultPoolLimit = 40;

// https://deno.land/x/good@1.4.4.3/string.js
var indent = ({ string, by = "    ", noLead = false }) => (noLead ? "" : by) + string.replace(/\n/g, "\n" + by);
var toString = (value) => {
  if (typeof value == "symbol") {
    return toRepresentation(value);
  } else if (!(value instanceof Object)) {
    return value != null ? value.toString() : `${value}`;
  } else {
    return toRepresentation(value);
  }
};
var reprSymbol = Symbol.for("representation");
var denoInspectSymbol = Symbol.for("Deno.customInspect");
var toRepresentation = (item) => {
  const alreadySeen = /* @__PURE__ */ new Set();
  const recursionWrapper = (item2) => {
    if (item2 instanceof Object) {
      if (alreadySeen.has(item2)) {
        return `[Self Reference]`;
      } else {
        alreadySeen.add(item2);
      }
    }
    let output2;
    if (item2 === void 0) {
      output2 = "undefined";
    } else if (item2 === null) {
      output2 = "null";
    } else if (typeof item2 == "string") {
      output2 = JSON.stringify(item2);
    } else if (typeof item2 == "symbol") {
      if (!item2.description) {
        output2 = "Symbol()";
      } else {
        const globalVersion = Symbol.for(item2.description);
        if (globalVersion == item2) {
          output2 = `Symbol.for(${JSON.stringify(item2.description)})`;
        } else {
          output2 = `Symbol(${JSON.stringify(item2.description)})`;
        }
      }
    } else if (item2 instanceof Date) {
      output2 = `new Date(${item2.getTime()})`;
    } else if (item2 instanceof Array) {
      output2 = `[${item2.map((each) => recursionWrapper(each)).join(",")}]`;
    } else if (item2 instanceof Set) {
      output2 = `new Set(${[...item2].map((each) => recursionWrapper(each)).join(",")})`;
    } else if (item2 instanceof Object && item2.constructor == Object) {
      output2 = pureObjectRepr(item2);
    } else if (item2 instanceof Map) {
      let string = "new Map(";
      for (const [key2, value] of item2.entries()) {
        const stringKey = recursionWrapper(key2);
        const stringValue = recursionWrapper(value);
        if (!stringKey.match(/\n/g)) {
          string += `
  [${stringKey}, ${indent({ string: stringValue, by: "  ", noLead: true })}],`;
        } else {
          string += `
  [${indent({ string: stringKey, by: "  ", noLead: true })},
  ${indent({ string: stringValue, by: "    ", noLead: true })}],`;
        }
      }
      string += "\n)";
      output2 = string;
    } else {
      if (item2[reprSymbol] instanceof Function) {
        try {
          output2 = item2[reprSymbol]();
          return output2;
        } catch (error) {
        }
      }
      if (item2[denoInspectSymbol] instanceof Function) {
        try {
          output2 = item2[denoInspectSymbol]();
          return output2;
        } catch (error) {
        }
      }
      try {
        output2 = item2.toString();
        if (output2 !== "[object Object]") {
          return output2;
        }
      } catch (error) {
      }
      try {
        if (item2.constructor instanceof Function && item2.prototype && typeof item2.name == "string") {
          output2 = `class ${item2.name} { /*...*/ }`;
          return output2;
        }
      } catch (error) {
      }
      try {
        if (item2.constructor instanceof Function && typeof item2.constructor.name == "string") {
          output2 = `new ${item2.constructor.name}(${pureObjectRepr(item2)})`;
          return output2;
        }
      } catch (error) {
      }
      return pureObjectRepr(item2);
    }
    return output2;
  };
  const pureObjectRepr = (item2) => {
    let string = "{";
    for (const [key2, value] of Object.entries(item2)) {
      const stringKey = recursionWrapper(key2);
      const stringValue = recursionWrapper(value);
      string += `
  ${stringKey}: ${indent({ string: stringValue, by: "  ", noLead: true })},`;
    }
    string += "\n}";
    return string;
  };
  return recursionWrapper(item);
};
var reservedCharMap = {
  "&": "\\x26",
  "!": "\\x21",
  "#": "\\x23",
  "$": "\\$",
  "%": "\\x25",
  "*": "\\*",
  "+": "\\+",
  ",": "\\x2c",
  ".": "\\.",
  ":": "\\x3a",
  ";": "\\x3b",
  "<": "\\x3c",
  "=": "\\x3d",
  ">": "\\x3e",
  "?": "\\?",
  "@": "\\x40",
  "^": "\\^",
  "`": "\\x60",
  "~": "\\x7e",
  "(": "\\(",
  ")": "\\)",
  "[": "\\[",
  "]": "\\]",
  "{": "\\{",
  "}": "\\}",
  "/": "\\/",
  "-": "\\x2d",
  "\\": "\\\\",
  "|": "\\|"
};
var RX_REGEXP_ESCAPE = new RegExp(
  `[${Object.values(reservedCharMap).join("")}]`,
  "gu"
);
function escapeRegexMatch(str) {
  return str.replaceAll(
    RX_REGEXP_ESCAPE,
    (m) => reservedCharMap[m]
  );
}
var regexpProxy = Symbol("regexpProxy");
var realExec = RegExp.prototype.exec;
RegExp.prototype.exec = function(...args) {
  if (this[regexpProxy]) {
    return realExec.apply(this[regexpProxy], args);
  }
  return realExec.apply(this, args);
};
var proxyRegExp;
var regexProxyOptions = Object.freeze({
  get(original, key2) {
    if (typeof key2 == "string" && key2.match(/^[igmusyv]+$/)) {
      return proxyRegExp(original, key2);
    }
    if (key2 == regexpProxy) {
      return original;
    }
    return original[key2];
  },
  set(original, key2, value) {
    original[key2] = value;
    return true;
  }
});
proxyRegExp = (parent, flags) => {
  const regex2 = new RegExp(parent, flags);
  const output2 = new Proxy(regex2, regexProxyOptions);
  Object.setPrototypeOf(output2, Object.getPrototypeOf(regex2));
  return output2;
};
function regexWithStripWarning(shouldStrip) {
  return (strings, ...values) => {
    let newRegexString = "";
    for (const [string, value] of zip(strings, values)) {
      newRegexString += string;
      if (value instanceof RegExp) {
        if (!shouldStrip && value.flags.replace(/g/, "").length > 0) {
          console.warn(`Warning: flags inside of regex:
    The RegExp trigging this warning is: ${value}
    When calling the regex interpolater (e.g. regex\`something\${stuff}\`)
    one of the \${} values (the one above) was a RegExp with a flag enabled
    e.g. /stuff/i  <- i = ignoreCase flag enabled
    When the /stuff/i gets interpolated, its going to loose its flags
    (thats what I'm warning you about)
    
    To disable/ignore this warning do:
        regex.stripFlags\`something\${/stuff/i}\`
    If you want to add flags to the output of regex\`something\${stuff}\` do:
        regex\`something\${stuff}\`.i   // ignoreCase
        regex\`something\${stuff}\`.ig  // ignoreCase and global
        regex\`something\${stuff}\`.gi  // functionally equivlent
`);
        }
        newRegexString += `(?:${value.source})`;
      } else if (value != null) {
        newRegexString += escapeRegexMatch(toString(value));
      }
    }
    return proxyRegExp(newRegexString, "");
  };
}
var regex = regexWithStripWarning(false);
regex.stripFlags = regexWithStripWarning(true);
var textDecoder = new TextDecoder("utf-8");
var textEncoder = new TextEncoder("utf-8");
var utf8BytesToString = textDecoder.decode.bind(textDecoder);
var stringToUtf8Bytes = textEncoder.encode.bind(textEncoder);

// https://deno.land/x/good@0.7.8/value.js
var primitiveArrayClasses = [Uint16Array, Uint32Array, Uint8Array, Uint8ClampedArray, Int16Array, Int32Array, Int8Array, Float32Array, Float64Array, globalThis.BigInt64Array, globalThis.BigUint64Array].filter((each) => each);
var allKeys2 = function(obj) {
  let keys = [];
  if (obj == null) {
    return [];
  }
  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }
  while (obj) {
    keys = keys.concat(Reflect.ownKeys(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return keys;
};
var ownKeyDescriptions2 = Object.getOwnPropertyDescriptors;
var allKeyDescriptions2 = function(value, options = { includingBuiltin: false }) {
  var { includingBuiltin } = { ...options };
  let descriptions = [];
  if (value == null) {
    return {};
  }
  if (!(value instanceof Object)) {
    value = Object.getPrototypeOf(value);
  }
  const rootPrototype = Object.getPrototypeOf({});
  let prevObj;
  while (value && value != prevObj) {
    if (!includingBuiltin && value == rootPrototype) {
      break;
    }
    descriptions = descriptions.concat(Object.entries(Object.getOwnPropertyDescriptors(value)));
    prevObj = value;
    value = Object.getPrototypeOf(value);
  }
  descriptions.reverse();
  return Object.fromEntries(descriptions);
};
var MapIterator2 = Object.getPrototypeOf((/* @__PURE__ */ new Map()).keys());
var SetIterator2 = Object.getPrototypeOf((/* @__PURE__ */ new Set()).keys());
var GeneratorFunction2 = class {
};
var AsyncGeneratorFunction2 = class {
};
try {
  GeneratorFunction2 = eval("((function*(){})()).constructor");
  AsyncGeneratorFunction2 = eval("((async function*(){})()).constructor");
} catch (error) {
}
var isGeneratorType2 = (value) => {
  if (value instanceof Object) {
    const prototype = Object.getPrototypeOf(value);
    if (prototype == MapIterator2 || prototype == SetIterator2) {
      return true;
    }
    const constructor = value.constructor;
    return constructor == GeneratorFunction2 || constructor == AsyncGeneratorFunction2;
  }
  return false;
};
var deepCopySymbol2 = Symbol.for("deepCopy");
var clonedFromSymbol2 = Symbol();
var getThis2 = Symbol();
Object.getPrototypeOf(function() {
})[getThis2] = function() {
  return this;
};
function deepCopyInner2(value, valueChain = [], originalToCopyMap = /* @__PURE__ */ new Map()) {
  valueChain.push(value);
  if (value == null) {
    return value;
  }
  if (!(value instanceof Object)) {
    return value;
  }
  if (originalToCopyMap.has(value)) {
    return originalToCopyMap.get(value);
  }
  if (value[deepCopySymbol2] instanceof Function) {
    const clonedValue = value[deepCopySymbol2]();
    originalToCopyMap.set(value, clonedValue);
    return clonedValue;
  }
  if (isGeneratorType2(value)) {
    throw Error(`Sadly built-in generators cannot be deep copied.
And I found a generator along this path:
${valueChain.reverse().map((each) => `${each},
`)}`);
  }
  let object, theThis, thisCopy;
  if (value instanceof Date) {
    object = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    object = new RegExp(value);
  } else if (value instanceof Function) {
    theThis = value[getThis2]();
    object = function(...args) {
      return value.apply(thisCopy, args);
    };
  } else if (primitiveArrayClasses.includes(value.constructor)) {
    object = new value.constructor([...value]);
  } else if (value instanceof Array) {
    object = [];
  } else if (value instanceof Set) {
    object = /* @__PURE__ */ new Set();
  } else if (value instanceof Map) {
    object = /* @__PURE__ */ new Map();
  }
  originalToCopyMap.set(value, object);
  if (object instanceof Function) {
    thisCopy = deepCopyInner2(theThis, valueChain, originalToCopyMap);
  }
  const output2 = object;
  try {
    output2.constructor = value.constructor;
  } catch (error) {
  }
  Object.setPrototypeOf(output2, Object.getPrototypeOf(value));
  const propertyDefinitions = {};
  for (const [key2, description] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    const { value: value2, get, set, ...options } = description;
    const getIsFunc = get instanceof Function;
    const setIsFunc = set instanceof Function;
    if (getIsFunc || setIsFunc) {
      propertyDefinitions[key2] = {
        ...options,
        get: get ? function(...args) {
          return get.apply(output2, args);
        } : void 0,
        set: set ? function(...args) {
          return set.apply(output2, args);
        } : void 0
      };
    } else {
      if (key2 == "length" && output2 instanceof Array) {
        continue;
      }
      propertyDefinitions[key2] = {
        ...options,
        value: deepCopyInner2(value2, valueChain, originalToCopyMap)
      };
    }
  }
  Object.defineProperties(output2, propertyDefinitions);
  return output2;
}
var deepCopy2 = (value) => deepCopyInner2(value);
var shallowSortObject2 = (obj) => {
  return Object.keys(obj).sort().reduce(
    (newObj, key2) => {
      newObj[key2] = obj[key2];
      return newObj;
    },
    {}
  );
};
var deepSortObject2 = (obj, seen = /* @__PURE__ */ new Map()) => {
  if (!(obj instanceof Object)) {
    return obj;
  } else if (seen.has(obj)) {
    return seen.get(obj);
  } else {
    if (obj instanceof Array) {
      const sortedChildren = [];
      seen.set(obj, sortedChildren);
      for (const each of obj) {
        sortedChildren.push(deepSortObject2(each, seen));
      }
      return sortedChildren;
    } else {
      const sorted = {};
      seen.set(obj, sorted);
      for (const eachKey of Object.keys(obj).sort()) {
        sorted[eachKey] = deepSortObject2(obj[eachKey], seen);
      }
      return sorted;
    }
  }
};
var stableStringify2 = (value, ...args) => {
  return JSON.stringify(deepSortObject2(value), ...args);
};

// https://deno.land/x/elementalist@0.5.35/main/deno.js?code
var FIELD = "";
var QUOTES = "";
function htm(statics) {
  let h = this, prev2 = 0, current = [null], field = 0, args, name, value, quotes = [], quote = 0, last, level = 0, pre = false;
  const evaluate = (str2, parts = [], raw) => {
    let i = 0;
    str2 = !raw && str2 === QUOTES ? quotes[quote++].slice(1, -1) : str2.replace(/\ue001/g, (m) => quotes[quote++]);
    if (!str2) return str2;
    str2.replace(/\ue000/g, (match2, idx) => {
      if (idx) parts.push(str2.slice(i, idx));
      i = idx + 1;
      return parts.push(arguments[++field]);
    });
    if (i < str2.length) parts.push(str2.slice(i));
    return parts.length > 1 ? parts : parts[0];
  };
  const up = () => {
    ;
    [current, last, ...args] = current;
    current.push(h(last, ...args));
    if (pre === level--) pre = false;
  };
  let str = statics.join(FIELD).replace(/<!--[^]*?-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (match2) => (quotes.push(match2), QUOTES));
  str.replace(/(?:^|>)((?:[^<]|<[^\w\ue000\/?!>])*)(?:$|<)/g, (match2, text, idx, str2) => {
    let tag, close2;
    if (idx) {
      str2.slice(prev2, idx).replace(/(\S)\/$/, "$1 /").split(/\s+/).map((part, i) => {
        if (part[0] === "/") {
          part = part.slice(1);
          if (EMPTY[part]) return;
          close2 = tag || part || 1;
        } else if (!i) {
          tag = evaluate(part);
          if (typeof tag === "string") {
            while (CLOSE[current[1] + tag]) up();
          }
          current = [current, tag, null];
          level++;
          if (!pre && PRE[tag]) pre = level;
          if (EMPTY[tag]) close2 = tag;
        } else if (part) {
          let props = current[2] || (current[2] = {});
          if (part.slice(0, 3) === "...") {
            Object.assign(props, arguments[++field]);
          } else {
            ;
            [name, value] = part.split("=");
            Array.isArray(value = props[evaluate(name)] = value ? evaluate(value) : true) && // if prop value is array - make sure it serializes as string without csv
            (value.toString = value.join.bind(value, ""));
          }
        }
      });
    }
    if (close2) {
      if (!current[0]) err(`Wrong close tag \`${close2}\``);
      up();
      while (last !== close2 && CLOSE[last]) up();
    }
    prev2 = idx + match2.length;
    if (!pre) text = text.replace(/\s*\n\s*/g, "").replace(/\s+/g, " ");
    if (text) evaluate((last = 0, text), current, true);
  });
  if (current[0] && CLOSE[current[1]]) up();
  if (level) err(`Unclosed \`${current[1]}\`.`);
  return current.length < 3 ? current[1] : (current.shift(), current);
}
var err = (msg) => {
  throw SyntaxError(msg);
};
var EMPTY = htm.empty = {};
var CLOSE = htm.close = {};
var PRE = htm.pre = {};
"area base basefont bgsound br col command embed frame hr image img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((v) => htm.empty[v] = true);
var close = {
  li: "",
  dt: "dd",
  dd: "dt",
  p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table",
  rt: "rp",
  rp: "rt",
  optgroup: "",
  option: "optgroup",
  caption: "tbody thead tfoot tr colgroup",
  colgroup: "thead tbody tfoot tr caption",
  thead: "tbody tfoot caption",
  tbody: "tfoot caption",
  tfoot: "caption",
  tr: "tbody tfoot",
  td: "th tr",
  th: "td tr tbody"
};
for (let tag in close) {
  for (let closer of [...close[tag].split(" "), tag]) htm.close[tag] = htm.close[tag + closer] = true;
}
"pre textarea".split(" ").map((v) => htm.pre[v] = true);
var xhtm = htm;
var validStyleAttribute = Object.freeze(/* @__PURE__ */ new Set(["accent-color", "align-content", "align-items", "align-self", "align-tracks", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timeline", "animation-timing-function", "appearance", "ascent-override", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "bleed", "block-overflow", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "color", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cursor", "length", "angle", "descent-override", "direction", "display", "resolution", "empty-cells", "fallback", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex_value", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "frequency", "hanging-punctuation", "height", "hyphenate-character", "hyphens", "image-orientation", "image-rendering", "image-resolution", "inherit", "inherits", "initial", "initial-letter", "initial-letter-align", "initial-value", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "justify-tracks", "left", "letter-spacing", "line-break", "line-clamp", "line-gap-override", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-style", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "max-zoom", "min-block-size", "min-height", "min-inline-size", "min-width", "min-zoom", "mix-blend-mode", "time", "negative", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orientation", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "Pseudo-classes", "Pseudo-elements", "pad", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "prefix", "print-color-adjust", "quotes", "range", "resize", "revert", "right", "rotate", "row-gap", "ruby-align", "ruby-merge", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "size", "size-adjust", "speak-as", "src", "suffix", "symbols", "syntax", "system", "tab-size", "table-layout", "text-align", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "unicode-range", "unset", "user-select", "user-zoom", "vertical-align", "viewport-fit", "visibility", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"]));
var validNonCallbackHtmlAttributes = Object.freeze(/* @__PURE__ */ new Set(["class", "style", "value", "id", "contenteditable", "href", "hidden", "autofocus", "src", "name", "accept", "accesskey", "action", "align", "alt", "async", "autocomplete", "autoplay", "border", "charset", "checked", "cite", "cols", "colspan", "content", "controls", "coords", "data", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "for", "form", "formaction", "headers", "high", "hreflang", "http", "ismap", "kind", "label", "lang", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "multiple", "muted", "novalidate", "open", "optimum", "pattern", "placeholder", "poster", "preload", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "selected", "shape", "size", "sizes", "span", "spellcheck", "srcdoc", "srclang", "srcset", "start", "step", "tabindex", "target", "title", "translate", "type", "usemap", "wrap", "bgcolor", "width", "color", "height"]));
var isValidStyleAttribute = (key2) => key2.startsWith("-") || validStyleAttribute.has(key2);
var kebabCase = (string) => string.replace(/[a-z]([A-Z])(?=[a-z])/g, (each) => `${each[0]}-${each.slice(1).toLowerCase()}`);
var isConstructor = (obj) => !!obj.prototype && !!obj.prototype.constructor.name;
var attachProperties = (source, target) => {
  const attributes = allKeyDescriptions2(source);
  const propertiesDefition = {};
  for (const [key2, value] of Object.entries(attributes)) {
    if (["constructor", "prototype", "length"].includes(key2)) {
      continue;
    }
    propertiesDefition[key2] = {
      get: () => source[key2]
    };
  }
  Object.defineProperties(target, propertiesDefition);
  return target;
};
var toHtmlElement = Symbol.for("toHtmlElement");
var ElementalClass = class _ElementalClass {
  constructor(components = {}, options = {}) {
    const { middleware: middleware2, errorComponentFactory, defaultPlaceholderFactory } = options || {};
    this.components = components || {};
    this.middleware = middleware2 || {};
    this.defaultPlaceholderFactory = defaultPlaceholderFactory || (() => document.createElement("div"));
    this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory;
    this.html = this.createElement.bind(this);
    this.xhtm = xhtm.bind((...args) => this.createElement(...args));
  }
  static debug = false;
  static allTags = Symbol.for("allTags");
  static exclusivelySvgElements = /* @__PURE__ */ new Set(["svg", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "tspan", "unknown", "use", "view"]);
  static randomId = (name) => `${name}${Math.random()}`.replace(".", "");
  static makeHtmlElement = function(element) {
    if (element instanceof Node || element instanceof Element || element instanceof HTMLDocument) {
      return element;
    } else {
      if (element == null) {
        return new window.Text("");
      } else if (typeof element == "string") {
        return new window.Text(element);
      } else if (typeof element == "symbol") {
        return new window.Text(element.toString());
      } else if (!(element instanceof Object)) {
        return new window.Text(`${element}`);
      } else if (element[toHtmlElement] != null) {
        return _ElementalClass.makeHtmlElement(element[toHtmlElement]);
      } else {
        throw Error(`Cannot coerce ${element} into an html element`);
      }
    }
  };
  static appendChildren = function(element, ...children) {
    const { element: altElement, insertBefore } = element;
    let primitiveAppend = (child) => element.appendChild(child);
    if (insertBefore && !(insertBefore instanceof Function)) {
      element = altElement;
      primitiveAppend = (child) => element.insertBefore(insertBefore, child);
    }
    for (const each of children) {
      if (each instanceof Array) {
        _ElementalClass.appendChildren(element, ...each);
      } else if (each instanceof Function) {
        _ElementalClass.appendChildren(element, each());
      } else if (each instanceof Promise) {
        const elementPromise = each;
        const placeholder = elementPromise.placeholder || document.createElement("div");
        primitiveAppend(placeholder);
        setTimeout(async () => {
          try {
            const result = await elementPromise;
            if (!(result instanceof Array)) {
              const htmlElement = _ElementalClass.makeHtmlElement(result);
              placeholder.replaceWith(htmlElement);
            } else {
              let parentElement = placeholder.parentElement;
              if (!parentElement) {
                parentElement = await new Promise((resolve, reject) => {
                  let intervalId = setInterval(() => {
                    if (placeholder.parentElement) {
                      resolve(placeholder.parentElement);
                      clearInterval(intervalId);
                    }
                  }, 70);
                });
              }
              for (const each2 of result) {
                try {
                  _ElementalClass.appendChildren({
                    element: parentElement,
                    insertBefore: placeholder
                  }, each2);
                } catch (error) {
                  parentElement.insertBefore(placeholder, createErrorElement(`When async component ${toString(element)} resolved, it created an array. One of those elements in the array caused an error when it tried to be added as a child:
 ${toString(error)}`));
                }
              }
            }
          } catch (error) {
            placeholder.replaceWith(
              defaultErrorComponentFactory({ ...properties, children }, key, error)
            );
          }
        }, 0);
      } else {
        primitiveAppend(_ElementalClass.makeHtmlElement(each));
      }
    }
    return element;
  };
  static css = function(first, ...args) {
    if (typeof first == "string") {
      return first;
    } else if (first == null) {
      return "";
    } else if (first instanceof Array) {
      const strings = first;
      const values = args;
      let finalString = "";
      for (const each of strings) {
        finalString += each;
        if (values.length > 0) {
          const value = values.shift();
          if (value instanceof Object) {
            finalString += Elemental.css(value);
          } else {
            finalString += `${value}`;
          }
        }
      }
      return finalString;
    } else if (first instanceof Object) {
      let finalString = "";
      for (const [key2, value] of Object.entries(first)) {
        if (value != null) {
          finalString += `${kebabCase(key2)}: ${value};`;
        }
      }
      return finalString;
    } else {
      return first;
    }
  };
  static combineClasses = (...classes) => {
    classes = classes.filter((each) => each != null);
    let classesFinalList = [];
    for (let eachEntry of classes) {
      if (typeof eachEntry == "string") {
        eachEntry = eachEntry.split(" ");
      }
      if (eachEntry instanceof Array) {
        eachEntry = eachEntry.flat(Infinity);
        for (let eachName of eachEntry) {
          classesFinalList.push(eachName);
        }
      } else if (eachEntry instanceof Object) {
        for (const [className, enabled] of Object.entries(eachEntry)) {
          if (enabled) {
            classesFinalList.push(className);
          }
        }
      }
    }
    return classesFinalList;
  };
  createElement(...args) {
    if (args[0] instanceof Array) {
      return this.xhtm(...args);
    } else {
      _ElementalClass.debug && console.debug(`args is:`, args);
      for (const middleware2 of (this.middleware[_ElementalClass.allTags] || []).concat(this.middleware[args[0]] || [])) {
        try {
          args = eachMiddleWare(args);
        } catch (error) {
          console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args);
        }
      }
      let [key2, properties2, ...children] = args;
      _ElementalClass.debug && console.debug(`key, properties, children is:`, key2, properties2, children);
      if (this.components[key2] instanceof Function) {
        key2 = this.components[key2];
      }
      if (key2 instanceof Function) {
        let output2;
        try {
          output2 = isConstructor(key2) ? new key2({ ...properties2, children }) : key2({ ...properties2, children });
        } catch (error) {
          return this.errorComponentFactory({ ...properties2, children }, key2, error);
        }
        if (output2 instanceof Promise) {
          const elementPromise = output2;
          const placeholder = elementPromise.placeholder || this.defaultPlaceholderFactory(output2);
          setTimeout(async () => {
            try {
              const result = await elementPromise;
              if (!(result instanceof Array)) {
                const htmlElement = _ElementalClass.makeHtmlElement(result);
                placeholder.replaceWith(htmlElement);
              } else {
                let parentElement = placeholder.parentElement;
                if (!parentElement) {
                  parentElement = await new Promise((resolve, reject) => {
                    let intervalId = setInterval(() => {
                      if (placeholder.parentElement) {
                        resolve(placeholder.parentElement);
                        clearInterval(intervalId);
                      }
                    }, 70);
                  });
                }
                for (const each of result) {
                  try {
                    _ElementalClass.appendChildren({
                      element: parentElement,
                      insertBefore: placeholder
                    }, each);
                  } catch (error) {
                    parentElement.insertBefore(placeholder, createErrorElement(`Something returned a promise, which resolved to an array, and then something tried to append those to an element (this element: ${element}). One of the items in the array ${each} caused an error when it tried to be added as a child:
 ${toString(error)}`));
                  }
                }
              }
            } catch (error) {
              placeholder.replaceWith(
                this.errorComponentFactory({ ...properties2, children }, key2, error)
              );
            }
          }, 0);
          return placeholder;
        } else {
          return output2;
        }
      }
      const isSvg = _ElementalClass.exclusivelySvgElements.has(key2);
      let element;
      if (key2 == "iframe" && properties2.src) {
        const helper = document.createElement("div");
        helper.innerHTML = `<iframe src=${JSON.stringify(properties2.src)}></iframe>`;
        element = helper.children[0];
        delete properties2.src;
      } else if (isSvg) {
        element = document.createElementNS("http://www.w3.org/2000/svg", key2);
      } else {
        element = document.createElement(key2);
      }
      let styleString = "";
      if (properties2 instanceof Object) {
        for (let [key3, value] of Object.entries(properties2)) {
          if (key3 == "style") {
            styleString += _ElementalClass.css(value);
            continue;
          }
          if (key3.slice(0, 2) == "on" && key3.slice(2, 3).toLowerCase() !== key3.slice(2, 3) && value instanceof Function) {
            element.addEventListener(key3.slice(2).toLowerCase(), value);
          }
          if (key3 == "class") {
            if (value instanceof Array) {
              value = value.join(" ");
            } else if (value instanceof Object) {
              let newValue = "";
              for (const [classString, enable] of Object.entries(value)) {
                if (enable) {
                  newValue += classString;
                }
              }
              value = newValue;
            }
          }
          if (isSvg) {
            if (value instanceof Array) {
              value = value.join(" ");
            }
            element.setAttribute(kebabCase(key3), value);
            continue;
          }
          if (value != null && !(value instanceof Object) && validNonCallbackHtmlAttributes.has(key3)) {
            element.setAttribute(key3, value);
          }
          try {
            element[key3] = value;
          } catch (error) {
          }
          if (isValidStyleAttribute(key3)) {
            styleString += `;${key3}: ${value};`;
          }
        }
      }
      if (styleString) {
        element.setAttribute("style", styleString);
      }
      return _ElementalClass.appendChildren(element, ...children);
    }
  }
  extend(additionalComponents = {}, options = {}) {
    const { middleware: middleware2, ...other } = options || {};
    return Elemental(
      { ...this.components, ...additionalComponents },
      {
        middleware: { ...this.middleware, ...middleware2 },
        ...other
      }
    );
  }
};
var Elemental = (...args) => {
  const elementalObject = new ElementalClass(...args);
  const createElementFunction = elementalObject.createElement.bind(elementalObject);
  attachProperties(ElementalClass, createElementFunction);
  attachProperties(elementalObject, createElementFunction);
  return createElementFunction;
};
attachProperties(ElementalClass, Elemental);
function createErrorElement(error) {
  const element = document.createElement("div");
  element.setAttribute("style", `
        all:              unset;
        display:          flex;
        flex-direction:   column;
        padding:          1.5rem;
        background-color: #f5a5a8;
        color:            white;
        font-family:      -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size:        18px;
        font-weight:      400;
        overflow:         auto;
    `);
  element.innerHTML = `I'm sorry, there was an error when loading this part of the page 🙁.<br>Here's the error message: ${Option(toString(error != null && error.message || error)).innerHTML}`;
}
function defaultErrorComponentFactory({ children, ...properties2 }, key2, error) {
  const element = document.createElement("div");
  const errorDetails = document.createElement("div");
  const childContainer = document.createElement("div");
  element.setAttribute("style", `
        all:              unset;
        display:          flex;
        flex-direction:   column;
        padding:          1.5rem;
        background-color: #f5a5a8;
        color:            white;
        font-family:      -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size:        18px;
        font-weight:      400;
        overflow:         auto;
    `);
  element.innerHTML = `I'm sorry, there was an error when loading this part of the page 🙁 `;
  let errorElementPart;
  if (typeof key2 == "string") {
    errorElementPart = `<${key2} />`;
  } else {
    try {
      errorElementPart = `<${key2.prototype.constructor.name} />`;
    } catch (error2) {
      try {
        errorElementPart = `<${key2.name} />`;
      } catch (error3) {
        errorElementPart = `<${key2} />`;
      }
    }
  }
  let errorJsonObject = {};
  for (const [key3, value] of Object.entries(properties2)) {
    try {
      errorJsonObject[key3] = JSON.parse(JSON.stringify(value));
    } catch (error2) {
      if (typeof value == "symbol") {
        errorJsonObject[key3] = value.toString();
      } else {
        errorJsonObject[key3] = `${value}`;
      }
    }
  }
  errorDetails.innerHTML = `
        <span>
            tag: ${errorElementPart}
        </span>
        <div>
            properties:
            <code style="max-height: 12rem; overflow: auto;">
                ${JSON.stringify(errorJsonObject, 0, 4)}
            </code>
        </div>
        <span>
            error: ${error.stack.replace(/\n/, "<br>")}
        </span>
    `;
  errorDetails.setAttribute("style", `
        padding: 1rem;
        background-color: #161b22;
        color: #789896;
        white-space: pre;
        max-width: 85vw;
        overflow: auto;
    `);
  element.appendChild(errorDetails);
  childContainer.setAttribute("style", `
        all: unset
        display: flex
        flex-direction: column
        margin-top: 1.3rem
    `);
  ElementalClass.appendChildren(childContainer, children);
  element.appendChild(childContainer);
  return element;
}
try {
  const originalHead = document.head;
  Object.defineProperty(document, "head", {
    set: (element) => ElementalClass.appendChildren(originalHead, ...element.childNodes),
    get: () => originalHead,
    writable: true
  });
} catch (error) {
}
var combineClasses = ElementalClass.combineClasses;
var html = Elemental();
var css = ElementalClass.css;
var allTags = ElementalClass.allTags;

// https://deno.land/x/good_component@0.2.14/main/helpers/css.bundle.js
var __defProp2 = Object.defineProperty;
var __export2 = (target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
};
function createCommonjsModule(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function getDefaultExportFromNamespaceIfNotNamed(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var cache_exports = {};
__export2(cache_exports, {
  default: () => cache_default
});
var sheet_exports = {};
__export2(sheet_exports, {
  StyleSheet: () => StyleSheet,
  __moduleExports: () => emotionSheet_cjs,
  default: () => sheet_default
});
function createCommonjsModule2(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire2(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function commonjsRequire2() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionSheet_cjs_prod = createCommonjsModule2(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function sheetForTag(tag) {
    if (tag.sheet) {
      return tag.sheet;
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        return document.styleSheets[i];
      }
    }
  }
  function createStyleElement(options) {
    var tag = document.createElement("style");
    tag.setAttribute("data-emotion", options.key);
    if (options.nonce !== void 0) {
      tag.setAttribute("nonce", options.nonce);
    }
    tag.appendChild(document.createTextNode(""));
    tag.setAttribute("data-s", "");
    return tag;
  }
  var StyleSheet2 = /* @__PURE__ */ function() {
    function StyleSheet3(options) {
      var _this = this;
      this._insertTag = function(tag) {
        var before;
        if (_this.tags.length === 0) {
          if (_this.insertionPoint) {
            before = _this.insertionPoint.nextSibling;
          } else if (_this.prepend) {
            before = _this.container.firstChild;
          } else {
            before = _this.before;
          }
        } else {
          before = _this.tags[_this.tags.length - 1].nextSibling;
        }
        _this.container.insertBefore(tag, before);
        _this.tags.push(tag);
      };
      this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce;
      this.key = options.key;
      this.container = options.container;
      this.prepend = options.prepend;
      this.insertionPoint = options.insertionPoint;
      this.before = null;
    }
    var _proto = StyleSheet3.prototype;
    _proto.hydrate = function hydrate2(nodes) {
      nodes.forEach(this._insertTag);
    };
    _proto.insert = function insert(rule) {
      if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
        this._insertTag(createStyleElement(this));
      }
      var tag = this.tags[this.tags.length - 1];
      if (this.isSpeedy) {
        var sheet3 = sheetForTag(tag);
        try {
          sheet3.insertRule(rule, sheet3.cssRules.length);
        } catch (e2) {
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }
      this.ctr++;
    };
    _proto.flush = function flush2() {
      this.tags.forEach(function(tag) {
        return tag.parentNode && tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    };
    return StyleSheet3;
  }();
  exports2.StyleSheet = StyleSheet2;
});
var emotionSheet_cjs = createCommonjsModule2(function(module2) {
  {
    module2.exports = emotionSheet_cjs_prod;
  }
});
var StyleSheet = emotionSheet_cjs.StyleSheet;
var sheet_default = emotionSheet_cjs;
var stylis_exports = {};
__export2(stylis_exports, {
  CHARSET: () => CHARSET,
  COMMENT: () => COMMENT,
  COUNTER_STYLE: () => COUNTER_STYLE,
  DECLARATION: () => DECLARATION,
  DOCUMENT: () => DOCUMENT,
  FONT_FACE: () => FONT_FACE,
  FONT_FEATURE_VALUES: () => FONT_FEATURE_VALUES,
  IMPORT: () => IMPORT,
  KEYFRAMES: () => KEYFRAMES,
  MEDIA: () => MEDIA,
  MOZ: () => MOZ,
  MS: () => MS,
  NAMESPACE: () => NAMESPACE,
  PAGE: () => PAGE,
  RULESET: () => RULESET,
  SUPPORTS: () => SUPPORTS,
  VIEWPORT: () => VIEWPORT,
  WEBKIT: () => WEBKIT,
  abs: () => abs,
  alloc: () => alloc,
  append: () => append,
  assign: () => assign,
  caret: () => caret,
  char: () => char,
  character: () => character,
  characters: () => characters,
  charat: () => charat,
  column: () => column,
  combine: () => combine,
  comment: () => comment,
  commenter: () => commenter,
  compile: () => compile,
  copy: () => copy,
  dealloc: () => dealloc,
  declaration: () => declaration,
  default: () => stylis_default,
  delimit: () => delimit,
  delimiter: () => delimiter,
  escaping: () => escaping,
  from: () => from,
  hash: () => hash,
  identifier: () => identifier,
  indexof: () => indexof,
  length: () => length,
  line: () => line,
  match: () => match,
  middleware: () => middleware,
  namespace: () => namespace,
  next: () => next,
  node: () => node,
  parse: () => parse,
  peek: () => peek,
  position: () => position,
  prefix: () => prefix,
  prefixer: () => prefixer,
  prev: () => prev,
  replace: () => replace,
  ruleset: () => ruleset,
  rulesheet: () => rulesheet,
  serialize: () => serialize,
  sizeof: () => sizeof,
  slice: () => slice,
  stringify: () => stringify,
  strlen: () => strlen,
  substr: () => substr,
  token: () => token,
  tokenize: () => tokenize,
  tokenizer: () => tokenizer,
  trim: () => trim,
  whitespace: () => whitespace
});
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var PAGE = "@page";
var MEDIA = "@media";
var IMPORT = "@import";
var CHARSET = "@charset";
var VIEWPORT = "@viewport";
var SUPPORTS = "@supports";
var DOCUMENT = "@document";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var FONT_FACE = "@font-face";
var COUNTER_STYLE = "@counter-style";
var FONT_FEATURE_VALUES = "@font-feature-values";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function tokenize(value) {
  return dealloc(tokenizer(alloc(value)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function tokenizer(children) {
  while (next())
    switch (token(character)) {
      case 0:
        append(identifier(position - 1), children);
        break;
      case 2:
        append(delimit(character), children);
        break;
      default:
        append(from(character), children);
    }
  return children;
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4200:
      if (!match(value, /flex-|baseline/))
        return MS + "grid-column-align" + substr(value, length2) + value;
      break;
    case 2592:
    case 3360:
      return MS + replace(value, "template-", "") + value;
    case 4384:
    case 3616:
      if (children && children.some(function(element, index) {
        return length2 = index, match(element.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span") ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span") ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    case 4896:
    case 4128:
      return children && children.some(function(element) {
        return match(element.props, /grid-\w+-start/);
      }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
        }
      break;
    case 5152:
    case 5920:
      return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a, b, c, d, e2, f) {
        return MS + a + ":" + b + f + (c ? MS + a + "-span:" + (d ? e2 : +e2 - +b) + f : "") + value;
      });
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ":", ":" + WEBKIT) + value;
      break;
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        case 120:
          return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        case 100:
          return replace(value, ":", ":" + MS) + value;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, "scroll-", "scroll-snap-") + value;
  }
  return value;
}
function serialize(children, callback) {
  var output2 = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output2 += callback(children[i], i, children, callback) || "";
  return output2;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output2 = "";
    for (var i = 0; i < length2; i++)
      output2 += collection[i](element, index, children, callback) || "";
    return output2;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
                case "::placeholder":
                  return serialize([
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
}
function namespace(element) {
  switch (element.type) {
    case RULESET:
      element.props = element.props.map(function(value) {
        return combine(tokenize(value), function(value2, index, children) {
          switch (charat(value2, 0)) {
            case 12:
              return substr(value2, 1, strlen(value2));
            case 0:
            case 40:
            case 43:
            case 62:
            case 126:
              return value2;
            case 58:
              if (children[++index] === "global")
                children[index] = "", children[++index] = "\f" + substr(children[index], index = 1, -1);
            case 32:
              return index === 1 ? "" : value2;
            default:
              switch (index) {
                case 0:
                  element = value2;
                  return sizeof(children) > 1 ? "" : value2;
                case (index = sizeof(children) - 1):
                case 2:
                  return index === 2 ? value2 + element + element : value2 + element;
                default:
                  return value2;
              }
          }
        });
      });
  }
}
var stylis_default = null;
var weak_memoize_exports = {};
__export2(weak_memoize_exports, {
  default: () => weak_memoize_default
});
function createCommonjsModule3(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire3(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function commonjsRequire3() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionWeakMemoize_cjs_prod = createCommonjsModule3(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var weakMemoize2 = function weakMemoize22(func) {
    var cache = /* @__PURE__ */ new WeakMap();
    return function(arg) {
      if (cache.has(arg)) {
        return cache.get(arg);
      }
      var ret = func(arg);
      cache.set(arg, ret);
      return ret;
    };
  };
  exports2.default = weakMemoize2;
});
var emotionWeakMemoize_cjs = createCommonjsModule3(function(module2) {
  {
    module2.exports = emotionWeakMemoize_cjs_prod;
  }
});
var weak_memoize_default = emotionWeakMemoize_cjs;
var memoize_exports = {};
__export2(memoize_exports, {
  default: () => memoize_default
});
function createCommonjsModule4(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire4(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function commonjsRequire4() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionMemoize_cjs_prod = createCommonjsModule4(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function memoize3(fn) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function(arg) {
      if (cache[arg] === void 0)
        cache[arg] = fn(arg);
      return cache[arg];
    };
  }
  exports2.default = memoize3;
});
var emotionMemoize_cjs = createCommonjsModule4(function(module2) {
  {
    module2.exports = emotionMemoize_cjs_prod;
  }
});
var memoize_default = emotionMemoize_cjs;
function createCommonjsModule5(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire5(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function getDefaultExportFromNamespaceIfNotNamed2(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire5() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var sheet = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(sheet_exports);
var stylis = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(stylis_exports);
var weakMemoize = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(weak_memoize_exports);
var memoize = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(memoize_exports);
var emotionCache_cjs_prod = createCommonjsModule5(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function _interopDefault(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  }
  var weakMemoize__default = /* @__PURE__ */ _interopDefault(weakMemoize);
  var memoize__default = /* @__PURE__ */ _interopDefault(memoize);
  var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
    var previous = 0;
    var character2 = 0;
    while (true) {
      previous = character2;
      character2 = stylis.peek();
      if (previous === 38 && character2 === 12) {
        points[index] = 1;
      }
      if (stylis.token(character2)) {
        break;
      }
      stylis.next();
    }
    return stylis.slice(begin, stylis.position);
  };
  var toRules = function toRules2(parsed, points) {
    var index = -1;
    var character2 = 44;
    do {
      switch (stylis.token(character2)) {
        case 0:
          if (character2 === 38 && stylis.peek() === 12) {
            points[index] = 1;
          }
          parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
          break;
        case 2:
          parsed[index] += stylis.delimit(character2);
          break;
        case 4:
          if (character2 === 44) {
            parsed[++index] = stylis.peek() === 58 ? "&\f" : "";
            points[index] = parsed[index].length;
            break;
          }
        default:
          parsed[index] += stylis.from(character2);
      }
    } while (character2 = stylis.next());
    return parsed;
  };
  var getRules = function getRules2(value, points) {
    return stylis.dealloc(toRules(stylis.alloc(value), points));
  };
  var fixedElements = /* @__PURE__ */ new WeakMap();
  var compat = function compat2(element) {
    if (element.type !== "rule" || !element.parent || element.length < 1) {
      return;
    }
    var value = element.value, parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;
    while (parent.type !== "rule") {
      parent = parent.parent;
      if (!parent)
        return;
    }
    if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
      return;
    }
    if (isImplicitRule) {
      return;
    }
    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
    for (var i = 0, k = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k++) {
        element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
      }
    }
  };
  var removeLabel = function removeLabel2(element) {
    if (element.type === "decl") {
      var value = element.value;
      if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
        element["return"] = "";
        element.value = "";
      }
    }
  };
  function prefix2(value, length2) {
    switch (stylis.hash(value, length2)) {
      case 5103:
        return stylis.WEBKIT + "print-" + value + value;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return stylis.WEBKIT + value + value;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return stylis.WEBKIT + value + stylis.MOZ + value + stylis.MS + value + value;
      case 6828:
      case 4268:
        return stylis.WEBKIT + value + stylis.MS + value + value;
      case 6165:
        return stylis.WEBKIT + value + stylis.MS + "flex-" + value + value;
      case 5187:
        return stylis.WEBKIT + value + stylis.replace(value, /(\w+).+(:[^]+)/, stylis.WEBKIT + "box-$1$2" + stylis.MS + "flex-$1$2") + value;
      case 5443:
        return stylis.WEBKIT + value + stylis.MS + "flex-item-" + stylis.replace(value, /flex-|-self/, "") + value;
      case 4675:
        return stylis.WEBKIT + value + stylis.MS + "flex-line-pack" + stylis.replace(value, /align-content|flex-|-self/, "") + value;
      case 5548:
        return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "shrink", "negative") + value;
      case 5292:
        return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "basis", "preferred-size") + value;
      case 6060:
        return stylis.WEBKIT + "box-" + stylis.replace(value, "-grow", "") + stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "grow", "positive") + value;
      case 4554:
        return stylis.WEBKIT + stylis.replace(value, /([^-])(transform)/g, "$1" + stylis.WEBKIT + "$2") + value;
      case 6187:
        return stylis.replace(stylis.replace(stylis.replace(value, /(zoom-|grab)/, stylis.WEBKIT + "$1"), /(image-set)/, stylis.WEBKIT + "$1"), value, "") + value;
      case 5495:
      case 3959:
        return stylis.replace(value, /(image-set\([^]*)/, stylis.WEBKIT + "$1$`$1");
      case 4968:
        return stylis.replace(stylis.replace(value, /(.+:)(flex-)?(.*)/, stylis.WEBKIT + "box-pack:$3" + stylis.MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + stylis.WEBKIT + value + value;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return stylis.replace(value, /(.+)-inline(.+)/, stylis.WEBKIT + "$1$2") + value;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (stylis.strlen(value) - 1 - length2 > 6)
          switch (stylis.charat(value, length2 + 1)) {
            case 109:
              if (stylis.charat(value, length2 + 4) !== 45)
                break;
            case 102:
              return stylis.replace(value, /(.+:)(.+)-([^]+)/, "$1" + stylis.WEBKIT + "$2-$3$1" + stylis.MOZ + (stylis.charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
            case 115:
              return ~stylis.indexof(value, "stretch") ? prefix2(stylis.replace(value, "stretch", "fill-available"), length2) + value : value;
          }
        break;
      case 4949:
        if (stylis.charat(value, length2 + 1) !== 115)
          break;
      case 6444:
        switch (stylis.charat(value, stylis.strlen(value) - 3 - (~stylis.indexof(value, "!important") && 10))) {
          case 107:
            return stylis.replace(value, ":", ":" + stylis.WEBKIT) + value;
          case 101:
            return stylis.replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + stylis.WEBKIT + (stylis.charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + stylis.WEBKIT + "$2$3$1" + stylis.MS + "$2box$3") + value;
        }
        break;
      case 5936:
        switch (stylis.charat(value, length2 + 11)) {
          case 114:
            return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
          case 108:
            return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
          case 45:
            return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
        }
        return stylis.WEBKIT + value + stylis.MS + value + value;
    }
    return value;
  }
  var prefixer2 = function prefixer22(element, index, children, callback) {
    if (element.length > -1) {
      if (!element["return"])
        switch (element.type) {
          case stylis.DECLARATION:
            element["return"] = prefix2(element.value, element.length);
            break;
          case stylis.KEYFRAMES:
            return stylis.serialize([stylis.copy(element, {
              value: stylis.replace(element.value, "@", "@" + stylis.WEBKIT)
            })], callback);
          case stylis.RULESET:
            if (element.length)
              return stylis.combine(element.props, function(value) {
                switch (stylis.match(value, /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    return stylis.serialize([stylis.copy(element, {
                      props: [stylis.replace(value, /:(read-\w+)/, ":" + stylis.MOZ + "$1")]
                    })], callback);
                  case "::placeholder":
                    return stylis.serialize([stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.WEBKIT + "input-$1")]
                    }), stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.MOZ + "$1")]
                    }), stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, stylis.MS + "input-$1")]
                    })], callback);
                }
                return "";
              });
        }
    }
  };
  var isBrowser = typeof document !== "undefined";
  var getServerStylisCache = isBrowser ? void 0 : weakMemoize__default["default"](function() {
    return memoize__default["default"](function() {
      var cache = {};
      return function(name) {
        return cache[name];
      };
    });
  });
  var defaultStylisPlugins = [prefixer2];
  var createCache2 = function createCache22(options) {
    var key2 = options.key;
    if (isBrowser && key2 === "css") {
      var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(ssrStyles, function(node2) {
        var dataEmotionAttribute = node2.getAttribute("data-emotion");
        if (dataEmotionAttribute.indexOf(" ") === -1) {
          return;
        }
        document.head.appendChild(node2);
        node2.setAttribute("data-s", "");
      });
    }
    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
    var inserted = {};
    var container;
    var nodesToHydrate = [];
    if (isBrowser) {
      container = options.container || document.head;
      Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key2 + ' "]'), function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      });
    }
    var _insert;
    var omnipresentPlugins = [compat, removeLabel];
    if (isBrowser) {
      var currentSheet;
      var finalizingPlugins = [stylis.stringify, stylis.rulesheet(function(rule) {
        currentSheet.insert(rule);
      })];
      var serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
      var stylis$12 = function stylis$13(styles) {
        return stylis.serialize(stylis.compile(styles), serializer);
      };
      _insert = function insert(selector, serialized, sheet22, shouldCache) {
        currentSheet = sheet22;
        stylis$12(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        if (shouldCache) {
          cache.inserted[serialized.name] = true;
        }
      };
    } else {
      var _finalizingPlugins = [stylis.stringify];
      var _serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
      var _stylis = function _stylis2(styles) {
        return stylis.serialize(stylis.compile(styles), _serializer);
      };
      var serverStylisCache = getServerStylisCache(stylisPlugins)(key2);
      var getRules2 = function getRules3(selector, serialized) {
        var name = serialized.name;
        if (serverStylisCache[name] === void 0) {
          serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        }
        return serverStylisCache[name];
      };
      _insert = function _insert2(selector, serialized, sheet22, shouldCache) {
        var name = serialized.name;
        var rules = getRules2(selector, serialized);
        if (cache.compat === void 0) {
          if (shouldCache) {
            cache.inserted[name] = true;
          }
          return rules;
        } else {
          if (shouldCache) {
            cache.inserted[name] = rules;
          } else {
            return rules;
          }
        }
      };
    }
    var cache = {
      key: key2,
      sheet: new sheet.StyleSheet({
        key: key2,
        container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend,
        insertionPoint: options.insertionPoint
      }),
      nonce: options.nonce,
      inserted,
      registered: {},
      insert: _insert
    };
    cache.sheet.hydrate(nodesToHydrate);
    return cache;
  };
  exports2.default = createCache2;
});
var emotionCache_cjs = createCommonjsModule5(function(module2) {
  {
    module2.exports = emotionCache_cjs_prod;
  }
});
var cache_default = emotionCache_cjs;
var serialize_exports = {};
__export2(serialize_exports, {
  __moduleExports: () => emotionSerialize_cjs,
  default: () => serialize_default,
  serializeStyles: () => serializeStyles
});
var hash_exports = {};
__export2(hash_exports, {
  default: () => hash_default
});
function createCommonjsModule6(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire6(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function commonjsRequire6() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionHash_cjs_prod = createCommonjsModule6(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function murmur2(str) {
    var h = 0;
    var k, i = 0, len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
      k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
      k ^= k >>> 24;
      h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 255) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 255) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 255;
        h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    h ^= h >>> 13;
    h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }
  exports2.default = murmur2;
});
var emotionHash_cjs = createCommonjsModule6(function(module2) {
  {
    module2.exports = emotionHash_cjs_prod;
  }
});
var hash_default = emotionHash_cjs;
var unitless_exports = {};
__export2(unitless_exports, {
  default: () => unitless_default
});
function createCommonjsModule7(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire7(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function commonjsRequire7() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionUnitless_cjs_prod = createCommonjsModule7(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  exports2.default = unitlessKeys;
});
var emotionUnitless_cjs = createCommonjsModule7(function(module2) {
  {
    module2.exports = emotionUnitless_cjs_prod;
  }
});
var unitless_default = emotionUnitless_cjs;
function createCommonjsModule8(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire8(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function getDefaultExportFromNamespaceIfNotNamed3(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire8() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var hashString = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed3(hash_exports);
var unitless = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed3(unitless_exports);
var memoize2 = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed3(memoize_exports);
var emotionSerialize_cjs_prod = createCommonjsModule8(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function _interopDefault(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  }
  var hashString__default = /* @__PURE__ */ _interopDefault(hashString);
  var unitless__default = /* @__PURE__ */ _interopDefault(unitless);
  var memoize__default = /* @__PURE__ */ _interopDefault(memoize2);
  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  var isCustomProperty = function isCustomProperty2(property) {
    return property.charCodeAt(1) === 45;
  };
  var isProcessableValue = function isProcessableValue2(value) {
    return value != null && typeof value !== "boolean";
  };
  var processStyleName = /* @__PURE__ */ memoize__default["default"](function(styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
  });
  var processStyleValue = function processStyleValue2(key2, value) {
    switch (key2) {
      case "animation":
      case "animationName": {
        if (typeof value === "string") {
          return value.replace(animationRegex, function(match2, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
    }
    if (unitless__default["default"][key2] !== 1 && !isCustomProperty(key2) && typeof value === "number" && value !== 0) {
      return value + "px";
    }
    return value;
  };
  var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
  function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return "";
    }
    if (interpolation.__emotion_styles !== void 0) {
      return interpolation;
    }
    switch (typeof interpolation) {
      case "boolean": {
        return "";
      }
      case "object": {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }
        if (interpolation.styles !== void 0) {
          var next2 = interpolation.next;
          if (next2 !== void 0) {
            while (next2 !== void 0) {
              cursor = {
                name: next2.name,
                styles: next2.styles,
                next: cursor
              };
              next2 = next2.next;
            }
          }
          var styles = interpolation.styles + ";";
          return styles;
        }
        return createStringFromObject(mergedProps, registered, interpolation);
      }
      case "function": {
        if (mergedProps !== void 0) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }
        break;
      }
    }
    if (registered == null) {
      return interpolation;
    }
    var cached = registered[interpolation];
    return cached !== void 0 ? cached : interpolation;
  }
  function createStringFromObject(mergedProps, registered, obj) {
    var string = "";
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];
        if (typeof value !== "object") {
          if (registered != null && registered[value] !== void 0) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === "NO_COMPONENT_SELECTOR" && false) {
            throw new Error(noComponentSelectorMessage);
          }
          if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value);
            switch (_key) {
              case "animation":
              case "animationName": {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }
              default: {
                string += _key + "{" + interpolated + "}";
              }
            }
          }
        }
      }
    }
    return string;
  }
  var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  var cursor;
  var serializeStyles2 = function serializeStyles3(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
      return args[0];
    }
    var stringMode = true;
    var styles = "";
    cursor = void 0;
    var strings = args[0];
    if (strings == null || strings.raw === void 0) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings);
    } else {
      styles += strings[0];
    }
    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i]);
      if (stringMode) {
        styles += strings[i];
      }
    }
    labelPattern.lastIndex = 0;
    var identifierName = "";
    var match2;
    while ((match2 = labelPattern.exec(styles)) !== null) {
      identifierName += "-" + match2[1];
    }
    var name = hashString__default["default"](styles) + identifierName;
    return {
      name,
      styles,
      next: cursor
    };
  };
  exports2.serializeStyles = serializeStyles2;
});
var emotionSerialize_cjs = createCommonjsModule8(function(module2) {
  {
    module2.exports = emotionSerialize_cjs_prod;
  }
});
var serialize_default = emotionSerialize_cjs;
var serializeStyles = emotionSerialize_cjs.serializeStyles;
var utils_exports = {};
__export2(utils_exports, {
  __moduleExports: () => emotionUtils_cjs,
  default: () => utils_default,
  getRegisteredStyles: () => getRegisteredStyles,
  insertStyles: () => insertStyles,
  registerStyles: () => registerStyles
});
function createCommonjsModule9(fn, basedir, module2) {
  return module2 = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire9(path, base === void 0 || base === null ? module2.path : base);
    }
  }, fn(module2, module2.exports), module2.exports;
}
function commonjsRequire9() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionUtils_cjs_prod = createCommonjsModule9(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var isBrowser = typeof document !== "undefined";
  function getRegisteredStyles22(registered, registeredStyles, classNames) {
    var rawClassName = "";
    classNames.split(" ").forEach(function(className) {
      if (registered[className] !== void 0) {
        registeredStyles.push(registered[className] + ";");
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var registerStyles2 = function registerStyles3(cache, serialized, isStringTag) {
    var className = cache.key + "-" + serialized.name;
    if ((isStringTag === false || isBrowser === false && cache.compat !== void 0) && cache.registered[className] === void 0) {
      cache.registered[className] = serialized.styles;
    }
  };
  var insertStyles2 = function insertStyles3(cache, serialized, isStringTag) {
    registerStyles2(cache, serialized, isStringTag);
    var className = cache.key + "-" + serialized.name;
    if (cache.inserted[serialized.name] === void 0) {
      var stylesForSSR = "";
      var current = serialized;
      do {
        var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
        if (!isBrowser && maybeStyles !== void 0) {
          stylesForSSR += maybeStyles;
        }
        current = current.next;
      } while (current !== void 0);
      if (!isBrowser && stylesForSSR.length !== 0) {
        return stylesForSSR;
      }
    }
  };
  exports2.getRegisteredStyles = getRegisteredStyles22;
  exports2.insertStyles = insertStyles2;
  exports2.registerStyles = registerStyles2;
});
var emotionUtils_cjs = createCommonjsModule9(function(module2) {
  {
    module2.exports = emotionUtils_cjs_prod;
  }
});
var utils_default = emotionUtils_cjs;
var getRegisteredStyles = emotionUtils_cjs.getRegisteredStyles;
var insertStyles = emotionUtils_cjs.insertStyles;
var registerStyles = emotionUtils_cjs.registerStyles;
var createCache = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed(cache_exports);
var serialize2 = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed(serialize_exports);
var utils = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed(utils_exports);
var emotionCssCreateInstance_cjs_prod = createCommonjsModule(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function _interopDefault(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  }
  var createCache__default = /* @__PURE__ */ _interopDefault(createCache);
  function insertWithoutScoping(cache22, serialized) {
    if (cache22.inserted[serialized.name] === void 0) {
      return cache22.insert("", serialized, cache22.sheet, true);
    }
  }
  function merge2(registered, css22, className) {
    var registeredStyles = [];
    var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css22(registeredStyles);
  }
  var createEmotion = function createEmotion2(options) {
    var cache22 = createCache__default["default"](options);
    cache22.sheet.speedy = function(value) {
      this.isSpeedy = value;
    };
    cache22.compat = true;
    var css22 = function css222() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var serialized = serialize2.serializeStyles(args, cache22.registered, void 0);
      utils.insertStyles(cache22, serialized, false);
      return cache22.key + "-" + serialized.name;
    };
    var keyframes2 = function keyframes22() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var serialized = serialize2.serializeStyles(args, cache22.registered);
      var animation = "animation-" + serialized.name;
      insertWithoutScoping(cache22, {
        name: serialized.name,
        styles: "@keyframes " + animation + "{" + serialized.styles + "}"
      });
      return animation;
    };
    var injectGlobal2 = function injectGlobal22() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var serialized = serialize2.serializeStyles(args, cache22.registered);
      insertWithoutScoping(cache22, serialized);
    };
    var cx2 = function cx22() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return merge2(cache22.registered, css22, classnames(args));
    };
    return {
      css: css22,
      cx: cx2,
      injectGlobal: injectGlobal2,
      keyframes: keyframes2,
      hydrate: function hydrate2(ids) {
        ids.forEach(function(key2) {
          cache22.inserted[key2] = true;
        });
      },
      flush: function flush2() {
        cache22.registered = {};
        cache22.inserted = {};
        cache22.sheet.flush();
      },
      sheet: cache22.sheet,
      cache: cache22,
      getRegisteredStyles: utils.getRegisteredStyles.bind(null, cache22.registered),
      merge: merge2.bind(null, cache22.registered, css22)
    };
  };
  var classnames = function classnames2(args) {
    var cls = "";
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (arg == null)
        continue;
      var toAdd = void 0;
      switch (typeof arg) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(arg)) {
            toAdd = classnames2(arg);
          } else {
            toAdd = "";
            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += " ");
                toAdd += k;
              }
            }
          }
          break;
        }
        default: {
          toAdd = arg;
        }
      }
      if (toAdd) {
        cls && (cls += " ");
        cls += toAdd;
      }
    }
    return cls;
  };
  exports2.default = createEmotion;
});
var emotionCss_cjs_prod = createCommonjsModule(function(module2, exports2) {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var _createEmotion = emotionCssCreateInstance_cjs_prod["default"]({
    key: "css"
  }), flush2 = _createEmotion.flush, hydrate2 = _createEmotion.hydrate, cx2 = _createEmotion.cx, merge2 = _createEmotion.merge, getRegisteredStyles22 = _createEmotion.getRegisteredStyles, injectGlobal2 = _createEmotion.injectGlobal, keyframes2 = _createEmotion.keyframes, css22 = _createEmotion.css, sheet22 = _createEmotion.sheet, cache3 = _createEmotion.cache;
  exports2.cache = cache3;
  exports2.css = css22;
  exports2.cx = cx2;
  exports2.flush = flush2;
  exports2.getRegisteredStyles = getRegisteredStyles22;
  exports2.hydrate = hydrate2;
  exports2.injectGlobal = injectGlobal2;
  exports2.keyframes = keyframes2;
  exports2.merge = merge2;
  exports2.sheet = sheet22;
});
var emotionCss_cjs = createCommonjsModule(function(module2) {
  {
    module2.exports = emotionCss_cjs_prod;
  }
});
var cache2 = emotionCss_cjs.cache;
var css2 = emotionCss_cjs.css;
var cx = emotionCss_cjs.cx;
var flush = emotionCss_cjs.flush;
var getRegisteredStyles2 = emotionCss_cjs.getRegisteredStyles;
var hydrate = emotionCss_cjs.hydrate;
var injectGlobal = emotionCss_cjs.injectGlobal;
var keyframes = emotionCss_cjs.keyframes;
var merge = emotionCss_cjs.merge;
var sheet2 = emotionCss_cjs.sheet;

// https://deno.land/x/good_component@0.2.14/main/actions/show_toast.js
var toastOn = css2``;
var toastify = css2`
    padding: 12px 20px;
    color: #ffffff;
    display: inline-block;
    box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);
    background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
    background: linear-gradient(135deg, #73a5ff, #5477f5);
    position: fixed;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    max-width: calc(50% - 20px);
    z-index: 2147483647;
    &${toastOn} {
        opacity: 1;
    }
`;
var toastClose = css2`
    background: transparent;
    border: 0;
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    opacity: 0.4;
    padding: 0 5px;
`;
var toastifyRight = css2`
    right: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyLeft = css2`
    left: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyTop = css2`
    top: 50px;
`;
var toastifyBottom = css2`
    bottom: 50px;
`;
var toastifyRounded = css2`
    border-radius: 25px;
`;
var toastifyAvatar = css2`
    width: 1.5em;
    height: 1.5em;
    margin: -7px 5px;
    border-radius: 2px;
`;
var toastifyCenter = css2`
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    max-width: fit-content;
    max-width: -moz-fit-content;
`;
var nameMapping = {
  right: toastifyRight,
  left: toastifyLeft,
  top: toastifyTop,
  bottom: toastifyBottom,
  rounded: toastifyRounded,
  avatar: toastifyAvatar,
  center: toastifyCenter
};
var Toastify = class {
  defaults = {
    oldestFirst: true,
    text: "Toastify is awesome!",
    node: void 0,
    duration: 3e3,
    selector: void 0,
    callback: function() {
    },
    destination: void 0,
    newWindow: false,
    close: false,
    gravity: toastifyBottom,
    positionLeft: false,
    position: "",
    backgroundColor: "",
    avatar: "",
    className: "",
    stopOnFocus: true,
    onClick: function() {
    },
    offset: { x: 0, y: 0 },
    escapeMarkup: true,
    ariaLive: "polite",
    style: { background: "" }
  };
  /**
  * Init the Toastify class
  * @example
  *     new Toastify({
  *         text: "This is a toast",
  *         duration: 3000
  *     }).showToast()
  *
  * @param {ToastifyConfigurationObject} options - The configuration object to configure Toastify
  * @param {string} [options.text=Hi there!] - Message to be displayed in the toast
  * @param {Element} [options.node] - Provide a node to be mounted inside the toast. node takes higher precedence over text
  * @param {number} [options.duration=3000] - Duration for which the toast should be displayed. -1 for permanent toast
  * @param {string} [options.selector] - CSS Selector on which the toast should be added
  * @param {url} [options.destination] - URL to which the browser should be navigated on click of the toast
  * @param {boolean} [options.newWindow=false] - Decides whether the destination should be opened in a new window or not
  * @param {boolean} [options.close=false] - To show the close icon or not
  * @param {string} [options.gravity=toastify-top] - To show the toast from top or bottom
  * @param {string} [options.position=right] - To show the toast on left or right
  * @param {string} [options.backgroundColor] - Sets the background color of the toast (To be deprecated)
  * @param {url} [options.avatar] - Image/icon to be shown before text
  * @param {string} [options.className] - Ability to provide custom class name for further customization
  * @param {boolean} [options.stopOnFocus] - To stop timer when hovered over the toast (Only if duration is set)
  * @param {Function} [options.callback] - Invoked when the toast is dismissed
  * @param {Function} [options.onClick] - Invoked when the toast is clicked
  * @param {Object} [options.offset] - Ability to add some offset to axis
  * @param {boolean} [options.escapeMarkup=true] - Toggle the default behavior of escaping HTML markup
  * @param {string} [options.ariaLive] - Announce the toast to screen readers
  * @param {Object} [options.style] - Use the HTML DOM style property to add styles to toast
  */
  constructor(options) {
    this.version = "1.12.0";
    this.options = {};
    this.toastElement = null;
    this._rootElement = document.body;
    this.options = Object.assign(this.defaults, options);
    if (this.options.backgroundColor) {
    }
    this.toastElement = null;
    this.options.gravity = options.gravity === "bottom" ? toastifyBottom : toastifyTop;
    this.options.stopOnFocus = options.stopOnFocus === void 0 ? true : options.stopOnFocus;
    if (options.backgroundColor) {
      this.options.style.background = options.backgroundColor;
    }
  }
  /**
  * Display the toast
  * @public
  */
  showToast() {
    this.toastElement = this._buildToast();
    if (typeof this.options.selector === "string") {
      this._rootElement = document.getElementById(this.options.selector);
    } else if (this.options.selector instanceof HTMLElement || this.options.selector instanceof ShadowRoot) {
      this._rootElement = this.options.selector;
    } else {
      this._rootElement = document.body;
    }
    if (!this._rootElement) {
      throw "Root element is not defined";
    }
    this._rootElement.insertBefore(this.toastElement, this._rootElement.firstChild);
    this._reposition();
    if (this.options.duration > 0) {
      this.toastElement.timeOutValue = window.setTimeout(() => {
        this._removeElement(this.toastElement);
      }, this.options.duration);
    }
    return this;
  }
  /**
  * Hide the toast
  * @public
  */
  hideToast() {
    if (this.toastElement.timeOutValue) {
      clearTimeout(this.toastElement.timeOutValue);
    }
    this._removeElement(this.toastElement);
  }
  /**
  * Build the Toastify element
  * @returns {Element}
  * @private
  */
  _buildToast() {
    if (!this.options) {
      throw "Toastify is not initialized";
    }
    let divElement = document.createElement("div");
    divElement.className = `${toastify} ${toastOn} ${this.options.className}`;
    divElement.className += ` ${nameMapping[this.options.position]}`;
    divElement.className += ` ${this.options.gravity}`;
    for (const property in this.options.style) {
      divElement.style[property] = this.options.style[property];
    }
    if (this.options.ariaLive) {
      divElement.setAttribute("aria-live", this.options.ariaLive);
    }
    if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
      divElement.appendChild(this.options.node);
    } else {
      if (this.options.escapeMarkup) {
        divElement.innerText = this.options.text;
      } else {
        divElement.innerHTML = this.options.text;
      }
      if (this.options.avatar !== "") {
        let avatarElement = document.createElement("img");
        avatarElement.src = this.options.avatar;
        avatarElement.className = toastifyAvatar;
        if (this.options.position == "left") {
          divElement.appendChild(avatarElement);
        } else {
          divElement.insertAdjacentElement("afterbegin", avatarElement);
        }
      }
    }
    if (this.options.close === true) {
      let closeElement = document.createElement("button");
      closeElement.type = "button";
      closeElement.setAttribute("aria-label", "Close");
      closeElement.className = toastClose;
      closeElement.innerHTML = "&#10006;";
      closeElement.addEventListener("click", (event) => {
        event.stopPropagation();
        this._removeElement(this.toastElement);
        window.clearTimeout(this.toastElement.timeOutValue);
      });
      const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (this.options.position == "left" && width > 360) {
        divElement.insertAdjacentElement("afterbegin", closeElement);
      } else {
        divElement.appendChild(closeElement);
      }
    }
    if (this.options.stopOnFocus && this.options.duration > 0) {
      divElement.addEventListener("mouseover", (event) => {
        window.clearTimeout(divElement.timeOutValue);
      });
      divElement.addEventListener("mouseleave", () => {
        divElement.timeOutValue = window.setTimeout(() => {
          this._removeElement(divElement);
        }, this.options.duration);
      });
    }
    if (typeof this.options.destination !== "undefined") {
      divElement.addEventListener("click", (event) => {
        event.stopPropagation();
        if (this.options.newWindow === true) {
          window.open(this.options.destination, "_blank");
        } else {
          window.location = this.options.destination;
        }
      });
    }
    if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
      divElement.addEventListener("click", (event) => {
        event.stopPropagation();
        this.options.onClick();
      });
    }
    if (typeof this.options.offset === "object") {
      const x = this._getAxisOffsetAValue("x", this.options);
      const y = this._getAxisOffsetAValue("y", this.options);
      const xOffset = this.options.position == "left" ? x : `-${x}`;
      const yOffset = this.options.gravity == toastifyTop ? y : `-${y}`;
      divElement.style.transform = `translate(${xOffset},${yOffset})`;
    }
    return divElement;
  }
  /**
  * Remove the toast from the DOM
  * @param {Element} toastElement
  */
  _removeElement(toastElement) {
    toastElement.className = toastElement.className.replace(` ${toastOn}`, "");
    window.setTimeout(() => {
      if (this.options.node && this.options.node.parentNode) {
        this.options.node.parentNode.removeChild(this.options.node);
      }
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
      this.options.callback.call(toastElement);
      this._reposition();
    }, 400);
  }
  /**
  * Position the toast on the DOM
  * @private
  */
  _reposition() {
    let topLeftOffsetSize = {
      top: 15,
      bottom: 15
    };
    let topRightOffsetSize = {
      top: 15,
      bottom: 15
    };
    let offsetSize = {
      top: 15,
      bottom: 15
    };
    let allToasts = this._rootElement.querySelectorAll(`.${toastify}`);
    let classUsed;
    let topOrBottom;
    for (let i = 0; i < allToasts.length; i++) {
      if (allToasts[i].classList.contains(toastifyTop) === true) {
        classUsed = toastifyTop;
        topOrBottom = "top";
      } else {
        classUsed = toastifyBottom;
        topOrBottom = "bottom";
      }
      let height2 = allToasts[i].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length - 1);
      let offset = 15;
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width <= 360) {
        allToasts[i].style[topOrBottom] = `${offsetSize[topOrBottom]}px`;
        offsetSize[topOrBottom] += height2 + offset;
      } else {
        if (allToasts[i].classList.contains(toastifyLeft) === true) {
          allToasts[i].style[topOrBottom] = `${topLeftOffsetSize[topOrBottom]}px`;
          topLeftOffsetSize[topOrBottom] += height2 + offset;
        } else {
          allToasts[i].style[topOrBottom] = `${topRightOffsetSize[topOrBottom]}px`;
          topRightOffsetSize[topOrBottom] += height2 + offset;
        }
      }
    }
  }
  /**
  * Helper function to get offset
  * @param {string} axis - 'x' or 'y'
  * @param {ToastifyConfigurationObject} options - The options object containing the offset object
  */
  _getAxisOffsetAValue(axis, options) {
    if (options.offset[axis]) {
      if (isNaN(options.offset[axis])) {
        return options.offset[axis];
      } else {
        return `${options.offset[axis]}px`;
      }
    }
    return "0px";
  }
};
var showToast = (message, options) => {
  const toast = new Toastify({
    position: "right",
    gravity: "bottom",
    ...options,
    text: message
  });
  toast.showToast();
  return toast;
};
var showErrorToast = (message, options) => {
  var toast;
  return toast = showToast(message, {
    backgroundColor: "coral",
    duration: NaN,
    onClick: () => {
      toast.hideToast();
    },
    ...options,
    text: message
  });
};

// https://deno.land/x/animalese@1.0.1.0/animalese.wav.binaryified.js
function eightToSeven(eightBytes) {
  const seven = 7;
  const sevenBytes = eightBytes.slice(0, seven);
  const finalByte = eightBytes[seven];
  const newBytes = new Uint8Array(new ArrayBuffer(seven));
  let index = -1;
  for (const each of sevenBytes) {
    index++;
    newBytes[index] = each;
    if (finalByte >> index & 1) {
      newBytes[index] = newBytes[index] | 1 << seven;
    }
  }
  return newBytes;
}
function stringToBytes(string) {
  const charCount = string.length;
  const buf = new ArrayBuffer(charCount);
  const asciiNumbers = new Uint8Array(buf);
  for (var i = 0; i < charCount; i++) {
    asciiNumbers[i] = string.charCodeAt(i);
  }
  const chunksOfEight = asciiNumbers.slice(0, -1);
  let sliceEnd = -asciiNumbers.slice(-1)[0];
  const eight = 8;
  const numberOfBlocks = Math.ceil(chunksOfEight.length / eight);
  const arrays = [];
  for (let index in [...Array(numberOfBlocks)]) {
    index -= 0;
    arrays.push(
      eightToSeven(
        chunksOfEight.slice(index * eight, (index + 1) * eight)
      )
    );
  }
  let totalLength = 0;
  for (const arr of arrays) {
    totalLength += arr.length;
  }
  const array = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    array.set(arr, offset);
    offset += arr.length;
  }
  if (sliceEnd == 0) {
    sliceEnd = array.length;
  }
  return array.slice(0, sliceEnd);
}
var animalese_wav_binaryified_default = stringToBytes(`RIFFz0\0WAVEfm\0t \0\0\0\0\0\0D,\0\0D,\0\0\0\b\0dataV\`\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0n\0\0\0\0\0\0}\x07	\v
	{wspoooooqtw\0{\b
\f|\r\v	\x07\0}yvsqponnoru\0y|	\vx\r\r\r\r\f\v	~|z\x07yyyyzz{\0|}~\0p\0\0~}{zzy\0yyyz{|}\0\0\x07~\x07\b	\v\f\f\v


\b~?{xtqoml\0lmorvz\0\b\f
~{wtqnmmnoqsv\0z~\x07	|
	\b~?|ywuttt\0tuwxz|}\0~\0\0\0\0<~}{zxwv\0vvvx{\0\`	\r\x1B! \f{smhda^\0]_chntz\0\x07\vzvqmighjmpsx\0}
~
\x07|yvuttuvwy{\0}\0\b
\f~\r\f
\b|zx\x07ussrrst\0uvxz|}~\0\0\0~}|ywur\0pnlkjii\0ijjlnqv\0}\b'~.2430-(\x07yk\`V\x07NHDCEJT\0_jv$x,14541,$\x1B}tkd\\WUUW[\0\`fnv\x07\`\x1B!! \b{upmkjklo\0rw|\bx\x1B\f{vqmjgfgh\0kosx}\b\`\f\f\x07~xsnjhfdc\0cdfilor\0ux{}\0\0\`\0~}|zxvuttuv\0trruy~@	$*--*'#\fqd[TPLJKPXcn\0y$+/~110-("|unhb\\YYZ_dj\0qx\bx!##"\x1B\b{upk\x07hgiknpt\0y\f|\x1B	~yto\x07kigfgil\0osw|\0\x07p\v\f
\b}xtp\x07mkigggi\0kmpswz|\0~\0\0~<|zxvsqp\0onnnooq\0rtwz\x07\`!(1:?<6-%\bwdUJD@=\0=@GR\`p\0\x1B&1:AC@;5.&\x1B\0sha[UPLMQXajr\0{"$~%$!\b|vpkihjmpsvz\0@
\v\x07}ytqnkigghkn\0qtx|\x07\vp\f\x07}xqlheca\`\`\0beimquz\0~\x07		\b~\x07\0|xtpmigedc\0dehknrw\0	$*3~=GKH@80(\rxbQD\x07=72./6B\0Rdu"0x=FKKGB;3(
zmc[SKEBEM\0V_gp{\b\`&),-,(#
xohc\`_\`be\0jpy	x!$%&%"
{tmhb_]]_\0adiov}@
\x1B\fytnjfcbc\0dgilpuz\0}||ywusqonnnno\0oprtvwy\0y{}\vp!'2=B@:2,&|hVJC<6\x00239ETdu\0"0<EKJF@:2'\bxkaYQJECFNXcl\0u\0\r"(+~,+("\x1B\bvngb^]\0_ekrx\x07@ $''&%"~?wpjda^]\0^\`dhnt{\0	\x1B
xrmige\0eefilos\0vz}\0x\0~|zxvuttttt\0tuutttt\0tsrrrrr\0qqt|p!.=HKGA;5/"x?bPC9/'$\0&.;K]p@%5DNRPMHB8*uh^TKB=\0=CLWakv\0(.221.(!\r{tlfbad\0hmrx\r\`\x1B! 
{tnkhfeef\0ilqw}\b\`\v\f\b}yvsqonnn\0opqqrst\0uvvwvvv\0wxyyzz|\0}\0\0x\0~{xurolifdcdh\0r~\b%7|JUXTOID;)tYF7\x07+ !3\0H^t\b/CxS\\_\\WPG:(m_S\x07I?746>K\0Wcn|\f)p27::83+!	~tjb\x07\\XWY^dk\0s{\r"|%%%#
{smgca\`acfjo\0u{\0	\f|\f	~zxwvutssstt\0uutssss\0srrrstv\0wy|p\x07\x07\b\b}?xsnid\`]\0[\\akx\`\x1B*=OY[YUPI<'\fq?XE6(\x1B\0#5I_u
@3FU_ca[TI;)o^PD;41\x003:DP[iy\0	&/7<?=92)\x07{pg_YVT\0UY\`gnv\0	"$%$!\x1B\bzsnifdd\0dfimqvz\0\x07	\v\f\r~\f\v	~?|zxvuuv\0vvvvwww\0vtsrqqp\0onoqtvy\0{~|{xtojgdcfmv\0~/?I~MMKIF>-~hVG8*\x1B#0@S\0gz\r!4DO|UWVRJ>0 ~n\`SH?::=DLT\0^l|\f"*x15761*"zrkf\x07b\`\`bgnt\0z\0\x07~\r\b~yuromlmnptw{\0	\f~\r\f
\b}?yvtsqpo\0oqtvxyz\0{|}}|zx\0wvtsrqp\0qrstvwx\0yz{zyxw\0vtsqrx\0@	\r&6AFD@<95*m\\NB6,'',5BQ\0dv'5A|IKKHC:. ti^U\x07LECFLTZ\0ajw!x',//-)#\f{smifegilq\0w\f|\x1B\x1B\f\0ztolifeegjnr\0w}\x07\f|\v\0ztojfcbbdfins\0w{\x07\x07x|yv\x07spnmllk\0kmnoppr\0twyz{@"(3?HHB<5/)
vbQF=4.,.4?L\0]p,9|DIJGB<2&\bzncY\x07QKFFJRZ\0bir~\vp$(,-,*&!
zsnjfcbdh\0mrw}\vp\x1B\x07{uohc_^^\`c\0glry	p\r}vnf\x07\`ZWVWY[\0_eksy@\x07
\r\r	{wrmheddcbb\0cglpv\0\r\`#*2>KTUOH?6,\x07q[I<2*%%*3BRe\0y\f+9DK~NLGA8-pd[SLGDEKT_i\0r|\x07&+|.0/,'!
zrkg\x07edegikp\0v}\v|\x1B
|voi\x07c_[ZZ]\`\0ekqx\0
p ""!	\0wnf^YTQPQT\0Y^dlsz\0@
\r
{upjeb_^^_\0aemz	p(5FU]\\WPH@2j?S@2%\x1B\0*<Qh@(;LY__ZSJ=-\x1B\x07t?dWMD<77\0<EQ[ep~\0\r\x1B&-26995/( \fwnf\`[XWY]bhnv\0	#&~()'$\b\0yqha[WUTTVZ\`\0fnw\0	x %))'#{oe]\x07WPKHHKP\0W^elu~@\v\r\b}xsokhfeeiq{\0\r /@LQQPMIC5\bp\\L=."+<O\0dy#8JW|_\`^XOB1\vxfWJ@8438@JU\0\`m|\f"*x17:95/)"yoga[XVVY^\0ciqzp\x1B %)++'"~uld_ZWUT\0UY]cipw\0\x07~  \byqjb[URQQRUZ\`\0hpw}\b\rp\r
~xqkhed\0gmu}\r\x1Bp+;FKMONKD5!\fwdSC2% %\0/<Mau	\`2CPWZZWPE5$\0p?aSH?:9;\0AIQ[gu@\r (.11/+'"\x1B	woic^\\\0[\\_bgnv\0\x07$~'(%"\r}umgb^[YYZ]a\0glrx~
\`\f\b{vqlgdbba\0aaceinr\0uy|p~{xuqopu{\0\f'5=ADFGF?0\vxgXI9.('-7DTe\0w
1@KQ~SSPI=/\0rdYNFBBEJPW\`\0kw\f\x1B!|&('$!\bztni\x07fddegjn\0rw~
\rx\r	zuqnlihgh\0ilorvy}\0\x07			\b\x07}zvtrpnmlm\0noprsuv\0xyz{{{{\0{{{zyxv\0utssvz}\0\0\v",037;>=7,vi[N\x07C<9;AIS\0_m|\f\x1B)3x;ADD@90&\x1BvkaYTRRSUY\0\`irz\bp\x1B\r\b}ytoljijln\0qtx}\x07
p\f\r\v
\b\0{wutsqpoo\0prtwxz}\0~\0}zwuromkjj\0klmnqtw\0z}x\0~|zx\x07vsqprvz\0}#*|-03674, \x07|peZ\x07QJGHLS\\\0fr~\v#+x15762+#\b~umf\x07b\`\`acfj\0pw~\b\fx\f	{wtronmnoqt\0w{~	\fx\f	\0}zwurpopqq\0rsuw{~\0@\b\b\x07|yurpmkjh\0hhijmoq\0ux|~p\x07\0}?{yvtsux\0z}
\x1B!|%(,//+$\x1B\buj\`\x07XRPQTY\`\0it\0\f!(|/4651*"zpg\`\x07[YY[_dj\0qz	|\x1B\f|xtqnlkklmoq\0ux|\0	x\f\r\v\b\0|ywuronmn\0oqstvy|\0\0\b	\v\v
	\x07\0}yuromk\0ihhiknp\0ruy}\0p\0}zyxxyz\0|\0\f\x1B~"$&%!\x1B\r~vng\x07a^\\^\`di\0px\v |&*+*'"\r{slf\x07b_^_bfl\0ry\0\x07\r|\v\x07}zvsqppppqst\0vy{}\`\x07\b\b	\b\x07\x07~?}{yxwut\0ssttuvw\0y{}\0p\0}{yxvutsrqqr\0stuvwz|\0~\0\0\0\0x~}}}\0@\b\r\b}wql\x07hgfhjmr\0x~\v\x1B| ! \v~xrn\x07kihhjmq\0uy~\x07\v\rx\r\v	|yxvvvvwwyz}\0~\0~\0~~~~}}}}\0}~~~}\0}}||{{z\0zzz{||}\0}~\0~~||{|\0|{{{{|}\0~~~~}}~\0}|{zxwv\0uuuvwy|\0\x07\f~	~xrm\x07jgggilp\0u{\x07\r|\x1B\x1B\v|wspmllmpr\0uy|\0\x07	x\v\v\v\v
\b\0}{yx\x07xwwwwyz\0|~\0x\0~}|zzyyyzz{|\0|}}~~~~\0~}|||||\0{{zzzzz\0zzyyzz{\0{||}~\0\`}|zxwvtstuxz\0}\0	\r~\v\x07~zvr\x07ponnpru\0x|\0	\f|\r	{xvttttuw\0y{}\0x\0\0~~\x07~~~~~~~\0}}~}}}}\0}}~~~~\0\0\0\0\0\0\0\0\0\0~}|||{{zzz\0z{{{{||\0|||||||\0||||||}\0~~\0\0x\0~}|{{{{|}~\0\b
\f~\r\r\r\f\v\b}|{{{||}\0\x07~\b\b\b\b\x07\0~}}}~~\0\`\0~||{{{\0{{|}~\0@~|{yxwvvv\0wwxz{}~\0\0~\0}|{zyxxxxxx\0yz{{|}~\0~~~~~~~\0~~~~~\0\0\0|\0\0\0\0\0\0\0~\x07\x07\x07\x07\0\0C\0\x07\x07\x07\x07\x07\x07\0~}|{{{{{|\0}~\0|?~}|{zyy\0yzz{|}\0\0\0~}|{zy\0xxxxxxx\0yz{{||}\0}~~~~\0~~~~\0~~~~}}\0}||{zyy\0yyyyz{|\0}\0|\x07\0\0\0\0\`\0\0~}|||{{\0{{|}}~\0\0~\0~}}||{{{\0{||}}~~\0\0\0\0~\0\0~}|{zyyxw\0wvwwxxy\0yz{|}~\0\0\0?}|{yxxx\0xxyz{|~\0\0\x07\x07\b\b\b\b\x07\x07\0~~}}}}~\0\0\0~||\x07||||}}~\0\0\0|\0\0~}}||||||}\0}~~\0\0p\0\0~}|{zzyyxxx\0yyzz{|}\0}~\0\0\0p\0\0\0\0~~}}||||\0|||||}}\0}~~\0p\0\0~~~~~\0\0~\x07\x07\0\0\0\0\0\0~}|{{{{\0|||}~~\0\0\0\08~~~~\0}}}~~~~\0\0\0\0\0\0|\0\0~}}|||||||\0{|||}}}\0}}}}}}}\0~~\0\0\`\0\0\0\0\0\0\x07\0\0\`\0~}}||||}~~\0\x07\x07\x07\x07\x07\x07\0~~}}}}~\0\0\0|\0~}}|{{zzz\0zzz{|}~\0~\0|\0\0~~}}||{{\0{{{|||}\0}~~\0~~}\0}||||||\0|}}~~\0@\0\0\0?\0\0\0\0\0~~~~~~\0\0\0~\0~~~}}}}}~~~\0\0|\0~}|{zzyyyyz{\0{|}\0p\0~}|{{{z{{{{\0|}}~\0@\0\0\0\0~~}}}}}~~~\0\0\0\0|\0\0\0\0\0\0\0\0\0\0~~~~\0\0p\0~}}}}\0}||}}~\0\0\0|\0\0\0~~}|||||\0||}}~~\0\0\0\0\0\0|\0~~~}}}}}}\0}}}~~~~\0~\0~\0\0\0\0\0x\0\0\0~~~~\0\0x\0\0\0~~~~~\0~~~~~\0\0\0~\0\0\0~\x07~~~}}}}\0~~~\0@\0\0\0\0\0~~~}}}}}}\0}~~~\0@\0\0\0\0\0~~~~~~~\0~~~~~~\0\0\0\0\0\0\0\0~~~~~\0\0\0x\0~~}}}\0}}~~~\0\0\0\0\0\0?~~~~\0~~~~~\0\0\0\0\0\0|\0\0\0\0\0~~~~\0~~~~~~\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\01\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0~~~~~\0~\0\0\`\0\0\0\0~~~~~~\0~~~~\0\0\0~~~\0~~~~~~~\0~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0h\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0q\0\0\0\0\0g\0\0\0@\0\0\0\0\0\0?~~\0~~~~~~~\0~\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0N\0\0\0\0\0\0\0~~\0~~~~~~\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0~~\0~~~\0\0\0\0\0x\0\0\0\0\0\0?~~~~~\0}~~~~~\0\0\0\0~\0\0~~~~~~~\0\0\0\0\0\0\0~~~~~~~~\0\0\0~\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0~~~~\0~\0\0\0\0\0\0\0\0~~~~}\0}}}}}}}\0~~~~\0p\0\0\0\0~}|{zzyxxyy\0zzz{|~\0\0\0\0~\0\0~~}}|{z{{{{\0{||}}~\0\0\0\0\0\0\0\0~~\0~~~\0@\0\0\0\0~~}}}}}}}\0}}}}}}}\0}}}}}}|\0|||{{{{\0zzzzzzy\0yyyxxxx\0xxwwwww\0wwwwwwx\0yz{|}@\x07	\f\v\b\0~|zxvuuttssss\0tuvwxy{\0|\b|
\v\r\r\v	\x07}{zyxvvuuuuu\0vvwwxyz\0{|}}~\0@\0\0\0~}|{zxwus\0qomkjhg\0eddccdd\0egjlpv|\0\b\r!',/0000.+&!\x1B\v{vrpnkifcbab\0bbbcdfi\0lorux|\0@\b\v\x1B !!"""! \f\b\0|xvtrqoml\0llmopqr\0twz}\0p	\f\f
\b~?|ywvsqn\0kigfedc\0bbbcegi\0jloruwy\0{}\0\0\0x~|{yxv\0srruy~@
").00111/)!
xpidaaa_\0][Z\\_bd\0fgjmrw|\0\0\x07\v #%'()(&$"
zvrlgc\`^\0]]^\`ace\0intz\x07\`\r!#%&&%#\r	}wromkifd\0cbbbccb\0bcdgikl\0npswz{|\0}~\0|\0~|zvqmjfb_]]\0_djrz
\`"/8>ACDFD>6,"
wne\`^]ZUQN\0OQUWY[_\0dkrx~	\`!$&(+.1331.,*'#\x07xqjc]WQNKJII\0KMQV\\bi\0px\f%|+16;>@>;60+$\vyrjc]WROMMLL\0KLOSX\\\`\0dhmsy~@	\f\r
\x07?ztnhb]W\0RNIFEFK\0R\\epz\`$4@INPSUVSLA5+"ymd_[WQIDA\0CGJLNQW\0_hqy\f\`!&*,/256752.+'#\fyqic]VP\0KHGHJLO\0RW\\cks{\0\f'.49>ACCB=6.&
\0ujaZTOK\0HFFGILP\0SX^emsy\0~\b\r~\r
\b\0{vrnjf\`ZURONL\0IGGHKQY\0cp|\b"2xCS_gjjjif_TE4%\fp\`QF@<71*&&\0+2:@FMW\0cq
\x1B#x+4;@BCDFGGEA;4-&\vrf\\TMG@9\x005569=BG\0NU^hs~	@(2;CHLNPOLG?6+ 
th]UNIEB\0@?@BFJO\0TZahpw}\0	  !!!!\f\b}vpje\`Z\0UOKHFFE\0EEGJOV]\0gr\0\x1B(5|CRakopmigbXJ7#wj[J;0,*($ \0"+6@HPY\0eu%,|4=ELOOMKJJHC;1(\rugZNF@:4.\0**-3:AH\0PZer\f\`"-7BLSWYYXVQJA5(\x1Bvj]QHA=97\x00546:?FL\0RYakt}@
!%&'()))'$!	{sle^XQ\0LGC@>>>\0?ADHMT[\0cn|\v\x1B(5xBP\`nwzytojcWG2	yl^N=.$! \0)6AKT\0_m}'/x6>EMRTRNKIHD>5* zm\`SIB<61\0-+-29BJ\0S]hup&/9AJPTUSQNJD;0$\vti^SIB>;:\x0099:>CJP\0W]dlt|@	#&()***)&"\f}?umf^XQL\0GDB@??A\0DHLQX_g\0oy-9|CNWalturkaYQE6"\ryh\\PB4&\x1B\x1B\0\x1B!,:IU\0\`ky\b(4x<BHMTXYVQLHEA:0%|qdXLB:51\0.,,.5<E\0NYdp}
\` *3;CILNNLIE@90&\x1B{pf\\TMGDA\0@@ACGLR\0W]cipw}\0\b #%'()(&"\x07\0xqjb[UO\0LIGECBC\0GKPUY_f\0ox'3|=FOYbiljd[SKA3"{j]RE8," !\0!"(2?NZ\0do{
(3x;@EKPSTRMGC@;4+	wmbVJA;86\x004325;EN\0Xbku\rp"+17=BFHHEA>:5.%}ulcZRMIH\0GFEFIMS\0X]afmt{\0\v"$%&'&%"	{tlf_ZT\0OLIGFFF\0HKPUZ\`g\0py*5|=FP[cfd_WQKC6&rg\\QD7-()+,+\0+/7CQ\\e\0mx *1|59>CGHFA;741,$\x07yqh\x07^UNIGFE\0EEGLT\\c\0krz\vx &+046888641-'!	zrjb\\VQNL\0JJJLNRW\0\\agmtz\0@
\x1B    \r\b{?tnhc]WR\0LIHHGGH\0JNTZait\0)4?LYdjjf\`\\VMA0\v}?pdVG:2.\0..,**/9\0EPX_ht@$)/5;ADC?;8751) 	}tjaYUSQNLKLP\0U[\`dipx\0\0\x07\f &*,--,,,+(#\f\x07\0yrkf\x07a]YURPP\0QSUWZ]b\0iouz~\b\`\r\r
\x07}xtp\x07lgb\\XUS\0QONOQTW\0[bmz\x1Bp&3CPY]^\\\\[UK=,\x1BxjZJ\x07?:99620\x002:EPX^d\0o{\b!%|+18<<:520/,&\f{tld\x07^YWWVTU\0VZ_eimq\0u|\x07
\f|\x1B !!!"## 	}wsplhc_[\0YYYYXXY\0[\`ejnrv\0{\x07\f~\f
\b~zwurokgc\0\`]ZXWVV\0WX\\dnx@\f.<FMQQRTTOE8*\vpaSJHGD?\0:7;DMU[\0\`gr~	p"(/5775200/*#	}vme^XUSRQ\0RSW[afk\0pu{	x!""! \f\b\0z?uromkgd\0a\`acddd\0egjnrtv\0x{\x07\b	x
\f\v	\x07~zvsrqpnk\0hffffed\0ddeglsz\0\r!-6~<?@AEFD<1&zmaYUUS\0OJGIOW^\0bejr|\`#),+)&$$%#	\0{?tle\`][Z\0YXY[_dj\0nrv{\x07\vp\x1B\x1B\x1B\f	\0|xutrqn\0ljiiijj\0jkmortv\0x{~\0x\0~}|{yxvtrqpnm\0lkkklll\0mnqstw}\0	(/354222/* \r?zsja[YZ\0[ZYXZ\`g\0mqty\x07\`\x1B"#"\b}yuqlheb\`_\0_\`adgjo\0tx|\0\b\fx\r
\b~|ywusrpo\0onnnooq\0rsuwy{~\0\x07~\x07\0}{xutrp\0omlkkkk\0kklmoqr\0sux{~\`\b\r"(-/1.*&$ \x1B\bwqmga\\WV\0Y]\`bdgn\0w~\b\v|\x1B\v\b~ysnkigdaabd\0fhjmqv{\0\0\x07\v\r\f	\x07\0|ywvuutsrrrst\0uuuvwy{\0|}}p\x07\x07\b\b\b\b\b~{yvsqpn\0ljihhhi\0iiikmps\0uvx|\0p\b\f!#'+,-,)%"	\0yrlf\`\\X\0WXZ]\`ch\0nv}\bx !!"! \x1B
~ytoligdbaab\0egjmquz\0\0\b\v\v\b\0~{zyxwvuuuuuu\0uuuuvwx\0xxxy{~\0\0\x07\x07\b\b\b\x07\0~{xvtrpnmkjj\0jjjjjkm\0oqstvx|\0
~!%()*(&%"
ysmgdbaaabc\0fkqvz@\b\v	\x07\0{wusroljh\0ikmnoqt\0x|\0\x07	|\v\r\r\f\v\v
\b\0~}||\x07|||||{{\0{{zzyxx\0xxxxxyy\0z{|}~\0\0\0\0\0~}|\x07zyxwvut\0tttttss\0stuuuuv\0wxy{}\0\`
\r\x1B\f\b?zvsqonm\0llmpruw\0y|\x07\bx	
\v\v\v\v
\b\x07\0~}||{zx\0wwxyzzz\0z|~\0x\0?\0\0\0\0~\0~}|{zyxwwv\0wwwxyyz\0z{{|}}~\0~}}~~~~\0~~~\0~~~~}\0{{zzyxw\0uuttttu\0vy{~\x07p\v\x1B\x1B\v\x07\0}{ywvtsst\0tvwwyz|\0~\0~\0\0\0\0c\0~~~}}}}}}\0|||||}}\0}}~~\0p\0~~}|{zyyxxxx\0xxxxxyz\0zz{{{||\0}}~~\0\0\`\0~}{\x07yxwvuts\0ssstuvx\0z}\b\v|\f	~{xw\x07vuutttu\0wxz{|~\0\0\0\0\0~}}}}\0|{{zzzz\0zzz{|}~\0~\0x\0~}|zyyxxww\0wwwxxyy\0z{|}~~\0\0~|zyxw\0vtttstt\0uuwxz}\0	\v\r\v	\x07}{zxvu\0utuuvwx\0y{}\0p\0?~~}}||\0|||||{{\0{{|||||\0|}}~~\0\0\0~\0~}||{zyxxxxx\0xxxyz{|\0}}~\0p\0~}{zzyxx\0xwxxyyz\0{}~\0x\x07\b					\b\b\x07\x07\0~~}|||||\0|||}~~\0\0\0|\0~}}||{{{{z\0zzz{{|}\0~~\0p\0\0~||{zzyyyyyy\0z{||}~\0\0\0~~}}||{{z\0zz{{{||\0}~\0\0x\0\0~~~}}}}}}}\0~~~~~\0\0\0\`\0\0\0\0\0\0\0~~}}}}|||||\0||||}}~\0\0\0|\0~~}|||{{\0{||||}}\0~~\0\0\0p\0\0\0?~~~}\0}}}}}||\0|}}}~~~\0\0\0\0\0|\0\0\0\0~\x07~~~~~~}\0}}}}}}}\0}}}}}}}\0}~~~~\0\0\0\0\0~~}||{{\0{{zz{{{\0||}~\0@\0\0~~~~~~~}~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~}}~~~~\0~~~~\0\0\0\0\0\0|\0\0\0\0~~~~\0~~~}}}}\0}~}}~~~\0~~\0\0\0p\0\0\0\0\0\0\0\0\0~\x07~~~}}}}\0}}}}}}}\0}~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0|\0\0\0\0\0\0?~~~}\0}}}||||\0}}}}~~\0\0\0~\0\0\0\0\0\0\0p\0\0\0\0\0~~~~~~~~~~~\0~~\0\0\0p\0\0~~~~~~\0~~~~~~~\0~~~\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~~~~~\0~\0~\0~~~~~~}\0}~~~~~~\0~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0~~\0\0\0\0\0~\0\0\0\0\0~~~~~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0?~~~~~\0}}}}}}}\0~~~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0~~~~\0\0@\0\0\0\0\0\0\0\x07~~~~~~\0~\0@\0\0\0\0~~~~~~~~\0~\0\0\`\0\0\0\0~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~~\0~\0\0\0\0\0\0~\0\0\0\0\0~\x07~~~~~~~\0~~~~\0\0\0\0~\0\0\0\0\0\0~~~~\0\0\0\0\0x\0\0\0~~~~\0~~~~~~\0\0\0\0\0\0\0>\0\0~~\0~~~~~~~\0~~\0\0\0\0\0|\0\0~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~\0@\0\0\0\0\0\0\0\0\0~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0@\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0L\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~}\0}~~~~~~\0~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0\0~\0\0\0\0\0\0~\0\0\0\0\0\0?\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0~~~~~~\0~~~~~~~\0\0\0\0p\0~|}||||}}~~\0\0\0~\0\0\0\0?~\0@\0\0\0\0\0\0\0|\0~~~~~~~~\0~\0\00\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\x07~~~~~~~\0\0 ~~\0~~~~}~~\0~~~\0\0\0\0\0\0\0~\0\0\01\0~~~~~\0~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0~~}~\0 \0\0~~}||||||||\0}}~\0x\0\0~}}}||||\0}}}~~\0@\0\0~~~~~~\0~~\0\0\0p\0\0\0\0\0\0~\0\0\0\0\0\09\0\0~~~\0~}~~}}~\0\0\0\`\0\0\0\0\0\0\0f~\0\0\0\0\0\0A\0\0\0\0l\0\0\0\0\0\0\0\0\0~}}}|{{zz{\0{{{{{||\0|}}~\0@\0~}}|{zz\0yyxyyyy\0z{{|}}~\0\0|\0\0~}}}}|||}\0}}}}~~~\0~\0\0\0|\0\0\0\0~~}}|||{zz{\0{|}}~~\0\0\0|\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~\0~~~~\0~~~~~}~\0~~~\0@\0\0\0\0\0\0\0\0\0\0~\0#\0~~~~~\0~}}}~}|\0}}}}||}\0}}}~~\0\0~\0?\0~\0\0~~\0\0\0\0l\0\0\0~}}~~\0\0\0\0v?\0\0\0F\0\0\0~~~~}}\0~~~~~\0~~~~\0\0\0~~~|||||\0|}~~~~\0\0\0\0\0~\0\0\0\0\0\0~}}}|{\0zyxyyzz\0{{|}~~\0~~~p\0~}}||{\0zzz{{zz\0zzz{|||\0~\0\0|\0?~}|{\0{{{{z{{\0{||}}}}\0~\0\0p\0~\0~~\0~\0~~~}~~\0~~~}}~\0~\0\0p\0\0\0\0\0\0g\0\0\0~\x07~~~}}}~\0~~~}~~~\0}}~~~~\0\0\0\0\0\0~~}}}}\0}|||}}}\0}}~~\0\0\`\0\0~~}}~\0~}}~~~~\0~~~\0\0\0\0\0\0\0\0\0\0\0\0~~~~}\0~}}}}}}\0~~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0[\0\0\0~\0G~~~~~\0~~~~\0\0\0\0c\0\0\0\0\0~}~~~\0~}}~\0\0\0\0|\0\0\0\0\0C\0\0\0\0~\0\0\0\0\0\0~~~~}}}}}~}\0~~~\0\0\0p\0\0\0\0\0~\0~~~~~\0\0\0\0\0~~~}}\0}}|}}}}\0}}}||{|\0|||{{||\0|||}}}~\0\0~\x07\b\b\b						

					\b\b\x07\x07\0?~~~~~~~\0~\0\0\0\0x\0\0\0\0\0\0~~~}\0}||{{zz\0yyxxxxx\0xxyyyyy\0yyyyyyy\0yyyyxxx\0xxwwwww\0wwwwwww\0wwvvuvx\0{~\x07
|\x1B\v\b?~|zyyz|\0}~\0\0t\0~~\x07\x07\b\b	
\v\f\f\f\f\v


	\0~?}{ywvvv\0uusssst\0tuuvwxz\0||}}~\0~}|{zy\0xwusrqp\0omkjihg\0fedcccc\0ccdeiou\0|	&~+02256652,&"\v{tqm\x07hd\`]^_a\0cdcfikp\0tux|\f\` %(*+)(('&$ \f\b}wspmkhfeefg\0iijkmpt\0wy|	p\r\f
\b\0|xtplgc_[XVU\0TSQRTVX\0Z\\]\`ceh\0jmnosvy\0~
#~+269<<:<:74-%\fzqic\`]XURQ\0UX[^\`\`e\0jmrvwz\0\r $(.48;;98864/("\x1B\bxpib^[XUTU\0WZ]adhm\0rx~	\rx\f\b}yuq\x07mjfa]YU\0SQPNMMN\0QTWY[^b\0fimpruw\0y{}~~\0\`\v(/154001/,(\f
|sjdbb_[XTU[\0^cfehns\0x}\fp"$(.3686321/+%\r\b{tmgc\`]ZXY[^\0bfjmrx~\0	\f\x1B\r\b}?zvqmige\0c\`]ZXVV\0UUTTUX[\0^abehlo\0rtvxxz{\0{{ywwy|\0\x07\v&(-.,/10.*"{tml\x07kea[XZ^\0adfeipt\0y}|}
\`"),01/..-,(#\b{uol\x07ifcaabd\0gjmpty}\0\x07\b
\r\r\v\b}{xuqnmll\0jhfdbbb\0\`_^]^ab\0defhjmo\0qqrrrst\0rqpmnnm\0puy
p#*1567:;:72+% \x07|tolhc\\VT\0UX[]]^a\0flprstx\0~\v~$+14544431-("
}vrnkgc\`\`\0acegilp\0ty|\0p\b
\v\v\v\f\r\r\f
\x07}zwussrqomkj\0igfdb\`a\0abcccdf\0hjjjkll\0nonnnmn\0opsx~\f\`*18==<=>=:4,$\rxnheb]V\0PLNRUXY\0Y]djqtv\0w{
| $+28<=:9863/)"\x1B\r\b{tolifb\0_]^\`bdf\0ilptx{}\0\x07	\v\f~\r\f
\b~zwusrpnl\0jiihfdc\0aabcddd\0degijij\0jjlmmnn\0mnppqrs\0v}
\x1B|#.6;>=;<><92( 
tkdb_XRLH\0KOSVWY^\0fnuy{~@\f\x1B $'*06898420-)#\v\x07}xtqomjgdc\0deeffgk\0nqtvwy|\0\b
\f~\f\v	{xv\x07utsrpon\0nmlkigf\0ffedcbb\0bbbaabc\0dfhjkor\0uwyz{}\0@	")169<;::950) \r\buld\x07^[XSNJI\0LQUZ]bj\0s{\b\v|!$&').1342/-*'#\f\b}xto\x07ljgd\`][\0[\\]^\`bf\0kpuxz~@
\x1B\x1B\r\b|zxuroki\0gfc\`]ZY\0YYXXWXZ\0]\`bceim\0qux{~\x07\`
\f\f\v\v\v
	\x07	\f#'*)&&%#!	~vmfa\`_\\Y\0USW\\bgj\0lry\b\bp
\r\x1B !"&*--,(%"
\0}yuo\x07jeca\`_\\\0ZZ]\`ehk\0nsy\b\vp\x1B\r	\0{?vroligd\0a_][ZYW\0VVWY[\\_\0bejnsvz\0~	\f~\r
\x07~zwx\x07z|x! 
{tom\x07kgb]Z]a\0ehjlpw~\0\x07
\v "#$'*,+)$\x1B\ryuq\x07nkhecbc\0ceeegko\0ty|\b\rp\v\x07\0|wrmige\0b\`^\\[\\\\\0]]^_aeh\0lnptw{\0\x07	

	\b\x07\x07\x07\0}{ywtqnlkmqu\0wz~\vx "%&&#	zsnkjgc\`^\`ehl\0orv|\x07
p\f\x1B\x1B\x1B\x1B\f	}{xvutsrqrstt\0uuvy{}\0\0\b	


\v\f\f\r\f\f\f\f\f\v
\b\0~{xu\x07qomkjhg\0ffeefee\0fhilnpr\0ux|~p\x07\b	\b\b\b\x07\0~?{xvroli\0hgfhlos\0x|\b|!$%&%!\x1B\v~ywurnkiknqsu\0vy~\x07\x07x\b
\f\r
\0~}z\x07xwwwwvu\0ttwxyzz\0z|~\0x\b			

\v\v\v	|yuqomkjhgf\0fghijln\0qux|~\`	\v\f\f\v

	\b\0~?{ywspmj\0hfdb\`__\0\`acehov\0}	!(~.1136773-& \x1B	\0xromiea_aehj\0mnqw|\0\`\x07	\f\v\b\0~|zy\x07vtrqqqq\0poopqst\0uvwz|~\0@\x07\b\b\b\b\b\b\b\x07\0~|ywusrqqp\0ppqstuv\0wy{}~~~\0~~}|z\0ywvtrpo\0mlllkkl\0moqrstv\0y{}~\`\b\f\x1B!%'(&%%&$ 
\b~wqnmmkiggim\0quwz}\b\`\f\v	\x07|xvtsqomkklm\0mmmmnpr\0stuwy|\0\x07	\f\f	\x07~zwtrpn\0mkkkkll\0mnpqstv\0wyz{|}~\0~~~~}}}\0}}}}~~~\0~~~~~}|\0|{zzzzy\0yyz}\0p\x07
! \r	~?ywvusqo\0oqtwyz|\0\x07
\f\r\r~\r\v
	\b\0~{zxusq\0ooonnnn\0oqrstuv\0xz}~\0p\b
\v\f\r\r\f
	\b\0}{ywtrpnm\0lllllmo\0qruwxz{\0}~\0|~~}~~}}}\0}}}}}||\0{{{{{zy\0yxyy{|~\0\x07\v~\x1B\x1B\v\x07}||{yxwxz|~~\0\0\x07\b\b~\x07\x07\x07}|{zyxwwwxww\0wxy{|||\0}~x\0\0\0\0\0\0\0~\0?~}}}{yx\0xxxxwww\0xyzzzz{\0||}}}||\0|}}||{|\0|}}}}}~\0\0\0\0\0~}|{\0{{{zyyz\0{}~\0\x07x\v\r\v\b\0?}|zyxyy\0yz{|}@\0\0\0~~\0~}}|||\0|{{{z{{\0{{{{{{|\0||}}~\0\`\x07\x07\x07\0~|{yxxwvv\0uuuvwww\0xxyz{||\0}}~~~\0\0\0|\0\0~|{\x07{zzyxww\0wwxyy{|\0\x07	\v\r~\r\v	\x07\0}||{{{{||\0~\0|\0\0\0~~~~}}}||}\0}}}}~\0\0\0\0\0\0~}}||{zzyyxx\0xxxyyz{\0{|}}~\0\0\0\0\0\0\0\0\0\0\0~~~~\0}}}||||\0||||{{{\0{{{{{{|\0|}~\0x\b	\v\f\r\r\f\v
	\b}|{{zzzz{|}~\0~\0\0|\0\0\0\0\0\0\0\0\01~\0\0x\0\0\0\0\0\0\0~\0~}}}}}|\0|{{||||\0||}}~~~\0~~\0~~\0~~~}}|}\0}}}}}~\0\0\0\0\0~\0~}|{zzz\0yyxxxyy\0zzz|}~\0@\x07	
\v\v\f\f\f\f\v\v
	\b\x07\0~}|\x07{{zzzz{\0{||}~\0@\0~}}}}\0}||||}}\0}}}}}}}\0}}}}}}~\0~~~~~\0\0\0x\0\0~~~}}\0}}}}~~\0\0\0|\0\0~}|{{zyyx\0xxxyyyz\0{|}~\0\`\0\0\0\0\0\0\0\0\0\0~~~~~}}}\0~~~~~~\0\0\0~~~~}}}\0}||||||\0|}}}}}}\0}~~\0\0\`\0\0\0~}}||{{{\0zzzzzzz\0z{{|}~~\0\0~\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0~~~}}\0|||{{{{\0{{{{{||\0||}}}~\0\0\0~\0~~~}}|||\0|||||||\0}}}}}~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\`\0\0~~}}|||\0|||||||\0|||}}~~\0~~\0\0\0p\0\0~~\x07}}}}|||\0|||}}}~\0~\0x\0\0~~~}}}}}}\0~~~\0\0\`\0\0\0\0~\x07~~~~}}}\0~~~~~~\0\0\0\0\0|\0\0\0~~~}}}|||}\0}}}}}}}\0~~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0}}}}~~~\0~~\0\0p\0\0~~~~~~~~~~\0~~\0@\0\0\0\0\0\0?~~~~}\0}}}}}}}\0}}~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\09\0\0\0\0<\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~}}}}}\0}}}}}~~\0~~\0@\0\0\0\0\0\0\0\0\0~~~~~~~~\0\0\0\0\0x\0\0\0\0\0\0~~~~\0~~~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~}}}}\0}}}}}}~\0~~~\0\`\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\f\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0}}}}}}}\0}~~~~\0\0\0\0\0\x07~~}}}}\0}}~~~~\0\0\0\0~\0\0~~~~~~\0~~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0~~~~~~\0~~~~~~\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~\0~~\0\0@\0\0\0\0\0g\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0C\0\0\0\0\0\0\0o\0\0\0\0\0\0\04\0\0@\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~\0~\0\0~\0~~~~~~~\0~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0y\0\0\0\0\0\0\0\0\0\0~}~\x07~~}}}~\0~~x\0~?}~\0\0\f\0w}{\0||{z{{{\0{|{}\0 \0\0\0\0g\0\0\0\0\0~\0~}~}}~|}}|}~~\0}~~}\0~\0~\0~~~}}}}{\0{|{{||{\0|||}~~\0\0\0\0\0x\0\0\0\0\0\0\0\0g~\0~~~\0~~\0\0\`~\0\0\0\0|\0~~~|}~}|\0|}}}||}\0}}}|||{\0||{{{zz\0{{{zyz{\0zzzzzz{\0|}}~\0\`\x07\x07\x07\x07\x07\x07\b\x07\x07\0\0\0~}}}}|||||}\0|}~\0@\0\0~~~~~~~\0~}}}}}}\0|||{{{{\0zzzyyzy\0xxxxxwv\0vuuuutt\0tsssssr\0rrrrrsv\0z|~~~\x07\`
\v\v\v\v\r
\v\r\r\v\x07\x07\b\b\0~~~\x07{xwvvww\0utsstvw\0xyy{}\0@\x07\x07\b	

\v
	\b\b	

	\b\b\b\b		\x07\0}}}}|{zzzzzy\0xxwwxxx\0xyyyyzz\0yyxyyzy\0yxxxyyx\0wwvwwwv\0vuttttr\0qpooonm\0lllmptx\0z}\x07x "" \f\x07\0\0}?yvsssqn\0ljjklll\0klmoruw\0y{~\b
x\f\r\r\r\v\b\0\0~?|yxxyzy\0xwxz{{z\0zz{}\0~\0|\0~~}|z\0xwwvuts\0rrrsrrq\0pppqqqq\0qsuuuuv\0uvwwvut\0stuuttt\0vz\x07	x!%'&#\x1B
\x07\x07\0{wvwwurokk\0llkjhfg\0jmoppqs\0x}\b\v|\x1B\x1B\f\b}yvtrqppoooo\0pqrtwy{\0~\x07
|\v\f\f\r\f\v
\b\0~}{y\x07wutsqon\0mmmllkl\0mmmmmno\0prstuvy\0z{{{||}\0|{zyyxw\0vvvx|\0\`	\x1B!%'&"\x1B\x1B	~{vqnmoonk\0hefhiii\0gfimqtu\0vwz\b\vp\r\x1B\x1B\f\bzxvtqm\0jhhijjj\0jlpswy{\0~\x07\v~\f\b\0}zvt\x07rpnljhg\0gfffffg\0hjkmnop\0rtvwyz{\0}\0|\0}{y\x07wvusrsv\0z~	|#'(&!\x1B\x1B\0}|zwqljjl\0lkhedeg\0iiiiilq\0vy|}\x07\`\f! \x1B\r\b}ytpnmkigeegi\0lmopty~\0\x07
\x1B\x1B\f\b\0|ywt\x07pmjhggf\0feddfgi\0jjkmpsu\0wxyz}@\0}{y\x07vspnmlk\0lpuy}\0\`
!  $*--)#\x1B\v}?{zwqlhf\0hihfdaa\0defgfgi\0mrw{}@\f\x1B!$%#!\x1B
\0|wrnljhfdcbc\0fhloqty\0}\x07\v~\x1B\r
~zvr\x07pmjhged\0ddeffgi\0jmnpqsu\0wy{|}~\0@\0\0~}zxusqoml\0jlqv{@\f"$#"&+//+$\x1B\vzwvslf\`\0^\`bba^[\0[^aceee\0hmt{\0p\b\r $(**(# \x07~{wrlgddcb\`^\\\0^bgknps\0x\0\x07\r~ !!\f	~ytp\x07lkigdb\`\0\`bcdddf\0ilprsuw\0z}\0|\x07\x07\x07\x07\x07}{xuromki\0hhimsx{\0\v"$~$$(-00+%!\v{wuqjd\`]^\`\`\`^\0\\]_bdfg\0hkpw}\`\b\v !!"%())&"	|xtqlfa_^^^^]\0\\_chmru\0z\0\x07\x1B~ $&'%"\f\x07\0|xsn\x07khgecba\0abceffg\0hknqsuw\0y|\0|\x07\b		\b\x07\x07\x07|zxvsnkhf\0eeehnrw\0|\0#~$%',/0.($!\r}xuqke\`]]___]\0\\]_bdfg\0hkou|\`\b\v\x1B!!!#%''%"\x1B\v~xtplgc\`_^^^^\0_adinty\0~
!~#&'(((%"\x1B\v|xtpmifddcbb\0bbceghj\0kmosvxz\0|~\x07|\b				\b\x07{xuspmjge\0ddfkpuz\0~\v#&~%'+032-&"! 
\0yvtoha[Z\\^^][\0Z\\\`cfgh\0ilry\x07\`	\f!! !#%&&"\x1B\rzvrnid\0\`___\`_\`\0beioty~\0\v"%()**)&#\x1B\f\x07}xsokhf\0c\`_^_\`\`\0abdfikm\0npsvy|~\0\0\x07	





\b|yvspmjgdba\0\`bflrw|\0\0\x07#'((+1562,&$#!\x1B}xvrkd]\0Z[]]\\[Y\0[^adffh\0kou|\bp\v\x1B!!!"#%%# 	|wsojea\0__\`aaab\0fkpvz}@	!#%(++)%!\v{xuqlhec\0aaa\`_\`b\0egiklor\0uxz|~\`\x07	\v\v\f\f\r\r\f
\b}yvrom\0khea_^^\0\`diotz\0@\x07#(+,.37861+(&#
{wrld]Y\0Y[[ZYWX\0\\_bdefi\0nsy~
p !"$%%# \x1B\v?zuqlgc\`\0\`\`aaacf\0jouz}\b\`!#%'('$ \x1B\vzwtqnifdc\0cccbbdg\0jlmoqtw\0z|}\x07p	

\v\v\f\f\v	\0~?zwtpnlj\0geb\`\`\`a\0ekqw}	\`%*,-.2675/*&$!\byuqjc\\XW\0ZZZZYZ]\0adghilp\0v|\0\x07
|\x1B \r\x07|xtpkfbaa\0bccdein\0sx|\0	x "$%&$!\r\b}yur\x07pmigeed\0eddegil\0nprtwz|\0~\0\b	|


\v\f\f\v	}yvromkig\0db\`\`abf\0kqw}
p$*--.2553.)%"\x07yupib\\YYZ\0[[[[]ae\0gikmpty\0~	\f~\x1B\x1B\x1B\x1B\x1B\x1B\r	zvr\x07ojfcbbc\0defilqv\0{\x07\f|\x1B "#$$"\x1B\v\0{vspnligeeef\0ffgikmp\0qsux{~\0\0\b	
		



\b}zw\x07spmljhf\0cbabcfj\0puz\0x %)*+.120,&# 	{wsmf\`\\[\\]\0]]^_cfi\0kmorvz~\0	\f\x1B\x1B\x1B\f	}yuqmjfdcbcd\0fhkosx|\0
\x1B!"###!\x1B\r	zvrolj\0hgfeefg\0hikmort\0wy{~p\b	\v\v\v\v


	\x07}{xuqoljiged\0cccefin\0tz\0\v\x1B|"(++,.00.)#\x1B\v{uqm\x07hb^[Z\\]\0_aceimq\0uxz}\0\x07p\v\f	~?{wsqnli\0gfeegil\0nquz	\`\r\x1B!""!!!	|?wrolkji\0gffgikl\0mnqsvyz\0|~\0\x07|\x07\b	


	\b\x07~?|ywuspm\0kiihgfe\0efhjkmp\0v|\b\r|%)+*)*,+("\v|uol\x07ifb^\\]_\0cehjmqv\0{\x07
|\r\r\v
\b|{y\x07wurpnnm\0mlllnqt\0wz~
\rx	|yuqonmml\0lllmoop\0qstvxz|\0~\0\x07~\x07\x07\x07\b\b\b\x07\0|zxutrpo\0mlllllm\0mnprtvx\0z~\x07
| !! \v\bztq\x07nljhfef\0hknpsvy\0}\x07\b	~
\v\f\f\v\v


	\b\0}{zyyxxwvvw\0wxxxy{}\0~\0\b
~\v\f\r\r\f
\b~?{ywvuts\0rqqrsss\0ssuvxyz\0{}~\0x\0~|{yxwuts\0rrrrrst\0uvwxz{}\0\0\x07
~\f\r\r
\x07\0}?zxutrqq\0pqqstvx\0z}x\x07\x07\x07\0~~}|||||||||\0|||}}~~\0~~~p\x07\x07\x07\x07\x07\b	

	\b\x07\x07~|{{zxv\0utuvvuu\0uuwxyyz\0z|~\0p\0~}}||zyx\0xxxwwww\0xyzz{|}\0~\0|\x07\b	\v\f\r\r\r\r\r\r\r\v
\b\0~|{z\x07yxwvvww\0yz{|}\0@\0\0\0\0\0~~\x07~~~}}~~\0~}~~\0@\x07\x07\b\b			\b\x07\x07\0~}{zywwwwvvv\0vwxyyzz\0{|}\0\0\0p\0\0~~~}|{z\0zzzyxxw\0xxyyzz{\0|~\0\0p\0~~}|||\0|||||}}\0~\0\0x\0\0?~~~~~~\0\0\0\`\0}}|\x07{zzyyyy\0yzzz{{{\0|}}~~~\0\0\0\0~\0\0\0\0~~}}||{zzz\0zzzz{||\0}~\0p\0~~~}}}}}\0}}}}}~\0\0\0p\0\0\0\0\0\0~}||{{zzzz\0{{||}}~\0\0\0\0\0~\0\0\0\0O\0~}}}}}\0}|||}}~\0~~\0\0p\0~~~}}|||}}\0|||||}}\0}}}}~~~\0~~~\0@\0\0\0\0\0\0\0\0\0\0\0c\0\0\0\0\0~}|\x07{{{zzzz\0z{{||}}\0~\0\0\0x\0\0\0~~~~~}}}|||\0|||}}}~\0~~\0\0p\0~~}}||||\0|||||}}\0}~~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~}\x07}||||||\0|||}}~~\0\0\0|\0~~\x07}||{{{{\0{{||}~~\0\0|\0~}}||||{{{\0{{|||||\0|}}~~~~\0\0\0\0\0~~~~~\0~~~~~~~\0~~\0@\0\0~~}}}|||\0|||}}~~\0~\0\0|\0\0~}}\x07||{{{{{\0{{||}~\0\0~\0~~}}}|||||\0||}}}}~\0~\0\0p\0\0\0~~~}}}\0}}}}}~~\0~~~\0\0\`\0\0\0~~\x07}}|||||\0}}}}~~\0\0\0p\0\0\0~~}}}||||{\0{|||}}~\0~\0|\0\0~~~~}}}}}\0}}~~~~\0\0\0\0\0\0~\0\0\0\0?~~}}}}\0}}|||}}\0}}}~~\0\0\0~\0\0~\x07~}}}}}}\0}}~~\0@\0\0\0\0\0\0?~~~}}}\0|||||||\0|||}}}~\0~\0\0x\0\0\0~~\x07~~~~}~~\0~~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~~~\0~}~~~~~\0~~\0\0\`\0\0~~~}}}~~~\0~~~\0\0\`\0\0\0\0\0~~~~~~~~~\0~~~~~\0\0\0\0\0\0~\0\0\0~~\x07~~~~}~~\0~~~\0\0\0\0\0\0\0\0\0~~~~}}\0}}}}~~~\0~~\0\0\`\0\0\0\0\0\0?~~~~~\0~}}~~~~\0~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0x\0\0\0\0\0\0\0~~~~~~\0~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0~~~~~~~~\0~~~~~~~\0\0\0\0\0\0\0\0~\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\x07~~~~~~~\0~~\0\0\0\0\0~\0\0\0\0\0\0\0\x07\0\0\0\0\0\0~\0\0\0\0\0\0\0\0?\0\0\0\0x\0\0\0\0\0\0_\0\0\0\v\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0?\0\0~~~~~\0~~}}}}}\0}~~~~~~\0~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0|\0~~}|zy\0yxwvuuu\0ttuuuuv\0wwxxxyy\0z{|}~\0\`	\f\f	|?xvtrnki\0ijklmmo\0sw{p
\r\f	~?|zwtrqp\0oooopqr\0uwy{}@\b
\f\r\r\f
\b}{xurpom\0llkkkkl\0npqsuwy\0{}~p\0}{ywuuvw{\0}\0\b\r|	\0{tnlmookhfhns\0wyy{	\`
	\b
	\0|wsqqpn\0ljjloqr\0rruy~\`\x07	\f\x1B\r
~xtqoli\0fdbcdfg\0ilqv{\0\`\x07\v
}xto\x07kgda_]\\\0[[\\^_ac\0fimpruv\0x{\vx!"$)/341,'%$!\x1Bxqmi\x07bXOJKOR\0QONR\\hr\0y}
$|%$&*044/)#! \f{xvrkb\\YXXXV\0TUY_fkm\0ot|x$).//-+*)'#\v~vnga]ZXVT\0TTWZ^bg\0lsz\x07\fx\x1B\r	ytnjfc\0a^][[[\\\0\\]_\`cfh\0jmpsv{\0@\x07%(+18<>=841/*#\b|?tng^RHC\0CFHHFGL\0Wcow|\r\`$+-.05;?>81*&#\fxrmg\`XQML\0LMLMOT[\0cjnrw	@"&+/35641.,)%	{ria[UR\0ONMLLOT\0Z\`flt}@\r#&)*)'#\v}wpk\x07fb^ZWVU\0VUVWY[^\0adhkosw\0{~\b|',...28;;5,$ tib_[SIB@E\0KPQQS[h\0u\0\x07\f&~/32124784,#\fyohd_[VQNMMO\0RTW[biq\0w|\0\r\x1B| $&(+-//-)&#!\f\x07{tmfa]ZWU\0TTUX[_c\0hnu}
p"$###!\x1B
\0ztmgc\`^[XUTT\0VWXY[^b\0filnrvz\0~\f~&+,,.39<;5.(%"\x07ynhd\x07^VLDCFK\0NOORZeq\0|\b#+~...04762,$\b~uokga[URQRRS\0SUY_fmr\0uy\x07x $),..,)'&$!\v\x07{tmgc\`^[Y\0XYZ\\_be\0jpw~	\rp    \f\x07{vpkfb_[YXWV\0VWXZ]\`d\0gjmquy|\0\x07\f~$)*+,17;:5.(%# 
{pjf\x07aYNEBEJ\0NNNPVan\0y\0\f&~*,,.1341,%\b\0xqlgb]XTRQPQ\0SUY^djp\0tyx"%(,/0/+'%$"\v|uohc\`^]\\\0ZYZ]\`dg\0kpv|\x07\fp\x1B
{vpj\x07fc\`\\XUS\0STUVWY\\\0\`ejnquy\0~\x07
\r~!)-.-.27:82*# \x1Bvlfc_WLECF\0LOPPSZf\0r|\b!|(,--.022.)"\f|tnje_ZVTRRR\0SUW[\`fl\0rw}
x!%(+,---+)&#\r\b|void\`\\ZX\0XXY[^ad\0jpv|\vp\x1B  \x1B\v\x07{uok\x07hd\`\\XVV\0VVVVWZ^\0bfjmrw|\0\0	\f"(++)(*./-'\x07{?oe\`^[TM\0GFKQVXZ\0]ep{\fp%+--,++,+'!\r\b|unid\`]ZWU\0TSUWZ\\\`\0ekry~\x07\`\r"&()*,./-)$\b{vpjd_[\0YYYZ[\\_\0dimrw}@\v\x1B "#" \v~ytokfb^[Z\0YXXWXZ]\0\`dgjnty\0~	\v~!"!\x1B !\r\v
\bzogccc^VQQU\\\0acdflu\0\b %'%#!!" \v\x07~?ytokhea\0_]\\\\[\\^\0\`bfkpuz\0\x07\r~ "#%&''%!\v\0}zuo\x07ieccccb\0bbeimoq\0ty\0	\f|\v\x07ztoliea^\\ZYY\0Z[]^\`di\0mqtx~\`\b
\f ! !#$"\rzpifeb\\UQ\0QV[^\`ad\0kt}
x $%%$###!	{vqmhda_]\\[\0Z[]\`dhm\0rw|\x07\fx\x1B#%&''('% \r\x07|wsnjfb\`_\0_\`bcfhl\0ptx|\vp\x1B\r
|wrn\x07jheb_]\\\0\\^__\`bf\0jnruy}@\b	
\v\f\r\r\v	\b
\vztqq\x07oic^]\`d\0fffhlry\0\v~
\x07~zvsnkihgeccd\0gikmqv{\0\0\b\f """##"\r\b~zwtpmjigghh\0jlnpruw\0z~	\v\r|\f\x07{wsnjf\0da_^]^^\0_adgkor\0v{~\x07
x\v\f\f\f\f\v
		\r\b?wrqpke_\0\\\\_acdd\0fkrz\0\x07p\r\x1B\x1B\x1B\x1B
\x07\0{vrnkigec\0aacfhjl\0ou|\b\fx !!!!"!\r	~yusqmjfef\0ghjknqt\0x{~\0
x\r\r\v	\x07|xusqnljhggg\0ghijkmp\0suwy|@\x07\x07\x07\x07\x07\b

	\v{yxtle\`_\0bccbabg\0nuy|\0\x07p\f\b~yvs\x07okhfedd\0eefgjpv\0|
|   \v\0{xvurolkkklm\0oqtwy{}\0	\v\f\f~\f\v

	\x07|{zyvspn\0mnnnmmm\0oqsuuwx\0z}~\0x|zz~\b	\r\f~|ytmiffg\0ggfgjns\0x{
x\v	\0}zwsqonnmlll\0moqtx|\0	\f\r
\b~}}}}{z\0yyyyzz{\0{|}}}}}\0~\0\0D\0\0\0g\0}{{{{zywwwww\0wvuuvww\0wwxy{|}\0}}}}~~}\0|{zz|\0\`\x07\x07	\f\b~ysmjhgfd\0cdfimqu\0y~\b\f|\f
\x07~{xvtrqpommop\0qrtx{~\0	\f\r
	\b\b\x07\0~}{zyyxwv\0uuuvvuu\0vxz|}~\0\0\x07\x07\x07\b\b\x07\0|zy\x07wwvusrr\0rsssssu\0wyz{{|}\0~\0\0D	\v\r\f	~?zwurnig\0gijkkmq\0uy}	\rx\f	\0~}{ywvuuttuu\0uuwyz{{\0}|\b		\b\x07\x07\b		\b\0\0~|{\x07{{{{yxx\0xyzyyyz\0{|}~~~~\0\0~|zzyxvtsst\0tssstvx\0yz{|}~\0@\x07\b\b\b\b
\f\r\r\r\r\f\v	\b\0}zwtqon\0mmlmoqs\0vx{\0\b\vx\r\r\v	\x07\0}{yw\x07vutssrr\0stuvwy|\0~\b
~\r\r\f	\x07\0~}|{{zzzzyzz\0{||||}}\0}}}}}}|\0}}~~~\0@~|zxwu\0trqqrrs\0stuxz{}\0~\0~~|z\x07xvutsss\0stuxy{}\0	\v\f\r~\f
	\x07~?}{zxwvv\0uuuvxyz\0{}x\x07\b\b\b	

	\b\x07\0~~}}}}}~\0@\0\0\0~|{zyxxwwwx\0xy{|~\0\`\x07\x07\b\x07\0~?|zxvtsr\0rrrrsuv\0xz|~\0p\0\0~|{\x07zyxxwwx\0yz|~\`\x07	
\v\f\r\r\r\f\v
	\x07\0~}|{yxxyyz\0z{|}~@\0\0\0\0~\0\0\0\0x\0\0\0~~}\x07}|{zzyy\0xxyyyyz\0|}~p\0~}{\x07zyxxxxw\0wxyzz{{\0|}~~~~~\0~~~~~\0\0\0\x07\x07\x07\x07\x07\x07\0~?|{zxwvv\0vvwxy{}\0\b	
~\v\r\r\r\r\r\f\v	\b\x07\0~}|{{{|}}}}\0~\0|\0\0\0\0\0~~~~~~}||\0||||{{z\0zzzzzyz\0z{{||}~\0\0\0\0\0~\0~}}|{zzz\0yyyyzz{\0{{|||}~\0~~~~~~\0\0\0|\0\0~}}}}}|||}}\0~~\0x\x07\x07\x07\0~~\x07~~~}}}~\0~~~~\0\0\`\0~~~~~}}||}~\0~~~\0\0\`~~~}|\0{zzyyyy\0yyyz{||\0~\0\0|\0~}||{{{{zzz\0{{||}}~\0~~\0\0p\0\0\0~\x07~~~~~~~\0\0\0\`\0\0\0\0~~~~~~~~~\0\0\`\0\0\0\0\0\0\0\0\0\0~~~~\0~~~\0\0\0\0\0x\0~~}}}|{{z\0zzzzz{{\0{|}~~\0@\0\0~~}\x07}||{{{{\0{{{||}}\0}~~\0\0\`\0\0\0\0~~~~~~~\0~~\0@\0\0\0\0~~}}\0}}}}}~~\0~~\0\0\0x\0\0?~~~~}}\0}}}}}}}\0~~~~~~~\0~~}}}}|\0|||}}}}\0~\0\0|\0~~}}}}|||\0}}}~~\0\0\0\0\0\0\0\0~~~~\0@\0\0\0\0\0g\0\0\0\0\0\0~~\x07~}}}}}}\0}}}~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0~~\0~~~}}}|\0|||||||\0}}}}}~~\0\0\0\0\0x\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~\0~~~~~~~\0\0\0\0\0x\0\0\0\0\0?~~~~\0}}}||||\0|||||}}\0~~~\0\`\0\0~~~~~~~~~~~\0~~~~~\0~~~~~\0\0\0\0p\0\0\0\0\0\0\0~~~\0~~}~~~~\0~~\0\0\`\0\0\0\0\0\0\0\0\0\0\x07~\0~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~}}~}\0}}}}}~~\0~~\0\0\`\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0x\0\0\0\0\0\0\0\0~~~~~~~~\0\0\0\0\0|\0\0\0~~}}}}}}}}\0~~~\0@\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0~~~~}}}}}~~\0~\0\0x\0\0~~~~~~~~~\0~\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~~}}\0}||}}}|\0}}~~~\0\0\0\0\0\0\0~~~~~~~~~~\0~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~\0\0\0\0\0~~~~\0\0\0\0p\0\0\0\0\0\0\0\0~~~~~~~~\0~\0@\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0c\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0y\0\0\0\0\0\0\0\0\0~~~\0~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0 \0~~~~~\0~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~~\0~~~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0c\0\0\0\v\0\0\0\0G\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0A\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0p\0\0\0\0\0\0\0\0~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\`\0\0\0p\0\0\0#\0\0\0\0p\0\00\0\0\0\0\0|\0\0\0\0\0y\0\0\0\0\0;\0\00\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0K\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0<\0\0\0\0\0>\0\0\0\0\0|\0\0\0\0\0\f\0\0\0\0\0\0?\0\b\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0y\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0F\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~\0\0\0~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0;~~\0~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0N\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0;\0\0\0\0\0\0\0\0\0\0\0\0\f\0\0\0\0\0>\0\0\0\0\0_\0\0\0\0\0\0L\0\0\0\0\0\0?\0\0~\0\0\0\08\0\0\0\0\0s~~\0~~~\0\0\0\`\0\0~\0\0\0~\0\0	\0\0\f\0\0\0\0s\0\0\0\0\0y~\0\0\`~\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0g\0\0\0\0{\0\0\0\0\0\0~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0_\0\0~\0\0\0\0f\0\0\0\0~}~\0\0 \0\0\0\0~\0\0\0~~\x07~~~~~~~\0\0\0\0l\0\0\0\x07~~\0\0\0\0\0\0\0\0\0\0\0\07~\0\0\0\0x\0\0\0\0\0|\0\0~~~~~\0~~~\0\0\0\0\0x\0\0\0\0\0\0\0~~~\0~~~~~\0\0\0$\0\0\0\0<\0\0\0\0\0^\0\0\0\0\0\0?\0~~\0~~\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0X\0\0\0\0\0\0\0\0\0\0?\0\0\0\0'\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0\0\0\0\0C\0\0\0\0s\0\0\0\0\0\0\0\0\0~~~\0~~~\0\0\00\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~\0~\0\0\0\0\0\0\0w\0\0\0\0\0y\0\0P\0\0\0\0\0y\0\0\0\0\0|\0\0\0\0\0\0~\0\0\0F\0\0\0g\0\0\0g\0~\0A~~~\0~~\0\0\0\0\0\0\0\07\0\0\0\0\0\0\0G\0~\0!~\0\0~\f\0\0\0\0\0\f\0\0\0L\0\0\0~~~~}~\0@\0\0\0\0\0\0!~~\0\0\0\0p\0\0\0\0\0s\0~~~~\0@\0\0\0|\0\0\0\0\0\0\0\0\0\0\03\0\0\0\0\0\0_\0\0\0~~\0\0\0\0<\0\0\0\0\0\0~~~~~~}\0}~}~~~~\0\0\0b\0\0\0\0\0\0\0\x07~\0\b\0\0\0O~~\0\0\0\0\0\0\0\0\0\0w\0\0~~\0\0\x07~~\0~\0\0\0\0\0\0~\0_\0\0\0\0\0\0\0\0~~\0\0~~~~~~~~\0\0\0\0\0\0~\0\0\0\0\0\0~~~~\0\00~~~~\0\0@\0\0\0\0\0\0\0\0\0\0F~~~\0~~~~~\0~~\0}~~~~\0\0\0\0\0~\0\0\0\0\0\0~~~}~~~~~~\0~\0@\0\0\0\0\0\0\0\0o\0\0\03\0\0\0\0\0\0~\0\03\0\0\f\0\0\0F\0\0\0\0\0\0\0\0\0O\0\0~~\0C\0\0\04\0\0\0\06~~\0\0\0d\0\0\0\0\0\0O\0~}~~~~~\0\0\0\0q\0\0\0\0\0\0\0\0\0\0\0\0s\0~\0~~\0\0\0\0\0\0N\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0{\0\0\0\0\0?~~~~~~\0\0\0\0\0<\0\0\0\0?\0\0~~~~\0~~\0\0\0\0x\0\0\0\0\0\0\0\0\0\0~~~~~~\0~~~~\0\0\0\0|\0\0\0\0\0\0\0~\x07~\0\0\0\08\0\0\0\0\0\0\0\0\0\09\0\0\0L\0\0\0\0\0\0}\0~~~~\0~\`\0\0\0\0?\0\0~~~~\0 ~\0\0\0\0\0\0\0s\0\b\0~~\0b\0\0\0y\0\0\0\0f~}~}\0}~~~~~~\0\0\0\0b\0\0\0\0\0\0_\0\0\0\0O\0\0\0\0g\0\0\0\r\0@\0\00~\0\08\0\0x\0\0\0\0?\0}}~~~}}~\0\0@\0\0\0\0\0\0\0\0\0~~~~\0\0\`\0\0\0p\0\0\`~\0\0\0\0x\0\0\0\0\0\0\0\0\0~~~~~\0\0\0\0\0\0~\0\0\0\0~~\0A\0\0\0\0\0\0\0\x07~~~~~~\0~~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0w~~\0~~~~~~\0~~~\0\0\`\0\0\0\0\0\0\0\0\0c\0\0\01~\0\0\0\0\0N\0\0\0\0\0\0\0\0\0\0~~~~~~\0\0\`\0\0w\0\0\0\0\0\0~\0\0\0@\0\0\08\0\0\0\0<\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{~\0~~~~\0\0\0\0p\0\0A~\0~~\0@\0\0\0\0y\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0{\0\0\0\0\0v\0\0\0\0\0\0?~\0\0@\0\0\0\0\0\0\0\0\0\0\0G\0~\0\0\0q\0\0\0\0\0y\0\0\0y\0\0\0\0<~~~\0~~~~~~}\0}\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0{\0~~~~~\0~\0\0\0x\0\0\0\0\0\0\0\0~~\0\0D\0\0\0\0\0\0\0\0\0\0\0?\0\b\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~\0@\0\0\0\0\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0\0\0\0\0\0\0w\0\0\0\0\0\0~\0A\0\0\0\0\0\0\0\0\0\0\x07\0\0A\0\0\0d\0 \0\0\0\0\0{\0\0\0\0\0~~~\0~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\`\0\0~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0<\0\0\0\0\0>\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0L\0\0\0\0G\0\0\0\0\x1B\0~\0\0~~\0~~~\0\0\0\0D\0\0\`\0~\0\0\0\08\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0N\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0C\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0?\0\0\0\0\0\b\0\0\0\0\0F\0\0\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0S\0\0\0\0q\0\0\0\0\0\0~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0}~~~}}~\0~~~~\0\0\0\0L\0\0\0\0~\0~\0~~~~\0~~~~\0\0\0\0\0\0\0\0K\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\08\0\0\08\0 \0\0\0\0p\0\b\0\0\0\0\0\0\0\0 \0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\f\0\0\0\0\0\0\0_\0\0\0\0\0O\0\0\0\0\0g\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0y\0\0\0\09\0\0~\0\0\00\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0_~\0~~~\0\0\0\0\0\0\`\0\0\0\0\0O\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0H\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0O\0\0\0\x07~~\0\0~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0O\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0_\0\0\0\0\0\0\0F\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0\0\0w\0\0\0\0\0[\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0N\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0o\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0\0\0\0\0p\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0o\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~\0\0@\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~~~~~\0~~~~\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0.\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0@\0\0\0\0D\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0~~~\0~~~\0~\0\0\0\0\0\0\v\0\0\0\0\0\0\0\\\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\`\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0 \0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0\0\0\0\0\0\0\0\0\0\0A\0\0\0\0\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0a\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0O\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\b\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0@\0\0\0\0\0\0\0\0?~~\0~~~~~}~\0~}}}~~}\0}~~~}~\0\0@\0\0\0\0\0=\0\0\0\0g\0~~~}}~}}}}\0}}||}}}\0}}~~~~\0\0\0\0v\0\0\0\0\0~~}}||{{{{{\0{{{||}}\0}~}~~\0\0\0\0\0x\x07\0~~}\x07}}|||||\0||||}}~\0~~\0\0\`\0\0\0\0\0\0~~}}|\0|||{zyz\0zzzzz{|\0||~~~\0@\0\0\0\0~||{{z\0yyyxxxw\0xxyxyyy\0z{{}}~~\0~\0\0\0x\x07\x07\x07\x07\x07\x07\x07\x07\0\0\0\0\0~}}}||\0|||||}}\0}}}}}}~\0~~\0\`\0\0?~}|{zyx\0xwvvutt\0sssrrrr\0qqrrrrr\0sstttuu\0uvvvwww\0wxxyyyy\0yz{{{}\0@\x07	\v\r\r\r\r\r\r\f
	\b\b\b\0~}zxvut\0tttrqqq\0rrrrsst\0vxxyyz{\0}\0|\b	
\v\f\r\r\v
\b\0~|{yxwusq\0ponlkih\0ffeeedd\0defgijk\0mnpstvw\0xy{|}}}\0}}}}|{{\0{zz{z{|\0}\x07	
~\x1B\r\f	\x07}{yxvurpm\0lklllll\0lmoqsuv\0wy|~p\x07	\v\f\f\f\r\r\r\r\r\f
	\b}{ywtrpon\0mmmllll\0mmnnoop\0ppqqppq\0qrsstuv\0wyz{}~\0\0\0\0?~}|{ywu\0srpoono\0qty}\`\b\r\x1B""!\r\v\b\0~|yv\x07tqppnki\0fffhiii\0jlnquwy\0{}\0\b
|\v\f\r\v
\b\x07\x07\x07\0?~|yxvvu\0tssrrrr\0rrrrrsu\0vwxxyzz\0{{{zzzz\0{{{{zzz\0zzzzzzz\0zzyxxww\0vutrqqo\0nmmkklj\0jlmpv{~\0\b\v\x1B!"%)++)&%$#!\r\f	}|zv\x07solihfe\0c\`_^^_a\0bcdfimr\0vz~	\fx\x1B\x1B\f\v
\b\0?~|{ywwv\0vvvuttt\0tuuvvwx\0{|}\0@\0~}|{zyxvu\0utssrqq\0poooono\0onooooo\0ooppqqq\0qrrsttv\0y}	\r|$()**),.-+(#\x1B\v|zyuqnliiheca\0_^^__\`\`\0\`adhmps\0vy}\b\rx\x1B!$$#"   \f	~zvsqonljjjkm\0oppqsw{\0~\0	\f~\r\f\v	\b\x07\0~|{zyvtqpn\0nmkigff\0ghhhhik\0mpqrtvx\0{~x\0\0}||{{~	
\f|\x1B\x1B\x1B\r\r	zvtrrpmk\0kjkmmml\0jklnpqq\0rtw|\0p\x07
\x1B\x1B\v\b~}{y\x07wtqonml\0lklnpru\0wz~
x\x1B\x1B\v\x07~zwt\x07qnkihhi\0ijjklmn\0oppqqrt\0uvwxyz|\0~\0|\x07\b\b\b\b\b\x07~|ywtqolji\0ggijotw\0{	|\x1B!"!\x1B\b~|zxuqnmlllk\0ihggijk\0llnpty}\0	\r~\x1B\f\b|xurpn\0ljhgghj\0mortwz~\0	
\f\r
\b|zywwvutrrr\0rqqqrrs\0tuvwwwx\0yz{||}~\0~\0|\0~|{\x07zyxvtrp\0onmljij\0ijmquz~\0\0
 \r\x07}zxvtqommmnnn\0mlmoprs\0stvy}\`\x07\b
\r\f
\x07\0}{yw\x07uromlll\0lkklnqs\0vy}\0\b\rx\x1B\r
~?zvspnlk\0jjjjjkl\0nprtuwy\0{}\0x\0~|zxvusqomki\0hgeeddd\0egkqvz\0	 !"#&()'$ 	|yvsolkjjjji\0hhhjklm\0norvz~@\b\f\x1B\x1B\r
|yw\x07tqonllk\0jjklnpr\0twz~	p\f\v\b\0}zwusrr\0qqppqrr\0stuuvwy\0z||}}~\0\0@\0~}|{zyw\0usrponl\0jihhhgg\0hikotz~\0\x07\f"#$$'))($ 
\0|yws\x07oljjjkk\0kjjkmop\0pqruy}\0@	\f\r\v\b|yw\x07usqomll\0kkkklnp\0svy}
p\x1B\x1B\r
\0|yvspon\0nmmmlmn\0ooppqrt\0uwxyz{|\0}\0\`\0~|zx\x07wuspnlj\0iihgffg\0gijlrx}\0\x07\v#%''(*+*(% 	{yv\x07qnkihii\0ihggghi\0ijjkmrv\0y{}\x07
p\r\v\x07|zwtrpnm\0mlllmnp\0svy|\0\bp\r\x1B\x1B\r
?|yurpml\0kkkkkkl\0noqrrsu\0wy{}~\0\`\x07\x07\x07\x07\x07\x07\x07\x07~{xusqonkih\0gfggggh\0ikmoquz\0\0\v ',.//.//-+'"\v}wrokfb_]\\\0]]]]]]_\0acegiko\0uz
x\x1B !"#$#!\x1B\r\b~?yurolig\0eeefffg\0ilosvy}\0\v\x1B\r	|yuronmllkk\0kklmmnn\0oqsuwz{\0}\0\x07\x07~\b\b\b\b\b\b\x07\0~{ywutsqp\0nmnnnoo\0oprsuwx\0z|\0	\f|\x1B !""   \x1B\f	\0z?vromjge\0dcdfghh\0ikmoprt\0vy|\0\x07	x\f\f	?{wtronl\0kjkkmno\0qrtwz}\0@\b\f\f	\x07\0}zwtrnljihii\0ijkmoqs\0tvxz|@\x07	\v\r\r\f\v
\b\0~|ywtrpnm\0kjihhij\0klmnprs\0uvx{\b\`\v\x1B "#$#"#" \r	~yuqolifcbcde\0eefgikm\0npqsw{\0	\v\f
\x07\0|yvt\x07rqpooop\0qrstuwy\0{}	x\f\r\f
	\b\0~{ywtrpnm\0mnnoopr\0tuwyz{}\0\x07	~
\f\f\f\v
	\b\x07~}{zwvtrq\0ponmmmm\0noqrstu\0wxyz{|\0\x07
\r !!\f	\0{vrm\x07jieca\`\`\0bdfghjm\0psuwy|\0	\f\r
\x07~zwt\x07qomlkjk\0klnprtv\0x{~	x\r\f	\0~zwtrpnlj\0iijklnp\0rtwy{}\0\x07	
\v\r\r\v
\b?|yxvtrp\0nmlkkjj\0jkmnprt\0vxz|~@\x07\v\x1B \v\b\0|xtplhfecb\0bbdgilm\0oruxz|~\0\0\b
\r\f
\x07}zw\x07trpnmll\0mnoprtw\0y{}\0\x07x
\f\f	\x07|zwusqpo\0nmmmnpq\0suwz|@\x07\b	


\v\v\v\v
	\b~?|zwutrq\0onmllmm\0mnopsuw\0z|~x\x07\b	

\v\r\f\b\0}zwtromjh\0hhijjlo\0ruxz|@\x07\b
\v\f\f	|yw\x07utsqpnn\0nnoqsuw\0y|\bx
\f\v	\x07\0}zxvutsrq\0ppqrstt\0vxz|~\0\`\b				\b\b\b\b\x07~{zxvuts\0rqqqqrs\0tuvwy{}\0~\0\x07	~	



		\b\x07~~|{zyxxw\0vvuuuvw\0xyz|\`~}|{{{zyxyyy\0yzz{|}\0\b	
\v\v\v


	\b\x07}|zyxwvvuuvv\0wwxyzz|\0}}~\0p\0\0~}||{z\0yxxwvvv\0vvvwxxy\0{|~\0p\x07\x07\x07\x07\x07\x07\x07\0~~~~~\0\0\`\0~~}}}~~~~\0\0\0\0\0x\0\0\0\0\0\0?\0\0\0p\0\0\0\0\0\0\0\0\0\0\0~}}}||||\0|||||}}\0}}~~~~~\0\0\0\0\0x\0\0~~}}|{{{{\0{{{{{{|\0|}}~~\0\0\0\0\0\0\0\0\0\0\0|\0\0~\x07~~}}}~~\0~~~~\0\0\0\0x\0\0~}}}}}}}}~~\0\0\0|\0\0\0~~}}}|||{{{\0||||}}}\0~~\0\0\0p\0\0\0~}\x07}||{{zz\0zzzzzzz\0{{{||||\0}}~~~\0\0\0~\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0~~~}}}||\0|||||||\0||}}~~~\0~\0\0\0p\0\0\0\0~~\x07}||{zzy\0yxxxxxx\0yyzz{|}\0~\0|\0~\x07~}}|||}\0}}}~~\0@\0\0\0~~}}||||\0||||}}~\0~\0\0|\0\0~~~}}}|||||\0|||||||\0|}}}}}}\0~~~~\0\0\0\0~\0\0\0~~}}||{{\0zzzzzzz\0zz{{{||\0}}~~\0@\0\0\0~~~}}}|||||\0}}}~~\0\0\0~~\x07}}|||{{\0{{{{|||\0}~~\0\`\0\0~~}}||{{\0{{{{{{{\0|||}}}~\0~\0\0\0x\0\0\0\0~~~~}}}}}}\0}}}}}}|\0||||||}\0}}~~\0@\0\0\0\0~~\x07~}}}}}}\0}}}}~~\0\0\0\0\0~}}||{{{{{{\0{|||}}~\0\0\0|\0\0~~}}||{{\0zzzzzzz\0z{{||}}\0~~\0\0x\0\0~~\0~~}}}}}\0}|}}}}}\0}~~~\0\0\0\0\0\0\0\0\0\0~~}}}\0}}|||||\0}}}}~~\0\0\0~\0\0~~}\x07}||{{zz\0z{{{||}\0}~\0\0p\0~~}}}}||\0||||}}}\0}}}~~~~\0~~\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~}\0}}}}}}}\0}}}~~\0\0\0~\0\0~~~}}}}||\0|||}}}~\0~~~\0\0\0p\0\0\0\0\0~~~}}\0}||||||\0|||}}}}\0~~~\0\0\`\0\0\0\0\0\0\0~~~~~~\0~~~~~~~\0~~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0~~~~~~~~~~\0~~~~~~~\0\0\0\0p\0\0\0?~~~~}\0}}}}}}}\0}}}~~~\0\0\0\0|\0\0\0~~~~~}\0~~}}~~~\0~\0@\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~}~~~\0~~~~~~~\0\0@\0\0\0\0\0\0~~~~~}\0}}}}}}}\0}~~~~\0\0\0\0~\0\0\0~~}}}}|\0|||||}}\0}}~~\0\0\0\0\0\0|\0\0\0\0~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\x07~~~~~~~\0~~~~~~~\0~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~}\0}~}}}~~\0~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0~~\0~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~\0~~~~\0\0~\0~~~~~~\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~~~\0~\0\0\0\0x\0\0~~~~\0\0\0\`\0\0\0\0~\0\0\0p\0\0\0\0\0\0\0\0~~~\0\0\`\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0~\x07~~~~~~~\0\0\0p\0\0\0\0?~~\0~~\0\0\0\0\0\0\0~\0\0\0\x07\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0p\0\0\0\0\0~}}}}\0}}}~~~\0\0\0\0~\0~~~}}\0||}}~~~\0~\0\0\0|\0\0}}}~~~~}}\0\0\0\0~~~~~}}~\0\0\0\0\0{\0\0\0\0\0~~~~~\0\0\0x\0\0\0\0\0\0~~}}~~~~\0~\0\0|\0\0\0\0\0~~}}\0~\0@\0\0~~}|}}\0}}}}~\0@\0\0\0~}}|{zyyz{|}\0}\0|\0~}}|{\0||}}~~\0@~~~~}|{{{\0|||}}~\0@\0\0?~}|{|||\0}}}}~~~\0~~\0\0\0p\0\0\0\0\0\0w\0~?~~~}|z\0{|}}}|}\0~\x07\x07~}|{\x07||{{z{|\0}~\0p\0}}}}}}|}~\0\0\`\0|\0\0\0\0~~~}\0|||}}}}\0~\0|\0\0~~}}||\0{{{{{||\0}\0\0|\0\0\0\0\0~~~\x07~}}|}~\0~~~~@\0\0\0\0g\0\0\0g\0~~~~~\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~}}}~\0\0\0X\0}}}}}|{z{\0||}}}~\0\0~}||||\0{{|}~\0\0\0\0?}||{{{{\0|}~\0p\0~~}{zzz{|\0||}}\`~}}}}|||}~\0@\0}}}\x07||||||}\0~\0|\0}|{zyyyyz\0{|~\0p\0\0~}}|||\0|}}}}~~\0\0\0\0\0~\0\0\0\0~~~~~~~~\0\0~\0\0}}|\x07|{{zyz{\0|}\0x\x07\x07\x07\x07\x07\x07\0\0~|{{zz\0zzyz{|~\0\0~\0\0~}|||||}\0}}}~~\0@\0\0\0\0\0\0\0\0>\0\0\0~}\x07}}}}|||\0}~\0\0\0\0\0\0\0\0\0\0_\0\0\0\0~}}|}\0~\0\0\0|\0\0\0\0~~~~~~}}~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0~\b~~~~~}}\0}}}}}}}\0}}~\0\0\0\0~~~~}|{z\0z{{zyxx\0yzzzzz{\0}~\0x\0\0\0\0\0\0\0@\x07\x07\x07\x07\x07\x07\x07\0\0~~}}}}~\0\0~\0~}|\x07||{{|||\0}~~\0\0\`\0\0\0\0~}||{zzy\0xwwvvvv\0uvvwwyz\0{|~\0\`\0\0\0?~|{zyxw\0vutuuvw\0wxy|\`\x07\b			\b		
	\b\x07\x07\b\b\b\b\b\b\b\x07\0\0~~}}}}}}}\0~\0x\0~?~}||{{z\0z{zzzzz\0zzyyyxx\0wwwvuut\0tttttuu\0vwyz{|}\0}~~\0}{{zyxw\0vvwxyz|\0~\0\b\v\f~\f
}?zxvtrpp\0qtvx{}\0@	\f\r\f
\b\0\0\0\0F\0\0\0\0~}}|{zxww\0wvutsrr\0rrrrrst\0vwxxyz|\0|||{{{z\0yxwvuut\0srrrrst\0uvwxz|~\0\0|\x07\b
\r\v\b~{xutsrqq\0rtvy|~@	\f\f
\x07\0~|{{{{||}\0~\0|\0~|zxwuttsqq\0qrsstuv\0xyzz{{{\0{{{zzzy\0yyxxxwv\0vutsrrr\0rssstuw\0xyz{|}~\0\0\b
~\r\x1B\f	\0{wtqpnlkkl\0oruy|\0\`\v\f	}zxw\x07vvuuuuw\0xz{|~\0\`\x07\b

\v
	\x07}|{{{{\0{|}~\0p\0~}|zxvtrqpppo\0ooqsuvw\0xz|~\0\0\0\0}{zxwvtr\0qppqrrr\0rsuwxyz\0{}x\x07	\f\x1B\v?zvrnjge\0efhknqv\0|\b\r~\x1B\r\b~zwtrponn\0opstvxz\0|\x07	|
\f\r\r\f\v
\x07\0~}|}}~~\0\0\`\0~}}|{zyxwwv\0vuuuvwx\0yz{|~@\0?~|{yxvu\0srqqqpp\0pqrstvx\0y{}p\x07\b\b	
\v\r\f\x07~yuromkjj\0kmpsw{\0	\r\x1B\x1B\f\b{wt\x07qommmmo\0prtwy|~\0\x07\b
\v\f\f\r\r\r\f\v
	\x07?~}|{{{{\0||}}~~\0~}|||\0|{zzz{{\0{{{{{|}\0}}}}~~~\0~}}|{{z\0yxvvutt\0tsssttu\0uvvwxyz\0{{|}}~\0\0\0	\v\r\x1B\r\b~?ytplhfe\0fghknrw\0}\x07\f~\x1B
{wtpmkjjj\0lmoqsvz\0}\0\x07	\v~\f\r\r\r\f
	\b\x07\0~~~}}}}~~\0~}~~~}|\0{zz{zzz\0z{|}}~~\0\0\0~\0\0~|{\x07yxwvuts\0rrrrrst\0tuvwxyz\0|}~\0\0p\0\0\0\0	\f\x1B\x1B\v{wrmjgfffh\0jmpuz@\b\r\f\bzvsponmmnprt\0wy{}\`\x07\b		
\v\f\f\v\v\v\v
	\x07\0~}}\x07}}}|{{{\0{{zzyz{\0{{{||}}\0~~~~~~~\0\0~}|{zy\0wvusrrr\0rrrrstu\0vxyz{}~\0\0\0~?~}}}~\0\`	\f\r	\0{vro\x07ljihhjl\0nptx}\`
\r\f\b~{xvutt\0tstuwxy\0yz|}\0\`\x07	


\v\f\f\v
\b\0?~}}}}}}\0}}~~~~\0\0~~~~~\0~~~~~\0@\0\0~|{ywutssrrs\0tvwyz|}\0\0~\0~}{ywv\0vvwxz|\0\x07\f\f\bzvroljhhhij\0morv{@\b\f\v\x07\0}zxvuttttuvwx\0y{|}\`\b	
\v\f\r\r\r\f\v
	\b\x07\0\0~}}}~\0\0\0p\0\0~~~~~}}}~\0\0\0\0\0\0|}|{zy\0xwwvwwx\0yz{}}~~\0~}\0}}||{zy\0yxxwwww\0wxz{}~@\x07
\f\f	\x07~zwt\x07sqpommn\0oqtvx{~\0	\v\r\v	\x07}{z\x07yyyxxyz\0{}~\0\`\x07\b	
\v\v\v
		\b\x07\0\0\0\0a\0~~}|{{zz{\0{{|}\0\`\0}{y\x07wvtsrrr\0stuwy{}\0~\0~\0~}|zyxwvuut\0tttuvxz\0|~\b\v\r|\f	|xusqpon\0noqsvx{\0~	\f~\f
\x07}{yxxyyyz\0{|~\0p\x07\x07\x07\x07\0\0p~}|{zzyyy\0yyz{|}~\0\0~?~}{yxvu\0ttsttuv\0wxz{}~\0\0\0\0\0~}||{zyyx\0wxxyyz{\0|~\0|\b	\v\v\v\v
		\b\x07\0~}{zyzz{||}~\0\0\x07\x07\b	

	\b\x07\0\0\0\0\0\0\0\0\x07~~~}}}}\0~~~~@\x07\x07\0~}|zyxwww\0wwxxz{}\0~\0\x07~\x07\x07\x07\x07}{ywvutssss\0tuwxz|~\0\0\0~}{zywv\0uuttttt\0uvwyz|}\0\x07\b
~\v\f\r\r\r\f\v
\b\0~|zyxwwwwxy{|\0~\x07\b	~
\v\f\f\v
	\b?~}|||{{\0{{||}}~\0~\0x\0\0?~}}}|||\0|||}}~\0\0\0~}||{zzzzz\0zzz{{||\0}~~\0\0\`\0\0\0\0~}||{z\0zyxwwww\0xxxyz{|\0}~\0\0x\0\0\0\0\0p\0\x07~~\0\0p\0\0\0~~~}~~\0\0~\0~~}}||||||\0|}}~~\0\0\0\0~~~~}}\0}}}}}}~\0~~\0@\0\0\0\0~~}|{{{\0zzzz{||\0}~\0x\0~~}}|||}\0}}~\0\`\0\0\0?~~\0\0\0~\0?~}||{{\0{{{||}~\0~\0\0|\0\0~}}}|\0||||}}}\0~~~\0~~~~~\0~}}}}}}\0}~~~\0\0\`\0~~~~~~~~~~\0~~\0\0\0p\0\0\0~\x07~~~}}}}\0}~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~\0@\0\0\0\0\0\0\0\0\0~~~~}}\0}}}}}}}\0~~~\0@\0\0\0\0?~~~~~\0~~~\0@\0\0\0\0\0\0\0\0\0\0~\x07~~}}}~~\0~~\0\0x\0\0~}||||||\0|}}~~\0@\0\0\0~~}}|||||}}\0~~\0\0p\0\0~~}}|||{{{|\0|||}}~\0\0\0|\0\0\0\0~~~~~~~~\0~~~\0\0\0\0\0\0\0|\0\0\0~~~}~~~~\0~\0x\0~~}}}\0}}}}}~~\0\0\0x\0\0\0~~\x07~~~~~~~\0~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0\0\0\0p\0\0\0\0\0\0\0\0|\0\0\0~~~}}}\0}}}}}}}\0~~~\0\0\`\0\0\0~\x07~~~~~~~\0~~~\0\0\b\0~~~~~\0~~\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~~~\0~~~~~~~\0~~\0\0~~\0~~~~~~~\0~~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0~~~~~~\0~~~~~~~\0~~\0\0\00\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~\0\0\0\0\0\0~\0\0\0\0~~\0~~\0\0\0\0\0\0\0\0\x07~~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~~~~\0~\0\0\0p\0\0\0\0~~\0\0@\0\0\0\0\0\0?~~~~}\0}}}~~~~\0~\0\0\0p\0\0\0?~~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0?\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{\0\00\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~~\0\0\0\0\0~\0\0\0~\x07~~}}|||\0|{{{{{{\0{{{{{{{\0{||||}}\0~\0x\x07\x07\b\b						\b\b\x07\0\0~~}}}}}\0||||}}}\0~~~\0\0\`\0\0\0~~}\x07}||{{{z\0zzyyyyy\0yyyyzzz\0zzzz{{{\0{{{zzzz\0yyyyyyy\0yyz{}@\x07
\v\v

\v\r\r\r\f	\b\b\b\b\x07\0~?{zz{|{y\0wwwyyxw\0vwyz{|{\0|~x\x07	


\v\f\r\r\f\f\f\r\f\v	\b\x07\0~}|zzz{{\0{{{|}~\0\0|\0\0\0}{\x07zyxxvts\0rrrqpoo\0oopooop\0qrqqpru\0z~\0d\f\x1B\x1B
\b
\x07\0zwx|\x07}ytppsv\0urnlnru\0uutvy|}\0}~\0\x07\b	|	
\f\r\r\f\f\f\v\v\v\v	~}~\0\0~{yz}}{{}\0\0~c\0\0\0\0}|{{{z\0xvuttsr\0qpoppoo\0nnnonnn\0mmnnnmm\0nptwz|~\0
\x1B ##"\f\f\v	~zyyywrpo\0oqpmjii\0lmnnnos\0uwxz}\`\x07	
\r
\x07~?{yyyyvt\0stvwxww\0wz|}~~\0\0\0~|{zywtrqp\0onlkjjj\0jiiijjk\0kllmnoo\0oopqsux\0|\0\x07	\v~  !%))&!\x1B\f\x07\x07ztrs\x07utpkijl\0nliggjn\0pqrsvy|\0\x07\v~\r	\0|xut\x07uutqooq\0tuuttvz\0}\0p\b\b\x07\x07\b
	\x07\0~{zyxvtqponmk\0ihhiiih\0ghjkllk\0lmoqqpp\0pqsuvw{\0	\v\v~ $#!"$*,*$\x1B\v\0yroprspkhhkm\0miffhmq\0qqrtx|~\0\0	\r\v	\0~{xutssrponpq\0stttvy|\0~\0\x07	|				
\v
	\x07\0}{xwvut\0rponnnm\0mlllmnn\0nnnopqq\0qqrsssr\0rrsssrr\0rux~\bp	\v"" #(+*$\x1B\x1B\f\b~xtuyzxtp\0ortroki\0knpqppr\0tvxy{\0\`\b\v\v\f
~zvtuvvtr\0qrvyyxw\0x{~\0\0\0x\x07\x07\x07\0}{zzzywusr\0rrqonno\0pppoopq\0rsssstu\0vutsrss\0sqppqsv\0{\0\x07	\r~\x1B!!&*+&\x1B\x1B
\b\b\v	|wvy\x07{xsnkmo\0olhdfil\0nnnoqtw\0z|\0\x07
\f|	}xsqrttqomnr\0uutsux|\0~~~~\x07p\b\x07\b
\v
\b\x07\x07~}|zxuttrqo\0mmmmmml\0lmnoppp\0qstuttt\0uuvvuuu\0uvvvvx~\0\b\v

\r"#\x1B")+%\b

{uty|{uoknss\0pjfgkoq\0pnoswz|\0{~\x07\f|\f
\x07~}{xusrs\0tsrqqtv\0xxyy|~@\b




\v\v\v	\b}zxwvt\0ronmllk\0jjjjkmm\0mnoqrst\0tuvxxxw\0wwxxwvu\0uuvvw{\0@\b	\b
!"'*&\v\x07\x07		}xvy{yvqnoqqn\0iffiklk\0ilortuv\0y\b	
\v|\v\b|xvvww\0vtrruxy\0yxy{}\0@\0\x07\x07\b\b~|zzzxvtr\0qqrrqon\0opqsrqq\0rtvwwvv\0wxyyxvv\0vwwvsrq\0rttttw}\0\x07		
#!#(,*#\x1B\r\b	
~wtuwvsniikki\0eaacegg\0fhloruw\0{\0	\f~\x1B\x1B\x1B\f\b\0~?|yusrss\0rpoortv\0wvwy{~\0\0\0\x07\x07\x07\0~}|zxwu\0utssrqq\0rrrrrrs\0tvvvvvw\0xxxwvvv\0wvvtsss\0tttstuy\0\x07	
\f~"" #'))#\x1B\x1B\vysoorqnjfegi\0gebadfh\0jjkptwz\0{~	\r|\x1B\x1B\x1B\f
\x07{xvusqomm\0nooooqt\0wyz{}\0\`\x07\x07\b
\f\r\f\v\f\r\r\v	\x07\0}zxwwutrpppp\0ooopqrr\0sstuvww\0wwxyzzy\0yyzzzzy\0xxxxxwv\0vwz}p\x07	\f!!
\0~zurpppomk\0jjkjjhh\0ijlnpru\0xz|\0\x07\vx\r\v\b}?ywvvusq\0opqsttt\0uw{~\0\0\`\b	

\v\f\r\v	\x07\0}zxw\x07vtrponn\0nonnopr\0stuvwxz\0{{||}}~\0~~~}}}|\0||{zzyx\0wvuuuuu\0x{x
\x1B\r\x07\0{vstuvtqnnp\0qqomlmo\0qssuwy{\0}	\f|\v\b{zz{zywuv\0xz{{{|\0\b
\f\f\f\f\f\r\f\v	\b\b\x07\0~}{y\x07wusqqpo\0oooopqr\0rsuvwyz\0{{|}~\0~\0~}}}}|{\0yxwvutr\0qppppru\0z}\0\vx\x1B
\x07yvvwwuromoon\0ligikno\0pqsux{}\0\0	\f\f\v
\b\0\0\0}|{{|}\0||{{}\0\`\0\0\x07\x07\0}|{zyx\0wwvvuuv\0vwwwxxy\0z{{|{{|\0}}}}}}|\0|||||{{\0{zzyxww\0vtsrqqp\0ppoprvz\0}\0\f~\x1B	?zusstsp\0mkkmmlj\0hilopqq\0swz}\0\`
\r\v	\x07}{{\x07zywvuvw\0wwwwxz{\0}~\0x\0~~}\x07|{zzzyy\0xxxxxxw\0wxxyyxx\0xyzzzzz\0z{{{{zz\0{{{zyxx\0wwwuttt\0ttttvz}\0\0\b\r\v\x07~|xtrqqqpo\0oopqrqq\0rtvwxz{\0~\x07	~\f\f
\b|{{zzxvttuvu\0ttuwyz{\0|}x\b	
\v


\v\v
\b\x07}|{{zxvuu\0uvvuttu\0wxxxxyz\0{||{{|~\0~~}|}~~\0~}|||||\0{zxxxxx\0wvuuvwy\0{}~p	\v\r\r\r\r\f\f\v
\b\0\0|zyyyz\0yyyyz{{\0{zz{|}~\0\0~\x07\b	\v\f\r\r\r\r\r\r\r\v
		\b\x07\0~}{zyxwvuttu\0vvwwyz}\0~\0\b~
\v\v\f\f\r\r\r\f
	\b\x07\0}|{{\x07ywvttuu\0uuuuvwx\0xyyz|}}\0}}~~\0 \0\0~~~~~~}|\0||||{zx\0xxwwvuu\0tuvwxz{\0|}\0\x07\b|	
\f\r\f
\b\x07?~~}}||\0|||{{{|\0||}}~@\x07\b				
		\b\x07\x07\0~|{zyxxwww\0vwxxyz{\0|~\0|\b		
\v\v\f\f\f\v
	\x07\0}|{zyxwww\0wwwwwxy\0zz{||}~\0~~\0\0\0p\0\0\0\x07~~~~}}\0}}||{{{\0{zyyxxx\0wvuuuuu\0tttuvwx\0y{|~p\b
\v\r\r\f\v
	\x07\0~}}}}}~~~\0\0\0\0\0\0\0\0\0\0~~~~~~~~~~\0\0\0|\0~~}}|||||||\0|||}}~~\0~~\0\0\0p\0\0\0\0\0~~}}}}\0|||||||\0|||{{{{\0{zzzyyy\0xwwwwwv\0vvvvwxy\0zz|~\0p\x07	
\v\f\f\f\r\r\r\f\v

	\b\x07\0?~~\0~~~~~~~\0}}~~~~~\0\0\0x\0\0~\0\0\`\0\0\0~}}}||||{{{\0{{{{|{{\0|||||||\0||||}}~\0~~~~~\0~~}\0}|{zzyx\0wwwvvvv\0vvwwxxy\0z|}~\0\`\x07\b\b	
\v\f\f\f\f\v\v\v
	\b\x07\0~}}|{{zz\0zz{{z{{\0||}~~\0@\x07\x07\b\b\b\b\b\x07\x07\0~~}\x07|{{{z{{\0{{|}~\0\0\0~}}||{{{zy\0yzzzyyy\0yzzzzzz\0z{||||}\0~~\0\0~~~}}|{zzz\0yyxxxyy\0zz{{|}~\0\0\0\0~\0\0\x07~}}}}}}\0}}}}~~\0\0|\0~~}||{{zz\0zzzz{||\0}~\0x\x07\x07\x07\x07\0~}|{{zzy\0yyyyyyy\0zzzzz{{\0{||||}}\0}}}~~~\0\0\0\0\0x\0\0~~}}}||\0{{{{{||\0||}~~\0\0~\0\0\0\0\0\0\0O\0\0\0\0\0\0o\0\0\0~\x07~~~~~~~\0~\0\0p\0\0~~}}|\0|||{{{{\0|||{{||\0|||||||\0}}|}}~~\0\0\0p\0\0\0~~}}|{{{{{\0{{{|}}~\0~\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0~\0\0\0\0\`\0\0\0\0\0\0\0\0~~}||{{{\0{zzzyyz\0zzzz{{|\0|}}~\0\0\`\0\0~\x07~~}}}}}\0}}}}}}}\0}}}}}~~\0~~~~\0\0\0\0\0\0\0?~~~}}\0}}}}}}}\0}}}~~~~\0~~~~\0\0\0\0\0|\0~~}}}}||\0||||||{\0{{|||}}\0}~\0\0\0p\0\0\0~~~}}}\0}}}||||\0||||}}}\0}}~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\x07~~~~}}}\0}}}}}}}\0~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~\0\0@\0\0\0\0q\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0?\0\0~~~~\0~~~~~~\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0~~\0\0\0\0\0x\0\0\0\0\0\0\0\0~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0\0\0\`\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0~~~~~~~\0~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0~\0~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~~~~\0}}}}}}}\0}}}}}~~\0~~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0>\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0~~~~\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0@\0\0\0\0\0\0\0\0\0\0\0\0y\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0q\0\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\b\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0/\0\0$~p\0~}q}~\0\0~~~}|{\0}~}|{\0|~~}|{\0|~}|{\0|}\0}z{\b~\0\0|z|~{{}~|{\f{|\0\0|z{~\0\0|8|}~\0|}~\0\0~8}~\0\0\0~<}\0\0|~x\0\0\0\0\0\0>\0\0}|}{}\0\0}|~\0\0}~~~~}}}\0\0~z{\0B\0~{}|}\0|yz\x07}|{{|||~|z{~\0~{|\0p}~\0\`\0{|\0a~~~}~~}\0~\0\0||\0F\0~}~~~|{}\0\0~y{\0b}}\0\`\0~}g\0}O~\0G\0}|~~}\0O\0\0~\0\0~||~\x07\0}~~||\0~||\f}~|{\f|}|{}~}{y}\0}zz|~\0}}}~}\0~\0~}}~\0\0~}}|{\0|{\b}~}}\0~ {{|~\0\0}0}~~~~\0\0~~~\0N\x07\0\0\0_\0\0_~\0C~~~\0\0\0}~\0\0c\0\0\0~~\0G\0\0\0~}~~\x07~\0|z}\0F~zz|~~|zy{~|xx{\0|{||zz}\0{{}z{~\0}}~||\0|}}z{\0~~{|}{y\0{}}}~}z\0y}\0\0\0~~\08\0\0~\x07\b\0\0~\0\0\0\0\0\0\0\0~~\0}8{{~~~~\0p\0\0\0~~~\f}~\0\0~0|{}\0~~\b}|}}}~}\0}}|||||\0~|z|{z|\0~|z|}}|\0z{~~~\0{z|}~\0{z{{|}~\0~}|{{~\0@\0}\0G\0\b		\b
	\x07\0\0o\0?\0\0\0\0\0\0\0~~\f\0~~}~\0~~\b\0~\0O\0\0}~\0~'||}}{z{\0{yz{{{|\0yx{}||{\0yy}~zy{\0}|{{{z{\0zz|}|{z\0{{{z{||\0{xx{~}{\0|}}}}\0@\0\0y\b		\b\x07\b
\f
	
						\b\0\0\0~~~~\x07\0\0~~\0c\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0~~~~~||||}\0}|{{z{{\0zzzxxyz\0yyywvwy\0yyxvwww\0yzyxwvw\0xyxwvvw\0y{||{{|\0~\x07\b\b\b\x07\x07\b	

	

\v\f\r\f\f\r\r\r\r\f\v\v\v
\b\x07\0?}}}}}|{\0zzz{|{{\0{zz|||}\0~~~~\0\0\0\0\0\0\0}|||||\0{{yxxxx\0wvvvtss\0ttsttss\0ssrtttt\0ttutsst\0tsstttu\0xyz{|}\0\x07	\v\r\r\r\r\f\v\v
\b\x07\0}{yxwxyxwv\0vvxyxxx\0xyz{|||\0}}~\0p\x07\x07\b\b				



		\b\x07\0~}{zxwvu\0tsrrqpp\0ponmnoo\0onnopqq\0qqqqrss\0ttttuuu\0uvvvwy{\0}~\x07x	\v\v\v\f\r\f
\b\x07\0~{zyxvutts\0tttssst\0vwwxyyz\0|}~~\0\0\`\x07\x07\x07\b		




\v\v\v
\v
			\b\x07\0~|{zyyxwutt\0sqqqpoo\0mmmmmmn\0nnopqrr\0rstuvvv\0vvvwwvu\0uuvwy{|\0~\0	\v~\r\r\r\f\v	\x07~|ywvuttrqqpq\0rrrrstu\0vwyz{|}\0~\0~\b		\b\b	
\v\v\v\v
\v\f\f\f\f\v
					\x07}|zxwwvus\0rqrqqpp\0ooooooo\0ooooppq\0qrstuvw\0wxyyzzz\0zzzyyxw\0vvvvxz|\0}\0	\f|\r\f\f\v
	\x07\0?}{ywuss\0rrpooop\0qrssstv\0wyyz{|}\0~\x07\b\b\b				

				


	\b\b\x07\x07\0~}|\x07zyxwwvu\0tssssss\0rrrrsss\0ssrssst\0uuuvwxx\0yzzzz{{\0{{zyyxw\0wvttttv\0y|}\0p
\f\r\f\v
	\b\0~|zxus\0rrrrpoo\0pqstuuu\0wxz{|}}\0\0~\x07\x07\x07\x07\x07\x07\x07\0}|{{zyxwv\0vuuuutt\0tttuuvv\0vvvvwww\0wwwxxxy\0yyyzzzz\0zzzzzyx\0xwvutsr\0rrrtwy|\0~\0	\f~\f\v

	\b\0}{ywtsrrr\0qponopr\0sttuvxz\0{|}~\`\b\b\b\x07\x07\b		\b\b\b\b\b	\b\b\b\x07\x07\x07\x07\0~}}|{{z\0zzzyyyy\0zzzzzzz\0{zzzzzz\0zyyxxxy\0zzzzz{{\0|{{{{||\0{zzyxww\0utsrrrr\0stux{}\0\x07\v\r\f\v
		\x07~|ywusrqppo\0nnnopqr\0tuvwyz{\0|~\0x\x07\b				\b\b			\b\b\x07\x07\x07\0~}|{|||||\0|||}}}}\0||||||{\0{zzyyxx\0wwwxxxx\0xyyzz{z\0zzz{{{{\0zyxxwwv\0utttttt\0ttuwy|~\0\0\x07\v\r\f\f
	\b\0~{zxvurpnmmn\0mlkklnp\0qrstwy|\0}~\0x\x07\x07\x07\b	
\v\v






	\b\x07\x07\0\0\0~}||||||{|}\0}~~}}}}\0}}}|{{{\0{zzyyyy\0yyyyyyz\0{|||||}\0~~}}}}}\0}}|{{zz\0zzzyyxx\0yyzzzzz\0|}\0|\b
\f\r\r\v	\b\b\x07\0}|z\x07xwvutrq\0ppooooo\0pqrtuvx\0y|~\0x\x07	
\v\v\v\v\f\f\f\v

		\b\x07\0?~~~~~}\0}}}}}}|\0|}}}~}}\0}}}}}||\0{{{{{{|\0|||}}}~\0~~~~\0@~~~~~~\0}||||||\0|{{||||\0||||}}|\0|||||||\0}~\0x\x07\b	

\v\v\f\f\f\v\v

	\b\x07\0~}}||{zz\0yxxxwww\0wwxxxyz\0z{|}\0\`\x07\b\b\b							\b\b\x07\0\0?~~~}}}|\0|||||}}\0}}}~~~~\0~\0\0\0\0\0\0\0\0|\0\0\0\0\0~~~~}||\0||{{{zz\0zz{{{{{\0||}}}}}\0}}~~~~~\0~~~~~~~\0~\0\0\0x\0\0\0\0\0\0~~\0\0\0|\0\0\0~~~~~~~\0~\0\0\0x\0\0\0?~~~~}}\0}|||||{\0{{{zzzz\0z{{{{||\0|}}~~\0@\0\0\0\0\0\0~~~}}}||{{{\0{{{{{{|\0|||}}~~\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~~\0~~~~~~}\0~}}}}}}\0}}}}}}}\0}}}}~~~\0~\0\0\0\f\0\0~~~}}}\0}}}||||\0||}}}}}\0}}}}}}}\0|||||||\0|}}}~~\0\0\0~\0\0\0\0~~~~\0~}}}}}~\0~~~~~\0\0\0\0x\0\0\0~~\x07~~~}}}}\0}}}}}}~\0~~~\0\0~~~\0~~}}}}}\0|||||{{\0{{{{{{{\0{{|}}~~\0\0|\0\0~~}}||{{\0{zzzzzz\0zz{{{{|\0||}}~~\0\0\0\0|\0\0\0~\x07~~~}}}}\0||}}}}}\0}}}}~~~\0\0\0~~~}\0}}}||||\0|||||}}\0}}}~~~~\0~~~\0\0\0\0~\0\0~~~}}|||\0|{{{{{{\0{{{{{||\0}}~~\0@\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~\0\0\0\0\`\0\0\0\0\0\0\0\0\0~~~~~~\0}}}}}}}\0}}}}}}~\0~~~~\0\0\0\0\0\0|\0\0\0\0\x07~~~~~\0~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~~~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~}}}}}\0}}}}}}}\0}~~~~~~\0~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\f\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0~~~~~~~\0~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~\0~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~\0~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\f\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0~~\0~~~~~~~\0~\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0/\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0~~~~\0~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\v\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0p\0\0\0\0\0\0\0\0~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0\0\0\0\\\0\0\0?\0\0~~~~~}}~}}}\0}~}}\0\`\0\0\0\0\f\0\0\0\0s\0\0~~	~~}~~~\0}}}}~~\0~\0\0\0\0x\0\0\0\0{\0\0~~~~}~~\0~\0\0\0\0x\0\0\0\0\0~~}}}~}}}\0~~~~~\0\0\0|\0\0\0}}}}}||}\0~~\0x\x07\x07\x07\x07\x07~~~}{zzyxxxw\0xwwxxxx\0xxyz{|~\0~\0\x07~\b	
\f\f\v

		\x07\0}{zxwwxxxwvx\0zz{{|~\0@\b\b\0}|{\x07zxwvvww\0vvwyz{{\0|}~\0\0x\0~}|||{yxxy\0yyxwxz{\0{|}@\0~}|{zzzx\0wxxxwwx\0yzzy{~\0~\x07\x07\x07\x07\x07\b\x07\0\0~|{zzyyzzyx\0z{||{|~\0~\0d\0?~|{||{z\0yz|||}}\0}~~p\0\0\0}}~~}}~\0~~\0@\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0g\0\0\0\0\0\0}\0~\0\0\`\0\0\0\0\0~}~~\0~~~~~\0\0\0\0\0\0v\0\0\0\0\0\0\0\0\0\0?~~~}}\0}|||{{{\0{||}}}~\0\0~\0\0~~~~}}}}||}}\0}}}}}}}\0}}~~~~\0\0\0\0\0\0\0\0o\0~}}}}|||}}|}~\0~~~\0p\0\0\0\0~~\0\0~\0\0\0~}}\x07}}|{|||\0|}}~~~\0@\0\0\0y\0\0\0\0\0~~~~~\0~~~\0\0@\0\0\0~~\0~~~~}\0}}}}}}}\0~~}}~~\0\0|\0\0\0\0\0\x07~~~~\0~~~~}~~\0}||}|||\0{||||}}\0~\0x\0\0\0\0~}}}}}}}}\0~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0~~}}}~~}~\0~\0\0x\0~~\x07}}|{{{{\0{{{|}}|\0}}}~~}~\0~}}}}}}\0}~~~\0\0~~~~~~}\0}||||{{\0{zzz{zz\0z{{}~~~\0\0|\x07\x07\b	
\v\v\v
\v\v

	\b\b\x07\x07\x07\0\0\0\0w\0\0\0\0~~}||{zzyyx\0xyyyyzz\0{||||}}\0||}|{zz\0yyxwvvv\0utsssrr\0rrrsssu\0uuvwwxy\0yyz{{{{\0zzzzyyy\0xxyz|@\b\f\v	\x07\b\b\b\b	\b\b\b\x07\0~}|{{zyxxxxxw\0wwwxxyy\0yyzz{{|\0||||{{z\0yxwvuts\0rqqppon\0nnnnnnm\0mnmmmmm\0nopqqrs\0tvy{}\0\`\x07\r"%&%#" \v\x07{wusrrqpqtx|\0\b\f~\f\v	\b\0\0~}|{zxww\0wwvvwxy\0yz|}~\0\`\x07\b			\x07\0~?{xuroli\0geca\`__\0_\`abdfh\0kmoqstu\0wwwwwvu\0tsrrrrr\0svz	p%()*))*)$ \r\b{upmlkihi\0kosvy|\0@
 !  "!
|zx\x07usqpqrr\0stuxz}~\0\x07\x07~\x07\b		\b\b\x07\x07\x07~|yvspnkifca\0_]\\[ZZ[\0\\]_adgj\0lortwyy\0{{zzzxu\0urpqpqt\0w|\b|!&),-,--*&#\x07\0ysok\x07hgddfil\0psvz~\`\b
\r\x1B"%&&%$" \r	|wtqnljhhi\0kmpsuy}\0\x07	\v\r\f	~?{wtqnlj\0geca\`_^\0][[\\\\^_\0\`adgjmn\0qsuxz{z\0{{zyxus\0qoppsw{\0\x07\f!&+..010/+& \x1B
yqkheb\`__bgjn\0ruy~\x07	p\v\r\x1B "$$&('%#\b\0}yup\x07ligghhi\0knrx|\0\`
\r
\x07\0|xtpmjhfec\0cbaaaa\`\0\`abcdfg\0ikmoqrt\0vwwxxxx\0xvuspnm\0kjjmqw|\0	!%,0/03320*#}unjhd\`\0^]_dgko\0qu|\x07p	\r ##$&%## \f\b\0}zwr\x07nljjklm\0nquy|\0\`\x07
\f\v\bzvr\x07omkiged\0eeeeddd\0fggiijl\0oqqrstu\0vvvuuut\0srpnlki\0geccfks\0z\0\x07\r#+~06547:850&\b|rjeea\\WUU[ad\0hjkt{@	\x1B $'(+,*)(%!\f\b~zwspliggh\0kmnptx}\0\0\b\v\r\r\r\v\b?{wtqpnl\0kjhhhhg\0ggghijk\0lmoqstt\0tttuutt\0trqrqon\0mljjihh\0lry\0\x07\rx&-1432453/( zqkhgc^YXY\0^dfhjmt\0{~	|!%(*,-+*($\x1B\f\x07~?zwtqmkk\0jkmoqsv\0y|~\0x\x07\x07\x07\x07}|zxvtsrpon\0nmlllll\0mmnoopp\0qrrrrrr\0rrrqqqq\0qqppppo\0ooppqsx\0
!~),/0-,/.+'\f{rjedb^YVUY^\0behkqy\0@\b
 $%())*+)%"\r\x07}zxw\x07vspoooq\0ssstuwz\0||{{|~\0@\0\0{\x07\x07\x07\b	\v\f
	\x07|zyxwv\0tqpponl\0kjjklkk\0llnoooo\0prstuuw\0xy{{{{{\0{{zzyww\0{\x07
\r|#$%$"$&$\f
}slh\x07gfc_\\\\a\0gkoruz@\b\v\f\r\x1B\x1B\x1B\x1B\f
\x07\0~|zxusq\0onmllkl\0mnprsuw\0y|\x07
x\r\f	~{xtqmkhedba\0aabcefh\0jlmoqsu\0wy{}\`\x07\x07\0~|{xusrrrsv\0xz~\vx  \r	|wtsqlifegjl\0mnptz}\0	\r\x1B\x1B
~{wt\x07qmkigff\0fghjmqt\0x|
x\x1B\v\x07~zws\x07oligfec\0babcdfg\0ilortwy\0|~\0|\x07\b			\x07~{yxwusqpo\0opoonmn\0qty|\b\`\r\x1B!!"%$ \r\vvqn\x07kkifdeh\0mrux|\x07\`\r\r\v	\0~?}{zyxyz\0z{{{||}\0}~~\0\0\0\x07\x07\x07\x07\0~|zxusqpnn\0mmlllmn\0oqsuwz|\0~|\0?~}{zyxw\0vttssss\0rrrrrst\0tuwz}\0\`	\r\r	\0~{xvusssstuv\0xy{|~\0\`\x07\b
\f\r
\b~{xwutrponnoo\0pqruwy{\0}~\0|\x07\x07\b\b\x07\0~{xwuutsrr\0rsuuvwx\0z{}~\0\`~}|\x07|}|{yyx\0xxwutss\0tuuvvwy\0{}~\0x\x07\b	
\v\f\f\r\r\v
	\b\x07\x07\0~}|{{zzyyxxx\0wwwwwvw\0wwwxxyz\0z{||}~\0\0\x07\x07\x07\0~}|zyxv\0ussrrqq\0qqrsuvw\0yz|p\x07	
\f\r\r\r\f\v
\b\x07\0}|z\x07xwwwxxx\0xy{}\0\`\x07\x07\x07\x07\x07\b		\b\x07\x07\x07\x07\x07\0\0~~~\0~~~}}}|\0|||||{{\0{{{{{{z\0zz{zzz{\0{|}}~\0\0\0\0~~~}}||\0|{{zzyy\0yyyyyyz\0{||}~\0@\x07\x07\b\x07\x07\0\0~~~}}}~~~~\0\0\0\0\0~}}|{{zz\0yyxxwww\0vvvvvvw\0wwxxyz{\0|}~\0x\x07\x07\x07\x07\0}|{zyxwwwwww\0xxy{|}~\0\0~\x07\x07\0~~~~~\0~~\0\0\0x\0~~~}}}}~\0~\0x\x07\0}|zywwvuutt\0uuvwwxy\0{|~\0p\0~}}|{\0zzzzyyy\0yyzzz{{\0||}~~\0\0\0~~}}}~\0~\0\`\0\0\0\0~~~~~~~\0\0\0~\0?~}||{z\0zzyyyzz\0zz{{|}~\0\0\0|\0\0~~~}}}|||||\0|}}}}~~\0~~\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0=\0\0|\0\0\0~~~~~~~~~\0\0\0\0\0\0\0\0\0\0~\x07~~~~~}}\0}}}~~~~\0~\0\0\`\0\0\0~~}}}||{{{\0|||||}}\0~\0x\0\0~}|\x07{{{{zz{\0{||}~~\0\0\0\0\x07~~~\0\0\0\0\0\0\0~~~~}}}}}~\0~~~\0\0\`\0\0\0\0\0~~~~~~~~~\0\0~~~\0~~\0\0\0\0|\0\0\0\0?~~~~}}\0}}}}}}}\0}~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0x\0\0~\x07~}}}}}}\0}}}}~~~\0~\0\0x\0\0\0~~}}||{{\0{zzzzzz\0z{{{|}}\0~~\0\0x\0\0~~~~~\0~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0?~~~~~\0~~~~~~~\0~\0\0x\0~\x07~~~~}}}\0~~~~\0\0\0\0\0~\0\0\0\0\0\0\0~~~~~~~\0~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0~\0\0\`\0\0\0\0\0\0\0\0\0~~~~}}}}\0|||||||\0|}}}~~\0\0\0\0\0~~\x07~~~~~}~\0~~~\0\0\`\0\0\0~~\x07}}}}}}}\0}}~~\0@\0\0\0~~~}}}|\0||||}}}\0~~~\0\0\`\0\0\0~~~~}}}\0}|||||}\0}}~~\0@\0\0\0\0~~~}\0}}}}}}}\0}~~~~\0\0\0\0\0\0|\0\0\0\0\0\x07~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~\0\0\0\0\0\0|\0\0\0\0\0\0~~~~~\0~~~~~~~\0\0@\0\0\0\x07\0\0\0\0\0\0|\0\0\0\0~~~~\0~~~~~~~\0~~~~\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0x\0\0\0\0\0~~~\0~}}}}}}\0}}}~~~~\0~\0\0~~~\0~~~~}}~\0~~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0@\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\b\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0\0\0\0x\0\0\0\0\0\0\0\0\0\0!\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~}}}~~~\0~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~}\0~~~~~~\0\0\0\0\0|\0\0\0\0~~~}}}}}}}\0}}}}~~~\0\0\0\0\0x\0\0\0\0\0\0~~~~~~~~~~\0~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0~\0~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0?~~~\0~~~}}}}\0}}~~~~~\0~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0s\0\0\0\03\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0?~\0~~~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0o\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\b~~\0~~}}}||\0{{{{zzz\0zzyyzzz\0zzzzzzz\0zzzzzzz\0{{|}~@\x07\b	\v\f\f\f\f\v\v
	\b\x07\0\0\0\0~~~}\0||{zzzz\0yyzz{{|\0}~\0x\0\0\0~~\x07~~}}}||\0{{zzzyy\0xxxxxxx\0wwwwwwv\0vuuuuuu\0vvwxz|~\0\0\x07	\v\r\r\r\f
	\x07\0~|{zxwvu\0uuuvvwy\0z{}~\`\x07\x07\0\0~}}}|\0||||{{{\0{zzyyxx\0wvvuutt\0ttttttt\0tttssss\0sttuvwy\0{~\0\b\v|\r\r\v
	\b\x07}{zywutsrrst\0tuwy{}~\0\0\x07\x07\b\b\b\b\b\b\x07\x07\0~}||{{zz\0zzzzz{{\0{zzzyyx\0wvvuuts\0ssrrrrr\0rrrsrrs\0sstuvwy\0{~\x07	\f|\f\v	\b}{zywvtrqqqq\0rrtuwy|\0~\0\x07~\x07\b\b\b\b\b\x07\x07\x07\x07\0\0\0~\0?~}||{zz\0yyyyyyz\0zzyyyxw\0vvussrq\0ppppppq\0qrrsttt\0tuuuuvw\0wyz|\`\b\v\r\f
\b\0\0\0\0\0\0~|{yxwtrq\0ppppqrt\0vy|p\b
\v\f\f\f\v
	\b\0?\0@\0~?}|{zzyy\0xxxyyxx\0xxxxwvu\0ttssrrr\0rrrsstu\0uvvvvvv\0vvuuvwx\0yz|\bp\v\f\v	\x07\0\0\0~}zxvu\0ttsstuw\0y{~\0\x07x	
\v\v\v
	\b\0?~}}}~\0@\x07\x07~|{zxwvu\0uuuuvvv\0wwxxxxw\0wwvvuuu\0uuuuuvw\0wwxxxyx\0xxwwwxx\0xyz|\`\x07
\r\f
\b\0\0\0\0}ywusqpono\0pruwz}\0@\x07\b	

	\b\0~}||||}\0\0\b~					\b\x07\x07\0\0\0~?}|{yxvu\0ttttttu\0vwxxyyy\0yyyyxww\0vvvuuvv\0vwwwxxy\0xxxwvvv\0wvvvwy|\0	~\x1B\r
\x07~{xvtrpnm\0lmnprtw\0z}\0\b	|\v\v\v
	\x07\0~}|{\x07{|}~\`\b		

		\b\x07\0~}}}}}~~\0\0\0\0~}\x07|{{zzyx\0xxxxxyy\0yyyzzzy\0yxxxwvv\0uuttttt\0sssssss\0sstuuvw\0y{~
x\r\x1B\x1B\r\v\x07\0\0\0\0\0|zxvtrponmno\0qsuwz}@\b
\v\v\v
	\b\0~}{{zzz\0{|}\0p\x07\b				\b\b\x07\0\0~~~~~\0~}}||||\0{{zzyyy\0xxwwvvu\0uttssrr\0rrssttt\0uvwwwww\0wwwwwvw\0wxyz|~@
\r\x1B\f\b\0\0?\0x\0~}{ywusqo\0ooopqrt\0wy|p\x07\b\b\b\x07\0~}{{zzz{|~\0\b	~\v\v\f\f\f\f\v
	\x07\0~|{{{zzzzzzz\0zzzzzyx\0xwwvuts\0ssrrrrr\0rstuvvw\0xyyzz{{\0zzyxxww\0vvvvvwy\0{}\0	\f|\r	\0~~~\0\0\0~|{ywu\0sqonnnn\0noqsvy{\0}\0\x07\b	~

		\b\x07~~\x07~~~\0x\x07	
\v\f\f\f\f\f\v	\b}{z\x07xwwvvvv\0wwxyyzz\0zzzzzzy\0xwwvvuu\0tttttuv\0vwwxyzz\0{{{{zzy\0xwvvuuu\0uwx{~\0\`	!"" \x1B\f\x07}{z\x07z{|||}~\0~~~}|{z\0xusqomm\0llllnps\0vy|\bp\v\f\r\r\f\v	\x07\0~}}~\0\x07	
\v\f\f\f\f\v
\b~?|zyxwvu\0uuvvwxy\0z{{||}}\0}}}|zzy\0xwvuttt\0tttuuvw\0xxxyzzz\0yyxxwwv\0vuvvxz|\0~\0\b\r~ "$$"\r\x07|ywvuvwwx\0yz{|}}|\0||zxvtr\0ponllmn\0oqtvx|\0@	\v\r\f
\b\0~}||||}~@\x07		



	\b\x07~|zxwvvvuuv\0wwxz{{|\0}~~~~}}\0}|{zywv\0vuutttt\0tuuvvww\0xxxxxxw\0wwvvwxz\0|}
x !""\x1B	|yvtsstt\0uvxyz||\0}}}|{yx\0vutrpoo\0opqsuwz\0~\x07
\f~\f
\b?}|{{{{|\0}~\0\b|	
\v\v\v\v
	\x07~|zxvutss\0sttuwxy\0z|}~\0\0\`~}{z\0yxwutts\0ssssrst\0uuuuuvw\0xxwwxyz\0|~~\0
x\r\x1B\x1B\f	{yvuut\0sstuvxy\0yz{||{{\0zyyxwut\0ttttuvw\0y|~\x07x	\f\r\r\r\f
\b\0~|{{{|}~\0\`\x07\x07\b\b\b\x07?}{zxwvu\0tttuvwx\0y{}~\0\`\0}|{yxvts\0rrqqqpq\0rsssttv\0wxxxyz|\0~\0\x07
|\x1B\f
\b\0}zwvvutsttvxy\0yz{|}}}\0||{{yxw\0wvvvvvw\0y{}p\x07	\v\f\f\r\r\r\r\f\v	\x07\0}}|}~~~\0@\0~|{zxwv\0uuuuvwx\0y{|~\0\`\0~}|{ywv\0utsrrqq\0qrrrsst\0uvvwxy{\0~\x07
x\x1B\v	\x07\0}zxwwutttuvxy\0z{|}}~~\0~~}}|zz\0yxxxxwx\0y{}~\`\x07	

\v\v\v\f\f
	\b\0~}~~~~~\0\0\0?}|{zyxv\0vvvwwxx\0y{}~\0\0\`\0?~}|{zxw\0vvuttss\0ssststu\0vvvwxy{\0~~\x07
x\r\x1B\r\v
\x07~zyxxwvuuvxyz\0z{|}~~~\0~~~}}|{\0{zzyyyy\0z{|}~@\x07\b\b	
		\b\x07\0\0\0\0C\0\0~}|{zyxw\0wwwwxxy\0z{}~\0\0\`\0\0?~}{zyx\0wvutttt\0sstttuv\0vvwxyz}\0~~\x07
x\f\r\f
	|yxwvt\0ssstvww\0xy{|}~\0~~}\0}|{zzyy\0zzzz{|~\0~\x07\x07\x07\x07\x07\x07\x07\0\0\x07\0\0\0~~}|{zxx\0wxxxxxx\0z{|}~~\0\0\0?~}{zy\0xxwvvuu\0uuvvvvv\0wxxxz{|\0~\x07x
\f\r\r\f
\x07\0}{zywutttuvw\0xxz{}~\0\0\0~}|\x07|{{zzz{\0|}~~\0\`\x07\x07\b\b\x07\0\0\0\0\0~~}}|{{\0zzzzzzz\0z{|}}~~\0\0\0\0\0~\0\0\0~}|\x07|{{zyyy\0yyxxxxx\0xxxyyxy\0yz{}}~\0@\b	
\r\r\f\v	\0~|{zxvvuv\0vwwxyz{\0|}~\0\0\`\0\0\0\0~~}|||{zz\0zzz{{{|\0}~\0|\x07\b\x07\x07\x07\x07\x07\x07\x07\0\0~}||{{{{zy\0yyyyyyy\0yyz{|||\0}}~~\0 ~\0}}|||{{\0zzzzzyy\0xxyyyyy\0yyyzz{|\0}}\x07x\x07	\v\r\f\v	\x07}|zywvuuuvvv\0vwyz{|}\0}~~\0~~~}}|\0|{{{{{|\0||}~\`\x07\b\b\b\b\b\b\x07\x07\0~~}}||{{{{{\0{zzzzz{\0{{{{{|}\0}~~~~\0\0\0\0\0\0\0\0\0~~~~}}||||\0{{zzzzy\0yyxyyyx\0yyz{||}\0\x07	~\f\r
\b\0~|zxwvvuuuuuv\0vwxyz{{\0|}}~~~~\0~~~~}\0}}~~~~\0\0~\x07\x07\x07\x07\x07\x07\x07\0?~~}}||\0|{{{{{{\0{{{{|||\0{||||}}\0}}~~\0\0\0\0\0~\0\0\0\0\0~~}}}||{\0zzzzyxx\0xxxxxxx\0yyz|}}~\0\b~
\f\r\r\r\f
\b\0}{ywvvuutttu\0uvvwxyz\0z{||}}~\0~\0\0\0p\0\0\0\0~\0~~~~}}}\0||||{||\0|||||}}\0}~\0\0p\0~}||{zyy\0xxxwwxx\0xyyyz{{\0|}}~\0\`\b\b	
\v\f\r\r\r\f\r\r\r\f\f
	\b\x07\0~}|zxwvuuttss\0stuvvwx\0yz|}}~\0\0\0\0\0\0\0\0\0|\0\0~~}}|||{{\0{|||}}~\0~\0\0\0|\0\0\0~}}||{{zy\0yyyyyyy\0yzz{{|}\0}~\0\0p\0~}|{{zzyx\0xxxyyyy\0z{||}}~\0\0~\0\0\0\0\0\0|\0\0~~~~~~\0~~~~~\0\0~~~~\0}}}}|||\0|||||||\0}}}}}~~\0~~\0\0\`\0\0\0~~~~~~~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~}}}|\0||{{{{{\0{{{{{||\0}}}~~\0\0\0\0\0\0\0\0\0\0\0\0\0~~~}\0}}}}}}}\0}~~~\0@\0\0~~}}}}||||\0|}}}~~\0\0~\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0~\x07~~}}|||\0|||||||\0||||}}~\0~~\0\0\`\0\0\0~~~}}}}}}\0}}}~~~~\0\0\0x\0\0~~}}\0}|}}}}}\0}~~\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0~~~}}}||{\0{{{{{{{\0{{|||}~\0~~\0\0\0p\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\b~\0~~~~~~~\0~~~~\0\0\0~\0\0~~}}|||{{{\0||||}}~\0~\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~}}||||\0{{{{|||\0|}}~~\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0~~~~}}}}\0}}~~~~\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~}}}\0}}}}}}}\0}~~~\0\0\0\0~\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0q\0\0\0\0\0\0\0\0~~~~~~~\0~~~~\0\0\0\0\0\0\0\0~~~~~\0~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~~~\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\x07~~\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0O\0\0\0\0q\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0~~\0~~~~~~~\0~~~~~~\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\`\0@\0\0\0\0\0y\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0o\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~\0~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0?\0~~~~~}}\0}}}}}}}\0}}}}|||\0|||{{{{\0zzzzzzz\0zzzzzzz\0zzzz{{{\0|||}}}~\0~~\0\0\0p\0\x07\x07\b\b\b\b\b\b\b\b\b\b\b\x07\x07\x07\x07\0\0\0~~~}}}|||||\0|||||||\0|}}}}}}\0}}}}}}}\0}||||{{\0{{zzzyy\0yyxxxxx\0xwwwwww\0wwwxxxx\0xxyyzz{\0{|||}}}\0~~\0\0p\x07\b\b		







		\b\b\x07\x07\0\0\0\x07~~~~~~~\0~~~~~~~\0~\0\0p\0\0\0~~~~}\0}}}}}}|\0||||{{{\0{zzzyyy\0xxxwwvv\0vuuuutt\0ttttsss\0sstuvwx\0yz{|~\0\0\0\x07\x07\b\b\b			

\v\v\v\v\f\f\f\r\f\f\f\v\v

	\b\b\x07\0\0\0~}}||\0|{{{{zz\0zyyzzzz\0{{{||}~\0~\0\0\0p\0\0\0\0\0\0~~~~~\0~~~~~~~\0~}}}|||\0|{{{zzz\0zyyyxxw\0wwvvuuu\0uuuuvwx\0z{{{|~\0\0\0\0\x07\x07\x07\x07\b		

\v\v\f\f\f\f\f\f\f\v\v\v
	\b\x07\0~~~}|{z\0zzzyyxx\0xxxxxxx\0xyyzz{|\0}~\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~~}}\0|||{{zz\0yyxxwwv\0uutttss\0sssstuv\0xyzz{|~\0\0\0\0~\x07\b\b		


\v\v\v\v\v\v
		\b\b\x07\0\0\0\0\0\0\0\0?~}}|{\0{{zzyyy\0yxxxxxy\0yyz{||}\0~\0|\0\0\0~~~~~~~\0}}||{{z\0zyyyyyy\0xxwwwvv\0uuuttts\0ssssttu\0wxyz{|}\0~\0\0\0|\x07\x07\x07\b\b\b	


\v\v\f\f\f\f\f\f\f\v

	\b\x07\0\0\0\0\0\0~~~}}\0||||{{{\0zzzzzyy\0yzz{||}\0~\0|\x07\0\0\0\0\0~~~~\0}}||{{z\0zyyyxxx\0wwvuuut\0ssrqqqq\0pppqqrs\0uvxyz{|\0~\0\0\0|\x07\x07\b		

\v\v\f\f\f\f\v\v\v
		\b\x07\0\0~}}||||{{z\0zzyyxxx\0yyyyz{|\0|}~\0p\0\0\0\0\0\0\0\0~~~}}|\0|{{{zzy\0yxxwvvu\0tsrrqqp\0ppppprs\0uvwxyz|\0~~\0\`\x07\x07\b	

\v\v\f\f\r\r\r\f\f\v\v
	\b\x07\0~}}||{{zz\0zyyxxxx\0xyyz{{|\0}\0\0|\0\0\0\0\0\0\0?\0~}}}}|{\0{{zzyyx\0xwwvuts\0rrqppoo\0nnoprtu\0vwxy{}~\0\0x\x07\b		


\v\f\f\f\f\f\f\v\v


	\b\x07\0~}}}}||{zzz\0zyyyyyz\0z{|}}~\0\0\0\0\0\0\0~~~\x07~~~~~~~\0~~~~~}}\0|||{{zz\0yyxxwwv\0utssrqp\0ooonnnn\0ortvwxy\0z|~\0\0\0x\x07\x07\x07\x07\x07\x07\b\b	

\v\v\f\r\r\r\r\f\f\v\v
	\b\x07~}}}||\0{{zzyyx\0xxyyyz{\0|}~\0p\0\0~~~~}}||||||\0|||||}}\0}}}||||\0{{zzyyy\0xxxwvvu\0tsrqqpp\0oopqruv\0wxy{}\0@\0\x07\x07\b\b\b\b\b\b\b		
\v\v\v\v\v\f\f\f\f\f\f\f\v

		\b\x07\0~~}}||{{zz\0yyxxxxx\0yzz{{|}\0\0\0|\0~\x07~~}||{|\0|||||||\0||}}}}}\0}}|||{{\0{zzyyxx\0wvvutsr\0qqppopr\0tuwxyz}\0\0~\x07\x07\b\b				\b\b\b		



\v\v\v\f\f\f\v\v\v
		\b\b\x07\0~~}}||\0|{zzzyy\0yyyz{{|\0}~\0\0p\0\0\0?~~~~}}|\0|{{{{{|\0||||}}}\0||||||{\0{zzzzyy\0xxwwvvu\0tsrqqqp\0pqsuwwx\0y{}\0\0p\x07\b\b							

\v\v


\v\v\v\v\v\v

	\b\b\x07\0\0\0a\0~~~~}}}|||{{\0zzzz{{|\0|}~~\0\0p\0~~}}|{{{{\0{{{{{{{\0|||{{{{\0{zzzyyy\0xxwwvvu\0uttsrrq\0qqrsuvx\0xyz|~\0\`\x07\x07\b\b	\b\b\b\b	




\v\v\f\f\f\v\v

	\b\x07\0\x07\0\0\0\0~~~\x07}}|||||\0{{{{{{|\0|}~~\0\`\0\0?~}|||\0|{{{{{{\0{{{{{{{\0{{{zzzy\0yyxxwwv\0vuutsrr\0qqqqrsu\0wxyz{}\0\x07\x07\b\b	



		
\v\v\f\f\f\f\f\r\r\r\r\f\f\v
	\b\x07\0\0~~~~~~\0@\0\0\0\0\0~~}\x07}}}}|||\0|||{{{{\0|}~~\0@\0\0~~}|\0|||{{zz\0zzzzzzz\0zyyyyxx\0xxxxxww\0vvvutts\0rrqqqqr\0suwxxy{\0}\0|\x07\x07\b	


				

\v


\v\v\f\f\v\v\v

	\b\x07\x07\0\0?~~}~~~~\0\0\0\0\0x~\0}||}}}|\0|{{{{{{\0{{{|}~~\0\0~\0~}|||{{{{\0zzzzzzz\0zzyyyyy\0xxxxxxx\0wwwvvvu\0utsssrr\0qrstvxy\0yz|~\0p\x07\x07\b	


		


\v\v\v\v\v\v\f\f\f\f\v\v\v
	\b\b\x07\0\x07\0\0\0\0\0|\0\0\0~~\x07~}}|{{|\0|{{{{{{\0{{{{{||\0}}~~\0\`\0\0~~~~}}}||||\0|||{{{z\0zyyxxww\0wwvvuuu\0uttssrr\0qqqpqrt\0vwxxy{}\0\0~\x07\b		






\v\v\v\v\v\f\f\f\f\f\v\v\v
	\b\x07\x07\0~~\0@\0\0\0\0\0\0~|\0|||||{{\0{{{{{{|\0|}}~\0@\0\0?~~\0}}}}}}}\0|{{{zzy\0yxxxwww\0vvvvvuu\0ttssrrq\0qqstvwx\0xy{}\0\0\`\0\x07\b\b\b\b\b\b\b		





\v\v\v\v

	\b\x07\x07\0~~~\0\0\0\0x\0\0\0\x07~~}|||\0}||||{{\0{{{||||\0}}~~\0\`\0\x07~}}}}}\0}}|||||\0|||||{{\0{zzzyyx\0xwwwvvv\0uuutssr\0rrrqqqs\0tvxxyz{\0}\0\0|\x07\b\b\b\b\b\b		





\v\v\v\v\v

	\b\b\x07\x07\0\0\0\0c\0\0\0\0\0\0\0~}}}~~}\0}|||}}|\0|||}~~~\0~\0\0|\0\0\0\0~~}}}}}}\0}|}}}~~\0~~}}}}}\0||{zzzz\0yyxxwww\0vuuttss\0rrrrtvw\0xyyz|~\0\0\0\0\x07\x07\x07\x07\x07\b\b						





	\b\b\x07\x07\x07\0\0\0\0\0\0\0\0\0~}}\x07}~~}}}}\0}}|||||\0}}~~~\0\0\0\0?~~~}}\0}}}}}}}\0}}~~~\0~~~}}||\0{{{{{zz\0yyyyxww\0vuuttsr\0rstvwxy\0yz|~\0\0\`\0\x07\x07\x07\b\b\b\b\b\b\b						\b\b\b\x07\x07\x07\0\0\0G\0\0\x07~~}}}\0|||||||\0|}}~~\0@\0\0\0\0~~}}|||\0}}}}}}~\0~~\0~~~}}||\0|{{{zzy\0yyxwwvv\0uutssss\0tuvwxyy\0z|}\0\0\`\0\x07\x07\b\b\b\b\b\b\b\b\x07\x07\x07\0\0\x07~~~}}}\0}}}}}}}\0}}~~\0\0\`\0\0\0~~}}}|||||\0|}}}}~\0\0~~}}||\0|{{zzzy\0yxxwwvv\0vuuuuuv\0vwxyzz{\0|}~\0\0~\x07\x07\x07\b\b\b\b\x07\x07\x07\x07\x07\0\0~~~}}\0||||||}\0}~~\0@\0\0\0\0~~}}||\0||{{{||\0|}}}}~~\0\0~~}}}\0}|||{{z\0zzyyxxw\0wwvvvvv\0vwxyzz{\0{|}~\0\0\0\x07\x07\x07\x07\x07\x07\x07\0\0\0?~~}}}|\0||||{||\0|}}~~~\0\0\0\0~\0~~}}}||\0|||||||\0}}~~~\0\0~~}}}\0||{{{{z\0zyyxxxw\0wwwwwww\0wxyz{{{\0|}~\0\0|\x07\x07\x07\x07\x07\x07\0\0\0~~~}}}|\0|{{{|||\0||}~~~\0\0\0\0\0\0~\0\0\0\0\0~~}}}|||{||\0|||||}}\0~~\0@\0\0\0\0~~}}}|\0||{{zzz\0zyyxxxx\0xxxxxxx\0yz{|||}\0}~\0\b\0\0\x07\x07\x07\x07\x07\0\0\0\0?~~~~}}\0|||}}}}\0}}~~~\0\0\0\0\0x\0~~}}}}}\0|||||||\0||||}}}\0~~~~~~\0~~~\0~}}}}||\0||||{{{\0{zzzzzz\0yyyyyzz\0{||||}~\0\0\0\`\0\0\0\0~~}}}}}}}\0}}}}}}~\0~~~~\0\0~~~~}\0}}}}}}}\0}}}}}}}\0}}}}}}}\0}~~~~~~\0~~}}}}}\0}}}||||\0|||{{{{\0zzzzzzz\0zzzz{{|\0|}}~\0\0\0\0\0\0\0\x07~~~~~~}\0}}}~~~~\0~~~\0~~\0~~~~~~\0}}}}}}}\0}}}}}}}\0}}}}}}}\0}}}~~~~\0~~~~~~~\0~~~~}}}\0}}|||{{\0{{zzzzz\0z{{||}}\0}~\0\0\0p\0\0\0\0\0~~~~~~}}}}\0}}}}}~~\0~~~\0~~~\0~~~~~~\0}}}}}}}\0|||||||\0}}}}}}}\0~~~~~~\0\0~~~~~\0~}}}}}|\0|||||||\0||}}}}~\0~~~\0\0\0\0\0\0\0\0\0\0\0\x07~~~}}}\0}}}}}~~\0~~~\0\0~~~\0}}}}|||\0||||||}\0}}~~~~\0\0~\0~~~~~~~\0~~~\0~~~~~~~\0~}}}}}}\0}}}}}}}\0}}~~~~~\0~\0@\0\0\0\0\0\0\0\0~~~~~}\0}}}}}}}\0}}~~~~~\0~\0~\0~~~~~~~\0~~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~\0~~~~~~~\0~~~~~}}\0}}}}}}}\0}}}}}}}\0}}~~~~~\0~~\0\0\0\0\0\0\0\0?~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~}~~~~\0~~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0~\0~\0~~~\0~~~~~~~\0~~}}}}~\0~~~~~~~\0~~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0~~}}}}}\0}}}}}~~\0~}~~~~~\0~~~~~~~\0~\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~}~~~\0}}~~~~~\0~~~~~~~\0~~~~~\0~~~~~\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\0\0\0~\0~~~\0~\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0~~~~~~\0~~~~\0\0\0\0\0\0\`\0\0\0\0~\0~~~~~~\0~\0\0\0~~\0\0\0\0\0\0\0\0?\0\0\0\0\0\08~~\0~}}||{{\0zzyyxxw\0wwvvvuu\0uttttss\0sssssst\0uuvwxxy\0{|}~\0\`\x07\x07\b\b\b		


\v\v\v\v\f\f\f\v\v


	\b\b\x07\x07\0\0\0\0~\x07~}}}}}|\0|||||||\0|}}~~\0\0\0\0\0~~~}}|\0|{{{{zz\0zzyyyyx\0xxwwwvv\0uutttss\0rrrrqqq\0qrstuvw\0xy{}~\0\`\x07\b\b	
\v\v\f\f\f\f\r\r\r\r\f\f\v
	\b\x07\x07\0\0?~~}}||\0||{{zzz\0zz{{{{|\0|}}}~\0\0\0\0\0~}}|{zzy\0xxxxwww\0wwwwwww\0wwwwvvv\0vuuttss\0srrrrrr\0stvwwyz\0}\0|\b\b		
\v\f\f\f\f\v\f\r\r\f\v
		\b\x07\0\0\0\0\0\0\x07~~}||{\0{zyyyyy\0xxxxxyy\0yzz{|}~\0~\0|\0~}|{zyyxxwv\0vuuuuuu\0uuuuuuu\0utttssr\0rqqpooo\0nnnopqs\0tuvxz}\0\0\b	

\v\f\r\r\v
	\b\x07\0\0\0\0\0\0\0~~~}\0}||{zzy\0xxxxwwv\0vwwxxyy\0{|}}~\0@\0\0~}{{zyxwvvu\0uuutttu\0uuuuttt\0ssrqqpo\0nmlkkkk\0lmopqsu\0w{}p\x07	
\v\f\r\r\f
	\b\0\0\0\0\0\0~~}}||{\0zzyxxxx\0wwvvvww\0xxyz{|}\0~\0x\0\0~}|zyyxww\0vuuuttt\0ttttttt\0sssrrqp\0oonmlkk\0kkklnop\0rsux{}\0\b
\v\f\f\r\f\v	\b\0?~\0~}}}}|{\0{zzyxxw\0wwwvvvv\0vwwxyyz\0{|}~~\0@\x07\x07\0~}|{yxwv\0vutsrrr\0rrrrrrr\0rrrqqqp\0ponmmll\0kkklnoq\0rsuxz}\0@\x07	\v\f\r\r\f\v	\b\0~\0~}}}}|{\0zzyyxww\0wvvvvuu\0uuvwxxy\0z{|}}~\0\0\0\0~}|{zxww\0vvuttss\0ssrrrrr\0rqqqppo\0nnmllkj\0jklmnpq\0rtwy|~\0@	\v\r\r\f\v	\b\0?~~~~}}|\0|{{{zyy\0xxwwvvu\0uuuuuuu\0vvvvwxy\0zz{|}}~\0\0|\0~~}\x07||{zyxx\0wwvvuuu\0utttsss\0rrqpoon\0nnmlkkk\0lmopqst\0wy|~\0p	\v\f\r\f\v
\b\x07\0\0\0\0~}||{{zzyx\0xwvvvuu\0uttttuu\0uuvwxxy\0yz{|}}}\0~~\0\0\0p\0\0\0~~}}||{\0zyxxxxw\0vvvvvuu\0uuuutts\0srqqpon\0nmllklm\0opqstvy\0|~\0\b|\v\f\r\r\f
	\x07\0\0\0~~}|{{zy\0xxwwvvu\0ttttttt\0uuvwxxy\0zz{|||}\0~~\0\0~~~}}||\0|{{zzyx\0wwwwvvv\0uuuuuuu\0tttttsr\0qpponnm\0lllmoqr\0stvy{~\0@\b
\f\r\r\r\f
	\b\x07\x07\0?~}}|{zy\0yxxwvuu\0uuuuuuv\0vwxxyyz\0{||}}}~\0~~~~~~~\0~~}}||{\0{{{zzzy\0yyyxxww\0wwwvvvv\0vvvvuuu\0uttsrrq\0qpooono\0qrstuwy\0{~\0\x07|
\f\r\r\r\f\v	\b\x07\0~}|{zzyx\0wvuuttu\0uuuuvwx\0xyyyzz{\0{{|||}}\0||||{{{\0{zyyxxw\0wvvvuut\0sssrrrr\0rrrrrrr\0rrqqqpp\0oonnmmm\0npqrstv\0x{}\0p\b\v\f\r\r\r\f\v
	\b\x07\0?~}|{{z\0yxwvvuu\0uuuuuuv\0vwwxxyy\0zz{{{||\0||||}}}\0}||{{zz\0yxxwwvv\0utsssss\0rrrrrrr\0rrrrrqq\0pponnnn\0oprstuv\0y{}p\x07
\f\r\x1B\r\f\v
	\b\b\x07\x07\0~}}|{zyxxww\0wwwwwww\0wxxxyyy\0zzzzz{{\0{{{{{{{\0{zzyyyy\0xxwwwvu\0tssrrqq\0ppooooo\0ooooooo\0nnnmmmm\0noqrstu\0wy|~\`\x07
\f\r\x1B\x1B\r\f\v
\b\x07\0~}||{zywwvv\0vvvvuuv\0vvwwwww\0wwwwwww\0wxwwwww\0xxwwvvv\0vvvuutt\0srqqppo\0onnmmnn\0nnnmmmm\0mmmlllm\0npqstuv\0y{}p	\v\f\r\x1B\r\f
	\b\b\x07\0~~}\x07}|zyxxx\0xxxxxxx\0xyzzzzz\0zzzzzzz\0zzyyyyx\0xxxxwww\0wwwwvvu\0uttssrr\0rqppppp\0ppppoon\0nnmmmmm\0noqrstv\0xz}\0p	\v\f\r\x1B\x1B\x1B\r\f
	\b\b\x07\0~}|\x07|{yxwww\0wwvvvvv\0wwxxxyy\0yyyyyyy\0yyxwwww\0wwvuuuu\0utttsss\0rrqqqqq\0ppooopp\0ppooooo\0onnnnnn\0noprstu\0wx{}\0\`\b
\v\r\r\f
		\b\x07\0~}}\x07}|{zyxx\0xxwwwvv\0wwwxwww\0xxxxxxy\0yyxxxxx\0xxxwwvv\0vvuuutt\0ssrrqqr\0qqppqqr\0rrrrrrr\0rrrrrqq\0qrrsuvw\0wyz}~\0\`\b
\f\r\r\f\v

	\b\x07\x07\x07\0~}}\x07}||zyxx\0xwwvvuu\0uuvvvvw\0wwwwxxx\0xxxxxxx\0xwwvvvv\0vvuuuuu\0ttsssss\0rrrqqrr\0rssssss\0ttttsss\0sssttuv\0wxyz{}\0\b
\v\f\r\r\r\f\v\v
	\b\x07\x07\0~~~}}|{zy\0yxxwwvv\0vvvvwww\0wwwwwxx\0xxxxxxx\0wwwwwvv\0vvuuuut\0ttssssr\0rrrrrrr\0rrssstt\0tuuuuuu\0uuuuuuu\0vwxyz{|\0~\0~\b
\v\f\r\r\f\v\v
	\b\x07\x07\x07\x07\x07\x07\0~}}|{zyyxwww\0wwwvvwx\0xxxxxxx\0yyxxxxx\0xwwwwwv\0vvuuuuu\0utttttt\0sssrsss\0ssssstt\0ttuuuuu\0uuuuuuu\0uuvwxyy\0z{|~\0p\x07	
\v\v\f\r\f\v
		\b\x07\0~~}|{zzyx\0xwwvvvv\0vvwwwwx\0xxxyyyy\0yyxxxxx\0wwwvvvv\0vvuuuuu\0uuuuuuu\0uuuuvvv\0wwwwwwx\0xwwwwvv\0vvvuuuv\0wxxyzz|\0}\0|\x07\b	

\v\r\r\f\f\v
	\b\b\x07\0\0~~}}}|{\0zzyyxww\0wvvvvvv\0vwwwwxx\0xxyyyyy\0yyyxxxx\0wwwvvvv\0uuuuvvv\0vvvvwww\0xxxxyyy\0zzzzzzz\0yyyxxxw\0wvvvvwx\0yyz{|~\0@\b
\v\v\f\r\r\r\f\v
	\b\b\x07\0\0\0~}}|{zy\0yxwwvvu\0uuuuuuv\0vvvwwwx\0xxyxxxx\0xxxxxww\0wwwwwww\0wwxxxxy\0yzzzz{{\0{|||||{\0{{{{zzz\0yyxxwww\0vvvvwxy\0zz{}~\0\`\x07\b	

\v\f\r\r\r\r\r\r\r\r\f\f\v
	\b\x07\x07\x07\0\0~~}||\0{zzyxxw\0wvuuuuu\0uuuuvvv\0vwwwxxx\0xxxyyyy\0yyyyyyz\0zzzzz{{\0{||||}}\0}}}}}}}\0}}}|||{\0{{zzzyy\0xxxwwww\0wwwxyzz\0{|}~\0p\x07\b		
\v\f\f\r\r\r\r\r\f\v\v
	\b\b\x07\x07\0\0\0~}}||{zz\0yyxwwwv\0vuuuuut\0tuuuvvv\0vwwxxxy\0yyzzzz{\0{{{{{{{\0|||||}}\0}~~~~~~\0~~~~~\0~~}}}||\0||{{zzz\0zzyyxxx\0xxxxxyz\0{||}~@\x07\b		

\v\f\f\f\f\f\f\r\r\r\r\r\r\f\v\v
		\b\x07\0\0~~~}||{{zzy\0yxxwvvu\0uttttss\0sstttuu\0vvwwxxy\0yzz{{{|\0||}}}}}\0~~~~\0\0\b~~\0~}}}}||\0{{{{zzz\0yyyyyyx\0xxxxxxy\0zz{{|}~\0~\x07\b\b		
\v\v\v\v\v\f\f\r\r\r\r\r\r\r\r\r\r\r\f\f\v\v
	\b\b\x07\0\0\0\0~~}}}|||{{z\0yyxxwvv\0uuutttt\0tuuvvww\0xyzz{{|\0|}}}~~~\0~~\0\0\0p\0\0\0\0\0?~~~}}}\0}|||||{\0{{{{{{{\0{{{{{{{\0{{||}~~\0\0~\x07\x07\b\b\b							




\v\v\f\f\f\f\f\f\f\v\v\v
	\b\b\x07\0\0~~~~}}}\0}|||{{z\0zyyxxww\0wvvuuuu\0uuvvwwx\0yyzz{|}\0}}~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0?~~}}}|\0||{{{{{\0{{{{{{{\0{||||||\0||||||}\0}~~~\0\0\`\x07\x07\b\b\b		








		\b\b\x07\0?~~~~~}\0}}}||||\0{{{zzyy\0yyxxxxw\0wxxxxyy\0yzz{{||\0|}}}}~~\0~~\0\0\0\0\0\0~~~}}\0}}||||}\0}}}}}~~\0~~\0~~~~\0~~~~~~\0\0\0p\x07\x07\x07\b\b\b\b\b\b\b\b\b\b\b\b\x07\x07\x07\0\0~~~}}}|\0|{{{{{{\0{zzzzzz\0zzzz{{{\0{{{||||\0|}}}}}}\0}~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0~~~~~}}}}}\0~~~~~\0\0\0\0\0\0|\0\0\0\x07~~~}}}}\0|||}}}~\0~~~\0\0p\x07\x07\0~~~~}}}}}}}\0}}}}}}}\0}}}}}}|\0|||||||\0|||||||\0|||}}}}\0}}}~~~~\0~~\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0~~~}}}\0}||||||\0||||||}\0}}~~~\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~~~\0~}}}}||\0|||||||\0||||}}}\0}~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0~}}}}}}\0}}}}}}}\0|||}}}}\0}}}}}~~\0~~~~~\0\0\0\0\0\0|\0\0\0\0~~~~~}}}\0|||||||\0||||||}\0}}}~~~~\0\0\0H\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~~\0~~}}}}}\0}}}}|||\0}}}}}}}\0}}}}}}~\0~~~}}~~\0}~~~~~~\0~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\x07~~~~~~\0~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~\0~~~~~~~\0~~~~~~~\0~~~~~}}\0}}}}}}}\0}}}}}}}\0}}}~~~~\0~~~~\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~\0~~~~~~~\0~~~~~~\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0~~}}}|||\0{{|||}}\0}~x\0\0\0|\0~}{{zz{{|\0~\0|\0~~~}}}}}}\0}}||{{z\0zyyyyyy\0yz{|}}~\0\0\0\0\0<~}}}}\0|}}~\0\`\x07\b		
	\b\b\0~|zy\x07xwvvuuv\0wxyz|}\0\b	\v\v\f\r\r\f\v
	\b\0}|zxvuttsss\0stuwy{}\0\0\b
\r\f	~{xurpnml\0kjjjjkl\0mnprsuw\0yz|}~~\0~}|{\0zyyyz|\0\v\x1B $())(%!\x1B\fxof^XTQOPR\0W\\cjry\0@\x07\r\r	ysmgb^[Y\0XY\\\`ekq\0x\r|"$$%%%%%%#"!
|?tmd\\UOK\0HGHKPV]\0fpy\vx"$%$!
~yuqnkgec\0\`_][YWV\0UUUVXZ^\0bhnw\fp(1;EMQRQMJF?4&\x07znaS\x07G=63224\x008>FPZep\0{\x1B!&~+/0000010.+)'$\v|sj\`XQKFC\0ABDIOV^\0gp{\rx#)-14578987641.)"\x1B\b~?sg[PF=6\x001//27>G\0R^kxp!',..,(#\v?zvrolki\0geb\`^\\Z\0VSPNNNO\0QTY\`ju\0@\v#1?LU[^\`a\`[SG8)\v{jZK>5/*(\0),29BLW\0bmx	x ',/148;=>>=<:72+#xk_SH?7\x001..15;B\0KWco{\`")059<?@AA@@><83-&
~qdXLB80*((*/\x006?JVbo|\0\x07$*.121/,(#\b|xsnic^ZV\0RNJHEDD\0EFHLPV\\\0dmy)x5CQ\\eknoomg[M<)q]J8\x07*!\0'2?LZhu\0
 &*-/0258;=?AAA?;5-#
|m]NA5+#\0!'.7CQ\0_m{\b&x.49=@BCCDDEDC@;60(whZM@5+\0$ "'.9\0ER\`n|	\`&,03431.*&!
}xrlf\`ZTM\0GB=:878\0:>CJR[f\0s)5D~S_iqtvwvri]M<+q]J9, \0'2?M[iu\0\v'-259<?CEGHIHFC?80'qbSF9.$\x1B\0"*3?L\0Zhu\x1B&x/7>DILNPPPOMHB<4+!\bz?l^PD8.&\0 $,5\0@LYft\r\` '-2677530-)%\bz?rjc[SKD\0>8410/0\x0048?GQ[h\0w"0>M~[fpvyzzwpgZJ8'\0lZH8+ \0%0<JWdp\0{")/~37;@DFHIIIHE@:2(vgYK>3*#\0")2=J\0Wer\0\x1B'x19@EJLOPOMKHD?92*!\rui]QF=4\0-(%%'+1\x009CNZfr~\0	%+0355420,("\v}?vohaZTM\0FA<8643\x0047;AJUa\0o}\v*<L|[gpv|{shYJ:(nZJ=0' \x1B$\0,5@JT^h\0qy\v|#)/5;@DHKMMLID=4)r?cUG;1)$\0  "'.8C\0O\\iv\x1Bp&/7=CHKMNONKID?91'yl_SG<3\0,'$#%(.\x007ALWcoz\0 %),./.-*'#\x1B\f\0ztmf_WP\0IC>9532\x0037<DNZg\0u#5DS~\`hotxxuncVH:)tbTG;2+'$$&*0\x007@IQYai\0qz\b|%,16;?CFHIHEA91(u?gYMB81+\0('(-3<F\0Q\\hup#,39>CEGHGEB?:5/'\fxndZPHA\0<86568=\0CJS[clv\0\x07 ~"$$#" \f\x07}wpjc]W\0RLGCA@?\0@CIPYcn\0z$2@L~U\\chjie]SH<-~n_SH>8\x0041025:@\0HPW]djq\0w}	\f|#(-16:=??>:5/&x?k^RH>71\0..05<DN\0Xdp|\bp%+169;<<;963/+& \x1B\x07\0yqjb[UO\0KGEDCEH\0MRX^elt\0{\b\f~\f	~zvqlgb\0]XTPNLK\0LOT[clv\0+8CMU[\`a_[SI?2$v?h\\RIC?<\0<>BGLSZ\0aglqtx|\0~\b|\f$*/257641+$\x1BzodYPHB?=\0=?DJQZd\0mx\v\x1B!|&),.//.-+)&$!	?ysmhc^Y\0VRPOPQT\0W[_djqv\0|
\r~\v	\x07~?zwsokgd\0\`\\YVTST\0VZ_fnv@\r&2=EMTXZYUNF<0#wj^SJD@>>\0@DHOV]d\0jotx{@\b\v!&*-01/-)#\x1B	~sh^ULFA>>\0?DIPYcm\0w\f$)~,/00/-)&"\v\b|yvrnkgc\`\0]ZXWWWY\0[^afkpv\0{\0\b\f~\r\v	\0|yurolheb\0_][YYZ\\\0\`djpx\f\`#.7?GNRTTPKC:0$	{nbXOIDBAB\0FJPW^ek\0puy}\0p\x07	\r#'*,-,*&!\b~tj_VOHDAA\0CGLS\\fq\0|").~24442.*% \x1B\r\b|zxusqoljgd\0a_]\\[[[\0\\^aejot\0z	|
|xsokgda^[\0ZYXYZ\\\`\0ejpw	\`)2:BINRSRNHA7, xl\`UMFA>>@\0CHNU\\dj\0qv|\x07	x			

\v\f\r#&'((&#	vlbZRKFCB\0CGLS\\fp\0|\x07%,2~689750+%\f\x07~zxvtsr\0rqponlj\0heca_^]\0]^\`cfkp\0v|\b\r|\x1B\x1B\f{uojfb^\\ZY\0YY[]\`ej\0ov|\fx&-4;@EHIHEA<5,"\v\0uj\`XQKGEDE\0IMRX^dj\0pv|\0\x07x\b	
\v\f\r #$%&%# \x07~ulcZRLHED\0EHMT\\fp\0{\x1B$,2~7:;:73.(!\v?yuqnlkj\0jjjjjji\0ihfedbb\0bbcehko\0sx~\b\rx\x1B\x1B	}vpjd_[WTS\0SSVZ_dk\0ry\v&|-39?CEFDA=82*!\rzqh\`\x07ZTOMKKL\0ORVZ_di\0nsx{\`\b
\f\r\x1B "$$%$# 
{rjb[TPLJI\0KNSYajs\0}\x07")/~367640,& \f\0{vspmlk\0kjjjjjj\0ihgfeee\0efgilos\0w|\x07\v|\x1B\x1B\r\x07{uoid_[XWV\0VX[_ejq\0x\x07 '|-27;>??=95/)!\bwohb\\WTRQRS\0VY\\\`dhl\0qvy|~\`\x07	
\f  	|tmg\`[WSRQ\0RUX^dlt\0|\r#(~,.//-+'"\v\0zvspmlk\0kkkkkll\0lllkjjj\0iijklnq\0tx{\x07\vp\f\b~ysnid_\\ZY\0YZ]aflr\0y
\x1B")~.37:<;951+%\r|unhc_[YWWXZ\\\0_behkor\0vxz|}@\x07	\v\r\r\b|vpj\x07e\`]ZYYZ\0\\\`djpw~\0\v"&())(&# \x1B\v|?xuqomlk\0kkkllmm\0nnnnnnn\0nnoprtv\0y|\b
x\r\v\b\0|wrnieb\`__\0\`bfjou}\0\r$*059;;962-&}?vnhc_\\Z\0YYZ]\`cf\0jmpsvy{\0|}}~\0\`\x07	\f\x1B\x1B\x1B\r	~xsmhd\`^\\\\]_a\0ejpv|\b\`!""! \x1B
}zwtrponmm\0mmmnnnn\0onnoooo\0ppqstvx\0z}\x07x	


	\b~zwsokhfddde\0gjnt{	\`%+0467630,%~vohc_\\[[[\0]\`cgkos\0vy|~\0\`\0\0\0\0\0\0\0	\f\v{vplgdb\0\`\`acein\0rx}\b\rx\x1B\f	}zxvtsrrqqp\0ppppppp\0ppppqqr\0stuwxz|\0~\0\x07\b~				\x07\0~{xurpnmmnop\0sw}\bx%)-/0/.+'"xrlhdbaabdf\0jmqux{~\0\0\0~}|||}\0~\0	\f~\r\bzuqmjgfe\0efilosx\0}
\r~\r\v\b\0}|{zyyxwvvut\0srqpoon\0nnnnopq\0stvxz|~\0~?}{ywuts\0rrrsuw{\0\b\f\x1B~#%&'&$"\r\x07{vqlife\0efgjmps\0wz}\0x\0~|{zyyz{|\0\x07
\r~\f	}yuromkkkl\0mpsvz~@\b\v\r\v
\b\0~~}}||\0{zxwuts\0qpomlll\0llmmopr\0tvxy{}\0\0~?}{zyxww\0wxz|~\`\b\v\x1B\x1B\r	\0{wtqnmlmm\0oqtvy|~\0\0\0}{zyyyz{|~\0@\b\v\r\r
\x07\0}zwu\x07sqppqrs\0uwz|\`\x07	
\f\f\r\r\r\f\v
	\b\x07\0?~~}|{z\0yxwvutr\0qponnnn\0nnopqst\0vwy{}~\0@\0\0?~}||||}\0\0	\f~\f\b~{xvtrqqqrsuw\0y|~\0x?~|{zyyy\0yz{}~\0\`\b	
\v\v\v
	\b\0~|zxwuuuuvwxy\0{}\x07x\b	
\v\v\v\v
	\b\x07\0~}||{{{{zzz\0yyxxwvu\0tsrqqpp\0oppqrst\0vxz{}@\0\x07	\v\f\r\r\v	\x07\0}{yxwvvvw\0xy{}\`\0}|zzyyyzz\0{}~\0x\x07\x07\b\b\b\b\x07\0?}|{zyyx\0yyzz|}\0\0\b\b		
		\b\x07\0?~}|{{{{\0{||||||\0||{zzxw\0vutsrqq\0qrstuwy\0{~\0\x07|\b				\b\x07\0\0\x07	
\v\f\r\r\r\f
\b}|zyxxxxz{|\0~\x07|\x07\x07\x07}|zyxxxxyy{|\0~|\0~}{zyyxxxyz{\0|}\0x\x07\x07\0?~}}||||\0|||}}~~\0~~~~}||\0{zxwvts\0rqqqqqq\0rtuwy{}\0~\0~\0~~~\0~\x07	




		\x07\0}|zyyy\0yzz|}~\0@\0~?}{zyxxx\0xxyz{|~\0\0~\0~}|{{zzz\0z{||}\0@\0~~\x07\0@\0\0\0\0\0\0\0~~}|{z\0yxwwvvv\0uvvvwxy\0z|}~\0\`\0\0\0\x07\x07\b\b\b\b\b\x07\0~~~~~\0~\0|\0~}||{{{{\0{||}~~\0\0\0~~}}}}}}\0}~\0p\0\0~~~\0~~}\0}||{{zy\0xxwwwww\0wwxxyz{\0|}~\0p\0\0~~~~~~~\0\0\0~\0\0\0\0\0\0\0\0\0\0~~}}||{{{{|\0||}}}~~\0\0~~~~}}}\0}}}~~~\0\0\0\0\0\0\0\0\0\0c\0\0\0\0\0\0~\x07}}|{{zz\0yyyyyyy\0yz{{|}~\0\0|\0\0~~~~~~\0~\0@\0\0\0\0\0~~~~}}~~~~\0~\0\0~~~\0\0\0x\0\0~~~~\0\0p\0\0?~}|{zyy\0xxxxxyy\0z{|}~\0@\0~~}}|\0||}}}}~\0~\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~}}}|||||||\0|}}}~~~\0\0\0\`\0\0\0\0\0\0\0\0\0~~~~~~\0~\0\0\`\0\0~}\x07}||{{{z\0zzz{{{|\0|}~~\0@\0\0\0\0\0\x07\0\0~~~\0~~~~~~~\0~~\0\0p\0~~}}}\0|||||||\0||}}}}}\0}~~~\0\0\0\0\0~~~}}}}~~~\0\0\0~\0\0~~}\x07}||||||\0|||}}~~\0\0\0\0\0|\0\0\0~~~~~~~~\0\0\0\0\0x\0\0\0\x07\0\0\`\0~}}||{{\0{{{{{{|\0|}}}~~\0\0\0\0\0|\0\0\0~~}}}\0}}}}~~~\0\0\0|\0\0~~}}}||}}\0}}}}~~\0\0\0\0\0\0|\0\0\0\0\0~~~~}}\0}}}}}~~\0~~\0~\0~~~}}}}\0}}}~~~\0\0\0|\0\0\0~~}}}|||||\0|||||}}\0}~~~\0@\0\0\0\0\0\0?\0\0\0\0\0\0\0~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0c\0\0\0\0\0~~}}}}}}}}~\0~~~\0\0\0\0\0\0\0~\0\0\0\0c\0\0\0\0\0\0\0~~~~~~~\0~~~~\0\0\0\0\0\0\0~~~~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0~~~~~~~\0~~}}}}}\0~~~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~}\0}}~~~~~\0~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\`\0\0\0\0\0\0\0\0\0?~~~~~\0~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0\0~~~~~\0~~~~~~\0\0@\0\0\0\0\0\0\0\0~~~~~\0~~\0\0\0\0x\0\0\0\0\0\0@\0\0\0\x07\0\0\`\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0~\x07~~}}}}}\0}~~~~\0\0~~~~~\0~~~~\0~~~~~~~\0~~~~\0\0~~~~~~\0}}}}}~~\0~~~~\0\0\0\0\0x\0\0\0~\v}}|||{{\0{{{|}}}\0}}~\0~~~\0\0\0\0\0\0|\0\0\0\0\0\0?~\0~}~~~~}\0~~~~~~~\0~~~~~\0~\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0@\0\0\0\0\0g\0\0\0\0\0p\0\0\0\0?~}}}~~\0}}}~\0\0\`\0\0\0\0\0\0\0\0\0?\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\f\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0O\0\0\0\0\0\0\0/~~}~~}\0}}}~\0@\0\0\0\0\0\0?\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0y~~~~~}\0~~~\0p\0\0\x07~}|||||\0|{{{|}}\0|||}\0\0\`\0p\0~~~~}}}\0\0\`\0\0\0|\0~~~~~}}|}~~\0~\0p\x07\x07\x07\0\0~}~~~~\0~~~}}~~\0~~\0\0\0p\0\0\0\0\0\0\0~\0~~~\0~~~~~\0~~~}||{\0zyyyxwx\0xyzz{}~\0\0\0~\0~}\x07|{zzzz{\0{{|~\0\`\0\0?~}|{|{{\0}~\0\0x\x07\0~~}~}||}~\0\0\x07	
\v\v

\f\f\v\v
	\b\b\x07\0\0\0\0\0c\x07\x07\b\b\b\x07\0\0~~}~~~~~~\0~}||\0zzywvvv\0vvvvwxy\0zz{{|||\0|||{{zy\0xwvuuts\0rqqqqqr\0rstvwyz\0zz{|||{\0yyyyzz{\0}	\f|\f	\0~|||||}\0@\x07\b	\b\b\b\b\b\x07\0~}|{zyxxxwww\0wwwwxyy\0z{{|~~\0~}{\0ywuspom\0kihhhhh\0iijklno\0pqqqrrq\0qqppppq\0qqruy}@\x07\f"$&()*+(#
}vqnlji\0hgjmpvz\0~\x07\v~\x1B\r	~|zzyyzz\0zzz{||}\0}}}~\0\0\`\x07\b\b	

\v\v\v
	\x07\0}?yuqmjfb\0_\\ZYYYZ\0[]\`cgko\0ruxz|~\0~|{zx\0vsrpoon\0orvz
\`%*-...,)$\v\0zuqnlllmno\0rvy}	p\f\f\b}zwtrqqqqqr\0twz}\0p	\v\f\r\f\f\f\f\f\v
	\b}{yvspli\0gdb\`^\\[\0[\\]^^\`b\0ehkmpsv\0x{|}~~~\0|{yvrol\0igecbcf\0kpv|\fp'.2589961+$}vokgdbaacfi\0mrv{\vp !"""" \x1B\v}yurpnlklmoq\0tvy}\0\x07p
\r\f
\x07\0}{xu\x07roljige\0dba\`\`\`a\0aabcefh\0ikmortw\0xy{|~~~\0|zwurok\0gda_^_a\0djpv\b\`\x1B&.5;>AB@=81)!|tmg\x07c_\\[\\]\`\0dimtz\0\`\f!"#$$%$#!\x1B\r	~zuqomllll\0nptw{~@\b\v\v\b~{wtrpnmki\0hgggggg\0gfggghh\0ijkmopr\0tvy{||}\0}|{zwtq\0mjgdb\`_\0_adiov}\0$.6<@CEEC?90&
x?nga][YX\0XZ]bhms\0x~
|\x1B "#$" \v\b}zxutqonopqsu\0vy|~p\x07	
\v\v\v\v\v\v

	\x07}{xuromkjih\0gffgggh\0hhikklm\0npqstuv\0wwwxwvv\0tsrqonl\0lkjjkkl\0orv}\bp&-2577874/(	zslgdb\`_^^\0\`cglpty\0\v\x1B~!"##"!\x1B\v	\0}ywvuttrq\0rsuwxxx\0y{}~~~~\0~\0~\b		\b\x07{xurpnkig\0ggggghi\0jlmnnop\0qrstuuv\0wxxyyyx\0xxwvvts\0rqpponn\0noquy~@	'-2567873.%\x07vohdb\`_]\0]_bhnsx\0}
~!"##! \x1B\f
\b\x07~|zxwvu\0ssssttt\0ttuvwwx\0yz|~p\x07
\f\r\v\x07\0|yuqmjgedcba\0abdfhik\0npsvxy{\0}~\0|\0~|{zxvusq\0ponnopq\0tx|\x07\fx"'**)*)'$\f\b}wrn\x07kjihggh\0korvy|\0@	\r\f	~ytokigfdccd\0gjmoqtw\0{\b
|\r\r\v	\x07\0|yus\x07pmjgecc\0bbbcdfi\0loqtwz|\0~~|zxvsrp\0onllkkk\0lmnoqsu\0y}\x07\f| %)*+**)% \fxqjda_^]]_bg\0lsy\fp #$%$#!\x1B\r\b\0{wsp\x07mkjjjkk\0morvy}\0\x07
\f\r\r\r\r\r\r\f\v	\b\x07\0?~}}|zxv\0trqonlk\0klmnprt\0vy{~p\x07\b\b\b\x07\0~|ywutsqpo\0oppqqqr\0tuwxyz{\0}\b
\f|\x1B\x1B\x1B\f\b{xv\x07uuuvvwx\0{~\0\b	|\v\f\r\r\r\f\v
\b\x07\0?~}}}|zy\0xxyyyyy\0z{}\0p\x07\b\b\b\x07\x07\x07|ywuspnm\0llmmnoq\0svy{~@}{yxwvuts\0rrrsttt\0stuvvww\0wwxyz{|\0~\x07
\r~\x1B
~zwusqpppprt\0vy|\bp\v\r\r\v
\b~}{{yxxv\0vuutttt\0ttuvvwx\0yz{|}~\0@\0~|zxvut\0ssrrrst\0vwxy{|~\0\0\0\0\0|}|{yx\0wvutsss\0tttuvwx\0z{{|}~\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\b
\f\f
	\x07}|{{zzz{|~\0\x07	
\v\v\v\v\v
	\b\0?~}{zzzy\0xwvuvvv\0uutuvvw\0wwxy{|~\0\0\b	~	

\v\v\v
\b\0~?|zyxwwv\0uuuuvww\0xxyz{|}\0}}~\0\0\0x\0~}|\x07{zzzzz{\0{|}~\0p\b
\f\r\f
\b\0~}||\x07{{{||}}\0~\0~\0~}|{zyyyyxxx\0yyyzzz{\0|}}~\0\0\0\0\0\0\0\0\0\0~~~~~}}}\0}}}|||}\0}}~~~~~\0~~~~~~}\0}}}}}||\0|}}}|||\0}}~\0@\0\0~}|{zzzzyzz{\0|}}~\0\`\x07\x07\b	
\v\v\v\v

	\b\x07\0~}{zyxwvvvuu\0vvwxxyz\0{}~\0p\0~}}{zy\0xwwvvuu\0uuvwxyz\0|}\0x\x07\x07\b\b\b\b\b\x07\x07~}{zyxxxxxy\0z{|}~\0\`\x07\x07\b\b\b\b\b\x07\x07~~}||zzyyyyy\0yzz|}~\0@\x07\b	

\v\v

	\b\x07\0}|{zyyyy\0yyzz|}~\0~\0~\0?~~~~}}\0}}~~\0\0\0~\0\0\0~~~~~\0~~~~\0\0\0\0\0~}}}}}}\0||}}}~~\0~\0\0\0x\0\0\0~~}}}~}}}\0}}}}}}}\0}}}}~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0\0?~~}}||\0{{zzzzz\0{{||}~\0\0\0~}|{{zyyy\0yyyz{||\0}~\0x\0~~\x07}}}}}}}\0}~~\0\0\`\0\0~}\x07||||{{{\0{|}}~\0\0\0\0\0\0~~}}}|||||\0|}}~~\0@\0\0~~\x07~}}}}}}\0}}}}~~\0\0\0~\0\0~~}}}}}}}~~\0\0~\0\0~~}}}|||\0|||}}}~\0~\0\0\0x\0\0\0~~~}\0}}}}}}}\0}}~~~~\0\0\0\0\0\0|\0\0\0\0\0~~\0~~~~\0\0\0\f~~~\0~}}}|||\0||||||}\0}}}}~~~\0~\0\0\0\0\`\0\0\0~~~}}}}\0}}}}~~~\0\0\0\0|\0\0?~~}}||\0|||||}}\0~~\0\0\0p\0\0~}}}}}||||}\0}}~~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\x07~~}}}||\0{{{{zzz\0zz{{{||\0}~\0x\0~~~\x07~~~~~~~\0\0\0~\0~~}}}}}}~~~\0\0\0~\0\0~~~~\0@\0\0\0\0\0\0\0\0\0~\x07~~~~~~}\0}~~~~~\0\0\0|\0\0?~~~~~~\0\0\0\0p\0\0\0\0~~}}}}||||\0}}}~~\0\0\0\0~\0\0\0\0~~~~\0}}}||||\0||}}}}~\0~~\0\0\0p\0\0\0\0?~~}}}}\0|||||||\0||||}}}\0}~~\0\0~~~\0~~}}}}}\0}}}~~~~\0~\0~~\0~~~~~~~\0~~~~~\0\0@\0\0\0\0\0~~\0~~~~~}}\0}}}}~~~\0~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\x07~~~~~}~\0~~~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\x07\0~~~\0~~~~~~~\0~~~~}}}\0}~~~~~\0\0\0\0p\0\0\0\0~~~}}\0}}}}}}}\0}}}}~~~\0~\0@\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~~~~~\0~~\0\0\0\0\0\0|\0\0\0\0\0~~~~~\0~}}~}}~\0~~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0~\0~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0}}}}~~~\0~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~}~\0~~~~~~\0\0\0\0\0|\0\0\0\0\0\0~\0~~~~~~~\0~\0\0\0\0\`\0~~\0~~~~~~~\0\0\0~~~\0~~~~~~~\0~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~~\0~~~~~~~\0~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~}}\0}}}~~~~\0~~~\0\0~~~~\0~~~~~~~\0~~\0\0\0\0\0\0p\0\0\0\0\0\0\0\0~~~~~~~\0~~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0q\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0a\0\0~~~~\0\0\0~~~~\0~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~\0\0\0~~~~\0~~\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0A\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~}}}~~~\0@\0\0\0\0\0x~}|{zy\0yyyz{}~\0\0\x07\x07\x07\x07\0~}|zzyyyyz{{\0|}~\0\0\0p\0\0\0~~\x07}}}}~\0@\x07\b
\v\f\f\f\v	\x07\0}{xwvuuuvxz{\0~|\0?~\0@\0\0~|{zyxvv\0wwwwxy{\0|}~\0x\0\0~}}}}}\0}~~~~~\0~~}}|\0|{|||||\0}~\0x\x07\x07\x07\b\b\x07\x07\0}|zxvuu\0vwy{~\0\`	\v\f\r\r\r\f
	\x07}|{zyy\0yyyyyyy\0yz{|}~~\0\0\x07\b\b\b\b\b\x07\0?~}|{{zz\0zzzzzzz\0z{{{{{|\0||}~~\0@\x07\b					\b\x07\0~}{z\x07yxwvvvw\0wxxz|}~\0~\0?~}||||}\0}}}~~\0\0\0\`\0~~\0\0\0~~~}||}}~\0\0\0?~}||{||\0~\x07|\b\x07?}zyyxy{\0|~\0\x07\b|\x07\b\x07\0~|{z{{{\0}~x\0|zyxxwwxz\0|}~\0x\0\0\0|\x07\x07\0~|zyxxy\0z|~\0x\0}{zzzz{|}\0~}zxwvvv\0wxz|~\0\`\x07\x07\b\b\b	\b\0?~~}}|zy\0yyyyyyy\0zz{{||{\0|}~\0\0\0?\0\0~}~\0\0\0\0~\0\0~~|\x07||||{{|\0}~~\0\0p\0\0?~}}}}}\0}~~~\0\0\0\0~\0\0\0\0\0\0\0\0y\0}||{{{{{||}~\0\0\0\0\0~\0\0~~~~\0\`\0\0\0\0\0~}}}~~~~~\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0~~\r~~~~~~\0\0\0\0x\0\0\0\0\0\0~~~~~~\0~~~~~\0}}|}}}}\0}~\0\0x\0\0\0~~\0\0\0\0\0\0\0?~~~~~~\0~}}}}~~\0~}~~~~~\0\0~~~~\0}}~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0~~}~\0\0\0\0\0\0\0\0\0\0|\0\0\0\0?~~~~~\0~~~\0~~~\0~~\0\0\`\0\0\0\0~\0~~~~~\0~~~}}}}\0}}}~~~\0\0\0\0\0\0~~\x07\0~~~\0~~~~~\0~~~~}||\0|||{{{{\0{{{{{{{\0{|||||}\0}}}}}}|\0{{zyyxx\0wwwvvww\0vvvvvvv\0wwxyyz|\0}~x\x07\b	\v\f\r\r\f\v
		\b\x07\0~}}{zzyyy\0xxxxxxx\0xxxxyyz\0z{{{|}~\0\0\0\0\0x\0~}||{{zyyxx\0wvuttsr\0qpommlk\0jjjjjjk\0mnprux{\0	\f~\r\v	\b\0}zxwutsrqr\0rrstuwx\0y{|~\0@\x07\b\b\b			\b\x07\x07\0\0~}\x07|{zyxvt\0sqpnmkj\0ihggfed\0ca\`\`^]]\0^_bdglp\0tz\0
|\x1B !"""""!! \x1B\f	|ywtqomlkih\0ijlmoqs\0uxz|~\0@\b	\v\r\r\f\v	\x07\0~}{xwusqom\0jigfedc\0ba\`\`_^]\0\\ZZZYXY\0Z[_cfkp\0u{\b\r|!#$&&&'((('&%#" \v\x07\0|yvsoli\0fcb\`\`__\0\`acehkn\0qswz}\0\`\x07
\r\x1B    \f
\x07}zwuspol\0jhgedcb\0\`_^]\\\\[\0ZZYYYYY\0[\\^afjn\0ty}\vx %'(++++,,,+)(&$# \r
}xspmif\0c_]\\[ZZ\0Z[\\^acf\0jmptx{\0\b\v\x1B!""""! \r
\b\0~|ywurp\0mjhfdba\0\`^]]\\\\\\\0\\[[[[[\\\0\\]]_adh\0lpuz\f\` "&*+,--,-,+*'%" \x1B
\x07{xsomj\0fca^[ZY\0YYYY[]\`\0cfjnrvz\0~
\r~ !#$%%$#"! \x1B\f
\b\0~|zxvtsqnljig\0feedccc\0bbbbaa\`\0\`\`\`\`\`ab\0dfhlpsx\0}\x07\r~ #&&'('&&%#" \r	\0}yvsoljgdb\0\`^\\\\[\\]\0^_adgkp\0sw{\x07\vp !""##"! \r
\b\0~?|ywvtrp\0nkjhged\0cbaaaaa\0aaaabbc\0cddefgi\0jmpsw{\0\b\r\x1B ""##"!! \x1B\f	~{yv\x07sqoljhf\0dcccdde\0filorux\0{\b\v\r|\x1B\x1B\r\f
\x07\0~}{ywvsrpn\0ljihgfe\0dccbbaa\0aaaaabb\0ccddefg\0hknquy}\0\f\x1B!#$%%#!"!\r
\b|yusqoljh\0feddded\0egjloru\0x|\x07
\fx\x1B\x1B\r\f
\b?|zxvtro\0mkihgfd\0dcbbccb\0bbbbccc\0cdeeggh\0ijknqtw\0{\x07\r|\x1B!##$$"!! \x1B\f	|yvsqomk\0igedddd\0ddegjlp\0svy}	p\f\x1B\r\v	\x07\0~|{ywutrq\0omljiih\0gfeeeee\0feeeffg\0hiijlmn\0opqqrst\0vxz|\`	\r\v	\x07}{ywutrqpnm\0lkkkkkk\0moqtx{~\0	\f\r\v	\b\0\0\0~|{zxvusq\0ponnmml\0llllkkk\0jjjkkkk\0lmnooop\0ppqqpqr\0tuwz}\0\`\b
\r\r\v	\b\0~{zxvtrpnm\0kkkkkln\0psvy|@	\v\f\f\r\r\f\v
		\b\x07~|{ywvts\0srrqqpp\0poonmlk\0kjjjjjk\0kllmmmm\0mmmmmmn\0prux{~@	\f\r\f\v	\x07\0~|{y\x07wvusqpo\0mmmmnno\0qsuxz}\0\x07	
\v\f\f\f\v
	\b\x07~}{zyw\0vutsrqo\0nmlkkji\0hiiijjk\0kmnoprr\0suvvwxx\0yzz{|~\0\0\b	
\v\f\f\f\r\f\f\v

		\b\x07\x07\0\0~~~}}||||||\0|||}}~\0~\x07\b\b			


\v\v\v\v\v\v\v\v\v


										\b\b\x07\x07\0?}|zyxwv\0uuttsss\0rrrqqqq\0qqqqrrs\0ssttuuu\0uvuuuut\0ttsssst\0uuvwyz|\0~\x07|\b

\v\f\r\r\r\f\v
\b\x07\0~|zyxwvutttt\0tuvwxz|\0}\b|	\v\f\r\f\v
	\b\x07\0?~|zywvu\0tsrqppo\0nnmllkk\0jjjjkkk\0mnoopqr\0sstttuu\0uuvvwwx\0y{|~\0p\b	\v\r\r\f\v
	\b\x07\0~~}\x07|{{zyxx\0xxxxxyz\0{|}\0p\x07\b	
\f\r\r\r\f\v

\b\x07\0~|zxwusqpomm\0lkkkjjj\0jjkkkkk\0llmnnpq\0rsuvwxz\0{|}}~~\0\0\0\0\0\0\0~\0\0\0\0\x07\x07\x07\0~~}}}}~\0\`\x07\b	

\v\v\f\f\f\f\f\f\f\f\v\v

		\b\x07\0~}|{zyxwv\0utssrqp\0ooooooo\0ooppqqr\0rsttuvw\0xyz{|}~\0\0~\0\0\0?~~}}|||\0{{{{{{|\0}}\0x\x07\x07\b\b\b														\b\b\b\x07\x07\x07\0~}|{zyxwwvvu\0uuttttt\0tttuuvv\0vwwxxxy\0yyzzz{{\0||}}~\0\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~~~\0\0x\x07\x07\x07\x07\x07\x07\b\x07\x07\x07\x07\x07\0\0\0\0\x07~~}}}||\0{{{zzzy\0yyyyyyx\0xxxxyyy\0yzzz{{|\0||}}~\0\0\0~\0\0~~~}}|||||\0|||||||\0|||}}}~\0~\0x\x07\x07\x07\x07\b\b\b\b\b\b\b\b\b\x07\x07\0\0?~~}}}}}\0|||||}}\0}}}}~~~\0~~~~~~~\0~~~~}}~\0~~}~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0\0\0~~~}}}|||\0|||||||\0|}}}~~\0\0\0|\0\0~~}}}||||{\0|||||}}\0}~~\0@\0\0\0\0\0\0\0\0~~~~\0}}}}}}~\0~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0@\0\0\0\0\0\0?~~\0~~~~~~~\0~~~~~~~\0}}}}}}|\0|||||}}\0}~~~~~\0\0\0|\0\0~~}}}}}||\0|||||||\0|}}}~~~\0\0\0|\0\0\0~~~~~~~\0~~~~~~~\0~~~~\0\0@\0\0\0\0\0\0?\0~~~~~~\0\0\0\0p\0\0\0~~}}|\0|||{{{{\0zzz{{{{\0{||}}}~\0\0|\0\0~~~~}}}}}\0}}}}}~~\0~~\0@\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~}}}\0}~~~~~~\0~~~~~~~\0\0\0\0~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~~\0~~}}}}}\0}}}}}}}\0}}}}}}}\0}}}}}}}\0}~~~~\0\0\0\0\0|\0\0\0\0\0\0\0~~~\0~~~~~~~\0~\0\0\`\0\0\0\0\0\0\0\0~~~~~~\0~~~~~~~\0~~~~~~}\0}}}}}}}\0}}}}~~~\0~~\0\0\0\0\0\0\0\0~~~\0~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\x07~~~~~~~\0~~~~~~~\0~~~\0\0\0\0\0x\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~}}\0~~}~~~~\0~~~~~~~\0~~~~~~~\0~~~\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\x07\0\b\0\0H\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0~~~\0~~~~\0\0\0\0\0p\0\0\0\0\0|\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0g\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0<\0\0\0\0<\0~\0~~~~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~\0\0\0|\0\0~~~}}}}\0}}}}}}}\0~~~~~\0\0~~~~~\0}}}}|||\0|{{{{{{\0{{||}~\0\0\0~}}}}||\0|||||||\0|}}~~~\0\0\0\0\0\0\0~~~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0~~}}|{{\0{zzyyyy\0yyyyyyy\0yyzz{|}\0~\0|\x07\x07\x07\x07\0?~}}}||\0||{||||\0||}}}~~\0\0\0|\0\0\0~~~~~~\0\0\0\0|\0\0~~}}|\0{{zyyxx\0xwwwwww\0vwwwwww\0wwwxyz{\0}~\0\x07\b|
\v\f\f\f\f\f\v

		\b\x07\x07\x07\0~~\x07~~~~~~~\0}}}||||\0|}~\0p\0\0\0\0~~}}||{\0{zzyxwv\0vuutttt\0ttuuuuv\0vvuuuut\0ttttuvw\0xz}p\x07	





						



	\b\x07\x07\0~}}|{\0zyxwvuu\0uvwxy{|\0}~\0\0\0\0x\0\x07\b\b\b\b				\b\b\x07\0\0~~}}}\0}||{zzy\0yxwwwvv\0uutttss\0rrrrrrr\0rrsrrrr\0rrstvx{\0~\x07
\f~\r\v
\b\0~~|{zx\0vtsrqqq\0rstvxz|\0}~\0\0\0\0x\x07\b\b\b\b\b\b\x07\x07\x07\x07\x07\x07\x07\x07\x07\0~}|{{zzzy\0yyxxwww\0wvvvvvv\0vuuttsr\0rrqqqrr\0rsssttt\0ttuvwy{\0~\x07\v\r~\f
\x07\0}||{zzyx\0vtsqpoo\0opqsuwy\0{}\0\0\0\0x\0\b	
\v\v\v
	\b\x07\0~}|{zzyxwwvv\0vvvuvvv\0vvuuutt\0sssssrr\0rsssttt\0tttuuuv\0vxy{|@\x07
\f\r\f\v
\b\0?~}}|{y\0wvtssrs\0tuwy{}\0\0\x07\b		
		\b\x07\0~}|{zyxwvuut\0sssssss\0stttuuu\0uuuuuuu\0uuvvvvv\0vvvvvvv\0vvwxy{}\0\b\v\f~\r\f\v
					





	\b\x07\0\0~}\x07{zywvut\0tuvwxz{\0}~\0\0\0\0x\0\0\0p\0\0\0\0\x07\x07\b\b\b\b\b\b\b\b\b\b\x07\x07\0~}|{yxxwvvuu\0uuuuuuu\0uvvvvvv\0vvvwwxx\0yzz{{{{\0{zzyxwv\0vuuuvwy\0{~\0\x07	|\v\r\r\r\r\r\r\r\r\r\r\v
	\x07\0~?|{ywvts\0rrssuvx\0y{|}~~~\0~~~~~\0\0\x07\0~}{zyxxwvvu\0uuuuuuu\0uuvvvww\0wwxxxxx\0yyyyzzz\0z{zzyxw\0vuttttu\0vxz}\0p\b\v\r\r\r\r\f\r\r\f\v	\b\0~|zywvtsrrstu\0vxz{||}\0}}}}}}~\0~\0|\0\0\0\0\0\0\0\x07\x07\b\b\b			\b\b\x07\0~}|{zyxx\0wvvvvvv\0vvwwwww\0wwvvvuu\0uuuvvvw\0wxxxxww\0vutssrs\0tuvx{~@	\v\r\r\r\f\f\f\f\r\r\v
\b\x07\0~|zywvtttt\0uvwxz{|\0}}}}}}|\0|||}~~\0\0\x07\x07\x07\b\b\b\b\b\x07\x07\x07\x07\x07\0~}{zxwvuut\0ttttttt\0sssrrrr\0ssstuvw\0wwwxwww\0wvvuuuu\0uuuvwxy\0{}\bx
\f\r\r\r\f\f\f\r\r\v
\b\x07\0~}{zxwu\0tttttuv\0wxyyzzz\0zzzzz{{\0|}}~\0@\0\x07\b	
\v\v\f\r\r\r\r\r\r\f\v
	\b\0~}{zxwuts\0srrrrrs\0ttuuuuu\0uuuuuuu\0vwwxyzz\0{{{zzyx\0wvvuvvw\0xz{~\0p\x07\b
\v\v\f\f\f\f\f\f\f\f\r\r\v
\b\x07}{ywvtsrqqqr\0rtuvwxx\0xxxxxyy\0yzz{}~\0\0\0\x07\b		
\v\v\v\v\v\v
	\b\x07\x07\0~}{zyxwv\0uuttuuv\0vwwxxxx\0xxxwwww\0wxxyzz{\0{{{{{zy\0xwvuutt\0uvwy{~\0@\x07	
\v\f\r\r\f\v	\b\0~|zx\x07wusrqqq\0qrstuuv\0wxxxxxy\0yzz{|}\0\0\x07\b\b							\b\b\x07\x07~}{zxwwvuuuv\0vwwxxyy\0yyyyyyy\0yyyzz{{\0{{{{zzy\0xwvutts\0tttuwy{\0~\0\x07	
~\v\f\f\f\f\f\f\f\f\f\r\f\v
	\b}{ywutrr\0rrrstuu\0vwwxwww\0xxxyz{|\0}~\0x\x07\x07\b		




		\b\x07\x07\0}|{zyxwvuuu\0uuuuvww\0xxxxxxw\0wwwwwwx\0xyyyzzy\0yxwvuts\0rssstvx\0z}\x07x		


\v\v\v\v\f\f\r\f\v	\b\x07?}{ywuts\0ssstuvw\0xyyzzyy\0yyzz{|}\0~|\x07\x07\b		



\v


	\b\b\x07\0~}|{\x07zyxwvvu\0vvvwwxx\0yyyyyyy\0yyxxxyy\0yzzzzzz\0yxwvuts\0rrrrstv\0y|~\0\x07x\b	






\v\f\r\r\f\v
	\b\x07\0~{ywurq\0qqqrstu\0vwxxxxw\0wwwxxy{\0|~\0x\0\0\0\0\x07\x07\b\b\b						\b\b\x07\x07\0~}|{{zyxxxww\0wwwwxxy\0yzz{{{{\0zzzzyyy\0yyyyyyx\0wwvusrq\0qqqrsux\0z}\x07	x








\v\f\r\r\f

	\b\b\x07\0}{xvtsr\0qrstuwx\0yyyyyxx\0wwwxyz|\0~|\0\0\x07\b\b		



	


		\b\x07\0}|{zyy\0xxxxxxx\0xxxxxyy\0yyyyyzy\0yyyyyxy\0yyxxxxw\0wvusrqq\0qqrsux{\0}\0\x07	
~

\v\v

\v\v\f\r\f\v
		\b\x07}zxvtsrr\0stuwyz{\0{{{zyxx\0xxxyz|}\0\0~\0\0\0C\0\x07\b			

							\b\x07\x07\0?}{zyxww\0wwwwwww\0xxxxxxx\0xxxyyxx\0xyyxxxy\0yxxxwwv\0uttssss\0tuvy|~\0@\b	

\v\v


\v\v\f\r\f\v
		\b\x07}zx\x07vtssstv\0wy{|}~~\0~}|{zzz\0z{|}\0\`\0\0\0\0q\x07\b			

						\b\b\x07\0~|zywvuutt\0ttuuvvv\0wwwxxxx\0xxxxxxx\0wwwwwww\0vvvutsr\0rqqqrsu\0xz}\x07p	


\v\v\v\v\v\v\f\r\r\v\v
	\b\x07~{yvtrq\0qqrtvxz\0|}~~~~}\0||{{{||\0~\0|\0\0~}}\x07~~\0x\x07\b	









	\b\x07\0~}{zxwvuuuuuu\0uvvwwxy\0yyzzzzz\0yyyyyyx\0xxxxxww\0vutssrr\0ssuwy|\0\b
\v\v\f\f\f\f\f\f\r\r\f\v

	\b\x07~|ywtrqqrs\0tvx{}~\0\0\0~~~~~\0x\0~}}}~~\0\x07\x07~\b		




\v\v\v
		\x07\0~|zywvuut\0ttsssst\0ttuuvww\0wxxxxxx\0xxxxxxw\0wwvvuts\0rrrrrst\0vy|\x07p
\v\f\r\r\r\r\r\r\r\r\v
		\b\x07\x07\0~{xuspoopqsuw\0y{}~~\0~}}}~~\0~}}}}~\`\x07\b\b											\b\x07\0~|zxwvuttsss\0sttuuuv\0vwwxxxy\0yyyxxxw\0wwvvuut\0srqpooo\0opqtwz|\0\b
\v\v~\v\v\v\v\v\f\f\r\r\v
	\b\b\x07\x07}zwtrpopq\0rtwy|~\0\0\0\0~~\x07~\0\x07|\b\b\b\b\x07\0C\x07\b							\b\b				\b\b\x07~|zywutts\0ssrrrrs\0sssttuv\0vwwxxxx\0xxwwvvv\0uttsrqp\0onnnopr\0ux{~\x07p
\v\f\f\f\f\f\f\f\r\r\v
\b\b\x07\x07|zwtqp\0ooprsvx\0z|}~~~}\0}||}~@\x07\b		\b\b~\0x\x07\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x07\x07\0~|zyxwvvuuuvu\0uuuuuvv\0vwwxxyz\0zzzzyyx\0xwwvuut\0srqpooo\0oprux{~\0\x07	\v\v\f\f\f\f\f\f\r\r\v
		\b\b\x07\0}zwtrpppqr\0twy{|~~\0~~}||||\0}~\0\x07|\b\b\x07\x07\0\0s\x07\x07\x07\x07\x07\x07\x07}{z\x07xxwwvvw\0wwwvvvv\0vvvwwxx\0yyzzzzy\0yxxxwwv\0vvutsrq\0ppoopqt\0wz}\0	x
\v\f\f\f\f\f\f\r\f\v

	\b\b\x07~{xurpo\0pqrtvy{\0}~~~}|{\0zzz{|~\0@~~~\x07~\0|\x07\x07\0?}{yxwvv\0vvvvvvv\0uuuuuuv\0vwxyyyy\0zzyyxww\0wvvuutt\0rqponnm\0mnqtvy}\0\0\b

\v\v\v\v\v\f\r\f\v\v


		\b}zwtrqpqrt\0vx{|}~~\0~}|{z{{\0|~\0\x07|\x07\x07\0\0p\x07\b\x07\x07\x07}{zxxwvvvww\0wwwwwww\0wwwxxyz\0z{{{zzy\0yxwwvvu\0utssqpo\0onnnoqt\0wz}\0\bx	





\v\f\r\f\v


		\b\x07\0|yvsqpp\0qrtvxz|\0}}}|{zy\0yyz{}@~~~\0\x07\x07\x07\x07\x07\x07\0~?|zyxxww\0wwwxwww\0wwwwxxy\0yz{{|||\0|{{zyyx\0xwwwvut\0srpoooo\0opsux{~\0\x07\b				
\v\f\r\r\f\f\f\f\v
	\x07}zxusrrstv\0xz{}}}}\0|{zzzz{\0|~\0|\0?~~~\0p}|{zyxxxxxx\0wwwvvvv\0vvwxxyz\0z{{{zzy\0yxxwwww\0vvutsrq\0poooopq\0twz}\`\b\b				
\v\r\r\r\r\f\f\v\v	\b|ywusstuvxz|\0}}}}|{z\0yxyyz{}\0~\0~}}}~\0|~}|{zz\0zzzzyyy\0xxxxxxx\0yyz{{{{\0{{{zzyx\0xxxxwwv\0utsrqon\0nnopqtw\0y|\x07x\x07\b\b		
\v\r\r\r\f\v
	~{ywvuu\0vwyz{||\0}||{zyy\0yz{|~@\0~~~\0A\x07\x07\x07\x07\0?}||{{{{\0zzzzyyx\0xxwwxxy\0yz{{{{{\0{zzyxxw\0wwvvvuu\0tsrpooo\0ooprtwy\0|~\x07|\b		
\v\f\r\r\f\f\f\v
	\x07~{yxvuuuv\0wyz{{{{\0{zzyyyy\0z{|~\0\`\0~~}}|}~\0@\x07\x07\b\b\x07\0~}}}}}}}\0||{{zyx\0xxxxyyz\0z{{{{{z\0zyyxxxx\0xxxwwvv\0usrqppp\0pqrtvy|\0~\0\x07\b	~
\v\v\f\r\r\r\f\v\v
	\x07~|zywvvvw\0xyzz{{{\0{zzzyzz\0{|}\0p\0~~~~~\0\`\x07\x07\x07\x07\0~~~~~~}\0}|{zyxx\0xxxxyyz\0zzzzyyx\0wwvvvvv\0vwwwwvv\0utsrqqr\0rsuvy|\0\x07	
\v\v\v\v\f\r\r\r\f\v




	\b\x07\0}{ywvuuvw\0xyyz{{{\0{zzyyzz\0{|}~\0\`\0\0~~}\x07}}}}~\0\0\0\x07\x07\0\0\0\0\0~\x07}||{zyy\0yzzz{{|\0{{zyxwv\0vuuuuvv\0wwxxxww\0vvuuuuv\0vxyz|}\0\0\x07\b		
\v\v\f\f\r\r\r\r\r\r\r\f\f\f\f\f\v\v\v


	\b\x07\0~?|{zzyyy\0zz{{|||\0||||||}\0}}~~\0@\0\0~~}}}}}~~~\0\0\0x\0\0\0~~~~\0}}}}}}|\0{{zyxww\0vvvvvvv\0vwwwwxx\0xxxyyyz\0zzzz{{|\0|}~\0x\b\b																\b\b\b\x07\x07\x07\0~}|{{zz{{|||\0|||||{{\0{{{||}}\0}~~~}}}\0|||||}}\0~~\0\0\0\0\0~\0~~~~}\0}}||{zy\0xxwvvvv\0wwxxyzz\0{{{{|||\0|}}}~~~\0\0|\x07\x07\b\b								\b\b\b\x07\x07\0\0\0~~~~~\0}}}|||{\0{{{{{{{\0{{{{{{{\0{{{|||}\0~~~\0\0\0\0~\0\0~~~}\0}||{zzy\0xxwwwww\0wxxyzz{\0{{{||||\0|}}}~~~\0\0\0x\x07\x07\x07\b\x07\x07\x07\x07\0\0\0\0~~~}}|||||\0{{|||||\0|}}}~~~\0~~\0\0@\0\0\0\0q\0\0\0\0\0\0\0\0\0\0\0\0?~~}}}\0|||{{{z\0zzzzzz{\0{{{||}}\0}}~~~~\0\0\0\0|\0\0~\0O\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0)~~\0~ ~}~~~\0~||}\0~}~~}~~\0~}~~}}~\0}|~}|~~\0|~~}~|\0}}}~}}\0}}~}}}~\0}|~}}~}\0|}~~}~~\0~~}~~}\0\0~}\0~}	~\0~\0H~\0~\0\0\0\0[\0\0m\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0v\0\0?\0\0{\0\0\0[\0\0s\0\0\0~m\0\0\0l\0\0\0L\0\0\0\0\0m\0\0$~\0\0~\0~&~\0\0\0\0f\0~}~}}~~\0~~}~}}\0~}~~\0~~\0~~~~\0~\0~\0H~~\0H~}I\0}\0\0~\r~~\0~ \0~~\0\0~2~~~~~\0~~}\0@}~~\0\0d\0\0\0\0\0{\0\0o\0\0\0\0\0\0~\0\0\0\0\0\0_\0\0\0\0\0[\0\0\0\0\0m\0\0\0\0}\0\0\0w\0\0\0~7\0\0~\0C\0\0H\0\0\0\0\0~\0~~\0~}~~~~~~~\0~~~~~\0~~}~}\0~}}~}}\0~}}}\0}~~~\0@~~\0~\0d\0\0l\0\0\0\r\0~~\0~	\0\00\0\0~6\03\0\0\0\0\0\0\0\0\0]~~\0Y\0Y\0\0?\0\0\0\0~~v\0\0~\0Y~~\0~\0~\0\0}1~}~~||}}~~~}~\0|~~}}}}\0~}|}{\0~{~{|\0}{~}{}~\0||~}|~~\0}~|}\0~~~~\0}~}}\0} {\0~|~~~~\0}H\0}\0~\0-\0\0~\0\0;\07\0\0o\0\0\0v\0~~\x1B\0\0\0\0{\0\0?\0\0\0\0\0\0\0\0\0\0\0?\0\0~3~[\0\0~\0~5~\0~\0~~~I\0}\0}~M~~\0~~\0~$}\0~}}\0~\0\0b~~\0}\0d}\0~~$\0~\0\0}~||~~~\0}~{\0|2~|\0~2\0~~~I\0}~I\0Y\0\0\0\076\0\07\0\0\0~7\03[\0\07\0;\0[\0\0\0g{|\0\0}6\0~~~~~~~~\0} |\0~|}|~z~{~\0{|~||~\0}|~}|~}\0}~}|~~|\0|~~|}~}\0}~|~}\0~~}~}~\0\0}~\0|~I}}\0~~\0$~~\0\0\0i~\0d\0\0\0~\0\0\0\0\0\0?\0\0\07\0\0\0\0\0\0\0\0\0\0~\0\0}\0\0}\0m}6\0\0_\0~~~}%|\0|~|}~}}}}~\0}}~}}~}\0~}}}{~\0\0{|\0||	|~}{{\0|}|~~}\0}}~}|~\0{\0||~|~~}~\0||~|{\0Y~~\0Y~}~$}~\0\0v_\0\0_\0i\0f}}6\0\0{~}m\0\0l\0~6\0\0~\07\0\0\06\0\0N\0\0\0~}~|{	\0}~{\0A{{\0|0}~|~}\0\0c~\0\0~}\0\0{~\0z~{{~{~}|\0~|~~~~}}\0~~~~~~~\0}\0\0{~}&}~}\0|~\0~\b\0~\0~~}\0Y~\0Y~\0\0\0}\0\0}\0\0~]~\0~\0\0m\0\0~\0~6\0\0\0\0{\0~7~~\x1B~}}I\0\0~\07~~~~|\0m~|\0}\0,}~|\0~~\0~\0~~}\0||\0}$z\0z}z$|}|~~}}{~z~\b{}\0|{\b~{~|~\0@|~\0~\0~$\0\0\06\0\0\03}}f~v\0~?\0\0?~~\x1B\0\0\0\0\0~w\0\0\0o\0\0w}[}}M|\0{l{~|\0d~\0\0~&\0\0\0b\0~|\0f}~~~\0~$~~}||\0|z|{I~{\0|~\b|\0~{}{\0}z}{z}}}}||}\0}}|{\0@\0z~}|\0I{\0|}~~|{2}\0~~\0~~K}}|}}\${z\0z2{\0~~\x1B\0~\0\0\0{}\0\0v\0\0[\0\0_\0~\0[\0~[\0}m~~\0~6}|[}~M~{4{{{{I}\0~\0f}}\0\0v|~}z\0I\0z{~\0I~~~\0\0~}\0|~	}||\0~ |\0|}~$}\0\0}~F}|\0z}\0D{|\0}|~~~~~~\0~\0~~\b~~|\0@|~}\0d~\0\0~n\0~\0m\0~~R~\0\0]~}\0o~~~\0\0d~\0\0\0<\0{~\0m~~\0l\0w\0\0_\0\0o~\0~}6~\0~\0~~}~}}~{}\0@|{\0~|~~}}~~}{\0|}}}\0||~{}\0|~|}~|\0}|z~\0| {~|}~~\0~|}}\0}~~\0~\0\0}}&{}~\0~Y\0|\0}5~~2\0{\0{\0\0\0\0\0\0~M\0}\0;[\0\0\0\0}\0\0~~\0L\0~\0}I}}~}$|\0}~~\0}{\0}}}~}}\0~~\0~{\0\${~\0}|||\0}|~|}}}~~\0@~}~|\0~$}{~|"}}~}|\0~||}H}|\0\f~\0~6\0~~3\0\0\0\0v\0\0\0{\0}\0o\0\0\0\0\0\0?{\0\0\0o~~6~~~\x1B\0\0K~\0~}~~~|~\0~||}}}}\0||}}|}}\0}~~|~\0| }\0||~}}~~~}}}\0}~{\0z\0\0z~||~||}I~||\0\0\`|\0}&\0\0\0v\0\0\0}\0~m\0\0\0z\0\0?\0\0~M\0}m\0~}\x1B\0\0\0\0?~\0|~6\0~~\0S}\0}}I~{\0~{~\0D|}\0}~\0}$}\0{|&}~z\0\0z2~\0{}~{|~{zz{\0zz~}{||\0|}||||\0\0{}\0}}	||~z\0\${|~~\0}~\0}\0H\0}\0}m\0\0}}\0\0{\0\0\0v\0O\0}}\0m~\0|\0\0\0w~\0\0~\0m~\0m\0]=\0}|6~~\0\0~2~\0~f~}|~L{\0{~L}~~}|\0~}}~}\0~\0\0}\x1B\0}\0|\0%|~|}}\0~~{}~|\0}z~\0{|H}{\0|}}$|~}}\0~~~~H~\0\0$~\0~}~}\0Y9\0~}}\0~\0[\0}\0}?|\x1B[\0\0\0\0w\0\0\07~}~I}\0|L~\0~0}"}\0\0}&}\0}}}}~}|}\0}z}\0}z\b~{~~{}\0||~|~z\0|~y~|"{\0z{"{\0\0||~~|\0|}\0H}}~||\0\0|}}~\0~;}~'}|\06~\0\0\0~\0\0~}Y\0~\x1B\0?\0\0\0\0\0]~\0\0y\0;~3\0v\0\0\0\0o~~~L\0}\0}Y~~|\0|}~|}~~}|\0{~~}\0D~\0\0}~}}\0{~	}{~~}|}~}}|\0~}\0\0b\0\0d}~}\0\0d~~~~\0}~[\0~7\0\0\0\0_~m\0\0]\0\0\0\07\0\0~&\0\0\07\0\0~\x1B\0\0\0~~~\0}3~~\0~~\0&}~\0~}}}|\0}~\0~\0~~~\0{\b\0}~~|~}}\0~$~\0~\0"\0~~}I}~|}\0$}\0|z\0~~~}\0}\0}\0~}~~~I\0~%~~\0~\0\0B~\0~\0l\0\0l\0\0\0\0\0\0\0?\0\0\0\0[\0\0\0\0\0\0f~~}f}~\0}}L\0|~\0|~}\0\0}~{~}}~~~}}~}\0{~\0{{}}}}~}|~\0~|}\0}|\b}}|~\0\0||~{~	~}~}{\0{~|}\0}~\0@}\0\0m\0\0-~\0\0~2\0\0~\0\x1B\0\0g\0\0w\0\0\0\0~\0]\0\0\0\0\0\0o\0l\0\0\0\0\0{\0~\x1B\0\0~\03~\0\0\0\0v\0\0\0\0o~\0\0~\f~~}~\0\0~}~~~~~~~}\0}~~|}}\0{}||}\0|~~}~~}\0~~|{~\0~|~~}}\0~\0~|\0|2}}J}|\0D|~\0{\0\0{4\0\0}\0~\0S~~\0I\0~\0\0\0{\0_\0\0_~}m\0\0\0\0?[o~L~\0\0~~L\0}}\0I~~}\0I~~~~\0~}\0$|~\0}|\0$|~\0}}~~~}~}~\0\0~}\0}	~}\0} }~|~|\0~}}}\0~~~\0\0\`~\0\0~\0~~}}\0\03\0~\07\0~6\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0>\0\0\07\0\0\0_\0\0M\0\0\0s\0\0_\0\0[\0~\0\x1B~~\0~~~~\0~}~~}\0}|~~}~~\0}~~}~~}\0}~\0}\0~~~~~~~}\0~~~}}~~\0~~~~~\0~\0\0\0\0Q\0\0\05\0\0\06\0\0\0[\0\0}\0\0\0\0\0\0\0\0\0\0\0?\0\0;\0\0~C~\0\b\0\0~L~\0}~~~~}}\0~~~~\0~~~}\0}}|~}}\0~}}}}~~\0}~~}}}\0~}}~~\0~}~}\0~}~}}\0~~\0\0~\b\0~~\0~\0I~~\0~~\0~~\0~ ~\0~\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\07\0\0~\0\0\0\0w\0\0\0\0\0\0_\0\0y\0\0\0\0\0\0\0\0\0~~\0~}~~~~\0@~~~\0~~~\0~~~~}\0}~~~\0~}~\0~\0\0\0\0\0\0~\0Y\0\0\0\0y\0\0\0\09\0~\06\0f\0\0\0\0n\0\0?\0\03\0\0\0\0{\0\0\0o~\0\0v\0\0\0\0\0\0\0\0\0\0\0\0\0\0m\0\0\0\0\0\0~\0\0\0\0\0[~\0\0~\0L~~\0~\f~~~}~\0~}~~\0\0~\0~\0\0~\0~~~~~~\0}~~}~~~\0~~~}\0}~~}\0}~~~~\0~\0\0\0\0\0\0w\0\0\0\0\0v\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\07\0~\0~\0~~\0\0\0\0v\0\0\0&~~}}\0~~~~~~~\0~~~~}~~\0}}~}~~\0}}~}}~}\0}}}}~}}\0~}}~~}~\0~~}~~~~\0~~~~}\0~~~~~\0~~~~\0~~~~\0@}\0\b\0\00\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0G\0~\0\0~~~~~~~~~\0}}~}\0}~~~}~~\0}}}~}}~\0}}}|}~}\0}~~~~~~\0~}~\0\0~\0~\0\0\0d\0\0\0\0f\0\0\0\0\0\0_\0\0\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\07\0\0~\0~~~\0~~~~~~}\0~~}}~~}\0~~~~~~\0~~~~\0~~~~~\0~~~\0~\0~~~\0~~~~~~~\0~~\0 \0\0\0\0\0\0~\0\0\0\0\0\0~\0H\0\0H\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\0\0\0~\0\0\0\0\0\0?\0~~\0~~~~~~\0~~}~~~~\0~~~~~~~\0~~~~~~~\0}~~~~~~\0~~~~~~~\0~~~~~~~\0~~\0\0\0\0\0A\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'\0\0\0~~~\0~~~~~~~\0~~~~~~~\0\0\0\0\0\0\0\0\0f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~\0~~~~~~~\0~~~~~~~\0~~~}~}~\0~~}}~}}\0}}}}}}}\0}}}||||\0}}}}}}}\0}~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0\0\0\0\0\0l\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0\0~~\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0]\0\0\0\0\0\0\0\0\r\0\0$\0\0\0\0~~\0~~~~~~}\0}}}}}}}\0~~~~~~\0\0~~~~~\0~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0~}}}}}}\0}}}}}~~\0~~~~~~~\0~~~~~}}\0}}~~~}}\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\00\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0}}}}}~~\0~~}~~~}\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~}~~~~~\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~}\0}}}}}}~\0~~~~~~~\0\0\0~~~\0~~~~~\0\0\0\0\0p\0\0\0\r\0\b\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0~~~~~\0~~}}}}}\0}}}}}~~\0~~~~~~~\0}}~~~~}\0~~~}}}}\0}}}}}}}\0}}}}~~~\0~~~~~~~\0~~~~~~~\0\0\0\0\0\0x\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~}~~~~\0~~~~~~~\0~~~~~~~\0~~~~~\0~\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0\0\0\0\0\0\0\0\0n\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0~~~~~~\0~~~~~}}\0}}}}}}}\0}}}}}}}\0}}}}}}}\0}}}}}}}\0}}~~~~~\0}~~~~~~\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0~~~~~~\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x~\f~~~~\0|}~\0||\0\0~\0\0~{}~}|{{\0}~~\0@\0\0\0~|}~}|}|z{~}{\0|}}\0@\0y\0~\r~\0@\0~\0\0~]\0\0\0\0~7\0\0\x1B\0\0~~\0f~\0\06\0_\0m\0\0~~~\0\0\0~3\0~O}{|{|\0~}|}}~~\0~\0l\0\0\0}~|\0\0}3}|{}}{\0{}~|~\0@~|\b~~}~L~\0m\0\0\0\0o\0\0\0~}\0M\0~}~~~\04\0\0~\0\0_~\0&\0~\0~6\0~}\0M}~~!{\0\0\0\0v\0\0_|z\f}\0\0|}\0f\0\0\0{\0\0\0~\0\0|3|}||}}|\0}}}}\0|~\0}~~~|\0~~\0}}\0s\0~|\0~\0~~\0}Y|~9|\0\0\0~}\0{;\0~~}~@{{\0}|~{z\0\0z}&\0\0\0\0}}~~zz~ z}\0\0l}~\0\0}>}~zF}}}3~~[\0\0\0{~}\0\0\0|\0y\0m{}<~~~|\0}\0#~~\0\0~\f~~}\0}~\0}}~}}~}|\0@\0~~a\0\0{\0\0||\0|}{{\0z}\b\0}|\0I~z~\0|z{~y|F\0}{|||O\x07~\0c{~||}\0~}}}}@~|\0~1~\0\0~\0\06~}s~\0\0|~\0w~\0\0~\0}~~~}}\0~~\0{\0~~;\0}Nq~\0\0\0>\0~|\03{|\0|~~\0{}\x1B~\0|}M}\0{\0f3\0\0}~O\0~~s~|\0L\0~~g||\0~{{\f\0\0{|\0g\0}|}1||F~|\01~\0\0~}~g}}~}}}z\0z~z|@\0~{\0}{{}~{{\0}~~~~~\0~~~~0~\0~\0\0\0||~\0\0~}\0f~|\0\0~~~\0~~\0D\0~|}~~}}~~\0@\0\0{\0\0\0~~}~\0~||}}~~\0}|}~~\0}~\0\0~\0\0\0\0~>}~~\0~~\0O\0~~}}}}~~{xz}\0~|||}\0@}x;}~~~~\0}\0t\b\x07\0\0\0~}{{xvx{{yxy}\0\x07\b\x07\b	\x07\0~\0\0~\x1B~|{|~~}\0|||~\0}||}}|\0|\0\0|\0~~\x07~}{yyzz\0zxxy|||\0|z{\0\0x~8}~\0~8~\0~\0~~~|{{~~|{|}~\0\0\0~}~\0c\0\0c~|~\0A}|x\0~?}|}~{z\0|}~~}~\0@\0\0\0\0\0\0\0w\0\0~}~~~\0\0\0~\0~}}\0~~~~~~\0~~\0~~~~}}}\0||{||||\0}~~\0\0x?~}~}\0}}|||||\0}||}~~~\0\0\0\0f~~\0\0\0d\0\0\0\0\0~|{||zyyyy\0z{{{{}\0\0\0\0\0\0p\0\0\0\09~~~}|||\0||||}~\0~|\0\0\0~\0G~~\0\01~~~~~\0~~}}~~}\0|}}~}}~\0\0~\0~}}}||{{z\0{|}~}}~\0\0\0\0{\0\0\0\0\0\0~}|}}}{{||||\0}}}~~\0\0\0\0\0\0\0~}~}|}}|||\0}~~}}~\0~~~~}\0}}}}|}~\0\0\0x~}|{zz\0zzzzz{{\0|~~\0p\0\0\0\0?~~~}}}|\0||{{|||\0||}~\0@\0\x07\0\0~~}|{||||||\0|||}|}}\0}}}}}}~\0~~~\0\0\`\0\0\0\0\0~}~~~}}}\0~~~~~\0\0\0\0\0\0\0\0\0G\0\0\0\0\0~}}}}|\0|||||||\0}}}}~~\0\0\0|\0\0\0\0~~~~}}}}\0||}}}}|\0~~@\0\0\0\0\0\0\0\0~\0\0\0s\0\0\0\0\0\0~~~~~~}}~~~\0~~\0@\0\0\0\0\0\0\0\0\0~\0~~~~\0~~~~~}\0}~~}||}\0}}}}~\0@\0\0\0~~}|}}}||}\0}}}~~\0~~\0~~\b\0~\0\0\0p\0\0\0\0\0~~}~~~\0~\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0v\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0\0\0\0\0x\0\0\0\0\0\0?\0~~~~~~~\0~}~~}}}\0}}}}}~~\0~~\0\0\0\0x\0\0\0\0\0\0\0\0\0?~~~~\0~~~~~~~\0~~~~~\0~\0\0\`\0\0\0\0'\0\0\0\0x\0\0\0\0\x07\0\0\0\0\0\0\0\0\0~~~~~~~\0~~\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0^~\0~~~~~~~\0~~~~~\0\0\0\0p\0\0\0\x07~~~~\0~~~\0\0 \0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0\0\0~~~~~~~\0~~~~~~~\0\0\0\0x\0\0\0\0~~~~~~\0~~\0\0\0\0\0\0\0\0\0\0~~~~~}}}}}\0}}}}}~~\0\0\0\0\0x\0\0~~~~~~~}~~\0~~~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~\0~~~~~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0@\0\0\0\0\0\0\0~~~~~~~~~~\0~~\0@\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0H\0\0\0\0\0\0\0\0~\0~~\0\0~~~~~~\0~~~~~~\0\0\0\0~~~~~\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\v\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\01\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0~~\0~~~~~~~\0~~~~~\0\0\0\0\0\0\0\0~~\0~~~\0\0\0~~\0~~~\0\0\0\0H\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x1B\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0|\0\0\0\0\0\0\0~~\0~~~~~~~\0~\0\0\0~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0~~~~~~}\0}}}}}||\0||||{{{\0{{{{zzz\0zzzzzzy\0yyyyyyx\0xxxxxxx\0xxxxxxy\0zz{|}~\0\0\x07\x07\x07\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x07\x07\0~}|\x07{{zzzzz\0z{{{|||\0|}}}~~~\0\0x\0\0~}|{{z\0yxxwwvv\0uutttss\0sssssst\0ttttuuv\0vvvwwxy\0z{|}~\0\`\b	\v\f\r\r\r\r\r\r\r\f\f\f\v\v
	\b\x07\0~|{\x07zyxxxww\0wwwxxxx\0xyyyzz{\0||}~\0\`\x07\x07\b\b					




\v\v





	\b\b\x07\0~}{zyxwvvut\0srrqqpp\0pppqqqr\0rsstuuv\0vvwwwww\0xxxxxxy\0yyyzz{|\0}~\0x\b	\v\f\r\r\r\r\f\f\f\f\v\v

	\b\x07~|{zyxwwwvv\0vvvwwwx\0xxyzz{{\0|}~\0p\x07\x07\x07\x07\0}|{zzy\0xwvuuts\0rrqqppo\0ooooopp\0pqrstuu\0vwxxyyz\0zz{{{{{\0{{|||||\0|}}~\0@\x07\b	
\v\f\r\r\r\r\r\r\f\f\v\v\v\v\v\v\v\v\v\f\f\f\f\v\v
	\b~}||{{{{{{||\0|}}}}}}\0}}}}~~\0\0\0~\0~}||{zyx\0xwvutts\0ssrrrrr\0rsttuuv\0wxxyyzz\0z{{{{{{\0{{{{{{{\0{{{{zzz\0z{{|}~~\0\x07\b~	
\v\f\f\f\f\v\v\v\v\v\v

\v\v\v\f\f\r\r\r\r\r\f\v
	\b\0~}{{zyy\0yyxyyyy\0yyyyyyy\0yyyzz{|\0|}}~~\0\0\0\0\0\0\0\x07\b\b		
			\b\b\x07\0~}|{zz\0yxxwvvu\0utttttt\0uuvvwwx\0yyzz{{{\0{{{{{{{\0{{zzzzz\0zzzzzzz\0{{|}~\0@\x07	
\v\f\r\r\r\f\v
	\x07?}|{zyxw\0wvvwwww\0wwwwwxx\0xxxyyzz\0{{|}~~\0\0~\x07\b\b					\b\b\x07\x07\0~}|zzy\0xwvvuuu\0uttttuu\0uuvvwxx\0xyyzzzz\0zzzyyyy\0yxxxxxx\0xyyzzz{\0|}~~\`\x07\b	
\v\f\r\r\r\r\r\r\r\r\r\f\f\r\r\r\r\f\f\f\f\f\v

	\x07\0}|zyxxwv\0vuuuvuu\0uvvvvww\0wxxyyz{\0{|}}~\0\0\0\0\x07\x07\b\b	





			\b\x07\0~}{zyxw\0vutssrr\0qqqqrrs\0ttuvwxx\0yzzz{{{\0{{zzzyy\0yxxxxxx\0xyyz{}~\0\x07	~
\f\r\r\f\v
	\x07\0~}{zyxxwvvvu\0uuuuuuu\0uuuvvvw\0xxyz{|}\0~\0\0|\x07\x07\b		

\v\v\v\v\v\v\v
		\b\x07\0~}{zxwutsrpo\0onnnnnn\0noopqqr\0tuvwwxy\0yzzzzzy\0yyxxwww\0wwwwwwx\0z{}\0p\b
\v\f\r\r\f\v	\b\0}{z\x07yxwwvvv\0vvvvvvv\0vvwwwww\0xyzz{|}\0~\0x\x07\b\b		
\v\v\v\f\f\f\f\v\v

	\b\x07\0~}{zxwvus\0rrqpppp\0ooppqrr\0stuvwxy\0yzz{{{{\0{{{zzyy\0xxwwwwx\0xy{|~\0\`\x07	\v\r\f
\b~|zxwvvuut\0ttuuuuu\0vvvvvvv\0wwxyzz{\0|}\0x\x07\b\b			

\v\v\v\v\v\v\v

	\b~|zywvut\0rqpoooo\0ooooopq\0rrstuvw\0wwxxxxx\0xxwwwvv\0uuuuuuv\0wxy{}@\x07	\v\r\f
\b~|zx\x07vutssrr\0rssssss\0ttttttt\0uvvwxyz\0{|}\0p\x07\x07\b\b			



\v\v\v\v

		\b\x07\0~}{yxvuts\0qppoooo\0pppqrst\0uvvwxyy\0yzzzzyy\0xxwwvvu\0tttuvwx\0y{~\0\bx\v\r\f	\x07}{yxwvuutttt\0uuuuuuu\0uuuuuuv\0wxyz{|}\0\0~\x07\x07\x07\b\b						
		\b\b\x07\0?~|{yxvt\0srqonmm\0lllllmm\0npqrstu\0vwwxxxx\0xxwwvuu\0ttsrrrr\0stuwxz|\0\b
\r~\f
\b?~|{zxww\0vvvvvvv\0vvwwwww\0wwxxyyz\0{|}\0p\x07\x07\x07\b\b\b\b			



\v\v\v\v

	\b\x07}|z\x07xvtrqpo\0nmlkkll\0lmnopqr\0stuwxyy\0zz{{zzz\0zyxwwvu\0utttuvw\0xy{~p\b
\f\f
\b}{zyxwvvvvw\0wxxxyyz\0zzzzz{{\0{||}}~\0\0\x07\x07\x07\x07\b\b\b\b\b			

		\b\b\x07\0?}|{ywut\0sqponml\0kkkkkkk\0lmopqrt\0uvxyyzz\0z{{zzyy\0xwvvuuu\0uvwxz{}\0\0\b
\v\r\r\f
	\x07\0~|zxwuuts\0ssttuuv\0wwxyyzz\0zz{{{||\0|}~\0p\x07\x07\x07\b\b\b\b\b\b\b\b		
				\b\b\x07~|{ywutrq\0pnmlkkk\0kkklmnp\0qrtuwxz\0{||}}}}\0||{{zyx\0xwwwwxy\0{|}\0\bx
\f\r\f
	\x07|zywutsrrrrs\0stuuvwx\0yzzz{{|\0|}}}}}~\0~\0\0|\x07\x07\x07\x07\x07\b\b\b\b\b\b\x07\0?~}{zywu\0tsrpoml\0kjjiihh\0ijkmnpq\0suwxyz{\0|||||{z\0yyxwvut\0ttuvwy{\0}\0\x07	\v~\r\v	\x07~?|zxvuts\0rrssttu\0vvwxyyz\0zzz{{||\0||}~\0\`\x07\b\b\b\b\b\x07\x07\0~|zywvut\0sqponmm\0lkkkklm\0nopqsuw\0yz{{|}~\0~}||{zy\0xwuuttt\0tuvxy{~\0	\v\r\f
\b\0~?{yxvuts\0ssttuuv\0wxxyzzz\0z{{|||}\0}~\0x\x07\x07\b\b					\b\b\x07\0~}{yxwuts\0rqpoonm\0mmlmmnn\0oprstvw\0xyz{|||\0|{zzyxw\0vutssrs\0tuvxy{~\0	\v\r\r\f
\b~|ywvtsrq\0qrrstuu\0vwxyyyy\0xyyyyyz\0{{}~\`\x07\b	

\v\v


	\b\0~}|{zyx\0wvuutsr\0qpppoop\0pqrstuw\0xyz{{||\0{{zyyxw\0vutttst\0ttvwxz{\0}\0\b\v\r~\f\v	\0}zxvtsq\0pppqrst\0uvvwwxx\0wwwvvvv\0vwwxyz{\0}~~\0p\x07\b	

\v\f\f\f\f\v
	\b\x07~}||{zzyxvut\0srqonnm\0mnnopqs\0tvwxyz{\0{{{{zyy\0xxwwwvv\0vvwwwxz\0{|~p\b\v\r\f
\b|yvtrqpooop\0qstuvwx\0xxxwvut\0ttssttu\0vxyz|}~\0\0\0\0\0\0\0~\b	\v\f\f\r\r\r\r\f\v
\b\x07\0~~~}|\0{zxwvtr\0qponnnn\0nopqstu\0vxyyzzz\0zzzzzzz\0zzzz{{{\0|||}~\0@\b
\r\f
\b\0}zxvtsrrrrstu\0vwwxxxw\0wvuttss\0sstuvwx\0z{|}~\0\0\0\0\0\b	
\f\r\r\f\v
\b\x07\0\0\0~|{ywutrpnl\0kkjjjkl\0moqrtuv\0xyzz{{{\0{{{{{{|\0||}}}}}\0}}}}~~\0\0\x07	~
\f\r\r\f\v




\v\v\f\f\r\r\r\f\v
\b}zxwut\0tsssttv\0wwxxxxx\0xwvvuuu\0vvwwxyz\0{}~~\0\`\x07\b	\v\f\r\r\v
	\b\0~}{zxvusqonl\0kkkkklm\0oprtuwy\0{|}}~~\0\0~~~~~~\0}}|||||\0|}}~\0p\x07	\v\f\r\f
			\b			

\v\f\f\f\f\v
	\x07\0}{ywutsrrrss\0tuvwxxx\0yxxxwww\0wxxxyz{\0|}~\0p\x07\b	
\f\r\f\v	\b\0~}|{zy\0xvutsqp\0onnmmnn\0oqrtvxy\0{|}~~\0~~}|||\0{{zzzzz\0zyyyxxx\0xwxxxy{\0|~\0\b|
\f\r\r\f\v
		\b\b\b\b\b\b		
		\b\x07\0~|yw\x07usrqqqq\0rstvwxy\0z{{{{{z\0zyyyyyy\0zz{|~\0@\x07\x07\b		
\v\f\r\r\f\v	\b\x07\0\0~}||{zx\0wvtsrrr\0rrrstvw\0yz{|}~~\0~~}}|{{\0zzyyyyy\0zzzzzzz\0yyyyyyz\0z{}p\b\v\r\r\v	\b\x07\x07\b\b\b\b\b\x07\0}?{xvusrr\0rrstvwy\0z{|}}}}\0||{zyyx\0xxxyz{}\0~|\x07\x07\b	
\v\v\f\f\r\r\r\f\f\v
	\b\x07\0\0~|{zyxvutsr\0qqppqqr\0stuvwxy\0yyyyyyx\0xxwwxxx\0xyz{||}\0}}}}}}}\0}}~~\`\b
\f\r\r\v	\x07\0~|zxvutssstu\0vwxz{{|\0||||{{z\0zyyyyz{\0|}~\0x\x07\x07\x07\x07\b\b	
\v\f\f\r\r\f\v
	\b\0~}|\x07{zyxwvt\0srqpppp\0ppqrstu\0wwxyzzz\0zzzzzzz\0{{||}~\0\0\x07\b
\v\r\r\r\f\v
	\x07\0~}{yxwvvv\0vvwxyz{\0{|||}||\0{{zzzzz\0z{|}~\0@\x07\x07\x07\x07\x07\x07\x07\b\b\b		
\v\v\v\v\v\v

	\b\x07\0~}|{zyxwvut\0srqppoo\0ooppqrs\0tuvwwxx\0yyyzzzz\0z{{|}}~\0\0\0~\0\0\0\0\0\0\0\0\x07\b	
\v\v\v

	\b\x07?}|zywvv\0vvvvwxy\0{||}~~~\0~~~~~~~\0~~\0p\x07\b			









\v\v\v\v\v\v\v
	\b\x07\0~}|{zzzyxxwv\0vuutssr\0rrrrstt\0uvwxyzz\0{{|||||\0||}}~~~\0\0~\0\0\0\0{\x07\b			\b\b\b\x07\0~}{zywwv\0vuuuvwx\0yz{{|}}\0}}}}}}}\0}~~\0\`\x07\x07\b\b																	\b\x07\0?~}|{{zz\0yyyyyxx\0xwwvvuu\0uttuuuv\0vwxyyz{\0{||}}}}\0}}}}~~~\0\0\0~\x07\b							\b\b\x07\0~}{zyxxw\0wwwwxyz\0{{|}}~~\0~~~~~\0\0\0~\x07\x07\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\x07\x07\0~?}}|{{zz\0yyyyyyy\0xxxxwww\0vvvvwwx\0xyz{{|}\0}~~~~~~\0\0\0\0\0\x07\x07\x07\b\b\b\b\x07\x07\0\0\0\0\0\0\0\0\0\0?~~}}|{\0zyxxwww\0wwwxxyy\0zz{{|||\0|}}}~~~\0\0\0|\x07\x07\0~}}|{{{{\0zzzyyyy\0xxxwwww\0wwwxxyy\0z{{||}}\0~~~~~\0\0\0\0\0\x07\x07\b			





		\b\b\x07\0\0\0?~~}}|{\0{zzzzzz\0zzzz{{{\0{||}}}~\0\0\0|\0~~~}}||||{\0{zzyyxx\0xxwwwwx\0xxxxyyz\0z{{{|||\0||}}}}}\0}}}}}~~\0~\0x\x07\b\b\b				\b\b\x07\x07\x07\0\0~~}}||{{\0{zzzzzz\0{{{{{{|\0||||}}}\0~~~\0\0\0p\0\0~\x07~~}}}||\0{{{zzzy\0yyyyyyy\0yyyzzzz\0zz{{{{{\0{||||}}\0~~\0\0\`\0\x07\b\b							\b\b\x07\x07\0\0\0~~}}|||||\0||}}~~~\0\0\0\f~~~~\0~\0\0p\0\0\0\0@\0\0\0\0\0\0\0~\x07~}}}||{\0{{{{{{{\0{{{{{{{\0||||||}\0}}}~~~\0\0\0\0~\x07\x07\x07\x07\x07\x07\x07\0\0\0~}}||\0{zzzzzz\0zzzz{{{\0{{{||||\0|||||||\0|||||||\0}}}}}}~\0~~~~~~~\0~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0?~~~\0~~~~~~\0\0\0x\0\0\0\0~~~~}}}||\0||{{{{{\0{{{{{{{\0{{{{|||\0||}}|}}\0|||||||\0|||}}}}\0}~~~~~~\0~\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0~~~~}}\0}}|||||\0{{{{{zz\0zzzzzzz\0z{{{{{|\0|||||||\0|||||||\0|}}}}}~\0~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~~\0~}}}}}}\0}}}}}}}\0}}}}}}}\0}~~~~~~\0~\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0}}}}}}}\0}||||||\0|||{{{{\0{{{{{{{\0{{{{{{{\0||}}}}}\0}~~~\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07~~~~\0~}}}}||\0||{{{{z\0zzzzzzz\0yyyyyyy\0yyyyyyy\0yyyyyzz\0zz{{{||\0|||}}}}\0}~~~\0\0\0\x07\x07\x07\b\b\b\b\x07\x07\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~}}}|||{\0{{{{{zz\0z{{{{{{\0{{{{zzz\0zzyyyyx\0xxwwwwv\0vvvwwwx\0xyyzz{|\0|}}~~\0\0\0\x07\x07\x07\b\b\b					


			\b\b\x07\x07\0\0\0\0\x07\0~~\0~~~~~~\0~~~}}}}\0|||{{{z\0zyyyyyy\0xxxxxxx\0xyyyyyy\0yyyyyyy\0yyyyyyy\0yyyyyyx\0xyyyzzz\0{{|}}~~\0~\0x\x07\b\b\b		


\v\v\v\v\v\v\v\v
			\b\b\x07\0\0~~~~}}}}\0}}}}}}}\0}}~~~\0\0~~~\0}}||{{{\0{zzzzzz\0zz{{{{{\0{{{{|||\0||||||{\0{{{{zzz\0zzzzzzz\0zzz{{||\0|}}~~~\0\0\0\0\0~\x07\x07\b\b		




		\b\b\x07\x07\0\0\0\0~~~~}}}|\0||||||}\0}}}~~~\0\0\0\0\0\0\0~\0~~~}}}||||\0{{{{{{{\0{{{{{{{\0{||||||\0|}}}}}|\0|||||{{\0{{{{{{{\0{{{{{||\0|}}}~~\0\0\0\`\0\0\0\0\0\x07\x07\b\b\b								\b\b\x07\x07\0\0\0~~}}||||\0{{{||||\0}}}}~~~\0~\0\0~~~~}}}\0}|||||{\0{{{{|||\0|||||||\0}}}}}}}\0}}}}}}|\0|||||||\0||||{{{\0{{||||}\0}}~\0\0\0\0\0|\x07\x07\b\b\b\b\b\b\b\x07\x07\0\0~~~}}}\0}|||||}\0}}}}}~~\0~\0@\0\0\0\0\0\0?~~~~\0}}}||||\0|||||||\0||||||}\0}}}}}}}\0}}}}}}}\0}||||||\0|||||||\0{{{{{||\0|||}}~~\0\0\0\0p\0\0\0\0\0\x07\x07\x07\x07\b\b\b\x07\x07\x07\x07\x07\0\0\0~~~~~~~~\0~~~~~~~\0~~~~~\0~~~~~~~\0}}}}|||\0|{{{{{{\0{{{||||\0|||}}}}\0}}}}}}}\0}}}}}}}\0}}}}}}}\0}}}||||\0|||||||\0}}~~~\0\0\0\0\0\0\0~\0\0\0\0\x07~~~~}~}\0}}~~~~~\0~~\0\0\`\0\0\0\0\0\0\0\0~~~~~~\0~}}}}}}\0|||||}}\0}|}}}}}\0}}}}~~~\0~~~~~~~\0~}}}}}|\0|||||||\0|||||}}\0}~~~~~~\0~~~~~\0~~}~~~~\0~\0\0x\0\0\0\0\0W\0\0\0\0\0\0\0\0\0~~~~}\0}}}}}}}\0|}}}}}}\0|}}}}}}\0}|}}}}}\0||}}|||\0|||{{{{\0{zzzzzz\0zzzzzz{\0{{|||}}\0}}}}}}}\0}}}}}~\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~}|||}\0|||||}}\0}}}|}}}\0}}||}}}\0}|}}}}}\0}}}||}}\0||||||{\0{{{{{{z\0z{{{|||\0|}}~~~~\0~~~~~~~\0~~~~~\0\0\0~\0\0\0\0\0\0\0\0\0\0\0~~~}~~\0~~}}|}~\0}|{{|}|\0||{{|}}\0}|||}~~\0|||}}}|\0||{{||{\0zyz{{{z\0yz{{|||\0|}~~~~\0~~~~~}}\0}}}}}}}\0~~\0x\0\0\0\0~~~~~~\0~~\0\0p\0\0\0\0\0\0?~}}\0}~~~||}\0~}}~||}\0~~}}}}~\0~~~\0@\0~~~}}||}|\0||{{||{\0{{{|}}|\0}}}~~~~\0~~\0~~~~~\0~\0\0\0\0t\0\0\0\0~~\x07~~}~}}}\0~}}}~~\0\0\0\0t\0\0\0\0\0\0\0?~~~~}}\0~~}}~~~\0~~~~~\0\0 ~~~~~}\0|||||{{\0{{{{|||\0{{|||||\0|}}}}~~\0~~~~\0~~~~~\0~~~\0\0\0\0\0\0~~~\0~~~\0\0\0\0\0v\0\0\0\0\0\0\0\03~~}}}}|\0|||}~}}\0~~~~~\0\0~~\0~~~~}}}\0}|}}}}}\0|}}}}~~\0~~\0\0\0\0\0\0\0~~~\0~~\0\0\0~\0\0~~}}\0}}}}}}}\0}}~}}~~\0~~\0\0\0\0\0\0\0\0\0\0\0\0~}}}}\0|||||||\0}}}}~~~\0~~~~~\0~~~~~}\0~}}}}}}\0}|}|}}}\0|}}}}||\0|}}||}}\0}}~~~~\0\0\0\0\x07\0\0\0x\0\0\0\x07~~~~~~~\0~~~~\0\0\0\0\0~\0\0\0\0\0\0\0\0~}}}}}}\0}}}}}}~\0~~~~~~\0~\0~~~~~~\0~}}||}|\0||||||}\0}}}~}}~\0~~~~~~\0~~~\0~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~~\0~~~\0\0\0\0\0\0~\0\0\0\0~~~}}\0}}}}|||\0}}}}}}}\0~~~}}}~\0~~}}}}}\0}~}}}}|\0}}}}}||\0|||||||\0|}}}}}}\0}}}}}}}\0}}~~~}}\0~~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~}}}~~~\0}}~~~~~\0~~~~~~~\0~~~~~~}\0}}}}}}|\0|||||||\0{{|}}}|\0|}}}}}}\0}}}}}||\0|}}}}}}\0}}~~~~~\0~~~~\0\0@\0\0\0\0\0\0\0\0\0O\0\0\0\0c\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0o\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~~~}}\0}~}}}}}\0~~}}~~~\0~~~~~\0~~~~~~~\0~~~~~~~\0~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{\0\0\0p\0\0\0p\0~~~~~~\0~~~~~~~\0}~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~}}}\0}}}}}}}\0}}~~}~~\0~~~~~~~\0~~~~~~~\0~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0 \0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~\0~~~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~\0\0\0\0\0\0\0\0\0\0\0F\0\0\0d\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\00~\0~~~~~~~\0~~~~~\0~~\0~~~~~~~\0~~}~~~~\0~~~~~~~\0~\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0~~~\0~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\01\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~\0~~\0\0\0~~~~\0~~~\0\0\0~~~~~~~\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0H\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~~\0~~~~~~}\0}}}}}}}\0}}}}~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~\0\0\0~~~~~~\0~~~~~~~\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0<\0\0"\0~~~\0~~~~~~~\0~\0\0\0\0\0\f\0\0\0\0F\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0C\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~\0~\0\0~}}||\0{{{{{{|\0||}~~\0\0\0\0~\0\0\0~~~}}\0}}}}}}}\0}}}}~~~\0~~~~~~~\0~~~~~~~\0}}}}}}}\0}}}}}}}\0}}}}}}|\0|||||||\0||{{{{{\0{{||||}\0}}~~~\0\0\0\0~\0\0\0@\0\0~~}}}}}}}~\0~\0\0x\0\0~~\0\0\0\0\0x\0\0\0\0\0\0\0\0~~~~~~~~}\0}}}}}}}\0}}||||{\0{{{{{{{\0{{{{{{{\0{{{{{||\0|||}}}}\0~\0\0p\0\0\0\0\0\0~~\x07}}}}}}}\0}~~\0\`\0\0~\x07~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~}}}}\0}}}}}}}\0}}}||||\0||{{{{{\0{{{{{zz\0zzzzzzz\0yyyyyyz\0zzz{{|}\0}~~\0\0p\0\0~~\0\0|\0?~}}}}}\0}~~\0p\0\0?\0\0\0~~~~}}}\0}}}}}}}\0}}}}}}}\0}}||||{\0{{zzzyy\0yyxxxxx\0xxyyyyz\0z{{||}~\0~\0x\0~}}}}\0}}~\0\`\0~}|{{{zz\0{{|}}~\0@\0~~}}}}}}\0}}}}~~~\0~~~~}}}\0}||||||\0|||||||\0|}}}}}}\0}}}|||{\0{{zzyyx\0xxxxxxx\0xxxxyyz\0z{{|}~\0\0\x07\b\b\b							\b\b\x07\x07\0~~}||||\0}}~\0p\0~}|{zzz\0z{|}~\0\`\x07\b

\v\v\v\v
	\x07\0~}||{{{{||\0}~~\0\0\`\0~~}|{{zyyy\0yyyyyzz\0{{|||}}\0}}}||{{\0zyyxwvv\0uutttss\0tttuvwx\0yz|~\0p\x07	
\f\r\r\r\f\v
	\b\x07\0~}|{\x07yxwvuut\0tuuvxy{\0}\x07|\b		
		\b\x07~|{zyyzz\0{|}p\b	
\v\f\f\v
	\b\0~|zyxxxxxyz{}\0~\0|\0~}{yxvutssss\0tuvxy{}\0~\0\0~\0~}|zxvusrqpo\0oooopqs\0tvxz}\0\`	\f\x1B\x1B\x1B\x1B\r\v\b\0\0\0\0\0~|zxuspnl\0kjjijln\0qtw{\x07\`
\v	~}}\x07~\0\b|
\f\r\f
\x07\0|?xtqnkih\0hijlnqu\0y}\b
\f|\r\r\v	\0|yvsqponnopr\0tvxz|}~\0~}{y\0vtromki\0hgggikn\0ruy~	p #&())('$!\v~?zxvuttu\0vwyz||}\0}||zxvs\0pmjgedd\0degjnsy\0\v\x1B~!$$$#!\f\x07~?zwuttuv\0xz}\0\bx
\v\f\f\v	\x07~{xurpnmmmnp\0svy|\`\b	

	\x07|yw\x07usrqppp\0pqrstuu\0vvwwwww\0vuuttss\0srrrrrr\0rrrstvx\0z}\0\b|#',/24320,'!\v{tnhda___a\0dgkosvx\0z{|||zw\0usqpopr\0ux}	x &,035530+%\vyqjc_\\ZZ\\_chn\0ty\x07
\fx\r\r\f
\b\0~~~~\x07
\r\r	\0{vrnjgedddeg\0ilnprtv\0xxyxxww\0wvwwwxy\0z|~\0x\0~{xuromlmn\0psw|\rp$*/489850*"|tkd_\\YZ\\_chm\0sx}x~{xtpmkkknrx\0@\b!*17:<;71*!\fvkbZ\x07UQPQSX]\0cjqx\b\`\v\f\r\r\f\v	\x07\x07
\r\v}wohc^[\0YYY[^bf\0joswz|~\0~~~}|{z\0zzz{}@\b
\f\r\r\r\f
\x07~xtoieb_]\\\0\\\\^bgms\0y\0\r#~(,.02331-)%\r\0ztpl\x07hgecccd\0efikklm\0nprtuvy\0|\b\r|!&),/00.+&!\x1B\f}vohc_\\ZYY[]\0_bfjotx\0|\0\b\f~\x1B\f\x07}xtp\x07mjhfede\0eghjlmo\0qsuvxyz\0{}~\0x\x07\b\b\b\b\x07\0~|zxurpnl\0jhfeccb\0bbbdhmr\0x~\f!)|18<?BBA=6-$yof^XVS\0RUW[_ch\0mquwwww\0vvvvvvy\0|\x07#~*/468740*"\x07~?umf\`\\YW\0WWY\\_cf\0ilpswz}\0\0
\x1B"%&'('$!
}vpkfca\`__\`bd\0gjmpruw\0y{}~\0\`\x07\x07\b\b			\b\b\x07}{ywtroli\0fdb\`_^^\0_acfkry\0\0\b'/59:9873.'\f}?vojfcbb\0bcfgikm\0oqrtttt\0vx{~\x07p\f\x1B"$%&&%"\x1B\r\x07~yuqolkih\0gfghijl\0mpsw{@\x07\v  \r\bzvsoljhg\0ggghjkm\0psvy{~\0@\x07\b						\b\x07\0}|{\x07yyxwvtr\0qpnmkji\0hgghhik\0moruy}@\x07\f %'((&$"\x1B	~?xsnjgdc\0cdegilo\0rvy|\0p\x07
\f\r\v\b\0}zvs\x07pnlkkkk\0kmoqtvy\0{~\0	\f|\r	}yvroljhgg\0hijloqt\0w{~\x07x	
\v\f\f\v

	\b\x07\0~}|zxvtsrqpom\0mmmmnno\0pqrtuxy\0z|~p\x07	
\f\r\r	~{xusqooopqs\0uwy|\`\b	
\v\f\f\f\f\f\f\f\f\f\v

		\b\x07\0}{ywutssr\0rstuwy{\0|~\0\x07|\b	
\v\v\v\v\v\v\v\v

		\x07?}zxusrq\0poopqru\0wz}p\b
\v\v\v
	\b\x07?}|{zxwv\0utsrrqq\0pppqrss\0tvwxz|}\0~\0|\0\0\0\0\0\0\0\x07\x07\b\b\x07\0~}}\x07}~~~~\0\x07\b
\v\f\f\v\v


	\x07~|{yxwwvvvv\0wwwxyzz\0{{|}\0\`\b
\v\f\r\f\v	\x07~|ywusrqpppqr\0suvxz|}\0~\0?}|{yxwv\0utttttt\0uvvxyz{\0|}~~\0@\0\0\0~~\x07}}||{{{\0||}~\`\x07	
\v\f\f\f\f\f\v
	\x07\0?~|{{{{{\0{{{|}~~\0\0\0\0p\0\0\0\0\x07\b\b\b\b\b\x07\x07\x07\0}|zyxw\0vvvuuvw\0xyz{}~\0@\x07\x07\b\b\x07\x07\0}|{zyxvu\0tsrrqqq\0rstuvxy\0{|~p\0~}}|||||||}\0\0~\x07\x07\b\b\b\b\b\b\x07\x07\0\0\0~~~~~~\0\0\0\0\0\0\0\0\0~}|\x07|||{{{{\0{|}}~~\0\0~\0~}\x07{zyyxww\0vuuvvvw\0wxz{|}~\0\0\0\0\0\0~}}||\0{zzyyyy\0z{|~\`\x07	
\v\f\r\r\r\r\f\v
\b\x07\0~}}|||}}\0}}~\0@\0\0\0\0~~}||{\0{zzyyzz\0{||}~@\x07\x07\b				\b\x07\x07\0~?}|{yxwv\0vuuuttu\0vwxyz{}\0~\0~\0\0~~}}}|||}}}}\0}||||{{\0zzyyzzz\0z{|}\0\`\x07\b\b\b\b	\b\b\x07\x07\0~}}|||{{{||}\0}~\0p\0\0\0\0\0~~~\0}}}}|||\0|{{{|||\0}}~~\0\`\x07\x07\b\b			\b\x07\x07}|{yxw\0vvvvvvw\0xyz{}~\0\0\0\0~~~~~\0~~~~\0~~}}}\0|||{{{|\0|}}~\0\`\0~~}}||\0|||}}~\0\0\0\0\0~~}}||||||||\0||||||}\0}}}}~~~\0~\0p\x07\x07\x07\x07\x07\x07~}|{zz\0yyyxxyy\0yzz{{||\0}}~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0~~~~}}\0}}}}}}}\0}}}}}~~\0~~\0\0\`\0~\x07~~~~~~\0\0~\0\0~~}}||\0{{{z{{z\0{{{{||}\0}~\0p\0~~~}}}}}}}}\0}~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0?~~\0~~~~~~~\0~~~\0@\0\0\0?\0\0\0\0~\0\0~~\x07}}|||||\0{{|||}}\0}~~\0@\0\0\0\0\0\0\0~~}}}}}\0}}}~~~\0~\0~~~~~~~\0~~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0~~~\0~~}}}}~\0~~~~\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~}}}\0}}||}}}\0}}}}}~~\0~~\0\0\`\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~}\0}}}}}}~\0~~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0?\0~~~\0~~~~~~~\0~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0~~~~}}}}\0|||||||\0||}}}~~\0~\0\0p\0\0\0\0~\0\0@\0\0\0\0\0~~~~~~\0~~~~~~~\0~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0O\0\0\0\0\0\0}\0\0\0\0\0\0\x07~~~~~\0~~~~~~~\0~~~~~~~\0\0\0\0x\0\0\0\0?\0\0\0\`\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~\0~~\0~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~\0~~~~~~\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0z\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0a\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0c\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~\0~~~~~~~\0~~~~~~\0~~~~~~~\0~~~~~~~\0~\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0G\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0?\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0~~\0\0\0\0~~\0~~~~~~~\0~~~~~~\0\0~~\0\0\0\0~\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0s\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0A\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0|\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0X\0\0\0\0\0\0\0\0\0\0\0^\0\0\0\0\0\0~~\0~~~~\0\0\0\0\0~\0~~~~\0\0\0~~\0~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0a\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0\0H\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0L\0\0\0\0\0\0\0\0\0\0~~~\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0\0~\0~~~~~~\0\0\0@\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0}~}\0}~~}\0\0p~~|||{{|{|}\0}~\0|\0~~}\x07}}}}~~~\0\0\0\0~\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\v\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0L\0~~\0~~~~}~~\0~~\0\00\0\0\0}~~|}~\0||~}{~~\0}~~~\0\0\0~\0[~~~~\0\0\0\0\0\0[~}\0}0}\0}~~~}~~~\0@~~\0~\0\0d~\0~\06\0\0~\0}~\x1B~}|	\0}\0~\0i~\0\0\06\0\0~\0~K\0~\0\0~\r}~|}\0}$}\0~\0f\0~\0}6~\0~\v~\0\0\09}\0{}6~~|\0|2\0~[\0\0o\0\0\0m\0~~\0f\0\0~\0\0\0~~&\0}\0\0\0{\0~7\0\0\0o\0~\06\0\0\0\0s\0~1\0\0\0\x1B}}\0\0\0e~\0~\0}6~\0}\0~6\0~\0\0~3~\0}}6\0\0}\07}|~&}~}~|~\0\03}$~~}}~\0\0~2|xx[|~~|I}~~}}}}I~}\0|l|\0|}}}~|	}}{} w\0z\0~}\0\0|{\0[~\0~%~\0}{6z~~|\0|~}\0}\0\0|~}|}I}|m{~{\0d~}\0\0~~\0L}\0\0}\0L~\0~~\0d~\0\0\0~n~\0~\0l\0\0~{[}~}I}\0\0|\0_}\0}\0m{~}\0d~}6\0\0\0\07\0\0~\0\0\0s\0~g~\0\0v\0|K\0{{M|\0yz6\0|~~|{~~I|~~}$}|\0|2~~\0~\0~|~~|z\0Yz|~-}}\0{2\0z\0{\0[\0|\0~~	}\0||$~\0\0~\0J\0}~~}\0I|\0|H|}|d|\0~~&~~}\0~|~}~|\0\0|\0|~M~}\0{l}\0~~L\0~~\0I\0\0\0}\0\0\0~~\x1B\0~|~}}|}\0~\0~~~I~~\0I}~~~\0}~}~ }~~2\0~}3~}\0}2~~\0~\0\0\0d~\0\0~&\0|}~\x1B}~I~\0\0l\0\0\0~\0\0\0\0m\0\0>~[~M\0\0\07~~[~}M~~~\0d\0\0~o~\0\0\0~6\0\0~\09\0\0\0\0|\0[}~\0}I~|\0}\0,~~~~\0~\0I~\0\0\f\0\0~\0c~}\0}\0L~\0\0|\0}&\0|}{}}}}~}\0}~\x1B\0}\0\0|\0[|}\0)~~{{\0[{}~{I\0}\0}\0\0e\0\0~Y}|~M}|\0{l|}\0\0}4\0\0~F\0}{m{|}}&z~y\0y2|}}~~}Y}\0\0m\0\0|{6|~}\0}}K}}l}\0\0f\0\0\0\0\0o}l~6\0[}}m}}\0}6\0{\x07{[~\0\0}]\0|\0~-\0\0~\0\0~~}}6\0\0[\0\0\0\0'~|\0|2\0\0\0[\0\0~'}~~~|\0~3~\0\0\0~~}$||~}$}~~}~}I}~~}\0$~~\0}~\0~~~\0\0~\0~\0{\0Y{|yIy|~\0I~}|\0H}{\0zY\0|~\0e\0}}6\0}\0~[\0}|m{|}6}}}}\0\01\0}~\0|3z\0y\x1B{|I}}{\0d}\0\0\0~N}\0|L||~}\0}~I\0}|m{{{6||\x1Bzz\0i{|~}&}\b|{\b~}~\0M\0\0\0}5\0|z[}~}Y\0~\0-\0\0~}7\0\0\0~O~~~\0d}~\0v\0\0~\0\0\0\0\0\0\0[\0\0~\0m\0}4|}~|\0zYz}M~~$\0\0~\0\0~\x1B~~\0~\0H~~}d|~\0~$~\0}|~}\0I\0~$}\0\02\0~~~~~\0@}\0\0\`~~\0\0\0L\0~\0~~\0}}~\x1B~~}I\0~\0d}\0~\0&~\0|\0d}~\0}\0\0d~\0~\0P}I~~~~$}\0~}6~[\0\0\0\0m\0\0\0\0}~}~}I~~|d|}\0~6\0\0~\07\0~\0\0~2\0~~\0\0\0}\0%~~~\0~\0~[\0~\0m\0v\0\0{\0\0\0\0\0\0\0\07\0\x1B\0\0\0~\0M\0\0\f\0\0\0R~\0~\0l~\0\0\0~2\0}\0}\0[\0}~~\0I~~}~|$}\0~}}\0~~\0B~\0\0~L~\0\0}~\0L~~~\0~\0\0~\0\0~M~\0~$~\0~~\0~\0}~\0@~\0\0\0d~\0~\0$\0\0\0\0\0\0I\0\0\0\0l\0\0\0\0\0\0\0m\0\0~m~~&~\0\0\0r\0\0\0\0m\0\0\0m\0\0\0~6\0\0~3\0~~\0~\0~\0Y\0\0\0I\0\0\0\0\\\0\0\0o\0\0\0\0\0?\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0?\0\0;\0\0\0[\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0$\0~\0\0R\0\0\0M~\0d~\0\0}}&~~\0\0\0\0\0\0{\0\0\0\0\07\0\0~~~~\0~}\0~}\0~\0~\0~~~\0~\0~~~\0}~~\0@~\0~\0\0d~\0~\0~$\0~~\0}}~~\0~~\0\0~\0\0~2\0\0~\0\0\0\0\0[\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0~\0~\0\0\0\0\0\0\0s\0\0\0\0M\0\0\0d\0\0\0\0\0}\0\0\0\0\0}\0\0\0\0\0~\0\0\0\0\0\0_\0\0\0\0M\0\0\0\0\0\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\0\07\0\0\0\0\0s\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0s\0\0\0\0\0m\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0[\0\0H~\0~~\0~~~\0~~~\0~~~\0\0~\0~\0~~~~~~~\0\0\0\0	\0~\0\0\0\0$\0\0\0\03~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0-\0\0\0&\0\0\0X\0\0\0\0n\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0\0\0\0\0\0\0\0\0\0}\0\0\0\0\0o\0\0\0\0\0w\0\0\0\0\0 \0\0\0\0\0Y\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0[\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0\0e\0\0\0\06\0\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\07\0\0\0\0\0\0I\0\0\0\0l\0\0\0\0\0\08\0\0~~~\0~~~\0~~\0~~~~\0\0\0~~\0~\0\0\0\0d\0\0\02~\0~\0\0\0\0\0X\0~\0\0\0\0\0\0~	\0@\0\0\0\0\0|\0\0\0\0\0[\0\0\0\09\0\0\0\0\07\0\0\0\0\0\0\0\0z\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\07\0\0\0\0c\0\0\0\0\0|\0\0\0\0\0\0\0~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0\09\0\0\0\0\b\0\0\b\0@\0\0\0\0\0|\0\0\0\0\0>\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0f\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0y\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0H\0\0\0\0t\0\0\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\r~~~\0~~~~~~~\0~~\0\0\0\0~\0~~~~~~~\0~~~~\0\0~\0~~~~~~~\0~~~~~\0~~\0\0\0H\0\0$\0\0\0\06\0\0\0\0\0[\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0_\0\0\0\0\0\0\0\0\0\0\0\07\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0~~~~\0~~~~\0~~~~~~~\0~~\0\0\0~~\0~~~\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0I\0\0H\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0/\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~~~\0~~~~~~~\0~~\0\0~\0~~~~~~\0~~~~~~~\0~\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0r\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\00\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'\0\0\0\0\b\0\0\0~\0~~~~\0~~\0~\0~~~~~~\0~~~~~~~\0~~~~~~~\0\0~\0\0\0\0\0\0\0\0\0\0\0\0.\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0n\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0q\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0}\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0}}}}}}}\0}||||||\0|{{{{{{\0{{{{{||\0||||}}~\0~~}~~\0@\0\0\0{\0\0\0\0\0\0~~~\0~~~~~\0~~~~~\0~~~~~~\0~}}||||\0|{{zzzz\0zzzyyzz\0z{{{{z{\0|}}}}}~\0\0\0\x07			\b\x07\x07	

\b\x07\x07\x07\b\b\x07\0\0\0\0~~~~~}}\0}}}}}}}\0~~~\0@\0\0\0\0\0\0?~~~}}}|\0{zzzzyx\0xwwwwvv\0vvvvuuv\0vwwvuvw\0xyxwwxz\0|||{{|\0\x07\x07\x07			\x07\b\b\b\x07\x07\0~~~~}\0}}}}}||\0||}}}}}\0}~~~~~\0\0\0\0\0\0~\0\0\0~~}}|\0|{zzyyx\0wwvvuuu\0uuutttt\0uuuuuuv\0wxxwwxz\0|}}}|~\0@\b
\v\v

\v\r\f\v\v\v\f\f\v
			

	\b\b\b\b\b\b\x07\x07\x07\x07\0\0\0\0?~~}}}}|\0|||||||\0|}}~~~\0\0\0\0\0~~}|{\0zyyxwvu\0ttssrrq\0qqqqqqr\0ssttstt\0vxxwwwy\0{}}}|}\0@	\v\f\f\v\v\f\r\r\f\v\v\f\f\v
					\b\x07\x07\x07\x07\x07\x07\0\0~}}||||{\0{z{{zzz\0zz{{{{|\0|}}}~~~\0\0\0\0\0\0~\0\0\0~~}|{{zy\0xwvutss\0rqqppqq\0qqqqqrs\0tttttuw\0yyyyy{}\0\`\x07\x07\x07	\f\r\r\f\v\f\r\r\f\f\r\r\f





\b\x07\x07\x07\x07\x07\0\0\0\0~}}}}}}\0|||||}}\0}}}~~~\0\0\0\0\0\0\0~}\x07|{zzyxw\0vvuttsr\0rrrrrrq\0rrstttt\0tuvxxww\0wy|}~~}\0~\0~	\v\r\r\f\f\f\r\f\f\r\r\f\v
	


	\b\b\b\b\b\b\x07\x07\0\0\0\0}}|||{\0zzyzzzz\0zzzz{{|\0||}}~~~\0~\0\0\0\0x\0\0\0\0\0\0~}\x07}||{zyy\0xxwvuts\0srqppoo\0ppoonno\0pqrqqqr\0twwwwwy\0|~@\x07\b\b\x07\x07	\f\r\r\r\f\f\r\r\f
					\b\x07\0\0~~~}}||{{{{\0{{{{zz{\0{|||||}\0~\0@\0\0~~}|{{zyy\0xwvutts\0rqppppo\0ooonopq\0rrrrstw\0xxxxx{~\0\0\0\0\0w		\b\x07	\v\f\v\v\v\f\v
	\b			\x07~~~~}|\0{{zz{zz\0zyyyzzz\0zzz{||}\0}}}~\0\0\`\0\0~}}|{{zyxw\0vvutsrq\0ppooonn\0onnnopr\0rqrstvx\0xxxx{~\0@\0\0~\bs	\x07\b
\f\r\r\f\f\r\r\f	\b		
	\b\x07\x07\x07\b\b\0~?~~~~}|{\0zzzzyyx\0xyyyyyy\0z{{{|||\0}~\0\`\0\0~}}||{zyxwv\0vutsrqp\0ppooooo\0ooppqrs\0stuuwxz\0zzz{}\0@\0\0\x07		\b\b
\r\f\v
\v\f\v
	\b				\x07\x07\0?~}|{\0|||{zzz\0{{{{{{{\0|}~}}}~\0\0~\0\0\0?~}||{{\0zyxwvvu\0tsrqppp\0ponnnno\0onooprs\0ssssuxy\0yxwy{~\0@\0\x07	y\b\x07\x07	\f\r\f\f\v\f\f
			
	\b\x07\x07\x07\x07\x07\0~~~}||{\0{{{{zzz\0zzzzz{{\0{||}}}~\0~~\0x\0\0\0\0\0}}}|||{z\0yyyxwvu\0ttsrrqp\0ppoooop\0qpppqsu\0uuttvy{\0|{yy|\0\`\0\b\v\v\b\x07\b\f\r\v\f\f\v\f\v		
\v\f
	\x07\b	
	\b\x07\x07\b\b\0\0\0\0~}||}||||\0{|||||}\0~~~\0@\0~~~~}}|{z\0zzyyxwv\0vvvutss\0sssrrrr\0ssssstv\0wwvvvy|\0}|zyz~@\0	w
		\r\v\v\r\r

\f\v	\x07\x07	
	\x07\x07\b\b\x07\0~~|\0{|||||{\0{{{||||\0|||}}}~\0~~~~\0\0\`\0\0\0\0\0\0\0\0o~}}}}\0||zzyyy\0yxwwvvv\0vuutttt\0ssrrrrr\0rssrrss\0tvvuuuw\0z{{zyz}\0\0\0\0o\x07	\b\b\v\r\v\v\f\r\v
\v\f\r\v	\x07\x07\b	\b\x07\x07\x07~\0}||}}||\0{{|||||\0||}}}~~\0\0\0\`\0\0\0\0\x07~~}}}\0}}|{{{{\0{{zyyxy\0yyxwwww\0wwvvuuu\0vvvvvvv\0vwwxyyy\0yy{}~~}\0|}\0|	\v
\b\x07	\f\f\v\f\r\v
\v\r\r\f
\b\b			\b\x07\x07\x07\0~}~~}}|||||\0|||||}}\0}}~~~\0~\0\0\0\0<~\0~~~~}}|\0||||||{\0{{{{{zz\0zzzzyyy\0yyyxxxx\0xxwvvvv\0wwvuuvw\0xxxwwwy\0{||{z{~\0\0\x07	\b\x07\b
\r\r\f


\f\r\r\v
		


\b\x07\x07\x07\b\x07\x07\0\0~~}}\0}}}||||\0||||||}\0}}}}}~~\0~~\0~~~~\0~}}||||\0|||||||\0|||||}}\0}||||}}\0|||{{{{\0zzyyyzz\0yxwwxyz\0zyxxy{~\0~}||~\`	
\b\b\v\f\v
\f\f\v
\v\f\r\v	\b\b	
	\b\x07\x07\x07\x07\x07\x07\0~}|||||{\0{zyzz{z\0zyyzz{{\0zzz{{|{\0|||}}}}\0}}~~}}}\0}}~}|||\0}}}}|||\0}~~}}}~\0~~~}}}}\0}}|{{{{\0zzyxwxx\0xxwvwwy\0z{zyyz}\0~||~@\0o\b\x07
\f\v\b\x07\x07
\f\r\v	\b\b
\v
\b\x07\b\b\x07\0\0?~~~~}|\0|{{{{zy\0yyyyxwx\0xxxxwxx\0xyxxxyz\0z{{{{{|\0}}}}}~~\0~~~~~\0\0\0B\0\0\0\0\0\0\0~}||\0||||zyy\0yzzzzyx\0yz{{||{\0||}\0\0\0p\0~\b\b\x07\x07\x07	\v\f\v\v\v\v\f\r\r\r\f\v\v\v\f\v\v

				\b\b\b\x07\0~~~\x07}}|{zzz\0yyyxxxx\0xxxxxxx\0yyyzzz{\0{{|}}~~\0~~\0\0\0x\0\0~}}}}\0}}|{{{{\0{zzyxxx\0xxxwxxx\0xxyzz{{\0{{|~\0~|\x07\x07\x07	\v\v\v

\v\f\r\f\f\v\v\v\v
	\b\b\x07\x07\0\0\0\0\0~}}}||{zzzy\0yxxwwww\0vvvvvvv\0vvwwxyy\0yyz{|}}\0}}~\0p\0\0\0\0\0?~~~~\0~}}}}}}\0||{{{{{\0{zzzzzz\0zyyz{{{\0zz{|}~}\0||~\0x\0\0	
	\b\x07\b\v\f\f\v

\v\f\f\v
\b\b\b\b\b\0\0\0\0~}}}}}|{zz{\0{{zyxyy\0zyxxxxy\0yyxxxyz\0{{{{|}~\0~\0\0x\0\0\0\0\0~~~~~~\0~}|||}|\0|{{z{{{\0{zzzz{{\0{zzz{{{\0{{{||}}\0||}\0\0\0p\0~\x07\0\0~}}}}\0}||{{{{\0{{{zzzz\0{{{zz{{\0{{{{|||\0||}}}}~\0~~\0\0\0p\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~~}\0}}~~~}}\0}}}}}}}\0}}}}}}}\0}}~~~~~\0~\0\0\0p\0\0\0\0\0\0\0\0\0\0~~~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~~~~\0~~~~}}}\0}~}}}|}\0}~~}}}}\0~~~~~~\0\0\0\`\0\0\0\0\0\0\0~~~~~~~\0}}~~~~~\0~~~~~~\0~~~~\0~~~~~~~\0~~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0~~~}}\0}}}}}}}\0}}}}}}}\0}~~}}}}\0}}}}|}}\0}}||||}\0}}|||}~\0~~}}~~\0\0@\0\0\0q\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0~~~~~~\0}}}}}}}\0}}}}}}}\0}}}}}}}\0}}}~~~~\0~~\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0~~~~~~~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0~~~~~~~\0~~~~~~~\0~~~}}}~\0}}}}}}}\0}}~~~~~\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\x07\0~~~~~~~\0~~~\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~}}}~\0~~~~~~~\0~~~~~~~\0}}}}}}}\0}}}}}}~\0~~~~\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\0\0\0\0\x07~\0~~~~~~~\0~~~~~~~\0~~~\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0p\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~~~~\0~~~\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0~\0~~~~~~~\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~\0~~\0\0\0~~~\0~~~~~~\0~~\0\0@\0\0@\0\0\0p\0\0\0\0\`\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0v\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0y\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0\0\0~\0~~~~~~~\0~~~~~~~\0~~\0\0 \0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0{\0\0\0\0\0\0\0\0\0\0\0\0\0D\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0~~\0~~~\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\0\0\0\0\0\0?\0\0\0\0~~~~~~\0~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~\0~~~~~~}\0}}}}}}}\0}}}}|}}\0|||||||\0|||||||\0|||||||\0||}}}}}\0}~~~~\0\0\0\0|\0\0\0?~~~~\0~~~~~~~\0~~~~\0~}~~}~}\0|}}|}}{\0||{{|{{\0|{{|z{|\0z{|{z{{\0{{{{||{\0|||}}}~\0~~~~~~~\0~\0\0\0x\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0~~~~}\0}}}|||{\0|{zzzyy\0yxxyxxy\0xxyyxyy\0yzzzzz{\0{||}}~~\0|\x07\0\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~\0~~}}}}|\0||{||{{\0|{{{{{z\0{zzzyyy\0xwwwwww\0vuvuuvv\0vvvwwwx\0xxxyzz{\0{||}~\0\0\x07\x07\x07\x07\x07\x07\b\x07\x07\x07\x07\x07\0\0\0\0\0\0\0\0\0\`\0\0\0d\0\0\0\0\0\0\0\0\0\0\x07~~~~~}\0}}}||||\0{{{zzzy\0yyxxxxw\0wwwwwww\0xwxyyyz\0z{{{|||\0}}~~\0\0\`\x07\x07\b				








			\b\b\b\b\b\b\x07\x07\x07\x07\x07\0\0\0\0~~~\0~~~}~~}\0~~}}~~}\0~~~~~\0~~~\0~~~}~~}\0}}}}}}}\0}||||{{\0{{{{{z{\0{zzzyzy\0xyywxxw\0wxvwxwx\0yxxzyy{\0{z|{|}}\0}~~\0\0\0p\x07\x07\b\b\b\b\b\b\b\b\b\b\x07\x07\0\0\0\0~\0\0\0\0\0\0|\0\0\0\x07\0\0\0\0\0\0\0{\0\0\0\0'~~\0~~}~}}}\0}|}||||\0{||{{|{\0z{{zzzy\0yyyxyyx\0xxxxyxy\0yyz{{{|\0||}}}~~\0\0\0|\x07\x07\b			



\v\v\v\v




			\b\b\x07\x07\x07\0\0\0\0\0?\0~~~~~}\0~~}}~}}\0~}}~~}~\0~~~~~\0\0\0\0d\0\0\0\0~~~\0~}}}}|}\0}||}||}\0|{||{{{\0zzzyyyx\0xxxxxxx\0yxyzz{{\0{|||}}}\0}~~~\0@\0\0\0\x07\x07\x07\x07\b\b\b\x07\x07\x07\x07\x07\x07\0\0\0\0\0~~~~\0}~~|}~|\0|~|{}|{\0||{|}{|\0||}}}~~\0}~~~\0 ~~\0~ \0~\0~\0~~\0~~\0I~}~}~~\0|}}|}}|\0}|{||{{\0{z{{yzz\0yzzz{|{\0{||}~}~\0~~\0@\0\0\x07\x07\b\b				




				\b\b\x07\x07\0\0\0\0~~~~}~~}}\0~}~~}}~\0~}~~}~~\0}~~~\0 \0\0\0~\0\0\0\0\0?~~|~~{\0}~{|~|{\0}|{|{||\0{{|zz{z\0yzzxyyy\0yyyzyyz\0zz{|{||\0|||}}}}\0~~~~\0\0\0p\b\b\b\b						\b\b\b\x07\x07\x07\0\0\0\0?~~~~\0~}}}}}}\0||||{||\0{{{{{|{\0{|{{|{{\0}{{}}{}\0}|~~\0@\0\0\0\0\0\0~\0/}~{~~y\0~}z}}{}\0~||~|}~\0z}~z|}z\0{}zy|zy\0{yy{yz{\0z{|||}}\0}~~\0\0P\0\0\0\x07\b	\b			
				\b\b	\x07\x07\x07\0\0\0\0\0\07\0~~~~\0}}}}}}|\0|}|}}|}\0~}~~~\0\0\0\0|_\0~\0}~{~{~|\0~}}}}\0\0|}\0{}	{{~{z}{\0y}{y|zy\0|{z{{z{\0||}}}~\0~\0\0\0b\0\x07\x07\x07\x07\x07\0\0\0\0\0~~}}~\0}}}||}|\0|}||}}|\0|}|{||{\0{{zz{{{\0{||||}}\0}}}~~~\0\0\0\0~\0\0\0\0\0\x1B~~}~~|\0}~}}~}|\0}}~}|~~\0{}~{|}{\0{}zz}yy\0}yy|yxz\0{y{{z|{\0|~|}}}\0~\0@\0\0\0\0\0\0\0\0\0\0\0o\0~}\0%}~~\0\0~\0~Z\0\0\0~~M~\0l~}\0}6\0}|}~{}}y||\0xzzxxzy\0x{yy{z|\0}|}~}}~\0~~\0\0\0\0\0\0\0{\0\0\0\0\0\0\0\`\0~~~~}~}\0}}~}|~~\0}~~\0 \0\0\0\0\0\0~?~\0~}\0}|}{}}{|~{|}\0{}}{||{\0{|z{|yz\0{xz{wxz\0xwywwyw\0vxxxyyy\0zzz{|{}\0||}}}~}\0}~\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0o\0\0\0\0\0\0\0\0_~~\0~~	}}~|\0||~\0} }}|~}|\0}|}||}|\0{|{{{zz\0|zx{{x{\0|y{{{|}\0{}~|}}\0~}~~~\0\0\0\0l\0\0\0\0\0\x07\0 \0\0\0\0\0\0~\0\0\0\0\0\0\0~~~~~}}}}}\0}}~~~~\0~\0\0\04\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\x1B\0~~}\0|\0\0d|~}~|\0}{}{|\0~{|}{{}\0{y|{z{y\0z{yy{yy\0{zy|{z}\0||~}}~~\0}~}~}\0~\0@\x07\x07\0\0\0~~~~}}}~~\0~~~~~\0@\0\0~\0\0\0[\0\0\0\0}~\0~~~}}}}||\0||{{|{y\0{zy{zyz\0zyz{z{|\0{{}|}~}\0}~~}~}}\0~}}~~~\0\0|\x07\x07\x07\x07\b\b\x07\x07\x07\0\0\0\0	~\0~~~~~}~\0~}}~||}\0|{||{||\0||}}}}~\0~~\0@\0\0\0\0|\0\0\0o\0~~~~~~\0~~~~\0}}~}\0}~}||}|\0{||z{|z\0{|{z{{{\0{{{|z{|\0{{}||}}\0|~~}~~\0\0\0\`\0\0\x07\x07\x07\x07\x07\b\x07\x07\x07\x07\0\0\0\0\0\0\0\0\0?\0\0\0~~~~~\0~~~~~\0\0\0\0\0\0\0\0\0\0\0\x1B\0\0I\0\0\0\0\0\0}~~~}\0}}||}|{\0||{||{|\0|{|}{|}\0|||||||\0|||}}}~\0~~\0\0\0p\0\0\0?~~~\0~~~~~~}\0~~~~}}~\0~}~~~~~\0~~~~}}}\0}}}}~}~\0~~~\0@\0\0\0\0\0\0\0\0~~~~\0~~~~~~~\0}~~~~\0~~~~\0~~~}~}}\0}||}||}\0}|}}|}}\0}}}}}~~\0~~~~\0~\0\0\0\0\`\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?~~\0~~~\0~~~\0~~~~\0~~~~~}}\0~~~~~~~\0~~\0 \0~~~~}~\0~}}}}}}\0}}}}~~}\0~~~~~~~\0~~~~~~~\0~~~~~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~\0}~}}~~}\0~~~~~\0\0@\0\b\0~\0~~\0\0\0$\0~\0$~~~~\0~~~~~~~\0\0~~\0~~~~~~\0~~}}}}}\0}}}}}}}\0}}}}}~~\0}}~~~~~\0~~~\0\0\0\0\0~\0\0\0\0\0\0\0\0[\0\0\0\0\0m\0\0\0\0~~\0~\0\0\0\0X\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0I\0\0I\0\0\0\0\0\0\0\0\0\0\0\x1B\0~~~~~\0~~~\0~~}}~}|\0}}||}{|\0}|}}|}~\0}}}~~\0~~~~\0~~\0~~\0\0\0\0\0\0v\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0/\0~\0\0\0~~~\0\0@\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0O\0~~~~\0~~~\0\0 \0\0\0\0\0v\0\0\0\0\0v\0\0\0\0\0m\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0o\0\0\0\0\0\0\0\0\0\0\0\0>\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~\0~~~~~\0~~~\0~~~~~~~\0~~~~~~~\0~~~~\0~\0\0~~~~~~\0~~~~~\0\0\0\0\0\0\0\0l\0\0\0\0\0\0\0\0\0\0?\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\07\0\0\0\0\0\0w\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\0\0\0\0\0\0@\0\0\0\0M\0\0\08\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~\0~~~~}}~\0~}}}}}}\0}}}~~~~\0~~~~~~~\0~~~\0\0\0~~\0~~\0\0\0\0\0x\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~}}}~~\0~~~~~~~\0~~~~~~~\0~~~~~}}\0}}}}}}}\0}}}}}}}\0}}}}}}~\0~~~~~~~\0~~~\0~~~\0\0\0\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0A\0\0\0\0\0\0o\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0|\0\0\0\0\0g\0\0\0\0@\0\0\0\0\0\0\0\0\0\0\0M\0\0\0\0\0\0\0\0\0~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~\0~~\0~~~~~~~\0\0\0\0~~~~~~\0~~\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0f\0\0\0\0\0\0\0\`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0\0\0\`\0\0\0\0\0\0?\0\0\0\0\0\0\0~\0\0\0~~~\0~~~~\0\0\0~~~~\0\0\0\0\0p\0\0\0\0\0\0\0\0\0\0\x07\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?\0\0\`\0\0\0\0\0\0~\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0~~\0~~~~~~~\0~~~~~\0\0~~~~~\0~~~~~~~\0~~~~~\0~~~~~\0~~~~~~~\0~}}}}}}\0}}}}}}}\0~~~~~~~\0~~~~~~~\0~~~~~~~\0~\0~~\0\0\0\0\0\0`);

// https://deno.land/x/animalese@1.0.1.0/animalese.js
var FastBase64 = {
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encLookup: [],
  Init: function() {
    for (var i = 0; i < 4096; i++) {
      this.encLookup[i] = this.chars[i >> 6] + this.chars[i & 63];
    }
  },
  Encode: function(src) {
    var len = src.length;
    var dst = "";
    var i = 0;
    while (len > 2) {
      const n = src[i] << 16 | src[i + 1] << 8 | src[i + 2];
      dst += this.encLookup[n >> 12] + this.encLookup[n & 4095];
      len -= 3;
      i += 3;
    }
    if (len > 0) {
      var n1 = (src[i] & 252) >> 2;
      var n2 = (src[i] & 3) << 4;
      if (len > 1) n2 |= (src[++i] & 240) >> 4;
      dst += this.chars[n1];
      dst += this.chars[n2];
      if (len == 2) {
        var n3 = (src[i++] & 15) << 2;
        n3 |= (src[i] & 192) >> 6;
        dst += this.chars[n3];
      }
      if (len == 1) dst += "=";
      dst += "=";
    }
    return dst;
  }
  // end Encode
};
FastBase64.Init();
var RIFFWAVE = function(data) {
  this.data = [];
  this.wav = [];
  this.dataURI = "";
  this.header = {
    // OFFS SIZE NOTES
    chunkId: [82, 73, 70, 70],
    // 0    4    "RIFF" = 0x52494646
    chunkSize: 0,
    // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
    format: [87, 65, 86, 69],
    // 8    4    "WAVE" = 0x57415645
    subChunk1Id: [102, 109, 116, 32],
    // 12   4    "fmt " = 0x666d7420
    subChunk1Size: 16,
    // 16   4    16 for PCM
    audioFormat: 1,
    // 20   2    PCM = 1
    numChannels: 1,
    // 22   2    Mono = 1, Stereo = 2...
    sampleRate: 8e3,
    // 24   4    8000, 44100...
    byteRate: 0,
    // 28   4    SampleRate*NumChannels*BitsPerSample/8
    blockAlign: 0,
    // 32   2    NumChannels*BitsPerSample/8
    bitsPerSample: 8,
    // 34   2    8 bits = 8, 16 bits = 16
    subChunk2Id: [100, 97, 116, 97],
    // 36   4    "data" = 0x64617461
    subChunk2Size: 0
    // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
  };
  function u32ToArray(i) {
    return [i & 255, i >> 8 & 255, i >> 16 & 255, i >> 24 & 255];
  }
  function u16ToArray(i) {
    return [i & 255, i >> 8 & 255];
  }
  function split16bitArray(data2) {
    var r2 = [];
    var j = 0;
    var len = data2.length;
    for (var i = 0; i < len; i++) {
      r2[j++] = data2[i] & 255;
      r2[j++] = data2[i] >> 8 & 255;
    }
    return r2;
  }
  this.Make = function(data2) {
    if (data2 instanceof Array) this.data = data2;
    this.header.blockAlign = this.header.numChannels * this.header.bitsPerSample >> 3;
    this.header.byteRate = this.header.blockAlign * this.sampleRate;
    this.header.subChunk2Size = this.data.length * (this.header.bitsPerSample >> 3);
    this.header.chunkSize = 36 + this.header.subChunk2Size;
    this.wav = this.header.chunkId.concat(
      u32ToArray(this.header.chunkSize),
      this.header.format,
      this.header.subChunk1Id,
      u32ToArray(this.header.subChunk1Size),
      u16ToArray(this.header.audioFormat),
      u16ToArray(this.header.numChannels),
      u32ToArray(this.header.sampleRate),
      u32ToArray(this.header.byteRate),
      u16ToArray(this.header.blockAlign),
      u16ToArray(this.header.bitsPerSample),
      this.header.subChunk2Id,
      u32ToArray(this.header.subChunk2Size),
      this.header.bitsPerSample == 16 ? split16bitArray(this.data) : this.data
    );
    this.dataURI = "data:audio/wav;base64," + FastBase64.Encode(this.wav);
  };
  if (data instanceof Array) this.Make(data);
};
function animalese(script, shorten = false, pitch = 1) {
  function shortenWord(str) {
    if (str.length > 1) {
      return str[0] + str[str.length - 1];
    }
    return str;
  }
  var processed_script = script;
  if (shorten) {
    processed_script = script.replace(/[^a-z]/gi, " ").split(" ").map(shortenWord).join("");
  }
  var data = [];
  var sample_freq = 44100;
  var library_letter_secs = 0.15;
  var library_samples_per_letter = Math.floor(library_letter_secs * sample_freq);
  var output_letter_secs = 0.075;
  var output_samples_per_letter = Math.floor(output_letter_secs * sample_freq);
  for (var c_index = 0; c_index < processed_script.length; c_index++) {
    var c = processed_script.toUpperCase()[c_index];
    if (c >= "A" && c <= "Z") {
      var library_letter_start = library_samples_per_letter * (c.charCodeAt(0) - "A".charCodeAt(0));
      for (var i = 0; i < output_samples_per_letter; i++) {
        data[c_index * output_samples_per_letter + i] = animalese_wav_binaryified_default[44 + library_letter_start + Math.floor(i * pitch)];
      }
    } else {
      for (var i = 0; i < output_samples_per_letter; i++) {
        data[c_index * output_samples_per_letter + i] = 127;
      }
    }
  }
  var wave = new RIFFWAVE();
  wave.header.sampleRate = sample_freq;
  wave.header.numChannels = 1;
  wave.Make(data);
  return wave;
}
function playSound(text, options) {
  const { shorten, pitch } = { shorten: false, pitch: 1, ...options };
  const audio = new Audio();
  audio.src = animalese(text, shorten, pitch).dataURI;
  return audio.play();
}

// https://deno.land/x/binaryify@0.0.7/tools.js
function getBit(n, bit) {
  return n >> bit & 1;
}
function setBit(n, bit, value = 1) {
  if (value) {
    return n | 1 << bit;
  } else {
    return ~(~n | 1 << bit);
  }
}
var concatUint8Arrays = (arrays) => new Uint8Array(
  // simplified from: https://stackoverflow.com/questions/49129643/how-do-i-merge-an-array-of-uint8arrays
  arrays.reduce((acc, curr) => (acc.push(...curr), acc), [])
);
function eightToSeven2(eightBytes) {
  const seven = 7;
  const sevenBytes = eightBytes.slice(0, seven);
  const finalByte = eightBytes[seven];
  const newBytes = new Uint8Array(new ArrayBuffer(seven));
  let index = -1;
  for (const each of sevenBytes) {
    index++;
    newBytes[index] = each;
    if (getBit(finalByte, index)) {
      newBytes[index] = setBit(newBytes[index], seven);
    }
  }
  return newBytes;
}
function stringToBytes2(string) {
  const charCount = string.length;
  const buf = new ArrayBuffer(charCount);
  const asciiNumbers = new Uint8Array(buf);
  for (var i = 0; i < charCount; i++) {
    asciiNumbers[i] = string.charCodeAt(i);
  }
  const chunksOfEight = asciiNumbers.slice(0, -1);
  let sliceEnd = -asciiNumbers.slice(-1)[0];
  const eight = 8;
  const numberOfBlocks = Math.ceil(chunksOfEight.length / eight);
  const arrays = [];
  for (let index in [...Array(numberOfBlocks)]) {
    index -= 0;
    arrays.push(
      eightToSeven2(
        chunksOfEight.slice(index * eight, (index + 1) * eight)
      )
    );
  }
  const array = concatUint8Arrays(arrays);
  if (sliceEnd == 0) {
    sliceEnd = array.length;
  }
  return array.slice(0, sliceEnd);
}

// face_server/helpers/rive.js
var module = { exports: {} };
var exports = {};
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd)
    define([], factory);
  else if (typeof exports === "object")
    exports["rive"] = factory();
  else
    root["rive"] = factory();
})(void 0, function() {
  return (
    /******/
    (() => {
      "use strict";
      var __webpack_modules__ = [
        ,
        /* 1 */
        /***/
        (__unused_webpack___webpack_module__, __webpack_exports__2, __webpack_require__2) => {
          __webpack_require__2.r(__webpack_exports__2);
          __webpack_require__2.d(__webpack_exports__2, {
            /* harmony export */
            "default": () => __WEBPACK_DEFAULT_EXPORT__
            /* harmony export */
          });
          var Rive = (() => {
            var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
            return function(Rive2) {
              Rive2 = Rive2 || {};
              null;
              var m;
              m || (m = typeof Rive2 !== "undefined" ? Rive2 : {});
              var aa, ba;
              m.ready = new Promise(function(b, a) {
                aa = b;
                ba = a;
              });
              function ca() {
                function b(h) {
                  const g = d;
                  c = a = 0;
                  d = /* @__PURE__ */ new Map();
                  g.forEach((l) => {
                    try {
                      l(h);
                    } catch (k) {
                      console.error(k);
                    }
                  });
                  this.La();
                  e2 && e2.fb();
                }
                let a = 0, c = 0, d = /* @__PURE__ */ new Map(), e2 = null, f = null;
                this.requestAnimationFrame = function(h) {
                  a || (a = requestAnimationFrame(b.bind(this)));
                  const g = ++c;
                  d.set(g, h);
                  return g;
                };
                this.cancelAnimationFrame = function(h) {
                  d.delete(h);
                  a && 0 == d.size && (cancelAnimationFrame(a), a = 0);
                };
                this.cb = function(h) {
                  f && (document.body.remove(f), f = null);
                  h || (f = document.createElement("div"), f.style.backgroundColor = "black", f.style.position = "fixed", f.style.right = 0, f.style.top = 0, f.style.color = "white", f.style.padding = "4px", f.innerHTML = "RIVE FPS", h = function(g) {
                    f.innerHTML = "RIVE FPS " + g.toFixed(1);
                  }, document.body.appendChild(f));
                  e2 = new function() {
                    let g = 0, l = 0;
                    this.fb = function() {
                      var k = performance.now();
                      l ? (++g, k -= l, 1e3 < k && (h(1e3 * g / k), g = l = 0)) : (l = k, g = 0);
                    };
                  }();
                };
                this.$a = function() {
                  f && (document.body.remove(f), f = null);
                  e2 = null;
                };
                this.La = function() {
                };
              }
              function ea(b) {
                console.assert(true);
                const a = /* @__PURE__ */ new Map();
                let c = -Infinity;
                this.push = function(d) {
                  d = d + ((1 << b) - 1) >> b;
                  a.has(d) && clearTimeout(a.get(d));
                  a.set(d, setTimeout(function() {
                    a.delete(d);
                    0 == a.length ? c = -Infinity : d == c && (c = Math.max(...a.keys()), console.assert(c < d));
                  }, 1e3));
                  c = Math.max(d, c);
                  return c << b;
                };
              }
              const fa = new function() {
                function b() {
                  if (!a) {
                    let E = function(I, w, z) {
                      w = q.createShader(w);
                      q.shaderSource(w, z);
                      q.compileShader(w);
                      z = q.getShaderInfoLog(w);
                      if (0 < z.length) throw z;
                      q.attachShader(I, w);
                    };
                    var t2 = document.createElement("canvas"), v = { alpha: 1, depth: 0, stencil: 0, antialias: 0, premultipliedAlpha: 1, preserveDrawingBuffer: 0, preferLowPowerToHighPerformance: 0, failIfMajorPerformanceCaveat: 0, enableExtensionsByDefault: 1, explicitSwapControl: 1, renderViaOffscreenBackBuffer: 1 };
                    let q = t2.getContext("webgl2", v);
                    if (q) c = 2;
                    else if (q = t2.getContext("webgl", v)) c = 1;
                    else return console.log("No WebGL support. Image mesh will not be drawn."), false;
                    d = Math.min(
                      q.getParameter(q.MAX_RENDERBUFFER_SIZE),
                      q.getParameter(q.MAX_TEXTURE_SIZE)
                    );
                    t2 = q.createProgram();
                    E(t2, q.VERTEX_SHADER, "attribute vec2 vertex;\n                attribute vec2 uv;\n                uniform vec4 mat;\n                uniform vec2 translate;\n                varying vec2 st;\n                void main() {\n                    st = uv;\n                    gl_Position = vec4(mat2(mat) * vertex + translate, 0, 1);\n                }");
                    E(t2, q.FRAGMENT_SHADER, "precision highp float;\n                uniform sampler2D image;\n                varying vec2 st;\n                void main() {\n                    gl_FragColor = texture2D(image, st);\n                }");
                    q.bindAttribLocation(t2, 0, "vertex");
                    q.bindAttribLocation(t2, 1, "uv");
                    q.linkProgram(t2);
                    v = q.getProgramInfoLog(t2);
                    if (0 < v.length) throw v;
                    e2 = q.getUniformLocation(t2, "mat");
                    f = q.getUniformLocation(t2, "translate");
                    q.useProgram(t2);
                    q.bindBuffer(q.ARRAY_BUFFER, q.createBuffer());
                    q.enableVertexAttribArray(0);
                    q.enableVertexAttribArray(1);
                    q.bindBuffer(q.ELEMENT_ARRAY_BUFFER, q.createBuffer());
                    q.uniform1i(q.getUniformLocation(t2, "image"), 0);
                    q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
                    a = q;
                  }
                  return true;
                }
                let a = null, c = 0, d = 0, e2 = null, f = null, h = 0, g = 0;
                this.ob = function() {
                  b();
                  return d;
                };
                this.Ya = function(t2) {
                  if (!b()) return null;
                  const v = a.createTexture();
                  a.bindTexture(a.TEXTURE_2D, v);
                  a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, t2);
                  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
                  a.texParameteri(
                    a.TEXTURE_2D,
                    a.TEXTURE_WRAP_T,
                    a.CLAMP_TO_EDGE
                  );
                  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
                  2 == c ? (a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR_MIPMAP_LINEAR), a.generateMipmap(a.TEXTURE_2D)) : a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
                  return v;
                };
                const l = new ea(8), k = new ea(8), p2 = new ea(10), r2 = new ea(10);
                this.bb = function(t2, v, q, E, I) {
                  if (b()) {
                    var w = l.push(t2), z = k.push(v);
                    if (a.canvas.width != w || a.canvas.height != z) a.canvas.width = w, a.canvas.height = z;
                    a.viewport(0, z - v, t2, v);
                    a.disable(a.SCISSOR_TEST);
                    a.clearColor(0, 0, 0, 0);
                    a.clear(a.COLOR_BUFFER_BIT);
                    a.enable(a.SCISSOR_TEST);
                    q.sort((y, da) => da.Oa - y.Oa);
                    w = p2.push(E);
                    h != w && (a.bufferData(a.ARRAY_BUFFER, 8 * w, a.DYNAMIC_DRAW), h = w);
                    w = 0;
                    for (var J of q) a.bufferSubData(a.ARRAY_BUFFER, w, J.Aa), w += 4 * J.Aa.length;
                    console.assert(w == 4 * E);
                    for (var P of q) a.bufferSubData(a.ARRAY_BUFFER, w, P.Ra), w += 4 * P.Ra.length;
                    console.assert(w == 8 * E);
                    w = r2.push(I);
                    g != w && (a.bufferData(a.ELEMENT_ARRAY_BUFFER, 2 * w, a.DYNAMIC_DRAW), g = w);
                    J = 0;
                    for (var X of q) a.bufferSubData(
                      a.ELEMENT_ARRAY_BUFFER,
                      J,
                      X.indices
                    ), J += 2 * X.indices.length;
                    console.assert(J == 2 * I);
                    X = 0;
                    P = true;
                    w = J = 0;
                    for (const y of q) {
                      y.image.va != X && (a.bindTexture(a.TEXTURE_2D, y.image.Va || null), X = y.image.va);
                      y.rb ? (a.scissor(y.Ea, z - y.Fa - y.Ka, y.yb, y.Ka), P = true) : P && (a.scissor(0, z - v, t2, v), P = false);
                      q = 2 / t2;
                      const da = -2 / v;
                      a.uniform4f(e2, y.la[0] * q * y.ra, y.la[1] * da * y.sa, y.la[2] * q * y.ra, y.la[3] * da * y.sa);
                      a.uniform2f(f, y.la[4] * q * y.ra + q * (y.Ea - y.pb * y.ra) - 1, y.la[5] * da * y.sa + da * (y.Fa - y.qb * y.sa) + 1);
                      a.vertexAttribPointer(0, 2, a.FLOAT, false, 0, w);
                      a.vertexAttribPointer(
                        1,
                        2,
                        a.FLOAT,
                        false,
                        0,
                        w + 4 * E
                      );
                      a.drawElements(a.TRIANGLES, y.indices.length, a.UNSIGNED_SHORT, J);
                      w += 4 * y.Aa.length;
                      J += 2 * y.indices.length;
                    }
                    console.assert(w == 4 * E);
                    console.assert(J == 2 * I);
                  }
                };
                this.canvas = function() {
                  return b() && a.canvas;
                };
              }();
              Rive2.onRuntimeInitialized = function() {
                function b(n) {
                  switch (n) {
                    case k.srcOver:
                      return "source-over";
                    case k.screen:
                      return "screen";
                    case k.overlay:
                      return "overlay";
                    case k.darken:
                      return "darken";
                    case k.lighten:
                      return "lighten";
                    case k.colorDodge:
                      return "color-dodge";
                    case k.colorBurn:
                      return "color-burn";
                    case k.hardLight:
                      return "hard-light";
                    case k.softLight:
                      return "soft-light";
                    case k.difference:
                      return "difference";
                    case k.exclusion:
                      return "exclusion";
                    case k.multiply:
                      return "multiply";
                    case k.hue:
                      return "hue";
                    case k.saturation:
                      return "saturation";
                    case k.color:
                      return "color";
                    case k.luminosity:
                      return "luminosity";
                  }
                }
                function a(n) {
                  return "rgba(" + ((16711680 & n) >>> 16) + "," + ((65280 & n) >>> 8) + "," + ((255 & n) >>> 0) + "," + ((4278190080 & n) >>> 24) / 255 + ")";
                }
                function c() {
                  0 < J.length && (fa.bb(z.drawWidth(), z.drawHeight(), J, P, X), J = [], X = P = 0, z.reset(512, 512));
                  for (const n of w) {
                    for (const u of n.da) u();
                    n.da = [];
                  }
                  w.clear();
                }
                var d = Rive2.RenderPaintStyle;
                const e2 = Rive2.RenderPath, f = Rive2.RenderPaint, h = Rive2.Renderer, g = Rive2.StrokeCap, l = Rive2.StrokeJoin, k = Rive2.BlendMode, p2 = d.fill, r2 = d.stroke, t2 = Rive2.FillRule.evenOdd;
                let v = 1;
                var q = Rive2.RenderImage.extend("CanvasRenderImage", { __construct: function() {
                  this.__parent.__construct.call(this);
                  this.va = v;
                  v = v + 1 & 2147483647 || 1;
                }, decode: function(n) {
                  let u = Xa;
                  u.total++;
                  var F = this, B = new Image();
                  B.src = URL.createObjectURL(new Blob([n], { type: "image/png" }));
                  B.onload = function() {
                    F.Ta = B;
                    F.Va = fa.Ya(B);
                    F.size(B.width, B.height);
                    u.loaded++;
                    if (u.loaded === u.total) {
                      const D = u.ready;
                      D && (D(), u.ready = null);
                    }
                  };
                } }), E = e2.extend("CanvasRenderPath", { __construct: function() {
                  this.__parent.__construct.call(this);
                  this.ga = new Path2D();
                }, reset: function() {
                  this.ga = new Path2D();
                }, addPath: function(n, u, F, B, D, G, A) {
                  var C = this.ga, R = C.addPath;
                  n = n.ga;
                  const K = new DOMMatrix();
                  K.a = u;
                  K.b = F;
                  K.c = B;
                  K.d = D;
                  K.e = G;
                  K.f = A;
                  R.call(C, n, K);
                }, fillRule: function(n) {
                  this.Ca = n;
                }, moveTo: function(n, u) {
                  this.ga.moveTo(n, u);
                }, lineTo: function(n, u) {
                  this.ga.lineTo(n, u);
                }, cubicTo: function(n, u, F, B, D, G) {
                  this.ga.bezierCurveTo(n, u, F, B, D, G);
                }, close: function() {
                  this.ga.closePath();
                } }), I = f.extend("CanvasRenderPaint", { color: function(n) {
                  this.Da = a(n);
                }, thickness: function(n) {
                  this.Wa = n;
                }, join: function(n) {
                  switch (n) {
                    case l.miter:
                      this.ua = "miter";
                      break;
                    case l.round:
                      this.ua = "round";
                      break;
                    case l.bevel:
                      this.ua = "bevel";
                  }
                }, cap: function(n) {
                  switch (n) {
                    case g.butt:
                      this.ta = "butt";
                      break;
                    case g.round:
                      this.ta = "round";
                      break;
                    case g.square:
                      this.ta = "square";
                  }
                }, style: function(n) {
                  this.Ua = n;
                }, blendMode: function(n) {
                  this.Sa = b(n);
                }, linearGradient: function(n, u, F, B) {
                  this.oa = { Pa: n, Qa: u, Ha: F, Ia: B, za: [] };
                }, radialGradient: function(n, u, F, B) {
                  this.oa = { Pa: n, Qa: u, Ha: F, Ia: B, za: [], mb: true };
                }, addStop: function(n, u) {
                  this.oa.za.push({
                    color: n,
                    stop: u
                  });
                }, completeGradient: function() {
                }, draw: function(n, u, F) {
                  let B = this.Ua;
                  var D = this.Da, G = this.oa;
                  n.globalCompositeOperation = this.Sa;
                  if (null != G) {
                    D = G.Pa;
                    var A = G.Qa;
                    const R = G.Ha;
                    var C = G.Ia;
                    const K = G.za;
                    G.mb ? (G = R - D, C -= A, D = n.createRadialGradient(D, A, 0, D, A, Math.sqrt(G * G + C * C))) : D = n.createLinearGradient(D, A, R, C);
                    for (let U = 0, L = K.length; U < L; U++) A = K[U], D.addColorStop(A.stop, a(A.color));
                    this.Da = D;
                    this.oa = null;
                  }
                  switch (B) {
                    case r2:
                      n.strokeStyle = D;
                      n.lineWidth = this.Wa;
                      n.lineCap = this.ta;
                      n.lineJoin = this.ua;
                      n.stroke(u);
                      break;
                    case p2:
                      n.fillStyle = D, n.fill(u, F);
                  }
                } });
                const w = /* @__PURE__ */ new Set();
                let z = null, J = [], P = 0, X = 0;
                var y = Rive2.CanvasRenderer = h.extend("Renderer", {
                  __construct: function(n) {
                    this.__parent.__construct.call(this);
                    this.fa = [1, 0, 0, 1, 0, 0];
                    this.Z = n.getContext("2d");
                    this.Ba = n;
                    this.da = [];
                  },
                  save: function() {
                    this.fa.push(...this.fa.slice(this.fa.length - 6));
                    this.da.push(this.Z.save.bind(this.Z));
                  },
                  restore: function() {
                    const n = this.fa.length - 6;
                    if (6 > n) throw "restore() called without matching save().";
                    this.fa.splice(n);
                    this.da.push(this.Z.restore.bind(this.Z));
                  },
                  transform: function(n, u, F, B, D, G) {
                    const A = this.fa, C = A.length - 6;
                    A.splice(C, 6, A[C] * n + A[C + 2] * u, A[C + 1] * n + A[C + 3] * u, A[C] * F + A[C + 2] * B, A[C + 1] * F + A[C + 3] * B, A[C] * D + A[C + 2] * G + A[C + 4], A[C + 1] * D + A[C + 3] * G + A[C + 5]);
                    this.da.push(this.Z.transform.bind(this.Z, n, u, F, B, D, G));
                  },
                  rotate: function(n) {
                    const u = Math.sin(n);
                    n = Math.cos(n);
                    this.transform(n, u, -u, n, 0, 0);
                  },
                  _drawPath: function(n, u) {
                    this.da.push(u.draw.bind(u, this.Z, n.ga, n.Ca === t2 ? "evenodd" : "nonzero"));
                  },
                  _drawImage: function(n, u, F) {
                    var B = n.Ta;
                    if (B) {
                      var D = this.Z, G = b(u);
                      this.da.push(function() {
                        D.globalCompositeOperation = G;
                        D.globalAlpha = F;
                        D.drawImage(B, 0, 0);
                        D.globalAlpha = 1;
                      });
                    }
                  },
                  _getMatrix: function(n) {
                    const u = this.fa, F = u.length - 6;
                    for (let B = 0; 6 > B; ++B) n[B] = u[F + B];
                  },
                  _drawImageMesh: function(n, u, F, B, D, G, A, C, R, K) {
                    var U = this.Z.canvas.width, L = this.Z.canvas.height;
                    const pb = R - A, qb = K - C;
                    A = Math.max(A, 0);
                    C = Math.max(C, 0);
                    R = Math.min(R, U);
                    K = Math.min(K, L);
                    const sa = R - A, ta = K - C;
                    console.assert(sa <= Math.min(pb, U));
                    console.assert(ta <= Math.min(qb, L));
                    if (!(0 >= sa || 0 >= ta)) {
                      R = sa < pb || ta < qb;
                      U = K = 1;
                      var ia = Math.ceil(sa * K), ja = Math.ceil(ta * U);
                      L = fa.ob();
                      ia > L && (K *= L / ia, ia = L);
                      ja > L && (U *= L / ja, ja = L);
                      z || (z = new m.DynamicRectanizer(L), z.reset(512, 512));
                      L = z.addRect(ia, ja);
                      0 > L && (c(), w.add(this), L = z.addRect(ia, ja), console.assert(0 <= L));
                      var rb = L & 65535, sb = L >> 16;
                      J.push({ la: this.fa.slice(this.fa.length - 6), image: n, Ea: rb, Fa: sb, pb: A, qb: C, yb: ia, Ka: ja, ra: K, sa: U, Aa: new Float32Array(B), Ra: new Float32Array(D), indices: new Uint16Array(G), rb: R, Oa: n.va << 1 | (R ? 1 : 0) });
                      P += B.length;
                      X += G.length;
                      var na = this.Z, Yb = b(u);
                      this.da.push(function() {
                        na.save();
                        na.resetTransform();
                        na.globalCompositeOperation = Yb;
                        na.globalAlpha = F;
                        na.drawImage(fa.canvas(), rb, sb, ia, ja, A, C, sa, ta);
                        na.restore();
                      });
                    }
                  },
                  _clipPath: function(n) {
                    this.da.push(this.Z.clip.bind(this.Z, n.ga, n.Ca === t2 ? "evenodd" : "nonzero"));
                  },
                  clear: function() {
                    w.add(this);
                    this.da.push(this.Z.clearRect.bind(this.Z, 0, 0, this.Ba.width, this.Ba.height));
                  },
                  flush: function() {
                  },
                  translate: function(n, u) {
                    this.transform(1, 0, 0, 1, n, u);
                  }
                });
                Rive2.makeRenderer = function(n) {
                  return new y(n);
                };
                Rive2.renderFactory = {
                  makeRenderPaint: function() {
                    return new I();
                  },
                  makeRenderPath: function() {
                    return new E();
                  },
                  makeRenderImage: function() {
                    return new q();
                  }
                };
                let da = Rive2.load, Xa = null;
                Rive2.load = function(n) {
                  return new Promise(function(u) {
                    let F = null;
                    Xa = { total: 0, loaded: 0, ready: function() {
                      u(F);
                    } };
                    F = da(n);
                    0 == Xa.total && u(F);
                  });
                };
                d = new ca();
                Rive2.requestAnimationFrame = d.requestAnimationFrame.bind(d);
                Rive2.cancelAnimationFrame = d.cancelAnimationFrame.bind(d);
                Rive2.enableFPSCounter = d.cb.bind(d);
                Rive2.disableFPSCounter = d.$a;
                d.La = c;
                Rive2.cleanup = function() {
                  z && z.delete();
                };
              };
              var ha = Object.assign({}, m), ka = "object" == typeof window, la = "function" == typeof importScripts, x = "", ma, oa;
              if (ka || la) la ? x = self.location.href : "undefined" != typeof document && document.currentScript && (x = document.currentScript.src), _scriptDir && (x = _scriptDir), 0 !== x.indexOf("blob:") ? x = x.substr(0, x.replace(/[?#].*/, "").lastIndexOf("/") + 1) : x = "", la && (oa = (b) => {
                var a = new XMLHttpRequest();
                a.open("GET", b, false);
                a.responseType = "arraybuffer";
                a.send(null);
                return new Uint8Array(a.response);
              }), ma = (b, a, c) => {
                var d = new XMLHttpRequest();
                d.open("GET", b, true);
                d.responseType = "arraybuffer";
                d.onload = () => {
                  200 == d.status || 0 == d.status && d.response ? a(d.response) : c();
                };
                d.onerror = c;
                d.send(null);
              };
              var pa = m.print || console.log.bind(console), qa = m.printErr || console.warn.bind(console);
              Object.assign(m, ha);
              ha = null;
              var ra;
              m.wasmBinary && (ra = m.wasmBinary);
              var noExitRuntime = m.noExitRuntime || true;
              "object" != typeof WebAssembly && ua("no native wasm support detected");
              var va, wa = false, xa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
              function ya(b, a, c) {
                var d = a + c;
                for (c = a; b[c] && !(c >= d); ) ++c;
                if (16 < c - a && b.buffer && xa) return xa.decode(b.subarray(a, c));
                for (d = ""; a < c; ) {
                  var e2 = b[a++];
                  if (e2 & 128) {
                    var f = b[a++] & 63;
                    if (192 == (e2 & 224)) d += String.fromCharCode((e2 & 31) << 6 | f);
                    else {
                      var h = b[a++] & 63;
                      e2 = 224 == (e2 & 240) ? (e2 & 15) << 12 | f << 6 | h : (e2 & 7) << 18 | f << 12 | h << 6 | b[a++] & 63;
                      65536 > e2 ? d += String.fromCharCode(e2) : (e2 -= 65536, d += String.fromCharCode(55296 | e2 >> 10, 56320 | e2 & 1023));
                    }
                  } else d += String.fromCharCode(e2);
                }
                return d;
              }
              var za, Aa, H, Ba, Ca, Da, M, Ea, Fa;
              function Ga() {
                var b = va.buffer;
                za = b;
                m.HEAP8 = Aa = new Int8Array(b);
                m.HEAP16 = Ba = new Int16Array(b);
                m.HEAP32 = Da = new Int32Array(b);
                m.HEAPU8 = H = new Uint8Array(b);
                m.HEAPU16 = Ca = new Uint16Array(b);
                m.HEAPU32 = M = new Uint32Array(b);
                m.HEAPF32 = Ea = new Float32Array(b);
                m.HEAPF64 = Fa = new Float64Array(b);
              }
              var Ha, Ia = [], Ja = [], Ka = [];
              function La() {
                var b = m.preRun.shift();
                Ia.unshift(b);
              }
              var Ma = 0, Na = null, Oa = null;
              function ua(b) {
                if (m.onAbort) m.onAbort(b);
                b = "Aborted(" + b + ")";
                qa(b);
                wa = true;
                b = new WebAssembly.RuntimeError(b + ". Build with -sASSERTIONS for more info.");
                ba(b);
                throw b;
              }
              function Pa() {
                return N.startsWith("data:application/octet-stream;base64,");
              }
              var N;
              N = "canvas_advanced.wasm";
              if (!Pa()) {
                var Qa = N;
                N = m.locateFile ? m.locateFile(Qa, x) : x + Qa;
              }
              function Ra() {
                var b = N;
                try {
                  if (b == N && ra) return new Uint8Array(ra);
                  if (oa) return oa(b);
                  throw "both async and sync fetching of the wasm failed";
                } catch (a) {
                  ua(a);
                }
              }
              function Sa() {
                if (!ra && (ka || la)) {
                  if ("function" == typeof fetch && !N.startsWith("file://")) return fetch(N, { credentials: "same-origin" }).then(function(b) {
                    if (!b.ok) throw "failed to load wasm binary file at '" + N + "'";
                    return b.arrayBuffer();
                  }).catch(function() {
                    return Ra();
                  });
                  if (ma) return new Promise(function(b, a) {
                    ma(N, function(c) {
                      b(new Uint8Array(c));
                    }, a);
                  });
                }
                return Promise.resolve().then(function() {
                  return Ra();
                });
              }
              function Ta(b) {
                for (; 0 < b.length; ) b.shift()(m);
              }
              function Ua(b) {
                if (void 0 === b) return "_unknown";
                b = b.replace(/[^a-zA-Z0-9_]/g, "$");
                var a = b.charCodeAt(0);
                return 48 <= a && 57 >= a ? "_" + b : b;
              }
              function Va(b, a) {
                b = Ua(b);
                return function() {
                  null;
                  return a.apply(this, arguments);
                };
              }
              var O = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }], Wa = [];
              function Ya(b) {
                var a = Error, c = Va(b, function(d) {
                  this.name = b;
                  this.message = d;
                  d = Error(d).stack;
                  void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
                });
                c.prototype = Object.create(a.prototype);
                c.prototype.constructor = c;
                c.prototype.toString = function() {
                  return void 0 === this.message ? this.name : this.name + ": " + this.message;
                };
                return c;
              }
              var Za = void 0;
              function Q(b) {
                throw new Za(b);
              }
              var $a = (b) => {
                b || Q("Cannot use deleted val. handle = " + b);
                return O[b].value;
              }, S = (b) => {
                switch (b) {
                  case void 0:
                    return 1;
                  case null:
                    return 2;
                  case true:
                    return 3;
                  case false:
                    return 4;
                  default:
                    var a = Wa.length ? Wa.pop() : O.length;
                    O[a] = { ya: 1, value: b };
                    return a;
                }
              }, ab = void 0, bb = void 0;
              function T(b) {
                for (var a = ""; H[b]; ) a += bb[H[b++]];
                return a;
              }
              var cb = [];
              function db() {
                for (; cb.length; ) {
                  var b = cb.pop();
                  b.U.ka = false;
                  b["delete"]();
                }
              }
              var eb = void 0, V = {};
              function fb(b, a) {
                for (void 0 === a && Q("ptr should not be undefined"); b.$; ) a = b.na(a), b = b.$;
                return a;
              }
              var gb = {};
              function hb(b) {
                b = ib(b);
                var a = T(b);
                jb(b);
                return a;
              }
              function kb(b, a) {
                var c = gb[b];
                void 0 === c && Q(a + " has unknown type " + hb(b));
                return c;
              }
              function lb() {
              }
              var mb = false;
              function nb(b) {
                --b.count.value;
                0 === b.count.value && (b.aa ? b.ca.ha(b.aa) : b.X.V.ha(b.W));
              }
              function ob(b, a, c) {
                if (a === c) return b;
                if (void 0 === c.$) return null;
                b = ob(b, a, c.$);
                return null === b ? null : c.ab(b);
              }
              var tb = {};
              function ub(b, a) {
                a = fb(b, a);
                return V[a];
              }
              var vb = void 0;
              function wb(b) {
                throw new vb(b);
              }
              function xb(b, a) {
                a.X && a.W || wb("makeClassHandle requires ptr and ptrType");
                !!a.ca !== !!a.aa && wb("Both smartPtrType and smartPtr must be specified");
                a.count = { value: 1 };
                return yb(Object.create(b, { U: { value: a } }));
              }
              function yb(b) {
                if ("undefined" === typeof FinalizationRegistry) return yb = (a) => a, b;
                mb = new FinalizationRegistry((a) => {
                  nb(a.U);
                });
                yb = (a) => {
                  var c = a.U;
                  c.aa && mb.register(a, { U: c }, a);
                  return a;
                };
                lb = (a) => {
                  mb.unregister(a);
                };
                return yb(b);
              }
              var zb = {};
              function Ab(b) {
                for (; b.length; ) {
                  var a = b.pop();
                  b.pop()(a);
                }
              }
              function Bb(b) {
                return this.fromWireType(Da[b >> 2]);
              }
              var Cb = {}, Db = {};
              function W(b, a, c) {
                function d(g) {
                  g = c(g);
                  g.length !== b.length && wb("Mismatched type converter count");
                  for (var l = 0; l < b.length; ++l) Y(b[l], g[l]);
                }
                b.forEach(function(g) {
                  Db[g] = a;
                });
                var e2 = Array(a.length), f = [], h = 0;
                a.forEach((g, l) => {
                  gb.hasOwnProperty(g) ? e2[l] = gb[g] : (f.push(g), Cb.hasOwnProperty(g) || (Cb[g] = []), Cb[g].push(() => {
                    e2[l] = gb[g];
                    ++h;
                    h === f.length && d(e2);
                  }));
                });
                0 === f.length && d(e2);
              }
              function Eb(b) {
                switch (b) {
                  case 1:
                    return 0;
                  case 2:
                    return 1;
                  case 4:
                    return 2;
                  case 8:
                    return 3;
                  default:
                    throw new TypeError("Unknown type size: " + b);
                }
              }
              function Y(b, a, c = {}) {
                if (!("argPackAdvance" in a)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
                var d = a.name;
                b || Q('type "' + d + '" must have a positive integer typeid pointer');
                if (gb.hasOwnProperty(b)) {
                  if (c.lb) return;
                  Q("Cannot register type '" + d + "' twice");
                }
                gb[b] = a;
                delete Db[b];
                Cb.hasOwnProperty(b) && (a = Cb[b], delete Cb[b], a.forEach((e2) => e2()));
              }
              function Fb(b) {
                Q(b.U.X.V.name + " instance already deleted");
              }
              function Gb() {
              }
              function Hb(b, a, c) {
                if (void 0 === b[a].Y) {
                  var d = b[a];
                  b[a] = function() {
                    b[a].Y.hasOwnProperty(arguments.length) || Q("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + b[a].Y + ")!");
                    return b[a].Y[arguments.length].apply(this, arguments);
                  };
                  b[a].Y = [];
                  b[a].Y[d.ja] = d;
                }
              }
              function Ib(b, a, c) {
                m.hasOwnProperty(b) ? ((void 0 === c || void 0 !== m[b].Y && void 0 !== m[b].Y[c]) && Q("Cannot register public name '" + b + "' twice"), Hb(m, b, b), m.hasOwnProperty(c) && Q("Cannot register multiple overloads of a function with the same number of arguments (" + c + ")!"), m[b].Y[c] = a) : (m[b] = a, void 0 !== c && (m[b].zb = c));
              }
              function Jb(b, a, c, d, e2, f, h, g) {
                this.name = b;
                this.constructor = a;
                this.ea = c;
                this.ha = d;
                this.$ = e2;
                this.gb = f;
                this.na = h;
                this.ab = g;
                this.Ma = [];
              }
              function Kb(b, a, c) {
                for (; a !== c; ) a.na || Q("Expected null or instance of " + c.name + ", got an instance of " + a.name), b = a.na(b), a = a.$;
                return b;
              }
              function Lb(b, a) {
                if (null === a) return this.wa && Q("null is not a valid " + this.name), 0;
                a.U || Q('Cannot pass "' + Mb(a) + '" as a ' + this.name);
                a.U.W || Q("Cannot pass deleted object as a pointer of type " + this.name);
                return Kb(a.U.W, a.U.X.V, this.V);
              }
              function Nb(b, a) {
                if (null === a) {
                  this.wa && Q("null is not a valid " + this.name);
                  if (this.qa) {
                    var c = this.xa();
                    null !== b && b.push(this.ha, c);
                    return c;
                  }
                  return 0;
                }
                a.U || Q('Cannot pass "' + Mb(a) + '" as a ' + this.name);
                a.U.W || Q("Cannot pass deleted object as a pointer of type " + this.name);
                !this.pa && a.U.X.pa && Q("Cannot convert argument of type " + (a.U.ca ? a.U.ca.name : a.U.X.name) + " to parameter type " + this.name);
                c = Kb(a.U.W, a.U.X.V, this.V);
                if (this.qa) switch (void 0 === a.U.aa && Q("Passing raw pointer to smart pointer is illegal"), this.xb) {
                  case 0:
                    a.U.ca === this ? c = a.U.aa : Q("Cannot convert argument of type " + (a.U.ca ? a.U.ca.name : a.U.X.name) + " to parameter type " + this.name);
                    break;
                  case 1:
                    c = a.U.aa;
                    break;
                  case 2:
                    if (a.U.ca === this) c = a.U.aa;
                    else {
                      var d = a.clone();
                      c = this.tb(c, S(function() {
                        d["delete"]();
                      }));
                      null !== b && b.push(this.ha, c);
                    }
                    break;
                  default:
                    Q("Unsupporting sharing policy");
                }
                return c;
              }
              function Ob(b, a) {
                if (null === a) return this.wa && Q("null is not a valid " + this.name), 0;
                a.U || Q('Cannot pass "' + Mb(a) + '" as a ' + this.name);
                a.U.W || Q("Cannot pass deleted object as a pointer of type " + this.name);
                a.U.X.pa && Q("Cannot convert argument of type " + a.U.X.name + " to parameter type " + this.name);
                return Kb(a.U.W, a.U.X.V, this.V);
              }
              function Pb(b, a, c, d) {
                this.name = b;
                this.V = a;
                this.wa = c;
                this.pa = d;
                this.qa = false;
                this.ha = this.tb = this.xa = this.Na = this.xb = this.sb = void 0;
                void 0 !== a.$ ? this.toWireType = Nb : (this.toWireType = d ? Lb : Ob, this.ba = null);
              }
              function Qb(b, a, c) {
                m.hasOwnProperty(b) || wb("Replacing nonexistant public symbol");
                void 0 !== m[b].Y && void 0 !== c ? m[b].Y[c] = a : (m[b] = a, m[b].ja = c);
              }
              function Rb(b, a) {
                var c = [];
                return function() {
                  c.length = 0;
                  Object.assign(c, arguments);
                  if (b.includes("j")) {
                    var d = m["dynCall_" + b];
                    d = c && c.length ? d.apply(null, [a].concat(c)) : d.call(null, a);
                  } else d = Ha.get(a).apply(null, c);
                  return d;
                };
              }
              function Z(b, a) {
                b = T(b);
                var c = b.includes("j") ? Rb(b, a) : Ha.get(a);
                "function" != typeof c && Q("unknown function pointer with signature " + b + ": " + a);
                return c;
              }
              var Sb = void 0;
              function Tb(b, a) {
                function c(f) {
                  e2[f] || gb[f] || (Db[f] ? Db[f].forEach(c) : (d.push(f), e2[f] = true));
                }
                var d = [], e2 = {};
                a.forEach(c);
                throw new Sb(b + ": " + d.map(hb).join([", "]));
              }
              function Ub(b, a, c, d, e2) {
                var f = a.length;
                2 > f && Q("argTypes array size mismatch! Must at least get return value and 'this' types!");
                var h = null !== a[1] && null !== c, g = false;
                for (c = 1; c < a.length; ++c) if (null !== a[c] && void 0 === a[c].ba) {
                  g = true;
                  break;
                }
                var l = "void" !== a[0].name, k = f - 2, p2 = Array(k), r2 = [], t2 = [];
                return function() {
                  arguments.length !== k && Q("function " + b + " called with " + arguments.length + " arguments, expected " + k + " args!");
                  t2.length = 0;
                  r2.length = h ? 2 : 1;
                  r2[0] = e2;
                  if (h) {
                    var v = a[1].toWireType(t2, this);
                    r2[1] = v;
                  }
                  for (var q = 0; q < k; ++q) p2[q] = a[q + 2].toWireType(t2, arguments[q]), r2.push(p2[q]);
                  q = d.apply(null, r2);
                  if (g) Ab(t2);
                  else for (var E = h ? 1 : 2; E < a.length; E++) {
                    var I = 1 === E ? v : p2[E - 2];
                    null !== a[E].ba && a[E].ba(I);
                  }
                  v = l ? a[0].fromWireType(q) : void 0;
                  return v;
                };
              }
              function Vb(b, a) {
                for (var c = [], d = 0; d < b; d++) c.push(M[a + 4 * d >> 2]);
                return c;
              }
              function Wb(b, a, c) {
                b instanceof Object || Q(c + ' with invalid "this": ' + b);
                b instanceof a.V.constructor || Q(c + ' incompatible with "this" of type ' + b.constructor.name);
                b.U.W || Q("cannot call emscripten binding method " + c + " on deleted object");
                return Kb(b.U.W, b.U.X.V, a.V);
              }
              function Xb(b) {
                4 < b && 0 === --O[b].ya && (O[b] = void 0, Wa.push(b));
              }
              function Zb(b, a, c) {
                switch (a) {
                  case 0:
                    return function(d) {
                      return this.fromWireType((c ? Aa : H)[d]);
                    };
                  case 1:
                    return function(d) {
                      return this.fromWireType((c ? Ba : Ca)[d >> 1]);
                    };
                  case 2:
                    return function(d) {
                      return this.fromWireType((c ? Da : M)[d >> 2]);
                    };
                  default:
                    throw new TypeError("Unknown integer type: " + b);
                }
              }
              function Mb(b) {
                if (null === b) return "null";
                var a = typeof b;
                return "object" === a || "array" === a || "function" === a ? b.toString() : "" + b;
              }
              function $b(b, a) {
                switch (a) {
                  case 2:
                    return function(c) {
                      return this.fromWireType(Ea[c >> 2]);
                    };
                  case 3:
                    return function(c) {
                      return this.fromWireType(Fa[c >> 3]);
                    };
                  default:
                    throw new TypeError("Unknown float type: " + b);
                }
              }
              function ac(b, a, c) {
                switch (a) {
                  case 0:
                    return c ? function(d) {
                      return Aa[d];
                    } : function(d) {
                      return H[d];
                    };
                  case 1:
                    return c ? function(d) {
                      return Ba[d >> 1];
                    } : function(d) {
                      return Ca[d >> 1];
                    };
                  case 2:
                    return c ? function(d) {
                      return Da[d >> 2];
                    } : function(d) {
                      return M[d >> 2];
                    };
                  default:
                    throw new TypeError("Unknown integer type: " + b);
                }
              }
              var bc = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
              function cc(b, a) {
                var c = b >> 1;
                for (var d = c + a / 2; !(c >= d) && Ca[c]; ) ++c;
                c <<= 1;
                if (32 < c - b && bc) return bc.decode(H.subarray(b, c));
                c = "";
                for (d = 0; !(d >= a / 2); ++d) {
                  var e2 = Ba[b + 2 * d >> 1];
                  if (0 == e2) break;
                  c += String.fromCharCode(e2);
                }
                return c;
              }
              function dc(b, a, c) {
                void 0 === c && (c = 2147483647);
                if (2 > c) return 0;
                c -= 2;
                var d = a;
                c = c < 2 * b.length ? c / 2 : b.length;
                for (var e2 = 0; e2 < c; ++e2) Ba[a >> 1] = b.charCodeAt(e2), a += 2;
                Ba[a >> 1] = 0;
                return a - d;
              }
              function ec(b) {
                return 2 * b.length;
              }
              function fc(b, a) {
                for (var c = 0, d = ""; !(c >= a / 4); ) {
                  var e2 = Da[b + 4 * c >> 2];
                  if (0 == e2) break;
                  ++c;
                  65536 <= e2 ? (e2 -= 65536, d += String.fromCharCode(55296 | e2 >> 10, 56320 | e2 & 1023)) : d += String.fromCharCode(e2);
                }
                return d;
              }
              function gc(b, a, c) {
                void 0 === c && (c = 2147483647);
                if (4 > c) return 0;
                var d = a;
                c = d + c - 4;
                for (var e2 = 0; e2 < b.length; ++e2) {
                  var f = b.charCodeAt(e2);
                  if (55296 <= f && 57343 >= f) {
                    var h = b.charCodeAt(++e2);
                    f = 65536 + ((f & 1023) << 10) | h & 1023;
                  }
                  Da[a >> 2] = f;
                  a += 4;
                  if (a + 4 > c) break;
                }
                Da[a >> 2] = 0;
                return a - d;
              }
              function hc(b) {
                for (var a = 0, c = 0; c < b.length; ++c) {
                  var d = b.charCodeAt(c);
                  55296 <= d && 57343 >= d && ++c;
                  a += 4;
                }
                return a;
              }
              var ic = {};
              function jc(b) {
                var a = ic[b];
                return void 0 === a ? T(b) : a;
              }
              var kc = [];
              function lc(b) {
                var a = kc.length;
                kc.push(b);
                return a;
              }
              function mc(b, a) {
                for (var c = Array(b), d = 0; d < b; ++d) c[d] = kb(M[a + 4 * d >> 2], "parameter " + d);
                return c;
              }
              var nc = [], oc = [null, [], []];
              Za = m.BindingError = Ya("BindingError");
              m.count_emval_handles = function() {
                for (var b = 0, a = 5; a < O.length; ++a) void 0 !== O[a] && ++b;
                return b;
              };
              m.get_first_emval = function() {
                for (var b = 5; b < O.length; ++b) if (void 0 !== O[b]) return O[b];
                return null;
              };
              ab = m.PureVirtualError = Ya("PureVirtualError");
              for (var pc = Array(256), qc = 0; 256 > qc; ++qc) pc[qc] = String.fromCharCode(qc);
              bb = pc;
              m.getInheritedInstanceCount = function() {
                return Object.keys(V).length;
              };
              m.getLiveInheritedInstances = function() {
                var b = [], a;
                for (a in V) V.hasOwnProperty(a) && b.push(V[a]);
                return b;
              };
              m.flushPendingDeletes = db;
              m.setDelayFunction = function(b) {
                eb = b;
                cb.length && eb && eb(db);
              };
              vb = m.InternalError = Ya("InternalError");
              Gb.prototype.isAliasOf = function(b) {
                if (!(this instanceof Gb && b instanceof Gb)) return false;
                var a = this.U.X.V, c = this.U.W, d = b.U.X.V;
                for (b = b.U.W; a.$; ) c = a.na(c), a = a.$;
                for (; d.$; ) b = d.na(b), d = d.$;
                return a === d && c === b;
              };
              Gb.prototype.clone = function() {
                this.U.W || Fb(this);
                if (this.U.ma) return this.U.count.value += 1, this;
                var b = yb, a = Object, c = a.create, d = Object.getPrototypeOf(this), e2 = this.U;
                b = b(c.call(a, d, { U: { value: { count: e2.count, ka: e2.ka, ma: e2.ma, W: e2.W, X: e2.X, aa: e2.aa, ca: e2.ca } } }));
                b.U.count.value += 1;
                b.U.ka = false;
                return b;
              };
              Gb.prototype["delete"] = function() {
                this.U.W || Fb(this);
                this.U.ka && !this.U.ma && Q("Object already scheduled for deletion");
                lb(this);
                nb(this.U);
                this.U.ma || (this.U.aa = void 0, this.U.W = void 0);
              };
              Gb.prototype.isDeleted = function() {
                return !this.U.W;
              };
              Gb.prototype.deleteLater = function() {
                this.U.W || Fb(this);
                this.U.ka && !this.U.ma && Q("Object already scheduled for deletion");
                cb.push(this);
                1 === cb.length && eb && eb(db);
                this.U.ka = true;
                return this;
              };
              Pb.prototype.hb = function(b) {
                this.Na && (b = this.Na(b));
                return b;
              };
              Pb.prototype.Ga = function(b) {
                this.ha && this.ha(b);
              };
              Pb.prototype.argPackAdvance = 8;
              Pb.prototype.readValueFromPointer = Bb;
              Pb.prototype.deleteObject = function(b) {
                if (null !== b) b["delete"]();
              };
              Pb.prototype.fromWireType = function(b) {
                function a() {
                  return this.qa ? xb(this.V.ea, { X: this.sb, W: c, ca: this, aa: b }) : xb(this.V.ea, { X: this, W: b });
                }
                var c = this.hb(b);
                if (!c) return this.Ga(b), null;
                var d = ub(this.V, c);
                if (void 0 !== d) {
                  if (0 === d.U.count.value) return d.U.W = c, d.U.aa = b, d.clone();
                  d = d.clone();
                  this.Ga(b);
                  return d;
                }
                d = this.V.gb(c);
                d = tb[d];
                if (!d) return a.call(this);
                d = this.pa ? d.Xa : d.pointerType;
                var e2 = ob(c, this.V, d.V);
                return null === e2 ? a.call(this) : this.qa ? xb(d.V.ea, { X: d, W: e2, ca: this, aa: b }) : xb(d.V.ea, { X: d, W: e2 });
              };
              Sb = m.UnboundTypeError = Ya("UnboundTypeError");
              var sc = { l: function(b, a, c) {
                b = T(b);
                a = kb(a, "wrapper");
                c = $a(c);
                var d = [].slice, e2 = a.V, f = e2.ea, h = e2.$.ea, g = e2.$.constructor;
                b = Va(b, function() {
                  e2.$.Ma.forEach(function(k) {
                    if (this[k] === h[k]) throw new ab("Pure virtual function " + k + " must be implemented in JavaScript");
                  }.bind(this));
                  Object.defineProperty(this, "__parent", { value: f });
                  this.__construct.apply(this, d.call(arguments));
                });
                f.__construct = function() {
                  this === f && Q("Pass correct 'this' to __construct");
                  var k = g.implement.apply(void 0, [this].concat(d.call(arguments)));
                  lb(k);
                  var p2 = k.U;
                  k.notifyOnDestruction();
                  p2.ma = true;
                  Object.defineProperties(this, { U: { value: p2 } });
                  yb(this);
                  k = p2.W;
                  k = fb(e2, k);
                  V.hasOwnProperty(k) ? Q("Tried to register registered instance: " + k) : V[k] = this;
                };
                f.__destruct = function() {
                  this === f && Q("Pass correct 'this' to __destruct");
                  lb(this);
                  var k = this.U.W;
                  k = fb(e2, k);
                  V.hasOwnProperty(k) ? delete V[k] : Q("Tried to unregister unregistered instance: " + k);
                };
                b.prototype = Object.create(f);
                for (var l in c) b.prototype[l] = c[l];
                return S(b);
              }, I: function(b) {
                var a = zb[b];
                delete zb[b];
                var c = a.xa, d = a.ha, e2 = a.Ja, f = e2.map((h) => h.kb).concat(e2.map((h) => h.vb));
                W([b], f, (h) => {
                  var g = {};
                  e2.forEach((l, k) => {
                    var p2 = h[k], r2 = l.ib, t2 = l.jb, v = h[k + e2.length], q = l.ub, E = l.wb;
                    g[l.eb] = { read: (I) => p2.fromWireType(r2(t2, I)), write: (I, w) => {
                      var z = [];
                      q(E, I, v.toWireType(z, w));
                      Ab(z);
                    } };
                  });
                  return [{ name: a.name, fromWireType: function(l) {
                    var k = {}, p2;
                    for (p2 in g) k[p2] = g[p2].read(l);
                    d(l);
                    return k;
                  }, toWireType: function(l, k) {
                    for (var p2 in g) if (!(p2 in k)) throw new TypeError('Missing field:  "' + p2 + '"');
                    var r2 = c();
                    for (p2 in g) g[p2].write(r2, k[p2]);
                    null !== l && l.push(d, r2);
                    return r2;
                  }, argPackAdvance: 8, readValueFromPointer: Bb, ba: d }];
                });
              }, x: function() {
              }, B: function(b, a, c, d, e2) {
                var f = Eb(c);
                a = T(a);
                Y(b, { name: a, fromWireType: function(h) {
                  return !!h;
                }, toWireType: function(h, g) {
                  return g ? d : e2;
                }, argPackAdvance: 8, readValueFromPointer: function(h) {
                  if (1 === c) var g = Aa;
                  else if (2 === c) g = Ba;
                  else if (4 === c) g = Da;
                  else throw new TypeError("Unknown boolean type size: " + a);
                  return this.fromWireType(g[h >> f]);
                }, ba: null });
              }, c: function(b, a, c, d, e2, f, h, g, l, k, p2, r2, t2) {
                p2 = T(p2);
                f = Z(e2, f);
                g && (g = Z(h, g));
                k && (k = Z(l, k));
                t2 = Z(r2, t2);
                var v = Ua(p2);
                Ib(v, function() {
                  Tb("Cannot construct " + p2 + " due to unbound types", [d]);
                });
                W([b, a, c], d ? [d] : [], function(q) {
                  q = q[0];
                  if (d) {
                    var E = q.V;
                    var I = E.ea;
                  } else I = Gb.prototype;
                  q = Va(v, function() {
                    if (Object.getPrototypeOf(this) !== w) throw new Za("Use 'new' to construct " + p2);
                    if (void 0 === z.ia) throw new Za(p2 + " has no accessible constructor");
                    var P = z.ia[arguments.length];
                    if (void 0 === P) throw new Za("Tried to invoke ctor of " + p2 + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(z.ia).toString() + ") parameters instead!");
                    return P.apply(this, arguments);
                  });
                  var w = Object.create(I, { constructor: { value: q } });
                  q.prototype = w;
                  var z = new Jb(p2, q, w, t2, E, f, g, k);
                  E = new Pb(p2, z, true, false);
                  I = new Pb(p2 + "*", z, false, false);
                  var J = new Pb(p2 + " const*", z, false, true);
                  tb[b] = { pointerType: I, Xa: J };
                  Qb(v, q);
                  return [E, I, J];
                });
              }, h: function(b, a, c, d, e2, f, h) {
                var g = Vb(c, d);
                a = T(a);
                f = Z(e2, f);
                W([], [b], function(l) {
                  function k() {
                    Tb("Cannot call " + p2 + " due to unbound types", g);
                  }
                  l = l[0];
                  var p2 = l.name + "." + a;
                  a.startsWith("@@") && (a = Symbol[a.substring(2)]);
                  var r2 = l.V.constructor;
                  void 0 === r2[a] ? (k.ja = c - 1, r2[a] = k) : (Hb(r2, a, p2), r2[a].Y[c - 1] = k);
                  W([], g, function(t2) {
                    t2 = Ub(p2, [t2[0], null].concat(t2.slice(1)), null, f, h);
                    void 0 === r2[a].Y ? (t2.ja = c - 1, r2[a] = t2) : r2[a].Y[c - 1] = t2;
                    return [];
                  });
                  return [];
                });
              }, n: function(b, a, c, d, e2, f, h, g) {
                a = T(a);
                f = Z(e2, f);
                W([], [b], function(l) {
                  l = l[0];
                  var k = l.name + "." + a, p2 = { get: function() {
                    Tb("Cannot access " + k + " due to unbound types", [c]);
                  }, enumerable: true, configurable: true };
                  p2.set = g ? () => {
                    Tb("Cannot access " + k + " due to unbound types", [c]);
                  } : () => {
                    Q(k + " is a read-only property");
                  };
                  Object.defineProperty(l.V.constructor, a, p2);
                  W([], [c], function(r2) {
                    r2 = r2[0];
                    var t2 = { get: function() {
                      return r2.fromWireType(f(d));
                    }, enumerable: true };
                    g && (g = Z(h, g), t2.set = (v) => {
                      var q = [];
                      g(d, r2.toWireType(q, v));
                      Ab(q);
                    });
                    Object.defineProperty(l.V.constructor, a, t2);
                    return [];
                  });
                  return [];
                });
              }, k: function(b, a, c, d, e2, f) {
                0 < a || ua();
                var h = Vb(a, c);
                e2 = Z(d, e2);
                W([], [b], function(g) {
                  g = g[0];
                  var l = "constructor " + g.name;
                  void 0 === g.V.ia && (g.V.ia = []);
                  if (void 0 !== g.V.ia[a - 1]) throw new Za("Cannot register multiple constructors with identical number of parameters (" + (a - 1) + ") for class '" + g.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
                  g.V.ia[a - 1] = () => {
                    Tb("Cannot construct " + g.name + " due to unbound types", h);
                  };
                  W([], h, function(k) {
                    k.splice(1, 0, null);
                    g.V.ia[a - 1] = Ub(l, k, null, e2, f);
                    return [];
                  });
                  return [];
                });
              }, a: function(b, a, c, d, e2, f, h, g) {
                var l = Vb(c, d);
                a = T(a);
                f = Z(e2, f);
                W([], [b], function(k) {
                  function p2() {
                    Tb("Cannot call " + r2 + " due to unbound types", l);
                  }
                  k = k[0];
                  var r2 = k.name + "." + a;
                  a.startsWith("@@") && (a = Symbol[a.substring(2)]);
                  g && k.V.Ma.push(a);
                  var t2 = k.V.ea, v = t2[a];
                  void 0 === v || void 0 === v.Y && v.className !== k.name && v.ja === c - 2 ? (p2.ja = c - 2, p2.className = k.name, t2[a] = p2) : (Hb(t2, a, r2), t2[a].Y[c - 2] = p2);
                  W([], l, function(q) {
                    q = Ub(r2, q, k, f, h);
                    void 0 === t2[a].Y ? (q.ja = c - 2, t2[a] = q) : t2[a].Y[c - 2] = q;
                    return [];
                  });
                  return [];
                });
              }, b: function(b, a, c, d, e2, f, h, g, l, k) {
                a = T(a);
                e2 = Z(d, e2);
                W([], [b], function(p2) {
                  p2 = p2[0];
                  var r2 = p2.name + "." + a, t2 = { get: function() {
                    Tb("Cannot access " + r2 + " due to unbound types", [c, h]);
                  }, enumerable: true, configurable: true };
                  t2.set = l ? () => {
                    Tb(
                      "Cannot access " + r2 + " due to unbound types",
                      [c, h]
                    );
                  } : () => {
                    Q(r2 + " is a read-only property");
                  };
                  Object.defineProperty(p2.V.ea, a, t2);
                  W([], l ? [c, h] : [c], function(v) {
                    var q = v[0], E = { get: function() {
                      var w = Wb(this, p2, r2 + " getter");
                      return q.fromWireType(e2(f, w));
                    }, enumerable: true };
                    if (l) {
                      l = Z(g, l);
                      var I = v[1];
                      E.set = function(w) {
                        var z = Wb(this, p2, r2 + " setter"), J = [];
                        l(k, z, I.toWireType(J, w));
                        Ab(J);
                      };
                    }
                    Object.defineProperty(p2.V.ea, a, E);
                    return [];
                  });
                  return [];
                });
              }, A: function(b, a) {
                a = T(a);
                Y(b, {
                  name: a,
                  fromWireType: function(c) {
                    var d = $a(c);
                    Xb(c);
                    return d;
                  },
                  toWireType: function(c, d) {
                    return S(d);
                  },
                  argPackAdvance: 8,
                  readValueFromPointer: Bb,
                  ba: null
                });
              }, j: function(b, a, c, d) {
                function e2() {
                }
                c = Eb(c);
                a = T(a);
                e2.values = {};
                Y(b, { name: a, constructor: e2, fromWireType: function(f) {
                  return this.constructor.values[f];
                }, toWireType: function(f, h) {
                  return h.value;
                }, argPackAdvance: 8, readValueFromPointer: Zb(a, c, d), ba: null });
                Ib(a, e2);
              }, i: function(b, a, c) {
                var d = kb(b, "enum");
                a = T(a);
                b = d.constructor;
                d = Object.create(d.constructor.prototype, { value: { value: c }, constructor: { value: Va(d.name + "_" + a, function() {
                }) } });
                b.values[c] = d;
                b[a] = d;
              }, r: function(b, a, c) {
                c = Eb(c);
                a = T(a);
                Y(b, { name: a, fromWireType: function(d) {
                  return d;
                }, toWireType: function(d, e2) {
                  return e2;
                }, argPackAdvance: 8, readValueFromPointer: $b(a, c), ba: null });
              }, q: function(b, a, c, d, e2, f) {
                var h = Vb(a, c);
                b = T(b);
                e2 = Z(d, e2);
                Ib(b, function() {
                  Tb("Cannot call " + b + " due to unbound types", h);
                }, a - 1);
                W([], h, function(g) {
                  Qb(b, Ub(b, [g[0], null].concat(g.slice(1)), null, e2, f), a - 1);
                  return [];
                });
              }, g: function(b, a, c, d, e2) {
                a = T(a);
                -1 === e2 && (e2 = 4294967295);
                e2 = Eb(c);
                var f = (g) => g;
                if (0 === d) {
                  var h = 32 - 8 * c;
                  f = (g) => g << h >>> h;
                }
                c = a.includes("unsigned") ? function(g, l) {
                  return l >>> 0;
                } : function(g, l) {
                  return l;
                };
                Y(b, { name: a, fromWireType: f, toWireType: c, argPackAdvance: 8, readValueFromPointer: ac(a, e2, 0 !== d), ba: null });
              }, d: function(b, a, c) {
                function d(f) {
                  f >>= 2;
                  var h = M;
                  return new e2(za, h[f + 1], h[f]);
                }
                var e2 = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][a];
                c = T(c);
                Y(b, { name: c, fromWireType: d, argPackAdvance: 8, readValueFromPointer: d }, { lb: true });
              }, s: function(b, a) {
                a = T(a);
                var c = "std::string" === a;
                Y(b, { name: a, fromWireType: function(d) {
                  var e2 = M[d >> 2], f = d + 4;
                  if (c) for (var h = f, g = 0; g <= e2; ++g) {
                    var l = f + g;
                    if (g == e2 || 0 == H[l]) {
                      h = h ? ya(H, h, l - h) : "";
                      if (void 0 === k) var k = h;
                      else k += String.fromCharCode(0), k += h;
                      h = l + 1;
                    }
                  }
                  else {
                    k = Array(e2);
                    for (g = 0; g < e2; ++g) k[g] = String.fromCharCode(H[f + g]);
                    k = k.join("");
                  }
                  jb(d);
                  return k;
                }, toWireType: function(d, e2) {
                  e2 instanceof ArrayBuffer && (e2 = new Uint8Array(e2));
                  var f, h = "string" == typeof e2;
                  h || e2 instanceof Uint8Array || e2 instanceof Uint8ClampedArray || e2 instanceof Int8Array || Q("Cannot pass non-string to std::string");
                  var g;
                  if (c && h) for (f = g = 0; f < e2.length; ++f) {
                    var l = e2.charCodeAt(f);
                    127 >= l ? g++ : 2047 >= l ? g += 2 : 55296 <= l && 57343 >= l ? (g += 4, ++f) : g += 3;
                  }
                  else g = e2.length;
                  f = g;
                  g = rc(4 + f + 1);
                  l = g + 4;
                  M[g >> 2] = f;
                  if (c && h) {
                    if (h = l, l = f + 1, f = H, 0 < l) {
                      l = h + l - 1;
                      for (var k = 0; k < e2.length; ++k) {
                        var p2 = e2.charCodeAt(k);
                        if (55296 <= p2 && 57343 >= p2) {
                          var r2 = e2.charCodeAt(++k);
                          p2 = 65536 + ((p2 & 1023) << 10) | r2 & 1023;
                        }
                        if (127 >= p2) {
                          if (h >= l) break;
                          f[h++] = p2;
                        } else {
                          if (2047 >= p2) {
                            if (h + 1 >= l) break;
                            f[h++] = 192 | p2 >> 6;
                          } else {
                            if (65535 >= p2) {
                              if (h + 2 >= l) break;
                              f[h++] = 224 | p2 >> 12;
                            } else {
                              if (h + 3 >= l) break;
                              f[h++] = 240 | p2 >> 18;
                              f[h++] = 128 | p2 >> 12 & 63;
                            }
                            f[h++] = 128 | p2 >> 6 & 63;
                          }
                          f[h++] = 128 | p2 & 63;
                        }
                      }
                      f[h] = 0;
                    }
                  } else if (h) for (h = 0; h < f; ++h) k = e2.charCodeAt(h), 255 < k && (jb(l), Q("String has UTF-16 code units that do not fit in 8 bits")), H[l + h] = k;
                  else for (h = 0; h < f; ++h) H[l + h] = e2[h];
                  null !== d && d.push(jb, g);
                  return g;
                }, argPackAdvance: 8, readValueFromPointer: Bb, ba: function(d) {
                  jb(d);
                } });
              }, p: function(b, a, c) {
                c = T(c);
                if (2 === a) {
                  var d = cc;
                  var e2 = dc;
                  var f = ec;
                  var h = () => Ca;
                  var g = 1;
                } else 4 === a && (d = fc, e2 = gc, f = hc, h = () => M, g = 2);
                Y(b, { name: c, fromWireType: function(l) {
                  for (var k = M[l >> 2], p2 = h(), r2, t2 = l + 4, v = 0; v <= k; ++v) {
                    var q = l + 4 + v * a;
                    if (v == k || 0 == p2[q >> g]) t2 = d(t2, q - t2), void 0 === r2 ? r2 = t2 : (r2 += String.fromCharCode(0), r2 += t2), t2 = q + a;
                  }
                  jb(l);
                  return r2;
                }, toWireType: function(l, k) {
                  "string" != typeof k && Q("Cannot pass non-string to C++ string type " + c);
                  var p2 = f(k), r2 = rc(4 + p2 + a);
                  M[r2 >> 2] = p2 >> g;
                  e2(k, r2 + 4, p2 + a);
                  null !== l && l.push(jb, r2);
                  return r2;
                }, argPackAdvance: 8, readValueFromPointer: Bb, ba: function(l) {
                  jb(l);
                } });
              }, K: function(b, a, c, d, e2, f) {
                zb[b] = { name: T(a), xa: Z(c, d), ha: Z(e2, f), Ja: [] };
              }, J: function(b, a, c, d, e2, f, h, g, l, k) {
                zb[b].Ja.push({
                  eb: T(a),
                  kb: c,
                  ib: Z(d, e2),
                  jb: f,
                  vb: h,
                  ub: Z(g, l),
                  wb: k
                });
              }, C: function(b, a) {
                a = T(a);
                Y(b, { nb: true, name: a, argPackAdvance: 0, fromWireType: function() {
                }, toWireType: function() {
                } });
              }, m: function(b, a, c) {
                b = $a(b);
                a = kb(a, "emval::as");
                var d = [], e2 = S(d);
                M[c >> 2] = e2;
                return a.toWireType(d, b);
              }, t: function(b, a, c, d, e2) {
                b = kc[b];
                a = $a(a);
                c = jc(c);
                var f = [];
                M[d >> 2] = S(f);
                return b(a, c, f, e2);
              }, f: function(b, a, c, d) {
                b = kc[b];
                a = $a(a);
                c = jc(c);
                b(a, c, null, d);
              }, L: Xb, e: function(b, a) {
                var c = mc(b, a), d = c[0];
                a = d.name + "_$" + c.slice(1).map(function(h) {
                  return h.name;
                }).join("_") + "$";
                var e2 = nc[a];
                if (void 0 !== e2) return e2;
                var f = Array(b - 1);
                e2 = lc((h, g, l, k) => {
                  for (var p2 = 0, r2 = 0; r2 < b - 1; ++r2) f[r2] = c[r2 + 1].readValueFromPointer(k + p2), p2 += c[r2 + 1].argPackAdvance;
                  h = h[g].apply(h, f);
                  for (r2 = 0; r2 < b - 1; ++r2) c[r2 + 1].Za && c[r2 + 1].Za(f[r2]);
                  if (!d.nb) return d.toWireType(l, h);
                });
                return nc[a] = e2;
              }, D: function(b) {
                b = jc(b);
                return S(m[b]);
              }, H: function(b, a) {
                b = $a(b);
                a = $a(a);
                return S(b[a]);
              }, E: function(b) {
                4 < b && (O[b].ya += 1);
              }, G: function(b) {
                return S(jc(b));
              }, F: function(b) {
                var a = $a(b);
                Ab(a);
                Xb(b);
              }, u: function(b, a) {
                b = kb(b, "_emval_take_value");
                b = b.readValueFromPointer(a);
                return S(b);
              }, v: function() {
                ua("");
              }, o: function(b) {
                var a = H.length;
                b >>>= 0;
                if (2147483648 < b) return false;
                for (var c = 1; 4 >= c; c *= 2) {
                  var d = a * (1 + 0.2 / c);
                  d = Math.min(d, b + 100663296);
                  var e2 = Math;
                  d = Math.max(b, d);
                  e2 = e2.min.call(e2, 2147483648, d + (65536 - d % 65536) % 65536);
                  a: {
                    try {
                      va.grow(e2 - za.byteLength + 65535 >>> 16);
                      Ga();
                      var f = 1;
                      break a;
                    } catch (h) {
                    }
                    f = void 0;
                  }
                  if (f) return true;
                }
                return false;
              }, z: function() {
                return 52;
              }, w: function() {
                return 70;
              }, y: function(b, a, c, d) {
                for (var e2 = 0, f = 0; f < c; f++) {
                  var h = M[a >> 2], g = M[a + 4 >> 2];
                  a += 8;
                  for (var l = 0; l < g; l++) {
                    var k = H[h + l], p2 = oc[b];
                    0 === k || 10 === k ? ((1 === b ? pa : qa)(ya(p2, 0)), p2.length = 0) : p2.push(k);
                  }
                  e2 += g;
                }
                M[d >> 2] = e2;
                return 0;
              } };
              (function() {
                function b(e2) {
                  m.asm = e2.exports;
                  va = m.asm.M;
                  Ga();
                  Ha = m.asm.S;
                  Ja.unshift(m.asm.N);
                  Ma--;
                  m.monitorRunDependencies && m.monitorRunDependencies(Ma);
                  0 == Ma && (null !== Na && (clearInterval(Na), Na = null), Oa && (e2 = Oa, Oa = null, e2()));
                }
                function a(e2) {
                  b(e2.instance);
                }
                function c(e2) {
                  return Sa().then(function(f) {
                    return WebAssembly.instantiate(f, d);
                  }).then(function(f) {
                    return f;
                  }).then(e2, function(f) {
                    qa("failed to asynchronously prepare wasm: " + f);
                    ua(f);
                  });
                }
                var d = { a: sc };
                Ma++;
                m.monitorRunDependencies && m.monitorRunDependencies(Ma);
                if (m.instantiateWasm) try {
                  return m.instantiateWasm(d, b);
                } catch (e2) {
                  return qa("Module.instantiateWasm callback failed with error: " + e2), false;
                }
                (function() {
                  return ra || "function" != typeof WebAssembly.instantiateStreaming || Pa() || N.startsWith("file://") || "function" != typeof fetch ? c(a) : fetch(N, { credentials: "same-origin" }).then(function(e2) {
                    return WebAssembly.instantiateStreaming(e2, d).then(a, function(f) {
                      qa("wasm streaming compile failed: " + f);
                      qa("falling back to ArrayBuffer instantiation");
                      return c(a);
                    });
                  });
                })().catch(ba);
                return {};
              })();
              m.___wasm_call_ctors = function() {
                return (m.___wasm_call_ctors = m.asm.N).apply(null, arguments);
              };
              var jb = m._free = function() {
                return (jb = m._free = m.asm.O).apply(null, arguments);
              }, rc = m._malloc = function() {
                return (rc = m._malloc = m.asm.P).apply(null, arguments);
              }, ib = m.___getTypeName = function() {
                return (ib = m.___getTypeName = m.asm.Q).apply(null, arguments);
              };
              m.__embind_initialize_bindings = function() {
                return (m.__embind_initialize_bindings = m.asm.R).apply(null, arguments);
              };
              m.dynCall_jiji = function() {
                return (m.dynCall_jiji = m.asm.T).apply(null, arguments);
              };
              var tc;
              Oa = function uc() {
                tc || vc();
                tc || (Oa = uc);
              };
              function vc() {
                function b() {
                  if (!tc && (tc = true, m.calledRun = true, !wa)) {
                    Ta(Ja);
                    aa(m);
                    if (m.onRuntimeInitialized) m.onRuntimeInitialized();
                    if (m.postRun) for ("function" == typeof m.postRun && (m.postRun = [m.postRun]); m.postRun.length; ) {
                      var a = m.postRun.shift();
                      Ka.unshift(a);
                    }
                    Ta(Ka);
                  }
                }
                if (!(0 < Ma)) {
                  if (m.preRun) for ("function" == typeof m.preRun && (m.preRun = [m.preRun]); m.preRun.length; ) La();
                  Ta(Ia);
                  0 < Ma || (m.setStatus ? (m.setStatus("Running..."), setTimeout(function() {
                    setTimeout(function() {
                      m.setStatus("");
                    }, 1);
                    b();
                  }, 1)) : b());
                }
              }
              if (m.preInit) for ("function" == typeof m.preInit && (m.preInit = [m.preInit]); 0 < m.preInit.length; ) m.preInit.pop()();
              vc();
              return Rive2.ready;
            };
          })();
          const __WEBPACK_DEFAULT_EXPORT__ = Rive;
        },
        /* 2 */
        /***/
        (module2) => {
          module2.exports = JSON.parse(`{"name":"@rive-app/canvas","version":"1.0.98","description":"Rive's canvas based web api.","main":"rive.js","homepage":"https://rive.app","repository":{"type":"git","url":"https://github.com/rive-app/rive-wasm/tree/master/js"},"keywords":["rive","animation"],"author":"Rive","contributors":["Luigi Rosso <luigi@rive.app> (https://rive.app)","Maxwell Talbot <max@rive.app> (https://rive.app)","Arthur Vivian <arthur@rive.app> (https://rive.app)","Umberto Sonnino <umberto@rive.app> (https://rive.app)","Matthew Sullivan <matt.j.sullivan@gmail.com> (mailto:matt.j.sullivan@gmail.com)"],"license":"MIT","files":["rive.js","rive.js.map","rive.wasm","rive.d.ts","rive_advanced.mjs.d.ts"],"typings":"rive.d.ts","dependencies":{},"browser":{"fs":false,"path":false}}`);
        },
        /* 3 */
        /***/
        (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
          __webpack_require__2.r(__webpack_exports__2);
          __webpack_require__2.d(__webpack_exports__2, {
            /* harmony export */
            "registerTouchInteractions": () => (
              /* reexport safe */
              _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__.registerTouchInteractions
            )
            /* harmony export */
          });
          var _registerTouchInteractions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__2(4);
        },
        /* 4 */
        /***/
        (__unused_webpack_module, __webpack_exports__2, __webpack_require__2) => {
          __webpack_require__2.r(__webpack_exports__2);
          __webpack_require__2.d(__webpack_exports__2, {
            /* harmony export */
            "registerTouchInteractions": () => (
              /* binding */
              registerTouchInteractions
            )
            /* harmony export */
          });
          const registerTouchInteractions = ({
            canvas,
            artboard,
            stateMachines = [],
            renderer,
            rive,
            fit,
            alignment
          }) => {
            if (!canvas || !stateMachines.length || !renderer || !rive || !artboard) {
              return null;
            }
            const mouseCallback = (event) => {
              const boundingRect = event.currentTarget.getBoundingClientRect();
              const canvasX = event.clientX - boundingRect.left;
              const canvasY = event.clientY - boundingRect.top;
              const forwardMatrix = rive.computeAlignment(
                fit,
                alignment,
                {
                  minX: 0,
                  minY: 0,
                  maxX: boundingRect.width,
                  maxY: boundingRect.height
                },
                artboard.bounds
              );
              let invertedMatrix = new rive.Mat2D();
              forwardMatrix.invert(invertedMatrix);
              const canvasCoordinatesVector = new rive.Vec2D(canvasX, canvasY);
              const transformedVector = rive.mapXY(
                invertedMatrix,
                canvasCoordinatesVector
              );
              const transformedX = transformedVector.x();
              const transformedY = transformedVector.y();
              transformedVector.delete();
              invertedMatrix.delete();
              canvasCoordinatesVector.delete();
              forwardMatrix.delete();
              switch (event.type) {
                // Pointer moving/hovering on the canvas
                case "mouseover":
                case "mouseout":
                case "mousemove": {
                  for (const stateMachine of stateMachines) {
                    stateMachine.pointerMove(transformedX, transformedY);
                  }
                  break;
                }
                // Pointer click initiated but not released yet on the canvas
                case "mousedown": {
                  for (const stateMachine of stateMachines) {
                    stateMachine.pointerDown(transformedX, transformedY);
                  }
                  break;
                }
                // Pointer click released on the canvas
                case "mouseup": {
                  for (const stateMachine of stateMachines) {
                    stateMachine.pointerUp(transformedX, transformedY);
                  }
                  break;
                }
                default:
              }
            };
            const callback = mouseCallback.bind(void 0);
            canvas.addEventListener("mouseover", callback);
            canvas.addEventListener("mouseout", callback);
            canvas.addEventListener("mousemove", callback);
            canvas.addEventListener("mousedown", callback);
            canvas.addEventListener("mouseup", callback);
            return () => {
              canvas.removeEventListener("mouseover", callback);
              canvas.removeEventListener("mouseout", callback);
              canvas.removeEventListener("mousemove", callback);
              canvas.removeEventListener("mousedown", callback);
              canvas.removeEventListener("mouseup", callback);
            };
          };
        }
        /******/
      ];
      var __webpack_module_cache__ = {};
      function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== void 0) {
          return cachedModule.exports;
        }
        var module2 = __webpack_module_cache__[moduleId] = {
          /******/
          // no module.id needed
          /******/
          // no module.loaded needed
          /******/
          exports: {}
          /******/
        };
        __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
        return module2.exports;
      }
      (() => {
        __webpack_require__.d = (exports2, definition) => {
          for (var key2 in definition) {
            if (__webpack_require__.o(definition, key2) && !__webpack_require__.o(exports2, key2)) {
              Object.defineProperty(exports2, key2, { enumerable: true, get: definition[key2] });
            }
          }
        };
      })();
      (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
      })();
      (() => {
        __webpack_require__.r = (exports2) => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
          }
          Object.defineProperty(exports2, "__esModule", { value: true });
        };
      })();
      var __webpack_exports__ = {};
      (() => {
        __webpack_require__.r(__webpack_exports__);
        __webpack_require__.d(__webpack_exports__, {
          /* harmony export */
          "Fit": () => (
            /* binding */
            Fit
          ),
          /* harmony export */
          "Alignment": () => (
            /* binding */
            Alignment
          ),
          /* harmony export */
          "Layout": () => (
            /* binding */
            Layout
          ),
          /* harmony export */
          "RuntimeLoader": () => (
            /* binding */
            RuntimeLoader
          ),
          /* harmony export */
          "StateMachineInputType": () => (
            /* binding */
            StateMachineInputType
          ),
          /* harmony export */
          "StateMachineInput": () => (
            /* binding */
            StateMachineInput
          ),
          /* harmony export */
          "EventType": () => (
            /* binding */
            EventType
          ),
          /* harmony export */
          "LoopType": () => (
            /* binding */
            LoopType
          ),
          /* harmony export */
          "Rive": () => (
            /* binding */
            Rive
          ),
          /* harmony export */
          "Testing": () => (
            /* binding */
            Testing
          )
          /* harmony export */
        });
        var _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
        var package_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
        var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
        var __awaiter = function(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e2) {
                reject(e2);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e2) {
                reject(e2);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        };
        var __generator = function(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t2[0] & 1) throw t2[1];
            return t2[1];
          }, trys: [], ops: [] }, f, y, t2, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
              if (f = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done) return t2;
              if (y = 0, t2) op = [op[0] & 2, t2.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t2 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t2[1]) {
                    _.label = t2[1];
                    t2 = op;
                    break;
                  }
                  if (t2 && _.label < t2[2]) {
                    _.label = t2[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t2[2]) _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f = t2 = 0;
            }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        };
        var Fit;
        (function(Fit2) {
          Fit2["Cover"] = "cover";
          Fit2["Contain"] = "contain";
          Fit2["Fill"] = "fill";
          Fit2["FitWidth"] = "fitWidth";
          Fit2["FitHeight"] = "fitHeight";
          Fit2["None"] = "none";
          Fit2["ScaleDown"] = "scaleDown";
        })(Fit || (Fit = {}));
        var Alignment;
        (function(Alignment2) {
          Alignment2["Center"] = "center";
          Alignment2["TopLeft"] = "topLeft";
          Alignment2["TopCenter"] = "topCenter";
          Alignment2["TopRight"] = "topRight";
          Alignment2["CenterLeft"] = "centerLeft";
          Alignment2["CenterRight"] = "centerRight";
          Alignment2["BottomLeft"] = "bottomLeft";
          Alignment2["BottomCenter"] = "bottomCenter";
          Alignment2["BottomRight"] = "bottomRight";
        })(Alignment || (Alignment = {}));
        var Layout = (
          /** @class */
          function() {
            function Layout2(params) {
              var _a, _b, _c, _d, _e, _f;
              this.fit = (_a = params === null || params === void 0 ? void 0 : params.fit) !== null && _a !== void 0 ? _a : Fit.Contain;
              this.alignment = (_b = params === null || params === void 0 ? void 0 : params.alignment) !== null && _b !== void 0 ? _b : Alignment.Center;
              this.minX = (_c = params === null || params === void 0 ? void 0 : params.minX) !== null && _c !== void 0 ? _c : 0;
              this.minY = (_d = params === null || params === void 0 ? void 0 : params.minY) !== null && _d !== void 0 ? _d : 0;
              this.maxX = (_e = params === null || params === void 0 ? void 0 : params.maxX) !== null && _e !== void 0 ? _e : 0;
              this.maxY = (_f = params === null || params === void 0 ? void 0 : params.maxY) !== null && _f !== void 0 ? _f : 0;
            }
            Layout2.new = function(_a) {
              var fit = _a.fit, alignment = _a.alignment, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
              console.warn("This function is deprecated: please use `new Layout({})` instead");
              return new Layout2({ fit, alignment, minX, minY, maxX, maxY });
            };
            Layout2.prototype.copyWith = function(_a) {
              var fit = _a.fit, alignment = _a.alignment, minX = _a.minX, minY = _a.minY, maxX = _a.maxX, maxY = _a.maxY;
              return new Layout2({
                fit: fit !== null && fit !== void 0 ? fit : this.fit,
                alignment: alignment !== null && alignment !== void 0 ? alignment : this.alignment,
                minX: minX !== null && minX !== void 0 ? minX : this.minX,
                minY: minY !== null && minY !== void 0 ? minY : this.minY,
                maxX: maxX !== null && maxX !== void 0 ? maxX : this.maxX,
                maxY: maxY !== null && maxY !== void 0 ? maxY : this.maxY
              });
            };
            Layout2.prototype.runtimeFit = function(rive) {
              if (this.cachedRuntimeFit)
                return this.cachedRuntimeFit;
              var fit;
              if (this.fit === Fit.Cover)
                fit = rive.Fit.cover;
              else if (this.fit === Fit.Contain)
                fit = rive.Fit.contain;
              else if (this.fit === Fit.Fill)
                fit = rive.Fit.fill;
              else if (this.fit === Fit.FitWidth)
                fit = rive.Fit.fitWidth;
              else if (this.fit === Fit.FitHeight)
                fit = rive.Fit.fitHeight;
              else if (this.fit === Fit.ScaleDown)
                fit = rive.Fit.scaleDown;
              else
                fit = rive.Fit.none;
              this.cachedRuntimeFit = fit;
              return fit;
            };
            Layout2.prototype.runtimeAlignment = function(rive) {
              if (this.cachedRuntimeAlignment)
                return this.cachedRuntimeAlignment;
              var alignment;
              if (this.alignment === Alignment.TopLeft)
                alignment = rive.Alignment.topLeft;
              else if (this.alignment === Alignment.TopCenter)
                alignment = rive.Alignment.topCenter;
              else if (this.alignment === Alignment.TopRight)
                alignment = rive.Alignment.topRight;
              else if (this.alignment === Alignment.CenterLeft)
                alignment = rive.Alignment.centerLeft;
              else if (this.alignment === Alignment.CenterRight)
                alignment = rive.Alignment.centerRight;
              else if (this.alignment === Alignment.BottomLeft)
                alignment = rive.Alignment.bottomLeft;
              else if (this.alignment === Alignment.BottomCenter)
                alignment = rive.Alignment.bottomCenter;
              else if (this.alignment === Alignment.BottomRight)
                alignment = rive.Alignment.bottomRight;
              else
                alignment = rive.Alignment.center;
              this.cachedRuntimeAlignment = alignment;
              return alignment;
            };
            return Layout2;
          }()
        );
        var RuntimeLoader = (
          /** @class */
          function() {
            function RuntimeLoader2() {
            }
            RuntimeLoader2.loadRuntime = function() {
              _rive_advanced_mjs__WEBPACK_IMPORTED_MODULE_0__.default({
                // Loads Wasm bundle
                locateFile: function() {
                  return RuntimeLoader2.wasmURL;
                }
              }).then(function(rive) {
                var _a;
                RuntimeLoader2.runtime = rive;
                while (RuntimeLoader2.callBackQueue.length > 0) {
                  (_a = RuntimeLoader2.callBackQueue.shift()) === null || _a === void 0 ? void 0 : _a(RuntimeLoader2.runtime);
                }
              });
            };
            RuntimeLoader2.getInstance = function(callback) {
              if (!RuntimeLoader2.isLoading) {
                RuntimeLoader2.isLoading = true;
                RuntimeLoader2.loadRuntime();
              }
              if (!RuntimeLoader2.runtime) {
                RuntimeLoader2.callBackQueue.push(callback);
              } else {
                callback(RuntimeLoader2.runtime);
              }
            };
            RuntimeLoader2.awaitInstance = function() {
              return new Promise(function(resolve) {
                return RuntimeLoader2.getInstance(function(rive) {
                  return resolve(rive);
                });
              });
            };
            RuntimeLoader2.setWasmUrl = function(url) {
              RuntimeLoader2.wasmURL = url;
            };
            RuntimeLoader2.isLoading = false;
            RuntimeLoader2.callBackQueue = [];
            RuntimeLoader2.wasmURL = "https://unpkg.com/" + package_json__WEBPACK_IMPORTED_MODULE_1__.name + "@" + package_json__WEBPACK_IMPORTED_MODULE_1__.version + "/rive.wasm";
            return RuntimeLoader2;
          }()
        );
        var Animation = (
          /** @class */
          function() {
            function Animation2(animation, artboard, runtime, playing) {
              this.animation = animation;
              this.artboard = artboard;
              this.playing = playing;
              this.loopCount = 0;
              this.scrubTo = null;
              this.instance = new runtime.LinearAnimationInstance(animation, artboard);
            }
            Object.defineProperty(Animation2.prototype, "name", {
              // Returns the animation's name
              get: function() {
                return this.animation.name;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Animation2.prototype, "time", {
              // Returns the animation's current time
              get: function() {
                return this.instance.time;
              },
              // Sets the animation's current time
              set: function(value) {
                this.instance.time = value;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Animation2.prototype, "loopValue", {
              // Returns the animation's loop type
              get: function() {
                return this.animation.loopValue;
              },
              enumerable: false,
              configurable: true
            });
            Animation2.prototype.advance = function(time) {
              if (this.scrubTo === null) {
                this.instance.advance(time);
              } else {
                this.instance.time = 0;
                this.instance.advance(this.scrubTo);
                this.scrubTo = null;
              }
            };
            Animation2.prototype.apply = function(mix) {
              this.instance.apply(mix);
            };
            Object.defineProperty(Animation2.prototype, "needsScrub", {
              get: function() {
                return this.scrubTo !== null;
              },
              enumerable: false,
              configurable: true
            });
            Animation2.prototype.cleanup = function() {
              this.instance.delete();
            };
            return Animation2;
          }()
        );
        var StateMachineInputType;
        (function(StateMachineInputType2) {
          StateMachineInputType2[StateMachineInputType2["Number"] = 56] = "Number";
          StateMachineInputType2[StateMachineInputType2["Trigger"] = 58] = "Trigger";
          StateMachineInputType2[StateMachineInputType2["Boolean"] = 59] = "Boolean";
        })(StateMachineInputType || (StateMachineInputType = {}));
        var StateMachineInput = (
          /** @class */
          function() {
            function StateMachineInput2(type, runtimeInput) {
              this.type = type;
              this.runtimeInput = runtimeInput;
            }
            Object.defineProperty(StateMachineInput2.prototype, "name", {
              /**
               * Returns the name of the input
               */
              get: function() {
                return this.runtimeInput.name;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(StateMachineInput2.prototype, "value", {
              /**
               * Returns the current value of the input
               */
              get: function() {
                return this.runtimeInput.value;
              },
              /**
               * Sets the value of the input
               */
              set: function(value) {
                this.runtimeInput.value = value;
              },
              enumerable: false,
              configurable: true
            });
            StateMachineInput2.prototype.fire = function() {
              if (this.type === StateMachineInputType.Trigger) {
                this.runtimeInput.fire();
              }
            };
            return StateMachineInput2;
          }()
        );
        var StateMachine = (
          /** @class */
          function() {
            function StateMachine2(stateMachine, runtime, playing, artboard) {
              this.stateMachine = stateMachine;
              this.playing = playing;
              this.artboard = artboard;
              this.inputs = [];
              this.instance = new runtime.StateMachineInstance(stateMachine, artboard);
              this.initInputs(runtime);
            }
            Object.defineProperty(StateMachine2.prototype, "name", {
              get: function() {
                return this.stateMachine.name;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(StateMachine2.prototype, "statesChanged", {
              /**
               * Returns a list of state names that have changed on this frame
               */
              get: function() {
                var names = [];
                for (var i = 0; i < this.instance.stateChangedCount(); i++) {
                  names.push(this.instance.stateChangedNameByIndex(i));
                }
                return names;
              },
              enumerable: false,
              configurable: true
            });
            StateMachine2.prototype.advance = function(time) {
              this.instance.advance(time);
            };
            StateMachine2.prototype.initInputs = function(runtime) {
              for (var i = 0; i < this.instance.inputCount(); i++) {
                var input = this.instance.input(i);
                this.inputs.push(this.mapRuntimeInput(input, runtime));
              }
            };
            StateMachine2.prototype.mapRuntimeInput = function(input, runtime) {
              if (input.type === runtime.SMIInput.bool) {
                return new StateMachineInput(StateMachineInputType.Boolean, input.asBool());
              } else if (input.type === runtime.SMIInput.number) {
                return new StateMachineInput(StateMachineInputType.Number, input.asNumber());
              } else if (input.type === runtime.SMIInput.trigger) {
                return new StateMachineInput(StateMachineInputType.Trigger, input.asTrigger());
              }
            };
            StateMachine2.prototype.cleanup = function() {
              this.instance.delete();
            };
            return StateMachine2;
          }()
        );
        var Animator = (
          /** @class */
          function() {
            function Animator2(runtime, artboard, eventManager, animations, stateMachines) {
              if (animations === void 0) {
                animations = [];
              }
              if (stateMachines === void 0) {
                stateMachines = [];
              }
              this.runtime = runtime;
              this.artboard = artboard;
              this.eventManager = eventManager;
              this.animations = animations;
              this.stateMachines = stateMachines;
            }
            Animator2.prototype.add = function(animatables, playing, fireEvent) {
              if (fireEvent === void 0) {
                fireEvent = true;
              }
              animatables = mapToStringArray(animatables);
              if (animatables.length === 0) {
                this.animations.forEach(function(a) {
                  return a.playing = playing;
                });
                this.stateMachines.forEach(function(m) {
                  return m.playing = playing;
                });
              } else {
                var instancedAnimationNames = this.animations.map(function(a) {
                  return a.name;
                });
                var instancedMachineNames = this.stateMachines.map(function(m) {
                  return m.name;
                });
                for (var i in animatables) {
                  var aIndex = instancedAnimationNames.indexOf(animatables[i]);
                  var mIndex = instancedMachineNames.indexOf(animatables[i]);
                  if (aIndex >= 0 || mIndex >= 0) {
                    if (aIndex >= 0) {
                      this.animations[aIndex].playing = playing;
                    } else {
                      this.stateMachines[mIndex].playing = playing;
                    }
                  } else {
                    var anim = this.artboard.animationByName(animatables[i]);
                    if (anim) {
                      var newAnimation = new Animation(anim, this.artboard, this.runtime, playing);
                      newAnimation.advance(0);
                      newAnimation.apply(1);
                      this.animations.push(newAnimation);
                    } else {
                      var sm = this.artboard.stateMachineByName(animatables[i]);
                      if (sm) {
                        var newStateMachine = new StateMachine(sm, this.runtime, playing, this.artboard);
                        this.stateMachines.push(newStateMachine);
                      }
                    }
                  }
                }
              }
              if (fireEvent) {
                if (playing) {
                  this.eventManager.fire({
                    type: EventType.Play,
                    data: this.playing
                  });
                } else {
                  this.eventManager.fire({
                    type: EventType.Pause,
                    data: this.paused
                  });
                }
              }
              return playing ? this.playing : this.paused;
            };
            Animator2.prototype.play = function(animatables) {
              return this.add(animatables, true);
            };
            Animator2.prototype.pause = function(animatables) {
              return this.add(animatables, false);
            };
            Animator2.prototype.scrub = function(animatables, value) {
              var forScrubbing = this.animations.filter(function(a) {
                return animatables.includes(a.name);
              });
              forScrubbing.forEach(function(a) {
                return a.scrubTo = value;
              });
              return forScrubbing.map(function(a) {
                return a.name;
              });
            };
            Object.defineProperty(Animator2.prototype, "playing", {
              /**
               * Returns a list of names of all animations and state machines currently
               * playing
               */
              get: function() {
                return this.animations.filter(function(a) {
                  return a.playing;
                }).map(function(a) {
                  return a.name;
                }).concat(this.stateMachines.filter(function(m) {
                  return m.playing;
                }).map(function(m) {
                  return m.name;
                }));
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Animator2.prototype, "paused", {
              /**
               * Returns a list of names of all animations and state machines currently
               * paused
               */
              get: function() {
                return this.animations.filter(function(a) {
                  return !a.playing;
                }).map(function(a) {
                  return a.name;
                }).concat(this.stateMachines.filter(function(m) {
                  return !m.playing;
                }).map(function(m) {
                  return m.name;
                }));
              },
              enumerable: false,
              configurable: true
            });
            Animator2.prototype.stop = function(animatables) {
              var _this = this;
              animatables = mapToStringArray(animatables);
              var removedNames = [];
              if (animatables.length === 0) {
                removedNames = this.animations.map(function(a) {
                  return a.name;
                }).concat(this.stateMachines.map(function(m) {
                  return m.name;
                }));
                this.animations.forEach(function(a) {
                  return a.cleanup();
                });
                this.stateMachines.forEach(function(m) {
                  return m.cleanup();
                });
                this.animations.splice(0, this.animations.length);
                this.stateMachines.splice(0, this.stateMachines.length);
              } else {
                var animationsToRemove = this.animations.filter(function(a) {
                  return animatables.includes(a.name);
                });
                animationsToRemove.forEach(function(a) {
                  a.cleanup();
                  _this.animations.splice(_this.animations.indexOf(a), 1);
                });
                var machinesToRemove = this.stateMachines.filter(function(m) {
                  return animatables.includes(m.name);
                });
                machinesToRemove.forEach(function(m) {
                  m.cleanup();
                  _this.stateMachines.splice(_this.stateMachines.indexOf(m), 1);
                });
                removedNames = animationsToRemove.map(function(a) {
                  return a.name;
                }).concat(machinesToRemove.map(function(m) {
                  return m.name;
                }));
              }
              this.eventManager.fire({
                type: EventType.Stop,
                data: removedNames
              });
              return removedNames;
            };
            Object.defineProperty(Animator2.prototype, "isPlaying", {
              /**
               * Returns true if at least one animation is active
               */
              get: function() {
                return this.animations.reduce(function(acc, curr) {
                  return acc || curr.playing;
                }, false) || this.stateMachines.reduce(function(acc, curr) {
                  return acc || curr.playing;
                }, false);
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Animator2.prototype, "isPaused", {
              /**
               * Returns true if all animations are paused and there's at least one animation
               */
              get: function() {
                return !this.isPlaying && (this.animations.length > 0 || this.stateMachines.length > 0);
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Animator2.prototype, "isStopped", {
              /**
               * Returns true if there are no playing or paused animations/state machines
               */
              get: function() {
                return this.animations.length === 0 && this.stateMachines.length === 0;
              },
              enumerable: false,
              configurable: true
            });
            Animator2.prototype.atLeastOne = function(playing, fireEvent) {
              if (fireEvent === void 0) {
                fireEvent = true;
              }
              var instancedName;
              if (this.animations.length === 0 && this.stateMachines.length === 0) {
                if (this.artboard.animationCount() > 0) {
                  this.add([instancedName = this.artboard.animationByIndex(0).name], playing, fireEvent);
                } else if (this.artboard.stateMachineCount() > 0) {
                  this.add([instancedName = this.artboard.stateMachineByIndex(0).name], playing, fireEvent);
                }
              }
              return instancedName;
            };
            Animator2.prototype.handleLooping = function() {
              for (var _i = 0, _a = this.animations.filter(function(a) {
                return a.playing;
              }); _i < _a.length; _i++) {
                var animation = _a[_i];
                if (animation.loopValue === 0 && animation.loopCount) {
                  animation.loopCount = 0;
                  this.stop(animation.name);
                } else if (animation.loopValue === 1 && animation.loopCount) {
                  this.eventManager.fire({
                    type: EventType.Loop,
                    data: { animation: animation.name, type: LoopType.Loop }
                  });
                  animation.loopCount = 0;
                } else if (animation.loopValue === 2 && animation.loopCount > 1) {
                  this.eventManager.fire({
                    type: EventType.Loop,
                    data: { animation: animation.name, type: LoopType.PingPong }
                  });
                  animation.loopCount = 0;
                }
              }
            };
            Animator2.prototype.handleStateChanges = function() {
              var statesChanged = [];
              for (var _i = 0, _a = this.stateMachines.filter(function(sm) {
                return sm.playing;
              }); _i < _a.length; _i++) {
                var stateMachine = _a[_i];
                statesChanged.push.apply(statesChanged, stateMachine.statesChanged);
              }
              if (statesChanged.length > 0) {
                this.eventManager.fire({
                  type: EventType.StateChange,
                  data: statesChanged
                });
              }
            };
            return Animator2;
          }()
        );
        var EventType;
        (function(EventType2) {
          EventType2["Load"] = "load";
          EventType2["LoadError"] = "loaderror";
          EventType2["Play"] = "play";
          EventType2["Pause"] = "pause";
          EventType2["Stop"] = "stop";
          EventType2["Loop"] = "loop";
          EventType2["Draw"] = "draw";
          EventType2["StateChange"] = "statechange";
        })(EventType || (EventType = {}));
        var LoopType;
        (function(LoopType2) {
          LoopType2["OneShot"] = "oneshot";
          LoopType2["Loop"] = "loop";
          LoopType2["PingPong"] = "pingpong";
        })(LoopType || (LoopType = {}));
        var EventManager = (
          /** @class */
          function() {
            function EventManager2(listeners2) {
              if (listeners2 === void 0) {
                listeners2 = [];
              }
              this.listeners = listeners2;
            }
            EventManager2.prototype.getListeners = function(type) {
              return this.listeners.filter(function(e2) {
                return e2.type === type;
              });
            };
            EventManager2.prototype.add = function(listener) {
              if (!this.listeners.includes(listener)) {
                this.listeners.push(listener);
              }
            };
            EventManager2.prototype.remove = function(listener) {
              for (var i = 0; i < this.listeners.length; i++) {
                var currentListener = this.listeners[i];
                if (currentListener.type === listener.type) {
                  if (currentListener.callback === listener.callback) {
                    this.listeners.splice(i, 1);
                    break;
                  }
                }
              }
            };
            EventManager2.prototype.removeAll = function(type) {
              var _this = this;
              if (!type) {
                this.listeners.splice(0, this.listeners.length);
              } else {
                this.listeners.filter(function(l) {
                  return l.type === type;
                }).forEach(function(l) {
                  return _this.remove(l);
                });
              }
            };
            EventManager2.prototype.fire = function(event) {
              var eventListeners = this.getListeners(event.type);
              eventListeners.forEach(function(listener) {
                return listener.callback(event);
              });
            };
            return EventManager2;
          }()
        );
        var TaskQueueManager = (
          /** @class */
          function() {
            function TaskQueueManager2(eventManager) {
              this.eventManager = eventManager;
              this.queue = [];
            }
            TaskQueueManager2.prototype.add = function(task) {
              this.queue.push(task);
            };
            TaskQueueManager2.prototype.process = function() {
              while (this.queue.length > 0) {
                var task = this.queue.shift();
                if (task === null || task === void 0 ? void 0 : task.action) {
                  task.action();
                }
                if (task === null || task === void 0 ? void 0 : task.event) {
                  this.eventManager.fire(task.event);
                }
              }
            };
            return TaskQueueManager2;
          }()
        );
        var Rive = (
          /** @class */
          function() {
            function Rive2(params) {
              var _a;
              this._updateLayout = true;
              this.isRendererActive = true;
              this.loaded = false;
              this.readyForPlaying = false;
              this.artboard = null;
              this.eventCleanup = null;
              this.durations = [];
              this.frameTimes = [];
              this.frameCount = 0;
              this.renderSecondTimer = 0;
              this.canvas = params.canvas;
              this.src = params.src;
              this.buffer = params.buffer;
              this.layout = (_a = params.layout) !== null && _a !== void 0 ? _a : new Layout();
              this.eventManager = new EventManager();
              if (params.onLoad)
                this.on(EventType.Load, params.onLoad);
              if (params.onLoadError)
                this.on(EventType.LoadError, params.onLoadError);
              if (params.onPlay)
                this.on(EventType.Play, params.onPlay);
              if (params.onPause)
                this.on(EventType.Pause, params.onPause);
              if (params.onStop)
                this.on(EventType.Stop, params.onStop);
              if (params.onLoop)
                this.on(EventType.Loop, params.onLoop);
              if (params.onStateChange)
                this.on(EventType.StateChange, params.onStateChange);
              if (params.onload && !params.onLoad)
                this.on(EventType.Load, params.onload);
              if (params.onloaderror && !params.onLoadError)
                this.on(EventType.LoadError, params.onloaderror);
              if (params.onplay && !params.onPlay)
                this.on(EventType.Play, params.onplay);
              if (params.onpause && !params.onPause)
                this.on(EventType.Pause, params.onpause);
              if (params.onstop && !params.onStop)
                this.on(EventType.Stop, params.onstop);
              if (params.onloop && !params.onLoop)
                this.on(EventType.Loop, params.onloop);
              if (params.onstatechange && !params.onStateChange)
                this.on(EventType.StateChange, params.onstatechange);
              this.taskQueue = new TaskQueueManager(this.eventManager);
              this.init({
                src: this.src,
                buffer: this.buffer,
                autoplay: params.autoplay,
                animations: params.animations,
                stateMachines: params.stateMachines,
                artboard: params.artboard,
                useOffscreenRenderer: params.useOffscreenRenderer
              });
            }
            Rive2.new = function(params) {
              console.warn("This function is deprecated: please use `new Rive({})` instead");
              return new Rive2(params);
            };
            Rive2.prototype.init = function(_a) {
              var _this = this;
              var src = _a.src, buffer = _a.buffer, animations = _a.animations, stateMachines = _a.stateMachines, artboard = _a.artboard, _b = _a.autoplay, autoplay = _b === void 0 ? false : _b, _c = _a.useOffscreenRenderer, useOffscreenRenderer = _c === void 0 ? false : _c;
              this.src = src;
              this.buffer = buffer;
              if (!this.src && !this.buffer) {
                throw new Error(Rive2.missingErrorMessage);
              }
              var startingAnimationNames = mapToStringArray(animations);
              var startingStateMachineNames = mapToStringArray(stateMachines);
              this.loaded = false;
              this.readyForPlaying = false;
              RuntimeLoader.awaitInstance().then(function(runtime) {
                _this.runtime = runtime;
                _this.renderer = _this.runtime.makeRenderer(_this.canvas, useOffscreenRenderer);
                if (!(_this.canvas.width || _this.canvas.height)) {
                  _this.resizeDrawingSurfaceToCanvas();
                }
                _this.initData(artboard, startingAnimationNames, startingStateMachineNames, autoplay).then(function() {
                  var activeStateMachineInstances = (_this.animator.stateMachines || []).filter(function(sm) {
                    return sm.playing;
                  }).map(function(sm) {
                    return sm.instance;
                  });
                  _this.eventCleanup = (0, _utils__WEBPACK_IMPORTED_MODULE_2__.registerTouchInteractions)({
                    canvas: _this.canvas,
                    artboard: _this.artboard,
                    stateMachines: activeStateMachineInstances,
                    renderer: _this.renderer,
                    rive: _this.runtime,
                    fit: _this._layout.runtimeFit(_this.runtime),
                    alignment: _this._layout.runtimeAlignment(_this.runtime)
                  });
                }).catch(function(e2) {
                  console.error(e2);
                });
              }).catch(function(e2) {
                console.error(e2);
              });
            };
            Rive2.prototype.initData = function(artboardName, animationNames, stateMachineNames, autoplay) {
              var _a;
              return __awaiter(this, void 0, void 0, function() {
                var _b, _c, msg;
                return __generator(this, function(_d) {
                  switch (_d.label) {
                    case 0:
                      if (!this.src) return [3, 2];
                      _b = this;
                      return [4, loadRiveFile(this.src)];
                    case 1:
                      _b.buffer = _d.sent();
                      _d.label = 2;
                    case 2:
                      _c = this;
                      return [4, this.runtime.load(new Uint8Array(this.buffer))];
                    case 3:
                      _c.file = _d.sent();
                      if (this.file) {
                        this.initArtboard(artboardName, animationNames, stateMachineNames, autoplay);
                        this.loaded = true;
                        this.eventManager.fire({
                          type: EventType.Load,
                          data: (_a = this.src) !== null && _a !== void 0 ? _a : "buffer"
                        });
                        this.readyForPlaying = true;
                        this.taskQueue.process();
                        this.drawFrame();
                        return [2, Promise.resolve()];
                      } else {
                        msg = "Problem loading file; may be corrupt!";
                        console.warn(msg);
                        this.eventManager.fire({ type: EventType.LoadError, data: msg });
                        return [2, Promise.reject(msg)];
                      }
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            Rive2.prototype.initArtboard = function(artboardName, animationNames, stateMachineNames, autoplay) {
              var rootArtboard = artboardName ? this.file.artboardByName(artboardName) : this.file.defaultArtboard();
              if (!rootArtboard) {
                var msg = "Invalid artboard name or no default artboard";
                console.warn(msg);
                this.eventManager.fire({ type: EventType.LoadError, data: msg });
                return;
              }
              this.artboard = rootArtboard;
              if (this.artboard.animationCount() < 1) {
                var msg = "Artboard has no animations";
                this.eventManager.fire({ type: EventType.LoadError, data: msg });
                throw msg;
              }
              this.animator = new Animator(this.runtime, this.artboard, this.eventManager);
              var instanceNames;
              if (animationNames.length > 0 || stateMachineNames.length > 0) {
                instanceNames = animationNames.concat(stateMachineNames);
                this.animator.add(instanceNames, autoplay, false);
              } else {
                instanceNames = [this.animator.atLeastOne(autoplay, false)];
              }
              this.taskQueue.add({
                event: {
                  type: autoplay ? EventType.Play : EventType.Pause,
                  data: instanceNames
                }
              });
            };
            Rive2.prototype.drawFrame = function() {
              this.startRendering();
            };
            Rive2.prototype.draw = function(time, onSecond) {
              var before = performance.now();
              this.frameRequestId = null;
              if (!this.lastRenderTime) {
                this.lastRenderTime = time;
              }
              this.renderSecondTimer += time - this.lastRenderTime;
              if (this.renderSecondTimer > 5e3) {
                this.renderSecondTimer = 0;
                onSecond === null || onSecond === void 0 ? void 0 : onSecond();
              }
              var elapsedTime = (time - this.lastRenderTime) / 1e3;
              this.lastRenderTime = time;
              var activeAnimations = this.animator.animations.filter(function(a) {
                return a.playing || a.needsScrub;
              }).sort(function(first) {
                return first.needsScrub ? -1 : 1;
              });
              for (var _i = 0, activeAnimations_1 = activeAnimations; _i < activeAnimations_1.length; _i++) {
                var animation = activeAnimations_1[_i];
                animation.advance(elapsedTime);
                if (animation.instance.didLoop) {
                  animation.loopCount += 1;
                }
                animation.apply(1);
              }
              var activeStateMachines = this.animator.stateMachines.filter(function(a) {
                return a.playing;
              });
              for (var _a = 0, activeStateMachines_1 = activeStateMachines; _a < activeStateMachines_1.length; _a++) {
                var stateMachine = activeStateMachines_1[_a];
                stateMachine.advance(elapsedTime);
              }
              this.artboard.advance(elapsedTime);
              var renderer = this.renderer;
              renderer.clear();
              renderer.save();
              this.alignRenderer();
              this.artboard.draw(renderer);
              renderer.restore();
              renderer.flush();
              this.animator.handleLooping();
              this.animator.handleStateChanges();
              this.frameCount++;
              var after = performance.now();
              this.frameTimes.push(after);
              this.durations.push(after - before);
              while (this.frameTimes[0] <= after - 1e3) {
                this.frameTimes.shift();
                this.durations.shift();
              }
              if (this.animator.isPlaying) {
                this.startRendering();
              } else if (this.animator.isPaused) {
                this.lastRenderTime = 0;
              } else if (this.animator.isStopped) {
                this.lastRenderTime = 0;
              }
            };
            Rive2.prototype.alignRenderer = function() {
              var _a = this, renderer = _a.renderer, runtime = _a.runtime, _layout = _a._layout, artboard = _a.artboard;
              renderer.align(_layout.runtimeFit(runtime), _layout.runtimeAlignment(runtime), {
                minX: _layout.minX,
                minY: _layout.minY,
                maxX: _layout.maxX,
                maxY: _layout.maxY
              }, artboard.bounds);
            };
            Object.defineProperty(Rive2.prototype, "fps", {
              get: function() {
                return this.durations.length;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "frameTime", {
              get: function() {
                if (this.durations.length === 0) {
                  return 0;
                }
                return (this.durations.reduce(function(a, b) {
                  return a + b;
                }, 0) / this.durations.length).toFixed(4);
              },
              enumerable: false,
              configurable: true
            });
            Rive2.prototype.cleanup = function() {
              this.stopRendering();
              this.cleanupInstances();
              this.renderer.delete();
              this.file.delete();
            };
            Rive2.prototype.cleanupInstances = function() {
              if (this.eventCleanup !== null) {
                this.eventCleanup();
              }
              this.stop();
              if (this.artboard) {
                this.artboard.delete();
                this.artboard = null;
              }
            };
            Rive2.prototype.play = function(animationNames, autoplay) {
              var _this = this;
              animationNames = mapToStringArray(animationNames);
              if (!this.readyForPlaying) {
                this.taskQueue.add({
                  action: function() {
                    return _this.play(animationNames, autoplay);
                  }
                });
                return;
              }
              this.animator.play(animationNames);
              this.startRendering();
            };
            Rive2.prototype.pause = function(animationNames) {
              var _this = this;
              animationNames = mapToStringArray(animationNames);
              if (!this.readyForPlaying) {
                this.taskQueue.add({
                  action: function() {
                    return _this.pause(animationNames);
                  }
                });
                return;
              }
              this.animator.pause(animationNames);
            };
            Rive2.prototype.scrub = function(animationNames, value) {
              var _this = this;
              animationNames = mapToStringArray(animationNames);
              if (!this.readyForPlaying) {
                this.taskQueue.add({
                  action: function() {
                    return _this.scrub(animationNames, value);
                  }
                });
                return;
              }
              this.animator.scrub(animationNames, value || 0);
              this.drawFrame();
            };
            Rive2.prototype.stop = function(animationNames) {
              var _this = this;
              animationNames = mapToStringArray(animationNames);
              if (!this.readyForPlaying) {
                this.taskQueue.add({
                  action: function() {
                    return _this.stop(animationNames);
                  }
                });
                return;
              }
              this.animator.stop(animationNames);
            };
            Rive2.prototype.reset = function(params) {
              var _a;
              var artBoardName = params === null || params === void 0 ? void 0 : params.artboard;
              var animationNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.animations);
              var stateMachineNames = mapToStringArray(params === null || params === void 0 ? void 0 : params.stateMachines);
              var autoplay = (_a = params === null || params === void 0 ? void 0 : params.autoplay) !== null && _a !== void 0 ? _a : false;
              this.cleanupInstances();
              this.initArtboard(artBoardName, animationNames, stateMachineNames, autoplay);
              this.taskQueue.process();
            };
            Rive2.prototype.load = function(params) {
              this.stop();
              this.init(params);
            };
            Object.defineProperty(Rive2.prototype, "layout", {
              /**
               * Returns the current layout. Note that layout should be treated as
               * immutable. If you want to change the layout, create a new one use the
               * layout setter
               */
              get: function() {
                return this._layout;
              },
              // Sets a new layout
              set: function(layout) {
                this._layout = layout;
                if (!layout.maxX || !layout.maxY) {
                  this.resizeToCanvas();
                }
                if (this.loaded && !this.animator.isPlaying) {
                  this.drawFrame();
                }
              },
              enumerable: false,
              configurable: true
            });
            Rive2.prototype.resizeToCanvas = function() {
              this._layout = this.layout.copyWith({
                minX: 0,
                minY: 0,
                maxX: this.canvas.width,
                maxY: this.canvas.height
              });
            };
            Rive2.prototype.resizeDrawingSurfaceToCanvas = function() {
              if (this.canvas instanceof HTMLCanvasElement && !!window) {
                var _a = this.canvas.getBoundingClientRect(), width = _a.width, height2 = _a.height;
                var dpr = window.devicePixelRatio || 1;
                this.canvas.width = dpr * width;
                this.canvas.height = dpr * height2;
                this.startRendering();
                this.resizeToCanvas();
              }
            };
            Object.defineProperty(Rive2.prototype, "source", {
              // Returns the animation source, which may be undefined
              get: function() {
                return this.src;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "activeArtboard", {
              /**
               * Returns the name of the active artboard
               */
              get: function() {
                return this.artboard ? this.artboard.name : "";
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "animationNames", {
              // Returns a list of animation names on the chosen artboard
              get: function() {
                if (!this.loaded) {
                  return [];
                }
                var animationNames = [];
                for (var i = 0; i < this.artboard.animationCount(); i++) {
                  animationNames.push(this.artboard.animationByIndex(i).name);
                }
                return animationNames;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "stateMachineNames", {
              /**
               * Returns a list of state machine names from the current artboard
               */
              get: function() {
                if (!this.loaded) {
                  return [];
                }
                var stateMachineNames = [];
                for (var i = 0; i < this.artboard.stateMachineCount(); i++) {
                  stateMachineNames.push(this.artboard.stateMachineByIndex(i).name);
                }
                return stateMachineNames;
              },
              enumerable: false,
              configurable: true
            });
            Rive2.prototype.stateMachineInputs = function(name) {
              if (!this.loaded) {
                return;
              }
              var stateMachine = this.animator.stateMachines.find(function(m) {
                return m.name === name;
              });
              return stateMachine === null || stateMachine === void 0 ? void 0 : stateMachine.inputs;
            };
            Object.defineProperty(Rive2.prototype, "playingStateMachineNames", {
              // Returns a list of playing machine names
              get: function() {
                if (!this.loaded) {
                  return [];
                }
                return this.animator.stateMachines.filter(function(m) {
                  return m.playing;
                }).map(function(m) {
                  return m.name;
                });
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "playingAnimationNames", {
              // Returns a list of playing animation names
              get: function() {
                if (!this.loaded) {
                  return [];
                }
                return this.animator.animations.filter(function(a) {
                  return a.playing;
                }).map(function(a) {
                  return a.name;
                });
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "pausedAnimationNames", {
              // Returns a list of paused animation names
              get: function() {
                if (!this.loaded) {
                  return [];
                }
                return this.animator.animations.filter(function(a) {
                  return !a.playing;
                }).map(function(a) {
                  return a.name;
                });
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "pausedStateMachineNames", {
              /**
               *  Returns a list of paused machine names
               * @returns a list of state machine names that are paused
               */
              get: function() {
                if (!this.loaded) {
                  return [];
                }
                return this.animator.stateMachines.filter(function(m) {
                  return !m.playing;
                }).map(function(m) {
                  return m.name;
                });
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "isPlaying", {
              /**
               * @returns true if any animation is playing
               */
              get: function() {
                return this.animator.isPlaying;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "isPaused", {
              /**
               * @returns true if all instanced animations are paused
               */
              get: function() {
                return this.animator.isPaused;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "isStopped", {
              /**
               * @returns true if no animations are playing or paused
               */
              get: function() {
                return this.animator.isStopped;
              },
              enumerable: false,
              configurable: true
            });
            Object.defineProperty(Rive2.prototype, "bounds", {
              /**
               * @returns the bounds of the current artboard, or undefined if the artboard
               * isn't loaded yet.
               */
              get: function() {
                return this.artboard ? this.artboard.bounds : void 0;
              },
              enumerable: false,
              configurable: true
            });
            Rive2.prototype.on = function(type, callback) {
              this.eventManager.add({
                type,
                callback
              });
            };
            Rive2.prototype.unsubscribe = function(type, callback) {
              this.eventManager.remove({
                type,
                callback
              });
            };
            Rive2.prototype.unsubscribeAll = function(type) {
              this.eventManager.removeAll(type);
            };
            Rive2.prototype.stopRendering = function() {
              if (this.loaded && this.frameRequestId) {
                if (this.runtime.cancelAnimationFrame) {
                  this.runtime.cancelAnimationFrame(this.frameRequestId);
                } else {
                  cancelAnimationFrame(this.frameRequestId);
                }
                this.frameRequestId = null;
              }
            };
            Rive2.prototype.startRendering = function() {
              if (this.loaded && this.artboard && !this.frameRequestId) {
                if (this.runtime.requestAnimationFrame) {
                  this.frameRequestId = this.runtime.requestAnimationFrame(this.draw.bind(this));
                } else {
                  this.frameRequestId = requestAnimationFrame(this.draw.bind(this));
                }
              }
            };
            Rive2.prototype.enableFPSCounter = function(fpsCallback) {
              this.runtime.enableFPSCounter(fpsCallback);
            };
            Rive2.prototype.disableFPSCounter = function() {
              this.runtime.disableFPSCounter();
            };
            Object.defineProperty(Rive2.prototype, "contents", {
              /**
               * Returns the contents of a Rive file: the artboards, animations, and state machines
               */
              get: function() {
                if (!this.loaded) {
                  return void 0;
                }
                var riveContents = {
                  artboards: []
                };
                for (var i = 0; i < this.file.artboardCount(); i++) {
                  var artboard = this.file.artboardByIndex(i);
                  var artboardContents = {
                    name: artboard.name,
                    animations: [],
                    stateMachines: []
                  };
                  for (var j = 0; j < artboard.animationCount(); j++) {
                    var animation = artboard.animationByIndex(j);
                    artboardContents.animations.push(animation.name);
                  }
                  for (var k = 0; k < artboard.stateMachineCount(); k++) {
                    var stateMachine = artboard.stateMachineByIndex(k);
                    var name_1 = stateMachine.name;
                    var instance = new this.runtime.StateMachineInstance(stateMachine, artboard);
                    var inputContents = [];
                    for (var l = 0; l < instance.inputCount(); l++) {
                      var input = instance.input(l);
                      inputContents.push({ name: input.name, type: input.type });
                    }
                    artboardContents.stateMachines.push({
                      name: name_1,
                      inputs: inputContents
                    });
                  }
                  riveContents.artboards.push(artboardContents);
                }
                return riveContents;
              },
              enumerable: false,
              configurable: true
            });
            Rive2.missingErrorMessage = "Rive source file or data buffer required";
            return Rive2;
          }()
        );
        var loadRiveFile = function(src) {
          return __awaiter(void 0, void 0, void 0, function() {
            var req, res, buffer;
            return __generator(this, function(_a) {
              switch (_a.label) {
                case 0:
                  req = new Request(src);
                  return [4, fetch(req)];
                case 1:
                  res = _a.sent();
                  return [4, res.arrayBuffer()];
                case 2:
                  buffer = _a.sent();
                  return [2, buffer];
              }
            });
          });
        };
        var mapToStringArray = function(obj) {
          if (typeof obj === "string") {
            return [obj];
          } else if (obj instanceof Array) {
            return obj;
          }
          return [];
        };
        var Testing = {
          EventManager,
          TaskQueueManager
        };
      })();
      return __webpack_exports__;
    })()
  );
});
var rive_default = module.exports;

// face_server/helpers/face.js
var { html: html3 } = await Promise.resolve().then(() => (init_deno(), deno_exports));
var Face = ({ height: height2 = 500, width = 500, style, ...other }) => {
  let inputs;
  const canvas = html3`<canvas width="${width}" height="${height2}" style=${style} class=${other.class}></canvas>`;
  canvas.style.backgroundColor = "#4b5e6b";
  const uint8ArrayForRobotEyesRiv = stringToBytes2('RIVE\x07\0e@%&\'Ul\0\b\0\0\0\0\bA\0rtboard\0\x07\0\0D\b\0\0\0Dl\0\0\b)root\0\0Z\0\0C [\0\0C\0)\bEyes\0\0\0@?\0\0@?Y\x1BS$"B\0)\bLeft Eye\0YOPB\0Z\0\0pB[\0\0#c5\0\r,F@WN?\\<\0\x07%r"\0 \0\0\0\0HB \0\x008AT\0\0\f\0\0U\0\0\0\0\0V[I?W\0\0pA\0\0na8A\0\0HBT[I@U\0\0pAV\0\0\0\0W\0\0\0\0\0\0\0\0\x008A\0\0HBT\0\0\0\0U\0\0\0\0Vl@"4WIn%A\0\0\0\0HB\0\x008@AT[I?U5J!yAV\0\0\0\0W\0\0\0\0\0\0\0\0\0HB\0\x008A T\0\0\0\0U\0\0\0\0\0V[IP?WFnA\0\b\0\x008@A\0\0HBT\0\0\0\0\0UF@nAV\0\0\0\0\0W\0\0\0\0\0\0\0\x008A`\0\0HBT\0\0\0\0\0U\0\0\0\0\0V[I@WFnA\0\0\0HB \0\x008AT[$I?UFnAV\0\0\0\0W\0\0\0\0\0\0)	\0Right E\0yeYOP\0BZ\0\0pB@\0	Rec\0tangle\0\r,F@W?\\<\0 \0\0\0\0HB\0\x008AT\0\0\0\0U\0\0\0\0V\0[I?WFMnA\0\0\0\x008A\0\0\fHBT[I@\nUFnAV\0\0\0\0W\0\0\0\0\0\0\0\0\x008A\0\0HBT\0\0\0\0U\0\0\0\0V\0\0\0\0\0WFnA\0\0\0\0HB\0\x008A`T[I?UFnAV\0\0\0\0W\0\0\0\0\0\0\0\0H\0B\0\x008AT\0\0\0\0U\0\0\0\0\0V[I?(WFnA\0\0\x008A \0\0HBT\0\0\0\0\0UFn AV\0\0\0\0W\0\0\0\0\0\0\0\0\x008A0\0\0HBT\0\0\0\0\0U\0\0\0\0\0V[I@WFnA\0\0\0HB\0\x008AT[IR?UFnAV\b\0\0\0\0W\0\0\0\0\0\0%\0r"\0\v%k^K\0 \0\0\0\0\0?\x00333?@k`Q>Afff>#B\0\0@?\0\b\07\nnoE\0yeShake\x009A;\07	eyesS\0hake9*;\0\03\0\x005Z\0DE\0F\0\0pB\0 CDE\0F\0\0tB\0C\nDEF\0\0\0pB\0C\bDEF\0\0\0lB\0CDEF\0\0\0tB\0CDEF\0\0l\0B\0CDEF\0\0hB@\0C#DE\0F\0\0lB\0 C(DE\0F\0\0tB\05[\0DE\0\0CD\0EF\0\0\0? \0C\nDE\0F\0\0\0?\0CDE\0F\0\0\0?\0CDEF\0\0\0\0?\0CDEF\0\0\0\0?\0CDEF\0\0\0\0?\0C#DEF\0\0\0@?\0C(D\0EF\0\0\0? \03\05\0Z\0DE\0F\0\0pB\0\0CDEF\0\0\0lB\0C\0\nDEF\0\0\0pB\0C\0DEF\0\0\0tB\0CD\0EF\0\0p\0B\0CD\0EF\0\0tB\0\0CDE\0F\0\0|B\0\0C#DE\0F\0\0pB\0\0C(DEF\0\0\0hB\05\0[\0DE\0F\0#c5\0CDEF\0\0\0\0?\0C\b\nDEF\0\0\0\0?\0C\0DEF\0\0\0\0?\0CD\0EF\0\0\0\0?\0CDEF\0\0\0?\0\0CDE\0F\0\0\0?\0 C#DE\0F\0\0\0?\0\0C(DEF\0\0\0\0?\07\bscared\0EyeShap\0e\03\0\x005\0DE\0 F\0\0\0?\0C\x07DE \0Ffff?\0\x003\05\r\0\0DE \0\x005\0DE\0 \05\0\0DE F\0\0\0\0?\05\0DE F\0\0\0\0?\03\05\0D\0E F\0\0\0@?\0C\x07D\0E Ffff?\0\03\05\0\r\0DE \0Fx$v7\05\0DE\0 \05\0\0DE F\0\0\0\0?\05\0DE F\0\0\0\0?\03\05\0D\0F\x008A\0C\x07DF\0\x008A\05\0DF~`GB\0C\x07DFJ`2B\0(5T\0D\0\0C\x07D\0\05U\0D\0F\0\0 @\0C\x07DF\0\0\0 @\05V\0D\0C\x07\0D\05W\0\0DFFn A\0C\x07D\0FFnA\03\05\0\0DF\0H\0B\0C\x07D\0F\0HB\0\x005\0DF\0}7A\0C\x07DF@\rpA\05T\0DF[I?h\0C\x07DF\0[I?\05\rU\0DFF\0nA\0C\x07DFFnA\05V\0D\0\0C\x07D\0\05W\0D\0\0C\x07D\0\03\05\0\0DF@GB\0C\x07DF\0\0HB@\05\0D\0Fy7A\0<C\x07DFr@.4@\05T\0DFS I?\0C\x07DFSI?\05U\0D\0F#kE@\0\0C\x07DF#k\0E@\05V\0\0DF[IP?\0C\x07DF[I?\05W\0DF\0GnA\0C\x07DFFn A\03\0\x005\0DF\0}7A\0C\x07DF7pA\05\0DF}GBX\0C\x07DF\0^B\05\vT\0DF\\@I@\0C\x07\0DFs\b8@\0\05U\0D\0FGnA\0\bC\x07DF\v\0JwA\05V\0\0DFy`\'5\0C\x07DFz\'>\x0005W\0D\0F\\[(@\0\bC\x07DF(6\0A\03\0\05\0D\0F\0\0HB\0\0C\x07DF\0\0\0HB\05\0\0DF\0\x008@A\0C\x07D\0F\0\x008A\0\b5T\0D\0\0C\x07D\0\x005U\0D\0\0C\x07D\0\x005V\0DF\0[I?\0C\x07DF[IP?\05W\0\0DFFnA\0C\x07DF\0FnA\03\05\0\0DF\0\x008A \0C\x07DF\0\0\x008A\05\0DF\0\0\0HB\0C\x07\0DF\0\0HB\0\05T\0D\0\0C\x07D\0\05U\0D\0FFnA\0\bC\x07DFF\0nA\05V\0D\0C\0\x07D\05W\0\0D\0C\0\x07D\03\0\05\0D\0F\0\x008A\x000C\x07DF\0\0\x008A\05\0DF\0\0\0HB\0C\x07D\0F\0\0HB\0\05T\0D\0\0C\x07D\0\05U\0D\0\0C\x07D\0\05V\0D\0F[I@\0C\x07DF[ I@\05W\0\0DFFn A\0C\x07D\0FFnA\03\05\0\0DF\0\0H\0B\0C\x07DF\0\0HB\05\0DF\0\0\x008A\0C\x07DF\0\x008@A\05T\0\0DF[I?(\0C\x07DF\0[I?\05U\0DFF\0nA\0C\x07DFFnA\05V\0D\0\0C\x07D\0\05W\0D\0\0C\x07D\0\03	\05\0\0DF\0\0\x008A\0C\x07DF7A8\05\0D\0F\0\0HB\0 C\x07DFL\0`B\05T\0D\0C\0\x07D\05U\0\0D\0C\0\x07D\05V\0\0DFl`"4\0C\x07DFf5>\05W\0D\0FInA\0C\x07DFW$@vA\03\n\0\05\0D\0F\0\0HB\0\0C\x07DF\0\0\0HB\05\0\0DF\0\x008@A\0C\x07DFd7@\05T\0DF\0[I?\0C\r\x07DF[IP?\05U\0DFJ!yA\b\0C\x07DF\0J!yA\05V\0D\0\0C\x07D\05\0W\0D\0\0C\x07D\03\0\x07\05\0\0DF\0\0HB@\0C\x07DF\0\fOGB\05\n\0DF\0\0\x008A\0C\x07DF@\rAx\05T\0D\0\0C\x07D\0\05U\0D\0\0C\x07D\0\05V\0D\0F[I?\x004C\x07DF[@I?\05W\0DF\0\0\0pA\0C\x07D\0F\0\0pA\0\03\b\05\0\0DFna 8A\0C\x07DF\f\x008A\x0005\0D\0F\0\0HB\0C\x07DFJ`@2B\05T\0DF[I@\0C\x07DFZI@\05U\0DF\0\0\0pA\0C\0\x07DFJn A\05V\0\0D\0C\x07D\0\05W\0\0D\0C\x07D\0F\0\0 @\03\v\05\0\0DF\0\0\0HB\0C\x07D\0F\0\0HB\0\05\0D\0F\0\x008A\0\bC\x07DF\0\0\x008A\05T\0D\0C\x07\0D\05U\0\0D\0C\x07\0D\05V\0\0DF[IP?\0C\x07D\0F[I?\0\n5W\0DF\0FnA\0C\x07DFFn A\03\f\0\x005\0DF\0\0\x008A\0C\x07DF\0\x008@A\05\0\0DF\0\0HB\0\0C\x07DF\0\0\0HB\05\0T\0D\0\0C\x07D\05\0U\0DFF\0nA\0C\x07DFFnA\05V\0D\0\0C\x07D\0\05W\0D\0\0C\x07D\0\03\r\05\0\0DF\0\0\x008A\0C\x07DF\0\x008A`\05\0D\0F\0\0HB\0\0C\x07DF\0\0\0HB\05T\0\0D\0C\0\x07D\05U\0\0D\0C\0\x07D\05V\0\0DF[ I@\0C\x07D\0F[I@\05W\0D\0FFnA\0C\x07DFF@nA\03\0\05\0D\0F\0\0HB\0C\x07DF\0\0\0HB\05\0DF\0\x008@A\0C\x07D\0F\0\x008A\0\b5T\0DF\0[I?\0C\x07DF[IP?\05U\0\0DFFnA\0C\x07DF\0FnA\05V\0D\0\0C\x07D\05\0W\0D\0\0C\x07D\07\0normal\0EyeShap\0e\03\0\x005\r\0DE\0 \05\0\0DE \05\0\0DE \0F\0\0\0?\0\b5\0DE\0 F\0\0\0?\03\05\r\0\0DE F\0x$v7\05\0DE \0\05\0D\0E F\0\0\0@?\05\0\0DE F\0\0\0\0?\03\05\0D\0F\0\x008A\0\b5\0DF\0\0\0HB\05\bT\0DFR@I@\05U\0\0DFMM`@\05V\0D\05W\0\0DFF@nA\03\0\05\0D\0F\0\0HB\0\x005\0DF\0\0\x008A\05\fT\0DF[@I?\05U\0DFF@nA\05V\0\0DFQIP?\05W\0\0DF@0\03\05\0\0DF\0\0\0HB\05\0DF\0\0\x008A\05T\0DFVIP?\05U\0\0DF@0\05V\0D\0F[I?\x0045W\0D\0FFnA\03\05\0\0DF\0\x008@A\05\0DF\0\0HB@\05T\0D\0F[I@\05U\0D\0FFnA\05V\0DF\085\05\x07W\0DF1\0B@\03\05\0D\0F\0\0HB\0\05\0D\0F\0\x008A\0\b5T\0DF\0QI?\05\rU\0DFS\0@\05V\0DF[ I?\05W\0DFFn A\03\0\x005\0DF\0\0\x008A\05\0DF\0\0\0HB\05T\0\0D\05\0U\0DFF\0nA\05V\0DF\b _@\05W\0\0D\03\0\05\0D\0F\0\x008A\x0005\0D\0F\0\0HB\0\x005T\0DF\0WE/>\05U\0D\0\x005V\0DF\0[I@\05W\0DFF\0nA\03\05\0D\0FGB\0,5\0D\0F\x008A\0\b5T\0DF\0[I?\05U\0DFF\0nA\05V\0DFZ I?\05W\0DFF@@\03	\0\x005\0DF\0\0\x008A\05\0DF\0\0\0HB\05T\0DFQ I@\05U\0\0DFF\vP@\05V\0\0DFl"4X\05W\0D\0FInA\0\b3\n\05\0\0DF\0\0\0HB\05\0\0DF\0\x008@A\05T\0DF[I?h\05U\0D\0FJ!yA\05V\0D\0FGI?\0\n5W\0DF\0	z@\03\x07\05\0\0DF\0\0HB@\05\0D\0F\0\x008A\x0005T\0D\0FcI?\0\n5U\0DF\0@yq@\05\x07V\0DF[@I?\05W\0DF\0\0\0pA\03\b\0\05\0D\0Fna8A\05\0DF\0\0\0HB\05\bT\0DF[@I@\05U\0DF\0\0\0pA\05V\0\0DF!?xP5\05W\0\0DF~\\a@\03\v\05\0\0DF\0\0\0HB\05\0\0DF\0\0\x008A\05T\0DF;IP?\05U\0DFS@ \05V\0D\0F[I?\05W\0D\0FFnA\03\f\05\0\0DF\0\x008@A\05\0\0DF\0\0HB\0\05T\0D\0\05U\0\0DFFnA\05V\0D\0F\b_@\05W\0D\0\03\r\05\0\0DF\0\0\x008A\05\0DF\0\0\0HB\05T\0\0DFWE/p>\05U\0D\05V\0\0DF[I@\05W\0\0DFFnA\03\05\0\0DF\0\0\0HB\05\0DF\0\0\x008A\05T\0DF[IP?\05U\0\0DFFnA\05V\0D\0FeI?\x0045W\0D\0F`\n\x1BA\07\rhappy\0EyeShap\0e\03\0\x005\r\0DE\0 \05\0\0DE \05\0\0DE \0F\0\0\0?\0\b5\0DE\0 F\0\0\0?\03\05\r\0\0DE F\0x$v7\05\0DE \0\05\0D\0E F\0\0\0@?\05\0\0DE F\0\0\0\0?\03\05\0D\0F\0\x008A\0\bC\bDE F\0\x008A\05\0DF\0\0\0HB\0C\bDE F4{@gB\05T\0DFRI@\0C\bD\0E FTI@\b\05U\0D\0FMM@\0C\bDE \0F*@\0\f5V\0D\0\0C\bDE \0\05W\0D\0FFnA\0\bC\bDE \0FFnA\03\05\0\0DF\0\0H\0B\0C\bD\0E F\0HB\0\05\0D\0F\0\x008A\x000C\bDE \0FhvwA\05T\0DF\0[I?\0C\r\bDE F[@I?\05U\0DFF@nA\0C\bD\0E FFn A\05V\0\0DFQI?(\0CDF\0GI?\0C\bDE FN@I?\05W\0DF@@\0CDF--\v@\0C\bDE \0Fkh@\03\05\0\0DF\0\0H\0B\0C\bDE FGBX\05\0D\0F\0\x008A\x000C\bDE \0FhvwA\05T\0DF\0VI?\0CDFJIP?\0C\bD\0E FWI?(\05U\0D\0F@\0CDF!\0-\v@\0C\bDE FD@I@\05V\0DF[IP?\0C\bDE F[I?h\05W\0D\0FFnA\0\bC\bDE \0FFnA\03\05\0\0DF\0\x008@A\0C\bDE F~7Ax\05\0D\0F\0\0HB\0 C\bDE \0F4{gB\05T\0DF\0[I@\0C\bDE F[@I@\05U\0\0DFF@nA\0C\bD\0E FFn A\05V\0\0DF858\0C\bDE\0 F	5\05W\0D\0F1B@\0\fC\bDE F\0\x07\v@\03\05\0\0DF\0\0HB\0\0C\bDE\0 F\0HB\0\05\0D\0F\0\x008A\0\bC\bDE F\x001pA\05\0T\0DFQ@I?\0CDFXI?h\0C\bDE\0 FRI?\x0045U\0D\0FS@\0\bCDF|_\0l@\0C\bD\0E F*`@\05V\0\0DF[I?(\0C\bDE\0 F[I?\05W\0D\0FFnA\0C\bDE F\0FnA\03\05\0\0DF\0\x008A \0C\bDE\0 F\0hA\05\0D\0F\0\0HB\0\0C\bDE F\0_A\05\x07T\0D\0\0C\bDE F\0@O]>\05\x07U\0DFF\0nA\0C\bDE FML`\fA\05V\0DF\b_@\0C\bD\0E F\b_@\b\05W\0D\0\0C\bD\0E FCuA8\03\05\0\0DF\0\0\x008A\0C\bDE FpS@gA\05\0DF\0\0H\0B\0C\bD\0E Fz_A0\05T\0D\0FWE/>\0<C\bDE \0FJF/>\05U\0D\0\0C\bDE \0FqA\05V\0DF\0[I@\0C\bDE F\x07\0V-@\05W\0\0DFF@nA\0C\bD\0E F<\f`A\03\0\x005\0DF\0GB\0C\v\bDE F@GB\05\0DF\0\x008A\0C\bDE F1p\0A\05T\0\0DF[I?(\0C\bDE\0 F[I?\05U\0D\0FFnA\0C\bDE F\0FnA\05V\0DFZ@I?\0CDFRI?h\0C\bDE\0 FVI?\x0045W\0D\0FF@\0\bCDF"_ l@\0C\bD\0E F*`@\03	\0\x005\0DF\0\0\x008A\0C\bDE F{@7A\05\0DF\0\0\0HB\0C\bDE F4{g B\05T\0DFQI@\b\0C\bDF\0UI@\05U\0DF@F\v@\0C\bDF@I@\05V\0D\0Fl"4\0,C\bDE \0Fl"4\05W\0DF\0InA\0C\bDE FI\0nA\03\n\05\0D\0F\0\0HB\0\0C\bDE \0F~GB\05\0DF\0\0\x008A\0C\f\bDE Fh\0vwA\05T\x07\0DF[ I?\0C\bDE F[IP?\05U\0DFJ!yA\b\0C\bDE\0 FJ!yA\05V\0D\0FGI?\0\nC\bDFI I?\05W\0DF	z @\0C\bD\0F\v\v@\0\f3\x07\05\0\0DF\0\0H\0B\0C\bDE F\0HB@\05\0D\0F\0\x008A\x000C\bDE \0FhvwA\05T\0DF\0cI?\0CDFgIP?\0C\x07D\0FdI?\0\nC\bDFd I?\05U\0DF@yqp@\0CD\0F47\x07@\0\nC\x07DFm\x1B \n@\0C\bDF7zG@\05V\0D\0F[I?\0C\bDE F\0[I?\05\rW\0DF\0\0\0pA\0C\b\0DE F\0\0\0pA\03\b\0\05\0D\0Fna8A\0C\bDE F\0ta8A\05\r\0DF\0\0\0HB\0C\bDE F4{@gB\05T\0DF[I@\0C\bDE F[I@H\05U\0D\0F\0\0pA\0\0C\bDE \0F\0\0pA\0\x005V\0DF\0!?x5\0C\bDFOap5\05W\0\0DF~\\a@\0C\bDF\0Vx@\03\v\05\0\0DF\0\0HB\0\0C\bDE\0 F~GB\0\f5\0D\0F\0\x008A\0\bC\bDE F\x002pA\05\0T\0DF;@I?\0C\bDFKI?h\05U\0D\0FS@\0C\bDF\0@\x1B@\05V\0DF[ I?\0C\bDE F[IP?\05W\0\0DFFnA\0C\bDE\0 FFnA\0\b3\f\05\0\0DF\0\0\x008A\0C\bDE F{gpA\05\0\0DF\0\0HB\0\0C\bDE\0 F=z_A\05T\0D\0\0C\bDE\0 F@O]>\05U\0D\0FFnA\0C\bDE F\0ML\fA\05\x07V\0DF@\b_@\0C\b\0DE F\b _@\05W\0\0D\0C\b\0DE FML`A\03\r\05\0D\0F\0\x008A\0C\bDE F\0WgA\05\0DF\0\0\0HB\0C\b\0DE F=z\0_A\05T\0DFWE/p>\0C\bDE FWE/>x\05U\0D\0\0C\bD\0E FCuA8\05V\0D\0F[I@\0C\bDE \0FcU-@\05W\0DF\0FnA\0C\bDE FR\x008\fA\03\05\0D\0F\0\0HB\0 C\bDE \0F\0HB\05\0DF\0\0\x008A\0C\bDE F2\0pA\05T\0\0DF[ I?\0C\bDE F[IP?\05U\0\0DFFnA\0C\bDE\0 FFnA\0\b5V\0D\0F[I?\0CDFa I?\0CDFjI?\x004CDFc@K@\0CDF]K@8\0CDF\0dK@\0C\x07DFcKp@\0C\x07D\0FbK@\0C\bDE F\0[I?\05\rW\0DF`@\n\x1BA\0C\0DF.}@ \0CDF\0W@\0CDFBv`@\0CD\0Fd@\0CDF3\0@\0CDF*R\x1B@\0C\x07DFO@p\x1B@\0C\bDE Fr\0\x1B@\07confused\0EyeShap\0e\03\0\x005\r\0DE\0 \0CD\0E FqfA\05\0D\0E \0C\0DE F<I`b@\05\0\0DE F\0\0\0\0?\0CDE FJ j?\05\0\0DE F\0\0\0\0?\0CDE F8@m?\03\0\05\r\0D\0E Fx$v7\0CDE\0 FVA\0$5\0D\0E \0CD\0E F"zL\0@\05\0\0DE F\0\0\0\0?\0CDE FpHi?\05\0\0DE F\0\0\0\0?\0CDE FT,`?\03	\0\x005\0DF\0{7A\0C\x07DFla8PA\05\0\0DFpGBX\0CDF\06B\05\vT\0D\0\0CD\05\0U\0D\0\0CD\05\0V\0DF1@#}4\0C\x07DF\'Ls=\05W\0D\0FX0xA\0\fCDFJ@!yA\03\n\0\05\0D\0F\0\0HB\0\0CDF\0\0\0HB\05\0\0DF\0\0\x008A\0CDF6S\bA\x0045T\0D\0F[I?\0CDF[ I?\05U\0DF\0\0p\0A\0CD\0FJ!yA\05V\0D\0\0CD\0\x005W\0D\0\0CD\0\x003\x07\05\0\0DF\0\0H\0B\0CDF\0\0HB\05\0DF\0\0\x008A\0C\fDF\0\x008@A\05T\0D\0CD\0\05U\0\0D\0CD\0\05V\0\0DF[I?h\0CDF\0[I?\05\rW\0DF\0\0\0pA\0C\0DF~4rA\0\03\b\05\0\0DFt@a8A\0CDFla8Ah\05\0D\0FvGB\0,CDFW\0AB\05T\0DF_ I@\0CDF*@E@\0$5U\0D\0F\0\0pA\0\0CDF~4\0rA\05V\0\0D\0C\0D\05W\0\0D\0C\0D\03\v\0\05\0D\0F\0\0HB\0\0CDF\0\0\0HB\05\0\0DF\0\x008@A\0CD\0F\0\x008A\0\b5T\0D\0\0CD\0\x005U\0D\0\0CD\0\x005V\0DF\0[I?\0CDF[IP?\05W\0\0DF\0\0pA\0\0CDF\0FnA\03\f\05\0\0DF\0\x008A \0CDF\0\0\x008A\05\0DF\0\0\0HB\0C\0DF\0\0HB\0\05T\0D\0\0CD\0\05U\0D\0FFnA\0\bCDFF\0nA\05V\0D\0C\0D\05W\0\0D\0C\0D\03\r\0\05\0D\0F\0\x008A\x000CDF\0\0\x008A\05\0DF\0\0\0HB\0CD\0F\0\0HB\0\05T\0D\0\0CD\0\05U\0D\0\0CD\0\05V\0D\0FhIK@\0CDF[ I@\05W\0\0DF_;n A\0CD\0FFnA\03\05\0\0DF\0\0H\0B\0CDF\0\0HB\05\0DF\0\0\x008A\0CDF\0\x008@A\05T\0\0DF[I?(\0CDF\0[I?\05U\0DFF\0nA\0CDFFnA\05V\0D\0\0CD\0\05W\0D\0\0CD\0\07loo\0kUp9\0\x003\05[\0\0DF\0\0H\0C\07\blookDown9\0\03\0\x005[\0CD\0F\0\0HC\0\07	look\0Right9\0\03\05\0Z\0DF\0\0\0HB\07\blookLef\0t9\03\0\05Z\0D\0F\0\0HB\07\x07noBl\0ink90;\07	bl\0inkOnce\x009\03\0\05\0D\0F\0\0\0?\0\bCDF33\0?\0C\fDF\0\0\0?\05\0D\0F\0\0\0?\0\bCDE \0\0C\fDE \0F\0\0\0?\0\b3\05\0\0DF\0\0\0@?\0CD\0F33?\0\bC\fDF\0\0\0\0?\05\0DF\0\0\0@?\0CD\0E \0C\fD\0E F\0\0\0@?\07	bl\0inkLoop\x0090;\03\05\0\0DF\0\0\0@?\0CD\0F33?\0\bC\fDF\0\0\0\0?\05\0DF\0\0\0@?\0CD\0E \0C\fD\0E F\0\0\0@?\03\0\x005\0DF\0\0\0\0?\0CDF33@?\0C\fD\0F\0\0\0?\0\b5\0DF\0\0\0\0?\0CDE \0\0C\fDE F\0\0\0\0?\x0057State \0Machine\0 1\x008\n\bvertica\0l\f\0\0HB\x008\n\nhorizonta\0l\f\0\0HB\0:\nrelax\0:\n \rshowCo\0nfusion\0\0:\nscared\0:\n@blink\0\0:\n	showHappy\0\x009\nReset  Le\0ftRight\0\0=\b\0@\0?\0A\0\0>\x009\n\fReset U\0pDown\0@\0\0>\0=\x07\0?\0A\x009\n\vManualBli\0nk\0>\0@\0\0?\x009\nB\blink\0=@\n\0A\0D\x1B\0@\0>\0=\f\0A\0\0D\x1B\0?\0A\x009\n!UpDown\0\0L\'\0\0K%\x07\0K%!&\0\0HB"\0=\0A\0\0>\0@\0?\0\0A\x009\nB	LeftR\0ight\0>\0\0@\0=\0A \0L\'\0\bK%\b\0K%B	&\0\0HDB\0?\0A \x009\n\bE\byeShape\0\0@\0=\0>\0A\0D\x1BE\0A\0D\x1B\0A\0D\x1B!\0AH,\0D\x1B"\0=\0\b=\0=B\0?\x009\n@Shake\0\0=\0\0=\0>\0A\0D\x1B!\0A\0\0\bD\x1B\0?\0@\0\0\0\0\0\0\0');
  const riveElement = new rive_default.Rive({
    buffer: uint8ArrayForRobotEyesRiv,
    canvas,
    autoplay: true,
    stateMachines: "State Machine 1",
    fit: rive_default.Fit.cover,
    onLoad: () => {
      inputs = riveElement.stateMachineInputs("State Machine 1");
    }
  });
  Object.assign(canvas, {
    rive: rive_default,
    riveElement,
    riveInputs: inputs,
    actions: {
      // lookAt(x,y) {
      //     if (inputs) {
      //         canvas.style.top
      //         canvas.style.left
      //     }
      // },
      showScared() {
        if (inputs) {
          const trigger = inputs.find((each) => each.name === "scared");
          trigger.fire();
        }
      },
      showConfusion() {
        if (inputs) {
          const trigger = inputs.find((each) => each.name === "showConfusion");
          trigger.fire();
        }
      },
      showHappy() {
        if (inputs) {
          const trigger = inputs.find((each) => each.name === "showHappy");
          trigger.fire();
        }
      },
      relax() {
        if (inputs) {
          const trigger = inputs.find((each) => each.name === "relax");
          trigger.fire();
        }
      }
    }
  });
  return canvas;
};

// face_server/helpers/opacity_helper.js
var secondsSinceLastInteraction = 0;
var listeners = [];
setInterval(() => {
  secondsSinceLastInteraction += 0.1;
  for (const each of listeners) {
    each();
  }
}, 100);
var logInteraction = () => {
  secondsSinceLastInteraction = 0;
  for (const each of listeners) {
    each();
  }
};
var fadeAfterNoInteraction = ({ baseDelaySeconds = 6, opacityLossPerSecond = 0.3, callback = () => 0 }) => {
  let opacity = 1;
  listeners.push(() => {
    if (secondsSinceLastInteraction <= baseDelaySeconds) {
      if (opacity != 1) {
        callback(1);
      }
      opacity = 1;
    } else {
      if (opacity == 0) {
      } else {
        if (opacity <= 0) {
          opacity = 0;
        } else {
          opacity -= opacityLossPerSecond / 10;
        }
        callback(opacity);
      }
    }
  });
  return logInteraction;
};

// face_server/main.js
var parameters = {
  frameSendRate: 2e3,
  // 200 means it sends a frame every 200ms (5fps)
  // NOTE: if this is too fast it can overwhelm the python code!
  //       make number smaller if python is getting overloaded 
  audioBufferSize: 2048,
  defaultPort: 9093,
  videoWidth: 640,
  videoHeight: 420
};
var rosTopics = {
  audioTopic: null,
  imageTopic: null
};
function MessageLog({ ...props }) {
  return MessageLog.element = html4`
            <span
                style="padding: 1rem; position: fixed; right: 0; top: 0; height: 60vh; overflow: auto; width: 21rem; background-color: rgba(0,0,0,0.18); color: white; border-left: 2px gray solid; border-bottom: 2px gray solid; box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.3); z-index: 1;"
                >
                (message log)
            </span>
        `;
}
MessageLog.logHtml = function(...messages) {
  if (MessageLog.element) {
    const message = messages.join(" ");
    MessageLog.element.innerHTML += `<br>...<br>${message}`;
    MessageLog.element.scrollTop = MessageLog.element.scrollHeight;
  }
};
MessageLog.logMessage = function(...messages) {
  if (MessageLog.element) {
    const message = messages.join(" ");
    const escapedText = new Option(message).innerHTML;
    MessageLog.element.innerHTML = MessageLog.element.innerHTML.slice(-1e4);
    MessageLog.element.innerHTML += `<br>...<br>${escapedText.replace(/\n/g, "<br>")}`;
    MessageLog.element.scrollTop = MessageLog.element.scrollHeight;
  }
};
var height;
function CameraSwitch({ children, ...props }) {
  const switchInput = html4`<input type="checkbox" value="">`;
  const video = html4`<video muted style="display: none" autoplay></video>`;
  const canvas = html4`<canvas style="display: none"></canvas>`;
  let hasRunOnce = false;
  video.addEventListener(
    "canplay",
    function(event) {
      if (!hasRunOnce) {
        height = video.videoHeight / (video.videoWidth / parameters.videoWidth);
        video.setAttribute("width", parameters.videoWidth);
        video.setAttribute("height", height);
        canvas.setAttribute("width", parameters.videoWidth);
        canvas.setAttribute("height", height);
        hasRunOnce = true;
      }
    },
    false
  );
  let cameraTimer = null;
  let cameraStream = null;
  switchInput.addEventListener(
    "click",
    // whenever the switch was clicked, run this function
    async function(event) {
      if (cameraTimer == null) {
        RosConnecter.setupRosIfNeeded();
        if (!navigator.mediaDevices) {
          MessageLog.logMessage(`Error: check the URL
Make sure it has "https" and not "http"`);
        } else {
          try {
            cameraStream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: true
            });
            video.srcObject = cameraStream;
            video.play();
            video.onloadedmetadata = function(event2) {
              height = video.videoHeight / (video.videoWidth / parameters.videoWidth);
              video.setAttribute("width", parameters.videoWidth);
              video.setAttribute("height", height);
              canvas.setAttribute("width", parameters.videoWidth);
              canvas.setAttribute("height", height);
            };
          } catch (error) {
            MessageLog.logMessage(`Looks like there was an issue connecting to the camera. Make sure this browser can actually connect to your camera (for example try logging into Zoom and using "Your Room" and try turning on the camera)`);
            throw error;
          }
          try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioCtx.createMediaStreamSource(cameraStream);
            const recorder = audioCtx.createScriptProcessor(parameters.audioBufferSize, 1, 1);
            recorder.onaudioprocess = function(event2) {
              rosTopics.audioTopic.publish(
                new ROSLIB.Message({
                  data: Array.from(
                    new Float32Array(
                      event2.inputBuffer.getChannelData(0)
                    )
                  )
                })
              );
            };
            source.connect(recorder);
            recorder.connect(audioCtx.destination);
          } catch (error) {
            MessageLog.logMessage(`Looks like there was an issue connecting to the microphone. Make sure this browser can actually connect to your camera (for example try logging into Zoom and using "Your Room" and try turning on the camera)`);
            throw error;
          }
        }
        cameraTimer = setInterval(
          // call takePicture at the frameSendRate
          function() {
            takePicture();
          },
          parameters.frameSendRate
        );
      } else {
        ros.close();
        cameraStream.stop();
        hasRunOnce = false;
        takePicture();
        clearInterval(cameraTimer);
        cameraTimer = null;
      }
    },
    false
  );
  function takePicture() {
    if (!rosTopics.imageTopic) {
      if (RosConnecter.rosIsSetup) {
        MessageLog.logMessage("Trying to take a picture but rosTopics.imageTopic is null");
      }
    } else {
      canvas.width = parameters.videoWidth;
      canvas.height = height;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      var data = canvas.toDataURL("image/jpeg");
      var a = document.createElement("a");
      a.href = data;
      var imageMessage = new ROSLIB.Message({
        format: "jpeg",
        data: data.replace("data:image/jpeg;base64,", "")
      });
      rosTopics.imageTopic.publish(imageMessage);
    }
  }
  CameraSwitch.takePicture = takePicture;
  return html4`
            <div class="switch"
                style="margin-bottom: 2rem; width: 100%; display: flex; justify-content: space-between; align-items: center;">
                <h5>
                    Activate Camera
                </h5>
                ${video}
                <label>
                    ${switchInput}
                    <span class="lever"></span>
                </label>
            </div>
        `;
}
function RosConnecter() {
  try {
    const ipAddressInput = html4`<input type="text" placeholder="IP Address" value=${"" + window.location.hostname} color=white />`;
    const portInput = html4`<input type="text" placeholder="Port" value="${parameters.defaultPort}" color=white />`;
    const connectButton = html4`
                <button class="btn-large waves-effect waves-light" style="margin-top: 1rem; z-index: 999;">
                    Connect to ROSbridge Server
                </button>
            `;
    connectButton.addEventListener("click", function(event) {
      RosConnecter.setupRosIfNeeded();
    });
    RosConnecter.setupRosIfNeeded = function() {
      if (!RosConnecter.rosIsSetup) {
        let ipAddress = ipAddressInput.value;
        let port = portInput.value;
        if (ipAddress == "") {
          ipAddress = window.location.hostname;
          if (ipAddress == "localhost") {
            ipAddress = "127.0.0.1";
          }
          if (ipAddress == "127.0.0.1") {
            window.alert(`Note: your connection should be something other than localhost (aka 127.0.0.1).

I'll still let you try with localhost but just note that the public facing address should be used instead.`);
          }
        }
        const baseValue = `${ipAddress}:${port}`;
        const url = `wss://${ipAddress}:${port}`;
        console.log(`Attempting to connect to: ${url}`);
        try {
          const ros2 = new ROSLIB.Ros({
            url
          });
          ros2.on("connection", function() {
            console.log("Connected to websocket server.");
            RosConnecter.rosIsSetup = true;
            MessageLog.logMessage("Success!");
          });
          ros2.on("error", function(error) {
            console.log("Error connecting to websocket server: ", error);
            MessageLog.logHtml(`1. Make sure <code>run/2_ros_bridge</code> is running<br>2. Try opening this in a new tab:<br><a href="https://${baseValue}">https://${baseValue}</a><br>3. Click Advanced -> Accept Risk and Continue<br>4.Then re-run this test<br>`);
            showErrorToast(`Didn't Connect to socket
See log ->

(Click to make this go away)`, { position: "left" });
          });
          ros2.on("close", function() {
            RosConnecter.rosIsSetup = false;
            console.log("Connection to websocket server closed.");
          });
          afterRosConnected(ros2);
        } catch (error) {
          MessageLog.logMessage(`error connecting to ROS`);
          console.error(`The error below is probably because of a url issue
The url given to ROS was: ${url}`);
          console.error(error);
        }
      }
    };
    return html4`
                <div>
                    <label for="ip">IP Address</label>
                    ${ipAddressInput}

                    <label for="port">Port</label>
                    ${portInput}

                    ${connectButton}
                </div>
            `;
  } catch (error) {
    console.debug(`error is:`, error);
    throw error;
  }
}
var html4 = Elemental({
  MessageLog,
  CameraSwitch,
  RosConnecter,
  Face
});
var face = html4`<Face height=1000 width=8000 style="position: fixed; top: 0rem; right: calc(50vw); transform: scale(0.5) translate(100%, -50%);" />`;
var controls = html4`
        <div
            style="display: flex; position: fixed; bottom: 0rem; left: 0; flex-direction: column; width: 26rem; transform: scale(0.8) translate(17%, 18%); padding: 2rem; margin: 1rem; border-radius: 12px; background-color: rgba(0,0,0,0.18); color: white; transition: all 0.2s ease-in-out 0s; z-index: 2; border-radius: 0;"
            >
            <CameraSwitch></CameraSwitch>
            <RosConnecter></RosConnecter>
        </div>
    `;
var buttons = html4`
        <div style="position: fixed; top: 0; left: 0; width: 12rem; display: flex; flex-direction: column; margin-top: 1rem; justify-content: center; align-items: start; margin-left: 1rem; z-index: 999;">
            <button onclick=${() => face.actions.relax()}>
                Relax
            </button>
            <button onclick=${() => face.actions.showHappy()} style="margin-top: 1rem">
                Happy
            </button>
            <button onclick=${() => face.actions.showConfusion()} style="margin-top: 1rem">
                Confused
            </button>
            <button onclick=${() => face.actions.showScared()} style="margin-top: 1rem">
                Scared
            </button>
        </div>
    `;
document.body = html4`
        <body style="background: #4b5e6b">
            ${face}
            
            <MessageLog></MessageLog>
            ${controls}
            ${buttons}
        </body>
    `;
var userInteractedWithPageFunc = fadeAfterNoInteraction({
  baseDelaySeconds: 5,
  opacityLossPerSecond: 0.5,
  callback: function(newOpacity) {
    controls.style.opacity = newOpacity;
    MessageLog.element.style.opacity = newOpacity;
    buttons.style.opacity = newOpacity;
  }
});
document.body.addEventListener("mouseover", function(event) {
  userInteractedWithPageFunc();
});
document.body.addEventListener("mousemove", function(event) {
  userInteractedWithPageFunc();
});
document.body.addEventListener("click", function(event) {
  userInteractedWithPageFunc();
});
async function afterReceiveBackendMessage(data) {
  console.debug(`data is:`, data);
  let showOnWebpage = false;
  if (showOnWebpage) {
    MessageLog.logMessage(JSON.stringify(data));
  }
}
async function afterRosConnected(ros2) {
  rosTopics.audioTopic = new ROSLIB.Topic({
    ros: ros2,
    name: "/audio",
    messageType: "std_msgs/Float32MultiArray"
  });
  rosTopics.imageTopic = new ROSLIB.Topic({
    ros: ros2,
    name: "/camera/image/compressed",
    messageType: "sensor_msgs/CompressedImage"
  });
  new ROSLIB.Topic({
    ros: ros2,
    name: "/camera_server/do_something",
    // NOTE: this needs to be the same as the string in the python code
    messageType: "std_msgs/String"
  }).subscribe((message) => {
    let data;
    try {
      data = JSON.parse(message.data);
    } catch (error) {
      MessageLog.logMessage(`error parsing message json`);
    }
    afterReceiveBackendMessage(data);
  });
}
window.face = face;
window.playSound = playSound;
window.logMessage = MessageLog.logMessage;
window.showToast = showToast;
window.showErrorToast = showErrorToast;
window.ROSLIB = ROSLIB;
/*!
* Toastify js 1.12.0
* https://github.com/apvarun/toastify-js
* @license MIT licensed
*
* Copyright (C) 2018 Varun A P
*/
