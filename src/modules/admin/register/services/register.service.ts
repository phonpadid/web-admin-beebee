import { registerEntity } from "./../entity/register.entity";
import { inject, injectable } from "tsyringe";
import { RegisterUseCase } from "../use-cases/register.use-cases";

@injectable()
export class AuthService {
  constructor(@inject(RegisterUseCase) private _register: RegisterUseCase) {}

  async register(input: registerEntity) {
    return await this._register.execute(input);
  }
}
