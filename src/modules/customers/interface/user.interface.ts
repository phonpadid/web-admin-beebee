import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";

import { CustomerFilterType, CustomerEntity } from "../entity/customer.entity";

export interface CustomerInterfaces {
  create(input: CustomerEntity): Promise<any>;
  update(input: CustomerEntity, id: string): Promise<any>;

  getAll(
    args: IGPaginate<Pick<CustomerEntity, CustomerFilterType>>
  ): Promise<IResponse<IGPaginated<CustomerEntity>>>;
  getOne(id: number): Promise<any>;
  remove(id: number): Promise<any>;
}
