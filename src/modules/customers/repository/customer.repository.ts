
import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { CustomerEntity, CustomerFilterType } from "../entity/customer.entity";
import { CustomerInterfaces } from "../interface/user.interface";
import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
@injectable()
export class CustomerRepository implements CustomerInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) { }

  async create(input: CustomerEntity): Promise<IResponse<CustomerEntity>> {
    // console.log('input:', input);
    const formData = new FormData();
    if (input.first_name) {
      formData.append("first_name", input.first_name?.toString());
    }
    formData.append("last_name", input.last_name);
    formData.append("email", input.email);
    if (input.type) {
      formData.append("type", input.type);
    }
    formData.append("phone_number", input.phone_number);
    formData.append("is_active", String(true));
    if (input.password) {
      formData.append("password", input.password.toString());
    }
    if (input.password_confirmation) {
      formData.append("confirm_password", input.password_confirmation.toString());
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

    // Send request with FormData
    const response = await this._api.axios({
      method: "post",
      url: `/accounts/customers/`,
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


  async update(input: CustomerEntity, id: string): Promise<IResponse<CustomerEntity>> {
    const formData = new FormData();
    if (input.id) {
      formData.append("id", input.id?.toString());
    }
    if (input.first_name) {
      formData.append("first_name", input.first_name?.toString());
    }
    if (input.type) {
      formData.append("type", input.type);
    }
    formData.append("last_name", input.last_name);
    formData.append("email", input.email);
    formData.append("phone_number", input.phone_number);
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
      url: `/accounts/customers/${id}/`,
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
    args: IGPaginate<Pick<CustomerEntity, CustomerFilterType>>
  ): Promise<IResponse<IGPaginated<CustomerEntity>>> {
    const res = await this._api.axios({
      url: "/accounts/customers/",
      params: {
        page: args.page,
        page_size: args.limit,
      },
    });
    const { results, count } = res.data;


    //map data
    const customers = results.map((customer: any) => ({
      customer_id: customer?.id,
      id: customer?.user.id,
      first_name: customer.user.first_name,
      last_name: customer.user.last_name,
      email: customer.user.email,
      type: customer.type,
      avatar: customer.avatar,
      created_at: customer.created_at
    }))
    // console.log('mapData:', customers);
    return {
      data: { props: customers, total: count },
      status: "success",
    };
  }
  async getOne(id: number): Promise<IResponse<CustomerEntity>> {
    console.log('props:',);
    const props = await this._api.axios({
      url: "/accounts/customers/" + id
    });
    const customer = {
      customer_id: props.data.id,
      id: props.data.id,
      type: props.data.type,
      first_name: props.data.user.first_name,
      last_name: props.data.user.last_name,
      phone_number: props.data.user.phone_number,
      email: props.data.user.email,
      avatar: props.data.user.avatar,
      created_at: dayjs(props.data.user.created_at).format("MM-DD-YYYY HH:mm:ss"),
      updated_at: dayjs(props.data.user.updated_at).format("MM-DD-YYYY HH:mm:ss"),
      is_active: props.data.user.is_active,
      groups: props.data.user.groups, // Accesses `groups` directly from user
      user_permissions: props.data.user.user_permissions, // Accesses `user_permissions` directly from user
    };
    return {
      data: customer,
      status: "success",
    };
  }
  async remove(id: number): Promise<IResponse<void>> {
    const props = await this._api.axios({
      method: 'delete',
      url: `/accounts/customers/${id}/`
      // url: `/accounts/customers/${id}/hard-delete/`
    });

    return {
      data: props.data,
      status: props.data.status,
    };
  }
}
