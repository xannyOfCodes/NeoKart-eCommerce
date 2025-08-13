import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '../../types/product';
import type { FC } from 'react';
import WishlistButton from '../WishlistButton';


type Props = {
  product: Product;
};

const SpecialProductCard: FC<Props> = ({ product }) => {

  
  return (
    <div
      className="w-[80%] h-[50vh] bg-zinc-50 cursor-pointer rounded-xl p-[1rem] shadow-sm transition hover:shadow-md
      md:w-[45%] md:h-[30vh]"
    >
      <div className=" gap-4
      md:flex md:items-center md:justify-between">
        {/* Image */}
        <div className='w-full h-50 bg-gray-100 rounded-lg flex justify-center items-center
        md:h-50 md:w-50'>
          <Link to={`/product/${product.id}`}>
            <img 
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full rounded-lg object-cover"
        />
          </Link>
        </div>

        {/* Info */}
        <div className="flex-1 p-[1rem]">
          <h3 className="text-sm font-semibold text-zinc-800">{product.title}</h3>
          <p className="mt-0.5 text-xs text-gray-500 truncate 
          md:whitespace-normal">{product.description}</p>

          
          <div className='flex items-center justify-between mt-3'>
            {/* price */}
            <div className="flex items-center gap-2">
              {product.discountPercentage > 0 && (
              <span className="text-xs font-bold text-gray-400 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
            <span className="text-sm font-bold text-zinc-800">${product.price}</span>
          </div>

          {/* Wishlist */}
          {/* <div className=' bg-gray-100 p-2 rounded-full hover:bg-red-100 group'>
            <Heart onClick={handleAddToWishlist}
            className="h-5 w-5 text-zinc-500 group-hover:text-red-500" />
          </div> */}
          <WishlistButton
            product={product}
            icon={<Heart className="h-5 w-5" />}
          />
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpecialProductCard;
