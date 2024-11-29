import { AxiosApi } from "@/common/configurations/axios.config";
import {
  IGPaginate,
  IGPaginated,
} from "@/common/interfaces/pagination.interface";
import { IResponse } from "@/common/interfaces/response.interface";
import { TenantsEntity, TenantsFilterType } from "../entity/tenants.entity";
import { TenantsInterfaces } from "../interface/tenants.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class TenantsRepository implements TenantsInterfaces {
  constructor(@inject(AxiosApi) private _api: AxiosApi) {}

  async create(input: TenantsEntity): Promise<IResponse<TenantsEntity>> {
    const response = await this._api.axios({
      method: "post",
      url: `/tenants/`,
      data: {
        name: input.name,
        schema_name: input.schema_name,
        domain: input.domain,
      },
    });
    console.log(response);
    return {
      data: response.data,
      message: "ບັນທຶກສຳເລັດ",
      status: "success",
    };
  }
  async update(input: TenantsEntity, id: number): Promise<IResponse<TenantsEntity>> {
    console.log('idTenant:', id);
    const res = await this._api.axios({
      method: "put",
      url: `/tenants/${id}/`,
      data: {
        id: id,
        name: input.name,
        schema_name: input.schema_name,
        domain: input.domain,
      },
    });
    
    return {
      data: res.data,
      message: "ອັບເດດສຳເລັດ",
      status: "success",
    };
  }
  async updateDomain(input: TenantsEntity, id: number): Promise<IResponse<TenantsEntity>> {
    console.log();
    
    const res = await this._api.axios({
      method: "put",
      url: `/domains/${id}/`,
      data: {
        id: id,
        name: input.name,
        schema_name: input.schema_name,
        domain: input.domain,
        tenant: input.id?.toString()
      },
    });
    
    return {
      data: res.data,
      message: "ອັບເດດສຳເລັດ",
      status: "success",
    };
  }
  async getAll(
    args: IGPaginate<Pick<TenantsEntity, TenantsFilterType>>
  ): Promise<IResponse<IGPaginated<TenantsEntity>>> {
    const res = await this._api.axios({
      // url: "/tenants/",
      url: "/tenants/",
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
