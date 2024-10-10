import { toast } from 'react-hot-toast';
import { useEffect } from 'react';

interface ErrorMessageProps {
  error: boolean;
}


export default function ErrorMessage({ error }: ErrorMessageProps) {
  useEffect(() =>
  {
    if (error) {
     toast.error('No results found. Please try again');
    }
  }, [error]); 

  return null;
}