import { defineStore } from "pinia";
import { RolesPermissionsService } from "../services/role.permissions.service";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { reactive } from "vue";
import {
  RolesPermissionsEntity,
  RolesPermissionsFilterType,
} from "../entity/role.permissions.entity";
// import { NotificationInstance } from "ant-design-vue/es/notification";
// import { NotificationService } from "@/common/notification";
// import { NOTIFICATION_PLACEMENT } from "@/common/utils/const";
// import { useI18n } from "vue-i18n";
// import { useRouter } from "vue-router";

export const rolesPermissionsStore = defineStore(
  "roles-permissions-store",
  () => {
    // const notificationApi = inject<NotificationInstance>("notificationApi");
    const service = container.resolve<RolesPermissionsService>(
      RolesPermissionsService
    );
    // const notificationService = new NotificationService(i18n, notificationApi);
    // const notificationService = new NotificationService(notificationApi);

    const statePermission = reactive<IGState<IGPaginated<RolesPermissionsEntity>>>({
      data: {
        props: [],
        total: 0,
      },
      isLoading: false,
      btnLoading: false,
      error: "",
    });

    const setStateFilter = reactive<
      IGPaginate<Pick<RolesPermissionsEntity, RolesPermissionsFilterType>>
    >({
      page: 1,
      limit: 10,
      filter: {},
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

    async function create(input: RolesPermissionsEntity) {
      return await service.create(input);
    }
    async function update(input: RolesPermissionsEntity) {
      return await service.update(input);
    }

    return {
      getAllPermission,
      create,
      update,
      statePermission,
      setStateFilter,
    };
  }
);
