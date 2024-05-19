import { injectable, inject } from "tsyringe";
import { IRestaurant } from "../interface";
import { RestaurantRepository } from "../repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { FilterType, RestaurantEntity } from "../entity";

@injectable()
export class RestaurantService {
  constructor(@inject(RestaurantRepository) private _api: IRestaurant) {}

  async create() {
    return await this._api.create();
  }

  async getAll(
    input: IGPaginate<Pick<RestaurantEntity, FilterType>>
  ): Promise<void | IResponse<IGPaginated<RestaurantEntity>>> {
    return await this._api.getAll(input);
  }
}
