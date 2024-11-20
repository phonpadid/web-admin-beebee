export const columns = (t: any) => [
  {
    title: t("permissions.table_field.id"),
    dataIndex: "index",
    key: "index",
    width: 10,
    customRender: ({ index }: { index: number }) => index + 1,
  },
  {
    title: t("permissions.table_field.name"),
    dataIndex: "name",
  },
  {
    title: t("permissions.table_field.code_name"),
    dataIndex: "codename",
  },
  
];
