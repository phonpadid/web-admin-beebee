import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  RolesPermissionsEntity,
  RolesPermissionsFilterType,
} from "../entity/role.permissions.entity";
import { RolePermissionsInterfaces } from "../interface/role.permissions.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class RolesPermissionsRepository implements RolePermissionsInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(
    input: RolesPermissionsEntity
  ): Promise<IResponse<RolesPermissionsEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/admin/roles_permissions`,
      data: {
        role_id: input.role_id,
        permission_id: input.permission_id,
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
    input: RolesPermissionsEntity
  ): Promise<IResponse<RolesPermissionsEntity>> {
    const res = await this._api.axios({
      method: "put",
      url: `/admin/roles_permissions/update/${input.id}`,
      data: {
        role_id: input.role_id,
        permission_id: input.permission_id,
      },
    });
    return {
      data: res.data,
      message: "ອັບເດດສຳເລັດ",
      status: "success",
    };
  }
  async getAll(
    args: IGPaginate<Pick<RolesPermissionsEntity, RolesPermissionsFilterType>>
  ): Promise<IResponse<IGPaginated<RolesPermissionsEntity>>> {
    const res = await this._api.axios({
      url: "/accounts/permissions",
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
