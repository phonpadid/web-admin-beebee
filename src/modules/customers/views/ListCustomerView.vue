<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { customerStore } from "../store/index";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { columns } from "./columns";
import ButtonCircle from "@/components/Button/ButtonCircle.vue";
import { Icon } from "@iconify/vue";
import { CustomerEntity } from "../entity/customer.entity";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
const { push } = useRouter();
import { usersStore } from "@/modules/user/store";
import { useI18n } from "vue-i18n";
const { getAllCustomer, stateCustomer, setStateFilter } = customerStore();
const { remove } = usersStore();
const { t } = useI18n();
const getColumns = computed(() => columns(t));
// const getColumns = computed(() => columns(t));
//testor
const confirm = async (record: CustomerEntity) => {
  // console.log('deleteId:', record.customer_id);

  await remove(Number(record.id));
  notification.success({
    message: t("popconfirm.message_success.title"),
    description: t("popconfirm.message_success.messages"),
  });
  togglePopover(Number(record.customer_id), false);
  await getAllCustomer();
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
  total: stateCustomer.data.total,
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

  await getAllCustomer();
}
const getOne = (record: CustomerEntity) => {
  push({ name: "customer_edit", params: { id: record.customer_id } });
};
onMounted(async () => {
  await getAllCustomer();
  paginationConfig.value.total = stateCustomer.data.total;
  // console.log("data", stateCustomer.data.props);
});

const popoverVisible = ref<Record<number, boolean>>({});

const togglePopover = (id: number, isVisible: boolean) => {
  popoverVisible.value[id] = isVisible;
};
const props = defineProps<{ searchQuery: string }>();
const filteredData = computed(() => {
  if (!props.searchQuery) return stateCustomer.data.props;

  const query = props.searchQuery.toLowerCase();

  return stateCustomer.data.props.filter(
    (row) =>
      // Only filter based on specific fields, such as 'first_name' and 'last_name'
      String(row.first_name).toLowerCase().includes(query) ||
      String(row.last_name).toLowerCase().includes(query)
  );
});

const getInitials = (record: CustomerEntity): string => {
  if (!record) return "";
  const firstName = record.first_name?.charAt(0) || "";
  return `${firstName}`.toUpperCase();
};
//set color to customer type
type CustomerType = "vip" | "general";

const customerTypeColors: { [key in CustomerType]: string } = {
  vip: "text-red-500 bg-red-100",
  general: "text-blue-500 bg-blue-100",
};
function getCustomerTypeColor(type: string): string {
  return customerTypeColors[type as CustomerType] || "text-gray-500 bg-gray-100";
}
const toAddCustomer = () => {
  push({ name: 'addCustomer' })
}
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      {{ $t("customers.label_list") }}
    </p>
    <a-button type="primary" @click="toAddCustomer">
      {{ $t("customers.add") }}
    </a-button>
  </a-flex>
  <a-divider style="margin-top: 10px" />
  <a-table
    :scroll="{ x: true }"
    class="whitespace-nowrap"
    :columns="getColumns"
    :dataSource="filteredData"
    :pagination="paginationConfig"
    :loading="stateCustomer.isLoading"
    :row-key="(record: any) => record.id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'full_avatar_url'">
        <template v-if="record?.full_avatar_url">
          <a-image
            :src="record.full_avatar_url"
            alt="Profile Avatar"
            width="3rem"
            height="3rem"
            class="rounded-full"
          >
            <template #previewMask>
              <span class="text-[10px]">{{ $t('preview') }}</span>
            </template>
          </a-image>
        </template>
        <template v-else>
          <div
            class="w-[3rem] h-[3rem] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold"
          >
            {{ getInitials(record) }}
          </div>
        </template>
      </template>
      <template v-if="column.dataIndex === 'type'">
        <span
          :class="`px-2 py-1 rounded ${getCustomerTypeColor(record.type)}`"
        >
          {{ $t(`customers.table_field.choose_customer.${record.type}`) || record.type }}
        </span>
      </template>
      <template v-if="column.dataIndex === 'created_at'">
        <span>{{
          dayjs(record.created_at).format("MM-DD-YYYY HH:mm:ss")
        }}</span>
      </template>
      <template v-if="column.dataIndex === 'updated_at'">
        <span>{{
          dayjs(record.updated_at).format("MM-DD-YYYY HH:mm:ss")
        }}</span>
      </template>
      <template v-if="column.dataIndex === 'actions'">
        <div class="flex items-center justify-center gap-2">
          <a-tooltip>
            <template #title>{{ $t("customers.edit") }}</template>
            <ButtonCircle
              bgColor="bg-white "
              textColor="text-blue-700"
              @click="getOne(record)"
            >
              <template #icon>
                <Icon icon="solar-pen-bold" width="18" />
              </template>
            </ButtonCircle>
          </a-tooltip>
          <a-tooltip>
            <template #title>{{ $t("customers.delete") }}</template>
            <ButtonCircle
              bgColor="bg-white hover:text-red-600"
              textColor="text-red-600"
            >
              <template #icon>
                <a-popconfirm
                  :title="$t('popconfirm.delete.messages')"
                  :ok-text="$t('popconfirm.delete.okay')"
                  :cancel-text="$t('popconfirm.delete.cancel')"
                  @confirm="confirm(record)"
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

<style lang="scss"></style>
