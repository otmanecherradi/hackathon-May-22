const USERS = {
  NAME: 'users',
  COLUMNS: {
    ID: 'id',
    EMAIL: 'email',
    PASSWORD: 'password',
    FULL_NAME: 'full_name',
    PHONE: 'phone',
    ADDRESS: 'address',
    IS_ADMIN: 'is_admin',
    COUNTRY: 'country',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    DELETED_AT: 'deleted_at',
  },
};
const PRODUCTS = {
  NAME: 'products',
  COLUMNS: {
    ID: 'id',
    NAME: 'name',
    SLUG: 'slug',
    DESCRIPTION: 'description',
    PRICE: 'price',
    CATEGORIES_ID: 'categories_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    DELETED_AT: 'deleted_at',
  },
};
const CATEGORIES = {
  NAME: 'categories',
  COLUMNS: {
    ID: 'id',
    NAME: 'name',
    SLUG: 'slug',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    DELETED_AT: 'deleted_at',
  },
};
const BRANDS = {
  NAME: 'brands',
  COLUMNS: {
    ID: 'id',
    NAME: 'name',
    SLUG: 'slug',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    DELETED_AT: 'deleted_at',
  },
};
const IMAGES = {
  NAME: 'images',
  COLUMNS: {
    ID: 'id',
    URL: 'url',
    alt: 'alt',
    PRODUCTS_ID: 'products_id',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    DELETED_AT: 'deleted_at',
  },
};

const ORDERS = {
  NAME: 'orders',
  COLUMNS: {
    ID: 'id',
    USERS_ID: 'users_id',
    ADDRESS: 'address',
    PHONE: 'phone',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    DELETED_AT: 'deleted_at',
  },
};
const ORDER_DETAILS = {
  NAME: 'order_details',
  COLUMNS: {
    ID: 'id',
    ORDERS_ID: 'orders_id',
    PRODUCTS_ID: 'products_id',
    QUANTITY: 'quantity',
    PRICE: 'price',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
    DELETED_AT: 'deleted_at',
  },
};

const tables = {
  users: USERS,
  products: PRODUCTS,
  categories: CATEGORIES,
  brands: BRANDS,
  images: IMAGES,
  orders: ORDERS,
  orderDetails: ORDER_DETAILS,
};

module.exports = {
  tables,
};
