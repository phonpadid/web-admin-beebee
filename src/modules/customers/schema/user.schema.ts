import { Rule } from "ant-design-vue/es/form";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useCustomerSchema = () => {
  const { t, locale } = useI18n();
  const schemaKey = ref(0); // Force schema refresh

  // Schema definition as a computed property
  const schema = computed<Record<string, Rule[]>>(() => ({
    first_name: [{ required: true, message: t("validation.user.fname"), trigger: "blur" }],
    last_name: [{ required: true, message: t("validation.user.lname"), trigger: "blur" }],
    phone_number: [
      { required: true, message: t("validation.user.phone_number"), trigger: "blur" },
    ],
    email: [
      { required: true, message: t("validation.user.email"), trigger: "blur" },
      { type: "email", message: t("validation.user.style_email"), trigger: "change" },
    ],
    password: [
      { required: true, message: t("validation.user.password"), trigger: "change" },
      { min: 6, message: t("validation.user.length_pass"), trigger: "change" },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        message: t("validation.user.pattern"),
        trigger: "change",
      },
    ],
    password_confirmation: [
      {
        required: true,
        message: t("validation.user.confirm_password"),
        trigger: "blur",
      },
      { min: 8, message: t("validation.user.length_pass"), trigger: "change" },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        message: t("validation.user.pattern"),
        trigger: "change",
      },
    ],
  }));

  // Watch for locale changes and increment schemaKey to trigger re-render
  watch(locale, () => {
    schemaKey.value += 1;
  });

  return { schema, schemaKey };
};
