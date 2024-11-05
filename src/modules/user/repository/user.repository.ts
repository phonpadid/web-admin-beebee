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

enum userType {
  Admin = 'admin', Customer = 'customer', Restaurant = 'restaurant'
}
@injectable()
export class UserRepository implements UserInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) { }

  async create(input: UserEntity): Promise<IResponse<UserEntity>> {
    // console.log('input:', input);
    const formData = new FormData();
    if(input.first_name) {
      formData.append("first_name", input.first_name?.toString());
    }
    formData.append("last_name", input.last_name);
    formData.append("email", input.email);
    formData.append("user_type", userType.Admin);
    formData.append("phone_number", input.phone_number);
    formData.append("is_active", String(true));
    formData.append("is_active", String(0));
    if (input.password) {
      formData.append("password", input.password.toString());
    }
    if (input.groups && Array.isArray(input.groups)) {
      input.groups.forEach((groupId) => {
        formData.append("groups", groupId.toString()); // Convert group ID to string
      });
    }
    // Append each user_permission ID to FormData
    if (input.user_permissions && Array.isArray(input.user_permissions)) {
      input.user_permissions.forEach((permissionId) => {
        formData.append("user_permissions", permissionId.toString()); // Convert permission ID to string
      });
    }
    // Handle `avatar` as a file
    if (input.avatar) {
      formData.append("avatar", input.avatar); // `avatar` should be a `File` or `Blob`
    }
    console.log('is_active:', input.is_active);
    
    // Send request with FormData
    const response = await this._api.axios({
      method: "post",
      url: `/accounts/users/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data", // Let Axios handle setting boundary automatically
      },
    });

    return {
      data: response.data,
      message: "ບັນທຶກສຳເລັດ",
      status: "success",
    };
  }


  async update(input: UserEntity, id: string): Promise<IResponse<UserEntity>> {
    const formData = new FormData();
    if(input.id) {
      formData.append("id", input.id?.toString());
    }
    if(input.first_name) {
      formData.append("first_name", input.first_name?.toString());
    }
    formData.append("last_name", input.last_name);
    formData.append("email", input.email);
    formData.append("user_type", userType.Admin);
    formData.append("phone_number", input.phone_number);
    formData.append("is_staff", String(input.is_staff));
    formData.append("is_superuser", String(input.is_superuser));
    formData.append("is_active", String(input.is_active));
    if (input.groups && Array.isArray(input.groups)) {
      input.groups.forEach((groupId) => {
        formData.append("groups", groupId.toString()); // Convert group ID to string
      });
    }
    // Append each user_permission ID to FormData
    if (input.user_permissions && Array.isArray(input.user_permissions)) {
      input.user_permissions.forEach((permissionId) => {
        formData.append("user_permissions", permissionId.toString()); // Convert permission ID to string
      });
    }
    // Handle `avatar` as a file
    if (input.avatar) {
      formData.append("avatar", input.avatar); // `avatar` should be a `File` or `Blob`
    }

    const res = await this._api.axios({
      method: "put",
      url: `/accounts/users/${id}/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data", // Let Axios handle setting boundary automatically
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
  async getOne(id: number): Promise<IResponse<UserEntity>> {
    console.log('props:',);
    const props = await this._api.axios({
      url: "/accounts/users/" + id
    });

    return {
      data: props.data,
      status: "success",
    };
  }
  async remove(id: number): Promise<IResponse<void>> {
    const props = await this._api.axios({
      method: 'delete',
      url: "/accounts/users/" + id
    });

    return {
      data: props.data,
      status: props.data.status,
    };
  }
}
