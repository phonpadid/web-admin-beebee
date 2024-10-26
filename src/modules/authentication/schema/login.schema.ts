import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("ກະລຸນາປ້ອນອີເມວກ່ອນ"),
  password: yup
    .string()
    .required("ກະລຸນາປ້ອນລະຫັດຜ່ານ")
    .min(6, "ລະຫັດຜ່ານຕ້ອງບໍ່ຕຳກວ່າ 6 ໂຕ"),
});
