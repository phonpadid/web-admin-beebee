export interface PermissionsEntity {
  id: string;
  name?: string;
  codename?: string;
  content_type?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export type PermissionsFilterType = "name" | "codename";
