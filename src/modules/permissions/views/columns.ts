export const columns = [
  {
    title: "ລຳດັບ.",
    dataIndex: "index",
    key: "index",
    width: 10,
    customRender: ({ index }: { index: number }) => index + 1,
  },
  {
    title: "ຊື່",
    dataIndex: "name",
  },
  {
    title: "ລະຫັດຊື່",
    dataIndex: "codename",
  },
  
];
