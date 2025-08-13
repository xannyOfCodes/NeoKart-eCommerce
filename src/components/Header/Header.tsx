import React, { type FC } from 'react'
import CartIcon from './CartIcon'
import SearchIcon from './SearchIcon'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import { selectCart } from '../../features/cart/cartSlice'


type HeaderProps = {
    showSearch?: boolean;
    showCart?: boolean;
}
const Header: FC<HeaderProps> = ({ showSearch = true, showCart = true }) => {
    const cartItems = useSelector(selectCart);
    console.log(cartItems);
    const cartItemsTotal: number = cartItems.length;
    console.log(cartItemsTotal);
    
  return (
    <header className='flex items-center justify-between p-[1rem] md:w-[85%] md:mx-auto'>
        <div><Logo/></div>

        <div className='flex items-center gap-x-5'>
            <div>
                {showSearch && <SearchIcon/>}
            </div>

            <div>
                {showCart && <CartIcon itemCount={cartItemsTotal}/>}
            </div>
        </div>
    </header>
  )
}

export default Header
