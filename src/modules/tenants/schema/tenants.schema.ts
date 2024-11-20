import type { Rule } from "ant-design-vue/es/form";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

export const useTenantSchema = () => {
  const { t, locale } = useI18n();
  const schemaKey = ref(0); // Force schema refresh

  const schema = computed<Record<string, Rule[]>>(() => ({
    name: [{ required: true, message: t("validation.tenants.name") }],
    schema_name: [{ required: true, message: t("validation.tenants.schema_name") }],
    groups: [{ required: true, message: t("validation") }],
    domain: [
      { required: true, message: t("validation.tenants.domain_name"), trigger: "blur" },
    ]
  }));

  watch(locale, () => {
    schemaKey.value += 1;
  });

  return { schema, schemaKey };
};