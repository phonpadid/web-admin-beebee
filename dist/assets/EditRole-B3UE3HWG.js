import{u as G}from"./role.schema-B8V015ct.js";import{r as H}from"./role.store-CwGpHvrs.js";import{p as J}from"./permissions.store-DuAphxP9.js";import{d as Q,r as d,m as W,v as X,u as Y,k as Z,f as p,g,c as n,h as f,j as _,t as i,n as h,i as t,e as r,b as ee,a as ae,o as l,p as se,q as oe,F as te,x as ne,s as re}from"./index-B4OLFXgi.js";import{L as le}from"./LineChartOutlined-DLTvqI0r.js";import"./axios.config-9RTEzkkw.js";const me={class:"form-role"},ie={class:"pb-4 flex justify-between"},ce={class:"text-base font-bold text-blue-500"},ue={key:0,style:{color:"red"}},de={key:1,style:{color:"red"}},pe={key:0},fe={class:"md:flex md:flex-row flex-col gap-4"},xe=Q({__name:"EditRole",setup(_e){const{schema:S,schemaKey:R}=G(),{update:D,getDetail:F,getAll:K}=H(),{getAllPer:N,statePermission:P}=J(),b=d(["2"]),k=d(!1),c=d(!1),{params:V}=ee(),x=d(),{push:w}=ae(),$={id:"",name:"",permissions:[]},o=d({...$}),m=W({}),j=async()=>{x.value.validate().then(async()=>{k.value=!0;try{await D(o.value,o.value.id),re.success({message:y("messages.success"),description:y("messages.update")}),w({name:"roles.index"}),await K(),A()}catch(e){if(e.response&&e.response.data){const a=e.response.data||{};Object.keys(a).forEach(u=>{m[u]=Array.isArray(a[u])?a[u][0]:""})}}finally{k.value=!1}}).catch(e=>{console.log("Validation error",e)})},A=()=>{o.value={...$}},B=async()=>{c.value=!0;try{const e=await F(Number(V.id));e&&(o.value={...e.data,permissions:e.data.permissions.map(a=>a.id)})}catch(e){console.error("Error fetching role details:",e)}finally{c.value=!1}},L=async()=>{c.value=!0;try{await N()}catch(e){console.error("Error fetching permissions:",e)}finally{c.value=!1}};X(async()=>{await B(),await L()});const U=e=>{m[e]=""},{t:y}=Y(),I=Z(()=>({name:y("placeholder.role.name")}));return(e,a)=>{const u=r("a-input"),C=r("a-form-item"),O=r("a-checkbox"),q=r("a-checkbox-group"),z=r("a-collapse-panel"),M=r("a-collapse"),E=r("a-button"),T=r("a-form");return l(),p("div",me,[g("div",ie,[g("p",ce,[n(f(le)),_(" "+i(e.$t("messages.role.form_edit")),1)])]),(l(),h(T,{layout:"vertical",ref_key:"form",ref:x,rules:f(S),key:f(R),model:o.value},{default:t(()=>[n(C,{class:"form-item-centered",label:e.$t("messages.role.name"),name:"name"},{default:t(()=>[n(u,{value:o.value.name,"onUpdate:value":a[0]||(a[0]=s=>o.value.name=s),placeholder:I.value.name,onInput:a[1]||(a[1]=s=>U("name")),class:se(["h-[3rem]",{"ring-1 ring-red-500 mb-1":m.name}])},null,8,["value","placeholder","class"]),m.name&&m.name.length>=50?(l(),p("span",ue,i(e.$t("messages.more_then")),1)):m.name&&m.name.length<40?(l(),p("span",de,i(e.$t("messages.exist_name")),1)):oe("",!0)]),_:1},8,["label"]),n(M,{activeKey:b.value,"onUpdate:activeKey":a[3]||(a[3]=s=>b.value=s),class:"mt-8"},{default:t(()=>[n(z,{key:"2",header:e.$t("messages.role.form.get_permissions"),name:"permissions",class:"w-full"},{default:t(()=>[c.value?(l(),p("div",pe,"Loading permissions...")):(l(),h(q,{key:1,value:o.value.permissions,"onUpdate:value":a[2]||(a[2]=s=>o.value.permissions=s),class:"flex flex-wrap gap-4"},{default:t(()=>{var s;return[(l(!0),p(te,null,ne(((s=f(P).data)==null?void 0:s.props)||[],v=>(l(),h(O,{key:v.id,value:v.id,label:v.name},{default:t(()=>[_(i(v.name),1)]),_:2},1032,["value","label"]))),128))]}),_:1},8,["value"]))]),_:1},8,["header"])]),_:1},8,["activeKey"]),g("div",fe,[n(C,{class:"flex items-center mt-4 justify-center"},{default:t(()=>[n(E,{type:"primary",onClick:j},{default:t(()=>[_(i(e.$t("messages.role.edit")),1)]),_:1}),a[5]||(a[5]=_("   ")),n(E,{onClick:a[4]||(a[4]=s=>f(w)({name:"roles.index"})),danger:""},{default:t(()=>[_(i(e.$t("messages.role.btn.cancel")),1)]),_:1})]),_:1})])]),_:1},8,["rules","model"]))])}}});export{xe as default};
