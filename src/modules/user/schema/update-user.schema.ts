
import { computed } from "vue";
import { useUserSchema } from "./user.schema";

export const useUpdateUserSchema = () => {
  const { schema, schemaKey } = useUserSchema();

  // Omit `password` and `password_confirmation` fields
  const updateSchema = computed(() => {
    const { password, password_confirmation, ...rest } = schema.value;
    return rest;
  });

  return { schema: updateSchema, schemaKey };
};
