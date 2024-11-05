import type { Rule } from "ant-design-vue/es/form";

export const ChangePasswordSchema: Record<string, Rule[]> = {
  old_password: [
    { required: true, message: "ກະລຸນາປ້ອນລະຫັດເກົ່າຂອງກ່ອນ", trigger: "change" },
    { min: 6, message: "ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວ 6 ຕົວຂື້ນໄປ", trigger: "change" },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      message: "ລະຫັດຕ້ອງປະກອບດ້ວຍຕົວອັກສອນ ແລະ ຕົວເລກ ",
      trigger: "change"
    }
  ],
  new_password: [
    { required: true, message: "ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່ຂອງທ່ານກ່ອນ", trigger: "change" },
    { min: 6, message: "ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວ 6 ຕົວຂື້ນໄປ", trigger: "change" },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      message: "ລະຫັດຕ້ອງປະກອບດ້ວຍຕົວອັກສອນ ແລະ ຕົວເລກ ",
      trigger: "change"
    }
  ],
  confirm_password: [
    { required: true, message: "ກະລຸນາຢືນຢັນລະຫັດໃໝ່ຂອງທ່ານກ່ອນ", trigger: "change" },
    { min: 6, message: "ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວ 6 ຕົວຂື້ນໄປ", trigger: "change" },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      message: "ລະຫັດຕ້ອງປະກອບດ້ວຍຕົວອັກສອນ ແລະ ຕົວເລກ ",
      trigger: "change"
    }
  ]
};
