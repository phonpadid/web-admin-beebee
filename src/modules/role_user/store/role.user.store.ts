import { defineStore } from "pinia";
import { RolesUserService } from "../services/role.user.service";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { reactive } from "vue";
import {
  RolesUserEntity,
  RolesUserFilterType,
} from "../entity/role.user.entity";
// import { NotificationInstance } from "ant-design-vue/es/notification";
// import { NotificationService } from "@/common/notification";
// import { NOTIFICATION_PLACEMENT } from "@/common/utils/const";
// import { useI18n } from "vue-i18n";
// import { useRouter } from "vue-router";

export const rolesUserStore = defineStore("roles-user-store", () => {
  // const notificationApi = inject<NotificationInstance>("notificationApi");
  const service = container.resolve<RolesUserService>(RolesUserService);
  // const notificationService = new NotificationService(i18n, notificationApi);
  // const notificationService = new NotificationService(notificationApi);

  const state = reactive<IGState<IGPaginated<RolesUserEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<
    IGPaginate<Pick<RolesUserEntity, RolesUserFilterType>>
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

  async function create(input: RolesUserEntity) {
    return await service.create(input);
  }
  async function update(input: RolesUserEntity) {
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
