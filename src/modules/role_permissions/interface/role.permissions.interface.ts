import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";

import {
  RolesPermissionsFilterType,
  RolesPermissionsEntity,
} from "../entity/role.permissions.entity";

export interface RolePermissionsInterfaces {
  create(input: RolesPermissionsEntity): Promise<any>;
  update(input: RolesPermissionsEntity): Promise<any>;

  getAll(
    args: IGPaginate<Pick<RolesPermissionsEntity, RolesPermissionsFilterType>>
  ): Promise<IResponse<IGPaginated<RolesPermissionsEntity>>>;
}
