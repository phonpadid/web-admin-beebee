<script setup lang="ts">
import { onMounted, ref } from "vue";
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
  notification.success({
    message: "Cancel Delete Success",
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

const testing = (id: number) => {
  alert("id:" + id);
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
    :dataSource="stateUser.data.props"
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
            <a-popover
              :open="popoverVisible[record.id]"
              placement="rightTop"
              trigger="click"
              @open="togglePopover(record.id, true)"
              @close="togglePopover(record.id, false)"
            >
              <template #content>
                <!-- <a @click="hidePopover(record.id)">Close</a> -->
                <!-- push({name: 'getOne', params: {id: record.id} }) -->
                <div class="w-[100px]">
                  <a-button
                    @click="getOne(record)"
                    class="flex items-center justify-start w-full gap-1 my-1 border-none shadow-md hover:shadow-lg"
                  >
                    <i class="pi pi-eye"></i>
                    <span>ເບິ່ງ</span>
                  </a-button>
                  <a-button
                    @click="testing(record.id)"
                    class="flex items-center justify-start w-full gap-1 my-1 border-none shadow-md hover:shadow-lg"
                  >
                    <i class="pi pi-pen-to-square"></i>
                    <span>ປ່ຽນລະຫັດຜ່ານ</span>
                  </a-button>

                  <a-popconfirm
                    title="ເຈົ້າເເນ່ໃຈທີ່ຈະລຶບຂໍ້ມູນນີ້ ຫຼື ບໍ?"
                    ok-text="ເເມ່ນ"
                    cancel-text="ບໍ່ເເມ່ນ"
                    @confirm="confirm(record.id)"
                    @cancel="cancel"
                    class="text-red-600"
                  >
                    <a-button
                      class="flex items-center text-rose-600 justify-start w-full gap-1 my-1 border-none shadow-md hover:shadow-lg"
                    >
                      <span>ລົບຂໍ້ມູນ</span>
                    </a-button>
                  </a-popconfirm>
                </div>
              </template>
              <ButtonCircle
                bgColor="bg-white "
                textColor="text-blue-700"
                @click="() => openModalEdit(record)"
              >
                <template #icon>
                  <Icon icon="mingcute-more-2-line" width="18" />
                </template>
              </ButtonCircle>
            </a-popover>
          </a-tooltip>
          <!-- <a-tooltip>
            <template #title>ແກ້ໄຂ້</template>
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
          </ButtonCircle> -->
        </div>
      </template>
    </template>
  </a-table>
</template>

<style lang="scss"></style>
