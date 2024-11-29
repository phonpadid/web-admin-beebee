<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { tenantsStore } from "../store/tenants.store";
import { LineChartOutlined } from "@ant-design/icons-vue";
import ModalTenantsView from "../components/FormTenantsView.vue";
import { columns } from "./columns";
import ButtonCircle from "@/components/Button/ButtonCircle.vue";
import { Icon } from "@iconify/vue";
import { TenantsEntity } from "../entity/tenants.entity";
import { notification } from "ant-design-vue";
import { useI18n } from "vue-i18n";

const modalAdd = ref();
const modalEdit = ref();

const { getAll, state, setStateFilter } = tenantsStore();

const openModalAdd = () => {
  if (modalAdd.value) {
    modalAdd.value.open = true;
    modalAdd.value.isEditMode = false;
    modalAdd.value.item = null;
  }
};
const openModalEdit = (record: TenantsEntity) => {
  const foundRecord = state.data.props.find((data) => data.id === record.id);
  if (foundRecord && modalEdit.value) {
    modalEdit.value.item = foundRecord;
    modalEdit.value.isEditMode = true;
    modalEdit.value.open = true;
  }
};

const confirm = (id: string) => {
  state.data.props = state.data.props.filter(
    (permissions) => permissions.id !== id
  );
  notification.success({
    message: t("popconfirm.message_success.title"),
    description: t("popconfirm.message_success.messages"),
  });
};

const cancel = () => {
  notification.error({
    message: t("popconfirm.message_cancel.title"),
    description: t("popconfirm.message_cancel.messages"),
  });
};

const paginationLocale = computed(() => ({
  items_per_page: t("pagination.items_per_page"),
}));
const paginationConfig = ref({
  total: state.data.total,
  pageSize: setStateFilter.limit,
  current: setStateFilter.page,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "50", "100"],
  locale: paginationLocale,
  onChange: handlePageChange,
});

async function handlePageChange(page: number, pageSize: number) {
  paginationConfig.value.current = page;
  paginationConfig.value.pageSize = pageSize;

  setStateFilter.page = page;
  setStateFilter.limit = pageSize;

  await getAll();
}

onMounted(async () => {
  await getAll();
  paginationConfig.value.total = state.data.total;
  console.log("data", state.data.props);
});
const props = defineProps<{ searchQuery: string }>();
const filteredData = computed(() => {
  if (!props.searchQuery) return state.data.props;

  const query = props.searchQuery.toLowerCase();

  return state.data.props.filter(
    (row) =>
      // Only filter based on specific fields, such as 'first_name' and 'last_name'
      String(row.name).toLowerCase().includes(query) ||
      String(row.domain).toLowerCase().includes(query)
  );
});
const { t } = useI18n();
const getColumns = computed(() => columns(t));
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      {{ $t("tenants.label_list") }}
    </p>
    <a-button type="primary" @click="openModalAdd">{{
      $t("tenants.add")
    }}</a-button>
  </a-flex>
  <a-divider style="margin-top: 10px" />
  <a-table
    :scroll="{ x: true }"
    class="whitespace-nowrap"
    :columns="getColumns"
    :dataSource="filteredData"
    :pagination="paginationConfig"
    :loading="state.isLoading"
    :row-key="(record: any) => record.id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'actions'">
        <div class="flex items-center justify-center gap-2">
          <a-tooltip>
            <template #title>{{ $t("tenants.edit") }}</template>
            <ButtonCircle
              bgColor="bg-white "
              textColor="text-blue-700"
              @click="() => openModalEdit(record)"
            >
              <template #icon>
                <Icon icon="solar-pen-bold" width="18" />
              </template>
            </ButtonCircle>
          </a-tooltip>
          <a-tooltip>
            <template #title>{{ $t("tenants.delete") }}</template>
            <ButtonCircle
              bgColor="bg-white hover:text-red-600"
              textColor="text-red-600"
            >
              <template #icon>
                <a-popconfirm
                  :title="$t('popconfirm.delete.messages')"
                  :ok-text="$t('popconfirm.delete.okay')"
                  :cancel-text="$t('popconfirm.delete.cancel')"
                  @confirm="confirm(record.id)"
                  @cancel="cancel"
                  class="text-red-600"
                  :disabled="record.schema_name === 'public'"
                >
                  <Icon icon="solar-trash-bin-2-bold" width="18" />
                </a-popconfirm>
              </template>
            </ButtonCircle>
          </a-tooltip>
        </div>
      </template>
    </template>
  </a-table>
  <ModalTenantsView ref="modalAdd" />
  <ModalTenantsView ref="modalEdit" />
</template>

<style lang="scss"></style>
