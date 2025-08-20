import { useSelector, useDispatch } from "react-redux";
import { selectWishlist, removeFromWishlist } from "../features/wishList/wishListSlice";
import { toast } from "react-toastify";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";


const WishlistPage = () => {
  const wishlist = useSelector(selectWishlist);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromWishlist(id));
    toast.success("Removed from wishlist");
  };

  return (
    <div className="p-4 text-zinc-800 md:w-[80%] md:mx-auto">
      <div className="flex items-center justify-between">
        <h1><BackArrow/></h1>
        <h1 className="text-xl font-bold mb-4
        dark:text-zinc-100">My <span className="font-light border-b-1">Wishlist</span> </h1>
      </div>
      <div className="mt-10">
        {wishlist.map((item) => (
        <div key={item.id} className="flex items-center gap-x-5 bg-gray-200 rounded-xl mb-2 p-3 relative
        dark:bg-zinc-800">
          <div className="flex items-center gap-4 bg-gray-300 h-full rounded-xl
          dark:bg-zinc-700">
            <Link to={`/product/${item.id}`}>
                <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover" />
            </Link>
          </div>

            <div className="dark:text-zinc-100">
              <p className="font-semibold">{item.title}</p>
              <p>${item.price}</p>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-red-500 hover:underline self-end absolute right-5"
            >
              <Trash className="text-red-700"/>
            </button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default WishlistPage;
