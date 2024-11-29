import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";


export interface RolesEntity {
  id: string ;
  name?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  permissions?: PermissionsEntity[]
}

export type RolesFilterType = "name";
