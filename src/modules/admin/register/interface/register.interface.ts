import { registerEntity } from "../entity/register.entity";

export interface IAuthRegisterRepository {
  register(input: registerEntity): Promise<any>;
}
