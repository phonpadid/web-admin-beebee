import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { CustomerFilterType, CustomerEntity } from "../entity/customer.entity";
import { CustomerRepository } from "../repository/customer.repository";
import { CustomerInterfaces } from "../interface/user.interface";

@injectable()
export class CustomerService {
  constructor(@inject(CustomerRepository) private _api: CustomerInterfaces) {}

  async create(input: CustomerEntity) {
    return await this._api.create(input);
  }
  async update(input: CustomerEntity, id: string) {
    return await this._api.update(input, id);
  }

  async getAll(
    input: IGPaginate<Pick<CustomerEntity, CustomerFilterType>>
  ): Promise<void | IResponse<IGPaginated<CustomerEntity>>> {
    return await this._api.getAll(input);
  }
  async getOne(id: number): Promise<void | IResponse<CustomerEntity>> {
    return await this._api.getOne(id);
  }
  async remove(id: number): Promise<void | IResponse<CustomerEntity>> {
    return await this._api.remove(id);
  }
}
