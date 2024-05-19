<template>
    <a-flex justify="space-between" :align="'flex-start'">
        <p style="font-size: 16px; font-weight: bold; color: #1890ff;">
            <line-chart-outlined />
            ລາຍການສັ່ງຊື້
        </p>
        <a-button type="primary" @click="createOrder">ເພີ່ມລາຍການ</a-button>
    </a-flex>
    <a-divider style="margin-top: 10px;"/>
    <a-table 
        :columns="columns" 
        :data-source="myData" 
        :scroll="{ y: 500 }"
        :pagination="paginationConfig"
        :loading="loading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a @click="showModal(record)">ເເກ້ໄຂ</a>
        </template>
      </template>
      <!-- <template v-slot:emptyText>
        <div class="ant-empty-icon">
            <inbox-outlined class="empty-icon" />
        </div>
        <span>No data</span>
    </template> -->
    </a-table>

</template>

<script lang="ts" setup>
    import type { TableColumnsType } from 'ant-design-vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { LineChartOutlined } from '@ant-design/icons-vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    const modalVisible = ref();
    const getData = ref();

    const showModal = (record: any) => {
        getData.value = record;
        modalVisible.value.open = true;
    }

    const createOrder = () => {
        router.push({ name: 'create.order' });
    }

    const columns: TableColumnsType = [
        { title: 'ຊື່ເຈົ້າຂອງ', width: 20, dataIndex: 'name', key: 'name' },
        { title: 'ຊື່ຜູ້ຂາຍ', width: 20, dataIndex: 'agent_name', key: 'agent' },
        { title: 'ເລກບີນ', dataIndex: 'real_esate_number', key: 'real_number', width: 20 },
        {
            title: 'ຈັດການ',
            key: 'operation',
            width: 20,
        },
    ];

    const paginationConfig = ref({
        total: 0, // Total number of items
        pageSize: 2, // Number of items per page
        current: 1, // Current page number
        showSizeChanger: true, // Whether to display page size changer
        pageSizeOptions: ['2', '10', '20', '50', '100'],
        onChange: handlePageChange,
        onShowSizeChange: handlePageSizeChange
    });

    async function handlePageChange(page: any, pageSize: any) {
        console.log('Page changed to:', page);
        console.log('Items per page:', pageSize);

        paginationConfig.value.current = page;
        paginationConfig.value.pageSize = pageSize;

        await fetchData();
    }

    async function handlePageSizeChange(current: any, size: any) {
        paginationConfig.value.pageSize = size;
        console.log('Items Size to:', size);
        console.log('Items Current to:', current);
    }
    
    interface DataItem {
        key: number;
        name: string;
        age: number;
        address: string;
    }
    
    const data: DataItem[] = [];
    for (let i = 0; i < 100; i++) {
        data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
        });
    }

    const myData = ref([])
    const loading = ref(true);

    const fetchData = async () => {
        loading.value = true;
        try {
            const response = await axios.get('https://api.hellonewyears.com/api/customer/realestate/list', {
                params: {
                    page: paginationConfig.value.current, 
                    per_page: paginationConfig.value.pageSize,
                    lang: 'en',
                }
            });
            
            myData.value = response.data.data.data;
            paginationConfig.value.total = response.data.data.pagination.total;
            loading.value = false;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    onMounted(async() => {
        await fetchData();
    })
</script>  

<style lang="scss">

</style>