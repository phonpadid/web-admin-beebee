<script setup lang="ts">
import { onMounted, ref } from "vue";
import { tenantsStore } from "../store/tenants.store";
import { LineChartOutlined } from "@ant-design/icons-vue";
import ModalTenantsView from "../components/FormTenantsView.vue";
import { columns } from "./columns";
import ButtonCircle from "@/components/Button/ButtonCircle.vue";
import { Icon } from "@iconify/vue";
import { TenantsEntity } from "../entity/tenants.entity";
import { notification } from "ant-design-vue";

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
    message: "Delete Success",
    description: "ລົບຂໍ້ມູນສຳເລັດ",
  });
};

const cancel = () => {
  notification.success({
    message: "Cancel Delete Success",
    description: "ຍົກເລີກການລຶບ",
  });
};

const paginationConfig = ref({
  total: state.data.total,
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

  await getAll();
}

onMounted(async () => {
  await getAll();
  paginationConfig.value.total = state.data.total;
  console.log("data", state.data.props);
});
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      ລາຍການການສ້າງຮ້ານ
    </p>
    <a-button type="primary" @click="openModalAdd">ເພີມຂໍ້ມູນ</a-button>
  </a-flex>
  <a-divider style="margin-top: 10px" />
  <a-table
    :scroll="{ x: true }"
    class="whitespace-nowrap"
    :columns="columns"
    :dataSource="state.data.props"
    :pagination="paginationConfig"
    :loading="state.isLoading"
    :row-key="(record: any) => record.id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'actions'">
        <div class="flex items-center justify-center gap-2">
          <a-tooltip>
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
          </ButtonCircle>
        </div>
      </template>
    </template>
  </a-table>
  <ModalTenantsView ref="modalAdd" />
  <ModalTenantsView ref="modalEdit" />
</template>

<style lang="scss"></style>
