export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
alt_description: string;
likes: number;
  user: {
    name: string;
  };
}

export interface FetchImagesResponse {
  images: Image[];
  totalPages: number;
}

export interface ImageModalProps {
  images: Image[];
  modalIsOpen: boolean;
  closeModal: () => void;
  selectedImage: Image | null;
  showPreviousImage: () => void;
  selectedImageIndex: number;
  showNextImage: () => void;
}

export interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image, index: number) => void;
}