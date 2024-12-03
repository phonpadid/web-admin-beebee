import{_ as ie}from"./nodata-b6ZJ5XC7.js";import{r as me}from"./role.store-CX8tLYic.js";import{c as ce}from"./index-DGVL7Egt.js";import{c as o,I as de,d as pe,r as v,u as fe,k as ve,m as _e,v as be,o as r,f as d,g as y,h as w,j as _,t as n,n as h,i as t,F as P,e as u,a as ge,q as k,J as he,p as O,x as Q,s as G,_ as ye}from"./index-BpXBQnxn.js";import{u as we}from"./user.schema-Da4cmJuK.js";import{p as ke}from"./permissions.store-1L6rt9_s.js";import{L as xe}from"./LineChartOutlined-BheXCfHu.js";import"./axios.config-9RTEzkkw.js";var $e={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M864 248H728l-32.4-90.8a32.07 32.07 0 00-30.2-21.2H358.6c-13.5 0-25.6 8.5-30.1 21.2L296 248H160c-44.2 0-80 35.8-80 80v456c0 44.2 35.8 80 80 80h704c44.2 0 80-35.8 80-80V328c0-44.2-35.8-80-80-80zm8 536c0 4.4-3.6 8-8 8H160c-4.4 0-8-3.6-8-8V328c0-4.4 3.6-8 8-8h186.7l17.1-47.8 22.9-64.2h250.5l22.9 64.2 17.1 47.8H864c4.4 0 8 3.6 8 8v456zM512 384c-88.4 0-160 71.6-160 160s71.6 160 160 160 160-71.6 160-160-71.6-160-160-160zm0 256c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"}}]},name:"camera",theme:"outlined"};function W(b){for(var i=1;i<arguments.length;i++){var c=arguments[i]!=null?Object(arguments[i]):{},g=Object.keys(c);typeof Object.getOwnPropertySymbols=="function"&&(g=g.concat(Object.getOwnPropertySymbols(c).filter(function(x){return Object.getOwnPropertyDescriptor(c,x).enumerable}))),g.forEach(function(x){Ue(b,x,c[x])})}return b}function Ue(b,i,c){return i in b?Object.defineProperty(b,i,{value:c,enumerable:!0,configurable:!0,writable:!0}):b[i]=c,b}var B=function(i,c){var g=W({},i,c.attrs);return o(de,W({},g,{icon:$e}),null)};B.displayName="CameraOutlined";B.inheritAttrs=!1;const je={class:"pb-4 flex justify-between"},Se={class:"flex flex-col items-center sm:items-start gap-6"},Ce={key:1,src:ie,width:"200rem",height:"200rem",class:"my-4",style:{"object-fit":"contain"},alt:"",srcset:""},Oe={class:"md:flex md:flex-row flex-col gap-4 -mt-4"},ze={key:0,class:"text-red-500"},Le={key:0,class:"text-red-500"},Pe={class:"md:flex md:flex-row flex-col gap-4"},Be={key:0,class:"text-red-500"},Ne={key:0,class:"text-red-500"},Me={key:1,class:"text-red-500"},Re={class:"md:flex md:flex-row flex-col gap-4"},Ke={key:0},Ae={key:0},Ee={class:"md:flex md:flex-row flex-col gap-4"},Ve=pe({__name:"AddCustomer",props:{searchQuery:{type:String,default:null}},setup(b){const{schema:i,schemaKey:c}=we(),{push:g}=ge(),{state:x,getAll:X}=me(),{statePermission:Y,getAllPer:Z}=ke(),j=v(""),{create:ee}=ce(),N={customer_id:"",id:"",first_name:"",last_name:"",phone_number:"",groups:[],user_permissions:[],avatar:void 0,email:"",type:"general",password:"",password_confirmation:""},{t:p}=fe(),$=ve(()=>({firstName:p("placeholder.user.fname"),lastName:p("placeholder.user.lname"),phoneNumber:p("placeholder.user.phone_number"),email:p("placeholder.user.email"),password:p("placeholder.user.password"),confirmPassword:p("placeholder.user.confirm_password")})),M=v(),R=v(!1),a=v({...N}),ae=()=>{a.value={...N}},m=_e({}),se=async()=>{M.value.validate().then(async()=>{R.value=!0;try{a.value.password===a.value.password_confirmation?(await new Promise(e=>setTimeout(e,1e3)),await ee(a.value),G.success({message:p("messages.success"),description:p("messages.description")}),ae(),R.value=!1,g({name:"customers"})):G.warn({message:p("messages.error"),description:p("messages.create_failed")})}catch(e){if(e.response&&e.response.data){const s=e.response.data||{};Object.keys(s).forEach(U=>{m[U]=Array(s[U])?s[U][0]:""})}}}).catch(e=>{console.log("error",e)})},K=v([]),A=v([]),z=v(!0),le=v(!0);function te(e){if(e.size>5242880)return j.value="ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ 5MB",!1;j.value="";const L=URL.createObjectURL(e);return e.objectURL=L,a.value.avatar=e,!1}const oe=()=>{a.value.avatar=void 0};be(async()=>{await X(),K.value=x.data.props.map(e=>({id:e.id,name:e.name})),z.value=!1,await Z(),A.value=Y.data.props.map(e=>({id:e.id,name:e.name})),le.value=!1});const E=v(["2"]),V=v(["2"]);return(e,s)=>{const U=u("a-image"),L=u("a-alert"),f=u("a-form-item"),S=u("a-button"),F=u("a-tooltip"),re=u("a-upload"),C=u("a-input"),H=u("a-input-password"),I=u("a-checkbox"),D=u("a-checkbox-group"),T=u("a-collapse-panel"),q=u("a-collapse"),J=u("a-radio"),ne=u("a-radio-group"),ue=u("a-form");return r(),d(P,null,[y("div",je,[y("p",{onClick:s[0]||(s[0]=l=>w(g)({name:"customers"})),class:"text-base flex font-bold text-blue-500 items-center gap-2 justify-center"},[o(w(xe)),_(" "+n(e.$t("customers.form_customer")),1)])]),(r(),h(ue,{layout:"vertical",ref_key:"form",ref:M,rules:w(i),key:w(c),model:a.value,class:"flex-col flex"},{default:t(()=>[o(f,{label:" ",class:"-mt-12",name:"avatar"},{default:t(()=>[y("div",Se,[a.value.avatar?(r(),h(U,{key:0,src:typeof a.value.avatar=="object"&&a.value.avatar.objectURL?a.value.avatar.objectURL:"/src/assets/nodata.png",width:"10rem",height:"10rem",style:{"object-fit":"contain"}},{previewMask:t(()=>[y("span",null,n(e.$t("preview")),1)]),_:1},8,["src"])):(r(),d("img",Ce)),j.value?(r(),h(L,{key:2,message:j.value,type:"error",banner:"",closable:"",onClose:s[1]||(s[1]=l=>j.value="")},null,8,["message"])):k("",!0)])]),_:1}),o(f,{class:"-mt-12",label:" "},{default:t(()=>[o(re,{showUploadList:!1,accept:".png, .jpeg, .jpg",multiple:"","before-upload":te},{default:t(()=>[o(F,null,{title:t(()=>[_(n(e.$t("customers.table_field.choose_profile")),1)]),default:t(()=>[o(S,{class:"flex items-center"},{default:t(()=>[o(w(B),{style:{fontSize:"18px",color:"#08c"}})]),_:1})]),_:1})]),_:1}),a.value.avatar?(r(),h(F,{key:0},{title:t(()=>[_(n(e.$t("customers.table_field.btn.remove")),1)]),default:t(()=>[a.value.avatar?(r(),h(S,{key:0,onClick:oe,class:"ml-[4rem] flex items-center -top-8 text-red-600"},{default:t(()=>[o(w(he),{style:{fontSize:"18px"}})]),_:1})):k("",!0)]),_:1})):k("",!0)]),_:1}),y("div",Oe,[o(f,{label:e.$t("customers.table_field.fname"),name:"first_name",class:"w-full"},{default:t(()=>[o(C,{placeholder:$.value.firstName,class:O(["h-12",{"ring-1 ring-red-500 mb-1":m.errors&&a.value.first_name.length>149}]),value:a.value.first_name,"onUpdate:value":s[2]||(s[2]=l=>a.value.first_name=l)},null,8,["placeholder","value","class"]),m.errors&&a.value.first_name.length>149?(r(),d("span",ze,n(e.$t("validation.user.length_name")),1)):k("",!0)]),_:1},8,["label"]),o(f,{label:e.$t("customers.table_field.lname"),name:"last_name",class:"w-full"},{default:t(()=>[o(C,{placeholder:$.value.lastName,class:O(["h-12",{"ring-1 ring-red-500 mb-1":m.errors&&a.value.last_name.length>149}]),value:a.value.last_name,"onUpdate:value":s[3]||(s[3]=l=>a.value.last_name=l)},null,8,["placeholder","class","value"]),m.errors&&a.value.last_name.length>149?(r(),d("span",Le,n(e.$t("validation.user.length_name")),1)):k("",!0)]),_:1},8,["label"])]),y("div",Pe,[o(f,{label:e.$t("customers.table_field.phone_number"),name:"phone_number",class:"w-full"},{default:t(()=>[o(C,{placeholder:$.value.phoneNumber,class:O(["h-12",{"ring-1 ring-red-500 mb-1":m.errors&&a.value.phone_number.length>11}]),value:a.value.phone_number,"onUpdate:value":s[4]||(s[4]=l=>a.value.phone_number=l)},null,8,["placeholder","value","class"]),m.errors&&a.value.phone_number.length>11?(r(),d("span",Be,n(e.$t("validation.user.length_phone")),1)):k("",!0)]),_:1},8,["label"]),o(f,{label:e.$t("customers.table_field.email"),name:"email",class:"w-full"},{default:t(()=>[o(C,{placeholder:$.value.email,class:O(["h-12",{"ring-1 ring-red-500 mb-1":m.errors&&a.value.email.length>254||m.errors==="U"}]),value:a.value.email,"onUpdate:value":s[5]||(s[5]=l=>a.value.email=l)},null,8,["placeholder","value","class"]),m.errors&&a.value.email.length>254?(r(),d("span",Ne,n(e.$t("validation.user.email_length")),1)):m.errors&&m.errors==="U"?(r(),d("span",Me,n(e.$t("validation.user.email_exits")),1)):k("",!0)]),_:1},8,["label"])]),y("div",Re,[o(f,{label:e.$t("customers.table_field.password"),name:"password",class:"w-full"},{default:t(()=>[o(H,{type:"password",placeholder:$.value.password,class:"h-12",value:a.value.password,"onUpdate:value":s[6]||(s[6]=l=>a.value.password=l)},null,8,["placeholder","value"])]),_:1},8,["label"]),o(f,{label:e.$t("customers.table_field.confirm_password"),name:"password_confirmation",class:"w-full"},{default:t(()=>[o(H,{type:"password",placeholder:$.value.confirmPassword,class:"h-12",value:a.value.password_confirmation,"onUpdate:value":s[7]||(s[7]=l=>a.value.password_confirmation=l)},null,8,["placeholder","value"])]),_:1},8,["label"])]),o(q,{activeKey:E.value,"onUpdate:activeKey":s[9]||(s[9]=l=>E.value=l),class:"mt-2"},{default:t(()=>[o(T,{key:"2",header:e.$t("customers.table_field.get_roles"),name:"groups",class:"w-full"},{default:t(()=>[z.value?(r(),d("div",Ke,"Loading roles...")):(r(),h(D,{key:1,value:a.value.groups,"onUpdate:value":s[8]||(s[8]=l=>a.value.groups=l),class:"flex flex-wrap gap-4"},{default:t(()=>[(r(!0),d(P,null,Q(K.value,l=>(r(),h(I,{key:l.id,value:l.id,label:l.name},{default:t(()=>[_(n(l.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["value"]))]),_:1},8,["header"])]),_:1},8,["activeKey"]),o(q,{activeKey:V.value,"onUpdate:activeKey":s[11]||(s[11]=l=>V.value=l),class:"mt-8"},{default:t(()=>[o(T,{key:"2",header:e.$t("customers.table_field.get_permissions"),name:"user_permission",class:"w-full"},{default:t(()=>[z.value?(r(),d("div",Ae,"Loading permission...")):(r(),h(D,{key:1,value:a.value.user_permissions,"onUpdate:value":s[10]||(s[10]=l=>a.value.user_permissions=l),class:"flex flex-wrap gap-4"},{default:t(()=>[(r(!0),d(P,null,Q(A.value,l=>(r(),h(I,{key:l.id,value:l.id,label:l.name},{default:t(()=>[_(n(l.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["value"]))]),_:1},8,["header"])]),_:1},8,["activeKey"]),o(f,{label:e.$t("customers.table_field.choose_customer.label"),name:"type",class:"mt-6"},{default:t(()=>[o(ne,{value:a.value.type,"onUpdate:value":s[12]||(s[12]=l=>a.value.type=l)},{default:t(()=>[o(J,{value:"general"},{default:t(()=>[_(n(e.$t("customers.table_field.choose_customer.general")),1)]),_:1}),o(J,{value:"vip"},{default:t(()=>[_(n(e.$t("customers.table_field.choose_customer.vip")),1)]),_:1})]),_:1},8,["value"])]),_:1},8,["label"]),y("div",Ee,[o(f,{class:"flex items-center mt-4 justify-center"},{default:t(()=>[o(S,{type:"primary",onClick:se},{default:t(()=>[_(n(e.$t("customers.table_field.btn.save")),1)]),_:1}),s[14]||(s[14]=_("   ")),o(S,{danger:"",onClick:s[13]||(s[13]=l=>w(g)({name:"customers"}))},{default:t(()=>[_(n(e.$t("customers.table_field.btn.cancel")),1)]),_:1})]),_:1})])]),_:1},8,["rules","model"]))],64)}}}),Ge=ye(Ve,[["__scopeId","data-v-5baabb29"]]);export{Ge as default};