import { singleton } from "tsyringe";
import { NotificationInstance } from "ant-design-vue/es/notification";
// import { useI18n } from "vue-i18n";

@singleton()
export class NotificationService implements NotificationInstance {
  // private t: Function;
  private notificationApi: NotificationInstance;

  constructor(
    // i18n?: ReturnType<typeof useI18n>,
    notificationApi?: NotificationInstance
  ) {
    // this.t = i18n.t;
    this.notificationApi = notificationApi!;
  }

  async success(args: any): Promise<void> {
    this.notificationApi.success({
      message: args.message,
      description: args.description,
      duration: args.duration,
      placement: args.placement,
    });
  }

  async error(args: any): Promise<void> {
    this.notificationApi.success({
      message: args.message,
      description: args.description,
      duration: args.duration,
      placement: args.placement,
    });
  }

  async info(args: any): Promise<void> {
    this.notificationApi.info({
      message: args.message,
      description: args.description,
      duration: args.duration,
      placement: args.placement,
    });
  }

  async warning(args: any): Promise<void> {
    this.notificationApi.warning({
      message: args.message,
      description: args.description,
      duration: args.duration,
      placement: args.placement,
    });
  }

  async open(args: any): Promise<void> {
    this.notificationApi.open({
      message: args.message,
      description: args.description,
      duration: args.duration,
      placement: args.placement,
    });
  }
}
