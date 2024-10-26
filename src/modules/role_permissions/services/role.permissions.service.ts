import { injectable, inject } from "tsyringe";
import { RolePermissionsInterfaces } from "../interface/role.permissions.interface";
import { RolesPermissionsRepository } from "../repository/role.permissions.repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import {
  RolesPermissionsEntity,
  RolesPermissionsFilterType,
} from "../entity/role.permissions.entity";

@injectable()
export class RolesPermissionsService {
  constructor(
    @inject(RolesPermissionsRepository) private _api: RolePermissionsInterfaces
  ) {}

  async create(input: RolesPermissionsEntity) {
    return await this._api.create(input);
  }
  async update(input: RolesPermissionsEntity) {
    return await this._api.update(input);
  }

  async getAll(
    input: IGPaginate<Pick<RolesPermissionsEntity, RolesPermissionsFilterType>>
  ): Promise<void | IResponse<IGPaginated<RolesPermissionsEntity>>> {
    return await this._api.getAll(input);
  }
}
