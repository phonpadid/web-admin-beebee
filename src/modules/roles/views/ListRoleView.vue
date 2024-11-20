<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { rolesStore } from "../store/role.store";
import { useRouter } from "vue-router";
import { notification } from "ant-design-vue";
import ButtonCircle from "@/components/Button/ButtonCircle.vue";
import { Icon } from "@iconify/vue";
import { RolesEntity } from "../entity/role.entity";
import { columns } from "./columns";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const getColumns = computed(() => columns(t));

// Receive searchQuery as a prop
const props = defineProps<{ searchQuery: string }>();

// Roles store and router
const { getAll, setStateFilter, state, remove } = rolesStore();
const { push } = useRouter();

const getEdit = (role: RolesEntity) => {
  push({ name: "editRoles.index", params: { id: role.id } });
};

const confirm = async (id: string) => {
  await remove(Number(id));
  notification.success({
    message: t("popconfirm.message_success.title"),
    description: t("popconfirm.message_success.messages"),
  });
  await getAll();
};

const cancel = () => {
  notification.error({
    message: t("popconfirm.message_cancel.title"),
    description: t("popconfirm.message_cancel.messages"),
  });
};

// Pagination configuration for the table
const paginationLocale = computed(() => ({
  items_per_page: t("pagination.items_per_page"),
}));
const paginationConfig = ref({
  total: 0,
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
});

// Computed property to filter data based on the global search query
const filteredData = computed(() => {
  if (!props.searchQuery) return state.data.props;
  return state.data.props.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(props.searchQuery.toLowerCase())
    )
  );
});
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined /> 
      {{ $t('messages.role.item')  }}
    </p>
    <a-button type="primary" @click="push({ name: 'addRole.index' })">
      {{ $t('messages.role.add_role') }}
    </a-button>
  </a-flex>
  <a-divider style="margin-top: 10px" />

  <!-- Data table with filteredData as the data source -->
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
          <template #title>{{ $t('messages.role.edit') }}</template>
          <ButtonCircle bgColor="bg-white" textColor="text-blue-700" @click="getEdit(record)">
            <template #icon>
              <Icon icon="solar-pen-bold" width="18" />
            </template>
          </ButtonCircle>
        </a-tooltip>
        <a-tooltip>
          <template #title>{{ $t('messages.role.delete') }}</template>
          <ButtonCircle bgColor="bg-white hover:text-red-600" textColor="text-red-600">
            <template #icon>
              <a-popconfirm
                :title="$t('popconfirm.delete.messages')"
                :ok-text="$t('popconfirm.delete.okay')"
                :cancel-text="$t('popconfirm.delete.cancel')"
                @confirm="confirm(record.id)"
                @cancel="cancel"
                class="text-red-600"
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
</template>

<style lang="scss">
/* Add any additional styles here */
</style>
