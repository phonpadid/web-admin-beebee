import type { Rule } from "ant-design-vue/es/form";

export const RolesUserShcema: Record<string, Rule[]> = {
  user_id: [
    { required: true, message: "ກະລຸນາເລືອກຜູ້ໃຊ້ກ່ອນ", trigger: "change" },
  ],
  role_id: [
    { required: true, message: "ກະລຸນາເລືອກRoleກ່ອນ", trigger: "change" },
  ],
};
