var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};function e(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}var i=function(){return i=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t},i.apply(this,arguments)};function n(t,e,i,n){var s,o=arguments.length,r=o<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(s=t[a])&&(r=(o<3?s(r):o>3?s(e,i,r):s(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r}function s(t){var e="function"==typeof Symbol&&Symbol.iterator,i=e&&t[e],n=0;if(i)return i.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=window,r=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),l=new WeakMap;class c{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(r&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=l.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&l.set(e,t))}return t}toString(){return this.cssText}}const d=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new c(i,t,a)},h=(t,e)=>{r?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),n=o.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,t.appendChild(i)}))},u=r?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new c("string"==typeof t?t:t+"",void 0,a))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var p;const v=window,_=v.trustedTypes,f=_?_.emptyScript:"",m=v.reactiveElementPolyfillSupport,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},g=(t,e)=>e!==t&&(e==e||t==t),$={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:g};class b extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Ep(i,e);void 0!==n&&(this._$Ev.set(n,i),t.push(n))})),t}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||$}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(u(t))}else void 0!==t&&e.push(u(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return h(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=$){var n;const s=this.constructor._$Ep(t,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:y).toAttribute(e,i.type);this._$El=t,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(t,e){var i;const n=this.constructor,s=n._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=n.getPropertyOptions(s),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:y;this._$El=s,this[s]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||g)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var A;b.finalized=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},null==m||m({ReactiveElement:b}),(null!==(p=v.reactiveElementVersions)&&void 0!==p?p:v.reactiveElementVersions=[]).push("1.6.1");const w=window,E=w.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",q=`lit$${(Math.random()+"").slice(9)}$`,C="?"+q,P=`<${C}>`,k=document,O=()=>k.createComment(""),N=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,H="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,R=/>/g,j=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,z=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),D=Symbol.for("lit-noChange"),Q=Symbol.for("lit-nothing"),V=new WeakMap,W=k.createTreeWalker(k,129,null,!1),F=(t,e)=>{const i=t.length-1,n=[];let s,o=2===e?"<svg>":"",r=U;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,d=0;for(;d<i.length&&(r.lastIndex=d,l=r.exec(i),null!==l);)d=r.lastIndex,r===U?"!--"===l[1]?r=I:void 0!==l[1]?r=R:void 0!==l[2]?(B.test(l[2])&&(s=RegExp("</"+l[2],"g")),r=j):void 0!==l[3]&&(r=j):r===j?">"===l[0]?(r=null!=s?s:U,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?j:'"'===l[3]?z:M):r===z||r===M?r=j:r===I||r===R?r=U:(r=j,s=void 0);const h=r===j&&t[e+1].startsWith("/>")?" ":"";o+=r===U?i+P:c>=0?(n.push(a),i.slice(0,c)+x+i.slice(c)+q+h):i+q+(-2===c?(n.push(void 0),e):h)}const a=o+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==S?S.createHTML(a):a,n]};class K{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const r=t.length-1,a=this.parts,[l,c]=F(t,e);if(this.el=K.createElement(l,i),W.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=W.nextNode())&&a.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(x)||e.startsWith(q)){const i=c[o++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+x).split(q),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Y:"?"===e[1]?et:"@"===e[1]?it:X})}else a.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(B.test(n.tagName)){const t=n.textContent.split(q),e=t.length-1;if(e>0){n.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],O()),W.nextNode(),a.push({type:2,index:++s});n.append(t[e],O())}}}else if(8===n.nodeType)if(n.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(q,t+1));)a.push({type:7,index:s}),t+=q.length-1}s++}}static createElement(t,e){const i=k.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,n){var s,o,r,a;if(e===D)return e;let l=void 0!==n?null===(s=i._$Co)||void 0===s?void 0:s[n]:i._$Cl;const c=N(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,i,n)),void 0!==n?(null!==(r=(a=i)._$Co)&&void 0!==r?r:a._$Co=[])[n]=l:i._$Cl=l),void 0!==l&&(e=J(t,l._$AS(t,e.values),l,n)),e}class Z{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:k).importNode(i,!0);W.currentNode=s;let o=W.nextNode(),r=0,a=0,l=n[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new G(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new nt(o,this,t)),this._$AV.push(e),l=n[++a]}r!==(null==l?void 0:l.index)&&(o=W.nextNode(),r++)}return W.currentNode=k,s}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class G{constructor(t,e,i,n){var s;this.type=2,this._$AH=Q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cp=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),N(t)?t===Q||null==t||""===t?(this._$AH!==Q&&this._$AR(),this._$AH=Q):t!==this._$AH&&t!==D&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>T(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Q&&N(this._$AH)?this._$AA.nextSibling.data=t:this.$(k.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=K.createElement(n.h,this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.v(i);else{const t=new Z(s,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new K(t)),e}T(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new G(this.k(O()),this.k(O()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class X{constructor(t,e,i,n,s){this.type=1,this._$AH=Q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let o=!1;if(void 0===s)t=J(this,t,e,0),o=!N(t)||t!==this._$AH&&t!==D,o&&(this._$AH=t);else{const n=t;let r,a;for(t=s[0],r=0;r<s.length-1;r++)a=J(this,n[i+r],e,r),a===D&&(a=this._$AH[r]),o||(o=!N(a)||a!==this._$AH[r]),a===Q?t=Q:t!==Q&&(t+=(null!=a?a:"")+s[r+1]),this._$AH[r]=a}o&&!n&&this.j(t)}j(t){t===Q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Y extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Q?void 0:t}}const tt=E?E.emptyScript:"";class et extends X{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Q?this.element.setAttribute(this.name,tt):this.element.removeAttribute(this.name)}}class it extends X{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=J(this,t,e,0))&&void 0!==i?i:Q)===D)return;const n=this._$AH,s=t===Q&&n!==Q||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Q&&(n===Q||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const st=w.litHtmlPolyfillSupport;null==st||st(K,G),(null!==(A=w.litHtmlVersions)&&void 0!==A?A:w.litHtmlVersions=[]).push("2.7.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ot,rt;class at extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var n,s;const o=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let r=o._$litPart$;if(void 0===r){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=r=new G(e.insertBefore(O(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return D}}at.finalized=!0,at._$litElement$=!0,null===(ot=globalThis.litElementHydrateSupport)||void 0===ot||ot.call(globalThis,{LitElement:at});const lt=globalThis.litElementPolyfillSupport;null==lt||lt({LitElement:at}),(null!==(rt=globalThis.litElementVersions)&&void 0!==rt?rt:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ct=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,dt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ht(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):dt(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ut(t){return ht({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=({finisher:t,descriptor:e})=>(i,n)=>{var s;if(void 0===n){const n=null!==(s=i.originalKey)&&void 0!==s?s:i.key,o=null!=e?{kind:"method",placement:"prototype",key:n,descriptor:e(i.key)}:{...i,key:n};return null!=t&&(o.finisher=function(e){t(e,n)}),o}{const s=i.constructor;void 0!==e&&Object.defineProperty(i,n,e(n)),null==t||t(s,n)}}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var vt;const _t=null!=(null===(vt=window.HTMLSlotElement)||void 0===vt?void 0:vt.prototype.assignedElements)?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function ft(t){const{slot:e,selector:i}=null!=t?t:{};return pt({descriptor:n=>({get(){var n;const s="slot"+(e?`[name=${e}]`:":not([name])"),o=null===(n=this.renderRoot)||void 0===n?void 0:n.querySelector(s),r=null!=o?_t(o,t):[];return i?r.filter((t=>t.matches(i))):r},enumerable:!0,configurable:!0})})}var mt,yt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(mt||(mt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(yt||(yt={}));var gt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,t.dispatchEvent(s),s};var $t="Air Quality",bt="Air quality index (AQI)",At="Air quality index (AQI Instant)",wt="Recommendation:",Et="Health effects:",St={1:{label:"The Air is Clean",effects:"The air quality is considered good. Air pollution does not pose a health hazard.",recommendation:"Nope"},2:{label:"Moderate Pollution",effects:"The air quality is generally acceptable, but some pollutants may pose a danger to people who are particularly sensitive to air pollution.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should limit outdoor activities."},3:{label:"Increased Pollution",effects:"People who are sensitive to air pollution may experience negative effects of pollutants. For the majority of the population, air pollution does not have a noticeable effect on health.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should significantly limit outdoor activities."},4:{label:"High Pollution",effects:"Everyone can feel the negative impact of air pollution on their health; particularly sensitive people can experience serious problems.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid being outdoors. Everyone else, especially children, should limit their outdoor activities."},5:{label:"Very High Pollution",effects:"An emergency situation with the impact of pollution on human health. All population groups are at risk of health deterioration.",recommendation:"Elderly people, children, pregnant women and people suffering from heart disease, asthma or other respiratory diseases should avoid even a short stay outdoors. Everyone else, especially children, should avoid being outdoors."},6:{label:"Climate Catastrophe",effects:"Catastrophic health hazard: There may be serious consequences for human health.",recommendation:"All groups of the population should avoid even a short stay in the open air."},7:{label:"Death and Destruction",effects:"Catastrophic health hazard: serious consequences for human health.",recommendation:"All population groups are advised to stay indoors with filtered air. In the open air, it is necessary to use respirators."}},xt={selector_label:"Choose the AQI calculation method",option_daily:"Average per day",option_hourly:"Instant",toggle_recommendations_label:"Display recommendations in case of environmental pollution.",toggle_first_recommendation:"Display recommendations at the lowest AQI level."},qt={invalid_configuration:"Invalid Configuration",invalid_sensors_count:"The number of Air Quality integration sensors should be 7",invalid_sensor:"Sensor {sensorName} not found"},Ct={card_name:$t,air_quality_index:bt,air_quality_index_instant:At,recommendation:wt,health_effects:Et,aqi_levels:St,configurator:xt,error:qt},Pt="Качество Воздуха",kt="Индекс качества воздуха (AQI)",Ot="Индекс качества воздуха (AQI Instant)",Nt="Рекомендации:",Tt="Влияние на здоровье:",Ht={1:{label:"Воздух в Норме",effects:"Качество воздуха считается хорошим. Загрязнение воздуха не представляет опасности для здоровья.",recommendation:"Нет"},2:{label:"Небольшое Загрязнение",effects:"Качество воздуха в целом является приемлемым, однако некоторые загрязняющие вещества могут представлять опасность для людей, особо чувствительных к загрязнению воздуха.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует ограничить пребывание на открытом воздухе."},3:{label:"Повышенное Загрязнение",effects:"Люди, чувствительные к загрязнению воздуха, могут испытывать негативное воздействие загрязняющих веществ. Для основной массы населения загрязнение воздуха не оказывает заметного влияния на здоровье.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует существенно ограничить пребывание на открытом воздухе."},4:{label:"Высокое Загрязнение",effects:"Каждый человек может ощутить негативное влияние загрязнения воздуха на свое здоровье; особо чувствительные люди могут испытывать серьезные проблемы.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать пребывания на открытом воздухе. Все остальные, особенно дети, должны ограничить пребывание на открытом воздухе."},5:{label:"Ужасно Задымлено",effects:"Чрезвычайная ситуация с воздействием загрязнения на здоровье человека. Все группы населения подвержены риску ухудшения здоровья.",recommendation:"Пожилым людям, детям, беременным женщинам и людям, страдающим болезнями сердца, астмой или другими респираторными заболеваниями, следует избегать даже кратковременного пребывания на открытом воздухе. Все остальные, особенно дети, должны избегать пребывания на открытом воздухе."},6:{label:"Климатическая Катастрофа",effects:"Катастрофическая опасность для здоровья: могут возникнуть серьезные последствия для здоровья человека.",recommendation:"Всем группам населения следует избегать даже кратковременного пребывания на открытом воздухе."},7:{label:"Смерть и Разрушение",effects:"Катастрофическая опасность для здоровья: серьезные последствия для здоровья человека.",recommendation:"Всем группам населения рекомендуется оставаться в помещениях с отфильтрованным воздухом. На открытом воздухе необходимо пользоваться респираторами."}},Ut={selector_label:"Выберите способ расчета AQI",option_daily:"Средний за сутки",option_hourly:"В реальном времени",toggle_recommendations_label:"Показывать рекомендации при загрязнении окружающей среды.",toggle_first_recommendation:"Показывать рекомендации при самом низком уровне AQI."},It={invalid_configuration:"Ошибка в конфигурации",invalid_sensors_count:"Количество датчиков интеграции Air Quality должно быть равно 7",invalid_sensor:"Датчик {sensorName} не найден"},Rt={card_name:Pt,air_quality_index:kt,air_quality_index_instant:Ot,recommendation:Nt,health_effects:Tt,aqi_levels:Ht,configurator:Ut,error:It};const jt={en:Object.freeze({__proto__:null,card_name:$t,air_quality_index:bt,air_quality_index_instant:At,recommendation:wt,health_effects:Et,aqi_levels:St,configurator:xt,error:qt,default:Ct}),ru:Object.freeze({__proto__:null,card_name:Pt,air_quality_index:kt,air_quality_index_instant:Ot,recommendation:Nt,health_effects:Tt,aqi_levels:Ht,configurator:Ut,error:It,default:Rt})};function Mt(t,e){if("string"==typeof e)return e;const i=t.split("."),[n,...s]=i,o=e[n];return o&&"string"!=typeof o?Mt(s&&s.length>0?s.join("."):"",o):o}function zt(t,e="",i=""){const n=function(){var t;let e=null===(t=localStorage.getItem("selectedLanguage"))||void 0===t?void 0:t.replace(/['"]+/g,"").replace("-","_");return"null"===e&&(e=void 0),e||(e=localStorage.getItem("i18nextLng")),e&&"null"!==e||(e="en"),e}();let s;try{s=Object.assign({},jt[n])}catch(t){s=Object.assign({},jt.en)}let o=Mt(t,s);return void 0===o&&(o=Mt(t,Object.assign({},jt.en))),o&&""!==e&&""!==i&&(o=o.replace(`{${e}}`,i)),null!=o?o:""}function Bt(t){return t>500?7:t>300?6:t>200?5:t>150?4:t>100?3:t>50?2:1}let Lt=class extends at{static get styles(){return d`
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

      .aqi-btn-content {
        height: 64px;
        width: 100%;
        text-align: left;
        cursor: pointer;
        border: none;
        background: transparent;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      .aqi-btn-content .image {
        min-width: 64px;
        margin-right: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .aqi-btn-content .info {
        margin-right: auto;
      }

      .aqi-btn-content .info .title {
        color: var(--ha-card-header-color, --primary-text-color);
        font-family: var(--ha-card-header-font-family, inherit);
        font-size: var(--ha-card-header-font-size, 20px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 1.2;
      }

      .aqi-btn-content .info .aqi-state {
        margin-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--secondary-text-color);
        font-size: 14px;
        line-height: 1;
      }

      .aqi-btn-content .info .aqi-state b {
        color: var(--primary-text-color);
        font-weight: 500;
      }

      .readings {
        margin: 26px -10px 16px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: space-around;
      }

      .readings .sensor-btn {
        width: 78px;
        padding: 0;
        cursor: pointer;
        border: none;
        background: transparent;
        text-align: center;
        display: block;
      }

      .readings .sensor-btn .label {
        height: 20px;
        margin-bottom: 8px;
        color: var(--secondary-text-color);
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        white-space: nowrap;
      }

      .readings .sensor-btn .icon img {
        width: 40px;
        height: 40px;
      }

      .readings .sensor-btn .value {
        height: 20px;
        margin-top: 8px;
        font-size: 13px;
        line-height: 20px;
        white-space: nowrap;
      }

      .recommendation {
        padding-top: 1px;
      }

      .recommendation .title {
        margin: 14px 0 4px;
        color: var(--primary-text-color);
        font-size: 16px;
        font-weight: normal;
      }

      .recommendation .paragraph {
        color: var(--secondary-text-color);
      }
    `}static async getConfigElement(){return await import("./configurator-29907967.js"),document.createElement("air-quality-card-configurator")}static getStubConfig(){return{aqi_type:"daily",enable_recommendation:!0,display_first_recommendation:!1}}render(){return L`
      <ha-card>
        ${this._renderAqiBlock()}
        <span></span>
        ${this._renderReadingBlock()}
        <span></span>
        ${this._renderRecommendationBlock()}
      </ha-card>
    `}setConfig(t){if(!t)throw new Error(zt("error.invalid_configuration"));t.test_gui&&function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null}().setEditMode(!0),this.config=Object.assign({aqi_type:"daily",enable_recommendation:!0,display_first_recommendation:!1},t)}getCardSize(){return 3}shouldUpdate(t){return!!this.config&&function(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var n=e.get("hass");return!n||n.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}set hass(t){this._hass=t,this._sensors||this._validateAndFillSensors()}_renderAqiBlock(){const t=this._getState("aqi");if(!t)return;const e=Bt(t);return L`
      <button type="button" class="aqi-btn-content" @click=${()=>this._detailInfo("aqi")}>
        <div class="image">
          <img src="${function(t){switch(t){case 1:return"/air-quality/level-good.svg";case 2:return"/air-quality/level-moderate.svg";case 3:return"/air-quality/level-increased.svg";case 4:return"/air-quality/level-high.svg";default:return"/air-quality/level-very-high.svg"}}(e)}" alt="AQI Level Icon" width="50" height="50" />
        </div>
        <div class="info">
          <div class="title">${zt(`aqi_levels.${e}.label`)}</div>
          <div class="aqi-state">${"daily"===this.config.aqi_type?zt("air_quality_index"):zt("air_quality_index_instant")}: <b>${t}</b></div>
        </div>
      </button>
    `}_renderReadingBlock(){var t,e,i,n,s,o;return L`
      <div class="readings">
        <button type="button" class="sensor-btn" @click=${()=>this._detailInfo("pm_2_5")}>
          <div class="label">PM<sub>2.5</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-2-5.svg" alt="PM2.5" />
          </div>
          <div class="value">${null!==(t=this._getState("pm_2_5"))&&void 0!==t?t:""} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._detailInfo("pm_10")}>
          <div class="label">PM<sub>10</sub></div>
          <div class="icon">
            <img src="/air-quality/pm-10.svg" alt="PM10" />
          </div>
          <div class="value">${null!==(e=this._getState("pm_10"))&&void 0!==e?e:""} µg/m³</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._detailInfo("temperature")}>
          <div class="label">Temperature</div>
          <div class="icon">
            <img src="/air-quality/temperature.svg" alt="Temperature" />
          </div>
          <div class="value">${null!==(i=this._getState("temperature"))&&void 0!==i?i:""} °C</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._detailInfo("humidity")}>
          <div class="label">Humidity</div>
          <div class="icon">
            <img src="/air-quality/humidity.svg" alt="Humidity" />
          </div>
          <div class="value">${null!==(n=this._getState("humidity"))&&void 0!==n?n:""} %</div>
        </button>
        <button type="button" class="sensor-btn" @click=${()=>this._detailInfo("pressure")}>
          <div class="label">Pressure</div>
          <div class="icon">
            <img src="/air-quality/pressure.svg" alt="Pressure" />
          </div>
          <div class="value">${null!==(o=null===(s=this._getState("pressure"))||void 0===s?void 0:s.toFixed(0))&&void 0!==o?o:""} mmHg</div>
        </button>
      </div>
    `}_renderRecommendationBlock(){var t,e;if(!(null===(t=this.config)||void 0===t?void 0:t.enable_recommendation))return;const i=this._getState("aqi");if(!i)return;const n=(null===(e=this.config)||void 0===e?void 0:e.display_first_recommendation)?0:1,s=Bt(i);return s<=n?void 0:L`
      <div class="recommendation">
        <div class="title">${zt("health_effects")}</div>
        <div class="paragraph">${zt(`aqi_levels.${s}.effects`)}</div>
        <div class="title">${zt("recommendation")}</div>
        <div class="paragraph">${zt(`aqi_levels.${s}.recommendation`)}</div>
      </div>
    `}_validateAndFillSensors(){const t=Object.keys(this._hass.entities).filter((t=>"air_quality"===this._hass.entities[t].platform));if(7!==t.length)throw new Error(zt("error.invalid_sensors_count"));const e=t.find((t=>/^sensor\.air_quality_aqi_?(?<!instant)$/.test(t)));if(!e)throw new Error(zt("error.invalid_sensor","sensorName","sensor.air_quality_aqi"));const i=t.find((t=>t.startsWith("sensor.air_quality_aqi_instant")));if(!i)throw new Error(zt("error.invalid_sensor","sensorName","sensor.air_quality_aqi_instant"));const n=t.find((t=>t.startsWith("sensor.air_quality_pm_2_5")));if(!n)throw new Error(zt("error.invalid_sensor","sensorName","sensor.air_quality_pm_2_5"));const s=t.find((t=>t.startsWith("sensor.air_quality_pm_10")));if(!s)throw new Error(zt("error.invalid_sensor","sensorName","sensor.air_quality_pm_10"));const o=t.find((t=>t.startsWith("sensor.air_quality_temperature")));if(!o)throw new Error(zt("error.invalid_sensor","sensorName","sensor.air_quality_temperature"));const r=t.find((t=>t.startsWith("sensor.air_quality_humidity")));if(!r)throw new Error(zt("error.invalid_sensor","sensorName","sensor.air_quality_humidity"));const a=t.find((t=>t.startsWith("sensor.air_quality_pressure")));if(!a)throw new Error(zt("error.invalid_sensor","sensorName","sensor.air_quality_pressure"));this._sensors={aqi:e,aqi_instant:i,pm_2_5:n,pm_10:s,temperature:o,humidity:r,pressure:a}}_sensorToEntityId(t){var e,i,n;if(this._sensors)return"aqi"===t?"daily"===(null===(e=this.config)||void 0===e?void 0:e.aqi_type)?null===(i=this._sensors)||void 0===i?void 0:i.aqi:null===(n=this._sensors)||void 0===n?void 0:n.aqi_instant:this._sensors[t]}_getState(t){const e=this._sensorToEntityId(t);if(!e||!(e in this._hass.states))return;const i=Number(this._hass.states[e].state);return isNaN(i)?void 0:i}_detailInfo(t){const e=this._sensorToEntityId(t);e&&gt(this,"hass-more-info",{entityId:e})}};n([ut()],Lt.prototype,"config",void 0),n([ht({attribute:!1})],Lt.prototype,"hass",null),Lt=n([ct("air-quality-card")],Lt),window.customCards=window.customCards||[],window.customCards.push({type:"air-quality-card",name:zt("card_name"),description:"Displays the readings of the weather station sensors. Provided by Air Quality integration.",preview:!0,configurable:!0});export{Q as A,h as S,D as T,e as _,i as a,n as b,s as c,zt as d,ht as e,ct as f,Lt as g,d as i,ft as l,gt as n,pt as o,at as s,ut as t,L as x};
