<template>
    <a-flex justify="space-between" :align="'flex-start'">
        <p style="font-size: 16px; font-weight: bold; color: #1890ff;">
            <line-chart-outlined />
            ລາຍການສັ່ງຊື້
        </p>
        <a-button type="primary" @click="createNew">{{ $t('messages.btn_create') }}</a-button>
    </a-flex>
    <a-divider style="margin-top: 10px;"/>
    <a-table 
        :columns="columns" 
        :data-source="state.data.props" 
        :scroll="{ y: 500 }"
        :pagination="paginationConfig"
        :loading="state.isLoading"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'operation'">
          <a @click="editItem(record)">ເເກ້ໄຂ</a>
          <span class="ant-divider-vertical"></span>
          <a-popconfirm
            title="ເຈົ້າເເນ່ໃຈທີ່ຈະລຶບຂໍ້ມູນນີ້ ຫຼື ບໍ?"
            ok-text="ເເມ່ນ"
            cancel-text="ບໍ່ເເມ່ນ"
            @confirm="confirm(record.id)"
            @cancel="cancel"
        >
            <a>ລຶບອອກ</a>
        </a-popconfirm>
        </template>
      </template>
    </a-table>

    <add-component 
        ref="modalAdd" 
        @on-success="onSuccess" 
    />

    <edit-component 
        ref="modalEdit" 
        :data="item"
        @on-success="onSuccess" 
    />
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { restaurantStore } from '../store'; 
    import { TableColumnsType } from 'ant-design-vue';
    import { LineChartOutlined } from '@ant-design/icons-vue';
    import AddComponent from '../components/Add.vue';
    import EditComponent from '../components/Edit.vue';
    import { message } from 'ant-design-vue';

    const { getAll, state, setStateFilter, create } = restaurantStore(); 

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
        pageSize: setStateFilter.limit, // Number of items per page
        current: setStateFilter.page, // Current page number
        showSizeChanger: true, // Whether to display page size changer
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: handlePageChange
    });

    async function handlePageChange(page: any, pageSize: any) {
        paginationConfig.value.current = page;
        paginationConfig.value.pageSize = pageSize;

        setStateFilter.page = page;
        setStateFilter.limit = pageSize;
        
        await getAll();
    }

    const modalAdd = ref();
    const modalEdit = ref();
    const item = ref();

    const editItem = (record: any) => {
        item.value = record;
        modalEdit.value.open = true;
    }

    const createNew = async () => {
        await create();
        // modalAdd.value.open = true;
    }

    const confirm = (id: number) => {
        console.log(id);
        message.success('ລຶບສຳເລັດເເລ້ວ...');
    }

    const cancel = () => {
        message.error('ຍົກເລີກການລຶບ...');
    }

    const onSuccess = () => {
        console.log('success...');
    }

    onMounted(async () => {
        await getAll();
        paginationConfig.value.total = state.data.total;
    })
</script>

<style lang="scss">
   
</style>