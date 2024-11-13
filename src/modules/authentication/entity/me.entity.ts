import { PermissionsEntity } from "@/modules/permissions/entity/permissions.entity";
import { RolesEntity } from "@/modules/roles/entity/role.entity";

export interface MeEntity {
    id?: string;
    last_login?: Date;
    is_superuser?: boolean
    first_name?: string;
    last_name?: string
    is_staff?: boolean;
    is_active?: boolean,
    date_joined?: Date;
    is_deleted?: boolean;
    created_at?:Date;
    updated_at?: Date;
    email?: string;
    new_password?: string;
    old_password?: string;
    confirm_password?: string;
    phone_number?: string;
    avatar?: string;
    status?: string;
    user_type?: string;
    groups?: RolesEntity[] | string[],
    user_permissions?: PermissionsEntity[] | string[]
}