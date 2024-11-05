
import { injectable, inject } from "tsyringe";
import { AuthRepository } from "../repository/auth.repository";
import { UserEntity } from "../entity/user.entity";
import type { IAuthRepository } from "../interface/auth.interface";

@injectable()
export class ChangePasswordUseCase {
  constructor(@inject(AuthRepository) private _api: IAuthRepository) {}

  async execute(input: UserEntity): Promise<any> {
    return await this._api.changePassword(input);
  }
}
