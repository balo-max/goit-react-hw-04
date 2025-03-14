import css from './ImageCard.module.css';

export default function ImageCard({image, onOpenModal}) {
    return (
        <>
                <img className={css.imageItem} src={image.urls.small} alt={image.alt_description
                } width="360" onClick={() => onOpenModal(image)}/>
        </>
    );
};
