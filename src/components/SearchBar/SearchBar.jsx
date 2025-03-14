import toast, { Toaster } from 'react-hot-toast';

import css from './SearchBar.module.css'

export default function SearchBar({ onSubmit }) {
    
    const handledSubmit = (event) => {
        event.preventDefault();
        
        const inputValue = event.target.elements.search.value.trim();

        if (!inputValue) {
            return toast.error('Please write the search that interests you.');
        };

        onSubmit(inputValue);
        event.target.reset();
    };
    
    return (
        <header>
            <form className={css.form} onSubmit={handledSubmit}>
                <input
                    className={css.inputSearch}
                    type="text"
                    autoComplete="off"
                    name="search"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.btnSearch} type="submit">Search</button>
            </form>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </header>
    );
}