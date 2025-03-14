import { useState } from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';

import './App.css'

import {getImages} from './components/Helpers/Requests'
import ImageGallary from './components/ImageGallery/ImageGallery'
import SearchBar from './components/SearchBar/SearchBar'
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';


const customStylesModal = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "1200px",
    height: "90vh",
    maxHeight: "1000px",
    border: "unset",
    background: "transparent",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",   
  }
};

let currentPage = 1;

Modal.setAppElement("#root");

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handledRequestImage = async (value) => {
    try {
      setIsLoadMore(false);
      setIsLoader(true);
      setImages([]);
      setQuery(value);

      currentPage = 1;

      const response = await getImages(value, currentPage);
      const data = response.results
      const totalPages = response.total_pages

      setImages(data);
      setIsLoader(false);
      if (totalPages >= 1) { return setIsLoadMore(true) };
    }
    catch (er) {
      console.log(er);
      setIsError(er);
    }
    finally {
      setIsLoader(false);
    }
  };

  const handledLoadMoreImages = async () => {
    try {
      setIsLoadMore(false);
      setIsLoader(true);

      currentPage += 1;

      const response = await getImages(query, currentPage);
      const data = response.results
      const totalPages = response.total_pages

      setImages(prevImages => [...prevImages, ...data]);

      setTimeout(() => {
      window.scrollBy({
        top: 800,
        behavior: "smooth"
      });
      }, 300);
      
      setIsLoader(false);
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
      setIsError(er);
    }
    finally {
      setIsLoader(false);
    }
  };

  const handledOpenModal = (image) => {
    setSelectedImage(image)
    setModalIsOpen(true);
  };


  return (
    <>
      <SearchBar onSubmit={handledRequestImage} />
      {isError ? <ErrorMessage /> : <ImageGallary images={images} onOpenModal={handledOpenModal} />}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStylesModal}>
        <ImageModal image={selectedImage} />
      </Modal>
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
