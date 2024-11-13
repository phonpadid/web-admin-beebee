import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";

import { RolesEntity, RolesFilterType } from "../entity/role.entity";

export interface RoleInterfaces {
  create(input: RolesEntity): Promise<any>;
  update(input: RolesEntity, id : string): Promise<any>;

  getAll(
    args: IGPaginate<Pick<RolesEntity, RolesFilterType>>
  ): Promise<IResponse<IGPaginated<RolesEntity>>>;
  getDetail(id: number): Promise<any>;
  remove(id: number): Promise<any>;
}
