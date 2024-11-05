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
      url: `accounts/groups/`,
      data: {
        name: input.name,
        permissions: input.permissions,
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
      url: `accounts/groups/${input.id}/`,
      data: {
        name: input.name,
        permissions: input.permissions
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
  async remove(id: number): Promise<IResponse<RolesEntity>> {
    
    const res = await this._api.axios({
      method: 'delete',
      url: "/accounts/groups/"+id
    });
    
    return {
      data: res.data,
      status: "success",
    };
  }
}
