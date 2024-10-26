import type { IUseCase } from "@/common/interfaces/use-case.interface";
import { injectable, inject } from "tsyringe";
import { RegistersRepository } from "../repository/register.repository";
import { registerEntity } from "../entity/register.entity";
import type { IAuthRegisterRepository } from "../interface/register.interface";

@injectable()
export class RegisterUseCase implements IUseCase {
  constructor(
    @inject(RegistersRepository) private _api: IAuthRegisterRepository
  ) {}

  async execute(input: registerEntity): Promise<any> {
    return await this._api.register(input);
  }
}
