const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    recoveryPassword: `${API}/api/${VERSION}/auth/recovery`,
    changePasswordFromToken: `${API}/api/${VERSION}/auth/change-password`,
  },
  profile: {
    getProfile: `${API}/api/${VERSION}/profile`,
    getOrders: `${API}/api/${VERSION}/profile/my-orders`,
  },
  products: {
    getProduct: (id) => `${API}/api/${VERSION}/products/${id}`,
    allProducts: `${API}/api/${VERSION}/products`,
    getProducts: (limit, offset) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
  },
  categories: {
    getCategory: (id) => `${API}/api/${VERSION}/categories/${id}`,
    getCategories: `${API}/api/${VERSION}/categories`,
  },
  users: {
    getCustomer: (id) => `${API}/api/${VERSION}/customers/${id}`,
    addCustomers: `${API}/api/${VERSION}/customers`,
    updateCustomer: (id) => `${API}/api/${VERSION}/customers/${id}`,
  },
  orders: {
    placeOrder: `${API}/api/${VERSION}/profile/place-order`,
    addItem: `${API}/api/${VERSION}/orders/add-item`,
    getOrder: (id) => `${API}/api/${VERSION}/orders/${id}`,
    getOrders: `${API}/api/${VERSION}/profile/my-orders`,
  }
};

module.exports = endPoints;