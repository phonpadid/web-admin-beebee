import{z as se,m as q,d as G,e as y,o as w,n as N,i as r,G as J,f as k,c as l,h as L,j as D,F as Y,p as U,u as H,r as b,k as O,l as Z,t as $,q as B,g as Q,s as F,v as ne}from"./index-BpXBQnxn.js";import{i as ee,a as ae,A as oe,b as le}from"./axios.config-9RTEzkkw.js";import{I,_ as W}from"./iconify-C0mOQioB.js";import{L as ie}from"./LineChartOutlined-BheXCfHu.js";var re=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,de=(e,a,t,s)=>{for(var n=s>1?void 0:s?ce(a,t):a,u=e.length-1,p;u>=0;u--)(p=e[u])&&(n=(s?p(a,t,n):p(n))||n);return s&&n&&re(a,t,n),n},me=(e,a)=>(t,s)=>a(t,s,e);let K=class{constructor(e){this._api=e}async create(e){return{data:(await this._api.axios({method:"post",url:"/tenants/",data:{name:e.name,schema_name:e.schema_name,domain:e.domain}})).data,message:"ບັນທຶກສຳເລັດ",status:"success"}}async update(e,a){return console.log("idTenant:",a),{data:(await this._api.axios({method:"put",url:`/tenants/${a}/`,data:{id:a,name:e.name,schema_name:e.schema_name,domain:e.domain}})).data,message:"ອັບເດດສຳເລັດ",status:"success"}}async updateDomain(e,a){var s;return{data:(await this._api.axios({method:"put",url:`/domains/${a}/`,data:{id:a,name:e.name,schema_name:e.schema_name,domain:e.domain,tenant:(s=e.id)==null?void 0:s.toString()}})).data,message:"ອັບເດດສຳເລັດ",status:"success"}}async getAll(e){const a=await this._api.axios({url:"/tenants/",params:{page:e.page,page_size:e.limit}}),{results:t,count:s}=a.data;return{data:{props:t,total:s},status:"success"}}async remove(e){const a=await this._api.axios({method:"delete",url:`/tenants/${e}/`});return{data:a.data,status:a.data.status}}};K=de([ee(),me(0,ae(oe))],K);var ue=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,_e=(e,a,t,s)=>{for(var n=s>1?void 0:s?pe(a,t):a,u=e.length-1,p;u>=0;u--)(p=e[u])&&(n=(s?p(a,t,n):p(n))||n);return s&&n&&ue(a,t,n),n},fe=(e,a)=>(t,s)=>a(t,s,e);let R=class{constructor(e){this._api=e}async create(e){return await this._api.create(e)}async update(e,a){return await this._api.update(e,a)}async updateDomain(e,a){return await this._api.updateDomain(e,a)}async getAll(e){return await this._api.getAll(e)}async remove(e){return await this._api.remove(e)}};R=_e([ee(),fe(0,ae(K))],R);const te=se("tenants-store",()=>{const e=le.resolve(R),a=q({data:{props:[],total:0},isLoading:!1,btnLoading:!1,error:""}),t=q({limit:10,filter:{name:""}});async function s(){a.isLoading=!0;const c=await e.getAll({page:t.page,limit:t.limit,filter:t.filter});c&&c.data&&c.status==="success"&&(a.data.props=c.data.props,a.data.total=c.data.total,a.isLoading=!1)}async function n(c){return await e.create(c)}async function u(c,m){return await e.update(c,m)}async function p(c,m){return await e.updateDomain(c,m)}async function v(c){a.isLoading=!0;const m=await e.remove(c);m&&m.data&&m.status==="success"&&(a.isLoading=!1)}return{getAll:s,create:n,update:u,updateDomain:p,state:a,setStateFilter:t,remove:v}}),ge=G({__name:"ButtonDefault",props:{bgColor:{},hoverBgColor:{},textColor:{},border:{},isLoading:{type:Boolean}},setup(e){return(a,t)=>{const s=y("a-button");return w(),N(s,{disabled:a.isLoading,class:U(`flex items-center justify-center gap-2 border-none ${a.bgColor} ${a.textColor} ${a.hoverBgColor}`),shape:a.border?a.border:"default",size:"large"},{icon:r(()=>[J(a.$slots,"icon")]),default:r(()=>[a.isLoading?(w(),k(Y,{key:0},[l(L(I),{icon:"mdi-loading",class:"animate-spin"}),t[0]||(t[0]=D(" ກຳລັງໂຫລດ... "))],64)):J(a.$slots,"text",{key:1})]),_:3},8,["disabled","class","shape"])}}}),ve=()=>{const{t:e,locale:a}=H(),t=b(0),s=O(()=>({name:[{required:!0,message:e("validation.tenants.name")}],schema_name:[{required:!0,message:e("validation.tenants.schema_name")}],domain:[{required:!0,message:e("validation.tenants.domain_name"),trigger:"blur"}]}));return Z(a,()=>{t.value+=1}),{schema:s,schemaKey:t}},he={class:"flex text-xl font-bold"},be={key:0,class:"text-red-500"},ye={key:0,class:"text-red-500"},we={key:1,class:"text-red-500"},Ce={key:0},X=G({__name:"FormTenantsView",setup(e,{expose:a}){const{schema:t,schemaKey:s}=ve(),{create:n,update:u,getAll:p}=te(),v=b(!1),c=b(null),m=b(!1),S=b(!1),P=b(),h=q({}),E={id:"",name:"",schema_name:"",domain:""},d=b({...E}),T=async()=>{try{await P.value.validate(),S.value=!0,m.value?(await u(d.value,Number(d.value.id)),F.success({message:o("messages.success"),description:o("messages.update")}),v.value=!1,await p()):(await n(d.value),F.success({message:o("messages.success"),description:o("messages.description")}),v.value=!1,await p()),x()}catch(i){if(v.value=!0,i.response&&i.response.data){const _=i.response.data||{};Object.keys(_).forEach(C=>{h[C]=Array(_[C])?_[C][0]:""})}}finally{S.value=!1}},x=()=>{d.value={...E},m.value=!1},z=b("material-symbols-light:table-rows");a({open:v,item:c,isEditMode:m}),Z(c,i=>{i&&(d.value={...i,domain:i.domain.domain_url},m.value=!0,v.value=!0)});const{t:o}=H(),f=O(()=>({name:o("placeholder.tenants.name"),schema_name:o("placeholder.tenants.schema_name"),domain_name:o("placeholder.tenants.domain")}));return(i,_)=>{const C=y("a-input"),A=y("a-form-item"),M=y("a-form"),V=y("a-modal");return w(),N(V,{open:v.value,"onUpdate:open":_[3]||(_[3]=g=>v.value=g),title:""},{footer:r(()=>[l(ge,{disabled:S.value||m.value,isLoading:S.value,bgColor:"bg-black w-full flex justify-center font-bold",textColor:"text-white",onClick:T},{text:r(()=>[S.value?B("",!0):(w(),k("span",Ce,$(m.value?i.$t("tenants.edit"):i.$t("tenants.add")),1))]),_:1},8,["disabled","isLoading"])]),default:r(()=>[Q("div",he,[l(L(I),{icon:z.value,class:"mr-2 mt-1 bg-gray-200 rounded-md"},null,8,["icon"]),Q("p",null,$(m.value?i.$t("tenants.form_edit"):i.$t("tenants.form_add")),1)]),(w(),N(M,{layout:"vertical",ref_key:"form",ref:P,rules:L(t),key:L(s),model:d.value},{default:r(()=>[l(A,{class:"form-item-centered",label:i.$t("tenants.table_field.name"),name:"name"},{default:r(()=>[l(C,{placeholder:f.value.name,value:d.value.name,"onUpdate:value":_[0]||(_[0]=g=>d.value.name=g),class:U({"ring-1 ring-red-500 mb-1":h.name&&d.value.name.length>=100})},null,8,["placeholder","value","class"]),h.name&&d.value.name.length>=100?(w(),k("span",be,$(i.$t("validation.tenants.length_name")),1)):B("",!0)]),_:1},8,["label"]),l(A,{class:"form-item-centered",label:i.$t("tenants.table_field.schema_name"),name:"schema_name"},{default:r(()=>{var g;return[l(C,{placeholder:f.value.schema_name,value:d.value.schema_name,"onUpdate:value":_[1]||(_[1]=j=>d.value.schema_name=j),class:U({"ring-1 ring-red-500 mb-1":h.schema_name})},null,8,["placeholder","value","class"]),h.schema_name&&(((g=d.value.schema_name)==null?void 0:g.length)||0)>62?(w(),k("span",ye,$(i.$t("validation.tenants.length")),1)):h.schema_name?(w(),k("span",we,$(i.$t("validation.tenants.exists")),1)):B("",!0)]}),_:1},8,["label"]),l(A,{class:"form-item-centered",label:i.$t("tenants.table_field.domain"),name:"domain"},{default:r(()=>[l(C,{placeholder:f.value.domain_name,value:d.value.domain,"onUpdate:value":_[2]||(_[2]=g=>d.value.domain=g)},null,8,["placeholder","value"])]),_:1},8,["label"])]),_:1},8,["rules","model"]))]),_:1},8,["open"])}}}),$e=e=>[{title:e("tenants.table_field.domain"),dataIndex:["domain","domain_url"]},{title:e("tenants.table_field.name"),dataIndex:"name"},{title:e("tenants.table_field.schema_name"),dataIndex:"schema_name"},{title:e("tenants.table_field.created_at"),dataIndex:"created_on"},{title:e("tenants.table_field.more"),dataIndex:"actions",align:"center"}],xe={class:"text-base font-bold text-blue-500"},Le={key:0,class:"flex items-center justify-center gap-2"},Oe=G({__name:"ListTenantsView",props:{searchQuery:{}},setup(e){const a=b(),t=b(),{getAll:s,state:n,setStateFilter:u,remove:p}=te(),v=()=>{a.value&&(a.value.open=!0,a.value.isEditMode=!1,a.value.item=null)},c=o=>{const f=n.data.props.find(i=>i.id===o.id);f&&t.value&&(t.value.item=f,t.value.isEditMode=!0,t.value.open=!0)},m=async o=>{n.isLoading=!0,await p(o),F.success({message:x("popconfirm.message_success.title"),description:x("popconfirm.message_success.messages")}),await s()},S=()=>{F.error({message:x("popconfirm.message_cancel.title"),description:x("popconfirm.message_cancel.messages")})},P=O(()=>({items_per_page:x("pagination.items_per_page")})),h=b({total:n.data.total,pageSize:u.limit,current:u.page,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],locale:P,onChange:E});async function E(o,f){h.value.current=o,h.value.pageSize=f,u.page=o,u.limit=f,await s()}ne(async()=>{await s(),h.value.total=n.data.total});const d=e,T=O(()=>{if(!d.searchQuery)return n.data.props;const o=d.searchQuery.toLowerCase();return n.data.props.filter(f=>String(f.name).toLowerCase().includes(o)||String(f.domain).toLowerCase().includes(o))}),{t:x}=H(),z=O(()=>$e(x));return(o,f)=>{const i=y("a-button"),_=y("a-flex"),C=y("a-divider"),A=y("a-tooltip"),M=y("a-popconfirm"),V=y("a-table");return w(),k(Y,null,[l(_,{justify:"space-between",align:"flex-start"},{default:r(()=>[Q("p",xe,[l(L(ie)),D(" "+$(o.$t("tenants.label_list")),1)]),l(i,{type:"primary",onClick:v},{default:r(()=>[D($(o.$t("tenants.add")),1)]),_:1})]),_:1}),l(C,{style:{"margin-top":"10px"}}),l(V,{scroll:{x:!0},class:"whitespace-nowrap",columns:z.value,dataSource:T.value,pagination:h.value,loading:L(n).isLoading,"row-key":g=>g.id},{bodyCell:r(({column:g,record:j})=>[g.dataIndex==="actions"?(w(),k("div",Le,[l(A,null,{title:r(()=>[D($(o.$t("tenants.edit")),1)]),default:r(()=>[l(W,{bgColor:"bg-white ",textColor:"text-blue-700",onClick:()=>c(j)},{icon:r(()=>[l(L(I),{icon:"solar-pen-bold",width:"18"})]),_:2},1032,["onClick"])]),_:2},1024),l(A,null,{title:r(()=>[D($(o.$t("tenants.delete")),1)]),default:r(()=>[l(W,{bgColor:"bg-white hover:text-red-600",textColor:"text-red-600"},{icon:r(()=>[l(M,{title:o.$t("popconfirm.delete.messages"),"ok-text":o.$t("popconfirm.delete.okay"),"cancel-text":o.$t("popconfirm.delete.cancel"),onConfirm:Se=>m(j.id),onCancel:S,class:"text-red-600",disabled:j.schema_name==="public"},{default:r(()=>[l(L(I),{icon:"solar-trash-bin-2-bold",width:"18"})]),_:2},1032,["title","ok-text","cancel-text","onConfirm","disabled"])]),_:2},1024)]),_:2},1024)])):B("",!0)]),_:1},8,["columns","dataSource","pagination","loading","row-key"]),l(X,{ref_key:"modalAdd",ref:a},null,512),l(X,{ref_key:"modalEdit",ref:t},null,512)],64)}}});export{Oe as default};