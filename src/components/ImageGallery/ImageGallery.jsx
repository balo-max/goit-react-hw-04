import css from './ImageGallery.module.css'

import ImageCard from "../ImageCard/ImageCard";


export default function ImageGallary({images, onOpenModal}) {
    return (
        <ul className={css.imageList}>
            {images.map((image) => (
                <li className={css.imageItem} key={image.id}>
                    <ImageCard image={image} onOpenModal={onOpenModal} />
                </li>
            ))}
        </ul>
    );
}