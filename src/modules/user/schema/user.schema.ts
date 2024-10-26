import type { Rule } from "ant-design-vue/es/form";

export const UserShcema: Record<string, Rule[]> = {
  first_name: [{ required: true, message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ" }],
  last_name: [{ required: true, message: "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ" }],
  status: [{ required: true, message: "ກະລຸນາເລືອກສະຖານະກ່ອນ" }],
  user_type: [{ required: true, message: "ກະລຸນາເລືອກປະເພດຜູ້ໃຊ້ກ່ອນ" }],
  groups: [{ required: true, message: "ກະລຸນາເລືອກບົດບາດກ່ອນ" }],
  phone_number: [
    { required: true, message: "ກະລຸນາປ້ອນເບີໂທກ່ອນ", trigger: "blur" },
  ],
  password: [
    { required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ", trigger: "blur" },
  ],
  password_confirmation: [
    {
      required: true,
      message: "ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານກ່ອນ",
      trigger: "blur",
    },
  ],
  avatar: [
    { required: true, message: "ກະລຸນາເລືອກຮູບພາບກ່ອນ", trigger: "change" },
  ],
};
