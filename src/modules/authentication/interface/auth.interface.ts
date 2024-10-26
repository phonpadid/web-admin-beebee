import { UserEntity } from "../entity/user.entity";

export interface IAuthRepository {
  login(input: UserEntity): Promise<any>;
  showMe(): Promise<any>;
}
