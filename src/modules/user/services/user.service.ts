import { injectable, inject } from "tsyringe";
import { IUserInterface } from "../interface/user.interface";
import { UserRepository } from "../repository/user.repository";
import { IResponse } from "@/common/interfaces/response.interface";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { UserFilterType, UserEntity } from "../entity/user.entity";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private _api: IUserInterface) {}

  async create(input: UserEntity) {
    return await this._api.create(input);
  }
  async update(input: UserEntity) {
    return await this._api.update(input);
  }

  async getAll(
    input: IGPaginate<Pick<UserEntity, UserFilterType>>
  ): Promise<void | IResponse<IGPaginated<UserEntity>>> {
    return await this._api.getAll(input);
  }
}
