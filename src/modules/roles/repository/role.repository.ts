import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { RolesEntity, RolesFilterType } from "../entity/role.entity";
import { RoleInterfaces } from "../interface/role.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class RolesRepository implements RoleInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(input: RolesEntity): Promise<IResponse<RolesEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/admin/roles`,
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
  async update(input: RolesEntity): Promise<IResponse<RolesEntity>> {
    const res = await this._api.axios({
      method: "put",
      url: `/admin/roles/update/${input.id}`,
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
    args: IGPaginate<Pick<RolesEntity, RolesFilterType>>
  ): Promise<IResponse<IGPaginated<RolesEntity>>> {
    
    const res = await this._api.axios({
      url: "/accounts/groups",
      params: {
        page: args.page,
        per_page: args.limit,
      },
    });
    const { results, count } = res.data;
    return {
      data: { props: results, total: count.total },
      status: "success",
    };
  }
}
