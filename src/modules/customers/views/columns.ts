export const columns = (t: any) => [
  {
    title: t("customers.table_field.avatar"),
    dataIndex: "full_avatar_url",
  },
  {
    title: t("customers.table_field.fname"),
    dataIndex: "first_name",
  },
  {
    title: t("customers.table_field.lname"),
    dataIndex: "last_name",
  },
  {
    title: t("customers.table_field.email"),
    dataIndex: "email",
  },
  {
    title: t("customers.table_field.type"),
    dataIndex: "type",
  },
  {
    title: t("customers.table_field.created_at"),
    dataIndex: "created_at",
  },
  {
    title: t("customers.table_field.more"),
    dataIndex: "actions",
    align: "center"
  },
];
