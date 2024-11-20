
import { computed } from "vue";
import { useCustomerSchema } from "./user.schema";

export const useUpdateCustomerSchema = () => {
  const { schema, schemaKey } = useCustomerSchema();

  // Omit `password` and `password_confirmation` fields
  const updateSchema = computed(() => {
    const { password, password_confirmation, ...rest } = schema.value;
    return rest;
  });

  return { schema: updateSchema, schemaKey };
};
