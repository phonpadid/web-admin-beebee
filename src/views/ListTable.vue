<template>
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
    </a-table>

    <modal-component 
        ref="modalVisible" 
        :data="getData"
        @on-success="onSuccess" 
    />

</template>

<script lang="ts" setup>
    import type { TableColumnsType } from 'ant-design-vue';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import ModalComponent from '../components/Modal.Component.vue';

    const modalVisible = ref();
    const getData = ref();

    const showModal = (record: any) => {
        getData.value = record;
        modalVisible.value.open = true;
    }

    const onSuccess = () => {
        console.log('success');
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
            const response = await axios.get('http://188.166.183.153:8000/api/customer/realestate/list', {
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