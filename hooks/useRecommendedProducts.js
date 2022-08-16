import { useEffect, useState } from 'react';
import firebase from '../services/firebase';

const useRecommendedProducts = (itemsCount) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getRecommendedProducts(itemsCount);

      if (docs.empty) {
        setError('No recommended products found.');
        setLoading(false);
      } else {
        const items = [];
        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });
        setRecommendedProducts(items);
        setLoading(false);
      }
    } catch (e) {
      setError('Failed to fetch recommended products');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!recommendedProducts.length) {
      fetchRecommendedProducts();
    }
  }, []);

  return {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading,
    error
  };
};

export default useRecommendedProducts;
