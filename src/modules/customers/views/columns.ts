import { CustomerEntity } from "../entity/customer.entity";

export const columns = (t: any) => [
  {
    title: t("customers.table_field.avatar"),
    dataIndex: "full_avatar_url",
  },
  {
    title: t("users.table_field.full_name"),
    dataIndex: "full_name",
    key: "full_name",
    customRender: ({ record }: { record: CustomerEntity }) => 
      `${record.first_name} ${record.last_name}`,
  },
  // {
  //   title: t("customers.table_field.lname"),
  //   dataIndex: "last_name",
  // },
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
