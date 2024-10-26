import { AxiosApi } from "../../../common/configurations/axios.config";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import { UserEntity } from "../entity/user.entity";
import { IAuthRepository } from "../interface/auth.interface";
import { MeEntity } from "../entity/me.entity";
@injectable()
export class AuthRepository implements IAuthRepository {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async login(input: UserEntity): Promise<IResponse<UserEntity>> {
    const response = await this._api.axios({
      // /auth
      method: "post",
      url: "/auth/login/",
      data: {
        email: input.email,
        password: input.password,
      },
    });
    console.log(response.data);

    return {
      data: response.data,
      message: "ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ.",
      status: "success",
    };
  }

  async showMe(): Promise<IResponse<MeEntity>> {
    const props = await this._api.axios({
      // url: "/tenants/",
      url: "/auth/me/"
    });
    return {
      data:  props.data,
      status: "success",
    };
  }
}
