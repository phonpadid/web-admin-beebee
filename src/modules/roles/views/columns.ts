export const columns = (t: any) => [
  {
    title: t("messages.role.name"),
    dataIndex: "name",
  },
  {
    title: "ເວລາສ້າງ",
    dataIndex: "created_at",
  },
  {
    title: "ເວລາອັບເດດ",
    dataIndex: "updated_at",
  },
  {
    title: "",
    dataIndex: "actions",
  },
];
