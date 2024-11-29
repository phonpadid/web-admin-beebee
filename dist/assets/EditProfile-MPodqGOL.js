import{_ as ne}from"./nodata-b6ZJ5XC7.js";import{r as ie}from"./role.store-CwGpHvrs.js";import{u as me}from"./index-DXfmsQf9.js";import{d as de,r as i,u as pe,k as ce,v as fe,l as ve,f as _,g as c,c as o,j as m,t as d,n as f,i as t,h as $,F as S,b as _e,e as u,a as be,o as r,q as F,x as I,s as O,_ as ge}from"./index-B4OLFXgi.js";import{p as he}from"./permissions.store-DuAphxP9.js";import{u as ye}from"./update-user.schema-BqY4Za2q.js";import"./axios.config-9RTEzkkw.js";import"./user.schema-CCvNCDtu.js";const ke={class:"pb-4 flex justify-between"},we={class:"text-base font-bold text-blue-500"},xe={class:"flex flex-col items-center sm:items-start gap-6"},Ue={key:1,src:ne,width:"200rem",height:"200rem",class:"my-4",style:{"object-fit":"contain"},alt:""},$e={class:"md:flex md:flex-row flex-col gap-4"},Se={class:"md:flex md:flex-row flex-col gap-4"},Ne={key:0},Ce={key:0},Be={class:"md:flex md:flex-row flex-col mt-4"},je={class:"md:flex md:flex-row flex-col gap-4"},Ke=de({__name:"EditProfile",setup(Le){const{schema:D,schemaKey:E}=ye(),V=be(),{push:N}=V,{state:q,getAll:G}=ie(),{statePermission:T,getAllPer:H}=he(),C=i(null),{update:J,stateGetOne:x,getOneUser:Q}=me(),B={id:"",first_name:"",last_name:"",type:"",phone_number:"",groups:[],is_active:!1,is_superuser:!1,is_staff:!1,user_permissions:[],avatar:void 0,email:"",password:""},{t:p}=pe(),b=ce(()=>({firstName:p("placeholder.user.fname"),lastName:p("placeholder.user.lname"),phoneNumber:p("placeholder.user.phone_number"),email:p("placeholder.user.email"),password:p("placeholder.user.password"),confirmPassword:p("placeholder.user.confirm_password")})),j=i(),l=i({...B}),W=()=>{l.value={...B},C.value=""},X=async()=>{j.value.validate().then(async()=>{try{await J(l.value,l.value.id),O.success({message:p("messages.success"),description:p("messages.update")}),W(),N({name:"user"})}catch{O.error({message:p("messages.error"),description:p("messages.update_failed")})}})},K=i([]),L=i([]),U=i(!0),Y=i(!0),P=i(["2"]),R=i(["2"]),{params:Z}=_e(),ee=Number(Z.id),ae=async()=>{if(await G(),K.value=q.data.props.map(e=>({id:e.id,name:e.name})),U.value=!1,await H(),L.value=T.data.props.map(e=>({id:e.id,name:e.name})),Y.value=!1,await Q(ee),x.data){const e=x.data;l.value={...e,groups:Array.isArray(e.groups)?e.groups.map(a=>a.id):e.groups,user_permissions:Array.isArray(e.user_permissions)?e.user_permissions.map(a=>a.id):e.user_permissions},C.value=e.avatar||null}},g=i(""),v=i(null);function se(e){return e.size>5242880?(g.value="ຂະໜາດຮູບຕ້ອງບໍ່ເກີນ 5MB",!1):(g.value="",v.value&&URL.revokeObjectURL(v.value),v.value=URL.createObjectURL(e),l.value.avatar=e,!1)}const le=()=>{l.value.avatar=void 0,v.value=""};return fe(()=>{ae()}),ve(()=>x.data,e=>{if(e){const a=e;l.value.user_permissions=a.user_permissions.map(k=>k.id)}},{immediate:!0}),(e,a)=>{const k=u("line-chart-outlined"),te=u("a-image"),oe=u("a-alert"),n=u("a-form-item"),w=u("a-button"),re=u("a-upload"),h=u("a-input"),y=u("a-checkbox"),M=u("a-checkbox-group"),z=u("a-collapse-panel"),A=u("a-collapse"),ue=u("a-form");return r(),_(S,null,[c("div",ke,[c("p",we,[o(k),m(" "+d(e.$t("users.edit_user")),1)])]),(r(),f(ue,{layout:"vertical",ref_key:"form",ref:j,rules:$(D),key:$(E),model:l.value,class:"flex-col flex"},{default:t(()=>[o(n,{label:" ",class:"-mt-12",name:"avatar"},{default:t(()=>[c("div",xe,[v.value||l.value.avatar?(r(),f(te,{key:0,src:v.value||l.value.avatar,width:"10rem",height:"10rem",style:{"object-fit":"contain"}},{previewMask:t(()=>[c("span",null,d(e.$t("preview")),1)]),_:1},8,["src"])):(r(),_("img",Ue)),g.value?(r(),f(oe,{key:2,message:g.value,type:"error",banner:"",closable:"",onClose:a[0]||(a[0]=s=>g.value="")},null,8,["message"])):F("",!0)])]),_:1}),o(n,{class:"-mt-12",label:" "},{default:t(()=>[o(re,{showUploadList:!1,accept:".png, .jpeg, .jpg",multiple:"","before-upload":se},{default:t(()=>[o(w,null,{default:t(()=>[m(d(e.$t("customers.table_field.choose_profile")),1)]),_:1})]),_:1}),l.value.avatar?(r(),f(w,{key:0,onClick:le,class:"ml-4 text-red-600"},{default:t(()=>[m(d(e.$t("customers.table_field.btn.remove")),1)]),_:1})):F("",!0)]),_:1}),c("div",$e,[o(n,{hidden:"",label:"ຊື່",name:"id",class:"w-full"},{default:t(()=>[o(h,{placeholder:b.value.firstName,class:"h-12",value:l.value.id,"onUpdate:value":a[1]||(a[1]=s=>l.value.id=s)},null,8,["placeholder","value"])]),_:1}),o(n,{label:e.$t("users.table_field.fname"),name:"first_name",class:"w-full"},{default:t(()=>[o(h,{placeholder:b.value.firstName,class:"h-12",value:l.value.first_name,"onUpdate:value":a[2]||(a[2]=s=>l.value.first_name=s)},null,8,["placeholder","value"])]),_:1},8,["label"]),o(n,{label:e.$t("users.table_field.lname"),name:"last_name",class:"w-full"},{default:t(()=>[o(h,{placeholder:b.value.lastName,class:"h-12",value:l.value.last_name,"onUpdate:value":a[3]||(a[3]=s=>l.value.last_name=s)},null,8,["placeholder","value"])]),_:1},8,["label"])]),c("div",Se,[o(n,{label:e.$t("users.table_field.phone_number"),name:"phone_number",class:"w-full"},{default:t(()=>[o(h,{placeholder:b.value.phoneNumber,class:"h-12",value:l.value.phone_number,"onUpdate:value":a[4]||(a[4]=s=>l.value.phone_number=s)},null,8,["placeholder","value"])]),_:1},8,["label"]),o(n,{label:e.$t("users.table_field.email"),name:"email",class:"w-full"},{default:t(()=>[o(h,{placeholder:b.value.email,class:"h-12",value:l.value.email,"onUpdate:value":a[5]||(a[5]=s=>l.value.email=s)},null,8,["placeholder","value"])]),_:1},8,["label"])]),o(A,{activeKey:P.value,"onUpdate:activeKey":a[7]||(a[7]=s=>P.value=s),class:"mt-2"},{default:t(()=>[o(z,{key:"2",header:e.$t("users.table_field.get_roles"),name:"groups",class:"w-full"},{default:t(()=>[U.value?(r(),_("div",Ne,"Loading roles...")):(r(),f(M,{key:1,value:l.value.groups,"onUpdate:value":a[6]||(a[6]=s=>l.value.groups=s),class:"flex flex-wrap gap-4"},{default:t(()=>[(r(!0),_(S,null,I(K.value,s=>(r(),f(y,{key:s.id,value:s.id,label:s.name},{default:t(()=>[m(d(s.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["value"]))]),_:1},8,["header"])]),_:1},8,["activeKey"]),o(A,{activeKey:R.value,"onUpdate:activeKey":a[9]||(a[9]=s=>R.value=s),class:"mt-8"},{default:t(()=>[o(z,{key:"2",header:e.$t("users.table_field.get_roles"),name:"user_permission",class:"w-full"},{default:t(()=>[U.value?(r(),_("div",Ce,"Loading permission...")):(r(),f(M,{key:1,value:l.value.user_permissions,"onUpdate:value":a[8]||(a[8]=s=>l.value.user_permissions=s),class:"flex flex-wrap gap-4"},{default:t(()=>[(r(!0),_(S,null,I(L.value,s=>(r(),f(y,{key:s.id,value:s.id,label:s.name},{default:t(()=>[m(d(s.name),1)]),_:2},1032,["value","label"]))),128))]),_:1},8,["value"]))]),_:1},8,["header"])]),_:1},8,["activeKey"]),c("div",Be,[o(n,{label:"",name:"is_superuser",class:"md:w-[10rem]"},{default:t(()=>[o(y,{checked:l.value.is_superuser,onChange:a[10]||(a[10]=s=>l.value.is_superuser=s.target.checked)},{default:t(()=>[m(d(e.$t("users.table_field.super_user")),1)]),_:1},8,["checked"])]),_:1}),o(n,{label:"",name:"is_staff",class:"md:w-[10rem]"},{default:t(()=>[o(y,{checked:l.value.is_staff,onChange:a[11]||(a[11]=s=>l.value.is_staff=s.target.checked)},{default:t(()=>[m(d(e.$t("users.table_field.staff")),1)]),_:1},8,["checked"])]),_:1}),o(n,{label:"",name:"is_active",class:"md:w-[10rem]"},{default:t(()=>[o(y,{checked:l.value.is_active,onChange:a[12]||(a[12]=s=>l.value.is_active=s.target.checked)},{default:t(()=>[m(d(e.$t("users.table_field.status")),1)]),_:1},8,["checked"])]),_:1})]),c("div",je,[o(n,{class:"flex items-center mt-4 justify-center"},{default:t(()=>[o(w,{type:"primary",onClick:X},{default:t(()=>[m(d(e.$t("users.edit")),1)]),_:1}),a[14]||(a[14]=m("   ")),o(w,{danger:"",onClick:a[13]||(a[13]=s=>$(N)({name:"user.list"}))},{default:t(()=>[m(d(e.$t("users.cancel")),1)]),_:1})]),_:1})])]),_:1},8,["rules","model"]))],64)}}}),De=ge(Ke,[["__scopeId","data-v-74706fa6"]]);export{De as default};