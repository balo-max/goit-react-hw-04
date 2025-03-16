import { useEffect, useState } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import './App.css'

import {getImages} from './components/Helpers/Requests'
import ImageGallary from './components/ImageGallery/ImageGallery'
import SearchBar from './components/SearchBar/SearchBar'
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handledRequestImage = async (value) => {
    setImages([]);
    setIsError(false);
    setIsLoadMore(false);
    setIsLoader(true);
    setQuery(value);
    setCurrentPage(1)
  };

  const handledLoadMoreImages = () => {
    setIsLoadMore(false);
    setIsLoader(true);
    setCurrentPage(currentPage + 1);
    console.log(currentPage);
  };

  useEffect(() => {
    if (!query) return;
    async function fetchImages() {
      try {
        const response = await getImages(query, currentPage);
        const data = response.results
        const totalPages = response.total_pages
        if (totalPages === 0) {
          setIsLoader(false);
          setIsLoadMore(false);
          return toast.error('No results!');
        };

        setImages(prevImages => [...prevImages, ...data]);

        setTimeout(() => {
          window.scrollBy({
            top: 800,
            behavior: "smooth"
          });
        }, 300);
      
        setIsLoader(false);
        if (totalPages >= 1) { return setIsLoadMore(true) };
        setIsLoadMore(true);
        if (totalPages === currentPage) {
          toast.error('No more images!',
            {
              style: {
                width: '200px',
                fontSize: '20px'
              }
            }
          );
          return setIsLoadMore(false);
        };
      }
      catch (er) {
        console.log(er);
        setIsError(true);
      }
      finally {
        setIsLoader(false);
      }
    };
    fetchImages();
  }, [query, currentPage])


  const handledOpenModal = (image) => {
    setSelectedImage(image)
    setModalIsOpen(true);
  };

  const handledCloseModal = () => {
    setModalIsOpen(false);
  }


  return (
    <>
      <SearchBar onSubmit={handledRequestImage} />
      {isError ? <ErrorMessage /> : <ImageGallary images={images} onOpenModal={handledOpenModal} />}
      <ImageModal isOpen={modalIsOpen} onCloseModal={handledCloseModal} image={selectedImage} />
      {isLoadMore && <LoadMoreBtn onSubmit={handledLoadMoreImages} />}
      {isLoader && <PropagateLoader color='#741414' />}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App