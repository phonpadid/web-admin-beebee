import { injectable, inject } from "tsyringe";
import { PermissionsInterfaces } from "../interface/permissions.interface";
import { PermissionsRepository } from "../repository/permissions.repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import {
  PermissionsEntity,
  PermissionsFilterType,
} from "../entity/permissions.entity";

@injectable()
export class PermissionsService {
  constructor(
    @inject(PermissionsRepository) private _api: PermissionsInterfaces
  ) {}

  async create(input: PermissionsEntity) {
    return await this._api.create(input);
  }
  async update(input: PermissionsEntity) {
    return await this._api.update(input);
  }

  async getAll(
    input: IGPaginate<Pick<PermissionsEntity, PermissionsFilterType>>
  ): Promise<void | IResponse<IGPaginated<PermissionsEntity>>> {
    return await this._api.getAll(input);
  }
}
