import Modal from 'react-modal';
import css from './ImageModal.module.css';
import { SlClose } from "react-icons/sl";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    width: '50%',
    padding: '20px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',  
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  
};
export default function ImageModal({images, modalIsOpen, closeModal, selectedImage, showPreviousImage, selectedImageIndex, showNextImage}) {
    return <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {selectedImage && (
        <div className={css.modal}>
          <div className={css.imageContainer}>
              <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} className={css.img } />
          <div className={css.container}>
          <div className={css.author}>Author: {selectedImage.user.name}</div>
            <div className={css.likes}>Likes: {selectedImage.likes}</div>
            </div>
          </div>
          <div className={css.buttonContainer}>
              <button onClick={showPreviousImage} disabled={selectedImageIndex === 0} className={css.previous}>
                Previous
              </button>
              <button onClick={closeModal} className={css.button}><SlClose className={css.closeIcon} /></button>
              <button onClick={showNextImage} disabled={selectedImageIndex === images.length - 1} className={css.next}>
                Next
              </button>
              </div>
            </div>
        )}
      </Modal>
}
