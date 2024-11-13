<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { permissionsStore } from "../store/permissions.store";
import { LineChartOutlined } from "@ant-design/icons-vue";
import { columns } from "./columns";
const { getAllPer, statePermission, setStateFilter } = permissionsStore();
const paginationConfig = ref({
  total: statePermission.data.total,
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

  await getAllPer();
}

onMounted(async () => {
  await getAllPer();
  paginationConfig.value.total = statePermission.data.total;
  console.log("data", statePermission.data.props);
});

const props = defineProps<{ searchQuery: string }>();
const filteredData = computed(() => {
  if (!props.searchQuery) return statePermission.data.props;

  const query = props.searchQuery.toLowerCase();

  return statePermission.data.props.filter((row) =>
    // Only filter based on specific fields, such as 'first_name' and 'last_name'
    String(row.name).toLowerCase().includes(query)
  );
});
</script>

<template>
  <a-flex justify="space-between" :align="'flex-start'">
    <p class="text-base font-bold text-blue-500">
      <line-chart-outlined />
      ລາຍການPermissions
    </p>
  </a-flex>
  <a-divider style="margin-top: 10px" />
  <a-table
    :scroll="{ x: true }"
    class="whitespace-nowrap"
    :columns="columns"
    :dataSource="filteredData"
    :pagination="paginationConfig"
    :loading="statePermission.isLoading"
    :row-key="(record: any) => record.id"
  >
  </a-table>
</template>

<style lang="scss"></style>
