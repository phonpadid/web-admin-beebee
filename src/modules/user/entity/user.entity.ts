// interface Permissions {
//   id?: number | string;
//   name?: string;
// }

export interface UserEntity {
  id?: string;
  name?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  status?: string;
  user_type?: string;
  groups: string[];
  phone_number: string;
  user_permissions: string[];
  password?: string;
  password_confirmation?: string;
  avatar?: string | File;
  created_at?: string;
  updated_at?: string;
}

export type UserFilterType = "name";
