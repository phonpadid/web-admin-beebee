// import * as yup from "yup";

// export const loginSchema = yup.object({
//   email: yup.string().required("ກະລຸນາປ້ອນອີເມວກ່ອນ"),
//   password: yup
//     .string()
//     .required("ກະລຸນາປ້ອນລະຫັດຜ່ານ")
//     .min(6, "ລະຫັດຜ່ານຕ້ອງບໍ່ຕຳກວ່າ 6 ໂຕ"),
// });

import type { Rule } from "ant-design-vue/es/form";

export const loginSchema: Record<string, Rule[]> = {
  email: [
    { required: true, message: "ກະລຸນາປ້ອນອີວເມວກ່ອນ", trigger: "blur" },
    { type: "email", message: "ຕ້ອງເປັນຮູບແບບອີວເມວ name@gmail.com", trigger: "change" }
  ],
  password: [
    { required: true, message: "ກະລຸນາປ້ອນລະຫັດເກົ່າຂອງກ່ອນ", trigger: "change" },
    { min: 6, message: "ລະຫັດຜ່ານຕ້ອງມີຄວາມຍາວ 6 ຕົວຂື້ນໄປ", trigger: "change" },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      message: "ລະຫັດຕ້ອງປະກອບດ້ວຍຕົວອັກສອນ ແລະ ຕົວເລກ ",
      trigger: "change"
    }
  ]
};
