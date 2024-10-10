import { useEffect, useState, useRef } from 'react';
import React from 'react';
import css from './App.module.css'
import SearchBar from '../SearchBar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../../services/gallery-api';
import ImageModal from '../ImageModal/ImageModal';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { Image } from '../../types'; 



export default function App() {
  
    interface FetchImagesResponse {
    images: Image[];
    totalPages: number;
  }

  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(999);
  const [error, setError] = useState<boolean>(false);
   const loadMoreRef = useRef<HTMLDivElement | null>(null);

  function openModal(image: Image, index: number) {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setIsOpen(true);
  }


  function closeModal() {
    setSelectedImage(null);
    setIsOpen(false);
  }

  const [search, setSearch] = useState<string>('');
   const [images, setImages] = useState<Image[]>([]);

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setImages([]);
    setPage(1);
    setTotalPages(0);
    setError(false);
  }
  


  useEffect(() => {
    
    if (search === "") {
      return
    }

    async function searchImages() {
      try {
        setLoading(true);
        const res: FetchImagesResponse = await fetchImages(search, page);
        
        if (res.images.length === 0 && page === 1) {
          setError(true);
        } else {
          setImages(prevImages => [...prevImages, ...res.images]);
          setTotalPages(res.totalPages);
          setError(false);
          

        }

      }
      catch {
        setError(true);
      }
      finally {
        setLoading(false);

      }
    }

    searchImages();

  }, [search, page]);


  useEffect(() => {
    if (loadMoreRef.current && images.length > 0) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });

    }
  }, [images]);

  
  const showNextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      const newIndex = selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  const showPreviousImage = () => {
    if (selectedImageIndex > 0) {
      const newIndex = selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };
  
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <ImageGallery images={images} onImageClick={openModal}/>
        
      {loading && <Loader />}
      
      {error && <ErrorMessage error={error} />}
      
      {images.length > 0 && !loading && (
        page < totalPages ?
          <div ref={loadMoreRef}>
          <LoadMoreBtn onClick={handleLoadMore} /></div> :
          <div className={css.container}>
        <p className={css.noMoreImagesText}>No more images</p>
    </div>
      )}
      
<Toaster
  position="top-right"
  reverseOrder={false}
/>
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          selectedImage={selectedImage}
          showPreviousImage={showPreviousImage}
          selectedImageIndex={selectedImageIndex}
          showNextImage={showNextImage}
          images={images}/>
    </div>
    )
}
