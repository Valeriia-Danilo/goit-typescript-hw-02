import { useEffect, useState, useRef } from 'react';
import React from 'react';
import css from './App.module.css'
import SearchBar from '../SearchBar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { fetchImages } from '../../services/gallery-api';
import { ThreeDots } from 'react-loader-spinner';
import ImageModal from '../ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';


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
    if (!newSearch.trim()) {
      toast.error('Search query cannot be empty!');
      setImages([]);
      return;
    }
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
          toast.error('No results found. Please try a different query.');
        } else {
          setImages(prevImages => [...prevImages, ...res.images]);
          setTotalPages(res.totalPages);
          console.log(res.totalPages);

        }

      }
      catch {
        toast.error('Please try again.');
      }
      finally {
        setLoading(false);
        console.log(2)
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
      <Toaster position="top-right" />
      <ImageGallery images={images} onImageClick={openModal}/>
        
      {loading && <div className={css.loaderContainer}><ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
  
      /></div>}
      
      {images.length > 0 && !loading && (
        page < totalPages ?
          <div ref={loadMoreRef}>
          <LoadMoreBtn onClick={handleLoadMore} /></div> :
          <div className={css.container}>
        <p className={css.noMoreImagesText}>No more images</p>
    </div>
      )}
      

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
