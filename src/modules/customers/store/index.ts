import { defineStore } from "pinia";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { reactive } from "vue";
import { CustomerEntity, CustomerFilterType } from "../entity/customer.entity";
import { CustomerService } from "../services/user.service";
// import { NotificationInstance } from "ant-design-vue/es/notification";
// import { NotificationService } from "@/common/notification";

export interface StateGetOne {
  data: CustomerEntity | null;
  isLoading: boolean;
  errorMessage: string;
}
export const customerStore = defineStore("customer-store", () => {
  // const notificationApi = inject<NotificationInstance>("notificationApi");
  const service = container.resolve<CustomerService>(CustomerService);
  // const notificationService = new NotificationService(i18n, notificationApi);
  // const notificationService = new NotificationService(notificationApi);

  const stateCustomer = reactive<IGState<IGPaginated<CustomerEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<IGPaginate<Pick<CustomerEntity, CustomerFilterType>>>(
    {
      // page: 1,
      limit: 10,
      filter: {},
    }
  );

  async function getAllCustomer() {
    stateCustomer.isLoading = true;
    const results = await service.getAll({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results.status === "success") {
      stateCustomer.data.props = results.data.props;
      stateCustomer.data.total = results.data.total;
      stateCustomer.isLoading = false;
    }
    // console.log("Data from API:", state.data.props);
  }

  
  const stateGetOne = reactive<StateGetOne>({
    data: null,
    isLoading: false,
    errorMessage: "",
  });
  async function getOneCustomer(id: number) {
    stateGetOne.isLoading = true;
    const results = await service.getOne(id);

    if (results && results.data && results.status === "success") {
      stateGetOne.data = results.data;
      stateGetOne.isLoading = false;
      
    }
    // console.log("Data from API:", state.data.props);
  }
  async function remove(id: number) {
    stateGetOne.isLoading = true;
    const results = await service.remove(id);

    if (results && results.data && results.status === "success") {
      stateGetOne.data = results.data;
      stateGetOne.isLoading = false;
      
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

  async function create(input: CustomerEntity) {
    return await service.create(input);
  }
  async function update(input: CustomerEntity, id: string) {
    return await service.update(input, id);
  }

  return {
    getAllCustomer,
    create,
    update,
    getOneCustomer,
    stateGetOne,
    stateCustomer,
    setStateFilter,
    remove
  };
});
