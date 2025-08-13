import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import type { Product } from '../../types/product';
import axios from 'axios';
import ProductImageZoom from './ProductImageZoom';
import ProductDetailInfo from './ProductDetailInfo';
import { BASE_URL } from '../../api/baseUrl';
import BackArrow from '../BackArrow';

const ProductDetail: React.FC = () => {
    const { productId } = useParams(); // get productId from URL
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/products/${productId}`);
        setProduct(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to load product.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div>
      <div className='m-5 p-5 w-5 h-5 bg-zinc-300 rounded-full flex items-center justify-center'><BackArrow/></div>
      <div className="flex flex-col md:flex-row md:items-center w gap-8 py-8 px-4">
        <div className="flex-1">
          <ProductImageZoom images={product?.images} alt={product?.title} />
        </div>

        <div className="flex-1">
          <ProductDetailInfo product={product} />
        </div>
    </div>
    </div>
  )
}

export default ProductDetail
