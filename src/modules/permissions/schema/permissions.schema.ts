import type { Rule } from "ant-design-vue/es/form";

export const PermissionsShcema: Record<string, Rule[]> = {
  name: [{ required: true, message: "ກະລຸນາປ້ອນຊື່ກ່ອນ", trigger: "change" }],
  codename: [
    { required: true, message: "ກະລຸນາປ້ອນຊື່ລະຫັດ", trigger: "change" },
  ],
  
};
