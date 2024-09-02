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



export default function App() {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(999);
   const loadMoreRef = useRef();

  function openModal(image, index) {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setIsOpen(true);
  }


  function closeModal() {
    setSelectedImage(null);
    setIsOpen(false);
  }

  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = (newSearch) => {
    setSearch(newSearch);
    setImages([]);
    setPage(1);
    setTotalPages(0);
  }
  


  useEffect(() => {
    
    if (search === "") {
      return
    }

    async function searchImages() {
      try {
        setLoading(true);
        const res = await fetchImages(search, page);
        
        if (res.images.length === 0 && page === 1) {
          ErrorMessage({ message: 'No results found. Please try a different query' }); 
        } else {
          setImages(prevImages => [...prevImages, ...res.images]);
          setTotalPages(res.totalPages);

        }

      }
      catch {
        ErrorMessage({ message: 'Please try again' }); 
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
      <SearchBar onSearch={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal}/>
        
      {loading && <Loader/>}
      
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
