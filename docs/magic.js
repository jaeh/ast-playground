"use strict";function b(a){return l(a)||c(a)||j()}function c(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function d(a,b){if(null==a)return{};var c,d,f=e(a,b);if(Object.getOwnPropertySymbols){var g=Object.getOwnPropertySymbols(a);for(d=0;d<g.length;d++)c=g[d],!(0<=b.indexOf(c))&&Object.prototype.propertyIsEnumerable.call(a,c)&&(f[c]=a[c])}return f}function e(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],0<=b.indexOf(c)||(e[c]=a[c]);return e}function f(a){for(var b=1;b<arguments.length;b++){var c=null==arguments[b]?{}:arguments[b],d=Object.keys(c);"function"==typeof Object.getOwnPropertySymbols&&(d=d.concat(Object.getOwnPropertySymbols(c).filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable}))),d.forEach(function(b){g(a,b,c[b])})}return a}function g(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function i(a,b){return l(a)||k(a,b)||j()}function j(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function k(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{d||null==h["return"]||h["return"]()}finally{if(e)throw f}}return c}function l(a){if(Array.isArray(a))return a}function m(a){return m="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},m(a)}var n=function(){var a=2,b=3,c={},d=[],e=d.map,f=Array.isArray,g="undefined"==typeof requestAnimationFrame?setTimeout:requestAnimationFrame,i=function(a){var b="";if("string"==typeof a)return a;if(f(a)&&0<a.length)for(var c,d=0;d<a.length;d++)""!==(c=i(a[d]))&&(b+=(b&&" ")+c);else for(var d in a)a[d]&&(b+=(b&&" ")+d);return b},j=function(c,a){var b={};for(var d in c)b[d]=c[d];for(var d in a)b[d]=a[d];return b},k=function(a){return a.reduce(function(a,b){return a.concat(!!(b&&!0!==b)&&("function"==typeof b[0]?[b]:k(b)))},d)},l=function(c,a){return f(c)&&f(a)&&c[0]===a[0]&&"function"==typeof c[0]},n=function(c,a){for(var b in j(c,a)){if(c[b]!==a[b]&&!l(c[b],a[b]))return!0;a[b]=c[b]}},o=function(a,b,c){for(var d,e,f=0,g=[];f<a.length||f<b.length;f++)d=a[f],e=b[f],g.push(e?!d||e[0]!==d[0]||n(e[1],d[1])?[e[0],e[1],e[0](c,e[1]),d&&d[2]()]:d:d&&d[2]());return g},p=function(a,b,c,d,e,f){if("key"===b);else if("style"===b)for(var g in j(c,d))c=null==d||null==d[g]?"":d[g],"-"===g[0]?a[b].setProperty(g,c):a[b][g]=c;else"o"===b[0]&&"n"===b[1]?((a.actions||(a.actions={}))[b=b.slice(2).toLowerCase()]=d)?!c&&a.addEventListener(b,e):a.removeEventListener(b,e):!f&&"list"!==b&&b in a?a[b]=null==d?"":d:null!=d&&!1!==d&&("class"!==b||(d=i(d)))?a.setAttribute(b,d):a.removeAttribute(b)},q=function(a,c,d){var e=a.type===b?document.createTextNode(a.name):(d=d||"svg"===a.name)?document.createElementNS("http://www.w3.org/2000/svg",a.name):document.createElement(a.name),f=a.props;for(var g in f)p(e,g,null,f[g],c,d);for(var h=0,j=a.children.length;h<j;h++)e.appendChild(q(a.children[h]=u(a.children[h]),c,d));return a.node=e},r=function(a){return null==a?null:a.key},s=function(a,c,d,e,f,g){if(d===e);else if(null!=d&&d.type===b&&e.type===b)d.name!==e.name&&(c.nodeValue=e.name);else if(null==d||d.name!==e.name)c=a.insertBefore(q(e=u(e),f,g),c),null!=d&&a.removeChild(d.node);else{var h,k,l,m,n=d.props,o=e.props,t=d.children,v=e.children,w=0,x=0,y=t.length-1,z=v.length-1;for(var A in g=g||"svg"===e.name,j(n,o))("value"===A||"selected"===A||"checked"===A?c[A]:n[A])!==o[A]&&p(c,A,n[A],o[A],f,g);for(;x<=z&&w<=y&&null!=(l=r(t[w]))&&l===r(v[x]);)s(c,t[w].node,t[w],v[x]=u(v[x++],t[w++]),f,g);for(;x<=z&&w<=y&&null!=(l=r(t[y]))&&l===r(v[z]);)s(c,t[y].node,t[y],v[z]=u(v[z--],t[y--]),f,g);if(w>y)for(;x<=z;)c.insertBefore(q(v[x]=u(v[x++]),f,g),(k=t[w])&&k.node);else if(x>z)for(;w<=y;)c.removeChild(t[w++].node);else{for(var A=w,B={},C={};A<=y;A++)null!=(l=t[A].key)&&(B[l]=t[A]);for(;x<=z;){if(l=r(k=t[w]),m=r(v[x]=u(v[x],k)),C[l]||null!=m&&m===r(t[w+1])){null==l&&c.removeChild(k.node),w++;continue}null==m||1===d.type?(null==l&&(s(c,k&&k.node,k,v[x],f,g),x++),w++):(l===m?(s(c,k.node,k,v[x],f,g),C[m]=!0,w++):null==(h=B[m])?s(c,k&&k.node,null,v[x],f,g):(s(c,c.insertBefore(h.node,k&&k.node),h,v[x],f,g),C[m]=!0),x++)}for(;w<=y;)null==r(k=t[w++])&&c.removeChild(k.node);for(var A in B)null==C[A]&&c.removeChild(B[A].node)}}return e.node=c},t=function(c,a){for(var b in c)if(c[b]!==a[b])return!0;for(var b in a)if(c[b]!==a[b])return!0},u=function(b,c){return b.type===a?((!c||t(c.lazy,b.lazy))&&((c=b.lazy.view(b.lazy)).lazy=b.lazy),c):b},v=function(a,b,c,d,e,f){return{name:a,props:b,children:c,node:d,type:f,key:e}},w=function(a,e){return v(a,c,d,e,null,b)},x=function(a){return a.nodeType===b?w(a.nodeValue,a):v(a.nodeName.toLowerCase(),c,e.call(a.childNodes,x),a,null,1)},y=function(a,b){for(var d,e=[],g=[],h=arguments.length;2<h--;)e.push(arguments[h]);for(;0<e.length;)if(f(d=e.pop()))for(var h=d.length;0<h--;)e.push(d[h]);else if(!1===d||!0===d||null==d);else g.push("object"===m(d)?d:w(d));return b=b||c,"function"==typeof a?a(b,g):v(a,b,g,null,b.key)};return{h:y,app:function app(a,b){var c={},d=!1,e=a.view,h=a.node,i=h&&x(h),j=a.subscriptions,l=[],m=function(a){p(this.actions[a.type],a)},n=function(a){return c===a||d||g(q,d=!0),c=a},p=(b||function(a){return a})(function(a,b,d){return"function"==typeof a?p(a(c,b),d||b):f(a)?"function"==typeof a[0]?p(a[0],"function"==typeof(a=a[1])?a(b):a,b):(k(a.slice(1)).map(function(a){a&&a[0](p,a[1],b)},n(a[0])),c):n(a)}),q=function(){d=!1,j&&(l=o(l,k(j(c)),p)),e&&(h=s(h.parentNode,h,i,"string"==typeof(i=e(c))?w(i):i,m))};p(a.init)}}}(),o=n.h,h=n.app,q=function(a){return function(){var b=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},d=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],e=function(a){for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return c.some(function(b){return b===m(a)})};return d||(e(b,"string","number","function")||Array.isArray(b)?(d=b,b={}):e(b.View,"function")&&(d=b.View,b={})),o(a,b,d)}},r=q("a"),a=q("button"),s=q("code"),t=q("div"),u=q("footer"),v=q("h1"),w=q("h2"),x=q("h3"),y=q("h5"),z=q("header"),A=q("img"),B=q("li"),C=q("nav"),D=q("p"),p=q("pre"),E=q("span"),F=q("ul"),G={url:"/core/",root:"/core/",app:{title:"Custom App Title",description:"Custom App Description"},menu:[{to:"/concepts/",text:"concepts",items:[{to:"/concepts/#modules",text:"modules"},{to:"#state",text:"state"},{to:"#actions",text:"actions"},{to:"#views",text:"views"},{to:"#styles",text:"styles"},{to:"#globals",text:"global"},{to:"#lambdas",text:"server lambdas"},{to:"#libs",text:"external libs"}]},{to:"/files/",text:"files & directories",items:[{to:"#pages",text:"/pages",items:[{to:"-dir-structure",text:"url mapping"},{to:"-example",text:"example"}]},{to:"#assets",text:"/assets",items:[{to:"-example",text:"example"}]},{to:"/files/#static",text:"/assets/static"},{to:"#themes",text:"/assets/themes",items:[{to:"-example",text:"example"}]},{to:"#app",text:"/assets/app.js",items:[{to:"-example",text:"example"}]},{to:"#config",text:"/config.js",items:[{to:"-example",text:"example"}]},{to:"#menu",text:"/assets/Menu.js",items:[{to:"-example",text:"example"}]}]},{to:"/modules/",text:"modules",items:[{to:"#definition",text:"definition"},{to:"#usage",text:"usage"},{to:"#custom-module",text:"custom modules"},{to:"#preinstalled",text:"preinstalled"},{to:"#menu",text:"menu",items:[{to:"-props",text:"props"},{to:"-sub-menus",text:"sub menus"}]},{to:"#link",text:"link"},{to:"#footer",text:"footer"},{to:"#gl-magic-modules",text:"@magic-modules"}]},{to:"/themes/",text:"themes",items:[{to:"#gl-magic-themes",text:"@magic-themes"}]},{to:"/libraries/",text:"libraries",items:[{to:"#gl-magic-libraries",text:"@magic-libraries"}]}],logo:"/core/logo.png",logotext:"@magic",pages:{"/core/concepts/":{title:"@magic/core concepts",description:"@magic/core conceptual information."},"/core/files/":{title:"@magic/core files",description:"@magic/core directory docs."},"/core/":{title:"@magic/core docs",description:"@magic/core documentation directory."},"/core/libraries/":{title:"@magic/core library docs",description:"@magic/core libraries allow you to include client side functionality in your app."},"/core/modules/":{title:"@magic-modules",description:"@magic-modules documentation."},"/core/themes/":{title:"@magic-themes",description:"@magic-theme docs."}},pageClass:"",module:{test:"testing"},theme:"dark"},H={mapClickToGo:function mapClickToGo(a){return a.preventDefault(),a},listenPopState:function listenPopState(a,b){var c=function(c){return a(b,c)};return addEventListener("popstate",c),function(){return removeEventListener("popstate",c)}}},I=function(){return u({class:"Footer"},[t({class:"Container"},["made with a few bits of ",P({to:"https://github.com/magic/core",target:"_blank",rel:"noopener"},"magic")])])},J=function(a){if("string"==typeof a)a={project:a};else if(!a.project)return;var b=a,c=b.project,d=void 0!==c&&c,e=b.branch,f=void 0===e?"master":e,g=b.host,h=void 0===g?"github":g,j=[["npm",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://www.npmjs.com/package/@".concat(a),src:"https://img.shields.io/npm/v/@".concat(a,".svg")}}],["travis",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://travis-ci.com/".concat(a),src:"https://travis-ci.com/".concat(a,".svg?branch=").concat(f)}}],["appveyor",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;if(a){var b=a.split("/"),c=i(b,2),e=c[0],g=c[1];return e=e.replace(/-/g,""),{to:"https://ci.appveyor.com/project/".concat(e,"/").concat(g,"/branch/").concat(f),src:"https://img.shields.io/appveyor/ci/".concat(e,"/").concat(g,"/").concat(f,".svg")}}}],["coveralls",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return{to:"https://coveralls.io/".concat(h,"/").concat(a),src:"https://img.shields.io/coveralls/".concat(h,"/").concat(a,"/").concat(f,".svg")}}],["greenkeeper",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://greenkeeper.io",src:"https://badges.greenkeeper.io/".concat(a,".svg")}}],["snyk",function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:d;return a&&{to:"https://snyk.io/test/".concat(h,"/").concat(a),src:"https://img.shields.io/snyk/vulnerabilities/github/".concat(a,".svg")}}]].map(function(b){var c=i(b,2),d=c[0],e=c[1];return e(a[d])}).filter(function(b){return b.to&&b.src});return j.length?F({class:"GitBadges"},j.map(function(a){var b=a.to,c=a.src;return B([P({to:b},M({src:c}))])})):void 0},K=function(a){var b=a.items,c=void 0===b?[]:b,d=a.org,e=a.host,g=void 0===e?"github":e,h=a.header,i=a.desc,j=void 0===i?a.description:i,k={};return a["class"]?!a["class"].includes("GitList")&&(k["class"]="GitList ".concat(a["class"])):k["class"]="GitList",k.id=a.id?a.id:d,k.id.startsWith("gl")||(k.id="gl-".concat(k.id)),t(k,[h&&w(h),j&&t({class:"description"},j),F({id:"".concat(k.id,"-ul")},[c.map(function(a){return K.Item(f({org:d,id:"".concat(k.id,"-li"),host:g},a))})])])};K.Item=function(a){var b=a.name,c=a.org,d=a.id,e=a.host,f=a.desc||a.description;return B({id:"".concat(d,"-").concat(b),class:"GitListItem"},[x([P({to:"https://".concat(e,".com/").concat(c,"/").concat(b)},"@".concat(c,"/").concat(b))]),f&&D(f),J("".concat(c,"/").concat(b)),P({to:"https://".concat(c,".").concat(e,".io/").concat(b)},"docs / demo")])};var L=function(a){var b=a.logo,c=a.menu,e=a.root,g=a.tagline,h=a.logotext,i=d(a,["logo","menu","root","tagline","logotext"]);return b||c||g?z({class:"Header"},[(b||h)&&P({to:e,class:"LogoWrapper"},[b&&M({class:"Logo",src:b}),h&&E({class:"LogoText"},h)]),c&&Q(f({},i,{root:e,items:c}))]):void 0},M=function(a){if("string"==typeof a&&(a={src:a}),!!a.src)return a.alt||(a.title?a.alt=a.title:(a.role="presentation",a.alt="")),A(a)},N=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return K(f({org:"magic-libraries",header:[P({to:"https://magic-libraries.github.io"},"@magic-libraries")],desc:["below is a collection of the available @magic client libraries."],items:[{name:"json",description:["the @magic-libraries/json module parses and stringifies json."," it also returns errors instead of throwing them."]},{name:"is",description:"the @magic-libraries/is module unifies the javascript type testing apis."},{name:"uri",description:["the @magic-libraries/uri module "," encodes objects to uri strings and decodes uri strings to objects."]}]},a))},O=function(){0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return a({class:"LightSwitch",onclick:Y.changeTheme})},P=function(a,b){var c=a.to,e=d(a,["to"]),f=e.href,g=e.text,h=e.nofollow,i=e.noreferrer,j=e.onclick,k=d(e,["href","text","nofollow","noreferrer","onclick"]);c=c||f||"",k.href=c;var l=c.startsWith("/");return l?k.onclick=[Y.go,H.mapClickToGo]:(k.target="_blank",k.rel="noopener",h&&(k.rel+=" nofollow"),i&&(k.rel+=" noreferrer")),r(k,[g,b])},Q=function(a){var b=a.items,c=a.hash,d=a.url,e=void 0===d?"":d,g=a.root,h=a["class"],i=void 0===h?"Menu":h,j=a.collapse;if(b.length)return c&&(e+="#".concat(c)),C({class:i},F(b.map(function(a){return R(f({},a,{root:g,url:e,collapse:void 0===j||j}))})))},R=function(a){var b=a.url,c=a.text,e=a.items,g=void 0===e?[]:e,h=a.root,i=a.parentTo,j=void 0===i?void 0:i,k=a.collapse,l=d(a,["url","text","items","root","parentTo","collapse"]);if(l.to||c){var m={class:"MenuItem"},n=l.to;n.startsWith("/#")&&(n=n.substr(1));var o=l.to[0],p="/"===o||"-"===o||"#"===o;if(j&&p)if("-"===o)n=j+n;else if("#"===o)n=j+n;else{var t=n.split("/")[1];if(t){var u=j.endsWith("/".concat(t,"/"));!u&&p&&(n=j+n)}}var q=n.startsWith(h);h&&p&&!q&&(n=h+n),l.to=n.replace(/\/\//g,"/");var r=b&&b.includes(l.to);b.endsWith(l.to)&&(m["class"]+=" active");var s=[];return(g.length&&r||!k)&&(s=F(g.map(function(a){return R(f({parentTo:l.to,root:h,url:b,collapse:k},a))}))),B(m,[l.to?P(l,c):E(l,c),s])}},S=function(a){return t({class:"Mod"},[x("Mod.Mod"),D(["this is Mod. it gets loaded from ",P({to:"https://github.com/magic/core/example/assets/module.js"},"/assets/module.js")]),D(["and imported in ",P({to:"https://github.com/magic/core/example/assets/index.js"},"/assets/index.js")]),D(["the state of this module: ",JSON.stringify(a.module)])])};S.Component=function(a){a="string"==typeof a?{header:a}:a;var b=a.header||a.title;return t({class:"ModComponent"},[b&&y(b),D(["Mod.Component, a second component in ",P({to:"https://github.com/magic/core/example/assets/module.mjs"},"/assets/module.mjs")])])};var T=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return K(f({class:"ModuleList",org:"magic-modules",header:[P({to:"https://magic-modules/github.io"},"@magic-modules")],description:["modules are the grimoires of ",P({to:"https://magic.github.io/core"},"@magic")],items:[{name:"language-switch",description:"LanguageSwitch provides file hierarchy based multilanguage support for magic."},{name:"video-embed",description:["VideoEmbed embeds videos from any video hoster using iframes. "," comes with default support for vimeo and youtube."]},{name:"sound-cloud",description:"embed soundcloud track, playlist and user widgets"},{name:"module-list",description:"ModuleList shows the list of @magic-modules you are looking at."},{name:"theme-list",description:"ThemeList shows a list of all @magic-themes."},{name:"library-list",description:"LibraryList shows a list of all @magic-libraries libraries."},{name:"pre",description:"Pre allows you to display javascript code with syntax highlighting."},{name:"git-badges",description:"GitBadges shows a list of github repository status badges."},{name:"git-list",description:"show a list of git repositories like the one you are looking at."}]},a))},U=function(a){var b=a.page,c=a.state;b=b?b(c):"404 - not found";var d={id:"Magic"};c.pageClass&&(d["class"]=c.pageClass),c.theme&&(d["class"]?!d["class"].includes(c.theme)&&(d["class"]+=" ".concat(c.theme)):d["class"]=c.theme);return t(d,t({class:"Wrapper"},[L(c),t({class:"Page"},b),I(c)]))},V=function(b){"string"==typeof b&&(b={content:b});var c=b,d=c.content;return t({class:"Pre"},[t({class:"menu"},[a({onclick:[Y.pre.clip,function(a){return{e:a,content:d}}]},"copy")]),p(X.pre.format(d))])},W=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{};return K(f({org:"magic-themes",header:[P({to:"https://magic-themes.github.io"},"@magic-themes")],desc:["below is a collection of the available @magic app themes."],items:[{name:"docs",description:"the @magic documentation theme. used in all @magic docs."}]},a))},X={pre:function(){var a="\nlet this long package float\ngoto private class if short\nwhile protected with debugger case\ncontinue volatile interface\n\ninstanceof super synchronized throw\nextends final throws\ntry import double enum\n\nboolean abstract function\nimplements typeof transient break\ndefault do static void\n\nint new async native switch\nelse delete null public var\nawait byte finally catch\nin return for get const char\nmodule exports require\n".trim().split(/\b/g).map(function(a){return a.trim()}),c="\nArray Object String Number RegExp Null Symbol\nSet WeakSet Map WeakMap\nsetInterval setTimeout\nPromise\nJSON\nInt8Array Uint8Array Uint8ClampedArray\nInt16Array Uint16Array\nInt32Array Uint32Array\nFloat32Array Float64Array\n".trim().split(/\b/g).map(function(a){return a.trim()}),d=["true","false"],e=function(b){if("string"!=typeof b)return b;var e=b.split(/\b/);return b=e.map(function(b,f){if(""!==b){var g="";return"state"===b?g="state":"actions"===b?g="actions":e[f+1]&&e[f+1].includes(":")?g="colon":a.includes(b)?g="keyword":c.includes(b)?g="builtin":d.includes(b)?g="boolean":"."===e[f-1]?g="property":"."===e[f+1]&&(g="object"),g&&(b=E({class:g},b)),b}}),b},f=/([a-zA-Z0-9:+._-]+@[a-zA-Z0-9._-]+)/g,g=function(a){return a.split(f).map(function(a){if(f.test(a)){var b=a.startsWith("mailto:")?a:"mailto:".concat(a),c=a.replace("mailto:","");return P({class:"email",to:b},c)}return e(a)})},h=function(a,b){return[l(a.substring(0,b)),l(a.substring(b))]},i=function(a){return a.split(/(?= )/).map(function(a){return a.includes("://")?P({to:a},a):l(a)})},j=function(a){return a.includes("://")&&!a.includes("@")?i(a):g(a)},k=function(a){var c=a.replace(/"/g,"'"),d=c.split("'"),f=b(d),g=f[0],h=f[1],i=f.slice(2),k=i;1===k.length?k=l(k[0]):1<k.length&&(k=l(k.join("'")));var m=[];return m="undefined"==typeof h?e(a):[e(g),E({class:"string"},["'",j(h),"'"]),k],m},l=function(a){var b=a.indexOf("//"),c=a.trim();if(c.startsWith("//")){for(var d=a.search(/\S|$/),e="",f=0;f<d;f++)e+=" ";return c.startsWith("// ")||(a="".concat(e,"// ").concat(c.substr(2))),E({class:"comment"},[e,"// ",l(c.substring(3))])}return-1<b&&":"!==a[b-1]?h(a,b):2<a.indexOf("://")?i(a):a.indexOf("@")&&a.includes(".")&&!a.trim().includes(" ")?g(a):k(a)},m=function(a){return s({class:"line"},l(a))};return{format:function format(a){return a.trim().split("\n").map(m)}}}()},Y={page:{addClass:function addClass(a,b){return a.pageClass.includes(b)?a:f({},a,{pageClass:"".concat(a.pageClass," ").concat(b)})},removeClass:function removeClass(a,b){return a.pageClass.includes(b)?(b=a.pageClass.replace(b,"").replace(/\s\s+/g," "),f({},a,{pageClass:b})):a},toggleClass:function toggleClass(a,b){return a.pageClass.includes(b)?Y.page.addClass(a,b):Y.page.removeClass(a,b)},replaceClass:function replaceClass(a,b){var c=i(b,2),d=c[0],e=c[1];return a.pageClass.includes(d)&&(a=Y.page.removeClass(a,d)),a.pageClass.includes(e)||(a=Y.page.addClass(a,e)),f({},a)}},pop:function pop(a,b){var c=window.location,d=c.pathname,e=c.hash;return e=e.substring(1),b.state&&(d=b.state.url,e=b.state.hash),e?window.location.hash=e:window.scrollTo(0,0),f({},a,{url:d,hash:e})},go:function go(a,b){var c=b.currentTarget.href.replace(window.location.origin,""),d=c.split("#"),e=i(d,2),g=e[0],h=e[1],j=void 0===h?"":h;if(g===a.url&&j===a.hash)return a;if(window.history.pushState({url:g,hash:j},"",c),j){var k=document.getElementById(j);k&&window.scrollTo(0,k.scrollTop),window.location.hash=j}else window.scrollTo(0,0);return f({},a,{url:g,hash:j,prev:a.url})},changeTheme:function changeTheme(a){var b="dark"===a.theme?"light":"dark";return f({},Y.page.replaceClass(a,[a.theme,b]),{theme:b})},pre:{clip:function clip(a,b){var c=b.content;if("undefined"!=typeof document&&"function"==typeof document.execCommand){var d=document.createElement("textarea");d.id="copy",d.innerHTML=c,document.body.appendChild(d);var e=document.getElementById("copy");e.select(),document.execCommand("copy"),document.body.removeChild(e)}return a}}},Z={"/core/":function core(a){return[v(a.title),t([w("welcome to the magic docs."),D("the goal of this document is to give you a rough @magical overview."),J("magic/core"),w({id:"philosophy"},"philosophy"),D(["@magic aims to make it easy to stitch together any kind of webapp."," by providing simple, well documented and self contained modules,"," @magic makes it possible to create stunningly fast webpages."]),w({id:"privacy"},"privacy"),D(["@magic does not spy on it's users."," we not only try to be legally compliant,"," but additionally to be ethical and do the right thing for your users."]),w({id:"buzzwords"},"why should i use magic?"),x("@magic is tiny"),D(["~4 kb javascript boilerplate."," usually, all the javascript in your homepage will be 30-60kb big (after unpacking),"," 10-30kb get transmitted from the server to the client."," this complete documentation page you are reading with all sub pages loads about 50kb of unpacked,"," 15kb of gzipped javascript. (values may be out of date and depend on cdn settings)"]),x("@magic works without javascript"),D(["most of the functionality works without javascript,"," buttons and realtime user interactions obviously won't."]),x("@magic generates static pages"),D(["this makes free hosting (using github or gitlab pages) possible."," and it's easy."]),D(["@magic publishes to ",P({to:"https://github.com"},"github"),", ",P({to:"https://gitlab.com"},"gitlab")," and any other git-pages enabled hosting service."]),x("serverless / faas"),D(["automagically generates "," serverless lambdas, derived from the ",P({to:"https://github.com/magic-modules/"},"@magic-modules")," you use in your pages."," this makes visitor statistics, user authentication and authorization, chat, and all other server side services possible."])]),O(a)]},"/core/404/":function core404(){return t("404 - not found")},"/core/concepts/":function coreConcepts(a){return[v(a.title),D("magic concepts. These are the building blocks of every module in a magic app"),t([w({id:"modules"},"@magic-modules"),D("modules are the main building block of magic."),D(["a page is a module, a button is a module, a link is a module, an image is a module."," a @magic app contains modules containing modules that contain modules."," this can lead to inception."])]),t([w({id:"state"},"state"),t([D("state is a javascript object."),D("state can be mutated by actions or effects."),D("every rendering step, the state determines the output of the view")])]),t([w({id:"actions"},"actions"),D("actions are an object containing functions"),D("those functions get the state and their props and may return a new full, but changed, state.")]),t([w({id:"effects"},"effects"),D("effects are an object containing functions, just like actions."),D("they behave like actions, get a state and props and may return a new full, but changed, state."),D("alternatively, you can call any action from within any other action.")]),t([w({id:"views"},"views"),D("views render the state to html"),D("whenever an action triggers a statechange, this statechange then triggers a view change.")]),t([w({id:"styles"},"styles"),D("every module can have a style object attached to it."),D("magic will automagically merge all styles into one global css file."),D("in the future, it will also remove unused styles for you."),D("style merge order from lowest to highest:"),D("module.style < page.style < app.style < theme.style"),x({id:"styles-magic-css"},"@magic/css"),D("internally, magic uses it's own css-in-js library."),D("to find out more, click the following link:"),P({to:"https://magic.github.io/css/"},"@magic/css")]),t([w({id:"globals"},"global"),D("every module can set a global object, containing state and action properties."),D("every key in the mod.global object that is set to true gets merged into the main app state/actions.")]),t([w({id:"lambdas"},"server lambdas"),D("this is the serverside magic."),D("you can define functions that get transpiled into serverside lambdas."),D("server side lambdas will be available for GET and POST requests."),D(["the server side function signature is (req, res) => {},"," as in any nodejs http server, with the addition of req.body being async => awaited before execution of the lambda."])]),t([w({id:"libs"},"external libs"),D(["what would javascript be without the millions of dependencies"," that you can easily install and make the average webpage "," slow[ly] (pun intended) grow towards a footprint of 5 megabytes."]),D("as the sarcastic remark might demonstrate, we think that all of that bloat is unneeded, unheeded and, frankly, not optimal."),D(["magic has one external client side dependency, ",P({to:"https://github.com/jorgebucharan/hyperapp"},"hyperapp"),", [~400 lines that provide our ui state machine]. thats it. and it won't change."]),D("we also have the tendency to write libraries specialized for our usecase, see @magic/css, @magic/test, @magic/"),D(["once there is a lib key in at least one component,"," window.lib (browser) and global.lib (nodejs) will be set,"," aliasing lib as a global variable in both environments"]),x({id:"libs-dir-or-file"},"lib dir or file"),D(["if you need libraries in multiple otherwise independent modules,"," it might be easier to keep your library dependencies in a central place."," to achieve this, one can simply create /assets/lib.mjs and export an object from it."," this object will get merged into the globalThis.lib object that is available throughout your app.",V("export default { name: () => {} }"),"will turn into",V("lib.name = () => {}")])]),O(a)]},"/core/files/":function coreFiles(a){var b={page:"\nexport default {\n  state: {\n    variable: 'test',\n  },\n  actions: {\n    changeVar: () => ({ variable: 'changed' }),\n  },\n  style: {\n    '.cl': {\n      color: 'green',\n    },\n  },\n  View: state => div({ class: 'cl' }, [\n    'this is the page content.',\n    state.variable,\n  ]),\n}",assets:"\nexport default {\n  Custom: () => div('custom component'),\n  Pre: require('@magic-modules/pre),\n}",app:"\nexport default {\n  state: {\n    globalStateVar: 'globally available',\n  },\n  actions: {\n    globalAction: () => ({ globalStateVar: 'overwritten.' }),\n  },\n  style: {\n    'body': {\n      color: 'green',\n    },\n  },\n}",config:"\nexport default {\n  ROOT: 'example',\n  THEME: 'blue',\n  WEB_ROOT: '/core/',\n\n  // this option adds the\n  // 'X-Clacks-Overhead', 'GNU Terry Pratchet'\n  // http header\n  // see http://www.gnuterrypratchett.com/\n  FOR_DEATH_CAN_NOT_HAVE_HIM: true,\n\n  // default CLIENT_LIB_NAME, overwrite to change names of transpiled css and js files\n  CLIENT_LIB_NAME: 'magic',\n}",theme:"\nexport default {\n  'body': {\n    color: 'blue',\n  },\n}"};return[v(a.title),D("There are multiple magic files and directories."),F([B("/pages - files in the page directory map to urls in your app."),B("/assets - custom components, @magic-modules get imported here"),B("/assets/static - static files"),B("/assets/themes - theme directory, @magic-themes get imported here"),B("/assets/lib.js - imports npm and local but external packages into your app"),B("/app.js - gets merged into the app, can set state, actions, style here"),B("/config.js - custom config for your app"),B("/assets/Menu.js - custom Menu for your app")]),w({id:"pages"},"/pages"),D("the pages dir contains the pages of your webapp."),D(["each page has it's own state and actions, ","but also inherits the global state and actions from the app and it's dependencies"]),x({id:"pages-dir-structure"},"pages directory to url map, for the domain mag.ic:"),V("\n/pages/index.js === http://mag.ic/\n/pages/pageName.js === http://mag.ic/pageName/\n/pages/page-name.js === http://mag.ic/page-name/\n/pages/page_name.js === http://mag.ic/page_name/\n/pages/dir/index.js === http://mag.ic/dir/\n/pages/dir/name.js === http://mag.ic/dir/name/\n"),x({id:"pages-example"},"example page:"),V(b.page),w({id:"assets"},"/assets"),D("the assets dir contains custom components of your app."),D("you can additionally import @magic-modules here"),x({id:"assets-example"},"example /assets/index.js"),V(b.assets),w({id:"static"},"/assets/static"),D("the static dir contains all of your static assets."),D("every file in this directory gets copied to the public dir."),D("image and svg files get minified using imagemin"),D(["text and binary files get compressed using the optional ",P({to:"https://github.com/jaeh/node-zopfli-es"},"node-zopfli-es")," (if it is installed)"]),w({id:"themes"},"/assets/themes"),D("the themes directory contains... themes."),D("at the moment this is file based, which means you have to manually import themes there."),x({id:"themes-example"},"example theme"),V(b.theme),w({id:"app"},"/assets/app.js"),D("the /app.js file allows you to set global state, actions, and styles"),x({id:"app-example"},"example /app.js"),V(b.app),w({id:"config"},"/config.js"),D("the /config.js file allows you to set various aspects of your app"),x({id:"config-example"},"example /config.js"),V(b.config),w({id:"menu"},"/assets/Menu.js"),D("the /assets/Menu.js file allows you to replace the default Menu component"),x({id:"menu-example"},"example /assets/Menu.js"),P({to:"https://github.com/magic/core/blob/master/src/modules/Menu.js"},"Menu.js on github"),O(a)]},"/core/libraries/":function coreLibraries(a){return[v(a.title),N(),O(a)]},"/core/modules/":function coreModules(a){return[v(a.title),D("magic modules are predefined modules for webapps."),w({id:"definition"},"module definition:"),D("the minimal module is a function that returns some html."),V("\n// /assets/ModuleName.mjs\n\n// simplest module\nexport const View = () => div('hello, world')\n\n// complete signature\nexport const View = (props = {}, children = []) => div('hello, world')\n"),w({id:"usage"},"usage"),D(["if the npm package name starts with @magic-modules/ or magic-module-, it will get imported automagically."," the name of the Module will be set to a PascalCased version of the remainder of the module name"," for example, @magic-modules/git-badges turns into GitBadges."," the same is true for all uppercased files in your /assets directory."," in the rare case where you want to install a npm module that can not be found, you can import it in /assets/index.mjs"]),V("\n// /assets/index.mjs\nexport default {\n  // ...otherModules\n\n  // load module from node_modules\n  NpmModule: require('not-standard-named-magic-module-from-npm'),\n}"),D("after this, the module will be a global in your app and can be used like any other component."),V("\n// any page or module\nexport default () => div([\n  'modules that do not need props can be used without calling them as a function ',\n  Mod,\n  'modules that need props: ',\n  Mod(propObject),\n"),w({id:"custom-module"},"Mod and Mod.Component:"),S(a),S.Component({title:"Mod Component Title, passed via props"}),x("Mod sourcecode:"),V("\nexport const View = state =>\n  div({ class: 'Mod' }, [\n    h3('Mod.Mod'),\n    p([\n      'this is Mod. it gets loaded from ',\n      Link({ to: 'https://github.com/magic/core/example/assets/module.js' }, '/assets/module.js'),\n    ]),\n    p([\n      'and imported in ',\n      Link({ to: 'https://github.com/magic/core/example/assets/index.js' }, '/assets/index.js'),\n    ]),\n    p(['the state of this module: ', JSON.stringify(state.module)]),\n  ])\n\nexport const state = {\n  module: {\n    test: 'testing',\n  },\n}\n\nexport const style = {\n  margin: '0 0 1em',\n  padding: '0.5em',\n  border: '1px solid',\n  borderColor: 'green',\n\n  h3: {\n    margin: 0,\n  },\n}\n\nexport const global = {\n  state: {\n    module: true,\n  },\n}\n\nexport const Component = props => {\n  props = typeof props === 'string' ? { header: props } : props\n  CHECK_PROPS(props, propTypes, 'ModComponent')\n  const header = props.header || props.title\n\n  return div({ class: 'ModComponent' }, [\n    header && h5(header),\n    p([\n      'Mod.Component, a second component in ',\n      Link({ to: 'https://github.com/magic/core/example/assets/module.mjs' }, '/assets/module.mjs'),\n    ]),\n  ])\n}\n\nComponent.style = {\n  border: '1px solid orange',\n}\n\nexport const propTypes = {\n  ModComponent: [{ key: 'header', type: ['string', 'array'], required: ['title'] }],\n}\n"),w({id:"check-props"},"check props"),D("@magic-modules can export a .propTypes key with an array of prop types."),D("more docs coming soon"),w({id:"preinstalled"},"preinstalled magic modules"),D("magic has some preinstalled modules that will be used in most pages."),w({id:"app"},"app"),D("this is the main app module. it has magically inherited properties and all of it is customizable."),D(["to add actions/state/style to the app you can just create an /assets/app.mjs file.","the contents of this file get ",P({to:"https://github.com/magic/deep",text:"deep .merged"})," into the app"]),V("\n// /assets/app.mjs\nexport const state = {\n  merge: 'gets merged into state',\n}\nexport const actions = {\n  mergedActions: () => ({ merge: 'merged action executed' }),\n}\nexport const style = {\n  body: {\n    backgroundColor: 'white',\n  },\n}\n"),w({id:"menu"},"menu"),D("the Menu module provides... menus."),D(["just pass it a string which is the state key of the menu,"," then add that menu to the /assets/app.mjs file."]),D(["by default, the menu will only show submenu items if their parent link is active."," to force submenu items to show at all times, just pass a collapse: false prop"]),V("\n// assets/app.mjs\nexport default {\n  state: {\n    // ...state\n    menuName: [\n      { to: '/example-page', text: 'example page' },\n      { to: 'https://example.com', text: 'example.com' },\n      { to: 'https://example.com', nofollow: true, noreferrer: true, target: 'utopia', text: 'nofollow and noref\" },\n    ],\n  },\n  // ... rest of app.mjs\n}"),D("then, in a page or module"),V("\nexport default () => Menu({ name: 'menuName', collapse: false })\n\n// output:\n<nav class=\"Menu\">\n  <ul>\n    <li>\n      <a onclick=\"actions.go\" href=\"{{ WEB_ROOT }}example-page\">example page</a>\n    </li>\n    <li>\n      <a href=\"https://example.com\" target=\"_blank\" rel=\"noopener\">example.com</a>\n    </li>\n    <li>\n      <a href=\"https://example.com\" target=\"utopia\" rel=\"noopener nofollow noreferrer\">nofollow and noref</a>\n    </li>\n  </ul>\n</nav>\n}"),x({id:"menu-props"},"Menu props"),D("the Menu module allows multiple props to be passed when instantiating the Menu"),V("\nMenu({\n  collapse: false, // (default: true) menu will always show all submenu items\n})"),x({id:"menu-item-props"},"Menu.Item props"),D(["every MenuItem accepts props the same props as a link does."," additionally a MenuItem accepts a items prop with sub menu items."]),V("\nconst menuItem = ({\n  to: '/url',\n  text: 'link text',\n  items: [SubMenuItems],\n  noreferrer: true, // set rel='noreferer'\n  nofollow: true, // set rel='nofollow'\n})"),x({id:"menu-sub-menus"},"sub menus"),D("to define a submenu, simply define a .items array on the menu item"),V("\n// assets/app.mjs\nexport default {\n  state: {\n    // ...state\n    menuName: [\n      {\n        to: '/example-page',\n        text: 'example page',\n        items: [\n          { to: '/example-page/#sub', text: 'example sub page' },\n      ] },\n    ],\n  },\n  // ... rest of app.mjs\n}"),w({id:"link"},"link"),D("the link module allows you to link to things."),V("\n// in any page or module View\nexport default () => [\n  Link({ to: '/page', text: 'page' }),\n  // output: <a href=\"/page\" onclick=\"actions.go\">page</a>\n  Link({ to: 'https://example.com', text: 'page' }),\n  // output: <a href=\"https://example.com\" target=\"_blank\" rel=\"noopener\">page</a>\n  Link({ to: '/page', text: 'page', nofollow: true, noreferrer: true }),\n  // output: <a href=\"https://example.com\" target=\"_blank\" rel=\"nofollow noreferrer noopener\">page</a>\n\n  // you can also use children syntax instead of the text prop:\n  Link({ to: '/' }, 'home'),\n\n  // Link also supports # hash links\n  Link({ to: '/#hash' }, 'home with hash'),\n]"),w({id:"img"},"img"),D("the img module adds some sane default values to your images."),V("\n// in any page or module View\nexport default () => [\n  Img('/image.png'),\n  // output: <img src=\"/image.png\" alt=\"\" role=\"presentation\"/>\n  Img({ src: '/image.png }),\n  // output: <img src=\"/image.png\" alt=\"\" role=\"presentation\"/>\n  Img({ src: '/image.png', alt: 'image description' }),\n  // output: <img src=\"/image.png alt=\"image description\" />\n  Img({ src: '/image.png', title: 'image title', }),\n  // output: <img src=\"/image.png\" title=\"image title\" alt=\"image title\"/>\n  Img({ src: '/image.png', title: 'image title', alt: 'image alt' }),\n  // output: <img src=\"/image.png\" title=\"image title\" alt=\"image alt\"/>\n]"),w({id:"footer"},"footer"),D("the footer module contains a small info text and a link to the magic github repository."),D("to overwrite this behaviour, just place a Footer.mjs file in your assets and require it in /assets/index.mjs."),V("\n// /assets/Footer.mjs:\nconst Footer = () =>\nfooter({ class: 'main' }, [\n  div({ class: 'wrapper' }, [\n    'made with a few bits of ',\n    Link({ href: 'https://github.com/magic/core', target: '_blank', rel: 'noopener' }, 'magic'),\n  ]),\n])\n\nFooter.style: {\n  'footer.main': {\n    position: 'relative',\n    textAlign: 'center',\n    padding: '5em 0 .5em',\n  },\n}\n\nexport default Footer\n"),T(),O(a)]},"/core/themes/":function coreThemes(a){return[v(a.title),D("magic themes are themes for magic apps. you decide which theme to load by specifying the theme name in config.THEME"),V("\n// /config.js\nexport default {\n  // ...rest of config,\n  THEME: 'blue',\n}\n"),w("theme load order"),D("themes get loaded from multiple places. last in the list overwrites earlier entries."),V("\n// ...default module styles get inserted here\n/node_modules/@magic/core/src/themes/THEME/index.js\n/node_modules/@magic-themes/THEME\n/assets/themes/THEME/index.js\n"),W(),O(a)]}};h({init:function init(){return f({},G,{url:window.location.pathname})},subscriptions:function subscriptions(){return[[H.listenPopState,Y.pop]]},view:function view(a){var b=Z[a.url]?a.url:"/404/",c=Z[b];if(a.pages){var d=a.pages[b];for(var e in d)a[e]=d[e]}return U({page:c,state:a})},node:document.getElementById("Magic")});