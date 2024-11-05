import { injectable, inject } from "tsyringe";
import { AuthRepository } from "../repository/auth.repository";
import { UserEntity } from "../entity/user.entity";
import type { IAuthRepository } from "../interface/auth.interface";
import { IUseCase } from "@/common/interfaces/use-case.interface";

@injectable()
export class LoginUseCase implements IUseCase {
  constructor(@inject(AuthRepository) private _api: IAuthRepository) {}

  async execute(input: UserEntity): Promise<any> {
    return await this._api.login(input);
  }
}
