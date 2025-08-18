import {
  Brush,
  SprayCan,
  Sofa,
  ShoppingBasket,
  Home,
  Utensils,
  Laptop,
  Shirt,
 Footprints,
  Watch,
  Plug,
  Bike,
  Sparkles,
  Smartphone,
  Dumbbell,
  Glasses,
  Tablet,
  ShirtIcon,
  Car,
  Briefcase,
  Sparkle,
  Gem,
  Crown,
} from "lucide-react";


export type CategoryItem = {
    name: string;
    slug: string;
    icon: React.ElementType;
}

export const categories: CategoryItem[] = [
  { name: "Beauty", slug: "beauty", icon: Brush },
  { name: "Fragrances", slug: "fragrances", icon: SprayCan },
  { name: "Furniture", slug: "furniture", icon: Sofa },
  { name: "Groceries", slug: "groceries", icon: ShoppingBasket },
  { name: "Home Decor", slug: "home-decoration", icon: Home },
  { name: "Kitchen", slug: "kitchen-accessories", icon: Utensils },
  { name: "Laptops", slug: "laptops", icon: Laptop },
  { name: "Shirts", slug: "mens-shirts", icon: Shirt },
  { name: "Shoes", slug: "mens-shoes", icon: Footprints },
  { name: "Watches", slug: "mens-watches", icon: Watch },
  { name: "Accessories", slug: "mobile-accessories", icon: Plug },
  { name: "Motorcycle", slug: "motorcycle", icon: Bike },
  { name: "Skin Care", slug: "skin-care", icon: Sparkles },
  { name: "Smartphones", slug: "smartphones", icon: Smartphone },
  { name: "Sports", slug: "sports-accessories", icon: Dumbbell },
  { name: "Sunglasses", slug: "sunglasses", icon: Glasses },
  { name: "Tablets", slug: "tablets", icon: Tablet },
  { name: "Tops", slug: "tops", icon: ShirtIcon },
  { name: "Vehicle", slug: "vehicle", icon: Car },
  { name: "Bags", slug: "womens-bags", icon: Briefcase },
  { name: "Dresses", slug: "womens-dresses", icon: Sparkle },
  { name: "Jewellery", slug: "womens-jewellery", icon: Gem },
  { name: "Shoes", slug: "womens-shoes", icon: Crown },
  { name: "Watches", slug: "womens-watches", icon: Watch },
];
