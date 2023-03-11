import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWindow, CloseButton } from './Modal.styled';
import { CgCloseR } from 'react-icons/cg';

export default function Modal({
  currentImageUrl,
  currentImageDescription,
  onClose,
}) {
  useEffect(() => {
    const handleEsc = event => event.code === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdrop}>
      <ModalWindow>
        <CloseButton type="button" onClick={onClose}>
          <CgCloseR />
        </CloseButton>
        <img
          src={currentImageUrl}
          alt={currentImageDescription}
          loading="lazy"
        />
      </ModalWindow>
    </Backdrop>,
    document.querySelector('#modal-root')
  );
}
