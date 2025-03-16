import Modal from 'react-modal';

import css from './ImageModal.module.css'

const customStylesModal = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "90vh",
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



export default function ImageModal({ image, onCloseModal, isOpen }) {
    if (!image) return;
    return (
        <Modal
            isOpen={isOpen}
            style={customStylesModal}
            onRequestClose={onCloseModal}
        >

            <div className={css.wrapperModal}>
                <img className={css.modalImage} src={image.urls.regular} alt={image.description} />
                <p className={css.modalText}>Author: {image.user.name}</p>
                <p className={css.modalText}>Location: {image.user.location}</p>
            </div>
        </Modal>
    );
};
    