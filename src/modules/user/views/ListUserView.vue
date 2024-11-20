<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { usersStore } from "../store/index";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { columns } from "./columns";
import ButtonCircle from "@/components/Button/ButtonCircle.vue";
import { Icon } from "@iconify/vue";
import { UserEntity } from "../entity/user.entity";
import { notification } from "ant-design-vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
const { push } = useRouter();
import { useI18n } from "vue-i18n";
const { getAllUser, stateUser, setStateFilter, remove } = usersStore();

const props = defineProps<{ searchQuery: string }>();
const filteredData = computed(() => {
  if (!props.searchQuery) return stateUser.data.props;

  const query = props.searchQuery.toLowerCase();

  return stateUser.data.props.filter(
    (row) =>
      // Only filter based on specific fields, such as 'first_name' and 'last_name'
      String(row.first_name).toLowerCase().includes(query) ||
      String(row.last_name).toLowerCase().includes(query)
  );
});

const confirm = async (id: string) => {
  await remove(Number(id));
  notification.success({
    message: t("popconfirm.message_success.title"),
    description: t("popconfirm.message_success.messages"),
  });
  togglePopover(Number(id), false);
  await getAllUser();
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
  total: stateUser.data.total,
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

  await getAllUser();
}

const getOne = (record: UserEntity) => {
  push({ name: "editProfile", params: { id: record.id } });
};
onMounted(async () => {
  await getAllUser();
  paginationConfig.value.total = stateUser.data.total;
  // console.log("data", stateUser.data.props);
});

const popoverVisible = ref<Record<number, boolean>>({});

const togglePopover = (id: number, isVisible: boolean) => {
  popoverVisible.value[id] = isVisible;
};
const { t } = useI18n();
const getColumns = computed(() => columns(t));
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      {{ $t("users.label_list") }}
    </p>
    <a-button type="primary" @click="push({ name: 'addUser.index' })">{{
      $t("users.add")
    }}</a-button>
  </a-flex>
  <a-divider style="margin-top: 10px" />
  <a-table
    :scroll="{ x: true }"
    class="whitespace-nowrap"
    :columns="getColumns"
    :dataSource="filteredData"
    :pagination="paginationConfig"
    :loading="stateUser.isLoading"
    :row-key="(record: any) => record.id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'avatar'">
        <a-image
          v-if="record.avatar"
          :src="record?.avatar"
          alt="Profile Avatar"
          width="3rem"
          height="3rem"
          class="rounded-full"
        >
          <template #previewMask>
            <span class="text-[10px]">{{ $t("preview") }}</span>
          </template>
        </a-image>
        <img
          v-else
          src="/src/assets/profile.jpg"
          alt="Profile Avatar"
          width="55rem"
          height="55rem"
          class="rounded-full -ml-1"
        />
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
            <template #title> {{ $t("users.edit") }} </template>
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
            <template #title>{{ $t("users.delete") }}</template>
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
