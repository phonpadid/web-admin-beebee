import { injectable, inject } from "tsyringe";
import { RoleUserInterfaces } from "../interface/role.user.interface";
import { RolesUserRepository } from "../repository/role.user.repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import {
  RolesUserEntity,
  RolesUserFilterType,
} from "../entity/role.user.entity";

@injectable()
export class RolesUserService {
  constructor(@inject(RolesUserRepository) private _api: RoleUserInterfaces) {}

  async create(input: RolesUserEntity) {
    return await this._api.create(input);
  }
  async update(input: RolesUserEntity) {
    return await this._api.update(input);
  }

  async getAll(
    input: IGPaginate<Pick<RolesUserEntity, RolesUserFilterType>>
  ): Promise<void | IResponse<IGPaginated<RolesUserEntity>>> {
    return await this._api.getAll(input);
  }
}
