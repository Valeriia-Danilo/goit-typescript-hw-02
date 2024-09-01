import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className={css.imageList}>
      {images.map((image, index) => (
        <li className={css.imageContainer} key={`${image.id}-${index}`} onClick={() => onImageClick(image, index)}>
          <ImageCard image={image} /> 
        </li>
      ))}
    </ul>
  );
}