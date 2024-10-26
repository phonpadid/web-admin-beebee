export const NOTIFICATION_PLACEMENT = {
  TOP_LEFT: "topLeft",
  TOP_RIGHT: "topRight",
  BOTTOM_LEFT: "bottomLeft",
  BOTTOM_RIGHT: "bottomRight",
};

export const GET_ROLES = {
  SUPER_ADMIN: "super-admin",
  ADMIN: "admin",
  USER: "user",
  ADMIN_RESTAURANT: "admin-restaurant",
  USER_RESTAURANT: "user-restaurant",
  CUSTOMER: "customer",
};
export const GET_PERMISSIONS = {
  RESTAURANTS: {
    VIEW: "view-restaurant",
    CREATE: "create-restaurant",
    UPDATE: "update-restaurant",
    DELETE: "delete-restaurant",
  },
  RESTAURANT_USERS: {
    VIEW: "view-restaurant-user",
    CREATE: "create-restaurant-user",
    UPDATE: "update-restaurant-user",
    DELETE: "delete-restaurant-user",
  },
  UNITS: {
    VIEW: "view-unit",
    CREATE: "create-unit",
    UPDATE: "update-unit",
    DELETE: "cancel-unit",
  },
  CATEGORIES: {
    VIEW: "view-category",
    CREATE: "create-category",
    UPDATE: "update-category",
    DELETE: "delete-category",
  },
  PRODUCTS_TYPE: {
    VIEW: "view-product-type",
    CREATE: "create-product-type",
    UPDATE: "update-product-type",
    DELETE: "delete-product-type",
  },
  PRODUCTS: {
    VIEW: "view-product",
    CREATE: "create-product",
    UPDATE: "update-product",
    DELETE: "delete-product",
  },
  ZONES: {
    VIEW: "view-zone",
    CREATE: "create-zone",
    UPDATE: "update-zone",
    DELETE: "delete-zone",
  },
  TABLES: {
    VIEW: "view-table",
    CREATE: "create-table",
    UPDATE: "update-table",
    DELETE: "delete-table",
  },
  BOOKINGS: {
    VIEW: "view-booking",
    CREATE: "create-booking",
    UPDATE: "update-booking",
    DELETE: "delete-booking",
  },
  PAYMENT_TYPES: {
    VIEW: "view-payment-type",
    CREATE: "create-payment-type",
    UPDATE: "update-payment-type",
    DELETE: "delete-payment-type",
  },
  CURRENCIES: {
    VIEW: "view-currency",
    CREATE: "create-currency",
    UPDATE: "update-currency",
    DELETE: "delete-currency",
  },
  ORDERS: {
    VIEW: "view-order",
    CREATE: "create-order",
    UPDATE: "update-order",
    DELETE: "delete-order",
  },
  OREDER_DETAIL: {
    VIEW: "view-order-detail",
    CREATE: "create-order-detail",
    UPDATE: "update-order-detail",
    DELETE: "delete-order-detail",
  },
  QUEUE_ORDERS: {
    VIEW: "view-queue-order",
    CREATE: "create-queue-order",
    UPDATE: "update-queue-order",
    DELETE: "delete-queue-order",
  },
  CUSTOMERS: {
    VIEW: "view-customer",
    CREATE: "create-customer",
    UPDATE: "update-customer",
    DELETE: "delete-customer",
  },
  ORDER_TABLES: {
    VIEW: "view-order-table",
    CREATE: "create-order-table",
    UPDATE: "update-order-table",
    DELETE: "delete-order-table",
  },
  RESERVED_BEERS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  PENDING_PAYMENTS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  STOCKS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  INVOICES: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  INVOICE_DETAILS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  IMPORT_PRODUCTS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  IMPORT_DETAILS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  DAILY_PRODUCTS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  DAILY_EXPENSES: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  SUBSCRIPTIONS: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  HOME: {
    VIEW: "",
    CREATE: "",
    UPDATE: "",
    DELETE: "",
  },
  ADMIN_USER: {
    VIEW: "view-user",
    CREATE: "create-user",
    UPDATE: "edit-user",
    DELETE: "delete-user",
  },
};

export const PERMISSION_KEY = "permissions";
export const PERMISSION_ROLE = "roles";
