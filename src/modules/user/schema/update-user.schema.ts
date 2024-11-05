import type { Rule } from "ant-design-vue/es/form";

export const updateUserShcema: Record<string, Rule[]> = {
  first_name: [{ required: true, message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ" }],
  last_name: [{ required: true, message: "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ" }],
  groups: [{ required: true, message: "ກະລຸນາເລືອກບົດບາດກ່ອນ" }],
  phone_number: [
    { required: true, message: "ກະລຸນາປ້ອນເບີໂທກ່ອນ", trigger: "blur" },
  ],
  email: [
    { required: true, message: "ກະລຸນາປ້ອນອີວເມວກ່ອນ", trigger: "blur" },
    { type: "email", message: "ຕ້ອງເປັນຮູບແບບອີວເມວ name@gmail.com", trigger: "change" }
  ],
  // avatar: [
  //   { required: true, message: "ກະລຸນາເລືອກຮູບພາບກ່ອນ", trigger: "change" },
  // ],
};