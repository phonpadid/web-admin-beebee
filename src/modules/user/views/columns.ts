import { UserEntity } from "../entity/user.entity";

export const columns = (t: any) => [
  {
    title: t("users.table_field.avatar"),
    dataIndex: "avatar",
  },
  {
    title: t("users.table_field.full_name"),
    dataIndex: "full_name",
    key: "full_name",
    customRender: ({ record }: { record: UserEntity }) => 
      `${record.first_name} ${record.last_name}`,
  },
  // {
  //   title: t("users.table_field.lname"),
  //   dataIndex: "last_name",
  // },
  {
    title: t("users.table_field.email"),
    dataIndex: "email",
  },
  {
    title: t("users.table_field.created_at"),
    dataIndex: "created_at",
  },
  {
    title: t("users.table_field.updated_at"),
    dataIndex: "updated_at",
  },
  {
    title: t("users.table_field.more"),
    dataIndex: "actions",
    align: "center"
  },
];
