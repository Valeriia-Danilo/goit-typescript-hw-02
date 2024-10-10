import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { ImageGalleryProps } from '../../types'; 


export default function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <ul className={css.imageList}>
      {images.map((image, index) => (
        <li className={css.imageContainer}
          key={`${image.id}-${index}`}
          onClick={() => onImageClick(image, index)}>
          <ImageCard image={image} onClick={() => onImageClick(image, index)}/> 
        </li>
      ))}
    </ul>
  );
}