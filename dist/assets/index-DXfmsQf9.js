import{z as g,m as c}from"./index-B4OLFXgi.js";import{i as l,a as _,A as v,b as y}from"./axios.config-9RTEzkkw.js";var h=Object.defineProperty,w=Object.getOwnPropertyDescriptor,S=(a,s,e,r)=>{for(var t=r>1?void 0:r?w(s,e):s,n=a.length-1,i;n>=0;n--)(i=a[n])&&(t=(r?i(s,e,t):i(t))||t);return r&&t&&h(s,e,t),t},A=(a,s)=>(e,r)=>s(e,r,a);let d=class{constructor(a){this._api=a}async create(a){var r;const s=new FormData;return a.first_name&&s.append("first_name",(r=a.first_name)==null?void 0:r.toString()),s.append("last_name",a.last_name),s.append("email",a.email),s.append("user_type","admin"),s.append("phone_number",a.phone_number),s.append("is_active",String(!0)),s.append("is_active",String(0)),a.password&&s.append("password",a.password.toString()),a.groups&&Array.isArray(a.groups)&&a.groups.forEach(t=>{s.append("groups",t.toString())}),a.user_permissions&&Array.isArray(a.user_permissions)&&a.user_permissions.forEach(t=>{s.append("user_permissions",t.toString())}),a.avatar&&s.append("avatar",a.avatar),console.log("is_active:",a.is_active),{data:(await this._api.axios({method:"post",url:"/accounts/users/",data:s,headers:{"Content-Type":"multipart/form-data"}})).data,message:"ບັນທຶກສຳເລັດ",status:"success"}}async update(a,s){var t,n;const e=new FormData;return a.id&&e.append("id",(t=a.id)==null?void 0:t.toString()),a.first_name&&e.append("first_name",(n=a.first_name)==null?void 0:n.toString()),e.append("last_name",a.last_name),e.append("email",a.email),e.append("user_type","admin"),e.append("phone_number",a.phone_number),a.is_staff&&e.append("is_staff",String(a.is_staff)),e.append("is_superuser",String(a.is_superuser)),e.append("is_active",String(a.is_active)),a.groups&&Array.isArray(a.groups)&&a.groups.forEach(i=>{e.append("groups",i.toString())}),a.user_permissions&&Array.isArray(a.user_permissions)&&a.user_permissions.forEach(i=>{e.append("user_permissions",i.toString())}),a.avatar&&e.append("avatar",a.avatar),{data:(await this._api.axios({method:"put",url:`/accounts/users/${s}/`,data:e,headers:{"Content-Type":"multipart/form-data"}})).data,message:"ອັບເດດສຳເລັດ",status:"success"}}async getAll(a){const s=await this._api.axios({url:"/accounts/users/",params:{page:a.page,page_size:a.limit}}),{results:e,count:r}=s.data;return{data:{props:e,total:r},status:"success"}}async getOne(a){return console.log("props:"),{data:(await this._api.axios({url:"/accounts/users/"+a})).data,status:"success"}}async remove(a){const s=await this._api.axios({method:"delete",url:"/accounts/users/"+a});return{data:s.data,status:s.data.status}}};d=S([l(),A(0,_(v))],d);var O=Object.defineProperty,b=Object.getOwnPropertyDescriptor,P=(a,s,e,r)=>{for(var t=r>1?void 0:r?b(s,e):s,n=a.length-1,i;n>=0;n--)(i=a[n])&&(t=(r?i(s,e,t):i(t))||t);return r&&t&&O(s,e,t),t},L=(a,s)=>(e,r)=>s(e,r,a);let u=class{constructor(a){this._api=a}async create(a){return await this._api.create(a)}async update(a,s){return await this._api.update(a,s)}async getAll(a){return await this._api.getAll(a)}async getOne(a){return await this._api.getOne(a)}async remove(a){return await this._api.remove(a)}};u=P([l(),L(0,_(d))],u);const j=g("user-store",()=>{const a=y.resolve(u),s=c({data:{props:[],total:0},isLoading:!1,btnLoading:!1,error:""}),e=c({limit:10,filter:{}});async function r(){s.isLoading=!0;const o=await a.getAll({page:e.page,limit:e.limit,filter:e.filter});o&&o.data&&o.status==="success"&&(s.data.props=o.data.props,s.data.total=o.data.total,s.isLoading=!1)}const t=c({data:null,isLoading:!1,errorMessage:""});async function n(o){t.isLoading=!0;const p=await a.getOne(o);p&&p.data&&p.status==="success"&&(t.data=p.data,t.isLoading=!1)}async function i(o){t.isLoading=!0;const p=await a.remove(o);p&&p.data&&p.status==="success"&&(t.data=p.data,t.isLoading=!1)}async function f(o){return await a.create(o)}async function m(o,p){return await a.update(o,p)}return{getAllUser:r,create:f,update:m,getOneUser:n,stateGetOne:t,stateUser:s,setStateFilter:e,remove:i}});export{j as u};
