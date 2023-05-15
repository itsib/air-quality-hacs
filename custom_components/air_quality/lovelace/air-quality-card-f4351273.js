var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};function e(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function s(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}var i=function(){return i=Object.assign||function(t){for(var e,i=1,s=arguments.length;i<s;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t},i.apply(this,arguments)};function s(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}function n(t){var e="function"==typeof Symbol&&Symbol.iterator,i=e&&t[e],s=0;if(i)return i.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&s>=t.length&&(t=void 0),{value:t&&t[s++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const r=window,o=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),l=new WeakMap;class d{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(o&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=l.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&l.set(e,t))}return t}toString(){return this.cssText}}const c=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new d(i,t,a)},h=(t,e)=>{o?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=r.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))},u=o?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new d("string"==typeof t?t:t+"",void 0,a))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var p;const v=window,_=v.trustedTypes,m=_?_.emptyScript:"",f=v.reactiveElementPolyfillSupport,y={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),$={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:g};class b extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||$}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return h(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=$){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:y).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:y;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var A;b.finalized=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:b}),(null!==(p=v.reactiveElementVersions)&&void 0!==p?p:v.reactiveElementVersions=[]).push("1.6.1");const w=window,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",q=`lit$${(Math.random()+"").slice(9)}$`,C="?"+q,P=`<${C}>`,N=document,O=()=>N.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,U="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,j=/>/g,M=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),W=new WeakMap,V=N.createTreeWalker(N,129,null,!1),K=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===T?"!--"===l[1]?o=R:void 0!==l[1]?o=j:void 0!==l[2]?(B.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=M):void 0!==l[3]&&(o=M):o===M?">"===l[0]?(o=null!=n?n:T,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?M:'"'===l[3]?I:z):o===I||o===z?o=M:o===R||o===j?o=T:(o=M,n=void 0);const h=o===M&&t[e+1].startsWith("/>")?" ":"";r+=o===T?i+P:d>=0?(s.push(a),i.slice(0,d)+x+i.slice(d)+q+h):i+q+(-2===d?(s.push(void 0),e):h)}const a=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==S?S.createHTML(a):a,s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,a=this.parts,[l,d]=K(t,e);if(this.el=F.createElement(l,i),V.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=V.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(x)||e.startsWith(q)){const i=d[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+x).split(q),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Y:"?"===e[1]?et:"@"===e[1]?it:X})}else a.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(B.test(s.tagName)){const t=s.textContent.split(q),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],O()),V.nextNode(),a.push({type:2,index:++n});s.append(t[e],O())}}}else if(8===s.nodeType)if(s.data===C)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(q,t+1));)a.push({type:7,index:n}),t+=q.length-1}n++}}static createElement(t,e){const i=N.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){var n,r,o,a;if(e===D)return e;let l=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const d=k(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(e=J(t,l._$AS(t,e.values),l,s)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:N).importNode(i,!0);V.currentNode=n;let r=V.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new G(r,r.nextSibling,this,t):1===l.type?e=new l.ctor(r,l.name,l.strings,this,t):6===l.type&&(e=new st(r,this,t)),this._$AV.push(e),l=s[++a]}o!==(null==l?void 0:l.index)&&(r=V.nextNode(),o++)}return V.currentNode=N,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{constructor(t,e,i,s){var n;this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),k(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>H(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Q&&k(this._$AH)?this._$AA.nextSibling.data=t:this.$(N.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=F.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Z(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new F(t)),e}T(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new G(this.k(O()),this.k(O()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class X{constructor(t,e,i,s,n){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=J(this,t,e,0),r=!k(t)||t!==this._$AH&&t!==D,r&&(this._$AH=t);else{const s=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=J(this,s[i+o],e,o),a===D&&(a=this._$AH[o]),r||(r=!k(a)||a!==this._$AH[o]),a===Q?t=Q:t!==Q&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}r&&!s&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}const tt=E?E.emptyScript:"";class et extends X{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Q?this.element.setAttribute(this.name,tt):this.element.removeAttribute(this.name)}}class it extends X{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=J(this,t,e,0))&&void 0!==i?i:Q)===D)return;const s=this._$AH,n=t===Q&&s!==Q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==Q&&(s===Q||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class st{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const nt=w.litHtmlPolyfillSupport;null==nt||nt(F,G),(null!==(A=w.litHtmlVersions)&&void 0!==A?A:w.litHtmlVersions=[]).push("2.7.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt,ot;class at extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new G(e.insertBefore(O(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return D}}at.finalized=!0,at._$litElement$=!0,null===(rt=globalThis.litElementHydrateSupport)||void 0===rt||rt.call(globalThis,{LitElement:at});const lt=globalThis.litElementPolyfillSupport;null==lt||lt({LitElement:at}),(null!==(ot=globalThis.litElementVersions)&&void 0!==ot?ot:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ct=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ht(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):ct(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ut(t){return ht({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=({finisher:t,descriptor:e})=>(i,s)=>{var n;if(void 0===s){const s=null!==(n=i.originalKey)&&void 0!==n?n:i.key,r=null!=e?{kind:"method",placement:"prototype",key:s,descriptor:e(i.key)}:{...i,key:s};return null!=t&&(r.finisher=function(e){t(e,s)}),r}{const n=i.constructor;void 0!==e&&Object.defineProperty(i,s,e(s)),null==t||t(n,s)}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var vt;const _t=null!=(null===(vt=window.HTMLSlotElement)||void 0===vt?void 0:vt.prototype.assignedElements)?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function mt(t){const{slot:e,selector:i}=null!=t?t:{};return pt({descriptor:s=>({get(){var s;const n="slot"+(e?`[name=${e}]`:":not([name])"),r=null===(s=this.renderRoot)||void 0===s?void 0:s.querySelector(n),o=null!=r?_t(r,t):[];return i?o.filter((t=>t.matches(i))):o},enumerable:!0,configurable:!0})})}var ft,yt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ft||(ft={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(yt||(yt={}));var gt=function(t,e,i,s){s=s||{},i=null==i?{}:i;var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n};var $t="Air quality index (AQI)",bt="Air quality index (AQI Instant)",At="Recommendation:",wt={1:{label:"The Air is Clean"},2:{label:"Moderate Pollution",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should limit outdoor activities."},3:{label:"Increased Pollution",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should significantly limit outdoor activities."},4:{label:"High Pollution",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid being outdoors. Everyone else, especially children, should limit their outdoor activities."},5:{label:"Very High Pollution",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid even a short stay outdoors. Everyone else, especially children, should avoid being outdoors."},6:{label:"Climate Catastrophe",recommendation:"All groups of the population should avoid even a short stay in the open air."},7:{label:"Death and Destruction",recommendation:"All population groups are advised to stay indoors with filtered air. In the open air, it is necessary to use respirators."}},Et={label:"Choose the AQI calculation method",normal_way:"Average per day",instant_way:"Instant"},St="Invalid Configuration",xt="The number of Air Quality integration sensors should be 7",qt="Sensor {sensorName} not found",Ct={air_quality_index:$t,air_quality_index_instant:bt,recommendation:At,aqi_levels:wt,aqi_calc_method_selector:Et,invalid_configuration:St,invalid_sensors_count:xt,invalid_sensor:qt},Pt="Индекс качества воздуха (AQI)",Nt="Индекс качества воздуха (AQI Instant)",Ot="Рекомендации:",kt={1:{label:"Чистый Воздух",recommendation:""},2:{label:"Небольшое Загрязнение",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует ограничить пребывание на открытом воздухе."},3:{label:"Повышенное Загрязнение",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует существенно ограничить пребывание на открытом воздухе."},4:{label:"Высокое Загрязнение",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать пребывания на открытом воздухе. Все остальные, особенно дети, должны ограничить пребывание на открытом воздухе."},5:{label:"Ужасно Задымлено",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать даже кратковременного пребывания на открытом воздухе. Все остальные, особенно дети, должны избегать пребывания на открытом воздухе."},6:{label:"Климатическая Катастрофа",recommendation:"Всем группам населения следует избегать даже кратковременного пребывания на открытом воздухе."},7:{label:"Смерть и Разрушение",recommendation:"Всем группам населения рекомендуется оставаться в помещениях с отфильтрованным воздухом. На открытом воздухе необходимо пользоваться респираторами."}},Ht={label:"Выберите способ расчета AQI",normal_way:"Средний за сутки",instant_way:"В реальном времени"},Ut="Ошибка в конфигурации",Tt="Количество датчиков интеграции Air Quality должно быть равно 7",Rt="Датчик {sensorName} не найден",jt={air_quality_index:Pt,air_quality_index_instant:Nt,recommendation:Ot,aqi_levels:kt,aqi_calculation_method_selector:Ht,invalid_configuration:Ut,invalid_sensors_count:Tt,invalid_sensor:Rt};const Mt={en:Object.freeze({__proto__:null,air_quality_index:$t,air_quality_index_instant:bt,recommendation:At,aqi_levels:wt,aqi_calc_method_selector:Et,invalid_configuration:St,invalid_sensors_count:xt,invalid_sensor:qt,default:Ct}),ru:Object.freeze({__proto__:null,air_quality_index:Pt,air_quality_index_instant:Nt,recommendation:Ot,aqi_levels:kt,aqi_calculation_method_selector:Ht,invalid_configuration:Ut,invalid_sensors_count:Tt,invalid_sensor:Rt,default:jt})};function zt(t,e="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let n;try{n=t.split(".").reduce(((t,e)=>t[e]),Mt[s])}catch(e){n=t.split(".").reduce(((t,e)=>t[e]),Mt.en)}return void 0===n&&(n=t.split(".").reduce(((t,e)=>t[e]),Mt.en)),""!==e&&""!==i&&(n=n.replace(e,i)),n}function It(t){return t>500?7:t>300?6:t>200?5:t>150?4:t>100?3:t>50?2:1}let Bt=class extends at{static get styles(){return c`
      :host {
        font-family: var(--paper-font-body1_-_font-family);
        -webkit-font-smoothing: var(--paper-font-body1_-_-webkit-font-smoothing);
        font-size: var(--paper-font-body1_-_font-size);
        font-weight: var(--paper-font-body1_-_font-weight);
        line-height: var(--paper-font-body1_-_line-height);
        color: var(--primary-text-color);
      }

      ha-card {
        padding: 16px;
      }

      .content {
        height: 64px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .content .image {
        min-width: 64px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .content .info {
        margin-right: auto;
      }

      .content .info .title {
        color: var(--ha-card-header-color, --primary-text-color);
        font-family: var(--ha-card-header-font-family, inherit);
        font-size: var(--ha-card-header-font-size, 20px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }

      .content .info .aqi-state {
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--secondary-text-color);
        font-size: 14px;
        line-height: 1;
      }

      .content .info .aqi-state b {
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .readings {
        margin-top: 26px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
      }

      .readings .sensor {
        width: 78px;
        text-align: center;
      }

      .readings .sensor .label {
        margin-bottom: 8px;
        color: var(--secondary-text-color);
        font-size: 13px;
        font-weight: 400;
      }

      .readings .sensor .icon img {
        width: 40px;
        height: 40px;
      }

      .readings .sensor .value {
        margin-top: 8px;
        font-size: 13px;
      }

      .recommendation {
        margin-top: 26px;
      }

      .recommendation .title {
        margin-bottom: 10px;
        color: var(--primary-text-color);
        font-size: 16px;
        font-weight: normal;
      }

      .recommendation .paragraph {
        color: var(--secondary-text-color);
      }
    `}static async getConfigElement(){return await import("./configurator-347bb222.js"),document.createElement("air-quality-card-configurator")}static getStubConfig(){return{name:"Air Quality",aqi_type:"daily"}}render(){return L`
      <ha-card>
        ${this._renderAqiBlock()}
        <span></span>
        ${this._renderReadingBlock()}
        <span></span>
        ${this._renderRecommendationBlock()}
      </ha-card>
    `}setConfig(t){if(!t)throw new Error(zt("invalid_configuration"));this.config=Object.assign({aqi_type:"daily"},t)}getCardSize(){return 3}shouldUpdate(t){return!!this.config&&function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var s=e.get("hass");return!s||s.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}set hass(t){this._hass=t,this._sensors||this._validateAndFillSensors()}_renderAqiBlock(){const t=this._getState("aqi");if(!t)return L``;const e=It(t);return L`
      <div class="content">
        <div class="image">
          <img src="${function(t){switch(t){case 1:return"/air-quality/level-good.svg";case 2:return"/air-quality/level-moderate.svg";case 3:return"/air-quality/level-increased.svg";case 4:return"/air-quality/level-high.svg";default:return"/air-quality/level-very-high.svg"}}(e)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${zt(`aqi_levels.${e}.label`)}</div>
          <div class="aqi-state">${"daily"===this.config.aqi_type?zt("air_quality_index"):zt("air_quality_index_instant")}: <b>${t}</b></div>
        </div>
      </div>
    `}_renderReadingBlock(){var t,e,i,s,n,r;return L`
      <div class="readings">
        <div class="sensor">
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">${null!==(t=this._getState("pm_2_5"))&&void 0!==t?t:""} µg/m³</div>
        </div>
        <div class="sensor">
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">${null!==(e=this._getState("pm_10"))&&void 0!==e?e:""} µg/m³</div>
        </div>
        <div class="sensor">
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">${null!==(i=this._getState("temperature"))&&void 0!==i?i:""} °C</div>
        </div>
        <div class="sensor">
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">${null!==(s=this._getState("humidity"))&&void 0!==s?s:""} %</div>
        </div>
        <div class="sensor">
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">${null!==(r=null===(n=this._getState("pressure"))||void 0===n?void 0:n.toFixed(0))&&void 0!==r?r:""} mmHg</div>
        </div>
      </div>
    `}_renderRecommendationBlock(){const t=this._getState("aqi");if(!t)return L``;const e=It(t);return e<=1?L``:L`
      <div class="recommendation">
        <div class="title">${zt("recommendation")}</div>
        <div class="paragraph">${zt(`aqi_levels.${e}.recommendation`)}</div>
      </div>
    `}_validateAndFillSensors(){const t=Object.keys(this._hass.entities).filter((t=>"air_quality"===this._hass.entities[t].platform));if(7!==t.length)throw new Error(zt("invalid_sensors_count"));const e=t.find((t=>/^sensor\.air_quality_aqi_?(?<!instant)$/.test(t)));if(!e)throw new Error(zt("invalid_sensor","{sensorName}","sensor.air_quality_aqi"));const i=t.find((t=>t.startsWith("sensor.air_quality_aqi_instant")));if(!i)throw new Error(zt("invalid_sensor","{sensorName}","sensor.air_quality_aqi_instant"));const s=t.find((t=>t.startsWith("sensor.air_quality_pm_2_5")));if(!s)throw new Error(zt("invalid_sensor","{sensorName}","sensor.air_quality_pm_2_5"));const n=t.find((t=>t.startsWith("sensor.air_quality_pm_10")));if(!n)throw new Error(zt("invalid_sensor","{sensorName}","sensor.air_quality_pm_10"));const r=t.find((t=>t.startsWith("sensor.air_quality_temperature")));if(!r)throw new Error(zt("invalid_sensor","{sensorName}","sensor.air_quality_temperature"));const o=t.find((t=>t.startsWith("sensor.air_quality_humidity")));if(!o)throw new Error(zt("invalid_sensor","{sensorName}","sensor.air_quality_humidity"));const a=t.find((t=>t.startsWith("sensor.air_quality_pressure")));if(!a)throw new Error(zt("invalid_sensor","{sensorName}","sensor.air_quality_pressure"));this._sensors={aqi:e,aqi_instant:i,pm_2_5:s,pm_10:n,temperature:r,humidity:o,pressure:a}}_getState(t){var e,i,s;if(!this._sensors)return;let n;if(n="aqi"===t?"daily"===(null===(e=this.config)||void 0===e?void 0:e.aqi_type)?null===(i=this._sensors)||void 0===i?void 0:i.aqi:null===(s=this._sensors)||void 0===s?void 0:s.aqi_instant:this._sensors[t],!n||!(n in this._hass.states))return;const r=Number(this._hass.states[n].state);return isNaN(r)?void 0:r}};s([ut()],Bt.prototype,"config",void 0),s([ht({attribute:!1})],Bt.prototype,"_hass",void 0),s([ht({attribute:!1})],Bt.prototype,"hass",null),Bt=s([dt("air-quality-card")],Bt),window.customCards=window.customCards||[],window.customCards.push({type:"air-quality-card",name:"Air Quality Card",description:"Displays the readings of the weather station sensors. Provided by Air Quality integration.",preview:!0,configurable:!0});export{Q as A,h as S,D as T,e as _,i as a,s as b,n as c,zt as d,ht as e,dt as f,Bt as g,c as i,mt as l,gt as n,pt as o,at as s,ut as t,L as x};
