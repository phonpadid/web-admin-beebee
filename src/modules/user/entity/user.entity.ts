import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
import { RolesEntity } from "@/modules/roles/entity/role.entity";

export interface UserEntity {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  type?: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_staff?: boolean;
  groups?: RolesEntity[] | string[] | any[];  // Allow groups to be a single number or an array of numbers
  phone_number: string;
  user_permissions?: PermissionsEntity[] | string[] | any[]; // Allow user_permissions to be a single number or an array of numbers
  password?: string | undefined;
  password_confirmation?: string;
  avatar?: File;
  created_at?: string;
  updated_at?: string;
}


export type UserFilterType = "first_name";
