import { MeEntity } from "../entity/me.entity";
import { UserEntity } from "../entity/user.entity";

export interface IAuthRepository {
  login(input: UserEntity): Promise<any>;
  showMe(): Promise<any>;
  changePassword(input: MeEntity): Promise<any>;
}
