<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import ButtonDefault from "@/components/Button/ButtonDefault.vue";
import { Icon } from "@iconify/vue";
import { useTenantSchema } from "../schema/tenants.schema";
import { tenantsStore } from "../store/tenants.store";
import { notification } from "ant-design-vue";
import { TenantsEntity } from "../entity/tenants.entity";
import { useI18n } from "vue-i18n";

const { schema, schemaKey } = useTenantSchema();
const { create, update, getAll } = tenantsStore();

const open = ref<boolean>(false);
const item = ref<TenantsEntity | null>(null);
const isEditMode = ref(false);
const loading = ref(false);

const form = ref();
const msgErrors = reactive<any>({});
const FormStateTenants: TenantsEntity = {
  id: "",
  name: "",
  schema_name: "",
  domain: "",
  // domain: {id: "", domain_url: "", is_primary: false}
};
const tenantsFormState = ref<TenantsEntity>({
  ...FormStateTenants,
});

const handleSubmit = async () => {
  try {
    await form.value.validate();

    loading.value = true;

    // await new Promise((resolve) => setTimeout(resolve, 3000));

    if (isEditMode.value) {
      await update(tenantsFormState.value, Number(tenantsFormState.value.id));
      // await updateDomain(tenantsFormState.value, Number(tenantsFormState.value.id))
      notification.success({
        message: t("messages.success"),
        description: t("messages.update"),
      });
      open.value = false;
      await getAll();
    } else {
      await create(tenantsFormState.value);
      notification.success({
        message: t("messages.success"),
        description: t("messages.description"),
      });
      open.value = false;
      await getAll();
    }

    resetForm();
  } catch (error: any) {
    open.value = true;
    if (error.response && error.response.data) {
      // Backend validation error response structure
      const apiErrors = error.response.data || {};
      Object.keys(apiErrors).forEach((field) => {
        msgErrors[field] = Array(apiErrors[field]) ? apiErrors[field][0] : "";
      });
    }
  } finally {
    loading.value = false;
    // open.value = false;
  }
};

const resetForm = () => {
  tenantsFormState.value = { ...FormStateTenants };
  isEditMode.value = false;
};

const editIcon = ref<string>("material-symbols-light:table-rows");
defineExpose({ open, item, isEditMode });

watch(item, (newItem: any) => {
  if (newItem) {
    tenantsFormState.value = {
      ...newItem,
      domain: newItem.domain.domain_url,
    };
    isEditMode.value = true;
    open.value = true;
  }
});
// Define computed properties for translated placeholders
const { t } = useI18n();
const placeholders = computed(() => ({
  name: t("placeholder.tenants.name"),
  schema_name: t("placeholder.tenants.schema_name"),
  domain_name: t("placeholder.tenants.domain"),
}));
</script>

<template>
  <a-modal v-model:open="open" title="">
    <div class="flex text-xl font-bold">
      <Icon :icon="editIcon" class="mr-2 mt-1 bg-gray-200 rounded-md" />
      <p>{{ isEditMode ? $t("tenants.form_edit") : $t("tenants.form_add") }}</p>
    </div>
    <a-form
      layout="vertical"
      ref="form"
      :rules="schema"
      :key="schemaKey"
      :model="tenantsFormState"
    >
      <a-form-item
        class="form-item-centered"
        :label="$t('tenants.table_field.name')"
        name="name"
      >
        <a-input
          :placeholder="placeholders.name"
          v-model:value="tenantsFormState.name"
          :class="{ 'ring-1 ring-red-500 mb-1': msgErrors.name && tenantsFormState.name.length >= 100}"
        />
        <span v-if=" msgErrors.name && tenantsFormState.name.length >= 100" class="text-red-500">{{
          $t("validation.tenants.length_name")
        }}</span>
      </a-form-item>
      <a-form-item
        class="form-item-centered"
        :label="$t('tenants.table_field.schema_name')"
        name="schema_name"
      >
        <a-input
          :placeholder="placeholders.schema_name"
          v-model:value="tenantsFormState.schema_name"
          :class="{ 'ring-1 ring-red-500 mb-1': msgErrors.schema_name }"
        />
        <span
          v-if="
            msgErrors.schema_name &&
            (tenantsFormState.schema_name?.length || 0) > 62
          "
          class="text-red-500"
          >{{ $t("validation.tenants.length") }}</span
        >
        <span v-else-if="msgErrors.schema_name" class="text-red-500">{{
          $t("validation.tenants.exists")
        }}</span>
      </a-form-item>
      <a-form-item
        class="form-item-centered"
        :label="$t('tenants.table_field.domain')"
        name="domain"
      >
        <a-input
          :placeholder="placeholders.domain_name"
          v-model:value="tenantsFormState.domain"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <button-default
        :disabled="loading || isEditMode"
        :isLoading="loading"
        bgColor="bg-black w-full flex justify-center font-bold"
        textColor="text-white"
        @click="handleSubmit"
      >
        <template #text>
          <span v-if="!loading">{{
            isEditMode ? $t("tenants.edit") : $t("tenants.add")
          }}</span>
        </template>
      </button-default>
    </template>
  </a-modal>
</template>

<style scoped></style>
