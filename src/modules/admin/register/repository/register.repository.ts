import { AxiosApi } from "@/common/configurations/axios.config";
import { injectable, inject } from "tsyringe";
import { IResponse } from "@/common/interfaces/response.interface";
import { registerEntity } from "../entity/register.entity";
import { IAuthRegisterRepository } from "../interface/register.interface";
@injectable()
export class RegistersRepository implements IAuthRegisterRepository {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async register(input: registerEntity): Promise<IResponse<registerEntity>> {
    const response = await this._api.axios({
      // /auth
      method: "post",
      url: "/auth/register/",
      data: {
        email: input.email,
        password: input.password,
        confirm_password: input.confirm_password,
        first_name: input.first_name,
        last_name: input.last_name,
        phone_number: input.phone_number,
        type: input.type,
      },
    });
    console.log(response.data);

    return {
      data: response.data,
      message: "ສະໝັກສະມາຊິກສຳເລັດ.",
      status: "success",
    };
  }
}
