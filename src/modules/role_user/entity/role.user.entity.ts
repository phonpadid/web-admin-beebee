export interface RolesUserEntity {
  id?: string;
  user_id?: string;
  role_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type RolesUserFilterType = "user_id" | "role_id";
