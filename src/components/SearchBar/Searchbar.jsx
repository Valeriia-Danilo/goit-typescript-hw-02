import { useId } from "react";
import { BsSearch } from "react-icons/bs";
import css from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

export default function SearchBar({ onSearch }) {
    const id = useId();

    const handleSubmit = (event) => {
        event.preventDefault();
        const inputValue = event.target.elements.inputValue.value.trim();

        if (!inputValue) {
            toast.error('Enter a saerch query!');
            onSearch('');
            return; 
        }
        onSearch(inputValue);
        event.target.reset();
    }

    
    return (
      <header className={css.header }>
  <form onSubmit={handleSubmit} className={css.form}>
    <input
    id={`${id}-input`} 
    type="text"
    autoComplete="off"
    autoFocus placeholder="Search images and photos"
            name="inputValue"
    className={css.input}          
    />
    <button type="submit" className={css.button}><BsSearch /></button>
          </form>
</header>
    )
}