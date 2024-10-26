export interface RolesPermissionsEntity {
  id?: string;
  role_id?: string;
  permission_id?: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type RolesPermissionsFilterType = "permission_id" | "role_id";
