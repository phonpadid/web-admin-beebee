import{l as f}from"./logo_beer-PvJf7xCC.js";import{l as c}from"./login.schema-CSq2X0Rv.js";import{d as x,r as _,f as v,g as s,c as t,i as o,h as r,e as a,a as g,o as b,j as w,_ as y}from"./index-B4OLFXgi.js";const k={class:"w-full h-screen flex flex-col justify-center bg-gray-200 items-center"},C={class:"flex flex-col w-[470px] h-[420px] bg-gray-100 rounded-md shadow-md justify-center p-6"},h={class:"p-4"},P=x({__name:"ResetPassword",setup(j){const{push:m}=g(),l=_({email:"",password:""});return(B,e)=>{const d=a("a-input"),i=a("a-form-item"),p=a("a-button"),u=a("a-form");return b(),v("div",k,[e[6]||(e[6]=s("img",{src:f,alt:"",srcset:"",class:"ring-1 ring-slate-200 shadow-md w-[130px] h-[130px] mb-4 -mt-6 rounded-full"},null,-1)),s("div",C,[e[5]||(e[5]=s("div",{class:"flex-col flex items-center px-4"},[s("h1",{class:"text-lg -mt-[5.5rem]"},"ກຸ້ຄືນລະຫັດຜ່ານ"),s("h2",{class:"text-[12px] text-gray-600"}," ໃສ່ທີ່ຢູ່ອີເມວຂອງທ່ານຢູ່ລຸ່ມນີ້ ແລ້ວພວກເຮົາຈະສົ່ງລະຫັດ OTP ໄປຫາທ່ານເພື່ອກູ້ຄືນລະຫັດຜ່ານຂອງທ່ານ. ")],-1)),s("div",h,[t(u,{model:l.value,name:"basic",class:"myfont",rules:r(c)},{default:o(()=>[t(i,{name:"email"},{default:o(()=>[e[3]||(e[3]=s("span",{class:""},"ທີ່ຢູ່ອີເມວ",-1)),t(d,{value:l.value.email,"onUpdate:value":e[0]||(e[0]=n=>l.value.email=n),placeholder:"ປ້ອນທີ່ຢູ່ອີເມວຂອງທ່ານ"},null,8,["value"])]),_:1}),t(i,{class:"mt-8"},{default:o(()=>[t(p,{type:"primary",onClick:e[1]||(e[1]=n=>r(m)({name:"confirmPassword"})),"html-type":"submit",class:"w-full btn"},{default:o(()=>e[4]||(e[4]=[w(" ກູ້ຄືນ ")])),_:1})]),_:1}),s("span",{onClick:e[2]||(e[2]=n=>r(m)({name:"login"})),class:"text-blue-400 hover:text-sky-600 cursor-pointer"},"ເຂົ້າສູ່ລະບົບດຽວນີ້ບໍ່ ?")]),_:1},8,["model","rules"])])])])}}}),T=y(P,[["__scopeId","data-v-ebb46b28"]]);export{T as default};