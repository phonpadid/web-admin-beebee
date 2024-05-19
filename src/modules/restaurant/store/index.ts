import { defineStore } from "pinia";
import { RestaurantService } from "../services";
import { container } from "tsyringe";
import { IGState } from "@/common/interfaces/state.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { inject, reactive } from "vue";
import { FilterType, RestaurantEntity } from "../entity";
import { NotificationInstance } from "ant-design-vue/es/notification";
import { NotificationService } from "@/common/notification";
import { NOTIFICATION_PLACEMENT } from "@/common/utils/const";
import { useI18n } from "vue-i18n";

export const restaurantStore = defineStore("restaurant-store", () => {
  const i18n = useI18n();
  const notificationApi = inject<NotificationInstance>("notificationApi");
  const service = container.resolve<RestaurantService>(RestaurantService);
  // const notificationService = new NotificationService(i18n, notificationApi);
  const notificationService = new NotificationService(notificationApi);

  const state = reactive<IGState<IGPaginated<RestaurantEntity>>>({
    data: {
      props: [],
      total: 0,
    },
    isLoading: false,
    btnLoading: false,
    error: "",
  });

  const setStateFilter = reactive<
    IGPaginate<Pick<RestaurantEntity, FilterType>>
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

  async function create() {
    await openNotification();

    // return await service.create();
  }

  async function openNotification() {
    notificationService.success({
      message: i18n.t("messages.notification"),
      description:
        "This is the content of the notification. This is the content of the notification..",
      duration: 5,
      placement: NOTIFICATION_PLACEMENT.TOP_RIGHT,
    });
  }

  return {
    getAll,
    create,
    state,
    setStateFilter,
  };
});
