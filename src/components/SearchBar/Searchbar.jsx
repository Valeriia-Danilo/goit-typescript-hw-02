import { useId } from "react";
import { BsSearch } from "react-icons/bs";
import css from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
    const id = useId();

    const handleSubmit = (event) => {
        event.preventDefault();

        onSearch(event.target.elements.inputValue.value);
        
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