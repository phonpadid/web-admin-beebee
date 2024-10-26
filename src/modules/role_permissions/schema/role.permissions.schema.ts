import type { Rule } from "ant-design-vue/es/form";

export const RolesPermissionsShcema: Record<string, Rule[]> = {
  permission_id: [
    { required: true, message: "ກະລຸນາເລືອກPermissions", trigger: "change" },
  ],
  role_id: [
    { required: true, message: "ກະລຸນາເລືອກRoleກ່ອນ", trigger: "change" },
  ],
};
