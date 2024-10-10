import { useId, FormEvent, ChangeEvent } from "react";
import { BsSearch } from "react-icons/bs";
import css from './SearchBar.module.css';
import { toast } from 'react-hot-toast';

interface SearchBarProps {
  onSearch: (query: string) => void; 
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const id = useId();

    const handleSubmit = (event: FormEvent<HTMLFormElement>)  => {
        event.preventDefault();
        
    const form = event.target as HTMLFormElement; 
    const inputValue = form.elements.namedItem("inputValue") as HTMLInputElement;
    const trimmedValue = inputValue.value.trim();

        if (!trimmedValue) {
            toast.error('Enter a saerch query!');
            onSearch('');
            return; 
        }
        onSearch(trimmedValue);
        form.reset();
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