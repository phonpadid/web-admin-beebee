export const columns = (t: any) => [
  {
    title: t("messages.role.name"),
    dataIndex: "name",
  },
  {
    title: t("messages.role.created_at"),
    dataIndex: "created_at",
  },
  {
    title: t("messages.role.updated_at"),
    dataIndex: "updated_at",
  },
  {
    title: t("messages.role.more"),
    dataIndex: "actions",
  },
];
