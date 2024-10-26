import type { Rule } from "ant-design-vue/es/form";

export const UserShcema: Record<string, Rule[]> = {
  first_name: [{ required: true, message: "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ", trigger: "blur" }],
  last_name: [{ required: true, message: "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ", trigger: "blur" }],
  status: [{ required: true, message: "ກະລຸນາເລືອກສະຖານະກ່ອນ", trigger: "blur" }],
  user_type: [{ required: true, message: "ກະລຸນາເລືອກປະເພດຜູ້ໃຊ້ກ່ອນ", trigger: "blur" }],
  groups: [{ required: true, message: "ກະລຸນາເລືອກບົດບາດກ່ອນ", trigger: "blur" }],
  phone_number: [{ required: true, message: "ກະລຸນາປ້ອນເບີໂທກ່ອນ", trigger: "blur" }],
  password: [{ required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ", trigger: "blur" }],
  password_confirmation: [{ required: true, message: "ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານກ່ອນ", trigger: "blur" }],
  avatar: [{ required: true, message: "ກະລຸນາເລືອກຮູບພາບກ່ອນ", trigger: "change" }], // สำหรับอัปโหลดที่อาจไม่ต้องการ blur
};
