import { ShoppingCart } from 'lucide-react';
import { type FC } from 'react'
import { useNavigate } from 'react-router-dom';


type CartIconProps ={
    itemCount?: number;
}
const CartIcon: FC<CartIconProps> = ({ itemCount = 0}) => {

    const navigate = useNavigate()
    const handleCartClick = () => {
        navigate("/cart")
    }

    
  return (
    <div onClick={handleCartClick}
    className='relative inline-block'>
        <button
        className='text-lg font-bold h-[2.5rem] w-[2.5rem] text-zinc-800 bg-white rounded-full flex items-center justify-center
        dark:bg-zinc-700'>
            <ShoppingCart className='dark:text-zinc-100'/>
        </button>
        {
            itemCount > 0 && (
                <span className='absolute top-[-2px] right-0 text-[10px] font-semibold w-[1.3rem] h-[1.3rem] bg-red-700 text-zinc-100 rounded-full flex items-center justify-center'>
                    {itemCount}
                </span>
            )
        }
    </div>
  )
}

export default CartIcon
