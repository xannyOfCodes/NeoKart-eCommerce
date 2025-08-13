import React from 'react'
import type { Product } from '../../types/product'
import ProductRating from './ProductRating';
import { useAppDispatch } from '../../store/hook';
import { addToCartAPI } from '../../features/cart/cartSlice';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import WishlistButton from '../WishlistButton';


type Props = {
    product: Product;
}

const ProductDetailInfo: React.FC <Props> = ({ product }) => {

    const discountedPrice = (
        product.price - ( product.price * product.discountPercentage ) / 100).toFixed(2)

        const dispatch = useAppDispatch();
        const { user } = useAuth(); 
        const userId = user?.id;

        const handleAddToCart = async () => {
  if (!userId) {
    toast.error("Please log in first!");
    return;
  }

  try {
    await dispatch(addToCartAPI({
      userId,
      productId: product.id,
      quantity: 1
    })).unwrap(); 

    toast.success("Item added to cart!");
  } catch (err) {
    toast.error("Failed to add item to cart");
  }
};



  return (
    <div>
       <div className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">{product?.title}</h1>
      <p className="text-sm text-gray-500">Brand: {product?.brand}</p>

      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-red-600">${discountedPrice}</span>
        <span className="line-through text-gray-400">${product?.price}</span>
        <span className="text-sm text-green-600">
          -{product?.discountPercentage}%
        </span>
      </div>

      <ProductRating rating={product?.rating} />

      <p className="text-sm text-gray-700">{product?.description}</p>

      <div className="flex gap-4 mt-4">
        <button 
        onClick={handleAddToCart}
        className="px-4 py-2 bg-red-700 text-white text-sm rounded">
          Add to Cart
        </button>
        {/* <button 
        onClick={handleAddToWishlist}
        className="px-4 py-2 border border-red-700 text-red-500 text-sm rounded">
          Wishlist
        </button> */}
        <WishlistButton
          product={product}
          icon={<span className="px-4 py-2 border border-red-700 text-red-500 text-sm rounded">Wishlist</span>}
        />
      </div>
    </div>
    </div>
  )
}

export default ProductDetailInfo
