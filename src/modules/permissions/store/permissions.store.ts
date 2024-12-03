import { defineStore } from "pinia";
import { PermissionsService } from "../services/permissions.service";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { reactive } from "vue";
import {
  PermissionsEntity,
  PermissionsFilterType,
} from "../entity/permissions.entity";
// import { NotificationInstance } from "ant-design-vue/es/notification";
// import { NotificationService } from "@/common/notification";

export const permissionsStore = defineStore("permissions-store", () => {
  // const notificationApi = inject<NotificationInstance>("notificationApi");
  const service = container.resolve<PermissionsService>(PermissionsService);
  // const notificationService = new NotificationService(i18n, notificationApi);
  // const notificationService = new NotificationService(notificationApi);

  const statePermission = reactive<IGState<IGPaginated<PermissionsEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });
  const setStateFilter = reactive<
    IGPaginate<Pick<PermissionsEntity, PermissionsFilterType>>
  >({
    // page: 1,
    limit: 10,
    filter: {name: ''},
  });
  const setStateFilterPer = reactive<
    IGPaginate<Pick<PermissionsEntity, PermissionsFilterType>>
  >({
    page: 1,
    limit: 10000,
    filter: {name: ''},
  });

  async function getAllPermission() {
    statePermission.isLoading = true;
    const results = await service.getAll({
      page: setStateFilter.page,
      limit: setStateFilter.limit,
      filter: setStateFilter.filter,
    });

    if (results && results.data && results.status === "success") {
      statePermission.data.props = results.data.props;
      statePermission.data.total = results.data.total;
      statePermission.isLoading = false;
    }
  }
  async function getAllPer() {
    statePermission.isLoading = true;
    
    const results = await service.getAll({
      page: setStateFilterPer.page,
      limit: setStateFilterPer.limit,
      filter: setStateFilterPer.filter,
    });
    

    if (results && results.data && results.status === "success") {
      const perid = [12, 11, 8];
      const data = results.data.props.filter(per => perid.includes(Number(per.content_type)));
    
      statePermission.data.props = data;
      statePermission.data.total = data.length;
      statePermission.isLoading = false;
    }
    // console.log("Data from API:", statePermission.data.props);
  }

  async function create(input: PermissionsEntity) {
    return await service.create(input);
  }
  async function update(input: PermissionsEntity) {
    return await service.update(input);
  }

  return {
    getAllPermission,
    create,
    update,
    getAllPer,
    statePermission,
    setStateFilter,
  };
});
