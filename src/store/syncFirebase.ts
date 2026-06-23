import { collection, onSnapshot, doc, setDoc, addDoc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useStore, Product, Order, Customer, Settings } from './useStore';

let initialized = false;

export function initFirebase() {
  if (initialized) return;
  initialized = true;

  const { setProducts, setOrders, setCustomers, setSettings } = useStore.getState();

  // Listen to Products
  onSnapshot(collection(db, 'products'), (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    if (products.length > 0) setProducts(products);
  }, (error) => console.error("Error listening to products:", error));

  // Listen to Orders
  onSnapshot(collection(db, 'orders'), (snapshot) => {
    const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    if (orders.length > 0) setOrders(orders);
  }, (error) => console.error("Error listening to orders:", error));

  // Listen to Customers
  onSnapshot(collection(db, 'customers'), (snapshot) => {
    const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Customer));
    if (customers.length > 0) setCustomers(customers);
  }, (error) => console.error("Error listening to customers:", error));

  // Listen to Settings
  onSnapshot(doc(db, 'settings', 'global'), (docSnap) => {
    if (docSnap.exists()) {
      setSettings(docSnap.data() as Settings);
    }
  }, (error) => console.error("Error listening to settings:", error));
}

// Firebase Actions
export const addProductFB = async (product: Omit<Product, 'id'>) => {
  await addDoc(collection(db, 'products'), product);
};

export const updateProductFB = async (id: string, product: Partial<Product>) => {
  await updateDoc(doc(db, 'products', id), product);
};

export const deleteProductFB = async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
};

export const addOrderFB = async (order: Omit<Order, 'id'>) => {
  await addDoc(collection(db, 'orders'), order);
};

export const updateOrderStatusFB = async (id: string, status: Order['status']) => {
  await updateDoc(doc(db, 'orders', id), { status });
};

export const addCustomerFB = async (customer: Omit<Customer, 'id'>) => {
  await addDoc(collection(db, 'customers'), customer);
};

export const updateSettingsFB = async (settings: Partial<Settings>) => {
  await setDoc(doc(db, 'settings', 'global'), settings, { merge: true });
};
