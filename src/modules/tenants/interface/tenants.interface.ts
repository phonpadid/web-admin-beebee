import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";

import { TenantsEntity, TenantsFilterType } from "../entity/tenants.entity";

export interface TenantsInterfaces {
  create(input: TenantsEntity): Promise<any>;
  update(input: TenantsEntity, id: number): Promise<any>;
  updateDomain(input: TenantsEntity, id: number): Promise<any>;

  getAll(
    args: IGPaginate<Pick<TenantsEntity, TenantsFilterType>>
  ): Promise<IResponse<IGPaginated<TenantsEntity>>>;
}
