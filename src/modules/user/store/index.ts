import { defineStore } from "pinia";
import { UserService } from "../services/user.service";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { reactive } from "vue";
import { UserEntity, UserFilterType } from "../entity/user.entity";
// import { NotificationInstance } from "ant-design-vue/es/notification";
// import { NotificationService } from "@/common/notification";

export const usersStore = defineStore("user-store", () => {
  // const notificationApi = inject<NotificationInstance>("notificationApi");
  const service = container.resolve<UserService>(UserService);
  // const notificationService = new NotificationService(i18n, notificationApi);
  // const notificationService = new NotificationService(notificationApi);

  const state = reactive<IGState<IGPaginated<UserEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<IGPaginate<Pick<UserEntity, UserFilterType>>>(
    {
      // page: 1,
      limit: 10,
      filter: {},
    }
  );

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

  async function create(input: UserEntity) {
    return await service.create(input);
  }
  async function update(input: UserEntity) {
    return await service.update(input);
  }

  return {
    getAll,
    create,
    update,
    state,
    setStateFilter,
  };
});
