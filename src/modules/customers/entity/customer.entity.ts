import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
import { RolesEntity } from "@/modules/roles/entity/role.entity";

export interface CustomerEntity {
  customer_id: string;
  id: string;
  first_name?: string;
  last_name: string;
  email: string;
  is_active?: boolean;
  type?: string;
  is_superuser?: boolean;
  groups?: RolesEntity[];  // Allow groups to be a single number or an array of numbers
  phone_number: string;
  user_permissions?: PermissionsEntity[]; // Allow user_permissions to be a single number or an array of numbers
  password?: string | undefined;
  password_confirmation?: string;
  avatar?: File;
  created_at?: string;
  updated_at?: string;
}


export type CustomerFilterType = "first_name";
