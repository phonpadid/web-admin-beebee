// import { AxiosApi } from "@/common/configurations/axios.config";
// import { injectable, inject } from "tsyringe";
// import {
//   IGPaginate,
//   IGPaginated,
// } from "@/common/interfaces/pagination.interface";
// import { IResponse } from "@/common/interfaces/response.interface";
// import { IUserInterface } from "../interface/user.interface";
// import { UserEntity } from "../entity/user.entity";
// import { GET_ROLES } from "@/common/utils/const";

// @injectable()
// export class UserRepository implements IUserInterface {
//   constructor(@inject(AxiosApi) private _api: AxiosApi) {}

//   async create(input: UserEntity): Promise<IResponse<UserEntity>> {
//     const response = await this._api.axios({
//       method: "post",
//       url: "/accounts/users/",
//       data: {
//         name: input.name,
//         email: input.email,
//         password: input.password,
//         password_confirmation: input.password_confirmation,
//         roleId: input.roleId,
//         permissionIds: input.permissionIds,
//         profile: input.profile,
//       },
//     });

//     return {
//       data: response.data,
//       message: "ເພີ່ມຂໍ້ມູນສຳເລັດແລ້ວ",
//       status: "success",
//     };
//   }

//   async update(input: UserEntity): Promise<IResponse<UserEntity>> {
//     const response = await this._api.axios({
//       method: "put",
//       url: `/accounts/users/${input.id}`,
//       data: {
//         name: input.name,
//         email: input.email,
//         roleId: input.roleId,
//         permissionIds: input.permissionIds,
//         profile: input.profile,
//       },
//     });

//     return {
//       data: response.data,
//       message: "ອັບເດດ ຂໍ້ມູນສຳເລັດເເລ້ວ",
//       status: "success",
//     };
//   }

//   async delete(id: UserEntity): Promise<IResponse<UserEntity>> {
//     const response = await this._api.axios({
//       method: "delete",
//       url: `/admin/delete-user/${id}`,
//     });

//     return {
//       data: response.data,
//       message: "ລຶບຂໍ້ມູນ ສຳເລັດເເລ້ວ.",
//       status: "success",
//     };
//   }

//   async getAll(
//     args: IGPaginate<Pick<UserEntity, "name" | "role">>
//   ): Promise<IResponse<IGPaginated<UserEntity>>> {
//     const response = await this._api.axios({
//       url: "/accounts/users/",
//       params: {
//         page: args.page,
//         per_page: args.limit,
//         name: args.filter?.name,
//         role: args.filter?.role,
//       },
//     });

//     const { data, pagination } = response.data.data;

//     return {
//       data: { props: data, total: pagination.total },
//       status: "success",
//     };
//   }

//   async getOne(id: number): Promise<any> {
//     const response = await this._api.axios({
//       method: "get",
//       url: "/admin/list-user/" + id,
//     });

//     return response.data;
//   }

//   async getUserProfile(): Promise<any> {
//     // const roleUsers = localStorage.getItem("roles");
//     let url = "";

//     // if (
//     //   (roleUsers && roleUsers.includes(GET_ROLES.ADMIN_OWNER)) ||
//     //   (roleUsers && roleUsers.includes(GET_ROLES.USER_OWNER))
//     // ) {
//     //   url = `/owner/get-user-owner-profile`;
//     // } else {
//     //   url = `/admin/get-user-profile`;
//     // }

//     const response = await this._api.axios({
//       method: "get",
//       url: url,
//     });

//     return response.data;
//   }

//   async getAllRoles(): Promise<any> {
//     const response = await this._api.axios({
//       method: "get",
//       url: "roles",
//       params: {
//         roles: [GET_ROLES.ADMIN, GET_ROLES.USER],
//       },
//     });

//     return response.data;
//   }

//   async getAllPermissions(): Promise<any> {
//     const response = await this._api.axios({
//       method: "get",
//       url: "permissions",
//       params: {
//         types: ["all", "admin"],
//       },
//     });

//     return response.data;
//   }

//   async updateProfile(input: UserEntity): Promise<IResponse<UserEntity>> {
//     const response = await this._api.axios({
//       method: "put",
//       url: `/admin/update-user-profile/${input.id}`,
//       data: {
//         name: input.name,
//         email: input.email,
//         profile: input.profile,
//       },
//     });

//     return {
//       data: response.data,
//       message: "ອັບເດດ ຂໍ້ມູນສຳເລັດເເລ້ວ",
//       status: "success",
//     };
//   }
// }

import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { UserEntity, UserFilterType } from "../entity/user.entity";
import { UserInterfaces } from "../interface/user.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserRepository implements UserInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(input: UserEntity): Promise<IResponse<UserEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/accounts/users/`,
      data: {
        name: input.name,
        first_name: input.first_name,
        last_name: input.last_name,
      },
    });
    console.log(response);
    return {
      data: response.data,
      message: "ບັນທຶກສຳເລັດ",
      status: "success",
    };
  }
  async update(input: UserEntity): Promise<IResponse<UserEntity>> {
    const res = await this._api.axios({
      method: "put",
      url: `/accounts/users/${input.id}`,
      data: {
        name: input.name,
        first_name: input.first_name,
        last_name: input.last_name,
        
        status: input.status,
        user_type: input.user_type,
        groups: input.groups,
        phone_number: input.phone_number,
        user_permissions: input.user_permissions,
        password: input.password,
        password_confirmation: input.password,
        avatar: input.avatar
      },
    });
    return {
      data: res.data,
      message: "ອັບເດດສຳເລັດ",
      status: "success",
    };
  }
  async getAll(
    args: IGPaginate<Pick<UserEntity, UserFilterType>>
  ): Promise<IResponse<IGPaginated<UserEntity>>> {
    const res = await this._api.axios({
      url: "/accounts/users/",
      params: {
        page: args.page,
        page_size: args.limit,
      },
    });
    const { results, count } = res.data;

    return {
      data: { props: results, total: count },
      status: "success",
    };
  }
}
