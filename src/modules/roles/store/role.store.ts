import { defineStore } from "pinia";
import { RolesService } from "../services/role.service";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { reactive } from "vue";
import { RolesEntity, RolesFilterType } from "../entity/role.entity";
// import { NotificationInstance } from "ant-design-vue/es/notification";
// import { NotificationService } from "@/common/notification";
// import { NOTIFICATION_PLACEMENT } from "@/common/utils/const";
// import { useI18n } from "vue-i18n";
// import { useRouter } from "vue-router";

export const rolesStore = defineStore("roles-store", () => {
  // const notificationApi = inject<NotificationInstance>("notificationApi");
  const service = container.resolve<RolesService>(RolesService);
  // const notificationService = new NotificationService(i18n, notificationApi);
  // const notificationService = new NotificationService(notificationApi);

  const state = reactive<IGState<IGPaginated<RolesEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<
    IGPaginate<Pick<RolesEntity, RolesFilterType>>
  >({
    page: 1,
    limit: 10,
    filter: {},
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
  }

  async function create(input: RolesEntity) {
    return await service.create(input);
  }
  async function update(input: RolesEntity) {
    return await service.update(input);
  }
  async function remove(id: number) {
    return await service.remove(id);
  }

  return {
    getAll,
    create,
    update,
    state,
    setStateFilter,
    remove
  };
});
