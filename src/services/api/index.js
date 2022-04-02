const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login`,
    recoveryPassword: `${API}/api/${VERSION}/auth/recovery`,
  },
  profile: {
    getProfile: `${API}/api/${VERSION}/profile`,
    getOrders: `${API}/api/${VERSION}/profile/my-orders`,
    placeOrder: `${API}/api/${VERSION}/profile/place-order`,
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
    updateUser: `${API}/api/${VERSION}/users`,
  },
};

module.exports = endPoints;