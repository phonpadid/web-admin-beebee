import type { Rule } from "ant-design-vue/es/form";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const ChangePasswordSchema = () => {
  const { t, locale } = useI18n();
  const schemaKey = ref(0); // Force schema refresh

  // Schema definition as a computed property
  const schema = computed<Record<string, Rule[]>>(() => ({
    old_password: [
      { required: true, message: t("validation.user.password"), trigger: "change" },
      { min: 8, message: t("validation.user.length_pass"), trigger: "change" },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        message: t("validation.user.pattern"),
        trigger: "change",
      },
    ],
    new_password: [
      {
        required: true,
        message: t("validation.user.confirm_password"),
        trigger: "change",
      },
      { min: 8, message: t("validation.user.length_pass"), trigger: "change" },
      {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        message: t("validation.user.pattern"),
        trigger: "change",
      },
    ],
    confirm_password: [
      {
        required: true,
        message: t("validation.user.confirm_password"),
        trigger: "change",
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

