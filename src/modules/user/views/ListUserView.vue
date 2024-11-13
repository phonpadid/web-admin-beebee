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
const modalEdit = ref();
import defaultAvatar from "@/assets/profile.jpg";
const { getAllUser, stateUser, setStateFilter, remove } = usersStore();

const props = defineProps<{ searchQuery: string }>();
const filteredData = computed(() => {
  if (!props.searchQuery) return stateUser.data.props;

  const query = props.searchQuery.toLowerCase();

  return stateUser.data.props.filter((row) =>
    // Only filter based on specific fields, such as 'first_name' and 'last_name'
    String(row.first_name).toLowerCase().includes(query) ||
    String(row.last_name).toLowerCase().includes(query)
  );
});
const openModalEdit = (record: UserEntity) => {
  const foundRecord = stateUser.data.props.find(
    (data) => data.id === record.id
  );
  if (foundRecord && modalEdit.value) {
    modalEdit.value.item = foundRecord;
    modalEdit.value.isEditMode = true;
    modalEdit.value.open = true;
  }
};

const confirm = async (id: string) => {
  await remove(Number(id))
  notification.success({
    message: "Delete Success",
    description: "ລົບຂໍ້ມູນສຳເລັດ",
  });
  togglePopover(Number(id), false);
  await getAllUser();
};

const cancel = () => {
  notification.error({
    message: "Cancel Delete",
    description: "ຍົກເລີກການລຶບ",
  });
};

const paginationConfig = ref({
  total: stateUser.data.total,
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

  await getAllUser();
}

const getOne = (record: UserEntity) => {
  push({ name: "editProfile", params: { id: record.id } });
};
onMounted(async () => {
  await getAllUser();
  paginationConfig.value.total = stateUser.data.total;
  console.log("data", stateUser.data.props);
});

const popoverVisible = ref<Record<number, boolean>>({});

const togglePopover = (id: number, isVisible: boolean) => {
  popoverVisible.value[id] = isVisible;
};
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      ລາຍການຜູ້ໃຊ້ລະບົບ
    </p>
    <a-button type="primary" @click="push({ name: 'addUser.index' })"
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
    :loading="stateUser.isLoading"
    :row-key="(record: any) => record.id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'avatar'">
        <img
        :src="record?.avatar || defaultAvatar"
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
