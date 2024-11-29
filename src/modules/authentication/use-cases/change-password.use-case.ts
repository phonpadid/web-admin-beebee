
import { injectable, inject } from "tsyringe";
import { AuthRepository } from "../repository/auth.repository";
import type { IAuthRepository } from "../interface/auth.interface";
import { MeEntity } from "../entity/me.entity";

@injectable()
export class ChangePasswordUseCase {
  constructor(@inject(AuthRepository) private _api: IAuthRepository) {}

  async execute(input: MeEntity): Promise<any> {
    return await this._api.changePassword(input);
  }
}
