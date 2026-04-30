import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Heart, 
  Bell, 
  Store, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  PlusCircle, 
  Package, 
  ChevronRight,
  Star,
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  Filter,
  MapPin,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

// --- Types ---
interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  vendor: string;
  category: string;
  description: string;
  discount: number;
}

interface CartItem extends Product {
  quantity: number;
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Wireless Noise-Canceling Headphones - Premium Sound",
    price: 129.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 1240,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/wireless-headphones-67ae207a-1777523490694.webp",
    vendor: "AudioTech Official Store",
    category: "Tech & Electronics",
    description: "Experience world-class noise cancellation and superior audio quality. Perfect for travel, work, or pure relaxation.",
    discount: 35
  },
  {
    id: "2",
    title: "NextGen Smart Watch - Fitness & Health Tracker",
    price: 49.99,
    originalPrice: 89.99,
    rating: 4.6,
    reviews: 856,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/smart-watch-197c3077-1777523490430.webp",
    vendor: "SmartLife Wearables",
    category: "Tech & Electronics",
    description: "Track your health and stay connected with our latest smart watch. Features include heart rate monitoring, sleep tracking, and more.",
    discount: 44
  },
  {
    id: "3",
    title: "Mechanical Gaming Keyboard - RGB Backlit",
    price: 74.50,
    originalPrice: 110.00,
    rating: 4.9,
    reviews: 532,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/mechanical-keyboard-e90d9466-1777523491401.webp",
    vendor: "Gaming Gear Pro",
    category: "Tech & Electronics",
    description: "Enhance your gaming experience with our ultra-responsive mechanical keyboard. Fully customizable RGB lighting.",
    discount: 32
  },
  {
    id: "4",
    title: "High Precision Gaming Mouse - Lightweight Design",
    price: 35.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 421,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/gaming-mouse-167bb983-1777523491290.webp",
    vendor: "Gaming Gear Pro",
    category: "Tech & Electronics",
    description: "Professional grade gaming mouse with high-precision sensor and ergonomic design for long gaming sessions.",
    discount: 40
  },
  {
    id: "5",
    title: "Smart LED Strip Lights - 16 Million Colors",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviews: 2150,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/led-strip-lights-2ec802d2-1777523491318.webp",
    vendor: "HomeVibe Lighting",
    category: "Home & Garden",
    description: "Transform your living space with our smart LED strips. Control via app or voice for the perfect ambiance.",
    discount: 33
  },
  {
    id: "6",
    title: "Portable Power Bank 20000mAh - Fast Charging",
    price: 29.50,
    originalPrice: 45.00,
    rating: 4.8,
    reviews: 340,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/portable-power-bank-2a5d6c97-1777523490791.webp",
    vendor: "TechGo Mobile",
    category: "Tech & Electronics",
    description: "Never run out of battery again. Compact, high-capacity power bank for all your mobile devices.",
    discount: 34
  },
  {
    id: "7",
    title: "7-in-1 USB-C Hub - Multiport Adapter",
    price: 42.99,
    originalPrice: 65.00,
    rating: 4.6,
    reviews: 189,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/usb-c-hub-e031f55f-1777523490303.webp",
    vendor: "ConnectPro",
    category: "Tech & Electronics",
    description: "Expand your connectivity with our sleek 7-in-1 USB-C hub. HDMI, USB 3.0, SD card slot, and more.",
    discount: 34
  },
  {
    id: "8",
    title: "Smartphone Gimbal Stabilizer - 3-Axis",
    price: 89.00,
    originalPrice: 149.00,
    rating: 4.7,
    reviews: 567,
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/smartphone-gimbal-b3dc4e5c-1777523491421.webp",
    vendor: "Visionary Tech",
    category: "Photography",
    description: "Create cinematic videos with your smartphone. Foldable, portable, and extremely easy to use.",
    discount: 40
  }
];

const CATEGORIES = [
  { name: "Tech & Electronics", icon: <Package className="w-4 h-4" /> },
  { name: "Fashion", icon: <User className="w-4 h-4" /> },
  { name: "Home & Garden", icon: <Store className="w-4 h-4" /> },
  { name: "Beauty & Health", icon: <Heart className="w-4 h-4" /> },
  { name: "Sports & Outdoors", icon: <Globe className="w-4 h-4" /> },
  { name: "Toys & Hobbies", icon: <Settings className="w-4 h-4" /> },
  { name: "Automotive", icon: <Settings className="w-4 h-4" /> },
  { name: "Jewelry", icon: <Star className="w-4 h-4" /> }
];

// --- Components ---

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="bg-[#ff4747] text-white py-1 px-4 text-[11px] font-medium flex justify-between items-center">
        <div className="flex gap-4">
          <span className="cursor-pointer hover:underline flex items-center gap-1"><Globe className="w-3 h-3" /> Ship to / USD</span>
          <span className="cursor-pointer hover:underline hidden sm:inline">Help Center</span>
        </div>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:underline">Download App</span>
          <Link to="/vendor/dashboard" className="hover:underline">Seller Center</Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-3 flex items-center gap-4 md:gap-8">
        <Link to="/" className="text-2xl font-black text-[#ff4747] flex items-center gap-1 shrink-0 tracking-tighter">
          <ShoppingCart className="w-8 h-8 fill-current" />
          <span className="hidden md:inline italic uppercase">ShopExpress</span>
        </Link>

        <div className="flex-1 relative max-w-2xl">
          <div className="relative flex items-center">
            <Input 
              placeholder="I'm looking for..." 
              className="pr-12 rounded-full border-2 border-[#ff4747] focus-visible:ring-0 h-10 md:h-11 bg-slate-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="absolute right-1 top-1 bottom-1 rounded-full px-5 h-8 md:h-9 bg-[#ff4747] hover:bg-[#e63e3e]">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-col h-auto py-1 px-2 gap-0.5 hover:bg-transparent">
                <User className="w-5 h-5 md:w-6 md:h-6" />
                <span className="text-[10px] hidden md:block">Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 p-4">
              <DropdownMenuLabel className="text-lg font-bold p-0 mb-1">Welcome!</DropdownMenuLabel>
              <p className="text-xs text-slate-500 mb-4">Sign in for the best experience</p>
              <Button className="w-full mb-2 bg-[#ff4747]" onClick={() => navigate("/login")}>Sign In</Button>
              <Button variant="outline" className="w-full mb-4">Register</Button>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-2"><Package className="w-4 h-4 mr-2" /> My Orders</DropdownMenuItem>
              <DropdownMenuItem className="py-2"><Heart className="w-4 h-4 mr-2" /> Wish List</DropdownMenuItem>
              <DropdownMenuItem className="py-2"><Bell className="w-4 h-4 mr-2" /> Message Center</DropdownMenuItem>
              <DropdownMenuItem className="py-2"><MapPin className="w-4 h-4 mr-2" /> Shipping Address</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/cart" className="relative">
            <Button variant="ghost" className="flex flex-col h-auto py-1 px-2 gap-0.5 hover:bg-transparent">
              <div className="relative">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] bg-[#ff4747] text-white border-white border-2">
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span className="text-[10px] hidden md:block">Cart</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide flex gap-6 text-[13px] font-medium text-slate-700">
        <div className="flex items-center gap-1 text-[#ff4747] font-bold cursor-pointer"><Menu className="w-4 h-4" /> Categories</div>
        {CATEGORIES.map((cat) => (
          <span key={cat.name} className="cursor-pointer hover:text-[#ff4747]">{cat.name}</span>
        ))}
      </div>
    </nav>
  );
};

const ProductCard = ({ product, addToCart }: { product: Product, addToCart: (p: Product) => void }) => {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border group flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-[#ff4747] text-white font-black text-[10px]">
            -{product.discount}%
          </Badge>
        )}
      </Link>
      <CardContent className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="text-[13px] leading-tight font-medium line-clamp-2 hover:text-[#ff4747] transition-colors mb-2 min-h-[32px]">
          {product.title}
        </Link>
        <div className="mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-[#ff4747]">${product.price.toFixed(2)}</span>
            <span className="text-[10px] text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500">
            <div className="flex items-center text-orange-400 font-bold">
              <Star className="w-2.5 h-2.5 fill-current" />
              <span className="ml-0.5">{product.rating}</span>
            </div>
            <span>| {product.reviews} sold</span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-[#00b21e] font-medium">
            <Truck className="w-3 h-3" />
            <span>Free Shipping</span>
          </div>
        </div>
      </CardContent>
    </motion.div>
  );
};

const Home = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  return (
    <div className="container mx-auto px-4 py-4 md:py-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-10">
        <div className="lg:col-span-2 hidden lg:block bg-white rounded-xl shadow-sm border p-4 h-full">
          <ul className="space-y-4">
            {CATEGORIES.map((cat) => (
              <li key={cat.name} className="flex items-center gap-3 group cursor-pointer text-slate-700 hover:text-[#ff4747]">
                <span className="text-slate-400 group-hover:text-[#ff4747]">{cat.icon}</span>
                <span className="text-[13px] font-medium">{cat.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7 overflow-hidden rounded-xl shadow-sm border aspect-[21/9] lg:aspect-auto lg:h-[450px] relative group">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/summer-sale-banner-e0180c31-1777523494482.webp" 
            alt="Summer Sale" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6 md:px-12 text-white">
            <Badge className="w-fit mb-2 md:mb-4 bg-yellow-400 text-black hover:bg-yellow-500 font-bold">SUMMER CARNIVAL</Badge>
            <h2 className="text-3xl md:text-5xl font-black mb-2 leading-tight">UP TO 80% OFF</h2>
            <p className="text-sm md:text-xl mb-4 md:mb-8 opacity-90 max-w-md">Everything you need for the perfect summer vacation.</p>
            <Button size="lg" className="w-fit rounded-full bg-white text-[#ff4747] hover:bg-slate-100 font-black px-6 md:px-10">
              SHOP NOW
            </Button>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4 flex flex-col">
          <div className="bg-white rounded-xl shadow-sm border p-5 flex flex-col items-center text-center flex-1">
            <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <User className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-bold mb-4">Welcome to ShopExpress</p>
            <div className="flex flex-col gap-2 w-full">
              <Button className="w-full rounded-full text-xs font-bold bg-[#ff4747]">Join</Button>
              <Button variant="outline" className="w-full rounded-full text-xs font-bold">Sign In</Button>
            </div>
          </div>
          <div className="bg-orange-50 rounded-xl shadow-sm border border-orange-100 p-5 flex flex-col items-center text-center flex-1 relative overflow-hidden">
             <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-100 rounded-full"></div>
             <h4 className="font-black text-[#ff4747] text-sm mb-1 uppercase">New User Only</h4>
             <p className="text-[11px] text-slate-600 mb-3">Your first deal: $0.01</p>
             <img 
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/5f7372f7-3b66-46eb-92aa-4545f5f236d1/smart-watch-197c3077-1777523490430.webp" 
                className="w-20 h-20 object-contain drop-shadow-xl mb-2"
             />
             <Button variant="link" className="text-xs font-black text-[#ff4747] p-0 h-auto">GET IT NOW</Button>
          </div>
        </div>
      </div>

      {/* Flash Deals */}
      <section className="mb-10">
        <Card className="border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#ff4747] to-[#ff9000] text-white py-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-black italic uppercase tracking-tighter">Super Deals</h2>
              <div className="bg-black/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                Ends in: <span className="bg-white text-black px-1 rounded">04</span>:<span className="bg-white text-black px-1 rounded">23</span>:<span className="bg-white text-black px-1 rounded">59</span>
              </div>
            </div>
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 text-xs font-bold">View More</Button>
          </CardHeader>
          <CardContent className="p-4 md:p-6 bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {PRODUCTS.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recommended */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black">More to Love</h2>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="rounded-full"><Filter className="w-3 h-3 mr-2" /> Filter</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {[...PRODUCTS, ...PRODUCTS].map((product, idx) => (
            <ProductCard key={`${product.id}-${idx}`} product={product} addToCart={addToCart} />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button size="lg" variant="outline" className="px-12 rounded-full font-bold border-2 border-[#ff4747] text-[#ff4747] hover:bg-[#ff4747] hover:text-white">
            See More
          </Button>
        </div>
      </section>
    </div>
  );
};

const ProductDetails = ({ addToCart }: { addToCart: (p: Product) => void }) => {
  const navigate = useNavigate();
  const product = PRODUCTS[0];
  const [quantity, setQuantity] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex items-center gap-2 mb-6 text-sm text-slate-500">
        <Link to="/" className="hover:text-[#ff4747]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="hover:text-[#ff4747] cursor-pointer">{product.category}</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-900 truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 md:p-10 rounded-3xl border shadow-sm">
        {/* Images */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden border group">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-xl border-2 overflow-hidden cursor-pointer transition-all ${i === selectedImg ? 'border-[#ff4747]' : 'border-transparent hover:border-slate-300'}`}
                onClick={() => setSelectedImg(i)}
              >
                <img src={product.image} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#ff4747] font-black">CHOICE</Badge>
              <span className="text-xs font-bold text-[#ff4747] flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Buyer Protection</span>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full"><Heart className="w-5 h-5" /></Button>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center text-orange-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${s <= 4 ? 'fill-current' : ''}`} />
              ))}
              <span className="ml-2 text-slate-900 font-black">{product.rating}</span>
            </div>
            <span className="text-slate-400 text-sm font-medium">{product.reviews} Reviews</span>
            <span className="text-slate-400 text-sm font-medium">12,543 orders</span>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl md:text-5xl font-black text-[#ff4747]">${product.price.toFixed(2)}</span>
              <span className="text-lg text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
              <Badge className="bg-[#ff4747] text-[10px] font-black">-{product.discount}%</Badge>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00b21e] mb-4">
              <div className="bg-[#00b21e]/10 p-1 rounded-full"><Truck className="w-3 h-3" /></div>
              Free Shipping • Delivered by Mar 15
            </div>
            <p className="text-xs text-slate-500">Price includes VAT where applicable.</p>
          </div>

          <div className="space-y-6 mb-10">
            <div>
              <h4 className="font-black text-sm mb-3 uppercase tracking-wider">Quantity</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-slate-200 rounded-full bg-white">
                  <Button variant="ghost" className="rounded-full w-10 h-10 p-0 hover:bg-slate-100" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                  <span className="w-10 text-center font-black">{quantity}</span>
                  <Button variant="ghost" className="rounded-full w-10 h-10 p-0 hover:bg-slate-100" onClick={() => setQuantity(quantity + 1)}>+</Button>
                </div>
                <span className="text-xs font-medium text-slate-400">1,234 pieces available</span>
              </div>
            </div>
            
            <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Store className="w-6 h-6 text-[#ff4747]" />
                <div>
                  <p className="text-sm font-black">{product.vendor}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">98.5% Positive Feedback</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full font-bold">Follow</Button>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <Button 
              className="flex-1 h-14 text-lg font-black rounded-full bg-[#ff4747] hover:bg-[#e63e3e] shadow-lg shadow-[#ff4747]/20"
              onClick={() => {
                addToCart(product);
                toast.success("Added to cart!");
                navigate("/cart");
              }}
            >
              BUY NOW
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-14 text-lg font-black rounded-full border-2 border-[#ff4747] text-[#ff4747] hover:bg-[#ff4747]/5 shadow-sm"
              onClick={() => {
                addToCart(product);
                toast.success("Added to cart!");
              }}
            >
              ADD TO CART
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cart = ({ cart, updateQuantity, removeItem }: { 
  cart: CartItem[], 
  updateQuantity: (id: string, delta: number) => void,
  removeItem: (id: string) => void
}) => {
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'success'>('cart');
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (checkoutStep === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center text-center">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl border max-w-lg"
        >
          <div className="w-20 h-20 bg-[#00b21e]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#00b21e]" />
          </div>
          <h1 className="text-3xl font-black mb-4">Order Successful!</h1>
          <p className="text-slate-500 mb-8">Thank you for your purchase. We've sent a confirmation email to your registered address.</p>
          <div className="space-y-3">
            <Button className="w-full h-12 font-bold bg-[#ff4747]" onClick={() => navigate("/")}>Track My Order</Button>
            <Button variant="ghost" className="w-full" asChild><Link to="/">Continue Shopping</Link></Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-black mb-10">Shopping Cart <span className="text-slate-400 font-medium text-lg ml-2">({cart.length} items)</span></h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border shadow-sm">
          <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-200">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black mb-3">Your cart is empty</h2>
          <p className="text-slate-500 mb-10">Items added to your cart will appear here.</p>
          <Link to="/">
            <Button size="lg" className="rounded-full px-12 bg-[#ff4747] font-bold">Shop Now</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-4 rounded-xl border flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
               <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 rounded"></div>
                  <span>SELECT ALL (1)</span>
               </div>
               <span>Operation</span>
            </div>
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl border flex flex-col md:flex-row gap-6 group hover:border-[#ff4747]/30 transition-colors">
                <div className="flex items-start gap-4">
                   <div className="w-5 h-5 border-2 rounded mt-12 hidden md:block"></div>
                   <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border-2 border-slate-50 shrink-0 bg-slate-50">
                     <img src={item.image} className="w-full h-full object-cover" />
                   </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between gap-4 mb-2">
                    <h3 className="font-black text-slate-900 leading-tight">{item.title}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="shrink-0 h-8 w-8 text-slate-300 hover:text-[#ff4747]"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Store className="w-3 h-3 text-slate-400" />
                    <span className="text-[11px] font-bold text-slate-500">{item.vendor}</span>
                  </div>
                  
                  <div className="mt-auto flex items-end justify-between">
                    <div className="space-y-1">
                        <div className="text-xl font-black text-[#ff4747]">${item.price.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase">${item.price.toFixed(2)} per unit</div>
                    </div>
                    <div className="flex items-center border-2 border-slate-100 rounded-full bg-slate-50">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-full"
                        onClick={() => updateQuantity(item.id, -1)}
                      >-</Button>
                      <span className="w-10 text-center text-sm font-black">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-full"
                        onClick={() => updateQuantity(item.id, 1)}
                      >+</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-3xl border shadow-lg sticky top-32">
              <h3 className="font-black text-xl mb-8 uppercase italic">Summary</h3>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Subtotal</span>
                  <span className="text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Shipping</span>
                  <span className="text-[#00b21e]">FREE</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Tax & Duties</span>
                  <span className="text-slate-900">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between items-end">
                  <span className="font-black text-sm uppercase">Total</span>
                  <span className="text-3xl font-black text-[#ff4747]">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Button 
                className="w-full h-14 text-lg font-black rounded-full bg-[#ff4747] hover:bg-[#e63e3e] shadow-lg shadow-[#ff4747]/20"
                onClick={() => setCheckoutStep('success')}
              >
                CHECKOUT
              </Button>
              <div className="mt-10 pt-6 border-t text-center space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment methods</p>
                <div className="flex items-center justify-center gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5 grayscale opacity-50" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 grayscale opacity-50" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 grayscale opacity-50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const VendorDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
           <div className="flex items-center gap-2 text-[#ff4747] font-bold mb-2">
              <Store className="w-5 h-5" />
              <span className="uppercase tracking-widest text-xs">Seller Center</span>
           </div>
          <h1 className="text-4xl font-black">Store Overview</h1>
        </div>
        <div className="flex gap-3">
           <Button variant="outline" className="rounded-full font-bold h-12">Analytics</Button>
           <Button className="gap-2 rounded-full h-12 bg-[#ff4747] font-bold">
             <PlusCircle className="w-4 h-4" /> Add New Product
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="rounded-2xl border-2 hover:border-[#ff4747]/30 transition-colors cursor-pointer group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <Badge className="bg-[#00b21e]/10 text-[#00b21e] border-none font-black">+12.5%</Badge>
            </div>
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Total Sales</h3>
            <p className="text-3xl font-black">$14,290</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-2 hover:border-[#ff4747]/30 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                <Package className="w-7 h-7" />
              </div>
              <Badge className="bg-[#00b21e]/10 text-[#00b21e] border-none font-black">+5.2%</Badge>
            </div>
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Active Orders</h3>
            <p className="text-3xl font-black">84</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-2 hover:border-[#ff4747]/30 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center">
                <Star className="w-7 h-7" />
              </div>
              <Badge className="bg-slate-100 text-slate-500 border-none font-black">STABLE</Badge>
            </div>
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Store Rating</h3>
            <p className="text-3xl font-black">4.92</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-2 hover:border-[#ff4747]/30 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                <User className="w-7 h-7" />
              </div>
              <Badge className="bg-[#00b21e]/10 text-[#00b21e] border-none font-black">+24%</Badge>
            </div>
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest">Visitors</h3>
            <p className="text-3xl font-black">2,850</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="rounded-3xl shadow-sm border-2 overflow-hidden">
            <div className="p-8 border-b flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-xl uppercase italic">Recent Transactions</h3>
              <Button variant="ghost" size="sm" className="font-bold text-[#ff4747]">Full History</Button>
            </div>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="p-6">Order ID</th>
                      <th className="p-6">Customer</th>
                      <th className="p-6">Product</th>
                      <th className="p-6">Status</th>
                      <th className="p-6 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-t">
                    {[
                      { id: "#ORD-9021", user: "Alex Johnson", product: "Wireless Headphones", status: "Shipped", amount: "$129.99" },
                      { id: "#ORD-9022", user: "Sarah Smith", product: "Smart Watch", status: "Processing", amount: "$49.50" },
                      { id: "#ORD-9023", user: "Mike Brown", product: "Gaming Mouse", status: "Delivered", amount: "$89.00" },
                      { id: "#ORD-9024", user: "Elena R.", product: "USB-C Hub", status: "Refunded", amount: "$24.99" },
                      { id: "#ORD-9025", user: "John Doe", product: "LED Strips", status: "Delivered", amount: "$19.99" },
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-6 font-black text-slate-400">{order.id}</td>
                        <td className="p-6 font-bold">{order.user}</td>
                        <td className="p-6 text-slate-500">{order.product}</td>
                        <td className="p-6">
                          <Badge 
                            variant="outline" 
                            className={`font-black text-[10px] border-2 uppercase ${
                              order.status === 'Delivered' ? 'border-[#00b21e] text-[#00b21e]' : 
                              order.status === 'Processing' ? 'border-orange-400 text-orange-400' : 
                              order.status === 'Refunded' ? 'border-red-400 text-red-400' : 'border-blue-400 text-blue-400'
                            }`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-6 text-right font-black">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="rounded-3xl shadow-sm border-2 h-full">
            <div className="p-8 border-b bg-slate-50/50">
              <h3 className="font-black text-xl uppercase italic">Store Performance</h3>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                 <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                    <span>Top Region</span>
                    <span className="text-slate-900">United States (42%)</span>
                 </div>
                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#ff4747] h-full w-[42%]"></div>
                 </div>
              </div>
              
              <div className="space-y-4">
                 <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                    <span>Return Rate</span>
                    <span className="text-slate-900">1.2%</span>
                 </div>
                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#00b21e] h-full w-[5%]"></div>
                 </div>
              </div>

              <div className="pt-6">
                <h4 className="font-black text-sm mb-6 uppercase tracking-widest">Recent Inventory</h4>
                <div className="space-y-6">
                  {PRODUCTS.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border shrink-0 bg-slate-50">
                        <img src={product.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black truncate">{product.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Stock: 142 • Sales: {product.reviews}</p>
                      </div>
                      <p className="text-sm font-black text-[#ff4747]">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="w-full h-12 rounded-full font-bold border-2">Go to Inventory</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-slate-400 py-20 mt-20 border-t-8 border-[#ff4747]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl font-black text-white flex items-center gap-2 mb-8 italic uppercase tracking-tighter">
              <ShoppingCart className="w-8 h-8 text-[#ff4747] fill-current" />
              <span>ShopExpress</span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 opacity-70">
              Connecting buyers with millions of vendors worldwide. Quality products at unbeatable prices since 2024.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#ff4747] transition-all cursor-pointer border border-white/10">
                  <div className="w-4 h-4 bg-white/40 rounded-sm"></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.2em] italic">Explore</h4>
            <ul className="space-y-4 text-[13px] font-medium">
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Hot Categories</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Flash Deals</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Store Directory</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Brand Zone</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.2em] italic">Service</h4>
            <ul className="space-y-4 text-[13px] font-medium">
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Buyer Protection</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Disputes & Reports</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Report IPR infringement</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.2em] italic">Collaboration</h4>
            <ul className="space-y-4 text-[13px] font-medium">
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors"><Link to="/vendor/dashboard">Sell on ShopExpress</Link></li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Affiliate Program</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Partner Center</li>
              <li className="hover:text-[#ff4747] cursor-pointer transition-colors">Wholesale App</li>
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-black mb-8 uppercase text-xs tracking-[0.2em] italic">Newsletter</h4>
            <p className="text-xs mb-6 opacity-60 font-medium">Stay updated on latest deals and exclusive offers.</p>
            <div className="flex flex-col gap-3">
              <Input className="bg-white/5 border-white/10 h-12 text-sm focus-visible:ring-[#ff4747] rounded-xl" placeholder="Email address" />
              <Button className="h-12 text-sm px-6 bg-[#ff4747] font-black rounded-xl hover:bg-[#e63e3e]">SUBSCRIBE</Button>
            </div>
          </div>
        </div>
        <Separator className="bg-white/10 mb-10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-black uppercase tracking-widest">
          <p className="opacity-40">© 2024 SHOPEXPRESS INTERNATIONAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 opacity-60">
            <span className="hover:text-[#ff4747] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#ff4747] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#ff4747] cursor-pointer transition-colors">Cookies</span>
            <span className="hover:text-[#ff4747] cursor-pointer transition-colors">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.error("Item removed from cart");
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#f7f8fa] font-sans text-slate-900 flex flex-col selection:bg-[#ff4747] selection:text-white">
        <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/login" element={
              <div className="container mx-auto px-4 py-20 flex justify-center">
                <Card className="w-full max-w-md rounded-3xl shadow-xl border-2">
                  <CardContent className="p-10">
                    <div className="text-center mb-10">
                       <ShoppingCart className="w-12 h-12 text-[#ff4747] mx-auto mb-4 fill-current" />
                       <h2 className="text-3xl font-black italic uppercase tracking-tighter">ShopExpress</h2>
                       <p className="text-sm text-slate-500 font-bold mt-2 uppercase tracking-widest">Sign in to continue</p>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email</label>
                        <Input className="h-12 rounded-xl" placeholder="name@example.com" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Password</label>
                          <span className="text-[10px] font-bold text-[#ff4747] cursor-pointer">Forgot?</span>
                        </div>
                        <Input className="h-12 rounded-xl" type="password" placeholder="••••••••" />
                      </div>
                      <Button className="w-full h-12 font-black rounded-xl bg-[#ff4747] hover:bg-[#e63e3e]">SIGN IN</Button>
                      <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center"><Separator /></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest"><span className="bg-white px-4 text-slate-400">Social Login</span></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 rounded-xl font-bold border-2">Google</Button>
                        <Button variant="outline" className="h-12 rounded-xl font-bold border-2">Facebook</Button>
                      </div>
                      <p className="text-center text-xs font-bold text-slate-500 mt-10">
                        NEW HERE? <span className="text-[#ff4747] font-black cursor-pointer hover:underline">CREATE AN ACCOUNT</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
        <Toaster position="top-center" richColors expand={true} />
      </div>
    </Router>
  );
}