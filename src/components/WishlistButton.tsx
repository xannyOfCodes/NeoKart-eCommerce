import React from "react";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { toggleWishlist } from "../features/wishList/wishListSlice";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

interface WishlistButtonProps {
  product: { id: number; title: string; price: number; thumbnail: string }; // product data
  icon?: React.ReactNode; // optional custom icon/text
}

const WishlistButton: React.FC<WishlistButtonProps> = ({product, icon,}) => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const { user } = useAuth();
  const userId = user?.id;

  const handleToggle = () => {
    if (!userId) {
      toast.error("Please log in first!");
      return;
    }
    dispatch(toggleWishlist(product));
    toast.success(isInWishlist ? "Removed from wishlist!" : "Added to wishlist!");
  };

  return (
    <div
      onClick={handleToggle}
      className={`p-2 group rounded-full cursor-pointer transition-colors duration-200
        ${isInWishlist ? "bg-red-100" : "bg-gray-100"}
        hover:bg-red-100`}
    >
      {icon ? (
        <span
          className={`${isInWishlist ? "text-red-500" : "text-zinc-500"} group-hover:text-red-500`}
        >
          {icon}
        </span>
      ) : (
        <Heart
          className={`h-5 w-5 ${
            isInWishlist ? "text-red-500" : "text-zinc-500"
          } group-hover:text-red-500`}
        />
      )}
    </div>
  );
};

export default WishlistButton;
