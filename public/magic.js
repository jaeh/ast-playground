function _toArray(a){return _arrayWithHoles(a)||_iterableToArray(a)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||Object.prototype.toString.call(a)==="[object Arguments]")return Array.from(a)}function _arrayWithHoles(a){if(Array.isArray(a))return a}function h(a,b){var c=[];var d=[];var e=arguments.length;while(e-->2){c.push(arguments[e])}while(c.length){var f=c.pop();if(f&&f.pop){for(e=f.length;e--;){c.push(f[e])}}else if(f!=null&&f!==true&&f!==false){d.push(f)}}return typeof a==="function"?a(b||{},d):{nodeName:a,attributes:b||{},children:d,key:b&&b.key}}function app(a,b,c,d){var v=[].map;var w=d&&d.children[0]||null;var x=w&&e(w);var y=[];var z;var A=true;var B=j(a);var C=m([],B,j(b));h();return C;function e(a){return{nodeName:a.nodeName.toLowerCase(),attributes:{},children:v.call(a.childNodes,function(a){return a.nodeType===3?a.nodeValue:e(a)})}}function f(a){return typeof a==="function"?f(a(B,C)):a!=null?a:""}function g(){z=!z;var a=f(c);if(d&&!z){w=u(d,w,x,x=a)}A=false;while(y.length){y.pop()()}}function h(){if(!z){z=true;setTimeout(g)}}function j(a,b){var c={};for(var d in a){c[d]=a[d]}for(var d in b){c[d]=b[d]}return c}function k(a,b,c){var d={};if(a.length){d[a[0]]=a.length>1?k(a.slice(1),b,c[a[0]]):b;return j(c,d)}return b}function l(a,b){var c=0;while(c<a.length){b=b[a[c++]]}return b}function m(a,b,c){for(var d in c){typeof c[d]==="function"?function(d,e){c[d]=function(d){var f=e(d);if(typeof f==="function"){f=f(l(a,B),c)}if(f&&f!==(b=l(a,B))&&!f.then){h(B=k(a,j(b,f),B))}return f}}(d,c[d]):m(a.concat(d),b[d]=j(b[d]),c[d]=j(c[d]))}return c}function n(a){return a?a.key:null}function o(a){return a.currentTarget.events[a.type](a)}function p(a,b,c,d,e){if(b==="key"){}else if(b==="style"){if(typeof c==="string"){a.style.cssText=c}else{if(typeof d==="string")d=a.style.cssText="";for(var f in j(d,c)){var g=c==null||c[f]==null?"":c[f];if(f[0]==="-"){a.style.setProperty(f,g)}else{a.style[f]=g}}}}else{if(b[0]==="o"&&b[1]==="n"){b=b.slice(2);if(a.events){if(!d)d=a.events[b]}else{a.events={}}a.events[b]=c;if(c){if(!d){a.addEventListener(b,o)}}else{a.removeEventListener(b,o)}}else if(b in a&&b!=="list"&&b!=="type"&&b!=="draggable"&&b!=="spellcheck"&&b!=="translate"&&!e){a[b]=c==null?"":c}else if(c!=null&&c!==false){a.setAttribute(b,c)}if(c==null||c===false){a.removeAttribute(b)}}}function q(a,b){var c=typeof a==="string"||typeof a==="number"?document.createTextNode(a):(b=b||a.nodeName==="svg")?document.createElementNS("http://www.w3.org/2000/svg",a.nodeName):document.createElement(a.nodeName);var d=a.attributes;if(d){if(d.oncreate){y.push(function(){d.oncreate(c)})}for(var e=0;e<a.children.length;e++){c.appendChild(q(a.children[e]=f(a.children[e]),b))}for(var g in d){p(c,g,d[g],null,b)}}return c}function r(a,b,c,d){for(var e in j(b,c)){if(c[e]!==(e==="value"||e==="checked"?a[e]:b[e])){p(a,e,c[e],b[e],d)}}var f=A?c.oncreate:c.onupdate;if(f){y.push(function(){f(a,b)})}}function s(a,b){var c=b.attributes;if(c){for(var d=0;d<b.children.length;d++){s(a.childNodes[d],b.children[d])}if(c.ondestroy){c.ondestroy(a)}}return a}function t(a,b,c){function d(){a.removeChild(s(b,c))}var e=c.attributes&&c.attributes.onremove;if(e){e(b,d)}else{d()}}function u(a,b,c,d,e){if(d===c){}else if(c==null||c.nodeName!==d.nodeName){var g=q(d,e);a.insertBefore(g,b);if(c!=null){t(a,b,c)}b=g}else if(c.nodeName==null){b.nodeValue=d}else{r(b,c.attributes,d.attributes,e=e||d.nodeName==="svg");var h={};var j={};var l=[];var m=c.children;var o=d.children;for(var p=0;p<m.length;p++){l[p]=b.childNodes[p];var s=n(m[p]);if(s!=null){h[s]=[l[p],m[p]]}}var p=0;var v=0;while(v<o.length){var s=n(m[p]);var w=n(o[v]=f(o[v]));if(j[s]){p++;continue}if(w!=null&&w===n(m[p+1])){if(s==null){t(b,l[p],m[p])}p++;continue}if(w==null||A){if(s==null){u(b,l[p],m[p],o[v],e);v++}p++}else{var x=h[w]||[];if(s===w){u(b,x[0],x[1],o[v],e);p++}else if(x[0]){u(b,b.insertBefore(x[0],l[p]),x[1],o[v],e)}else{u(b,l[p],null,o[v],e)}j[w]=o[v];v++}}while(p<m.length){if(n(m[p])==null){t(b,l[p],m[p])}p++}for(var p in h){if(!j[p]){t(b,h[p][0],h[p][1])}}}return b}}var C=function(b){return function(){var d=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!e){if(typeof d==="string"||typeof d==="number"||Array.isArray(d)){e=d;d={}}}return h(b,d,e)}};var div=C("div");var button=C("button");var h1=C("h1");var i=C("i");var Inside=function b(a){return i(a.app.title)};var li=C("li");var p=C("p");var ul=C("ul");var Wrapper={View:function c(a,b){return div({class:"Wrapper".concat(a.wrapperStateVar?" Test":"")},[Inside(a,b),button({onclick:b.wrapperAction},a.buttonText)])}};var Count={View:function c(a,b){return div([h1("Counter"),div("count: ".concat(a.count)),div("this counter globally shares it's state with all other counters"),button({onclick:function(){return b.count(1)}},"+1"),button({onclick:function(){return b.count(10)}},"+10"),button({onclick:function(){return b.count(-1)}},"-1"),button({onclick:function(){return b.count(-10)}},"-10")])}};var a=C("a");var Link={View:function e(b){var c=b.to,d=b.text;return function(b,e){return a({href:c,onclick:e.go},d)}}};var nav=C("nav");var Menu={View:function(a){var b=a.name,c=b===void 0?"menu":b;return function(a,b){if(!a[c]||!a[c].length){return}if(typeof window!=="undefined"){window.addEventListener("popstate",b.go)}return nav({class:"Menu"},[ul(a[c].map(function(b){return[li({class:a.url===b.to?"active":""},[Link.View(b)])]}))])}}};var h3=C("h3");var u=C("u");var span=C("span");var h4=C("h4");var Pre={View:function c(a){return div({class:"Pre"},function l(a){var f=function(a){if(typeof a!=="string"){return a}var e=a.split(/\b/);a=e.map(function(a,f){if(a===""){return}var g="";if(e[f+1]&&e[f+1].includes(":")){g="colon"}else if(j(a)){g="tag"}else if("\nlet this long package float\ngoto private class if short\nwhile protected with debugger case\ncontinue volatile interface\n\ninstanceof super synchronized throw\nextends final export throws\ntry import double enum\n\nboolean abstract function\nimplements typeof transient break\nvoid static default do\n\nboolean abstract implements\ntypeof function do break\nvoid static default transient\n\nint new async native switch\nelse delete null public var\nawait byte finally catch\nin return for get const char\n".includes(a)){g="keyword"}else if("\nArray Object String Number RegExp Null Symbol\nSet WeakSet Map WeakMap\nsetInterval setTimeout\nPromise\nJSON\nInt8Array Uint8Array Uint8ClampedArray\nInt16Array Uint16Array\nInt32Array Uint32Array\nFloat32Array Float64Array\n".includes(a)){g="builtin"}else if(a==="state"){g="state"}else if(a==="actions"){g="actions"}else if("true false".includes(a)){g="boolean"}if(g){a=span({class:g},a)}return a});return a};var h={canvas:1,video:1};var i=function(a){var b=a.replace(/("|')q/g,"'");var c=b.split("'"),d=_toArray(c),e=d[0],g=d[1],h=d.slice(2);var j=[];if(typeof g!=="undefined"){j=[f(e),span({class:"string"},"'".concat(g,"'")),i(h.join("'"))]}else{j=f(a)}return j};var j=function b(a){if(h.hasOwnProperty(a)){return true}else{try{var c=typeof global!=="undefined"?Array.from(global.keys).includes(a):document.createElement(a).toString()==="[object HTMLDivElement]";if(c){h[a]=true;return true}}catch(a){}}};var k=a.split("\n").map(function(a){if(a.trim().startsWith("/ast-playground//")){return div({class:"line comment"},a)}var b=i(a);return div({class:"line"},b)});return k}(a))}};var header=C("header");var img=C("img");var pages={"/ast-playground/deep/":function c(a,b){return[h1(a.title),div("page content"),Count.View(a,b)]},"/ast-playground/docs/concepts/":function d(){var a={state:"\n// state variables can be anything you can JSON.stringify()\nstate: {\n  variable: true,\n  args: 'none',\n}",actions:"\n// actions are an object containing functions.\n// if an action returns an object, this object gets merged into the state\nactions: {\n  changeVariable: args => state => ({\n    variable: !state.variable,\n    args,\n  }),\n  callActionInAction: () => async (state, actions) => {\n    // just await something inside an action to create an async action\n    await new Promise(resolve => {\n      setTimeout(resolve, 200)\n    })\n\n    // actions can call other actions\n    actions.changeVariable(state.variable ? 'arg passed to function' : '')\n  },\n}",global:"\nglobal: {\n  state: {\n    variable: true,\n    args: true,\n  },\n  actions: {\n    callActionInAction: true,\n    changeVariable: true,\n  },\n}",view:"\nView: (state, actions) => (\n  div({ onclick: actions.callActionInAction }, state.variable)\n)",style:"\nstyle: {\n  '.className': {\n    color: 'green',\n\n    // expands to .className:hover because of the &\n    '&:hover': {\n      color: 'orange',\n    },\n\n    // expands to .className .childClass\n    '.childClass': {\n      color: 'blue',\n    },\n  },\n  // css ids\n  '#id': {\n    color: 'yellow',\n  },\n  // default html tag styles\n  div: {\n    color: 'black',\n  },\n}"};var b=function(a){return a.split("\n").map(function(a){return"  ".concat(a)}).join("\n")};var c="\nconst component = {\n  ".concat(b(a.state),",\n  ").concat(b(a.actions),",\n  ").concat(b(a.style),",\n  ").concat(b(a.view),",\n  ").concat(b(a.global),",\n}");return[h1("concepts"),div([div([h3("components"),p("components are the main building block of magic."),p("components can include state, actions, style and multiple Views")]),div([h3("state"),div([p("state is a javascript object."),p("state can be mutated by actions."),p("every rendering step, the state determines the output of the view"),h4("example state:"),Pre.View(a.state)])]),div([h3("actions"),p("actions are an object of functions"),p("those functions get passed a state object and return a new partial state"),h4("example functions"),Pre.View(a.actions)]),div([h3("views"),p("views render the state to html"),p("whenever an action triggers a statechange, this statechange then triggers a view change."),Pre.View(a.view)]),div([h3("styles"),p("every component can have a style object attached to it."),p("magic will automagically merge all styles into one global css file."),p("in the future, it will also remove unused styles for you."),Pre.View(a.style)]),div([h3("global"),p("every component can set a global object, containing state and action properties."),Pre.View(a.global)]),div([h3("Full component"),p("If we assemble those pieces, we get the following:"),Pre.View(c)])])]},"/ast-playground/docs/":function c(a){return[h1(a.title),div([p("Welcome to the magic docs."),p("The goal of this document is to give you a rough @magical overview.")]),h3("Contents:"),Menu.View({name:"docMenu"})]},"/ast-playground/":function c(a,b){return[h1(a.title),div([p("index page content"),p("can stretch multiple lines"),ul([li("and contain"),li("lists of content")])]),Count.View(a,b),Wrapper.View(a,b)]},"/ast-playground/404/":function c(){return div("404 - not found")}};var state={"app":{"title":"Custom App Title","description":"Custom App Description"},"url":"/ast-playground/","menu":[{"to":"/ast-playground/","text":"home"},{"to":"/ast-playground/deep/","text":"deep"},{"to":"/ast-playground/docs/","text":"docs"}],"logo":"/ast-playground/logo.png","pages":{"/ast-playground/deep/":{"title":"h1 deep/index","htmlTitle":"testing the html title tag","url":"/ast-playground/deep/"},"/ast-playground/docs/":{"title":"@magic/core docs","description":"@magic/core documentation directory.","docMenu":[{"to":"/ast-playground/docs/concepts/","text":"concepts"}]},"/ast-playground/":{"title":"h1 indexpage","description":"custom description","wrapperStateVar":false,"buttonText":"click me!"}},"count":0};state.url=window.location.pathname;var actions={"go":function b(a){return function(b){a.preventDefault();var c=b.url;if(a.target&&a.target.href){c=a.target.href.replace(window.location.origin,"");if(c!==b.url){window.history&&window.history.pushState({urlPath:c},"",c)}}else{if(a.state){c=a.state.urlPath}else{c="/ast-playground/"}}return{url:c,prev:b.url}}},"pages":{"/ast-playground/deep/":{"deepAction":function b(a){return{test:!a.test}}},"/ast-playground/":{"wrapperAction":function a(){return function(a){return{wrapperStateVar:!a.wrapperStateVar}}}}},"count":function b(a){return function(b){return{count:b.count+a}}}};function view(a,b){var c=pages[a.url];var d=a.pages[a.url];for(var f in d){a[f]=d[f]}var e=b.pages[a.url];for(var g in e){b[g]=e[g]}return div({class:"wrapper"},[header({class:"main"},[a.logo&&img({class:"logo",src:a.logo,height:100,width:200,role:"presentation"}),a.menu&&Menu.View(a,b)]),c?c(a,b):div("404 - not found")])}var d=document;var mD=d.getElementById("magic");if(!mD){mD=d.createElement("div");mD.id="magic";d.body.appendChild(mD)}app(state,actions,view,mD);