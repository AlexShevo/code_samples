import { useEffect, useState } from 'react';
import firebase from 'services/firebase';

const useFeaturedProducts = (itemsCount) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getFeaturedProducts(itemsCount);

      if (docs.empty) {
          setError('No featured products found.');
          setLoading(false);
      } else {
        const items = [];
        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });
        setFeaturedProducts(items);
        setLoading(false);
      }
    } catch (e) {
      setError('Failed to fetch featured products');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!featuredProducts.length) {
      fetchFeaturedProducts();
    }
  }, []);

  return {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading,
    error
  };
};

export default useFeaturedProducts;
