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
import defaultAvatar from "@/assets/profile.jpg";
import { usersStore } from "@/modules/user/store";
const { getAllCustomer, stateCustomer, setStateFilter } = customerStore();
const { remove } = usersStore();
//testor
const confirm = async (record: CustomerEntity) => {
  console.log('deleteId:', record.customer_id);
  
  await remove(Number(record.id))
  notification.success({
    message: "Delete Success",
    description: "ລົບຂໍ້ມູນສຳເລັດ",
  });
  togglePopover(Number(record.customer_id), false);
  await getAllCustomer();
};

const cancel = () => {
  notification.error({
    message: "Cancel",
    description: "ຍົກເລີກການລຶບ",
  });
};

const paginationConfig = ref({
  total: stateCustomer.data.total,
  pageSize: setStateFilter.limit,
  current: setStateFilter.page,
  showSizeChanger: true,
  pageSizeOptions: ["10", "20", "50", "100"],
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
  push({ name: "customer_edit.index", params: { id: record.customer_id } });
};
onMounted(async () => {
  await getAllCustomer();
  paginationConfig.value.total = stateCustomer.data.total;
  console.log("data", stateCustomer.data.props);
});

const popoverVisible = ref<Record<number, boolean>>({});

const togglePopover = (id: number, isVisible: boolean) => {
  popoverVisible.value[id] = isVisible;
};
const props = defineProps<{ searchQuery: string }>();
const filteredData = computed(() => {
  if (!props.searchQuery) return stateCustomer.data.props;

  const query = props.searchQuery.toLowerCase();

  return stateCustomer.data.props.filter((row) =>
    // Only filter based on specific fields, such as 'first_name' and 'last_name'
    String(row.first_name).toLowerCase().includes(query) || 
    String(row.last_name).toLowerCase().includes(query)
  );
});
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      ລາຍການຂໍ້ມູນລູກຄ້າ
    </p>
    <a-button type="primary" @click="push({ name: 'addCustomer.index' })"
      >ເພີ່ມຂໍ້ມູນ</a-button
    >
  </a-flex>
  <a-divider style="margin-top: 10px" />
  <a-table
    :scroll="{ x: true }"
    class="whitespace-nowrap"
    :columns="columns"
    :dataSource="filteredData"
    :pagination="paginationConfig"
    :loading="stateCustomer.isLoading"
    :row-key="(record) => record.id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'full_avatar_url'">
        <img
        :src="record?.full_avatar_url || defaultAvatar"
        alt="Profile Avatar"
        class="w-10 h-10 rounded-full"
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
            <template #title>ແກ້ໄຂ້</template>
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
            <template #title>ລົບ</template>
            <ButtonCircle
            bgColor="bg-white hover:text-red-600"
            textColor="text-red-600"
          >
            <template #icon>
              <a-popconfirm
                title="ເຈົ້າເເນ່ໃຈທີ່ຈະລຶບຂໍ້ມູນນີ້ ຫຼື ບໍ?"
                ok-text="ເເມ່ນ"
                cancel-text="ບໍ່ເເມ່ນ"
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
