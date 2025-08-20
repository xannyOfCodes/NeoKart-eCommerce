import { useEffect, useState } from 'react';
import axios from 'axios';
import SpecialProductCard from './SpecialProductCard';
import type { Product } from '../../types/product';
import { BASE_URL } from '../../api/baseUrl';


const SpecialForYou = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(`${BASE_URL}/products`);
      const all = res.data.products;
      const random = all.sort(() => 0.5 - Math.random()).slice(0, 6); // pick 6
      setProducts(random);
    };

    getProducts();
  }, []);

  return (
    <div className="my-8 space-y-4 p-[1rem] mt-10
    md:w-[90%] md:mx-auto">
      <div className="flex items-center md:justify-center">
        <h2 className='text-sm font-semibold text-zinc-800 uppercase
      md:text-center md:text-lg
      dark:text-zinc-100'>Special <span className='font-light border-b-1'>for You</span></h2>
      </div>

      <div className="flex items-center gap-3 overflow-x-scroll mt-3
      md:flex-wrap md:justify-center md:overflow-hidden p-5">
        {products.map((product) => (
          <SpecialProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SpecialForYou;
