import css from './ErrorMessage.module.css'

export default function ErrorMessage() {
    return <div className={css.wrapperError}><p>Oops, looks like you deleted the internet. Call a shaman or try repeating your search request.</p></div>
}