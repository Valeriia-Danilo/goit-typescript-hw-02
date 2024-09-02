import css from './ImageCard.module.css';

export default function ImageCard({ image, onClick }) { 
    return (
        <div>
            <img src={image.urls.small} alt={image.alt_description} className={css.img} onClick={onClick} />
        </div>
)
}
