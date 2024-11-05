import type { Rule } from "ant-design-vue/es/form";

export const UserShcema: Record<string, Rule[]> = {
  first_name: [{ required: true, message: "ກະລຸນາປ້ອນຂໍ້ມູນກ່ອນ" }],
  last_name: [{ required: true, message: "ກະລຸນາເລືອກຂໍ້ມູນກ່ອນ" }],
<<<<<<< HEAD
  status: [{ required: true, message: "ກະລຸນາເລືອກສະຖານະກ່ອນ" }],
  user_type: [{ required: true, message: "ກະລຸນາເລືອກປະເພດຜູ້ໃຊ້ກ່ອນ" }],
=======
>>>>>>> 51fb5a251ac2a5bad37eb41ed4c2c623c4294d8b
  groups: [{ required: true, message: "ກະລຸນາເລືອກບົດບາດກ່ອນ" }],
  phone_number: [
    { required: true, message: "ກະລຸນາປ້ອນເບີໂທກ່ອນ", trigger: "blur" },
  ],
<<<<<<< HEAD
  password: [
    { required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ", trigger: "blur" },
=======
  email: [
    { required: true, message: "ກະລຸນາປ້ອນອີວເມວກ່ອນ", trigger: "blur" },
    { type: "email", message: "ຕ້ອງເປັນຮູບແບບອີວເມວ name@gmail.com", trigger: "change" }
  ],
  password: [
    { required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານກ່ອນ", trigger: "change" },
    { min: 6, message: "ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວ 6 ຕົວຂື້ນໄປ", trigger: "change" },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      message: "ລະຫັດຜ່ານຕ້ອງປະກອບດ້ວຍຕົວອັກສອນ ແລະ ຕົວເລກ ",
      trigger: "change"
    }
>>>>>>> 51fb5a251ac2a5bad37eb41ed4c2c623c4294d8b
  ],
  password_confirmation: [
    {
      required: true,
      message: "ກະລຸນາປ້ອນຢືນຢັນລະຫັດຜ່ານກ່ອນ",
      trigger: "blur",
    },
<<<<<<< HEAD
  ],
  avatar: [
    { required: true, message: "ກະລຸນາເລືອກຮູບພາບກ່ອນ", trigger: "change" },
  ],
};
=======
    { min: 6, message: "ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວ 6 ຕົວຂື້ນໄປ", trigger: "change" },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      message: "ລະຫັດຜ່ານຕ້ອງປະກອບດ້ວຍຕົວອັກສອນ ແລະ ຕົວເລກ ",
      trigger: "change"
    }
  ],
  // avatar: [
  //   { required: true, message: "ກະລຸນາເລືອກຮູບພາບກ່ອນ", trigger: "change" },
  // ],
};
>>>>>>> 51fb5a251ac2a5bad37eb41ed4c2c623c4294d8b
