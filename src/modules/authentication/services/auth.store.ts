import { UserEntity } from "./../entity/user.entity";
import { inject, injectable } from "tsyringe";
import { LoginUseCase } from "../use-cases/login.use-case";
import { AuthRepository } from "../repository/auth.repository";
import { IAuthRepository } from "../interface/auth.interface";

@injectable()
export class AuthService {
  constructor(
    @inject(LoginUseCase) private _login: LoginUseCase,
    @inject(AuthRepository) private _authReposioty: IAuthRepository
  ) { }

  async login(input: UserEntity) {
    return await this._login.execute(input);
  }
  async showMe(): Promise<any> {
    return await this._authReposioty.showMe()
  }
}
