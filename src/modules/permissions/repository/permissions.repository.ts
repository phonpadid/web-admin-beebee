import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  PermissionsEntity,
  PermissionsFilterType,
} from "../entity/permissions.entity";
import { PermissionsInterfaces } from "../interface/permissions.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class PermissionsRepository implements PermissionsInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(
    input: PermissionsEntity
  ): Promise<IResponse<PermissionsEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/accounts/permissions/`,
      data: {
        name: input.name,
      },
    });
    console.log(response);
    return {
      data: response.data,
      message: "ບັນທຶກສຳເລັດ",
      status: "success",
    };
  }
  async update(
    input: PermissionsEntity
  ): Promise<IResponse<PermissionsEntity>> {
    const res = await this._api.axios({
      method: "put",
      url: `/admin/permissions/update/${input.id}`,
      data: {
        name: input.name,
      },
    });
    return {
      data: res.data,
      message: "ອັບເດດສຳເລັດ",
      status: "success",
    };
  }
  async getAll(
    args: IGPaginate<Pick<PermissionsEntity, PermissionsFilterType>>
  ): Promise<IResponse<IGPaginated<PermissionsEntity>>> {
    const res = await this._api.axios({
      url: "/accounts/permissions/",
      params: {
        page: args.page,
        page_size: args.limit,
      },
    });
    const { results, count } = res.data;
    
    return {
      data: { props: results, total: count },
      status: "success",
    };
  }
}
