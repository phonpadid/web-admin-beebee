import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";

import {
  PermissionsEntity,
  PermissionsFilterType,
} from "../entity/permissions.entity";

export interface PermissionsInterfaces {
  create(input: PermissionsEntity): Promise<any>;
  update(input: PermissionsEntity): Promise<any>;

  getAll(
    args: IGPaginate<Pick<PermissionsEntity, PermissionsFilterType>>
  ): Promise<IResponse<IGPaginated<PermissionsEntity>>>;
}
