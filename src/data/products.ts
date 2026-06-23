import { Product } from '../store/useStore';

export const products: Product[] = [
  {
    id: "disp-1",
    name: "Matic Prime 4-Hose Dispenser",
    price: 4500000,
    image: "https://images.unsplash.com/photo-1626015509743-34e8d35688a2?auto=format&fit=crop&q=80&w=800",
    stock: true,
    category: "Fuel Dispensers",
    description: "High-performance luxury fuel dispenser with dual-display and high flow rate."
  },
  {
    id: "disp-2",
    name: "Matic Elite Twin Hose",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1545620958-3cc08182746b?auto=format&fit=crop&q=80&w=800",
    stock: true,
    category: "Fuel Dispensers",
    description: "Compact, highly reliable twin hose dispenser."
  },
  {
    id: "part-1",
    name: "High Flow Nozzle Automatic",
    price: 150000,
    image: "https://images.unsplash.com/photo-1610486045610-d4fa24b5ba9c?auto=format&fit=crop&q=80&w=800",
    stock: true,
    category: "Spare Parts",
    description: "Automatic shut-off high flow fuel nozzle for premium dispensers."
  },
  {
    id: "part-2",
    name: "Electronic Calibration Unit",
    price: 320000,
    image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=800",
    stock: false,
    category: "Spare Parts",
    description: "Digital calibration board for accurate metering."
  },
  {
    id: "disp-3",
    name: "Matic Heavy Duty 8-Hose",
    price: 8500000,
    image: "https://images.unsplash.com/photo-1594895697334-72fb9b276686?auto=format&fit=crop&q=80&w=800",
    stock: true,
    category: "Fuel Dispensers",
    description: "Industrial grade multi-product dispenser."
  },
  {
    id: "part-3",
    name: "Premium Fuel Filter",
    price: 45000,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    stock: true,
    category: "Spare Parts",
    description: "High-capacity micro filter."
  }
];
