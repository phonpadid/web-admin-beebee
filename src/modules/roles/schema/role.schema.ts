import type { Rule } from "ant-design-vue/es/form";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useRoleSchema = () => {
  const { t, locale } = useI18n();
  const schemaKey = ref(0); // Force schema refresh

  const schema = computed<Record<string, Rule[]>>(() => ({
    name: [{ required: true, message: t("validation.role.name"),  trigger: "change" }],
  }));

  watch(locale, () => {
    schemaKey.value += 1;
  });

  return { schema, schemaKey };
};
