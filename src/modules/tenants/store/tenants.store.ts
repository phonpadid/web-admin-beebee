import { defineStore } from "pinia";
import { TenantsService } from "../service/tenants.service";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { reactive } from "vue";
import { TenantsEntity, TenantsFilterType } from "../entity/tenants.entity";
// import { NotificationInstance } from "ant-design-vue/es/notification";
// import { NotificationService } from "@/common/notification";

export const tenantsStore = defineStore("tenants-store", () => {
  // const notificationApi = inject<NotificationInstance>("notificationApi");
  const service = container.resolve<TenantsService>(TenantsService);
  // const notificationService = new NotificationService(i18n, notificationApi);
  // const notificationService = new NotificationService(notificationApi);

  const state = reactive<IGState<IGPaginated<TenantsEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<
    IGPaginate<Pick<TenantsEntity, TenantsFilterType>>
  >({
    // page: 1,
    limit: 10,
    filter: {
      name: ''
    },
  });

  async function getAll() {
    state.isLoading = true;
    const results = await service.getAll({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results.status === "success") {
      state.data.props = results.data.props;
      state.data.total = results.data.total;
      state.isLoading = false;
    }
    // console.log("Data from API:", state.data.props);
  }
  // async function getAll() {
  //   state.isLoading = true;
  //   const results = await service.getAll({
  //     page: setStateFilter.page,
  //     limit: setStateFilter.limit,
  //     filter: setStateFilter.filter,
  //   });

  //   if (results && results.data && results.status === "success") {
  //     state.data.props = results.data.props.map((item) => ({
  //       ...item,
  //       name: item.tenant.name, // ดึงข้อมูลจาก tenant
  //       schema_name: item.tenant.schema_name, // ดึงข้อมูลจาก tenant
  //       created_on: item.tenant.created_on, // ดึงข้อมูลจาก tenant
  //     }));
  //     state.data.total = results.data.total;
  //     state.isLoading = false;
  //   }
  // console.log("Data from API:", state.data.props);
  // }

  async function create(input: TenantsEntity) {
    return await service.create(input);
  }
  async function update(input: TenantsEntity, id: number) {
    return await service.update(input, id);
  }
  async function updateDomain(input: TenantsEntity, id: number) {
    return await service.updateDomain(input, id);
  }
  async function remove(id: number) {
    state.isLoading = true;
    const results = await service.remove(id);

    if (results && results.data && results.status === "success") {
      state.isLoading = false;
      
    }
    // console.log("Data from API:", state.data.props);
  }
  return {
    getAll,
    create,
    update,
    updateDomain,
    state,
    setStateFilter,
    remove
  };
});
