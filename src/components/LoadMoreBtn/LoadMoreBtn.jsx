import css from './LoadMoreBtn.module.css'

export default function LoadMoreBtn ({onSubmit}) {
    return (
        <>
            <button className={css.loadMoreBtn} type='click' onClick={() => onSubmit()}>Load more images...</button>
        </>
    )
}