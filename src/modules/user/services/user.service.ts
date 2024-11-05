import { injectable, inject } from "tsyringe";
import { UserRepository } from "../repository/user.repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { UserFilterType, UserEntity } from "../entity/user.entity";
import { UserInterfaces } from "../interface/user.interface";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private _api: UserInterfaces) {}

  async create(input: UserEntity) {
    return await this._api.create(input);
  }
  async update(input: UserEntity, id: string) {
    return await this._api.update(input, id);
  }

  async getAll(
    input: IGPaginate<Pick<UserEntity, UserFilterType>>
  ): Promise<void | IResponse<IGPaginated<UserEntity>>> {
    return await this._api.getAll(input);
  }
  async getOne(id: number): Promise<void | IResponse<UserEntity>> {
    return await this._api.getOne(id);
  }
  async remove(id: number): Promise<void | IResponse<UserEntity>> {
    return await this._api.remove(id);
  }
}
