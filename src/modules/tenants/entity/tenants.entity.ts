export interface TenantsEntity {
  id?: string;
  name?: string;
  schema_name?: string;
  domain?: string;
}

export type TenantsFilterType = "name" | "schema_name";
