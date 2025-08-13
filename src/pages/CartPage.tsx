import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, selectCart, addToCartAPI, deleteFromCartAPI } from "../features/cart/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { Plus, Minus, Trash } from "lucide-react";
import { toast } from "react-toastify";
import type { AppDispatch } from "../store/store";
import { Link } from "react-router-dom";
import BackArrow from "../components/BackArrow";


const CartPage = () => {
  // Get cart items from Redux store using selector
  const cartItems = useSelector(selectCart);

  // Get logged-in user info from AuthContext
  const { user } = useAuth();

  // Typed dispatch (AppDispatch) so Redux Toolkit async thunks work without TS errors
  const dispatch = useDispatch<AppDispatch>();

  /**
   * Fetch the user's cart from the API when the component first mounts
   * or when `user` changes.
   */
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart(user.id)); // Fetch cart from backend
    }
  }, [user, dispatch]);

  /**
   * Increase the quantity of a product by 1
   */
  const handleIncrease = (productId: number, quantity: number) => {
    dispatch(addToCartAPI({ userId: user.id, productId, quantity: quantity + 1 }))
      .unwrap() // Convert async thunk result to a normal promise
      .then(() => toast.success("Quantity increased"))
      .catch(() => toast.error("Failed to increase quantity"));
  };

  /**
   * Decrease the quantity of a product by 1 (only if quantity > 1)
   */
  const handleDecrease = (productId: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(addToCartAPI({ userId: user.id, productId, quantity: quantity - 1 }))
        .unwrap()
        .then(() => toast.success("Quantity decreased"))
        .catch(() => toast.error("Failed to decrease quantity"));
    }
  };

  /**
   * Deletes a product from the cart
   */
  const handleDelete = (productId: number) => {
  dispatch(deleteFromCartAPI({ cartId: 1, productId })) // Dummy API always uses cartId=1
    .unwrap()
    .then(() => toast.success("Item removed"))
    .catch(() => toast.error("Failed to remove item"));
};


  /**
   * Calculate total price by summing (price × quantity) for all cart items
   */
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="mb-50 md:w-[80%] md:mx-auto">
      {/* Cart Title */}
      <div className="flex items-center justify-between px-5">
        <h1>
          <BackArrow/>
        </h1>
        <h1 className="text-xl font-semibold mb-4 text-zinc-800 p-[1rem]">
          My <span className="font-light border-b-1">Cart</span>
        </h1>
      </div>

      {/* Cart Item List */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-x-5 bg-gray-200 rounded-xl mb-2 p-5 relative m-[1rem]"
        >
          {/* Product Image */}
          <div className="flex items-center gap-4 bg-gray-300 h-full rounded-xl">
            <Link to={`/product/${item.id}`}>
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-20 h-20 object-cover"
              />
            </Link>
          </div>

          {/* Product Info */}
          <div className="text-zinc-800">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p>${item.price}</p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-x-3 mt-3">
              <button
                onClick={() => handleDecrease(item.id, item.quantity)}
                className="bg-gray-700/30 rounded-full p-0.5"
              >
                <Minus className="w-5 h-5 text-zinc-50" />
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => handleIncrease(item.id, item.quantity)}
                className="bg-red-600 rounded-full p-0.5"
              >
                <Plus className="w-5 h-5 text-zinc-50 font-bold" />
              </button>
            </div>
          </div>

          {/* Remove Item (Trash Icon) */}
          <div className="self-end absolute right-5">
            <Trash onClick={() => handleDelete(item.id)}
            className="text-red-700" />
          </div>
        </div>
      ))}

      {/* Cart Total */}
      {cartItems.length > 0 && (
        <div className="mt-5 p-4 border-t-1 bg-gray-100 border-gray-400 rounded-2xl w-full fixed bottom-0 z-10
        md:w-[80%] md:mx-auto">
          <p className="text-lg font-semibold flex items-center justify-between
          md:px-5">
            <span className="text-gray-400 font-semibold">Total Price:</span> <span className="text-zinc-700">${totalPrice.toFixed(2)}</span>
          </p>
          <button className="bg-red-500 block w-full px-5 py-3 text-zinc-50 rounded-xl mt-10">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
