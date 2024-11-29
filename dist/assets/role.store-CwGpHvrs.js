import{z as g,m as l}from"./index-B4OLFXgi.js";import{i as p,a as d,A as f,b as v}from"./axios.config-9RTEzkkw.js";var w=Object.defineProperty,h=Object.getOwnPropertyDescriptor,y=(a,t,s,e)=>{for(var r=e>1?void 0:e?h(t,s):t,o=a.length-1,n;o>=0;o--)(n=a[o])&&(r=(e?n(t,s,r):n(r))||r);return e&&r&&w(t,s,r),r},P=(a,t)=>(s,e)=>t(s,e,a);let c=class{constructor(a){this._api=a}async create(a){const t=await this._api.axios({method:"post",url:"accounts/groups/",data:{name:a.name,permissions:a.permissions}});return console.log(t),{data:t.data,message:"ບັນທຶກສຳເລັດ",status:"success"}}async update(a,t){return{data:(await this._api.axios({method:"put",url:`accounts/groups/${t}/`,data:{name:a.name,permissions:a.permissions}})).data,message:"ອັບເດດສຳເລັດ",status:"success"}}async getAll(a){const t=await this._api.axios({url:"/accounts/groups/",params:{page:a.page,page_size:a.limit}}),{results:s,count:e}=t.data;return{data:{props:s,total:e},status:"success"}}async getDetail(a){return{data:(await this._api.axios({url:`/accounts/groups/${a}/`})).data,status:"success"}}async remove(a){return{data:(await this._api.axios({method:"delete",url:"/accounts/groups/"+a})).data,status:"success"}}};c=y([p(),P(0,d(f))],c);var D=Object.defineProperty,A=Object.getOwnPropertyDescriptor,O=(a,t,s,e)=>{for(var r=e>1?void 0:e?A(t,s):t,o=a.length-1,n;o>=0;o--)(n=a[o])&&(r=(e?n(t,s,r):n(r))||r);return e&&r&&D(t,s,r),r},b=(a,t)=>(s,e)=>t(s,e,a);let u=class{constructor(a){this._api=a}async create(a){return await this._api.create(a)}async update(a,t){return await this._api.update(a,t)}async getAll(a){return await this._api.getAll(a)}async getDetail(a){return await this._api.getDetail(a)}async remove(a){return await this._api.remove(a)}};u=O([p(),b(0,d(c))],u);const $=g("roles-store",()=>{const a=v.resolve(u),t=l({data:{props:[],total:0},isLoading:!1,btnLoading:!1,error:""}),s=l({limit:10,filter:{}});async function e(){t.isLoading=!0;const i=await a.getAll({page:s.page,limit:s.limit,filter:s.filter});i&&i.data&&i.status==="success"&&(t.data.props=i.data.props,t.data.total=i.data.total,t.isLoading=!1)}async function r(i){return await a.create(i)}async function o(i,_){return await a.update(i,_)}async function n(i){return await a.getDetail(i)}async function m(i){return await a.remove(i)}return{getAll:e,create:r,update:o,state:t,setStateFilter:s,getDetail:n,remove:m}});export{$ as r};
