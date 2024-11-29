export interface TenantsEntity {
  id?: string;
  name?: string;
  schema_name?: string;
  domain?: string;
  // domain: {
  //   id?: string;
  //   domain_url: string;
  //   is_primary?: boolean
  // } | string;
}

export type TenantsFilterType = "name" | "schema_name";
