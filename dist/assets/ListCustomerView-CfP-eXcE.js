import{c as K}from"./index-Co7AWFst.js";import{_ as k,I as $}from"./iconify-DJFxz8ua.js";import{d as W,u as X,k as h,r as I,v as Z,f as c,c as a,i as o,h as m,F as S,e as u,a as ee,o as i,g as L,j as C,t as n,n as te,q as f,p as ae,C as N,s as Y}from"./index-B4OLFXgi.js";import{u as se}from"./index-DXfmsQf9.js";import{L as oe}from"./LineChartOutlined-DLTvqI0r.js";import"./axios.config-9RTEzkkw.js";const ne=l=>[{title:l("customers.table_field.avatar"),dataIndex:"full_avatar_url"},{title:l("users.table_field.full_name"),dataIndex:"full_name",key:"full_name",customRender:({record:d})=>`${d.first_name} ${d.last_name}`},{title:l("customers.table_field.email"),dataIndex:"email"},{title:l("customers.table_field.type"),dataIndex:"type"},{title:l("customers.table_field.created_at"),dataIndex:"created_at"},{title:l("customers.table_field.more"),dataIndex:"actions",align:"center"}],le={class:"text-base font-bold text-blue-500"},re={class:"text-[10px]"},ie={key:1,class:"w-[3rem] h-[3rem] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold"},ce={key:2},me={key:3},ue={key:4,class:"flex items-center justify-center gap-2"},be=W({__name:"ListCustomerView",props:{searchQuery:{}},setup(l){const{push:d}=ee(),{getAllCustomer:x,stateCustomer:_,setStateFilter:g}=K(),{remove:D}=se(),{t:p}=X(),M=h(()=>ne(p)),V=async e=>{await D(Number(e.id)),Y.success({message:p("popconfirm.message_success.title"),description:p("popconfirm.message_success.messages")}),F(Number(e.customer_id),!1),await x()},j=()=>{Y.error({message:p("popconfirm.message_cancel.title"),description:p("popconfirm.message_cancel.messages")})},z=h(()=>({items_per_page:p("pagination.items_per_page")})),y=I({total:_.data.total,pageSize:g.limit,current:g.page,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],locale:z,onChange:B});async function B(e,s){y.value.current=e,y.value.pageSize=s,g.page=e,g.limit=s,await x()}const H=e=>{d({name:"customer_edit",params:{id:e.customer_id}})};Z(async()=>{await x(),y.value.total=_.data.total});const A=I({}),F=(e,s)=>{A.value[e]=s},v=l,O=h(()=>{if(!v.searchQuery)return _.data.props;const e=v.searchQuery.toLowerCase();return _.data.props.filter(s=>String(s.first_name).toLowerCase().includes(e)||String(s.last_name).toLowerCase().includes(e))}),P=e=>{var b;return e?`${((b=e.first_name)==null?void 0:b.charAt(0))||""}`.toUpperCase():""},Q={vip:"text-red-500 bg-red-100",general:"text-blue-500 bg-blue-100"};function T(e){return Q[e]||"text-gray-500 bg-gray-100"}return(e,s)=>{const b=u("a-button"),q=u("a-flex"),R=u("a-divider"),E=u("a-image"),w=u("a-tooltip"),U=u("a-popconfirm"),G=u("a-table");return i(),c(S,null,[a(q,{justify:"space-between",align:"flex-start"},{default:o(()=>[L("p",le,[a(m(oe)),C(" "+n(e.$t("customers.label_list")),1)]),a(b,{type:"primary",onClick:s[0]||(s[0]=r=>m(d)({name:"addCustomer"}))},{default:o(()=>[C(n(e.$t("customers.add")),1)]),_:1})]),_:1}),a(R,{style:{"margin-top":"10px"}}),a(G,{scroll:{x:!0},class:"whitespace-nowrap",columns:M.value,dataSource:O.value,pagination:y.value,loading:m(_).isLoading,"row-key":r=>r.id},{bodyCell:o(({column:r,record:t})=>[r.dataIndex==="full_avatar_url"?(i(),c(S,{key:0},[t!=null&&t.full_avatar_url?(i(),te(E,{key:0,src:t.full_avatar_url,alt:"Profile Avatar",width:"3rem",height:"3rem",class:"rounded-full"},{previewMask:o(()=>[L("span",re,n(e.$t("preview")),1)]),_:2},1032,["src"])):(i(),c("div",ie,n(P(t)),1))],64)):f("",!0),r.dataIndex==="type"?(i(),c("span",{key:1,class:ae(`px-2 py-1 rounded ${T(t.type)}`)},n(e.$t(`customers.table_field.choose_customer.${t.type}`)||t.type),3)):f("",!0),r.dataIndex==="created_at"?(i(),c("span",ce,n(m(N)(t.created_at).format("MM-DD-YYYY HH:mm:ss")),1)):f("",!0),r.dataIndex==="updated_at"?(i(),c("span",me,n(m(N)(t.updated_at).format("MM-DD-YYYY HH:mm:ss")),1)):f("",!0),r.dataIndex==="actions"?(i(),c("div",ue,[a(w,null,{title:o(()=>[C(n(e.$t("customers.edit")),1)]),default:o(()=>[a(k,{bgColor:"bg-white ",textColor:"text-blue-700",onClick:J=>H(t)},{icon:o(()=>[a(m($),{icon:"solar-pen-bold",width:"18"})]),_:2},1032,["onClick"])]),_:2},1024),a(w,null,{title:o(()=>[C(n(e.$t("customers.delete")),1)]),default:o(()=>[a(k,{bgColor:"bg-white hover:text-red-600",textColor:"text-red-600"},{icon:o(()=>[a(U,{title:e.$t("popconfirm.delete.messages"),"ok-text":e.$t("popconfirm.delete.okay"),"cancel-text":e.$t("popconfirm.delete.cancel"),onConfirm:J=>V(t),onCancel:j,class:"text-red-600"},{default:o(()=>[a(m($),{icon:"solar-trash-bin-2-bold",width:"18"})]),_:2},1032,["title","ok-text","cancel-text","onConfirm"])]),_:2},1024)]),_:2},1024)])):f("",!0)]),_:1},8,["columns","dataSource","pagination","loading","row-key"])],64)}}});export{be as default};