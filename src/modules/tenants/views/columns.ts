export const columns = (t: any) => [
  {
    title: t("tenants.table_field.domain"),
    dataIndex: ["domain", "domain_url"],
  },
  {
    title: t("tenants.table_field.name"),
    dataIndex:  "name", 
  },
  {
    title: t("tenants.table_field.schema_name"),
    dataIndex:  "schema_name", 
  },
  {
    title: t("tenants.table_field.created_at"),
    dataIndex:  "created_on", 
  },
  {
    title: t("tenants.table_field.more"),
    dataIndex: "actions",
    align: "center"
  },
];
