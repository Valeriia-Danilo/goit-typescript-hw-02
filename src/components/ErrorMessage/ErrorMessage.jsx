import { toast } from 'react-hot-toast';

export default function ErrorMessage({ message }) {
  return toast.error(message);
}