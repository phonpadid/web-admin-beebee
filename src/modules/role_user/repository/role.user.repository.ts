import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  RolesUserEntity,
  RolesUserFilterType,
} from "../entity/role.user.entity";
import { RoleUserInterfaces } from "../interface/role.user.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class RolesUserRepository implements RoleUserInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(input: RolesUserEntity): Promise<IResponse<RolesUserEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/admin/roles_user`,
      data: {
        user_id: input.user_id,
        role_id: input.role_id,
      },
    });
    console.log(response);
    return {
      data: response.data,
      message: "ບັນທຶກສຳເລັດ",
      status: "success",
    };
  }
  async update(input: RolesUserEntity): Promise<IResponse<RolesUserEntity>> {
    const res = await this._api.axios({
      method: "put",
      url: `/admin/roles_user/update/${input.id}`,
      data: {
        user_id: input.user_id,
        role_id: input.role_id,
      },
    });
    return {
      data: res.data,
      message: "ອັບເດດສຳເລັດ",
      status: "success",
    };
  }
  async getAll(
    args: IGPaginate<Pick<RolesUserEntity, RolesUserFilterType>>
  ): Promise<IResponse<IGPaginated<RolesUserEntity>>> {
    const res = await this._api.axios({
      url: "roles_user",
      params: {
        page: args.page,
        per_page: args.limit,
      },
    });
    const { data, pagination } = res.data;
    return {
      data: { props: data, total: pagination.total },
      status: "success",
    };
  }
}
