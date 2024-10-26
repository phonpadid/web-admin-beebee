import type { Rule } from "ant-design-vue/es/form";

export const TenantsShcema: Record<string, Rule[]> = {
  name: [{ required: true, message: "ກະລຸນາປ້ອນຊື່ກ່ອນ", trigger: "change" }],
  schema_name: [
    { required: true, message: "ກະລຸນາປ້ອນຊື່ໂຄງຮ່າງ", trigger: "change" },
  ],
  domain: [{ required: true, message: "ກະລຸນາປ້ອນໂດເມນ", trigger: "change" }],
};
