import{_ as ce}from"./nodata-b6ZJ5XC7.js";import{r as pe}from"./role.store-CX8tLYic.js";import{k as H,d as ve,r as c,u as _e,m as fe,v as ge,l as be,o,f as p,g as v,h as w,c as t,j as d,t as u,n as f,i as r,F as L,b as he,e as n,a as ye,E as ke,q as y,p as S,x as T,s as we,_ as xe}from"./index-BpXBQnxn.js";import{p as $e}from"./permissions.store-1L6rt9_s.js";import{u as Ue}from"./user.schema-Da4cmJuK.js";import{c as Ce}from"./index-DGVL7Egt.js";import"./axios.config-9RTEzkkw.js";const Se=()=>{const{schema:A,schemaKey:j}=Ue();return{schema:H(()=>{const{password:z,password_confirmation:x,...N}=A.value;return N}),schemaKey:j}},je={class:"pb-4 flex justify-between"},Ne={class:"text-base font-bold text-blue-500 flex items-center gap-1"},Be={class:"flex flex-col items-center sm:items-start gap-6"},Ke={key:1,src:ce,width:"200rem",height:"200rem",class:"my-6",style:{"object-fit":"contain"},alt:""},Le={class:"md:flex md:flex-row flex-col gap-4"},Ae={key:0,class:"text-red-500"},Re={key:0,class:"text-red-500"},ze={class:"md:flex md:flex-row flex-col gap-4"},Me={key:0,class:"text-red-500"},Oe={key:0,class:"text-red-500"},Ee={key:1,class:"text-red-500"},Fe={class:"md:flex md:flex-row flex-col gap-4"},Ie={key:0},Pe={key:0},De={class:"md:flex md:flex-row flex-col mt-4"},Ve={class:"md:flex md:flex-row flex-col gap-4"},qe=ve({__name:"UpdateCustomer",props:{searchQuery:{type:String,default:null}},setup(A){const{schema:j,schemaKey:R}=Se(),z=ye(),{push:x}=z,{state:N,getAll:J}=pe(),{statePermission:W,getAllPer:X}=$e(),M=c(null),{update:Y,stateGetOne:B,getOneCustomer:Z}=Ce(),{t:g}=_e(),$=H(()=>({firstName:g("placeholder.user.fname"),lastName:g("placeholder.user.lname"),phoneNumber:g("placeholder.user.phone_number"),email:g("placeholder.user.email")})),O={customer_id:"",id:"",first_name:"",last_name:"",type:"",phone_number:"",groups:[],is_active:!1,is_superuser:!1,user_permissions:[],avatar:void 0,full_avatar_url:void 0,email:"",password:"",created_at:"",updated_at:""},E=c(),s=c({...O}),ee=()=>{s.value={...O},M.value=""},i=fe({}),ae=async()=>{E.value.validate().then(async()=>{try{await Y(s.value,s.value.id),we.success({message:g("messages.success"),description:g("messages.update")}),ee(),x({name:"customers"})}catch(e){if(e.response&&e.response.data){const a=e.response.data||{};Object.keys(a).forEach(_=>{i[_]=Array(a[_])?a[_][0]:""})}}})},F=c([]),I=c([]),K=c(!0),se=c(!0),P=c(["2"]),D=c(["2"]),{params:le}=he(),te=Number(le.id),re=async()=>{if(await J(),F.value=N.data.props.map(e=>({id:e.id,name:e.name})),K.value=!1,await X(),I.value=W.data.props.map(e=>({id:e.id,name:e.name})),se.value=!1,await Z(te),B.data){const e=B.data;s.value={...e,groups:Array.isArray(e.groups)?e.groups.map(a=>a.id):e.groups,user_permissions:Array.isArray(e.user_permissions)?e.user_permissions.map(a=>a.id):e.user_permissions},M.value=e.full_avatar_url||null}},k=c(""),b=c(null);function oe(e){return e.size>5242880?(k.value="ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ 5MB",!1):(k.value="",b.value&&URL.revokeObjectURL(b.value),b.value=URL.createObjectURL(e),s.value.full_avatar_url=e,!1)}const ue=()=>{s.value.full_avatar_url=void 0,b.value=""};return ge(()=>{re()}),be(()=>B.data,e=>{if(e){const a=e;s.value.user_permissions=a.user_permissions.map(_=>_.id)}},{immediate:!0}),(e,a)=>{const _=n("a-image"),ne=n("a-alert"),m=n("a-form-item"),U=n("a-button"),ie=n("a-upload"),h=n("a-input"),C=n("a-checkbox"),V=n("a-checkbox-group"),q=n("a-collapse-panel"),G=n("a-collapse"),Q=n("a-radio"),me=n("a-radio-group"),de=n("a-form");return o(),p(L,null,[v("div",je,[v("p",Ne,[v("span",{onClick:a[0]||(a[0]=l=>w(x)({name:"customers"})),class:"hover:ring-red-300 text-[12px] w-10 h-6 ring-1 ring-slate-300 rounded-sm flex items-center justify-center outline-none"},[t(w(ke))]),d(" "+u(e.$t("customers.form_edit")),1)])]),(o(),f(de,{layout:"vertical",ref_key:"form",ref:E,rules:w(j),key:w(R),model:s.value,class:"flex-col flex"},{default:r(()=>[t(m,{label:" ",class:"-mt-12",name:"avatar"},{default:r(()=>[v("div",Be,[b.value||s.value.full_avatar_url?(o(),f(_,{key:0,src:b.value||s.value.full_avatar_url,width:"10rem",height:"10rem",style:{"object-fit":"contain"}},{previewMask:r(()=>[v("span",null,u(e.$t("preview")),1)]),_:1},8,["src"])):(o(),p("img",Ke)),k.value?(o(),f(ne,{key:2,message:k.value,type:"error",banner:"",closable:"",onClose:a[1]||(a[1]=l=>k.value="")},null,8,["message"])):y("",!0)])]),_:1}),t(m,{class:"-mt-12",label:" "},{default:r(()=>[t(ie,{showUploadList:!1,accept:".png, .jpeg, .jpg",multiple:"","before-upload":oe},{default:r(()=>[t(U,null,{default:r(()=>[d(u(e.$t("customers.table_field.choose_profile")),1)]),_:1})]),_:1}),s.value.full_avatar_url?(o(),f(U,{key:0,onClick:ue,class:"ml-4 text-red-600"},{default:r(()=>[d(u(e.$t("customers.table_field.btn.remove")),1)]),_:1})):y("",!0)]),_:1}),v("div",Le,[t(m,{label:e.$t("customers.table_field.fname"),name:"first_name",class:"w-full"},{default:r(()=>[t(h,{placeholder:$.value.firstName,class:S(["h-12",{"ring-1 ring-red-500 mb-1":i.errors&&s.value.first_name.length>149}]),value:s.value.first_name,"onUpdate:value":a[2]||(a[2]=l=>s.value.first_name=l)},null,8,["placeholder","value","class"]),i.errors&&s.value.first_name.length>149?(o(),p("span",Ae,u(e.$t("validation.user.length_name")),1)):y("",!0)]),_:1},8,["label"]),t(m,{label:e.$t("customers.table_field.lname"),name:"last_name",class:"w-full"},{default:r(()=>[t(h,{placeholder:$.value.lastName,class:S(["h-12",{"ring-1 ring-red-500 mb-1":i.errors&&s.value.last_name.length>149}]),value:s.value.last_name,"onUpdate:value":a[3]||(a[3]=l=>s.value.last_name=l)},null,8,["placeholder","value","class"]),i.errors&&s.value.last_name.length>149?(o(),p("span",Re,u(e.$t("validation.user.length_name")),1)):y("",!0)]),_:1},8,["label"])]),v("div",ze,[t(m,{label:e.$t("customers.table_field.phone_number"),name:"phone_number",class:"w-full"},{default:r(()=>[t(h,{placeholder:$.value.phoneNumber,class:S(["h-12",{"ring-1 ring-red-500 mb-1":i.errors&&s.value.phone_number.length>11}]),value:s.value.phone_number,"onUpdate:value":a[4]||(a[4]=l=>s.value.phone_number=l)},null,8,["placeholder","value","class"]),i.errors&&s.value.phone_number.length>11?(o(),p("span",Me,u(e.$t("validation.user.length_phone")),1)):y("",!0)]),_:1},8,["label"]),t(m,{label:e.$t("customers.table_field.email"),name:"email",class:"w-full"},{default:r(()=>[t(h,{placeholder:$.value.email,class:S(["h-12",{"ring-1 ring-red-500 mb-1":i.errors&&s.value.email.length>254||i.errors==="d"}]),value:s.value.email,"onUpdate:value":a[5]||(a[5]=l=>s.value.email=l)},null,8,["placeholder","value","class"]),i.errors&&s.value.email.length>254?(o(),p("span",Oe,u(e.$t("validation.user.email_length")),1)):i.errors&&i.errors==="d"?(o(),p("span",Ee,u(e.$t("validation.user.email_exits")),1)):y("",!0)]),_:1},8,["label"])]),v("div",Fe,[t(m,{label:e.$t("customers.table_field.created_at"),name:"",class:"w-full"},{default:r(()=>[t(h,{readonly:"",placeholder:"ວັນທີອັບເດດ",class:"h-12",value:s.value.created_at,"onUpdate:value":a[6]||(a[6]=l=>s.value.created_at=l)},null,8,["value"])]),_:1},8,["label"]),t(m,{label:e.$t("customers.table_field.updated_at"),name:"",class:"w-full"},{default:r(()=>[t(h,{readonly:"",class:"h-12",value:s.value.updated_at,"onUpdate:value":a[7]||(a[7]=l=>s.value.updated_at=l)},null,8,["value"])]),_:1},8,["label"])]),t(G,{activeKey:P.value,"onUpdate:activeKey":a[9]||(a[9]=l=>P.value=l),class:"mt-2"},{default:r(()=>[t(q,{key:"2",header:e.$t("customers.table_field.get_roles"),name:"groups",class:"w-full"},{default:r(()=>[K.value?(o(),p("div",Ie,"Loading roles...")):(o(),f(V,{key:1,value:s.value.groups,"onUpdate:value":a[8]||(a[8]=l=>s.value.groups=l),class:"flex flex-wrap gap-4"},{default:r(()=>[(o(!0),p(L,null,T(F.value,l=>(o(),f(C,{key:l.id,value:l.id,label:l.name},{default:r(()=>[d(u(l.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["value"]))]),_:1},8,["header"])]),_:1},8,["activeKey"]),t(G,{activeKey:D.value,"onUpdate:activeKey":a[11]||(a[11]=l=>D.value=l),class:"mt-8"},{default:r(()=>[t(q,{key:"2",header:e.$t("customers.table_field.get_permissions"),name:"user_permission",class:"w-full"},{default:r(()=>[K.value?(o(),p("div",Pe,"Loading permission...")):(o(),f(V,{key:1,value:s.value.user_permissions,"onUpdate:value":a[10]||(a[10]=l=>s.value.user_permissions=l),class:"flex flex-wrap gap-4"},{default:r(()=>[(o(!0),p(L,null,T(I.value,l=>(o(),f(C,{key:l.id,value:l.id,label:l.name},{default:r(()=>[d(u(l.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["value"]))]),_:1},8,["header"])]),_:1},8,["activeKey"]),v("div",De,[t(m,{label:"",name:"is_superuser",class:"md:w-[8rem]"},{default:r(()=>[t(C,{checked:s.value.is_superuser,onChange:a[12]||(a[12]=l=>s.value.is_superuser=l.target.checked)},{default:r(()=>[d(u(e.$t("customers.table_field.super_user")),1)]),_:1},8,["checked"])]),_:1}),t(m,{label:"",name:"is_active",class:"md:w-[6rem]"},{default:r(()=>[t(C,{checked:s.value.is_active,onChange:a[13]||(a[13]=l=>s.value.is_active=l.target.checked)},{default:r(()=>[d(u(e.$t("customers.table_field.status")),1)]),_:1},8,["checked"])]),_:1}),t(m,{label:"",name:"type",class:""},{default:r(()=>[t(me,{value:s.value.type,"onUpdate:value":a[14]||(a[14]=l=>s.value.type=l)},{default:r(()=>[t(Q,{value:"general"},{default:r(()=>[d(u(e.$t("customers.table_field.choose_customer.general")),1)]),_:1}),t(Q,{value:"vip"},{default:r(()=>[d(u(e.$t("customers.table_field.choose_customer.vip")),1)]),_:1})]),_:1},8,["value"])]),_:1})]),v("div",Ve,[t(m,{class:"flex items-center mt-4 justify-center"},{default:r(()=>[t(U,{type:"primary",onClick:ae},{default:r(()=>[d(u(e.$t("customers.edit")),1)]),_:1}),a[16]||(a[16]=d("   ")),t(U,{danger:"",onClick:a[15]||(a[15]=l=>w(x)({name:"customers"}))},{default:r(()=>[d(u(e.$t("customers.table_field.btn.cancel")),1)]),_:1})]),_:1})])]),_:1},8,["rules","model"]))],64)}}}),Ye=xe(qe,[["__scopeId","data-v-882c40b5"]]);export{Ye as default};
