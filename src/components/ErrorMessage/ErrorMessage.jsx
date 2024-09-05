import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

export default function ErrorMessage({ error }) {
  useEffect(() => {
    if (error) {
      toast.error('No results found. Please try again');
    }
  }, [error]); 

}