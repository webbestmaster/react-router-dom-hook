/*! For license information please see index.js.LICENSE.txt */
(()=>{"use strict";var e={418:e=>{var r=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var r={},t=0;t<10;t++)r["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(r).map((function(e){return r[e]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,a){for(var s,i,c=o(e),l=1;l<arguments.length;l++){for(var u in s=Object(arguments[l]))t.call(s,u)&&(c[u]=s[u]);if(r){i=r(s);for(var p=0;p<i.length;p++)n.call(s,i[p])&&(c[i[p]]=s[i[p]])}}return c}},251:(e,r,t)=>{t(418);var n=t(258),o=60103;if("function"==typeof Symbol&&Symbol.for){var a=Symbol.for;o=a("react.element"),a("react.fragment")}var s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,i=Object.prototype.hasOwnProperty,c={key:!0,ref:!0,__self:!0,__source:!0};r.jsx=function(e,r,t){var n,a={},l=null,u=null;for(n in void 0!==t&&(l=""+t),void 0!==r.key&&(l=""+r.key),void 0!==r.ref&&(u=r.ref),r)i.call(r,n)&&!c.hasOwnProperty(n)&&(a[n]=r[n]);if(e&&e.defaultProps)for(n in r=e.defaultProps)void 0===a[n]&&(a[n]=r[n]);return{$$typeof:o,type:e,key:l,ref:u,props:a,_owner:s.current}}},893:(e,r,t)=>{e.exports=t(251)},258:e=>{e.exports=require("react")}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var a=r[n]={exports:{}};return e[n](a,a.exports,t),a.exports}t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{t.r(n),t.d(n,{NavigationLink:()=>u,getParametersFromUrl:()=>s,objectToUrlParameters:()=>a,urlHookDefaultOptions:()=>i,useUrl:()=>c});var e=t(258);const r=require("react-router-dom");function o(e){return null==e?null:"string"==typeof e?e.trim()||null:e instanceof Date?Number.isNaN(e.getTime())?null:e.toISOString():"number"==typeof e?JSON.parse(JSON.stringify(e)):e?"true":"false"}function a(e){const r=[];return Object.keys(e).forEach((t=>{const n=e[t];if(Array.isArray(n)&&0===n.length)return;if(Array.isArray(n)){const e=n.map((e=>o(e))).filter((e=>Boolean(e)));return void(e.length>0&&r.push(encodeURIComponent(t)+"="+encodeURIComponent(e.join(","))))}const a=o(n);a&&r.push(encodeURIComponent(t)+"="+encodeURIComponent(a))})),r.join("&")}function s(e){const r=new URL(e);return Object.fromEntries(r.searchParams.entries())}const i={isSaveQueries:!0};function c(){const t=(0,r.useHistory)(),{location:n}=t,{search:o,pathname:c}=n,l=(0,e.useMemo)((()=>s("http://localhost/"+o)),[o]),u=(0,e.useCallback)(((e,r,n)=>{const o={...i,...n}.isSaveQueries?{...l,...r}:r;t.push({pathname:e,search:a(o)})}),[l,t]),p=(0,e.useCallback)(((e,r,n)=>{const o={...i,...n}.isSaveQueries?{...l,...r}:r;t.replace({pathname:e,search:a(o)})}),[l,t]),f=(0,e.useCallback)(((e,r)=>{u(c,e,r)}),[u,c]),y=(0,e.useCallback)((e=>l[e]||null),[l]),b=(0,e.useCallback)((e=>{const r={...l};Reflect.deleteProperty(r,e),u(c,r,{isSaveQueries:!1})}),[c,l,u]),m=(0,e.useCallback)(((e,r)=>{u(e,{},r)}),[u]),O=(0,e.useCallback)(((e,r,t)=>{u(e,r,t)}),[u]),d=(0,e.useCallback)(((e,r)=>{p(e,{},r)}),[p]),h=(0,e.useCallback)(((e,r,t)=>{p(e,r,t)}),[p]);return(0,e.useMemo)((()=>({deleteQuery:b,getQuery:y,pathname:c,pushPathname:m,pushState:O,queries:l,replacePathname:d,replaceState:h,setQuery:f})),[f,y,b,m,O,d,h,l,c])}var l=t(893);function u(e){const{className:t,to:n,children:o,isSaveQueries:s=!0,title:i,queries:u={}}=e,{queries:p}=c(),f=a(s?{...p,...u}:u),y=f&&`?${f}`;return(0,l.jsx)(r.Link,Object.assign({className:t,title:i,to:n+y},{children:o}),void 0)}})(),module.exports=n})();