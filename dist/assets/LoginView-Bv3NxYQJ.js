import{_ as b,l as h}from"./login.schema-DV7i1FJm.js";import{u as k}from"./index-BtDIkZgz.js";import{d as V,r as d,f as C,g as s,c as t,h as l,i as o,e as n,a as B,o as j,j as L,_ as N}from"./index-DmLjb2yN.js";import"./axios.config-9RTEzkkw.js";const R={class:"w-full flex-col h-screen flex justify-center bg-gray-200 items-center"},U={class:"flex flex-col w-[470px] h-[420px] bg-gray-100 rounded-md shadow-md justify-center p-6"},M={class:"p-4"},P=V({__name:"LoginView",setup(S){const{push:f}=B(),{stateGetMe:c,login:_,form:a}=k(),u=d(!1),i=d(),x=async()=>{i.value.validate().then(async()=>{u.value=!0,await _(a),console.log("message:",c)}).catch(p=>{console.log("errr",p)}).finally(()=>{u.value=!1})};return(p,e)=>{const g=n("a-input"),m=n("a-form-item"),v=n("a-input-password"),w=n("a-button"),y=n("a-form");return j(),C("div",R,[e[7]||(e[7]=s("img",{src:b,alt:"",srcset:"",class:"ring-1 ring-slate-200 shadow-md w-[130px] h-[130px] mb-4 -mt-6 rounded-full"},null,-1)),s("div",U,[e[6]||(e[6]=s("div",{class:"flex-col flex items-center mt-8"},[s("h1",{class:"text-lg -mt-14"},"ຮ້ານບັນເທີງ LPB-VT"),s("h2",{class:"text-[12px] text-gray-600"}," May our customers be happy when they come to our store. ")],-1)),s("div",M,[t(y,{name:"basic",ref_key:"formRef",ref:i,class:"myfont",model:o(a),rules:o(h)},{default:l(()=>[t(m,{name:"email"},{default:l(()=>[e[3]||(e[3]=s("span",{class:""},"ອີເມວ",-1)),t(g,{value:o(a).email,"onUpdate:value":e[0]||(e[0]=r=>o(a).email=r),placeholder:"ປ້ອນອີເມວຂອງທ່ານ"},null,8,["value"])]),_:1}),t(m,{name:"password"},{default:l(()=>[e[4]||(e[4]=s("span",{class:""},"ລະຫັດຜ່ານ",-1)),t(v,{value:o(a).password,"onUpdate:value":e[1]||(e[1]=r=>o(a).password=r),placeholder:"********"},null,8,["value"])]),_:1}),s("span",{onClick:e[2]||(e[2]=r=>o(f)({name:"resetPassword"})),class:"text-blue-400 hover:text-sky-600 cursor-pointer"},"ລືມລະຫັດຜ່ານຂອງທ່ານບໍ່ ?"),t(m,{class:"mt-6"},{default:l(()=>[t(w,{type:"primary",onClick:x,"html-type":"submit",class:"w-full btn"},{default:l(()=>e[5]||(e[5]=[L(" ລ໋ອກອິນ ")])),_:1})]),_:1})]),_:1},8,["model","rules"])])])])}}}),I=N(P,[["__scopeId","data-v-b174e1d6"]]);export{I as default};
