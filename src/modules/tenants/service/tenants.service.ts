import { injectable, inject } from "tsyringe";
import { TenantsInterfaces } from "../interface/tenants.interface";
import { TenantsRepository } from "../repository/tenants.repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { TenantsEntity, TenantsFilterType } from "../entity/tenants.entity";

@injectable()
export class TenantsService {
  constructor(@inject(TenantsRepository) private _api: TenantsInterfaces) {}

  async create(input: TenantsEntity) {
    return await this._api.create(input);
  }
  async update(input: TenantsEntity) {
    return await this._api.update(input);
  }

  async getAll(
    input: IGPaginate<Pick<TenantsEntity, TenantsFilterType>>
  ): Promise<void | IResponse<IGPaginated<TenantsEntity>>> {
    return await this._api.getAll(input);
  }
}
