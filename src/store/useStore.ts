import { create } from 'zustand';
import { 
  addProductFB, 
  updateProductFB, 
  deleteProductFB, 
  addOrderFB, 
  updateOrderStatusFB, 
  addCustomerFB, 
  updateSettingsFB 
} from './syncFirebase';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: boolean;
  category: string;
  description?: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
  total: number;
  items: CartItem[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinDate: string;
}

export interface Settings {
  siteName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface CartItem extends Product {
  quantity: number;
}

import { products as initialProducts } from '../data/products';

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  isAdmin: boolean;
  setAdmin: (status: boolean) => void;
  
  isAIOpen: boolean;
  setAIOpen: (isOpen: boolean) => void;

  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  orders: Order[];
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;

  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;

  settings: Settings;
  setSettings: (settings: Settings) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  
  isAdmin: false,
  setAdmin: (status) => set({ isAdmin: status }),
  
  isAIOpen: false,
  setAIOpen: (isOpen) => set({ isAIOpen: isOpen }),

  products: initialProducts,
  setProducts: (products) => set({ products }),
  addProduct: (product) => {
    addProductFB(product);
    set((state) => ({ products: [...state.products, { ...product, id: `temp-${Date.now()}` }] }));
  },
  updateProduct: (id, updatedProduct) => {
    updateProductFB(id, updatedProduct);
    set((state) => ({
      products: state.products.map(p => p.id === id ? { ...p, ...updatedProduct } : p)
    }));
  },
  deleteProduct: (id) => {
    deleteProductFB(id);
    set((state) => ({ products: state.products.filter(p => p.id !== id) }));
  },

  orders: [
    { id: '#ORD-001', customerName: 'Aliko Dangote', date: '2024-03-20', status: 'Completed', total: 4500000, items: [] },
    { id: '#ORD-002', customerName: 'Femi Otedola', date: '2024-03-21', status: 'Pending', total: 2800000, items: [] },
    { id: '#ORD-003', customerName: 'Mike Adenuga', date: '2024-03-22', status: 'Processing', total: 8500000, items: [] }
  ],
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => {
    addOrderFB(order);
    set((state) => ({ orders: [{ ...order, id: `temp-${Date.now()}` }, ...state.orders] }));
  },
  updateOrderStatus: (id, status) => {
    updateOrderStatusFB(id, status);
    set((state) => ({
      orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
    }));
  },

  customers: [
    { id: 'CUST-1', name: 'Aliko Dangote', email: 'aliko@dangote.com', phone: '08012345678', ordersCount: 5, totalSpent: 22500000, joinDate: '2023-01-15' },
    { id: 'CUST-2', name: 'Femi Otedola', email: 'femi@forte.com', phone: '08023456789', ordersCount: 3, totalSpent: 8400000, joinDate: '2023-05-20' },
    { id: 'CUST-3', name: 'Mike Adenuga', email: 'mike@globacom.com', phone: '08055555555', ordersCount: 8, totalSpent: 45000000, joinDate: '2022-11-10' }
  ],
  setCustomers: (customers) => set({ customers }),
  addCustomer: (customer) => {
    addCustomerFB(customer);
    set((state) => ({ customers: [{ ...customer, id: `temp-${Date.now()}` }, ...state.customers] }));
  },

  settings: {
    siteName: 'Matic FUELTEC',
    phone: '09028813221',
    whatsapp: '+2349028813221',
    email: 'Maticlimited@gmail.com',
    address: '33 Idimu Road, Olorun Adaba Bus Stop'
  },
  setSettings: (settings) => set({ settings }),
  updateSettings: (newSettings) => {
    set((state) => {
      const updated = { ...state.settings, ...newSettings };
      updateSettingsFB(updated);
      return { settings: updated };
    });
  }
}));
