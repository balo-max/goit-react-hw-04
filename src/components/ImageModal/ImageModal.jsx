import css from './ImageModal.module.css'

export default function ImageModal({image}) {
    return (
        <div className={css.wrapperModal}>
            <img className={css.modalImage} src={image.urls.regular} alt={image.description} />
            <p className={css.modalText}>Author: {image.user.name}</p>
            <p className={css.modalText}>Location: {image.user.location}</p>
        </div>
    );
}
