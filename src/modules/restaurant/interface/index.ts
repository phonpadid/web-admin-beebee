import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { FilterType, RestaurantEntity } from "../entity";

export interface IRestaurant {
  create(): Promise<any>;

  getAll(
    args: IGPaginate<Pick<RestaurantEntity, FilterType>>
  ): Promise<IResponse<IGPaginated<RestaurantEntity>>>;
}
