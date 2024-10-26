export interface UserEntity {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string;
  password?: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
  roles?: RoleEntity [];
}

export interface RoleEntity {
  id: string;
  name: string;
  permissions: PermissionEntity[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PermissionEntity {
  id: string;
  name: string ;
  codename: string ;
  content_type: string ;
  roles: RoleEntity[];
  createdAt: Date;
  updatedAt: Date;
}

