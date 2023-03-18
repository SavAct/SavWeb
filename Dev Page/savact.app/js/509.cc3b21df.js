"use strict";(globalThis["webpackChunksavactapp"]=globalThis["webpackChunksavactapp"]||[]).push([[509],{11985:(e,l,t)=>{t.r(l),t.d(l,{default:()=>pe});var o=t(59835),a=t(86970),n=t(61957);const i={class:"q-px-md q-pt-sm q-pb-none"},s={class:"col-auto"},m={class:"q-pr-xs q-pb-sm"},u={class:"q-pr-xs"},c={class:"col-grow"},d={class:"q-pr-xs"},r={class:"col-12 text-h6 text-left"},v={class:"col-12 text-left"},p={key:2,class:"q-mt-md text-red"},g={key:3,class:"row q-mt-sm reverse"},y=(0,o._)("span",{class:"q-pr-xs"},"Memo",-1),w={key:4},b={class:"row col-10 justify-between"},f={class:"text-no-wrap"},h={key:0},k=(0,o._)("span",null,":  ",-1),T={class:"full-width q-mt-md"},q={key:1,class:"col-12 q-mx-sm"},C={class:"text-no-wrap"},V={key:0},_=(0,o._)("span",null,":  ",-1),x={key:4,class:"text-red"},W={key:5,class:"full-width q-mt-md"},M={class:"full-width row q-pr-none justify-between"},P={class:"q-mt-sm full-width",style:{"white-space":"nowrap","text-align":"right"}},S={key:0,class:"full-width justify-center"},D={class:"col-12 justify-center row",ref:"qrCodeDiv"};function z(e,l,t,z,U,H){const O=(0,o.up)("q-btn"),$=(0,o.up)("q-card-section"),Z=(0,o.up)("q-card"),Q=(0,o.up)("vote-option-list"),F=(0,o.up)("q-toggle"),L=(0,o.up)("key-or-name-input"),I=(0,o.up)("q-icon"),j=(0,o.up)("q-input"),E=(0,o.up)("q-btn-toggle"),A=(0,o.up)("date-time-input"),R=(0,o.up)("remaining-time"),N=(0,o.up)("time-span-input"),B=(0,o.up)("time-view"),K=(0,o.up)("q-scroll-area"),Y=(0,o.up)("qrcode-vue"),G=(0,o.up)("symbol-dialog"),X=(0,o.up)("q-page");return(0,o.wg)(),(0,o.j4)(X,null,{default:(0,o.w5)((()=>[(0,o._)("div",i,[(0,o._)("div",null,[(0,o.Wm)(Z,{class:"col q-my-sm card"},{default:(0,o.w5)((()=>[(0,o.Wm)($,{class:"row items-center justify-left"},{default:(0,o.w5)((()=>{var l;return[(0,o._)("div",s,(0,a.zw)(e.t(e.isVotePage?"voteOnThe":"payOnThe")),1),(0,o.Wm)(O,{class:"col-auto q-ml-sm",dense:"",label:`${null===(l=e.chain)||void 0===l?void 0:l.name} ${e.t("network")}`,onClick:e.showWalletDialog},null,8,["label","onClick"])]})),_:1})])),_:1}),e.isVotePage?((0,o.wg)(),(0,o.j4)(Z,{key:0,class:"col q-my-sm card"},{default:(0,o.w5)((()=>[(0,o.Wm)($,{class:"row items-center justify-left"},{default:(0,o.w5)((()=>[(0,o._)("span",m,(0,a.zw)(e.t("voteOptions")),1),(0,o.Wm)(Q,{modelValue:e.voteOptions,"onUpdate:modelValue":l[0]||(l[0]=l=>e.voteOptions=l)},null,8,["modelValue"])])),_:1})])),_:1})):(0,o.kq)("",!0),(0,o.Wm)(Z,{class:"q-my-sm card"},{default:(0,o.w5)((()=>[(0,o.Wm)($,null,{default:(0,o.w5)((()=>[e.isVotePage?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",{key:0,onClick:l[2]||(l[2]=l=>e.defineCustomer=!e.defineCustomer)},[(0,o._)("span",u,(0,a.zw)(e.t("bindPayCodeToCustomer")),1),(0,o.Wm)(F,{modelValue:e.defineCustomer,"onUpdate:modelValue":l[1]||(l[1]=l=>e.defineCustomer=l),size:"md","unchecked-icon":"clear","checked-icon":"check"},null,8,["modelValue"])])),e.defineCustomer?((0,o.wg)(),(0,o.j4)(L,{key:1,modelValue:e.customer,"onUpdate:modelValue":l[3]||(l[3]=l=>e.customer=l),outlined:"",label:e.t("customer"),class:"q-mb-md"},null,8,["modelValue","label"])):(0,o.kq)("",!0),(0,o.Wm)(L,{class:"q-mt-sm",modelValue:e.recipient,"onUpdate:modelValue":l[4]||(l[4]=l=>e.recipient=l),outlined:"",label:e.t("recipient"),walletOption:"",pubkeyOption:""},null,8,["modelValue","label"])])),_:1})])),_:1}),(0,o.Wm)(Z,{class:"q-my-sm card"},{default:(0,o.w5)((()=>[(0,o.Wm)($,null,{default:(0,o.w5)((()=>[e.isVotePage?((0,o.wg)(),(0,o.iD)("div",{key:0,onClick:l[6]||(l[6]=l=>e.recfund=!e.recfund),class:"q-mt-none q-mb-none col-grow row reverse"},[(0,o.Wm)(O,{class:(0,a.C_)(["col-auto q-mb-sm",e.isVotePage?"":"q-mb-sm"]),size:"sm",outline:"",label:e.t("provideRAM"),to:{name:"SavPay-RAM"}},null,8,["class","label"]),(0,o._)("div",c,[(0,o._)("span",d,(0,a.zw)(e.t("recommendedAmount")),1),(0,o.Wm)(F,{modelValue:e.recfund,"onUpdate:modelValue":l[5]||(l[5]=l=>e.recfund=l),size:"md","unchecked-icon":"clear","checked-icon":"check"},null,8,["modelValue"])])])):(0,o.kq)("",!0),e.recfund?((0,o.wg)(),(0,o.j4)(j,{key:1,outlined:"","bottom-slots":"",modelValue:e.fund,"onUpdate:modelValue":l[8]||(l[8]=l=>e.fund=l),type:"number",label:e.t("amount"),class:"full-width","hide-bottom-space":""},{before:(0,o.w5)((()=>[(0,o.Wm)(I,{name:"monetization_on"})])),append:(0,o.w5)((()=>[(0,o.Wm)(O,{size:"sm",class:"row q-px-sm q-py-none q-ma-none",onClick:l[7]||(l[7]=l=>e.showSymbol=!0)},{default:(0,o.w5)((()=>[(0,o._)("div",r,(0,a.zw)(e.symbol),1),(0,o._)("div",v,(0,a.zw)(e.tokenContract),1)])),_:1})])),_:1},8,["modelValue","label"])):(0,o.kq)("",!0),!e.isSystemToken&&e.recipient.length>13?((0,o.wg)(),(0,o.iD)("div",p,(0,a.zw)(`${e.t("onlySystemToPubKey_a")} ${e.systemTokenSymbol} ${e.t("onlySystemToPubKey_b")}!`),1)):(0,o.kq)("",!0),e.isVotePage?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",g,[(0,o.Wm)(O,{class:(0,a.C_)(["col-auto",e.isVotePage?"":"q-mb-sm"]),size:"sm",outline:"",label:e.t("provideRAM"),to:{name:"SavPay-RAM"}},null,8,["class","label"]),(0,o._)("div",{onClick:l[10]||(l[10]=l=>e.extraMemo.active=!e.extraMemo.active),class:"q-mb-none col-grow"},[y,(0,o.Wm)(F,{modelValue:e.extraMemo.active,"onUpdate:modelValue":l[9]||(l[9]=l=>e.extraMemo.active=l),size:"md","unchecked-icon":"clear","checked-icon":"check"},null,8,["modelValue"])])])),e.isVotePage?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",w,[(0,o.wy)((0,o.Wm)(j,{outlined:"","bottom-slots":"",modelValue:e.extraMemo.value,"onUpdate:modelValue":l[12]||(l[12]=l=>e.extraMemo.value=l),label:"Memo",maxlength:"255",class:"full-width q-mt-none","hide-bottom-space":""},{before:(0,o.w5)((()=>[(0,o.Wm)(I,{name:"notes"})])),append:(0,o.w5)((()=>[""!==e.extraMemo.value?((0,o.wg)(),(0,o.j4)(I,{key:0,name:"close",onClick:l[11]||(l[11]=l=>e.extraMemo.value=""),class:"cursor-pointer"})):(0,o.kq)("",!0)])),_:1},8,["modelValue"]),[[n.F8,e.extraMemo.active]])]))])),_:1})])),_:1}),(0,o.Wm)(Z,{class:"q-my-sm card"},{default:(0,o.w5)((()=>[(0,o.Wm)($,null,{default:(0,o.w5)((()=>[(0,o._)("div",b,[(0,o.wy)((0,o.Wm)(E,{modelValue:e.fixTimeType,"onUpdate:modelValue":l[13]||(l[13]=l=>e.fixTimeType=l),class:"q-mt-none q-mb-sm","no-caps":"",rounded:"",unelevated:"","toggle-color":void 0===e.fixTimeType?"red":"blue","text-color":"blue",style:{border:"1px solid #027be3"},options:[{label:e.t("optionNoTimeLimit"),value:void 0},{label:e.t("absoluteTime"),value:!0},{label:e.t("relativeTime"),value:!1}]},null,8,["modelValue","toggle-color","options"]),[[n.F8,!e.isVotePage]]),e.isVotePage?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o._)("div",null,(0,a.zw)(e.t("voteEndTime")),1),(0,o.Wm)(A,{class:"q-mb-sm",modelValue:e.voteEnd,"onUpdate:modelValue":l[14]||(l[14]=l=>e.voteEnd=l)},null,8,["modelValue"]),(0,o._)("div",null,[(0,o._)("span",f,(0,a.zw)(e.t("timelimit")),1),void 0!==e.voteEnd?((0,o.wg)(),(0,o.iD)("span",h,[k,(0,o.Wm)(R,{modelValue:e.voteEnd,"onUpdate:modelValue":l[15]||(l[15]=l=>e.voteEnd=l),timeOverMsg:e.t("timeIsOver")},null,8,["modelValue","timeOverMsg"])])):(0,o.kq)("",!0)]),(0,o._)("div",T,(0,a.zw)(e.t("voteTime")),1)],64)):(0,o.kq)("",!0),void 0===e.fixTimeType?((0,o.wg)(),(0,o.iD)("div",q,(0,a.zw)(e.t("noFraudProtect")),1)):!0===e.fixTimeType?((0,o.wg)(),(0,o.iD)(o.HY,{key:2},[(0,o.Wm)(A,{class:"q-mb-sm",modelValue:e.absolutLimit,"onUpdate:modelValue":l[16]||(l[16]=l=>e.absolutLimit=l)},null,8,["modelValue"]),(0,o._)("div",null,[(0,o._)("span",C,(0,a.zw)(e.t("timelimit")),1),void 0!==e.absolutLimit?((0,o.wg)(),(0,o.iD)("span",V,[_,(0,o.Wm)(R,{modelValue:e.absolutLimit,"onUpdate:modelValue":l[17]||(l[17]=l=>e.absolutLimit=l),timeOverMsg:e.t("timeIsOver")},null,8,["modelValue","timeOverMsg"])])):(0,o.kq)("",!0)])],64)):!1===e.fixTimeType?((0,o.wg)(),(0,o.j4)(N,{key:3,modelValue:e.relativeLimit,"onUpdate:modelValue":l[18]||(l[18]=l=>e.relativeLimit=l)},null,8,["modelValue"])):(0,o.kq)("",!0),e.timeIsTooHigh?((0,o.wg)(),(0,o.iD)("div",x,(0,a.zw)(e.t("timeToHigh")),1)):(0,o.kq)("",!0),e.isVotePage?((0,o.wg)(),(0,o.iD)("div",W,[(0,o._)("span",null,(0,a.zw)(e.t("punishTimeSpan"))+":  ",1),(0,o.Wm)(B,{class:"col",showTime:e.decisionTime,minTime:3600,belowMinMsg:e.t("minPunishTime"),valueClasses:"text-green"},null,8,["showTime","belowMinMsg"])])):(0,o.kq)("",!0)])])),_:1})])),_:1})]),(0,o.Wm)(Z,{class:"q-mb-md card"},{default:(0,o.w5)((()=>[(0,o.Wm)($,null,{default:(0,o.w5)((()=>[(0,o._)("div",M,[(0,o.Wm)(K,{class:"col-sm-9 col-8 q-pr-sm",visible:!0,style:{height:"35px"}},{default:(0,o.w5)((()=>[(0,o._)("div",P,(0,a.zw)(e.paymentcode),1)])),_:1}),(0,o.Wm)(O,{class:"col",disable:0==e.paymentcode.length,icon:"content_copy",onClick:l[19]||(l[19]=l=>e.copy(e.paymentcode))},null,8,["disable"]),(0,o.Wm)(O,{class:"col",disable:0==e.paymentcode.length,icon:"qr_code",onClick:e.copyQrImage},null,8,["disable","onClick"]),(0,o.Wm)(O,{class:"col",disable:0==e.paymentcode.length,icon:"download",onClick:e.downloadQrCode},null,8,["disable","onClick"])]),e.paymentcode?((0,o.wg)(),(0,o.iD)("div",S,[(0,o._)("div",D,[(0,o.Wm)(Y,{value:e.paymentcode,size:300,level:"L",margin:1,onClick:e.copyQrImage},null,8,["value","onClick"])],512)])):(0,o.kq)("",!0)])),_:1})])),_:1})]),(0,o.Wm)(G,{modelValue:e.showSymbol,"onUpdate:modelValue":l[20]||(l[20]=l=>e.showSymbol=l),contract:e.tokenContract,"onUpdate:contract":l[21]||(l[21]=l=>e.tokenContract=l),symbol:e.symbol,"onUpdate:symbol":l[22]||(l[22]=l=>e.symbol=l),connect:e.connect,precision:e.precision,"onUpdate:precision":l[23]||(l[23]=l=>e.precision=l)},null,8,["modelValue","contract","symbol","connect","precision"])])),_:1})}var U=t(39882),H=t.n(U),O=t(92868),$=t(79343),Z=t(41258),Q=t(47045),F=t(89889),L=t(72902),I=t(56925),j=t(54858),E=t.n(j),A=t(65054),R=t(6827),N=t(94345),B=t(62659),K=t(60499),Y=t(27712),G=t(7580),X=t(28339),J=t(86350);const ee=(0,o.aZ)({name:"page-receive",components:{KeyOrNameInput:O["default"],DateTimeInput:Z["default"],RemainingTime:Q["default"],TimeView:F["default"],SymbolDialog:L["default"],TimeSpanInput:$["default"],QrcodeVue:E(),VoteOptionList:I["default"]},setup(){var e,l;const t=(0,Y.QT)({useScope:"global"}).t.bind(this),a=(0,B.r)(),n=(0,X.yj)(),i=n.query,s=1==i.vote||null===i.vote,m=(0,K.iH)(["",""]),u=(0,o.Fl)((()=>a.selectedConnect)),c=(0,K.iH)(""),d=(0,o.Fl)({get:()=>c.value,set:e=>{e.length>13&&"undefined"==typeof C.value&&(C.value=!0),c.value=e}}),r=(0,K.iH)(""),v=(0,o.Fl)({get:()=>r.value,set:e=>{e.length>13&&"undefined"==typeof C.value&&(C.value=!0),r.value=e}}),p=(0,K.iH)(!1),g=(0,K.iH)(!1),y=(0,K.iH)((null===(l=null===(e=a.selectedConnect)||void 0===e?void 0:e.chainParams.systemToken)||void 0===l?void 0:l.contract)?a.selectedConnect.chainParams.systemToken.contract:"eosio.token"),w=(0,K.iH)(!0),b=(0,K.iH)(0),f=(0,K.iH)(4),h=(0,K.iH)("EOS"),k=(0,K.iH)({active:!1,value:""}),T=(0,K.iH)(!0),q=(0,o.Fl)((()=>"undefined"!=typeof C.value)),C=(0,o.Fl)({set:e=>{if("boolean"==typeof e){if(!$())return}else if(v.value.length>13||d.value.length>13)return void R.Z.create({type:"negative",message:t("keyUseSavPay"),position:"top"});T.value=!!s||e},get:()=>T.value}),V=(0,K.iH)(new Date(Date.now()+5184e5)),_=(0,K.iH)(new Date(Date.now()+6048e5)),x=(0,K.iH)(604800),W=(0,o.Fl)((()=>_.value&&V.value?(_.value.getTime()-V.value.getTime())/1e3:void 0)),M=(0,o.Fl)((()=>{var e;return null===(e=a.selectedConnect)||void 0===e?void 0:e.chainParams})),P=(0,o.Fl)((()=>Math.round(_.value.getTime()/1e3))),S=(0,o.Fl)((()=>(C.value?P.value:x.value)>4294967295)),D=(0,o.Fl)((()=>{var e,l;return null===(l=null===(e=a.selectedConnect)||void 0===e?void 0:e.chainParams.systemToken)||void 0===l?void 0:l.symbol})),z=(0,o.Fl)((()=>{var e,l;return y.value==(null===(l=null===(e=a.selectedConnect)||void 0===e?void 0:e.chainParams.systemToken)||void 0===l?void 0:l.contract)&&h.value==D.value})),U=(0,o.Fl)((()=>{var e,l,t,o;if(b.value<0)return"";const n=(null===(l=null===(e=a.selectedConnect)||void 0===e?void 0:e.chainParams.systemToken)||void 0===l?void 0:l.symbol)!=h.value||(null===(o=null===(t=a.selectedConnect)||void 0===t?void 0:t.chainParams.systemToken)||void 0===o?void 0:o.contract)!=y.value;return`${(0,N.AssetToString)({amount:BigInt(Math.round(b.value*Math.pow(10,f.value))),symbol:{name:h.value,precision:f.value}})}${n?" "+y.value:""}`})),O=(0,o.Fl)((()=>{if(!d.value)return"";const e="https://savact.app/#/_trx_/send?to="+d.value;let l;if(k.value.active){const e=k.value.value;l="&m="+k.value.value;const t=(new TextEncoder).encode(e),o="&M="+H().encode(t);let a=!1;for(let l=0;l<e.length;l++){let t=e.charCodeAt(l);if(t<40||t>126||96==t||60==t||62==t||43==t){a=!0;break}}(a||o.length<l.length)&&(l=o)}else l="";const t=b.value>0?`&pay=${U.value.replace(/\s/g,"%20")}`:"";let o,a,n;if("boolean"==typeof C.value){if(C.value?(n=P.value,o="&t="+String(n),a="&T="+(0,G.base58Time)(n)):(n=x.value,o="&dt="+String(n),a="&DT="+(0,G.base58Time)(n)),a.length<o.length&&(o=a),S.value)return""}else o="";let i=M.value?M.value.shortName?M.value.shortName:M.value.chainId:"";i="eos"==i?"":"&chain="+i;let u="";if(s){if(m.value.length>255||"number"!=typeof W.value||W.value<3600||!V.value)return"";const e=Math.floor(128*Math.random()),l=String.fromCharCode(e),t=(0,J.numberToUint32String)(Math.floor(V.value.getTime()/1e3)),o=String.fromCharCode(m.value.length),a=(0,J.StringArrayToOneString)(m.value),n=`${l}${t}${o}${a}`,i=(new TextEncoder).encode(n);u="&V="+H().encode(i)}return`${e}${p.value&&!s?"&from="+v.value:""}${t}${o}${l}${i}${u}`}));function $(){return!1!==Z()||(R.Z.create({type:"negative",message:t("errSavPayNotAvailable"),position:"top"}),C.value=void 0,!1)}function Z(){if(a.selectedConnect&&a.selectedConnect.chainParams)return!!a.selectedConnect.chainParams.savpayContract}function Q(e){(0,A.Z)(e).then((()=>{R.Z.create({type:"positive",message:t("copyToClip"),caption:(0,J.shrinkText)(e,80),position:"top"})})).catch((()=>{R.Z.create({type:"negative",message:t("errCopyClip"),position:"top"})}))}function F(){var e;try{null===(e=L.value)||void 0===e||e.getElementsByTagName("canvas")[0].toBlob((e=>{if(null!=e){const l=new ClipboardItem({"image/png":Promise.resolve(e)});navigator.clipboard.write([l])}}),"image/png"),R.Z.create({type:"positive",message:t("copyToClip"),caption:"QR code image",position:"top"})}catch(l){R.Z.create({type:"negative",message:t("errCopyClip"),caption:String(l),position:"top"})}}const L=(0,K.iH)();function I(){var e;let l=null===(e=L.value)||void 0===e?void 0:e.getElementsByTagName("canvas")[0].toDataURL("image/png");if(l){let e=new XMLHttpRequest;e.responseType="blob",e.onload=function(){let l=document.createElement("a");l.href=window.URL.createObjectURL(e.response),l.download="qrcode.png",l.style.display="none",document.body.appendChild(l),l.click(),l.remove()},e.open("GET",l),e.send()}}return{t,isVotePage:s,paymentcode:O,recipient:d,customer:v,defineCustomer:p,recfund:w,fund:b,symbol:h,precision:f,extraMemo:k,relativeLimit:x,absolutLimit:_,limitActive:q,voteEnd:V,tokenContract:y,chain:M,showSymbol:g,copy:Q,showWalletDialog:a.showWalletDialog,connect:u,fixTimeType:C,timeIsTooHigh:S,downloadQrCode:I,qrCodeDiv:L,copyQrImage:F,isSystemToken:z,systemTokenSymbol:D,voteOptions:m,decisionTime:W}}});var le=t(11639),te=t(69885),oe=t(44458),ae=t(63190),ne=t(68879),ie=t(22857),se=t(23175),me=t(13119),ue=t(1389),ce=t(66663),de=t(69984),re=t.n(de);const ve=(0,le.Z)(ee,[["render",z]]),pe=ve;re()(ee,"components",{QPage:te.Z,QCard:oe.Z,QCardSection:ae.Z,QBtn:ne.Z,QIcon:ie.Z,QToggle:se.Z,QInput:me.Z,QBtnToggle:ue.Z,QScrollArea:ce.Z})}}]);