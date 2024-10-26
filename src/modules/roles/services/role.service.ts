import { injectable, inject } from "tsyringe";
import { RoleInterfaces } from "../interface/role.interface";
import { RolesRepository } from "../repository/role.repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { RolesEntity, RolesFilterType } from "../entity/role.entity";

@injectable()
export class RolesService {
  constructor(@inject(RolesRepository) private _api: RoleInterfaces) {}

  async create(input: RolesEntity) {
    return await this._api.create(input);
  }
  async update(input: RolesEntity) {
    return await this._api.update(input);
  }

  async getAll(
    input: IGPaginate<Pick<RolesEntity, RolesFilterType>>
  ): Promise<void | IResponse<IGPaginated<RolesEntity>>> {
    return await this._api.getAll(input);
  }
}