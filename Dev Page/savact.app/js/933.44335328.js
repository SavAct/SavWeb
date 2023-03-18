"use strict";(globalThis["webpackChunksavactapp"]=globalThis["webpackChunksavactapp"]||[]).push([[933],{933:(e,t,o)=>{o.r(t),o.d(t,{default:()=>S});var a=o(59835),r=o(86970),n=o(61957);const i=e=>((0,a.dD)("data-v-231a7828"),e=e(),(0,a.Cn)(),e),c={id:"qrcam"},l={class:"q-pa-sm"},s={class:"row justify-center full-height full-width text-center","q-icon":"check_circle_outline"},u={class:"absolute-bottom info q-pa-sm"},d=i((()=>(0,a._)("div",null,"Upload from file",-1)));function v(e,t,o,i,v,f){const h=(0,a.up)("q-spinner"),m=(0,a.up)("q-inner-loading"),p=(0,a.up)("q-btn"),g=(0,a.up)("q-icon"),w=(0,a.up)("qrcode-stream"),b=(0,a.up)("qrcode-capture"),y=(0,a.up)("q-page");return(0,a.wg)(),(0,a.j4)(y,{id:"qrpage",class:"items-center justify-evenly full-height full-width"},{default:(0,a.w5)((()=>[(0,a._)("div",c,[(0,a.Wm)(m,{showing:e.loading},{default:(0,a.w5)((()=>[(0,a.Wm)(h,{size:"40%",color:"primary"})])),_:1},8,["showing"]),(0,a.Wm)(w,{class:"full-height full-width",camera:e.camera,torch:e.torchActive,onDecode:e.onCapture,onInit:e.onInit},{default:(0,a.w5)((()=>[(0,a._)("div",{class:(0,r.C_)(["full-height full-width",{confirmation:e.showScanConfirmation}])},[(0,a._)("div",l,[(0,a.Wm)(p,{onClick:e.switchCamera,round:"",icon:"flip_camera_ios",color:"gray"},null,8,["onClick"]),(0,a.wy)((0,a.Wm)(p,{onClick:t[0]||(t[0]=t=>e.torchActive=!e.torchActive),class:(0,r.C_)(["self-end",e.torchActive?"text-blue":"text-white"]),round:"",icon:"flash_on"},null,8,["class"]),[[n.F8,e.torchSupported]])]),(0,a.wy)((0,a._)("div",s,[(0,a.Wm)(g,{name:"check_circle_outline",alt:"Checkmark",size:"128px",color:"green",class:"self-center"})],512),[[n.F8,e.showScanConfirmation]])],2)])),_:1},8,["camera","torch","onDecode","onInit"])]),(0,a.Uk)(" Camera type: "+(0,r.zw)(e.camera)+" ",1),(0,a.wy)((0,a._)("div",u,[(0,a._)("div",null,(0,r.zw)(e.qrdata),1)],512),[[n.F8,e.error||e.qrdata]]),(0,a._)("div",null,[d,(0,a.Wm)(b,{onDecode:e.onDecode},null,8,["onDecode"])])])),_:1})}var f=o(60499),h=o(59823),m=o(28339),p=o(6827),g=o(17779),w=function(e,t,o,a){function r(e){return e instanceof o?e:new o((function(t){t(e)}))}return new(o||(o=Promise))((function(o,n){function i(e){try{l(a.next(e))}catch(t){n(t)}}function c(e){try{l(a["throw"](e))}catch(t){n(t)}}function l(e){e.done?o(e.value):r(e.value).then(i,c)}l((a=a.apply(e,t||[])).next())}))};const b=(0,a.aZ)({name:"page-qr-scanner",components:{QrcodeStream:h.QrcodeStream,QrcodeCapture:h.QrcodeCapture},setup(){const e=(0,m.tv)(),t=(0,f.iH)(""),o=(0,f.iH)(""),r=(0,f.iH)(null),n=(0,f.iH)(!1),i=(0,f.iH)("auto"),c=(0,f.iH)(!1),l=(0,f.iH)(!1),s=(0,f.iH)(!1),u=(0,f.iH)(!1),d=(0,f.iH)(16/9);function v(e){e.preventDefault(),g.log("is allowDrop")}function h(e){e.preventDefault(),g.log("dragged",e)}function b(e){return new Promise((t=>{window.setTimeout(t,e)}))}function y(e){return w(this,void 0,void 0,(function*(){o.value=e,g.log("onCapture",e),i.value="off",R(e),yield b(500),i.value="auto"}))}function R(t){let o,a;if(t.startsWith("https://")?(a=t.substr(8),o=!0):t.startsWith("http://")?(a=t.substr(7),o=!0):(a=t,o=!1),a.startsWith("www.")&&(a=t.substr(4),o=!0),o&&a.startsWith("savact.app")){let t=a.indexOf("#")+1;if(t>0){g.log("link",a),g.log("s",t),g.log("s",a.substring(t));let o=a.substring(t);"/"!=o[0]&&(o="/"+o),g.log("QR Code go to:",o),e.push(o)}}}const k=(0,f.iH)();function E(e){return w(this,void 0,void 0,(function*(){n.value=!0;try{const{capabilities:t}=yield e;k.value=t,g.log("Camera capabilities",t),s.value=t.torch,t.height&&t.width&&(d.value=t.height.max/t.width.max,S())}catch(t){switch(g.log(t),t.name){case"NotAllowedError":r.value="ERROR: you need to grant camera access permisson";break;case"NotFoundError":r.value="ERROR: no camera on this device";break;case"NotSupportedError":r.value="ERROR: secure context required (HTTPS, localhost)";break;case"NotReadableError":r.value="ERROR: is the camera already in use?";break;case"OverconstrainedError":r.value="ERROR: installed cameras are not suitable",i.value="auto";break;case"StreamApiNotSupportedError":r.value="ERROR: Stream API is not supported in this browser";break;case"OverconstrainedError":"front"===i.value?r.value="ERROR: No rear camera":"rear"===i.value?r.value="ERROR: No front camera":r.value="ERROR: No camera";break;default:r.value=t.message;break}p.Z.create({message:r.value,position:"top"})}finally{c.value="off"===i.value,n.value=!1}}))}function C(){switch(i.value){case"front":i.value="rear";break;case"rear":i.value="front";break;default:i.value="front"}}function _(e){e.preventDefault(),g.log("ondragover event",e)}function q(e){return w(this,void 0,void 0,(function*(){try{const{content:t}=yield e;o.value=t}catch(t){switch(g.log(t),t.name){case"DropImageFetchError":r.value="Sorry, you can't load cross-origin images :/";break;case"DropImageDecodeError":r.value="Sorry, you can't load cross-origin images :/";break;default:r.value=t.message;break}}}))}function D(e){g.log("Docode from file",e),o.value=e}function H(e){e.catch(g.error)}function S(){let e=document.getElementById("qrpage"),t=document.getElementById("qrcam");if(null!==t&&void 0!==(null===e||void 0===e?void 0:e.offsetWidth)&&void 0!==(null===e||void 0===e?void 0:e.offsetHeight)){let e=document.getElementsByTagName("header")[0],o=document.getElementsByTagName("footer")[0],a=e.offsetHeight+o.offsetHeight;t.style.maxWidth=window.innerHeight-a+"px"}}return(0,a.bv)((()=>{window.addEventListener("resize",S)})),(0,a.Jd)((()=>{window.removeEventListener("resize",S)})),{code:t,qrdata:o,onDecode:D,onCapture:y,onInit:E,error:r,loading:n,showScanConfirmation:c,camera:i,switchCamera:C,torchActive:l,torchSupported:s,dragover:u,onDragOver:_,onDetectDropZone:q,dropZoneErrors:H,allowDrop:v,drop:h,capa:k}}});var y=o(11639),R=o(69885),k=o(60854),E=o(13902),C=o(68879),_=o(22857),q=o(69984),D=o.n(q);const H=(0,y.Z)(b,[["render",v],["__scopeId","data-v-231a7828"]]),S=H;D()(b,"components",{QPage:R.Z,QInnerLoading:k.Z,QSpinner:E.Z,QBtn:C.Z,QIcon:_.Z})}}]);