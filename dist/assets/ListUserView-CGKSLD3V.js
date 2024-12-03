import{u as G}from"./index-9lTxRn36.js";import{_ as k,I as $}from"./iconify-C0mOQioB.js";import{d as J,k as y,r as I,v as K,u as W,o as l,f as m,c as t,i as s,h as c,F as S,e as d,a as X,g as L,j as b,t as i,n as Z,q as x,C as N,s as Y}from"./index-BpXBQnxn.js";import{L as ee}from"./LineChartOutlined-BheXCfHu.js";import"./axios.config-9RTEzkkw.js";const te=o=>[{title:o("users.table_field.avatar"),dataIndex:"avatar"},{title:o("users.table_field.full_name"),dataIndex:"full_name",key:"full_name",customRender:({record:u})=>`${u.first_name} ${u.last_name}`},{title:o("users.table_field.email"),dataIndex:"email"},{title:o("users.table_field.created_at"),dataIndex:"created_at"},{title:o("users.table_field.updated_at"),dataIndex:"updated_at"},{title:o("users.table_field.more"),dataIndex:"actions",align:"center"}],ae={class:"text-base font-bold text-blue-500"},se={class:"text-[10px]"},ne={key:1,class:"w-[3rem] h-[3rem] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold"},oe={key:1},ie={key:2},re={key:3,class:"flex items-center justify-center gap-2"},ue=J({__name:"ListUserView",props:{searchQuery:{}},setup(o){const{push:u}=X(),{getAllUser:v,stateUser:_,setStateFilter:f,remove:D}=G(),C=o,M=y(()=>{if(!C.searchQuery)return _.data.props;const e=C.searchQuery.toLowerCase();return _.data.props.filter(a=>String(a.first_name).toLowerCase().includes(e)||String(a.last_name).toLowerCase().includes(e))}),V=async e=>{await D(Number(e)),Y.success({message:p("popconfirm.message_success.title"),description:p("popconfirm.message_success.messages")}),z(Number(e),!1),await v()},j=()=>{Y.error({message:p("popconfirm.message_cancel.title"),description:p("popconfirm.message_cancel.messages")})},U=y(()=>({items_per_page:p("pagination.items_per_page")})),g=I({total:_.data.total,pageSize:f.limit,current:f.page,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],locale:U,onChange:B});async function B(e,a){g.value.current=e,g.value.pageSize=a,f.page=e,f.limit=a,await v()}const H=e=>{u({name:"editProfile",params:{id:e.id}})};K(async()=>{await v(),g.value.total=_.data.total});const P=I({}),z=(e,a)=>{P.value[e]=a},{t:p}=W(),A=y(()=>te(p)),F=e=>{var h;return e?`${((h=e.first_name)==null?void 0:h.charAt(0))||""}`.toUpperCase():""};return(e,a)=>{const h=d("a-button"),O=d("a-flex"),Q=d("a-divider"),q=d("a-image"),w=d("a-tooltip"),R=d("a-popconfirm"),E=d("a-table");return l(),m(S,null,[t(O,{justify:"space-between",align:"flex-start"},{default:s(()=>[L("p",ae,[t(c(ee)),b(" "+i(e.$t("users.label_list")),1)]),t(h,{type:"primary",onClick:a[0]||(a[0]=r=>c(u)({name:"addUser.index"}))},{default:s(()=>[b(i(e.$t("users.add")),1)]),_:1})]),_:1}),t(Q,{style:{"margin-top":"10px"}}),t(E,{scroll:{x:!0},class:"whitespace-nowrap",columns:A.value,dataSource:M.value,pagination:g.value,loading:c(_).isLoading,"row-key":r=>r.id},{bodyCell:s(({column:r,record:n})=>[r.dataIndex==="avatar"?(l(),m(S,{key:0},[n.avatar?(l(),Z(q,{key:0,src:n==null?void 0:n.avatar,alt:"Profile Avatar",width:"3rem",height:"3rem",class:"rounded-full"},{previewMask:s(()=>[L("span",se,i(e.$t("preview")),1)]),_:2},1032,["src"])):(l(),m("div",ne,i(F(n)),1))],64)):x("",!0),r.dataIndex==="created_at"?(l(),m("span",oe,i(c(N)(n.created_at).format("MM-DD-YYYY HH:mm:ss")),1)):x("",!0),r.dataIndex==="updated_at"?(l(),m("span",ie,i(c(N)(n.updated_at).format("MM-DD-YYYY HH:mm:ss")),1)):x("",!0),r.dataIndex==="actions"?(l(),m("div",re,[t(w,null,{title:s(()=>[b(i(e.$t("users.edit")),1)]),default:s(()=>[t(k,{bgColor:"bg-white ",textColor:"text-blue-700",onClick:T=>H(n)},{icon:s(()=>[t(c($),{icon:"solar-pen-bold",width:"18"})]),_:2},1032,["onClick"])]),_:2},1024),t(w,null,{title:s(()=>[b(i(e.$t("users.delete")),1)]),default:s(()=>[t(k,{bgColor:"bg-white hover:text-red-600",textColor:"text-red-600"},{icon:s(()=>[t(R,{title:e.$t("popconfirm.delete.messages"),"ok-text":e.$t("popconfirm.delete.okay"),"cancel-text":e.$t("popconfirm.delete.cancel"),onConfirm:T=>V(n.id),onCancel:j,class:"text-red-600"},{default:s(()=>[t(c($),{icon:"solar-trash-bin-2-bold",width:"18"})]),_:2},1032,["title","ok-text","cancel-text","onConfirm"])]),_:2},1024)]),_:2},1024)])):x("",!0)]),_:1},8,["columns","dataSource","pagination","loading","row-key"])],64)}}});export{ue as default};