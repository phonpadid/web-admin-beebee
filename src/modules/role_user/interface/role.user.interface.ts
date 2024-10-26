import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";

import {
  RolesUserEntity,
  RolesUserFilterType,
} from "../entity/role.user.entity";

export interface RoleUserInterfaces {
  create(input: RolesUserEntity): Promise<any>;
  update(input: RolesUserEntity): Promise<any>;

  getAll(
    args: IGPaginate<Pick<RolesUserEntity, RolesUserFilterType>>
  ): Promise<IResponse<IGPaginated<RolesUserEntity>>>;
}
