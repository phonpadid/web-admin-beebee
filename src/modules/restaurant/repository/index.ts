import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { FilterType, RestaurantEntity } from "../entity";
import { IRestaurant } from "../interface";
import { injectable, inject } from "tsyringe";

@injectable()
export class RestaurantRepository implements IRestaurant {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(): Promise<any> {
    console.log("create.");
  }

  async getAll(
    args: IGPaginate<Pick<RestaurantEntity, FilterType>>
  ): Promise<IResponse<IGPaginated<RestaurantEntity>>> {
    const response = await this._api.axios({
      url: "customer/realestate/list",
      params: {
        page: args.page,
        per_page: args.limit,
        lang: "en",
      },
    });

    const { data, pagination } = response.data.data;

    return {
      data: { props: data, total: pagination.total },
      status: "success",
    };
  }
}
